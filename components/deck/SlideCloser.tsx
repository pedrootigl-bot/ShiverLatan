import { CTA_HREF, CTA_LABEL } from "@/lib/cta";
import FaqAccordion from "@/components/deck/FaqAccordion";
import { RISK_DISCLAIMER, ROUTES, SITE_YEAR } from "@/lib/config";

const questions = [
  {
    question: "O que é a Shiver?",
    answer:
      "Shiver é a corretora. Esta página apresenta a ferramenta que auxilia o trader na hora de compra e venda, com tendência, momentum e volatilidade no mesmo painel.",
  },
  {
    question: "A ferramenta opera sozinha?",
    answer:
      "Não. Ela não é robô e não dispara ordens. Auxilia a sua leitura; quem decide e quem opera é você.",
  },
  {
    question: "De onde vêm os dados?",
    answer:
      "A prévia desta landing usa números ilustrativos. No produto, as fontes serão documentadas na interface.",
  },
  {
    question: "A inteligência artificial opera por mim?",
    answer:
      "Não. Os insights descrevem o que o painel está lendo. Não são ordem automática nem garantia de resultado.",
  },
  {
    question: "Quanto vai custar?",
    answer:
      "O preço ainda não foi definido. Conhecer a prévia não gera cobrança.",
  },
  {
    question: "Quando estará disponível?",
    answer:
      "Ainda não há data. Mais informações sobre acesso serão divulgadas nesta página.",
  },
];

export default function SlideCloser() {
  return (
    <section id="faq" data-slide="6" className="deck-slide deck-slide--faq">
      <div id="comecar" className="absolute top-0 left-0 h-px w-px" />
      <div className="deck-slide__layout">
        <div className="deck-slide__copy">
          <p className="deck-eyebrow deck-enter">Começar</p>
          <h2 className="deck-title deck-title--compact">
            <span className="deck-title__fill">À frente</span>
            <span className="deck-title__outline">do mercado</span>
          </h2>
          <p className="deck-lead deck-enter">
            Ferramenta da corretora Shiver para auxiliar o timing — sem robô e
            sem promessa de resultado. Quem opera é você.
          </p>
          <a href={CTA_HREF} className="deck-cta btn-shine deck-enter">
            {CTA_LABEL}
          </a>
          <div className="deck-footer deck-enter">
            <p>© {SITE_YEAR} Shiver. A ferramenta auxilia o trader.</p>
            <p className="deck-disclaimer">{RISK_DISCLAIMER}</p>
            <p className="mt-2 flex flex-wrap gap-4">
              <a href={ROUTES.termos}>Termos</a>
              <a href={ROUTES.privacidade}>Privacidade</a>
            </p>
          </div>
        </div>

        <div className="deck-visual deck-enter">
          <div className="deck-panel p-5 md:p-6">
            <p className="text-[11px] font-semibold tracking-[0.22em] text-[#e879f9] uppercase">
              FAQ
            </p>
            <FaqAccordion items={questions} />
          </div>
        </div>
      </div>
    </section>
  );
}
