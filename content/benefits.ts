import type { Benefit } from "./types";

export const benefits: Benefit[] = [
  {
    id: "financeiro",
    number: "01",
    title: "Saiba quanto entrou e quanto saiu sem abrir uma planilha.",
    body: "Contas a pagar, a receber e conciliação bancária direto no painel financeiro.",
  },
  {
    id: "offline",
    number: "02",
    title: "Nunca perca uma venda por falta de internet.",
    body: "O SEUPDV vende offline e sincroniza sozinho assim que a conexão volta.",
  },
  {
    id: "nota",
    number: "03",
    title: "Um clique a menos entre o pedido e a nota fiscal.",
    body: "Pedido de venda e ordem de serviço já emitem o documento fiscal correspondente.",
  },
  {
    id: "contador",
    number: "04",
    title: "Seu contador entra, vê tudo, e já sabe o que fazer.",
    body: "Painel do Contador com relatórios e conciliação prontos, sem planilha paralela.",
  },
  {
    id: "delivery",
    number: "05",
    title: "Delivery sob controle — não no grupo do WhatsApp.",
    body: "Painel do Entregador com o status de cada pedido, do novo ao entregue.",
  },
  {
    id: "tef",
    number: "06",
    title: "Uma integração só pra todas as suas maquininhas.",
    body: "TEF Hub Elgin e SEUPOS Hub reúnem vários motores de pagamento numa única conexão.",
  },
];
