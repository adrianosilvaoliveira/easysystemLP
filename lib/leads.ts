export type LeadInput = {
  nome: string;
  whatsapp: string;
  empresa: string;
  website?: string;
};

export type LeadPayload = {
  event: "demo_request";
  origem: "site-control";
  nome: string;
  whatsapp: string;
  whatsapp_exibicao: string;
  empresa: string;
  enviado_em: string;
};

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
    origem: "site-control",
    nome: input.nome,
    whatsapp,
    whatsapp_exibicao: formatNationalPhone(whatsapp),
    empresa: input.empresa,
    enviado_em: new Date().toISOString(),
  };
}
