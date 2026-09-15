import type { FaqItem } from "./types";

export const faq: FaqItem[] = [
  {
    question: "Preciso instalar algum programa?",
    answer:
      "Não. O Control roda direto no navegador, em qualquer desktop, notebook ou tablet. Para o caixa físico, o SEUPDV e o SEUPOS têm apps próprios para Android, iOS e maquininhas POS.",
  },
  {
    question: "E se a internet cair no meio de uma venda?",
    answer:
      "O SEUPDV continua vendendo offline, emite NFC-e e Pedido de Venda direto no caixa, e sincroniza tudo automaticamente assim que a conexão volta.",
  },
  {
    question: "É difícil de usar?",
    answer:
      "O sistema foi desenhado pra ser simples do cadastro à emissão fiscal — dá pra abrir caixa, vender e emitir nota em poucos cliques, sem treinamento longo.",
  },
  {
    question: "Funciona para o meu segmento?",
    answer:
      "Atende autopeças, mercados, lojas de roupas, panificadoras, joalherias, prestadores de serviço, indústrias e mais de uma dezena de outros segmentos, com a legislação fiscal de todos os estados.",
  },
  {
    question: "Meu contador vai conseguir acompanhar?",
    answer:
      "Sim. O Painel do Contador foi feito exatamente pra isso: relatórios, conciliação bancária e documentos fiscais organizados, sem planilha paralela.",
  },
  {
    question: "Os planos têm limite de nota fiscal?",
    answer:
      "Não. Todos os planos, do Básico ao Premium, têm emissão ilimitada de documentos fiscais.",
  },
];
