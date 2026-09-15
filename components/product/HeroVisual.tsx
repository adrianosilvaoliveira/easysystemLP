import { FinanceMock } from "@/components/product/FinanceMock";

export function HeroVisual() {
  return (
    <div className="hero-step hero-step-visual relative min-h-[360px] lg:min-h-[420px]">
      <FinanceMock size="hero" />
      <div className="hero-step hero-step-float-a absolute -top-1.5 right-1.5 z-[3] flex items-center gap-2.5 rounded-xl bg-white px-4 py-3 shadow-lg max-sm:right-0 max-sm:px-3 max-sm:py-2">
        <span className="size-[9px] shrink-0 rounded-full bg-success shadow-[0_0_0_3px_var(--color-success-tint)]" />
        <div className="animate-float-y">
          <b className="block font-display text-[13.5px] font-extrabold whitespace-nowrap text-heading max-sm:text-[11.5px]">
            NFC-e emitida
          </b>
          <span className="mt-px block text-[11.5px] whitespace-nowrap text-text-tertiary max-sm:text-[10px]">
            R$ 72,50 · agora
          </span>
        </div>
      </div>
      <div className="hero-step hero-step-float-b absolute bottom-9 -left-[26px] z-[3] flex items-center gap-2.5 rounded-xl bg-white px-4 py-3 shadow-lg max-[1000px]:-left-2 max-sm:-bottom-3.5 max-sm:left-0 max-sm:px-3 max-sm:py-2">
        <span className="size-[9px] shrink-0 rounded-full bg-success shadow-[0_0_0_3px_var(--color-success-tint)]" />
        <div className="animate-float-y-delayed">
          <b className="block font-display text-[13.5px] font-extrabold whitespace-nowrap text-heading max-sm:text-[11.5px]">
            Sincronizado offline
          </b>
          <span className="mt-px block text-[11.5px] whitespace-nowrap text-text-tertiary max-sm:text-[10px]">
            12 vendas · SEUPDV
          </span>
        </div>
      </div>
    </div>
  );
}
