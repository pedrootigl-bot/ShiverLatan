import { FAQ_ITEMS } from "@/lib/faq";
import { ROUTES, SEO, SITE_NAME, SITE_URL } from "@/lib/config";

const logoUrl = `${SITE_URL}/icon`;

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: logoUrl,
    description: SEO.description,
    areaServed: "BR",
    knowsAbout: [
      "corretora",
      "ferramenta para traders",
      "tendência",
      "momentum",
      "volatilidade",
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "pt-BR",
    description: SEO.description,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function softwareJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${SITE_NAME} — ferramenta para traders`,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    inLanguage: "pt-BR",
    url: SITE_URL,
    description: SEO.description,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "BRL",
      lowPrice: "0",
      offerCount: 2,
      availability: "https://schema.org/PreOrder",
      offers: [
        {
          "@type": "Offer",
          name: "Grátis",
          price: "0",
          priceCurrency: "BRL",
        },
        {
          "@type": "Offer",
          name: "VIP",
          availability: "https://schema.org/PreOrder",
          priceCurrency: "BRL",
        },
      ],
    },
    featureList: [
      "Tendência",
      "Momentum",
      "Volatilidade",
      "Painel único para o timing de compra e venda",
    ],
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function webPageJsonLd(title: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
    inLanguage: "pt-BR",
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

function withoutContext(node: Record<string, unknown>) {
  const rest = { ...node };
  delete rest["@context"];
  return rest;
}

function jsonLdGraph(nodes: Record<string, unknown>[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.map(withoutContext),
  };
}

export function breadcrumbJsonLd(
  items: readonly { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path === "/" ? SITE_URL : `${SITE_URL}${item.path}`,
    })),
  };
}

export function homeJsonLd() {
  return jsonLdGraph([
    organizationJsonLd() as Record<string, unknown>,
    websiteJsonLd() as Record<string, unknown>,
    softwareJsonLd() as Record<string, unknown>,
    webPageJsonLd(SEO.title, SEO.description, ROUTES.home) as Record<
      string,
      unknown
    >,
    faqJsonLd() as Record<string, unknown>,
  ]);
}

export function legalJsonLd(kind: "termos" | "privacidade") {
  switch (kind) {
    case "termos":
      return jsonLdGraph([
        webPageJsonLd(
          SEO.termosTitle,
          SEO.termosDescription,
          ROUTES.termos,
        ) as Record<string, unknown>,
        breadcrumbJsonLd([
          { name: SITE_NAME, path: ROUTES.home },
          { name: SEO.termosTitle, path: ROUTES.termos },
        ]) as Record<string, unknown>,
      ]);
    case "privacidade":
      return jsonLdGraph([
        webPageJsonLd(
          SEO.privacidadeTitle,
          SEO.privacidadeDescription,
          ROUTES.privacidade,
        ) as Record<string, unknown>,
        breadcrumbJsonLd([
          { name: SITE_NAME, path: ROUTES.home },
          { name: SEO.privacidadeTitle, path: ROUTES.privacidade },
        ]) as Record<string, unknown>,
      ]);
    default: {
      const exhaustive: never = kind;
      throw new Error(`Página legal não tratada: ${String(exhaustive)}`);
    }
  }
}
