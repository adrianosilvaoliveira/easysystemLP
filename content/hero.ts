import type { HeroContent } from "./types";
import { site } from "./site";

export const hero: HeroContent = {
  pills: ["Para lojistas", "Para prestadores de serviço", "Para indústrias"],
  headline: "Do balcão ao contador, sua empresa inteira ",
  headlineAccent: "em uma tela só",
  lede: site.description,
  primaryCta: {
    label: "Solicitar demonstração",
    href: site.demoUrl,
    variant: "brand",
  },
  secondaryCta: {
    label: "Ver como funciona",
    href: "#demonstracao",
    variant: "ghost-dark",
  },
  microcopy: "Preencha o formulário e um consultor entra em contato.",
  trust: [
    `A partir de ${site.startingPrice}/mês`,
    "Emissão ilimitada de documentos fiscais",
    "Funciona no celular, tablet, notebook e desktop",
  ],
};
