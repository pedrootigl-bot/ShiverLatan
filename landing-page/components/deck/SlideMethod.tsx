"use client";

import { useI18n } from "@/components/i18n/LocaleProvider";

export default function SlideMethod() {
  const { t } = useI18n();

  return (
    <section id="metodo" data-slide="5" className="deck-slide deck-slide--method">
      <div className="deck-slide__layout">
        <div className="deck-slide__copy">
          <p className="deck-eyebrow deck-enter">{t.method.eyebrow}</p>
          <h2 className="deck-title deck-title--compact">
            <span className="sr-only">{t.method.sr} </span>
            <span className="deck-title__fill">{t.method.fill}</span>
            <span className="deck-title__outline">{t.method.outline}</span>
          </h2>
        </div>

        <div className="deck-visual deck-visual--steps flex flex-col gap-4">
          {t.method.principles.map((principle) => (
            <article key={principle.index} className="deck-stat deck-enter">
              <span className="deck-stat__neon" aria-hidden />
              <div>
                <p className="text-[11px] font-semibold tracking-[0.22em] text-[#38bdf8] uppercase">
                  {principle.index}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-white">
                  {principle.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {principle.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        <p className="deck-lead deck-enter">{t.method.lead}</p>
      </div>
    </section>
  );
}
