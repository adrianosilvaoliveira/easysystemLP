import type { LeadPayload } from "@/lib/leads";

type DispatchResult =
  | { ok: true }
  | { ok: false; error: string };

const DEFAULT_STAGE_NAME = "Qualificado";
const RELATED_STAGE_NAME = "Demo agendada";
const USER_ERROR = "Não foi possível enviar seus dados. Tente de novo em instantes.";

type PipedriveStage = {
  id?: number;
  name?: string;
  pipeline_id?: number;
  is_deleted?: boolean;
  active_flag?: boolean | number;
};

type StageTarget = {
  stage_id?: number;
  pipeline_id?: number;
};

type PipedriveJson = {
  success?: boolean;
  data?: unknown;
  additional_data?: { next_cursor?: string | null };
};

let stageCache: StageTarget | undefined;

async function postJson(url: string, body: unknown, headers: Record<string, string>, timeoutMs = 8_000) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers,
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(timeoutMs),
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
    const { response, text } = await postJson(
      url,
      payload,
      {
        "User-Agent": "Control-Landing/1.0",
        ...basicAuthHeader(),
      },
      4_000,
    );
    if (!response.ok) {
      console.error("[lead webhook]", response.status, text.slice(0, 400));
      return { ok: false, error: USER_ERROR };
    }
    return { ok: true };
  } catch (error) {
    console.error("[lead webhook]", error);
    return { ok: false, error: USER_ERROR };
  }
}

