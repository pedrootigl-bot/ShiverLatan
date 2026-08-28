export const SITE_NAME = "Shiver";
export const SITE_YEAR = 2026;
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
export const SITE_LOCALE = "pt_BR";

export const ROUTES = {
  home: "/",
  sala: "/sala",
  termos: "/termos",
  privacidade: "/privacidade",
} as const;

/** Tela de cadastro do backend (Site A). Em produção, defina NEXT_PUBLIC_REGISTER_URL. */
export const REGISTER_URL =
  process.env.NEXT_PUBLIC_REGISTER_URL ?? "http://localhost:3001/login";

export const CTA_HREF = REGISTER_URL;
export const CTA_LABEL = "Conheça a ferramenta";
export const SECONDARY_HREF = "#como-funciona";
export const SECONDARY_LABEL = "Como funciona";
export const CLOSER_HREF = "#comecar";

export const HASH_ALIASES: Record<string, string> = {
  comecar: "faq",
  home: "inicio",
  cta: "inicio",
};

export const PRELOADER = {
  exitMs: 2100,
  doneMs: 2550,
  failsafeMs: 3400,
} as const;

export const SEO = {
  title: "Shiver | Ferramenta para traders | Hora de comprar e vender",
  description:
    "Ferramenta da corretora Shiver para auxiliar o trader na hora de compra e venda. Tendência, momentum e volatilidade no mesmo painel. Sem robô: quem opera é você.",
  keywords: [
    "Shiver",
    "corretora Shiver",
    "ferramenta para traders",
    "hora de compra e venda",
    "tendência momentum volatilidade",
    "painel para traders",
    "timing de mercado",
    "análise de mercado",
  ],
  ogAlt: "Shiver — auxílio na hora de comprar e vender",
  salaTitle: "Sala de operação | Shiver",
  salaDescription:
    "O assistente dispara sinais na sala. Quem opera é você, no traderoom da corretora.",
  termosTitle: "Termos de uso",
  termosDescription:
    "Termos de uso da landing Shiver: a corretora, a ferramenta de auxílio ao trader e o que a prévia desta página apresenta.",
  privacidadeTitle: "Privacidade",
  privacidadeDescription:
    "Como a landing da corretora Shiver trata dados nesta versão: mínimo necessário, sem venda de informações e sem operação automática.",
} as const;

export const RISK_DISCLAIMER =
  "Negociar envolve risco de perda. A ferramenta auxilia a leitura e não garante resultado.";
