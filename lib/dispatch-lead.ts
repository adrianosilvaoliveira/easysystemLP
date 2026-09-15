import type { LeadPayload } from "@/lib/leads";

type DispatchResult =
  | { ok: true }
  | { ok: false; error: string };

const DEFAULT_STAGE_NAME = "Qualificado";
const RELATED_STAGE_NAME = "Demo agendada";

type PipedriveStage = {
  id: number;
  name: string;
  pipeline_id: number;
  is_deleted?: boolean;
};

type StageTarget = {
  stage_id: number;
  pipeline_id?: number;
};

type PipedriveJson = {
  success?: boolean;
  data?: unknown;
  additional_data?: { next_cursor?: string | null };
};

let stageCache: StageTarget | undefined;

async function postJson(url: string, body: unknown, headers: Record<string, string>) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers,
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(10_000),
    cache: "no-store",
  });

  const text = await response.text();
  return { response, text };
}

function basicAuthHeader(): Record<string, string> {
  const user = process.env.LEAD_WEBHOOK_USER?.trim();
  const password = process.env.LEAD_WEBHOOK_PASSWORD ?? "";
  if (!user) return {};
  const token = Buffer.from(`${user}:${password}`).toString("base64");
  return { Authorization: `Basic ${token}` };
}

async function dispatchWebhook(payload: LeadPayload): Promise<DispatchResult> {
  const url = process.env.LEAD_WEBHOOK_URL?.trim();
  if (!url) return { ok: true };

  try {
    const { response, text } = await postJson(url, payload, {
      "User-Agent": "Control-Landing/1.0",
      ...basicAuthHeader(),
    });
    if (!response.ok) {
      console.error("[lead webhook]", response.status, text.slice(0, 400));
      return { ok: false, error: "Não foi possível enviar seus dados. Tente de novo em instantes." };
    }
    return { ok: true };
  } catch (error) {
    console.error("[lead webhook]", error);
    return { ok: false, error: "Não foi possível enviar seus dados. Tente de novo em instantes." };
  }
}

function pipedriveBase() {
  const domain = process.env.PIPEDRIVE_COMPANY_DOMAIN?.trim().replace(/\.pipedrive\.com$/i, "");
  const token = process.env.PIPEDRIVE_API_TOKEN?.trim();
  if (!token) return null;
  const root = domain
    ? `https://${domain}.pipedrive.com/api/v2`
    : "https://api.pipedrive.com/api/v2";
  return { root, token };
}

function envNumber(name: string) {
  const raw = process.env[name]?.trim();
  if (!raw) return undefined;
  const value = Number(raw);
  return Number.isFinite(value) ? value : undefined;
}

function compactBody(body: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(body).filter(([, value]) => value !== undefined && value !== null && value !== ""),
  );
}

function normalizeName(value: string) {
  return value.trim().toLowerCase();
}

async function pipedriveJson(path: string, body?: Record<string, unknown>) {
  const config = pipedriveBase();
  if (!config) {
    throw new Error("Pipedrive is not configured");
  }

  const separator = path.includes("?") ? "&" : "?";
  const url = `${config.root}${path}${separator}api_token=${encodeURIComponent(config.token)}`;
  let response: Response;
  let text: string;

  if (body) {
    const posted = await postJson(url, compactBody(body), {
      "User-Agent": "Control-Landing/1.0",
    });
    response = posted.response;
    text = posted.text;
  } else {
    response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "User-Agent": "Control-Landing/1.0",
      },
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });
    text = await response.text();
  }

  let data: PipedriveJson = {};
  try {
    data = JSON.parse(text) as PipedriveJson;
  } catch {
    data = {};
  }
  if (!response.ok || data.success === false) {
    throw new Error(`Pipedrive ${path} ${response.status}: ${text.slice(0, 400)}`);
  }
  return data;
}

async function pipedriveRequest(path: string, body: Record<string, unknown>) {
  const data = await pipedriveJson(path, body);
  const entity = data.data as { id?: number } | null;
  return entity?.id ?? null;
}

