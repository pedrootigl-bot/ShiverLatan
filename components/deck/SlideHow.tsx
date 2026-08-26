"use client";

import { useI18n } from "@/components/i18n/LocaleProvider";

export default function SlideHow() {
  const { t } = useI18n();

  return (
    <section id="como-funciona" data-slide="2" className="deck-slide deck-slide--how">
      <div className="deck-slide__layout">
        <div className="deck-slide__copy">
          <p className="deck-eyebrow deck-enter">{t.how.eyebrow}</p>
          <h2 className="deck-title deck-title--split">
            <span className="sr-only">{t.how.sr} </span>
            <span className="deck-title__fill">{t.how.chaos}</span>
            <span className="deck-title__x" aria-hidden>
              x
            </span>
            <span className="deck-title__outline">{t.how.clarity}</span>
          </h2>
        </div>

        <div className="deck-visual deck-visual--split grid gap-4">
          <article className="deck-panel how-card how-card--chaos overflow-hidden p-4 sm:p-6">
            <p className="text-[11px] font-semibold tracking-[0.28em] text-red-400 uppercase">
              {t.how.chaos}
            </p>
            <ul className="mt-4 space-y-2">
              {t.how.chaosPoints.map((point) => (
                <li key={point} className="text-sm text-zinc-400">
                  ✕ {point}
                </li>
              ))}
            </ul>
          </article>

          <article className="deck-panel how-card how-card--clarity overflow-hidden p-4 sm:p-6">
            <p className="text-[11px] font-semibold tracking-[0.28em] text-[#38bdf8] uppercase">
              {t.how.clarity}
            </p>
            <ul className="mt-4 space-y-2">
              {t.how.clarityPoints.map((point) => (
                <li key={point} className="text-sm text-zinc-300">
                  ✓ {point}
                </li>
              ))}
            </ul>
          </article>
        </div>

        <p className="deck-lead deck-enter">{t.how.lead}</p>
      </div>
    </section>
  );
}
