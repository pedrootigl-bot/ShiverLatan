import { EBOOK_01_BODY } from "@/lib/ebook01";
import { EBOOK_02_BODY } from "@/lib/ebook02";
import { EBOOK_03_BODY } from "@/lib/ebook03";
import { EBOOK_04_BODY } from "@/lib/ebook04";
import { EBOOK_05_BODY } from "@/lib/ebook05";
import { EBOOK_06_BODY } from "@/lib/ebook06";
import { EBOOK_07_BODY } from "@/lib/ebook07";
import { EBOOK_08_BODY } from "@/lib/ebook08";
import { EBOOK_09_BODY } from "@/lib/ebook09";
import { EBOOK_10_BODY } from "@/lib/ebook10";
import { EBOOK_11_BODY } from "@/lib/ebook11";
import { EBOOK_12_BODY } from "@/lib/ebook12";
import { EBOOK_13_BODY } from "@/lib/ebook13";
import { EBOOK_14_BODY } from "@/lib/ebook14";
import { EBOOK_15_BODY } from "@/lib/ebook15";
import { EBOOK_16_BODY } from "@/lib/ebook16";
import { EBOOK_17_BODY } from "@/lib/ebook17";
import type { Locale } from "@/lib/i18n/locale";
import type { SalaEbookBlock } from "@/lib/salaEbook";

export const TRADE_ROOM_ORIGIN = "https://trade.shiverbroker.com";
export const TRADE_ROOM_URL = `${TRADE_ROOM_ORIGIN}/traderoom`;

export const BROKER_SESSION_WAIT_KEY = "shiver-await-broker-session";
export const BROKER_BACKEND_AUTH_KEY = "shiver-backend-auth";
export const BROKER_BACKEND_AUTH_RELOAD_KEY = "shiver-backend-auth-reload";

export function tradeRoomUrl(locale: Locale): string {
  switch (locale) {
    case "pt":
      return `${TRADE_ROOM_ORIGIN}/pt/traderoom`;
    case "es":
      return `${TRADE_ROOM_ORIGIN}/es/traderoom`;
    default: {
      const _never: never = locale;
      return _never;
    }
  }
}

export const SALA_BOT_NAME = "Assistente Shiver";

export type SalaEbookTone = "cyan" | "green" | "amber" | "violet";

export type { SalaEbookBlock, SalaEbookCalloutTone, SalaEbookFigureId } from "@/lib/salaEbook";

export type SalaEbook = {
  id: string;
  title: string;
  subtitle: string;
  kicker: string;
  coverLabel: string;
  coverTone: SalaEbookTone;
  coverSrc?: string;
  body: SalaEbookBlock[];
};

