import type { Step } from "./types";

export const steps: Step[] = [
  {
    id: "configure",
    number: "PASSO 01",
    title: "Configure",
    body: "Cadastre empresa, produtos e usuários, e conecte sua maquininha ou adquirente.",
    visual: "fields",
  },
  {
    id: "venda",
    number: "PASSO 02",
    title: "Venda",
    body: "Emita NFe, NFCe ou NFSe direto do pedido, no PDV, no SEUPDV ou na loja virtual.",
    visual: "sale",
  },
  {
    id: "acompanhe",
    number: "PASSO 03",
    title: "Acompanhe",
    body: "Financeiro, estoque e delivery em tempo real, com painel pronto pro seu contador.",
    visual: "chart",
  },
  {
    id: "cresca",
    number: "PASSO 04",
    title: "Cresça",
    body: "Adicione produção, contratos e marketplaces conforme sua operação evolui.",
    visual: "modules",
  },
];
