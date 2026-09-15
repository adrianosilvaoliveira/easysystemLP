import { Container } from "@/components/brand/Container";
import { Reveal } from "@/components/motion/Reveal";

export function Pivot() {
  return (
    <div className="bg-gradient-to-b from-brand-tint to-background py-[clamp(3.5rem,9vw,6.5rem)] text-center">
      <Container>
        <Reveal className="mx-auto max-w-[760px]">
          <div className="mx-auto mb-7 h-0.5 w-9 rounded-sm bg-brand" />
          <p className="font-display text-[clamp(1.4rem,2.6vw,2.05rem)] leading-[1.32] font-bold tracking-[-0.01em] text-heading">
            Dá pra ter o fiscal, a venda e o financeiro conversando sozinhos —{" "}
            <span className="font-semibold text-text-tertiary">
              sem depender da internet o tempo todo, nem da memória de ninguém.
            </span>
          </p>
        </Reveal>
      </Container>
    </div>
  );
}
