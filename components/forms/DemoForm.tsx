"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "cn";
import { formatNationalPhone, type LeadOrigem, type LeadUtm } from "@/lib/leads";

const fieldClass =
  "w-full rounded-[10px] border-[1.5px] border-border bg-white px-3.5 py-[13px] font-sans text-[15.5px] text-heading outline-none transition-[border-color,box-shadow] placeholder:text-text-tertiary focus:border-brand focus:shadow-[0_0_0_3px_rgba(231,25,98,0.16)]";

interface DemoFormProps {
  origem?: LeadOrigem;
  utm?: LeadUtm;
  showIntro?: boolean;
}

export function DemoForm({ origem = "site-control", utm, showIntro = true }: DemoFormProps) {
  const [nome, setNome] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [website, setWebsite] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, empresa, whatsapp, website, origem, ...utm }),
      });
      const data = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !data.ok) {
        setError(data.error || "Não foi possível enviar. Tente de novo.");
        return;
      }
      setSent(true);
    } catch {
      setError("Falha de conexão. Verifique a internet e tente de novo.");
    } finally {
      setPending(false);
    }
  }

  if (sent) {
    return (
      <div
        className="rounded-[14px] border border-white/16 bg-white px-6 py-8 text-heading shadow-[0_24px_50px_-28px_rgba(11,31,58,0.55)]"
        role="status"
        aria-live="polite"
      >
        <div className="flex size-11 items-center justify-center rounded-full bg-success-tint">
          <Check className="size-5 stroke-success" strokeWidth={2.4} />
        </div>
        <h3 className="mt-4 font-display text-[1.35rem] font-extrabold leading-tight">
          Pedido enviado.
        </h3>
        <p className="mt-2 text-[15px] leading-relaxed text-text-secondary">
          Um consultor entra em contato no WhatsApp para agendar a demonstração.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative rounded-[14px] border border-white/16 bg-white px-5 py-6 text-heading shadow-[0_24px_50px_-28px_rgba(11,31,58,0.55)] sm:px-6 sm:py-7"
      noValidate
    >
      {showIntro ? (
        <>
          <p className="font-display text-[1.15rem] font-extrabold">Solicitar demonstração</p>
          <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">
            Preencha os três campos e um consultor fala com você.
          </p>
        </>
      ) : null}

      <div className={showIntro ? "mt-5 grid gap-3.5" : "grid gap-3.5"}>
        <label className="grid gap-1.5">
          <span className="font-display text-[12.5px] font-bold tracking-[0.04em] text-heading uppercase">
            Nome
          </span>
          <input
            className={fieldClass}
            name="nome"
            autoComplete="name"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            placeholder="Seu nome"
            required
            maxLength={120}
          />
        </label>

        <label className="grid gap-1.5">
          <span className="font-display text-[12.5px] font-bold tracking-[0.04em] text-heading uppercase">
            Nome da empresa
          </span>
          <input
            className={fieldClass}
            name="empresa"
            autoComplete="organization"
            value={empresa}
            onChange={(event) => setEmpresa(event.target.value)}
            placeholder="Nome da sua empresa"
            required
            maxLength={160}
          />
        </label>

        <label className="grid gap-1.5">
          <span className="font-display text-[12.5px] font-bold tracking-[0.04em] text-heading uppercase">
            WhatsApp
          </span>
          <input
            className={fieldClass}
            name="whatsapp"
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            value={whatsapp}
            onChange={(event) => setWhatsapp(formatNationalPhone(event.target.value))}
            placeholder="(67) 99999-9999"
            required
          />
        </label>

        <div className="sr-only" aria-hidden="true">
          <label>
            Website
            <input
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(event) => setWebsite(event.target.value)}
            />
          </label>
        </div>
      </div>

      {error ? (
        <p className="mt-3.5 text-sm text-brand-deep" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className={cn(
          "mt-5 inline-flex w-full items-center justify-center rounded-[10px] border-[1.5px] border-transparent bg-brand px-[26px] py-[15px] font-display text-[15px] font-bold text-white",
          "shadow-[0_10px_22px_-11px_rgba(231,25,98,0.38)] transition-[transform,box-shadow,background-color] duration-200 ease-premium",
          "hover:-translate-y-0.5 hover:bg-brand-deep hover:shadow-[0_14px_28px_-12px_rgba(231,25,98,0.44)]",
          "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand",
          "disabled:pointer-events-none disabled:translate-y-0 disabled:opacity-60",
        )}
      >
        {pending ? "Enviando…" : "Solicitar demonstração"}
      </button>
    </form>
  );
}
