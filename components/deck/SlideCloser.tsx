"use client";

import Link from "next/link";
import FaqAccordion from "@/components/deck/FaqAccordion";
import { useI18n } from "@/components/i18n/LocaleProvider";
import CtaLink from "@/components/CtaLink";
import { ROUTES, SITE_YEAR } from "@/lib/config";

export default function SlideCloser() {
  const { t } = useI18n();

  return (
    <section id="faq" data-slide="7" className="deck-slide deck-slide--faq">
      <div id="comecar" className="absolute top-0 left-0 h-px w-px" />
      <div className="deck-slide__layout">
        <div className="deck-slide__copy">
          <p className="deck-eyebrow deck-enter">{t.closer.eyebrow}</p>
          <h2 className="deck-title deck-title--compact">
            <span className="sr-only">{t.closer.sr} </span>
            <span className="deck-title__fill">{t.closer.fill}</span>
            <span className="deck-title__outline">{t.closer.outline}</span>
          </h2>
          <p className="deck-lead deck-enter">{t.closer.lead}</p>
          <CtaLink className="deck-cta btn-shine deck-enter">
            {t.cta}
          </CtaLink>
          <div className="deck-footer deck-enter">
            <p>
              © {SITE_YEAR} Shiver. {t.closer.footer}
            </p>
            <p className="deck-disclaimer">{t.risk}</p>
            <p className="mt-2 flex flex-wrap gap-4">
              <Link href={ROUTES.termos}>{t.closer.terms}</Link>
              <Link href={ROUTES.privacidade}>{t.closer.privacy}</Link>
            </p>
          </div>
        </div>

        <div className="deck-visual deck-enter">
          <div className="deck-panel p-5 md:p-6">
            <p className="text-[11px] font-semibold tracking-[0.22em] text-[#38bdf8] uppercase">
              {t.closer.faq}
            </p>
            <FaqAccordion items={t.faq} />
          </div>
        </div>
      </div>
    </section>
  );
}
