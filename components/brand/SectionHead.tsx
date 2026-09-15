import { cn } from "cn";
import { Eyebrow } from "@/components/brand/Eyebrow";

interface SectionHeadProps {
  eyebrow: string;
  title: string;
  lede?: string;
  wide?: boolean;
  light?: boolean;
  titleClassName?: string;
  className?: string;
}

export function SectionHead({
  eyebrow,
  title,
  lede,
  wide,
  light,
  titleClassName,
  className,
}: SectionHeadProps) {
  return (
    <div className={cn("mb-[52px] max-w-[640px]", wide && "max-w-[760px]", className)}>
      <Eyebrow light={light}>{eyebrow}</Eyebrow>
      <h2
        className={cn(
          "font-display text-[clamp(1.6rem,2.1vw,2.05rem)] font-extrabold leading-[1.22] tracking-[-0.015em]",
          light ? "text-white" : "text-heading",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {lede ? (
        <p
          className={cn(
            "mt-4 max-w-[52ch] text-[clamp(1.05rem,1.3vw,1.2rem)] leading-[1.65]",
            light ? "text-[#C7D0E2]" : "text-text-secondary",
          )}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}
