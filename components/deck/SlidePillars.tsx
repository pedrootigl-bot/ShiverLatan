"use client";

import SignalBoard from "@/components/deck/SignalBoard";
import { useI18n } from "@/components/i18n/LocaleProvider";
import CtaLink from "@/components/CtaLink";

export default function SlidePillars() {
  const { t } = useI18n();

  return (
    <section id="beneficios" data-slide="1" className="deck-slide deck-slide--pillars">
      <div className="deck-slide__layout">
        <div className="deck-slide__copy">
          <p className="deck-eyebrow deck-enter">{t.pillars.eyebrow}</p>
          <h2 className="deck-title">
            <span className="sr-only">{t.pillars.sr} </span>
            <span className="deck-title__fill">{t.pillars.fill}</span>
            <span className="deck-title__outline">{t.pillars.outline}</span>
          </h2>
        </div>

        <SignalBoard />

        <p className="deck-lead deck-enter">{t.pillars.lead}</p>
        <CtaLink className="deck-cta btn-shine deck-enter">
          {t.cta}
        </CtaLink>
      </div>
    </section>
  );
}
