import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { ROUTES, SEO } from "@/lib/config";

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
    <LegalPage title="Termos de uso" updated="18 de agosto de 2026">
      <p>
        A Shiver é uma corretora. Estes termos descrevem o uso desta landing e
        da ferramenta apresentada aqui: um painel que auxilia o trader na hora
        de compra e venda.
      </p>
      <p>
        A ferramenta não opera sozinha, não dispara ordens e não substitui o
        trader. Quem decide e quem opera é você. A prévia não promete resultado
        financeiro nem timing perfeito.
      </p>
      <p>
        Os painéis, preços e indicadores exibidos nesta página são prévias
        ilustrativas para apresentar o produto. Não constituem recomendação
        automática de compra ou venda.
      </p>
      <p>
        Quando o acesso à conta e à ferramenta estiver liberado, valerão também
        os termos da operação na Shiver, publicados pela corretora. Podemos
        atualizar este texto quando o produto avançar. O uso continuado da
        página após a publicação implica ciência da versão vigente.
      </p>
    </LegalPage>
  );
}
