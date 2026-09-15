import type { LeadPayload } from "@/lib/leads";

type DispatchResult =
  | { ok: true }
  | { ok: false; error: string };

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
    ? `https://${domain}.pipedrive.com/api/v1`
    : "https://api.pipedrive.com/api/v1";
  return { root, token };
}

async function pipedriveRequest(path: string, body: Record<string, unknown>) {
  const config = pipedriveBase();
  if (!config) return null;
  const url = `${config.root}${path}?api_token=${encodeURIComponent(config.token)}`;
  const { response, text } = await postJson(url, body, {
    "User-Agent": "Control-Landing/1.0",
  });
  let data: { success?: boolean; data?: { id?: number } } = {};
  try {
    data = JSON.parse(text) as typeof data;
  } catch {
    data = {};
  }
  if (!response.ok || data.success === false) {
    throw new Error(`Pipedrive ${path} ${response.status}: ${text.slice(0, 400)}`);
  }
  return data.data?.id ?? null;
}

async function dispatchPipedrive(payload: LeadPayload): Promise<DispatchResult> {
  if (!pipedriveBase()) return { ok: true };

  try {
    const orgId = await pipedriveRequest("/organizations", {
      name: payload.empresa,
    });
    const personId = await pipedriveRequest("/persons", {
      name: payload.nome,
      ...(orgId ? { org_id: orgId } : {}),
      phone: [
        {
          value: payload.whatsapp,
          primary: true,
          label: "whatsapp",
        },
      ],
    });
    if (personId) {
      await pipedriveRequest("/leads", {
        title: `Demonstração — ${payload.empresa}`,
        person_id: personId,
        ...(orgId ? { organization_id: orgId } : {}),
      }).catch((error) => {
        console.error("[pipedrive lead]", error);
      });
    }
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