export function companyDomain() {
  const raw = process.env.PIPEDRIVE_COMPANY_DOMAIN?.trim() ?? "";
  if (!raw) return "";
  return raw
    .replace(/^https?:\/\//i, "")
    .replace(/\/.*$/, "")
    .replace(/\.pipedrive\.com$/i, "")
    .trim();
}

function pipedriveToken() {
  return process.env.PIPEDRIVE_API_TOKEN?.trim() || "";
}

function pipedriveRoot(version: "v1" | "v2") {
  const token = pipedriveToken();
  if (!token) return null;
  const domain = companyDomain();
  const root = domain
    ? `https://${domain}.pipedrive.com/api/${version}`
    : `https://api.pipedrive.com/api/${version}`;
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

async function pipedriveJson(version: "v1" | "v2", path: string, body?: Record<string, unknown>) {
  const config = pipedriveRoot(version);
  if (!config) {
    throw new Error("Pipedrive is not configured");
  }

  const separator = path.includes("?") ? "&" : "?";
  const url = `${config.root}${path}${separator}api_token=${encodeURIComponent(config.token)}`;
  const headers = {
    Accept: "application/json",
    "User-Agent": "Control-Landing/1.0",
    "x-api-token": config.token,
  };

  let response: Response;
  let text: string;

  if (body) {
    const posted = await postJson(url, compactBody(body), headers, 8_000);
    response = posted.response;
    text = posted.text;
  } else {
    response = await fetch(url, {
      method: "GET",
      headers,
      signal: AbortSignal.timeout(5_000),
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
    throw new Error(`Pipedrive ${version} ${path} ${response.status}: ${text.slice(0, 400)}`);
  }
  return data;
}

async function pipedriveCreate(
  path: string,
  v2Body: Record<string, unknown>,
  v1Body: Record<string, unknown> = v2Body,
) {
  try {
    const data = await pipedriveJson("v2", path, v2Body);
    const entity = data.data as { id?: number } | null;
    if (entity?.id) return entity.id;
  } catch (error) {
    console.error(`[pipedrive v2 ${path}]`, error);
  }

  const data = await pipedriveJson("v1", path, v1Body);
  const entity = data.data as { id?: number } | null;
  return entity?.id ?? null;
}

function asStageList(data: unknown): PipedriveStage[] {
  if (Array.isArray(data)) return data as PipedriveStage[];
  if (data && typeof data === "object" && Array.isArray((data as { items?: unknown }).items)) {
    return (data as { items: PipedriveStage[] }).items;
  }
  return [];
}

async function listStages() {
  try {
    const payload = await pipedriveJson("v2", "/stages?limit=500");
    const stages = asStageList(payload.data).filter((stage) => !stage.is_deleted);
    if (stages.length) return stages;
  } catch (error) {
    console.error("[pipedrive stages v2]", error);
  }

  const payload = await pipedriveJson("v1", "/stages");
  return asStageList(payload.data).filter((stage) => stage.active_flag !== false && stage.active_flag !== 0);
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
  const matches = stages.filter(
    (stage) => typeof stage.name === "string" && normalizeName(stage.name) === wanted && typeof stage.id === "number",
  );

  if (matches.length === 0) {
    console.error(`[pipedrive] stage "${wanted}" not found; creating deal in the default stage`);
    stageCache = pipelineId ? { pipeline_id: pipelineId } : {};
    return stageCache;
  }

  const demoPipelines = new Set(
    stages
      .filter((stage) => typeof stage.name === "string" && normalizeName(stage.name) === normalizeName(RELATED_STAGE_NAME))
      .map((stage) => stage.pipeline_id)
      .filter((id): id is number => typeof id === "number"),
  );

  const chosen =
    matches.find((stage) => typeof stage.pipeline_id === "number" && demoPipelines.has(stage.pipeline_id)) ??
    (pipelineId ? matches.find((stage) => stage.pipeline_id === pipelineId) : undefined) ??
    matches[0];

  stageCache = {
    stage_id: chosen.id,
    pipeline_id: pipelineId ?? chosen.pipeline_id,
  };
  return stageCache;
}

async function createDeal(body: Record<string, unknown>) {
  try {
    return await pipedriveCreate("/deals", body);
  } catch (error) {
    if (body.stage_id || body.pipeline_id) {
      console.error("[pipedrive deal stage]", error);
      const { stage_id: _stageId, pipeline_id: _pipelineId, ...rest } = body;
      return pipedriveCreate("/deals", rest);
    }
    throw error;
  }
}

async function dispatchPipedrive(payload: LeadPayload): Promise<DispatchResult> {
  if (!pipedriveToken()) return { ok: true };

  try {
    const [stage, orgId] = await Promise.all([
      resolveDealStage().catch((error) => {
        console.error("[pipedrive stage]", error);
        return {} as StageTarget;
      }),
      pipedriveCreate("/organizations", { name: payload.empresa }),
    ]);

    const personBody = {
      name: payload.nome,
      ...(orgId ? { org_id: orgId } : {}),
    };
    const phone = [
      {
        value: payload.whatsapp,
        primary: true,
        label: "mobile",
      },
    ];
    let personId: number | null = null;
    try {
      personId = await pipedriveCreate(
        "/persons",
        { ...personBody, phones: phone },
        { ...personBody, phone },
      );
    } catch (error) {
      console.error("[pipedrive person]", error);
    }

    if (!orgId && !personId) {
      throw new Error("Pipedrive did not return org_id or person_id");
    }

    const dealId = await createDeal({
      title: payload.empresa,
      currency: process.env.PIPEDRIVE_DEAL_CURRENCY?.trim() || "BRL",
      ...(personId ? { person_id: personId } : {}),
      ...(orgId ? { org_id: orgId } : {}),
      value: envNumber("PIPEDRIVE_DEAL_VALUE"),
      ...stage,
    });

    if (!dealId) {
      throw new Error("Pipedrive did not return deal id");
    }

    return { ok: true };
  } catch (error) {
    console.error("[pipedrive]", error);
    return { ok: false, error: USER_ERROR };
  }
}

export function isLeadDestinationConfigured() {
  return Boolean(process.env.LEAD_WEBHOOK_URL?.trim() || pipedriveToken());
}

export function leadDestinationStatus() {
  return {
    pipedrive: Boolean(pipedriveToken()),
    webhook: Boolean(process.env.LEAD_WEBHOOK_URL?.trim()),
    domain: companyDomain() || null,
  };
}

export async function dispatchLead(payload: LeadPayload): Promise<DispatchResult> {
  if (!isLeadDestinationConfigured()) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[lead preview]", payload);
      return { ok: true };
    }
    return { ok: false, error: "O formulário ainda não está conectado ao destino dos leads." };
  }

  const tokenConfigured = Boolean(pipedriveToken());
  const [webhook, pipedrive] = await Promise.all([
    dispatchWebhook(payload),
    dispatchPipedrive(payload),
  ]);

  if (tokenConfigured) {
    if (!pipedrive.ok) {
      console.error("[lead pipedrive failed]", { webhook, pipedrive });
      return pipedrive;
    }
    return { ok: true };
  }

  return webhook;
}
