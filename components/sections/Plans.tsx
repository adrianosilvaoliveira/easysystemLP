import { Check } from "lucide-react";
import { cn } from "cn";
import { Button } from "@/components/brand/Button";
import { Container } from "@/components/brand/Container";
import { SectionHead } from "@/components/brand/SectionHead";
import { Reveal } from "@/components/motion/Reveal";
import { addons, planFeatureRows, plans } from "@/content/plans";

export function Plans() {
  return (
    <section id="planos" className="section-y">
      <Container>
        <Reveal>
          <SectionHead
            eyebrow="Investimento"
            title="Um plano pra cada tamanho de operação."
            lede="Emissão ilimitada de documentos fiscais em todos os planos. Cresça de módulo conforme sua operação evolui."
            titleClassName="text-[clamp(2rem,3.2vw,3.05rem)] leading-[1.14] max-w-[20ch]"
          />
        </Reveal>

        <div className="mt-[52px] grid grid-cols-1 items-stretch gap-[18px] sm:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan, index) => (
            <Reveal key={plan.id} delay={0.02 + index * 0.04}>
              <article
                className={cn(
                  "relative flex h-full flex-col rounded-md border-[1.5px] bg-surface px-6 py-7 transition-[border-color,box-shadow,transform] duration-200 ease-premium hover:-translate-y-1 hover:shadow-md",
                  plan.featured
                    ? "border-brand shadow-md hover:shadow-[0_24px_50px_-24px_rgba(231,25,98,0.3)]"
                    : "border-border hover:border-border-strong",
                )}
              >
                {plan.badge ? (
                  <span className="absolute -top-[13px] left-6 rounded-full bg-brand px-3 py-[5px] font-display text-[11px] font-bold tracking-[0.06em] text-white uppercase">
                    {plan.badge}
                  </span>
                ) : null}
                <h4 className="mb-3 text-[17px] font-extrabold text-heading">{plan.name}</h4>
                <div className="font-display text-[31px] font-extrabold text-heading tabular-nums">
                  {plan.price}
                  <small className="font-sans text-sm font-normal text-text-tertiary">
                    {plan.cents}
                    {plan.period}
                  </small>
                </div>
                <p className="mt-[7px] mb-5 text-[13px] text-text-secondary">{plan.description}</p>
                <ul className="mb-[22px] flex flex-1 list-none flex-col gap-2.5 p-0">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-[13.2px] text-text-secondary">
                      <Check className="mt-0.5 size-3.5 shrink-0 stroke-success" strokeWidth={2.2} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  href={plan.cta.href}
                  variant={plan.cta.variant}
                  external={plan.cta.external}
                  className="w-full whitespace-normal text-center leading-snug"
                >
                  {plan.cta.label}
                </Button>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="mt-12 mb-3 font-display text-[13.5px] font-bold text-heading">
          Comparativo completo de recursos
        </p>
        <div className="overflow-x-auto rounded-md border border-border">
          <table className="w-full min-w-[680px] border-collapse text-[13.5px]">
            <thead>
              <tr>
                <th className="bg-navy px-4 py-3 text-left font-display text-[13px] font-bold text-white">
                  Recurso
                </th>
                {plans.map((plan) => (
                  <th
                    key={plan.id}
                    className="bg-navy px-4 py-3 text-center font-display text-[13px] font-bold text-white"
                  >
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {planFeatureRows.map((row) => (
                <tr key={row.label} className="even:bg-surface-alt">
                  <td className="border-b border-border px-4 py-2.5 font-display font-bold text-heading">
                    {row.label}
                  </td>
                  {row.included.map((on, index) => (
                    <td
                      key={`${row.label}-${index}`}
                      className="border-b border-border px-4 py-2.5 text-center text-text-secondary"
                    >
                      {on ? (
                        <span className="font-bold text-brand">✓</span>
                      ) : (
                        <span className="text-border-strong">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-12 mb-3 font-display text-[13.5px] font-bold text-heading">
          Adicionais — disponíveis para qualquer plano
        </p>
        <div className="overflow-x-auto rounded-md border border-border">
          <table className="w-full min-w-[520px] border-collapse text-[13.5px]">
            <thead>
              <tr>
                {["Adicional", "Valor", "Tipo de licença"].map((label) => (
                  <th
                    key={label}
                    className="bg-navy px-4 py-3 text-left font-display text-[13px] font-bold text-white"
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {addons.map((addon) => (
                <tr key={addon.name} className="even:bg-surface-alt">
                  <td className="border-b border-border px-4 py-2.5 font-display font-bold text-heading">
                    {addon.name}
                  </td>
                  <td className="border-b border-border px-4 py-2.5 text-text-secondary">{addon.price}</td>
                  <td className="border-b border-border px-4 py-2.5 text-text-secondary">{addon.license}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
}
