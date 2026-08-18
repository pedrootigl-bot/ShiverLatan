export const SITE_NAME = "Shiver";
export const SITE_YEAR = 2026;
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
export const SITE_LOCALE = "pt_BR";

export const CTA_HREF = "#ferramenta";
export const CTA_LABEL = "Conheça a ferramenta";
export const SECONDARY_HREF = "#como-funciona";
export const SECONDARY_LABEL = "Como funciona";
export const CLOSER_HREF = "#comecar";

export const ROUTES = {
  home: "/",
  termos: "/termos",
  privacidade: "/privacidade",
} as const;

export const HASH_ALIASES: Record<string, string> = {
  comecar: "faq",
};

export const PRELOADER = {
  storageKey: "shiver-preloader-v2",
  exitMs: 2100,
  doneMs: 2550,
  failsafeMs: 3400,
} as const;

export const SEO = {
  title: "Shiver — Auxílio na hora de comprar e vender",
  description:
    "Ferramenta da corretora Shiver para auxiliar o trader na hora de compra e venda. Tendência, momentum e volatilidade no mesmo painel. A ferramenta não opera sozinha.",
  keywords: [
    "Shiver",
    "corretora",
    "ferramenta para traders",
    "hora de compra e venda",
    "tendência momentum volatilidade",
  ],
  termosTitle: "Termos de uso",
  termosDescription:
    "Termos de uso da landing Shiver: a corretora, a ferramenta de auxílio ao trader e o que a prévia desta página apresenta.",
  privacidadeTitle: "Privacidade",
  privacidadeDescription:
    "Como a landing da corretora Shiver trata dados nesta versão: mínimo necessário, sem venda de informações e sem operação automática.",
} as const;

export const RISK_DISCLAIMER =
  "Negociar envolve risco de perda. A ferramenta auxilia a leitura e não garante resultado.";
