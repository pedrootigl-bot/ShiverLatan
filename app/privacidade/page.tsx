import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { ROUTES, SEO } from "@/lib/config";

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
    <LegalPage title="Privacidade" updated="18 de agosto de 2026">
      <p>
        Tratamos dados com o mínimo necessário para apresentar a corretora
        Shiver e a ferramenta de auxílio ao trader nesta landing.
      </p>
      <p>
        Esta página usa armazenamento local apenas para lembrar se a animação
        inicial já foi vista neste navegador. Não coletamos e-mail nesta versão.
      </p>
      <p>
        Não vendemos dados. Não usamos informações de visita para garantir lucro
        nem para oferecer operação automática.
      </p>
      <p>
        Quando o acesso à conta e à ferramenta abrir, atualizaremos esta página
        com finalidade, destino e prazo de retenção de qualquer dado que
        passarmos a tratar.
      </p>
    </LegalPage>
  );
}
