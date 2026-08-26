"use client";

import IntroVisual from "@/components/deck/IntroVisual";
import { useI18n } from "@/components/i18n/LocaleProvider";
import CtaLink from "@/components/CtaLink";

export default function SlideIntro() {
  const { t } = useI18n();

  return (
    <section id="inicio" data-slide="0" className="deck-slide deck-slide--intro">
      <div className="deck-slide__layout">
        <div className="deck-slide__copy">
          <p className="deck-eyebrow deck-enter">{t.intro.eyebrow}</p>
          <h2 className="deck-title">
            <span className="sr-only">{t.intro.sr} </span>
            <span className="deck-title__fill">{t.intro.fill}</span>
            <span className="deck-title__outline">{t.intro.outline}</span>
          </h2>
          <p className="deck-lead deck-enter">{t.intro.lead}</p>
        </div>

        <IntroVisual />

        <CtaLink className="deck-cta btn-shine deck-enter">
          {t.cta}
        </CtaLink>
      </div>
    </section>
  );
}
