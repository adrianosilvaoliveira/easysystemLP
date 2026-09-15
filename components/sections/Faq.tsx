"use client";

import { Plus } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Container } from "@/components/brand/Container";
import { SectionHead } from "@/components/brand/SectionHead";
import { Reveal } from "@/components/motion/Reveal";
import { faq } from "@/content/faq";

export function Faq() {
  return (
    <section id="objecoes" className="section-y bg-surface-alt">
      <Container narrow>
        <Reveal>
          <SectionHead
            eyebrow="Antes de você perguntar"
            title="Perguntas que todo mundo faz antes de trocar de sistema."
          />
        </Reveal>
        <Reveal>
          <Accordion className="border-t border-border">
            {faq.map((item) => (
              <AccordionItem key={item.question} value={item.question} className="border-b border-border">
                <AccordionTrigger className="rounded-none py-6 font-display text-[1.02rem] font-bold text-heading hover:text-brand hover:no-underline **:data-[slot=accordion-trigger-icon]:hidden">
                  {item.question}
                  <span className="ml-auto flex size-[26px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-border-strong transition-transform duration-300 ease-premium group-aria-expanded/accordion-trigger:rotate-45 group-aria-expanded/accordion-trigger:border-brand">
                    <Plus className="size-3 stroke-heading group-aria-expanded/accordion-trigger:stroke-brand" />
                  </span>
                </AccordionTrigger>
                <AccordionContent className="max-w-[66ch] pb-[26px] text-[0.98rem] leading-[1.62] text-text-secondary">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </Container>
    </section>
  );
}
