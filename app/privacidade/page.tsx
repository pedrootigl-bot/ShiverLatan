import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import LegalPage from "@/components/LegalPage";
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
      <LegalPage title="Privacidade" updated="24 de agosto de 2026">
      <p>
        Tratamos dados com o mínimo necessário para apresentar a corretora
        Shiver e a ferramenta de auxílio ao trader nesta landing.
      </p>
      <p>
        Esta versão da landing não coleta e-mail e não usa armazenamento local
        para lembrar visitas. Não vendemos dados e não usamos informações de
        visita para garantir lucro nem para oferecer operação automática.
      </p>
      <p>
        Quando o acesso à conta e à ferramenta abrir, atualizaremos esta página
        com finalidade, destino e prazo de retenção de qualquer dado que
        passarmos a tratar.
      </p>
      </LegalPage>
    </>
  );
}
