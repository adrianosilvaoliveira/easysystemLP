import { Container } from "@/components/brand/Container";
import { Eyebrow } from "@/components/brand/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { pains } from "@/content/pains";

export function Problem() {
  return (
    <section id="problema" className="section-y">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <Eyebrow>O que está travando seu negócio</Eyebrow>
            <h2 className="mb-5 max-w-[18ch] font-display text-[clamp(2rem,3.2vw,3.05rem)] font-extrabold leading-[1.14] text-heading">
              Se seu dia começa apagando os mesmos incêndios, o problema não é você.
            </h2>
            <p className="max-w-[60ch] text-[1.05rem] leading-[1.68] text-text-secondary">
              A maioria dos negócios brasileiros não perde dinheiro por falta de esforço — perde por
              operar com sistemas que não conversam entre si.
            </p>
          </Reveal>
          <ul className="m-0 list-none border-b border-border p-0">
            {pains.map((pain, index) => (
              <li key={pain.id}>
              <Reveal variant="left" delay={index * 0.05}>
                <div className="grid grid-cols-[44px_1fr] gap-[18px] border-t border-border py-[26px]">
                  <span className="pt-0.5 font-display text-sm font-extrabold text-border-strong">
                    {pain.number}
                  </span>
                  <div>
                    <h3 className="mb-1.5 text-[1.12rem] font-extrabold text-heading">{pain.title}</h3>
                    <p className="max-w-[56ch] text-[0.98rem] leading-[1.58] text-text-secondary">
                      {pain.body}
                    </p>
                  </div>
                </div>
              </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