export const SALA_EBOOKS: SalaEbook[] = [
  {
    id: "timing",
    title: "100% por regras no M5",
    subtitle: "Menos pressa, mais leitura.",
    kicker: "E-book 01",
    coverLabel: "M5",
    coverTone: "cyan",
    coverSrc: "/images/ebooks/ebook-01-m5.png",
    body: EBOOK_01_BODY,
  },
  {
    id: "indicadores",
    title: "Para que servem os indicadores de trade?",
    subtitle: "O preço decide. O indicador confirma.",
    kicker: "E-book 02",
    coverLabel: "IND",
    coverTone: "green",
    coverSrc: "/images/ebooks/ebook-02-indicadores.png",
    body: EBOOK_02_BODY,
  },
  {
    id: "diario",
    title: "Diário do trader",
    subtitle: "Organização que sustenta a performance.",
    kicker: "E-book 03",
    coverLabel: "LOG",
    coverTone: "amber",
    coverSrc: "/images/ebooks/ebook-03-diario.png",
    body: EBOOK_03_BODY,
  },
  {
    id: "consistencia",
    title: "Como de fato ganhar dinheiro no mercado financeiro?",
    subtitle: "Consistência vence ganhos rápidos.",
    kicker: "E-book 04",
    coverLabel: "RISCO",
    coverTone: "violet",
    coverSrc: "/images/ebooks/ebook-04-consistencia.png",
    body: EBOOK_04_BODY,
  },
  {
    id: "horarios",
    title: "Melhores horários para investir e operar no mercado",
    subtitle: "Sessão certa, liquidez certa.",
    kicker: "E-book 05",
    coverLabel: "24H",
    coverTone: "cyan",
    coverSrc: "/images/ebooks/ebook-05-horarios.png",
    body: EBOOK_05_BODY,
  },
  {
    id: "psicologia",
    title: "Psicologia do trader nas binárias",
    subtitle: "Domine a mente antes do mercado.",
    kicker: "E-book 06",
    coverLabel: "MIND",
    coverTone: "green",
    coverSrc: "/images/ebooks/ebook-06-psicologia.png",
    body: EBOOK_06_BODY,
  },
  {
    id: "golpes",
    title: "Como evitar golpes e promessas falsas",
    subtitle: "Conhecimento para operar com segurança.",
    kicker: "E-book 07",
    coverLabel: "ALERT",
    coverTone: "amber",
    coverSrc: "/images/ebooks/ebook-07-golpes.png",
    body: EBOOK_07_BODY,
  },
  {
    id: "plano",
    title: "Plano de operações nas binárias",
    subtitle: "Antes, durante e depois da operação.",
    kicker: "E-book 08",
    coverLabel: "PLAN",
    coverTone: "violet",
    coverSrc: "/images/ebooks/ebook-08-plano.png",
    body: EBOOK_08_BODY,
  },
  {
    id: "recuperacao",
    title: "Estratégias de recuperação de loss",
    subtitle: "Técnicas para gerenciar perdas com disciplina.",
    kicker: "E-book 09",
    coverLabel: "LOSS",
    coverTone: "cyan",
    coverSrc: "/images/ebooks/ebook-09-recuperacao.png",
    body: EBOOK_09_BODY,
  },
  {
    id: "banca",
    title: "Gestão de banca para contas pequenas",
    subtitle: "Disciplina, paciência e foco no longo prazo.",
    kicker: "E-book 10",
    coverLabel: "1%",
    coverTone: "green",
    coverSrc: "/images/ebooks/ebook-10-banca.png",
    body: EBOOK_10_BODY,
  },
  {
    id: "timeframes",
    title: "Estratégias de M1, M5 e M15",
    subtitle: "Escolher o tempo certo muda a leitura.",
    kicker: "E-book 11",
    coverLabel: "TF",
    coverTone: "amber",
    coverSrc: "/images/ebooks/ebook-11-timeframes.png",
    body: EBOOK_11_BODY,
  },
  {
    id: "origem",
    title: "Como o mercado financeiro surgiu?",
    subtitle: "Educativo — para iniciantes.",
    kicker: "E-book 12",
    coverLabel: "ORIGEM",
    coverTone: "violet",
    coverSrc: "/images/ebooks/ebook-12-origem.png",
    body: EBOOK_12_BODY,
  },
  {
    id: "pares",
    title: "O que são pares de moedas e suas correlações?",
    subtitle: "Entenda a base do trade.",
    kicker: "E-book 13",
    coverLabel: "FX",
    coverTone: "cyan",
    coverSrc: "/images/ebooks/ebook-13-pares.png",
    body: EBOOK_13_BODY,
  },
  {
    id: "rotina",
    title: "Como operar com pouco tempo por dia",
    subtitle: "Estratégias para quem tem rotina apertada.",
    kicker: "E-book 14",
    coverLabel: "30M",
    coverTone: "green",
    coverSrc: "/images/ebooks/ebook-14-rotina.png",
    body: EBOOK_14_BODY,
  },
  {
    id: "mindset",
    title: "Mindset de consistência nas binárias",
    subtitle: "Disciplina mental aplicada ao trading.",
    kicker: "E-book 15",
    coverLabel: "MIND",
    coverTone: "amber",
    coverSrc: "/images/ebooks/ebook-15-mindset.png",
    body: EBOOK_15_BODY,
  },
  {
    id: "suporte",
    title: "O que são suporte e resistência?",
    subtitle: "A base para qualquer estratégia.",
    kicker: "E-book 16",
    coverLabel: "S/R",
    coverTone: "violet",
    coverSrc: "/images/ebooks/ebook-16-suporte.png",
    body: EBOOK_16_BODY,
  },
  {
    id: "tendencia",
    title: "Como usar linhas de tendência corretamente?",
    subtitle: "Entenda na prática agora.",
    kicker: "E-book 17",
    coverLabel: "TREND",
    coverTone: "cyan",
    coverSrc: "/images/ebooks/ebook-17-tendencia.png",
    body: EBOOK_17_BODY,
  },
];
