"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn } from "cn";
import { Button } from "@/components/brand/Button";
import { Container } from "@/components/brand/Container";
import { SectionHead } from "@/components/brand/SectionHead";
import { Reveal } from "@/components/motion/Reveal";
import { DeliveryMock } from "@/components/product/DeliveryMock";
import { FinanceMock } from "@/components/product/FinanceMock";
import { PdvMock } from "@/components/product/PdvMock";
import { storyBeats } from "@/content/story";
import { site } from "@/content/site";
import type { StoryBeat } from "@/content/types";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function BeatVisual({ beat }: { beat: StoryBeat }) {
  if (beat.visual === "pdv") {
    return (
      <div className="overflow-hidden rounded-lg border border-border bg-surface shadow-lg">
        <PdvMock />
      </div>
    );
  }

  if (beat.visual === "delivery") {
    return (
      <div className="overflow-hidden rounded-lg border border-border bg-surface shadow-lg">
        <DeliveryMock />
      </div>
    );
  }

  return <FinanceMock size="story" />;
}

function Annotations({ items }: { items: string[] }) {
  const positions = [
    "lg:absolute lg:-top-5 lg:left-16",
    "lg:absolute lg:top-[44%] lg:-right-8",
    "lg:absolute lg:-bottom-5 lg:left-[44%]",
  ];

  return (
    <div className="mt-3 flex flex-col gap-2.5 lg:mt-0">
      {items.map((item, index) => (
        <div
          key={item}
          className={cn(
            "z-[4] flex items-center gap-2 rounded-[22px] border border-border bg-surface px-[15px] py-2 pl-[11px] shadow-md",
            positions[index],
          )}
        >
          <span className="size-[7px] shrink-0 rounded-full bg-brand" />
          <span className="font-display text-[12.5px] font-bold whitespace-nowrap text-heading">
            {item}
          </span>
        </div>
      ))}
    </div>
  );
}

function BeatCopy({ beat, activeIndex }: { beat: StoryBeat; activeIndex: number }) {
  return (
    <div>
      <p className="mb-3 font-display text-[12.5px] font-bold tracking-[0.14em] text-brand uppercase">
        {beat.eyebrow}
      </p>
      <h3 className="max-w-[18ch] font-display text-[clamp(1.45rem,2vw,1.9rem)] font-extrabold leading-snug text-heading">
        {beat.title}
      </h3>
      <p className="mt-4 max-w-[46ch] text-[1.02rem] leading-[1.65] text-text-secondary">{beat.body}</p>
      <div className="mt-8 flex gap-2" aria-hidden="true">
        {storyBeats.map((item, index) => (
          <span
            key={item.id}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors duration-300",
              index <= activeIndex ? "bg-brand" : "bg-border",
            )}
          />
        ))}
      </div>
      <p className="mt-5 font-display text-[12.5px] font-semibold text-text-tertiary">{beat.caption}</p>
    </div>
  );
}

export function ProductStory() {
  const pinRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const beat = storyBeats[active] ?? storyBeats[0];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        if (!pinRef.current) return;

        ScrollTrigger.create({
          trigger: pinRef.current,
          start: "top top",
          end: "+=220%",
          pin: true,
          scrub: 0.65,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const next = Math.min(
              storyBeats.length - 1,
              Math.floor(self.progress * storyBeats.length),
            );
            setActive((prev) => (prev === next ? prev : next));
          },
        });
      });

      return () => mm.revert();
    },
    { scope: pinRef, dependencies: [reduced] },
  );

  return (
    <section id="demonstracao" className="scroll-mt-[76px] bg-surface-alt">
      <div className="section-y lg:hidden">
        <Container>
          <Reveal>
            <SectionHead
              eyebrow="Por dentro do sistema"
              title="Veja o sistema por dentro, tela por tela."
              lede="Do painel financeiro ao caixa da loja — as mesmas telas que sua equipe vai usar todos os dias."
              wide
            />
          </Reveal>
          <div className="flex flex-col gap-14">
            {storyBeats.map((item, index) => (
              <Reveal key={item.id} variant={index % 2 === 0 ? "up" : "scale"} delay={0.04}>
                <BeatCopy beat={item} activeIndex={index} />
                <div className="relative mt-6">
                  <BeatVisual beat={item} />
                  <Annotations items={item.annotations} />
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-11 flex justify-center">
            <Button href={site.whatsappUrl} variant="text" external className="group hover:translate-y-0">
              Fale com a gente e veja isso funcionando na sua operação
              <ArrowRight className="size-[15px] transition-transform duration-200 group-hover:translate-x-0.5" />
            </Button>
          </Reveal>
        </Container>
      </div>

      <div ref={pinRef} className="hidden lg:block">
        <div className="flex h-screen flex-col justify-center pt-[76px]">
          <Container>
            <p className="mb-8 font-display text-[12.5px] font-bold tracking-[0.14em] text-brand uppercase">
              Por dentro do sistema — tela por tela
            </p>
            <div className="grid grid-cols-[0.92fr_1.08fr] items-center gap-16">
              <AnimatePresence mode="wait">
                <motion.div
                  key={beat.id}
                  initial={reduced ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: [0.16, 0.8, 0.24, 1] }}
                >
                  <BeatCopy beat={beat} activeIndex={active} />
                </motion.div>
              </AnimatePresence>
              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={beat.id}
                    initial={reduced ? false : { opacity: 0, scale: 0.98, x: 18 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={reduced ? undefined : { opacity: 0, scale: 0.99, x: -12 }}
                    transition={{ duration: 0.5, ease: [0.16, 0.8, 0.24, 1] }}
                    className="relative"
                  >
                    <BeatVisual beat={beat} />
                    <Annotations items={beat.annotations} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </Container>
        </div>
      </div>

      <div className="hidden justify-center pb-24 lg:flex">
        <Button href={site.whatsappUrl} variant="text" external className="group hover:translate-y-0">
          Fale com a gente e veja isso funcionando na sua operação
          <ArrowRight className="size-[15px] transition-transform duration-200 group-hover:translate-x-0.5" />
        </Button>
      </div>
    </section>
  );
}
