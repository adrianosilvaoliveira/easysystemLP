import { cn } from "cn";
import { AppChrome } from "@/components/product/AppChrome";

interface FinanceMockProps {
  size?: "hero" | "story";
  className?: string;
}

export function FinanceMock({ size = "story", className }: FinanceMockProps) {
  const hero = size === "hero";

  const stats = hero
    ? [
        { value: "R$ 250,00", label: "entradas do mês" },
        { value: "R$ 83,00", label: "saídas do mês" },
      ]
    : [
        { value: "R$ 250,00", label: "receitas do mês" },
        { value: "R$ 83,00", label: "despesas do mês" },
        { value: "0,56%", label: "inadimplência" },
      ];

  const bars = hero
    ? [28, 52, 22, 70, 34, 44, 46, 82]
    : [22, 44, 30, 58, 18, 36, 40, 66, 26, 52, 48, 88];

  const rows = hero
    ? [
        { label: "Venda balcão", value: "+ R$ 128,50" },
        { label: "Boleto fornecedor", value: "− R$ 340,00" },
      ]
    : [
        { label: "Boleto — Fornecedor XPTO", value: "− R$ 340,00" },
        { label: "Venda balcão — NFC-e 00214", value: "+ R$ 128,50" },
        { label: "Conciliação bancária — Banco do Brasil", value: "OK" },
      ];

  return (
    <AppChrome
      path={hero ? "Financeiro / Visão geral" : "Painel do Contador / Financeiro"}
      dots={hero ? 4 : 5}
      className={className}
    >
      <div className={cn("mb-[18px] flex flex-wrap", hero ? "gap-[26px]" : "gap-6")}>
        {stats.map((stat) => (
          <div key={stat.label}>
            <b
              className={cn(
                "block font-display font-extrabold text-heading",
                hero ? "text-[21px]" : "text-[22px] sm:text-[27px]",
              )}
            >
              {stat.value}
            </b>
            <span className="text-[11.5px] text-text-tertiary">{stat.label}</span>
          </div>
        ))}
      </div>
      <div
        className={cn(
          "mb-3.5 flex items-end gap-2",
          hero ? "h-[72px]" : "h-[88px] sm:h-[118px]",
        )}
      >
        {bars.map((height, index) => (
          <b
            key={`${height}-${index}`}
            className={cn(
              "block rounded-t-[3px]",
              hero ? "w-2" : "w-2 sm:w-3",
              index % 2 === 1 ? "bg-brand" : "bg-border-strong",
            )}
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex justify-between gap-2.5 border-t border-border py-[7px] text-xs text-text-secondary"
          >
            <span className="min-w-0 truncate">{row.label}</span>
            <b className="shrink-0 font-bold text-heading">{row.value}</b>
          </div>
        ))}
      </div>
    </AppChrome>
  );
}
