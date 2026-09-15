import { cn } from "cn";
import { Container } from "@/components/brand/Container";
import { SectionHead } from "@/components/brand/SectionHead";
import { Reveal } from "@/components/motion/Reveal";
import { steps } from "@/content/steps";
import type { Step } from "@/content/types";

function StepChip({ visual }: { visual: Step["visual"] }) {
  return (
    <div className="mt-4 overflow-hidden rounded-[10px] border border-border bg-surface shadow-sm transition-[transform,box-shadow] duration-200 ease-premium group-hover:-translate-y-0.5 group-hover:shadow-md">
      <div className="flex h-5 items-center gap-1 bg-navy px-2.5">
        <span className="size-[5px] rounded-full bg-white/32" />
        <span className="size-[5px] rounded-full bg-white/32" />
        <span className="size-[5px] rounded-full bg-white/32" />
      </div>
      <div className="flex min-h-[52px] flex-col justify-center px-[13px] py-[13px] pb-[15px]">
        {visual === "fields" ? (
          <>
            <div className="mb-[7px] h-[7px] w-[88%] rounded bg-surface-alt-2" />
            <div className="mb-[7px] h-[7px] w-[64%] rounded bg-surface-alt-2" />
            <div className="h-[7px] w-[38%] rounded bg-brand" />
          </>
        ) : null}
        {visual === "sale" ? (
          <div className="flex items-center justify-between text-[11px] text-text-secondary">
            <span className="flex items-center">
              <i className="mr-1.5 inline-block size-1.5 rounded-full bg-brand" />
              NFC-e 00214
            </span>
            <b className="font-display text-[11.5px] font-extrabold text-heading">R$ 72,50</b>
          </div>
        ) : null}
        {visual === "chart" ? (
          <div className="flex h-[34px] items-end gap-1">
            {[35, 60, 45, 85, 70].map((h, i) => (
              <b
                key={h}
                className={cn("w-[7px] rounded-t-sm", i % 2 === 1 || i === 4 ? "bg-brand" : "bg-border-strong")}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        ) : null}
        {visual === "modules" ? (
          <div className="flex gap-1.5">
            <div className="size-4 rounded-[5px] bg-brand" />
            <div className="size-4 rounded-[5px] bg-brand" />
            <div className="size-4 rounded-[5px] bg-brand" />
            <div className="size-4 rounded-[5px] bg-surface-alt-2" />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function HowItWorks() {
  return (
    <section id="como-funciona" className="section-y">
      <Container>
        <Reveal>
          <SectionHead eyebrow="Do cadastro ao crescimento" title="Como funciona, em quatro passos." />
        </Reveal>
        <div className="mt-14 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Reveal key={step.id} delay={0.03 + index * 0.05} className="group">
              <article
                className={cn(
                  "relative pt-[26px]",
                  "before:absolute before:top-0 before:left-0 before:h-0.5 before:w-full before:bg-border",
                  "after:absolute after:-top-[3px] after:left-0 after:size-2 after:rounded-full after:bg-brand",
                  index % 2 === 1 && "lg:translate-y-[22px]",
                )}
              >
                <span className="font-display text-[12.5px] font-extrabold tracking-[0.06em] text-text-tertiary">
                  {step.number}
                </span>
                <h4 className="mt-3.5 mb-2 text-[1.12rem] font-extrabold text-heading">{step.title}</h4>
                <p className="text-[0.92rem] leading-[1.55] text-text-secondary">{step.body}</p>
                <StepChip visual={step.visual} />
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
