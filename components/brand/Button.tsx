import Link from "next/link";
import { cn } from "cn";
import type { Cta, CtaVariant } from "@/content/types";

const variantClass: Record<CtaVariant, string> = {
  brand:
    "border-transparent bg-brand text-white shadow-[0_10px_22px_-11px_rgba(231,25,98,0.38)] hover:bg-brand-deep hover:shadow-[0_14px_28px_-12px_rgba(231,25,98,0.44)]",
  outline:
    "border-border-strong bg-transparent text-heading hover:border-brand hover:text-brand",
  "ghost-dark":
    "border-white/30 bg-white/7 text-white hover:border-white/50 hover:bg-white/14",
  text: "gap-1.5 border-none bg-transparent px-0 py-0.5 text-[14.5px] text-brand hover:translate-y-0",
};

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: CtaVariant;
  external?: boolean;
  className?: string;
  size?: "default" | "nav";
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export function Button({
  href,
  children,
  variant = "brand",
  external,
  className,
  size = "default",
  onClick,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-[10px] border-[1.5px] font-display text-[15px] font-bold whitespace-nowrap transition-[transform,box-shadow,background-color,border-color,color] duration-200 ease-premium",
    "hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
    "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand",
    size === "nav" ? "px-5 py-[11px] text-[13.8px]" : "px-[26px] py-[15px]",
    variantClass[variant],
    className,
  );

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  const isAbsolute = href.startsWith("http://") || href.startsWith("https://");

  if (isAbsolute) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} onClick={onClick}>
      {children}
    </Link>
  );
}

export function CtaButton({ cta, className, size }: { cta: Cta; className?: string; size?: "default" | "nav" }) {
  return (
    <Button
      href={cta.href}
      variant={cta.variant}
      external={cta.external}
      className={className}
      size={size}
    >
      {cta.label}
    </Button>
  );
}
