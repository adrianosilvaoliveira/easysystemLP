import { Brandmark } from "@/components/brand/Brandmark";
import { Container } from "@/components/brand/Container";

export function Footer() {
  return (
    <footer className="border-t border-border py-[30px]">
      <Container className="flex flex-wrap items-center justify-between gap-3.5">
        <Brandmark className="text-base" tone="dark" />
        <p className="max-w-[640px] text-[12.5px] leading-[1.6] text-text-tertiary">
          As funcionalidades e valores descritos podem variar conforme o plano contratado. Fale com
          nosso time para confirmar o que está incluído na sua assinatura. Material informativo e
          comercial, sujeito a atualização sem aviso prévio.
        </p>
      </Container>
    </footer>
  );
}
