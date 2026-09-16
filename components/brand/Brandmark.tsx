"use client";

import { cn } from "cn";
import { site } from "@/content/site";
import { handleInPageHashClick } from "@/lib/in-page-nav";

interface BrandmarkProps {
  className?: string;
  tone?: "light" | "dark";
  href?: string | null;
  name?: string;
}

export function Brandmark({ className, tone = "dark", href = "#top", name = site.name }: BrandmarkProps) {
  const classes = cn(
    "flex items-center gap-2.5 font-display text-[19px] font-extrabold no-underline transition-colors duration-300",
    tone === "light" ? "text-white" : "text-heading",
    className,
  );

  const mark = (
    <>
      <span className="relative size-[26px] shrink-0 rounded-[7px] bg-brand after:absolute after:inset-[7px] after:rounded-[3px] after:border-2 after:border-white" />
      {name}
    </>
  );

  if (!href) {
    return <span className={classes}>{mark}</span>;
  }

  return (
    <a href={href} onClick={(event) => handleInPageHashClick(event, href)} className={classes}>
      {mark}
    </a>
  );
}
