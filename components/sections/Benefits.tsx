import { Container } from "@/components/brand/Container";
import { SectionHead } from "@/components/brand/SectionHead";
import { Reveal } from "@/components/motion/Reveal";
import { benefits } from "@/content/benefits";

export function Benefits() {
  return (
    <section id="beneficios" className="section-y">
      <Container narrow>
        <Reveal>
          <SectionHead eyebrow="O que muda no seu dia a dia" title="O que muda quando tudo conversa entre si." />
        </Reveal>
        <div>
          {benefits.map((benefit, index) => (
            <Reveal key={benefit.id} delay={index % 2 === 0 ? 0.04 : 0.08}>
              <article className="grid grid-cols-[76px_1fr] items-start gap-[22px] border-t border-border py-[30px] last:border-b md:even:grid-cols-[1fr_76px]">
                <span className="pt-1 font-display text-[13px] font-extrabold text-brand md:even:order-2 md:even:text-right">
                  {benefit.number}
                </span>
                <div className="md:even:order-1 md:even:ml-auto md:even:text-right">
                  <h3 className="max-w-[26ch] font-display text-[clamp(1.15rem,1.8vw,1.55rem)] font-extrabold text-heading md:even:ml-auto">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 max-w-[52ch] text-[0.98rem] text-text-secondary md:even:ml-auto">
                    {benefit.body}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
