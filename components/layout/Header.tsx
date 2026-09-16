"use client";

import { useEffect, useState } from "react";
import { Menu, ChevronRight, X } from "lucide-react";
import { cn } from "cn";
import { Brandmark } from "@/components/brand/Brandmark";
import { Button } from "@/components/brand/Button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navItems } from "@/content/nav";
import { site } from "@/content/site";
import { handleInPageHashClick } from "@/lib/in-page-nav";

export function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setSolid(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "-72px 0px 0px 0px" },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[80] transition-[background-color,border-color,box-shadow] duration-300 ease-premium",
        solid
          ? "border-b border-border bg-white/88 shadow-[0_1px_0_rgba(11,31,58,0.02)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="wrap flex h-[76px] items-center justify-between">
        <Brandmark tone={solid ? "dark" : "light"} />
        <nav className="hidden items-center gap-[34px] font-display text-[14.5px] font-semibold min-[901px]:flex" aria-label="Principal">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(event) => handleInPageHashClick(event, item.href)}
              className={cn(
                "no-underline transition-colors duration-300",
                solid ? "text-text-secondary hover:text-heading" : "text-white/75 hover:text-white",
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Button
            href={site.demoUrl}
            variant="brand"
            size="nav"
            className="hidden min-[901px]:inline-flex"
          >
            Solicitar demonstração
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className={cn(
                "inline-flex size-11 items-center justify-center rounded-[9px] border-[1.5px] min-[901px]:hidden",
                solid ? "border-border-strong text-heading" : "border-white/35 text-white",
              )}
              aria-label="Abrir menu"
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[min(88vw,380px)] gap-0 bg-background p-0 sm:max-w-[380px]"
              showCloseButton={false}
            >
              <SheetHeader className="flex-row items-center justify-between border-b border-border px-[clamp(1rem,4vw,2rem)] py-[18px]">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Navegação da landing page Control
                </SheetDescription>
                <Brandmark tone="dark" />
                <SheetClose
                  className="inline-flex size-[42px] items-center justify-center rounded-[9px] border-[1.5px] border-border-strong"
                  aria-label="Fechar menu"
                >
                  <X className="size-4 stroke-heading" />
                </SheetClose>
              </SheetHeader>
              <nav className="flex flex-1 flex-col overflow-y-auto px-[clamp(1rem,4vw,2rem)]">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(event) => {
                      handleInPageHashClick(event, item.href);
                      setOpen(false);
                    }}
                    className="flex min-h-11 items-center justify-between border-b border-border py-[19px] font-display text-[1.08rem] font-bold text-heading no-underline"
                  >
                    {item.label}
                    <ChevronRight className="size-4 stroke-text-tertiary" />
                  </a>
                ))}
              </nav>
              <SheetFooter className="border-t border-border px-[clamp(1rem,4vw,2rem)] pt-5 pb-[30px]">
                <Button
                  href={site.demoUrl}
                  variant="brand"
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  Solicitar demonstração
                </Button>
                <p className="text-center text-sm text-text-tertiary">
                  Preencha o formulário e um consultor entra em contato.
                </p>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
