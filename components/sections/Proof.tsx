import { Container } from "@/components/brand/Container";
import { SectionHead } from "@/components/brand/SectionHead";
import { Reveal } from "@/components/motion/Reveal";
import { StatCounters } from "@/components/motion/StatCounters";
import { metrics } from "@/content/metrics";

export function Proof() {
  return (
    <section id="prova" className="section-y bg-navy-gradient text-white">
      <Container>
        <Reveal>
          <SectionHead
            eyebrow="A complexidade que resolvemos pra você"
            title="A burocracia brasileira, resolvida por um só sistema."
            light
          />
        </Reveal>
        <StatCounters metrics={metrics} />
      </Container>
    </section>
  );
}
