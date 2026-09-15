import { NextResponse } from "next/server";
import { dispatchLead, isLeadDestinationConfigured, leadDestinationStatus } from "@/lib/dispatch-lead";
import { buildLeadPayload, parseLeadInput, validateLead } from "@/lib/leads";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 6;
const hits = new Map<string, number[]>();

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    ...leadDestinationStatus(),
  });
}

export async function POST(request: Request) {
  if (rateLimited(clientIp(request))) {
    return NextResponse.json(
      { ok: false, error: "Muitas tentativas. Aguarde alguns minutos e tente de novo." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Dados inválidos." }, { status: 400 });
  }

  const input = parseLeadInput(body);
  const validation = validateLead(input);
  if (!validation.ok) {
    if (validation.spam) {
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ ok: false, error: validation.error }, { status: 400 });
  }

  if (!isLeadDestinationConfigured() && process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { ok: false, error: "O formulário ainda não está conectado ao destino dos leads." },
      { status: 503 },
    );
  }

  const payload = buildLeadPayload(input, validation.whatsapp);
  const result = await dispatchLead(payload);
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
