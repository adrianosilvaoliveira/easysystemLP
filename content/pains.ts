import type { PainPoint } from "./types";

export const pains: PainPoint[] = [
  {
    id: "silos",
    number: "01",
    title: "Fiscal, vendas e financeiro em lugares diferentes",
    body: "A nota sai de um sistema, a venda fica registrada em outro, e o financeiro sobra pra planilha à parte.",
  },
  {
    id: "offline",
    number: "02",
    title: "O caixa para quando a internet cai",
    body: "Cada minuto offline é uma venda que pode simplesmente ir embora com o cliente.",
  },
  {
    id: "contador",
    number: "03",
    title: "Seu contador refém de print e planilha",
    body: "Toda apuração vira um pedido de relatório manual, feito às pressas no fim do mês.",
  },
  {
    id: "adquirentes",
    number: "04",
    title: "Cada adquirente, uma integração diferente",
    body: "TEF, maquininha, Pix: tudo separado, tudo reconfigurado outra vez a cada troca.",
  },
  {
    id: "canais",
    number: "05",
    title: "Delivery, loja física e WhatsApp desconectados",
    body: "Pedido, status e taxa de entrega vivendo em três lugares diferentes ao mesmo tempo.",
  },
];
