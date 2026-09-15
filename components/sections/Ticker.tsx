import { cn } from "cn";
import { segments } from "@/content/segments";

export function Ticker() {
  const loop = [...segments, ...segments];

  return (
    <div className="ticker-band overflow-hidden border-y border-border bg-surface-alt py-[22px]">
      <div className="flex items-center">
        <span className="relative z-2 ml-[clamp(1rem,4vw,4rem)] shrink-0 rounded-full bg-brand-tint px-[18px] py-2 font-display text-xs font-bold tracking-[0.08em] text-brand uppercase">
          Atende negócios como o seu
        </span>
        <div className="min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
          <div className="ticker-track flex w-max gap-[34px] pl-[34px]">
            {loop.map((segment, index) => (
              <span
                key={`${segment}-${index}`}
                className={cn(
                  "flex items-center gap-[34px] font-display text-[14.5px] font-semibold whitespace-nowrap text-text-secondary",
                  "after:size-1 after:rounded-full after:bg-border-strong after:content-['']",
                )}
              >
                {segment}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
