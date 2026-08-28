import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import SalaApp from "@/components/sala/SalaApp";
import { ROUTES, SEO } from "@/lib/config";
import { webPageJsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: SEO.salaTitle,
  description: SEO.salaDescription,
  alternates: {
    canonical: ROUTES.sala,
  },
  openGraph: {
    title: SEO.salaTitle,
    description: SEO.salaDescription,
    url: ROUTES.sala,
    type: "website",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function SalaPage() {
  return (
    <>
      <JsonLd data={webPageJsonLd(SEO.salaTitle, SEO.salaDescription, ROUTES.sala)} />
      <main id="conteudo" className="sala-page">
        <SalaApp />
      </main>
    </>
  );
}
