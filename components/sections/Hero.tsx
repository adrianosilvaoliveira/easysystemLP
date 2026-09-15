import { Container } from "@/components/brand/Container";
import { HeroCopy } from "@/components/motion/HeroCopy";
import { HeroVisual } from "@/components/product/HeroVisual";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-navy-gradient pt-[108px] pb-16 text-white lg:pb-24"
    >
      <svg
        className="pointer-events-none absolute -top-[120px] -right-[220px] z-0 h-[760px] w-[760px] opacity-70 max-[1000px]:opacity-35"
        viewBox="0 0 400 400"
        aria-hidden="true"
      >
        <circle cx="200" cy="200" r="170" fill="none" stroke="#fff" strokeOpacity="0.06" strokeWidth="34" />
        <circle cx="200" cy="200" r="120" fill="none" stroke="#fff" strokeOpacity="0.08" strokeWidth="1.5" />
        <circle cx="200" cy="200" r="80" fill="none" stroke="#E71962" strokeOpacity="0.5" strokeWidth="2" />
        <circle cx="200" cy="200" r="4" fill="#E71962" />
      </svg>
      <Container>
        <div className="relative z-10 grid items-center gap-10 pt-4 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:pt-7">
          <HeroCopy />
          <HeroVisual />
        </div>
      </Container>
    </section>
  );
}
