import { FileText } from "lucide-react";
import { Container } from "@/components/brand/Container";
import { SectionHead } from "@/components/brand/SectionHead";
import { Reveal } from "@/components/motion/Reveal";
import { capabilities } from "@/content/capabilities";

export function Features() {
  return (
    <section id="funcionalidades" className="section-y bg-surface-alt">
      <Container>
        <Reveal>
          <SectionHead
            eyebrow="Tudo incluído"
            title="Por dentro do sistema — sem letra miúda."
            lede="Uma lista honesta de tudo que está disponível no Control, organizada por frente de trabalho."
            wide
          />
        </Reveal>
        <Reveal variant="scale">
          <div className="overflow-hidden rounded-lg border border-border bg-surface shadow-sm">
            <div className="flex items-center gap-2.5 bg-navy px-[30px] py-[15px] font-display text-[11.5px] font-bold tracking-[0.1em] text-white uppercase">
              <FileText className="size-[15px] stroke-accent-pink" />
              Ficha técnica do sistema
            </div>
            <div>
              {capabilities.map((group) => (
                <div
                  key={group.title}
                  className="grid gap-3 border-b border-border px-5 py-[22px] last:border-b-0 even:bg-surface-alt sm:grid-cols-[230px_1fr] sm:gap-8 sm:px-[30px] sm:py-[26px]"
                >
                  <div className="font-display text-[1.02rem] font-extrabold text-heading">
                    {group.title}
                    <span className="mt-1 block font-sans text-[0.85rem] font-normal text-text-tertiary">
                      {group.subtitle}
                    </span>
                  </div>
                  <div className="text-[0.95rem] leading-[2.1] text-text-secondary">
                    {group.items.map((item, index) => (
                      <span key={item} className="whitespace-nowrap">
                        {item}
                        {index < group.items.length - 1 ? (
                          <span className="mx-3 text-border-strong">·</span>
                        ) : null}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
