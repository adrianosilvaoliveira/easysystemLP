import { ArrowRight, Check, X } from "lucide-react";
import { Container } from "@/components/brand/Container";
import { Eyebrow } from "@/components/brand/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { compareAfter, compareBefore } from "@/content/compare";

export function Solution() {
  return (
    <section id="solucao" className="section-y">
      <Container>
        <Reveal>
          <div className="mb-[52px] max-w-[640px]">
            <Eyebrow>A mudança</Eyebrow>
            <h2 className="max-w-[18ch] font-display text-[clamp(2rem,3.2vw,3.05rem)] font-extrabold leading-[1.14] text-heading">
              Apresentamos o Control.
            </h2>
            <p className="mt-4 max-w-[60ch] text-[1.05rem] leading-[1.68] text-text-secondary">
              Um único sistema pra emitir nota, vender, controlar estoque, fechar caixa e falar com
              seu contador — pensado pra realidade fiscal brasileira, do pequeno varejo à indústria.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid items-center gap-7 md:grid-cols-[1fr_64px_1fr] md:gap-0">
          <Reveal delay={0.05}>
            <div className="rounded-lg border border-dashed border-border-strong bg-surface-alt-2 p-[30px_28px] md:-rotate-[1.1deg]">
              <span className="mb-[18px] block font-display text-xs font-bold tracking-[0.1em] text-text-tertiary uppercase">
                Hoje, sem o Control
              </span>
              <ul className="m-0 flex list-none flex-col gap-[13px] p-0">
                {compareBefore.map((item) => (
                  <li key={item.label} className="flex items-start gap-2.5 text-[14.5px] text-text-secondary">
                    <X className="mt-[3px] size-[15px] shrink-0 stroke-text-tertiary" />
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="flex justify-center">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-brand shadow-[0_12px_24px_-11px_rgba(231,25,98,0.4)] md:rotate-0 max-md:rotate-90">
              <ArrowRight className="size-[22px] stroke-white" strokeWidth={2.2} />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="rounded-lg bg-navy-gradient p-[30px_28px] text-white shadow-lg">
              <span className="mb-[18px] block font-display text-xs font-bold tracking-[0.1em] text-accent-pink uppercase">
                Com o Control
              </span>
              <ul className="m-0 flex list-none flex-col gap-[13px] p-0">
                {compareAfter.map((item) => (
                  <li key={item.label} className="flex items-start gap-2.5 text-[14.5px] text-[#E4E9F2]">
                    <Check className="mt-[3px] size-[15px] shrink-0 stroke-accent-pink" strokeWidth={2.2} />
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
