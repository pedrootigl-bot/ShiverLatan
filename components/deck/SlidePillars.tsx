import SignalBoard from "@/components/deck/SignalBoard";
import { CTA_HREF, CTA_LABEL } from "@/lib/cta";

export default function SlidePillars() {
  return (
    <section id="beneficios" data-slide="1" className="deck-slide deck-slide--pillars">
      <div className="deck-slide__layout">
        <div className="deck-slide__copy">
            <p className="deck-eyebrow deck-enter">Três eixos</p>
            <h2 className="deck-title">
              <span className="sr-only">
                Três sinais para o trader: tendência, momentum e volatilidade.{" "}
              </span>
              <span className="deck-title__fill">Três</span>
              <span className="deck-title__outline">Sinais</span>
            </h2>
        </div>

        <SignalBoard />

        <p className="deck-lead deck-enter">
          Direção, força e amplitude no mesmo lugar — para decidir o
          momento com mais contexto, sem espalhar o olhar em várias telas.
        </p>
        <a href={CTA_HREF} className="deck-cta btn-shine deck-enter">
          {CTA_LABEL}
        </a>
      </div>
    </section>
  );
}
