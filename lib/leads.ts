export const leadOrigins = ["site-control", "ads-control"] as const;

export type LeadOrigem = (typeof leadOrigins)[number];

export type LeadUtm = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
};

export type LeadInput = {
  nome: string;
  whatsapp: string;
  empresa: string;
  website?: string;
  origem?: LeadOrigem;
} & LeadUtm;

export type LeadPayload = {
  event: "demo_request";
  origem: LeadOrigem;
  nome: string;
  whatsapp: string;
  whatsapp_exibicao: string;
  empresa: string;
  enviado_em: string;
} & LeadUtm;

const MAX_NAME = 120;
const MAX_COMPANY = 160;

export function digitsOnly(value: string) {
  return value.replace(/\D/g, "");
}

export function formatNationalPhone(value: string) {
  const digits = toNationalDigits(value).slice(0, 11);
  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function toNationalDigits(value: string) {
  let digits = digitsOnly(value);
  if (digits.startsWith("55") && digits.length >= 12) {
    digits = digits.slice(2);
  }
  if (digits.startsWith("0")) {
    digits = digits.slice(1);
  }
  return digits;
}

export function toE164(value: string) {
  const digits = toNationalDigits(value);
  if (digits.length < 10 || digits.length > 11) return null;
  return `+55${digits}`;
}

function cleanText(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.replace(/\s+/g, " ").trim().slice(0, max);
}

function cleanUtm(value: unknown) {
  const text = cleanText(value, 80);
  return text || undefined;
}

function parseOrigem(value: unknown): LeadOrigem {
  return value === "ads-control" ? "ads-control" : "site-control";
}

export function parseLeadInput(body: unknown): LeadInput {
  if (!body || typeof body !== "object") {
    return { nome: "", whatsapp: "", empresa: "" };
  }

  const data = body as Record<string, unknown>;
  return {
    nome: cleanText(data.nome, MAX_NAME),
    whatsapp: cleanText(data.whatsapp, 40),
    empresa: cleanText(data.empresa, MAX_COMPANY),
    website: typeof data.website === "string" ? data.website.trim() : "",
    origem: parseOrigem(data.origem),
    utm_source: cleanUtm(data.utm_source),
    utm_medium: cleanUtm(data.utm_medium),
    utm_campaign: cleanUtm(data.utm_campaign),
    utm_content: cleanUtm(data.utm_content),
  };
}

export function validateLead(input: LeadInput) {
  if (input.website) {
    return { ok: false as const, spam: true as const, error: "ignored" };
  }
  if (input.nome.length < 2) {
    return { ok: false as const, spam: false as const, error: "Informe o nome do contato." };
  }
  if (input.empresa.length < 2) {
    return { ok: false as const, spam: false as const, error: "Informe o nome da empresa." };
  }
  const whatsapp = toE164(input.whatsapp);
  if (!whatsapp) {
    return {
      ok: false as const,
      spam: false as const,
      error: "Informe um WhatsApp válido com DDD, como (67) 99999-9999.",
    };
  }
  return { ok: true as const, spam: false as const, whatsapp };
}

export function buildLeadPayload(input: LeadInput, whatsapp: string): LeadPayload {
  return {
    event: "demo_request",
    origem: input.origem === "ads-control" ? "ads-control" : "site-control",
    nome: input.nome,
    whatsapp,
    whatsapp_exibicao: formatNationalPhone(whatsapp),
    empresa: input.empresa,
    enviado_em: new Date().toISOString(),
    ...(input.utm_source ? { utm_source: input.utm_source } : {}),
    ...(input.utm_medium ? { utm_medium: input.utm_medium } : {}),
    ...(input.utm_campaign ? { utm_campaign: input.utm_campaign } : {}),
    ...(input.utm_content ? { utm_content: input.utm_content } : {}),
  };
}
