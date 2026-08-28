export type PlanId = "gratis" | "vip";

export type Plan = {
  id: PlanId;
  name: string;
  price: string;
  cadence: string;
  cta: string;
  href: string;
  featured: boolean;
  badge?: string;
  features: string[];
};

export const PLANS: Plan[] = [
  {
    id: "gratis",
    name: "Grátis",
    price: "R$ 0",
    cadence: "para começar",
    cta: "Começar grátis",
    href: "#ferramenta",
    featured: false,
    features: [
      "Painel com tendência, momentum e volatilidade",
      "Auxílio no timing de compra e venda",
      "Insights do que o painel está lendo",
      "Sem robô: quem opera é você",
    ],
  },
  {
    id: "vip",
    name: "VIP",
    price: "60 R$",
    cadence: "acesso completo",
    cta: "Quero o VIP",
    href: "#ferramenta",
    featured: true,
    badge: "Popular",
    features: [
      "Tudo do plano Grátis",
      "Leitura mais profunda do mesmo cenário",
      "Mais contexto na hora de decidir",
      "Recortes extras do momento de mercado",
      "Prioridade quando novos recursos abrirem",
    ],
  },
];
