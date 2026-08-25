import IntroVisual from "@/components/deck/IntroVisual";
import { CTA_HREF, CTA_LABEL } from "@/lib/cta";

export default function SlideIntro() {
  return (
    <section id="inicio" data-slide="0" className="deck-slide deck-slide--intro">
      <div className="deck-slide__layout">
        <div className="deck-slide__copy">
          <p className="deck-eyebrow deck-enter">Corretora Shiver</p>
          <h2 className="deck-title">
            <span className="sr-only">
              Mercado com clareza: tendência, momentum e volatilidade no mesmo
              painel.{" "}
            </span>
            <span className="deck-title__fill">Mercado</span>
            <span className="deck-title__outline">Clareza</span>
          </h2>
          <p className="deck-lead deck-enter">
            Tendência, momentum e volatilidade em um só painel. A ferramenta
            auxilia a hora de compra e venda — quem opera é você.
          </p>
        </div>

        <IntroVisual />

        <a href={CTA_HREF} className="deck-cta btn-shine deck-enter">
          {CTA_LABEL}
        </a>
      </div>
    </section>
  );
}
