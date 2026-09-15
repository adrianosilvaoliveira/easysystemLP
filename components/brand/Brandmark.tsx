import { cn } from "cn";
import { site } from "@/content/site";

interface BrandmarkProps {
  className?: string;
  tone?: "light" | "dark";
  href?: string;
}

export function Brandmark({ className, tone = "dark", href = "#top" }: BrandmarkProps) {
  return (
    <a
      href={href}
      className={cn(
        "flex items-center gap-2.5 font-display text-[19px] font-extrabold no-underline transition-colors duration-300",
        tone === "light" ? "text-white" : "text-heading",
        className,
      )}
    >
      <span className="relative size-[26px] shrink-0 rounded-[7px] bg-brand after:absolute after:inset-[7px] after:rounded-[3px] after:border-2 after:border-white" />
      {site.name}
    </a>
  );
}
