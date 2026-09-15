import { Check, Tag } from "lucide-react";
import { Button } from "@/components/brand/Button";
import { hero } from "@/content/hero";

export function HeroCopy() {
  return (
    <div>
      <div className="hero-step hero-step-1 mb-6 flex flex-wrap gap-2">
        {hero.pills.map((pill) => (
          <span
            key={pill}
            className="rounded-full border border-white/26 px-3.5 py-1.5 font-display text-[11.5px] font-bold tracking-[0.07em] text-white uppercase"
          >
            {pill}
          </span>
        ))}
      </div>

      <h1 className="max-w-[15ch] font-display text-[clamp(2.35rem,4.6vw+0.6rem,3.95rem)] font-extrabold leading-[1.07] text-white">
        {hero.headline}
        <span className="text-accent-pink">{hero.headlineAccent}</span>.
      </h1>

      <p className="hero-step hero-step-3 mt-6 max-w-[46ch] text-[clamp(1.02rem,1.3vw,1.17rem)] leading-[1.65] text-[#C7D0E2]">
        {hero.lede}
      </p>

      <div className="hero-step hero-step-4 mt-9 flex flex-wrap items-center gap-3.5">
        <Button href={hero.primaryCta.href} variant="brand" external={hero.primaryCta.external}>
          {hero.primaryCta.label}
        </Button>
        <Button href={hero.secondaryCta.href} variant="ghost-dark">
          {hero.secondaryCta.label}
        </Button>
      </div>

      <p className="hero-step hero-step-5 mt-4 text-[13.5px] text-[#93A0B8]">{hero.microcopy}</p>

      <div className="hero-step hero-step-6 mt-10 flex flex-wrap gap-x-[26px] gap-y-2.5 border-t border-white/14 pt-[26px] lg:mt-[52px]">
        {hero.trust.map((line, index) => (
          <div
            key={line}
            className="flex items-center gap-2 font-display text-[12.8px] font-semibold text-[#9FACC4]"
          >
            {index === 0 ? (
              <Tag className="size-[15px] shrink-0 stroke-accent-pink" strokeWidth={1.8} />
            ) : (
              <Check className="size-[15px] shrink-0 stroke-accent-pink" strokeWidth={2} />
            )}
            {index === 0 ? (
              <span>
                A partir de{" "}
                <b className="font-extrabold text-white tabular-nums">R$&nbsp;190,00</b>/mês
              </span>
            ) : (
              line
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
