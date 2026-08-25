export const TRADE_ROOM_URL = "https://trade.shiverbroker.com/traderoom";

export const SALA_BOT_NAME = "Assistente Shiver";

export type ChatRole = "bot";
export type SignalSide = "compra" | "venda";
export type ChatStatus = "preview" | "connecting" | "online" | "offline";

export type SignalCard = {
  side: SignalSide;
  asset: string;
  entry: string;
  targets: string;
  stop: string;
};

export type ChatMessage = {
  id: string;
  role: ChatRole;
  time: string;
  signal: SignalCard;
};

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: "m1",
    role: "bot",
    time: "09:42",
    signal: {
      side: "compra",
      asset: "BTC/USDT",
      entry: "66.320,00",
      targets: "66.580 · 66.920",
      stop: "65.980,00",
    },
  },
  {
    id: "m2",
    role: "bot",
    time: "09:43",
    signal: {
      side: "venda",
      asset: "ETH/USDT",
      entry: "3.420,00",
      targets: "3.380 · 3.310",
      stop: "3.465,00",
    },
  },
];

export const CHAT_STATUS_LABEL: Record<ChatStatus, string> = {
  preview: "Prévia",
  connecting: "Conectando",
  online: "Online",
  offline: "Offline",
};

export type SalaEbook = {
  id: string;
  title: string;
  subtitle: string;
  pdfUrl?: string;
};

export const SALA_EBOOKS: SalaEbook[] = [
  {
    id: "timing",
    title: "Timing de compra e venda",
    subtitle: "Quando entrar e quando sair, com tendência e momentum.",
  },
  {
    id: "risco",
    title: "Gestão de risco",
    subtitle: "Stop, alvo e tamanho da posição — quem opera é você.",
  },
  {
    id: "painel",
    title: "Leitura do painel",
    subtitle: "Tendência, momentum e volatilidade no mesmo lugar.",
  },
  {
    id: "sala",
    title: "Operar na sala",
    subtitle: "O disparo é leitura. A ordem sai no traderoom.",
  },
];
