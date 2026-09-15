import type { StoryBeat } from "./types";

export const storyBeats: StoryBeat[] = [
  {
    id: "financeiro",
    eyebrow: "Painel do Contador",
    title: "Entradas, saídas e conciliação no mesmo lugar.",
    body: "O financeiro deixa de viver na planilha. Receitas, despesas, boletos e conciliação bancária aparecem no Painel do Contador — a mesma tela que seu contador vai abrir no fim do mês.",
    caption: "Tela real do sistema — Painel do Contador e Financeiro",
    annotations: [
      "Entradas e saídas do mês",
      "Conciliação automática com o banco",
      "Boletos pagos e a receber",
    ],
    visual: "finance",
  },
  {
    id: "pdv",
    eyebrow: "Frente de caixa",
    title: "O caixa continua vendendo mesmo sem internet.",
    body: "NFC-e por QR Code, venda rápida e SEUPDV que segue rodando offline. Quando a conexão volta, tudo sincroniza sozinho — nenhuma venda fica no caderno.",
    caption: "Frente de caixa, PDV e SEUPDV",
    annotations: [
      "Modo offline com sincronização automática",
      "NFC-e emitida no balcão",
      "Pix, cartão e dinheiro no mesmo fluxo",
    ],
    visual: "pdv",
  },
  {
    id: "delivery",
    eyebrow: "Gestão inteligente",
    title: "Delivery sob controle — não no grupo do WhatsApp.",
    body: "O Painel do Entregador mostra o status de cada pedido em tempo real, do novo ao entregue. Loja física, delivery e fiscal conversam no mesmo sistema.",
    caption: "Painel do Entregador com status em tempo real",
    annotations: [
      "Pedidos novos, prontos e em rota",
      "Status visível para a operação",
      "Sem acompanhar entrega pelo WhatsApp",
    ],
    visual: "delivery",
  },
];
