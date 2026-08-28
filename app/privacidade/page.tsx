import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import LegalDoc from "@/components/LegalDoc";
import { ROUTES, SEO } from "@/lib/config";
import { legalJsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: SEO.privacidadeTitle,
  description: SEO.privacidadeDescription,
  alternates: {
    canonical: ROUTES.privacidade,
  },
  openGraph: {
    title: SEO.privacidadeTitle,
    description: SEO.privacidadeDescription,
    url: ROUTES.privacidade,
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacidadePage() {
  return (
    <>
      <JsonLd data={legalJsonLd("privacidade")} />
      <LegalDoc kind="privacy" />
    </>
  );
}