async function listStages() {
  const stages: PipedriveStage[] = [];
  let cursor: string | undefined;

  do {
    const query = new URLSearchParams({ limit: "500" });
    if (cursor) query.set("cursor", cursor);
    const payload = await pipedriveJson(`/stages?${query.toString()}`);
    const page = Array.isArray(payload.data) ? (payload.data as PipedriveStage[]) : [];
    stages.push(...page.filter((stage) => !stage.is_deleted));
    cursor = payload.additional_data?.next_cursor ?? undefined;
  } while (cursor);

  return stages;
}

async function resolveDealStage(): Promise<StageTarget> {
  if (stageCache) return stageCache;

  const stageId = envNumber("PIPEDRIVE_STAGE_ID");
  const pipelineId = envNumber("PIPEDRIVE_PIPELINE_ID");
  if (stageId) {
    stageCache = { stage_id: stageId, ...(pipelineId ? { pipeline_id: pipelineId } : {}) };
    return stageCache;
  }

  const wanted = normalizeName(process.env.PIPEDRIVE_STAGE_NAME?.trim() || DEFAULT_STAGE_NAME);
  const stages = await listStages();
  const matches = stages.filter((stage) => normalizeName(stage.name) === wanted);
  if (matches.length === 0) {
    throw new Error(`Pipedrive stage "${wanted}" not found`);
  }

  const demoPipelines = new Set(
    stages
      .filter((stage) => normalizeName(stage.name) === normalizeName(RELATED_STAGE_NAME))
      .map((stage) => stage.pipeline_id),
  );
  const chosen =
    matches.find((stage) => demoPipelines.has(stage.pipeline_id)) ??
    (pipelineId ? matches.find((stage) => stage.pipeline_id === pipelineId) : undefined) ??
    matches[0];

  if (!chosen) {
    throw new Error(`Pipedrive stage "${wanted}" not found`);
  }

  stageCache = {
    stage_id: chosen.id,
    pipeline_id: pipelineId ?? chosen.pipeline_id,
  };
  return stageCache;
}

async function dispatchPipedrive(payload: LeadPayload): Promise<DispatchResult> {
  if (!pipedriveBase()) return { ok: true };

  try {
    const stage = await resolveDealStage();
    const orgId = await pipedriveRequest("/organizations", {
      name: payload.empresa,
    });
    const personId = await pipedriveRequest("/persons", {
      name: payload.nome,
      ...(orgId ? { org_id: orgId } : {}),
      phones: [
        {
          value: payload.whatsapp,
          primary: true,
          label: "whatsapp",
        },
      ],
    });

    if (!orgId && !personId) {
      throw new Error("Pipedrive did not return org_id or person_id");
    }

    await pipedriveRequest("/deals", {
      title: `Demonstração — ${payload.empresa}`,
      currency: process.env.PIPEDRIVE_DEAL_CURRENCY?.trim() || "BRL",
      ...(personId ? { person_id: personId } : {}),
      ...(orgId ? { org_id: orgId } : {}),
      value: envNumber("PIPEDRIVE_DEAL_VALUE"),
      ...stage,
    });

    return { ok: true };
  } catch (error) {
    console.error("[pipedrive]", error);
    return { ok: false, error: "Não foi possível enviar seus dados. Tente de novo em instantes." };
  }
}

export function isLeadDestinationConfigured() {
  return Boolean(
    process.env.LEAD_WEBHOOK_URL?.trim() || process.env.PIPEDRIVE_API_TOKEN?.trim(),
  );
}

export async function dispatchLead(payload: LeadPayload): Promise<DispatchResult> {
  if (!isLeadDestinationConfigured()) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[lead preview]", payload);
      return { ok: true };
    }
    return { ok: false, error: "O formulário ainda não está conectado ao destino dos leads." };
  }

  const [webhook, pipedrive] = await Promise.all([
    dispatchWebhook(payload),
    dispatchPipedrive(payload),
  ]);

  if (webhook.ok && pipedrive.ok) return { ok: true };
  if (webhook.ok || pipedrive.ok) {
    console.error("[lead partial]", { webhook, pipedrive });
    return { ok: true };
  }
  return webhook.ok ? pipedrive : webhook;
}
