import { Button } from "@/components/brand/Button";
import { Container } from "@/components/brand/Container";
import { Eyebrow } from "@/components/brand/Eyebrow";
import { DemoForm } from "@/components/forms/DemoForm";
import { Reveal } from "@/components/motion/Reveal";
import { contactChannels } from "@/content/contact";

export function Contact() {
  return (
    <section id="contato" className="section-y bg-navy-gradient text-white">
      <Container>
        <div className="grid items-start gap-[52px] lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <Reveal>
            <Eyebrow light>Próximo passo</Eyebrow>
            <h2 className="max-w-[18ch] font-display text-[clamp(2rem,3.2vw,3.05rem)] font-extrabold leading-[1.14] text-white">
              Pronto pra parar de administrar cinco sistemas ao mesmo tempo?
            </h2>
            <p className="mt-[18px] max-w-[52ch] text-[clamp(1.05rem,1.3vw,1.2rem)] leading-[1.65] text-[#C7D0E2]">
              Deixe seu WhatsApp. Um consultor mostra o Control com a realidade do seu negócio.
            </p>
            <div className="mt-[30px]">
              <Button href="#planos" variant="ghost-dark">
                Ver planos e preços
              </Button>
            </div>
            <div className="mt-10 rounded-md border border-white/16 bg-white/6 px-[22px] py-2 backdrop-blur-sm">
              {contactChannels.map((channel) => (
                <div
                  key={channel.label}
                  className="flex justify-between gap-3 border-b border-dashed border-white/20 py-[15px] text-sm last:border-b-0"
                >
                  <span className="text-[#93A0B8]">{channel.label}</span>
                  <a
                    href={channel.href}
                    className="font-display font-bold text-white no-underline hover:text-accent-pink"
                    target={channel.external ? "_blank" : undefined}
                    rel={channel.external ? "noopener noreferrer" : undefined}
                  >
                    {channel.value}
                  </a>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <DemoForm />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
