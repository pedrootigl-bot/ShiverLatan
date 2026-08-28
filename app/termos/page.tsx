import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import LegalDoc from "@/components/LegalDoc";
import { ROUTES, SEO } from "@/lib/config";
import { legalJsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: SEO.termosTitle,
  description: SEO.termosDescription,
  alternates: {
    canonical: ROUTES.termos,
  },
  openGraph: {
    title: SEO.termosTitle,
    description: SEO.termosDescription,
    url: ROUTES.termos,
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermosPage() {
  return (
    <>
      <JsonLd data={legalJsonLd("termos")} />
      <LegalDoc kind="terms" />
    </>
  );
}
