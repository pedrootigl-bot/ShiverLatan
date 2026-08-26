"use client";

import CandleChart, { Sparkline } from "@/components/CandleChart";
import LiveValue from "@/components/LiveValue";
import { useI18n } from "@/components/i18n/LocaleProvider";
import {
  MOCK_PAIR,
  MOCK_PRICE,
  MOCK_SCENARIO,
} from "@/lib/mock-market-data";

export default function SlideScenario() {
  const { t } = useI18n();

  return (
    <section
      id="cenario"
      data-slide="4"
      className="deck-slide deck-slide--scenario"
    >
      <div className="deck-slide__layout">
        <div className="deck-slide__copy">
          <p className="deck-eyebrow scenario-text">{t.scenario.eyebrow}</p>
          <h2 className="deck-title deck-title--compact">
            <span className="sr-only">{t.scenario.sr} </span>
            <span className="deck-title__fill">{t.scenario.fill}</span>
            <span className="deck-title__outline">{t.scenario.outline}</span>
          </h2>
          <p className="scenario-kicker scenario-text">{t.scenario.kicker}</p>
        </div>

        <div className="scenario-board" aria-label={t.scenario.boardAria}>
          <p className="scenario-board__hud scenario-text">
            <span>
              {t.scenario.example} · {MOCK_PAIR}
            </span>
            <strong>
              <LiveValue
                value={MOCK_PRICE}
                prefix="$"
                decimals={2}
                startDelay={300}
              />
            </strong>
          </p>
          <p className="scenario-board__legend scenario-text">{t.scenario.legend}</p>

          <div className="scenario-board__signals">
            {MOCK_SCENARIO.map((axis, index) => {
              const copy = t.scenario.axes[index];

              return (
                <div
                  key={axis.label}
                  className="scenario-signal"
                  data-tone={axis.tone}
                >
                  <span className="scenario-signal__label">{copy?.label ?? axis.label}</span>
                  <strong className="scenario-signal__value">{copy?.value ?? axis.value}</strong>
                  <span className="scenario-signal__meaning">{copy?.meaning ?? axis.meaning}</span>
                  <Sparkline
                    tone={axis.tone}
                    points={axis.points}
                    filled
                    className="scenario-signal__spark"
                  />
                </div>
              );
            })}
          </div>

          <svg
            className="scenario-board__converge"
            viewBox="0 0 1000 160"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              className="scenario-board__path"
              data-tone="blue"
              d="M166 4 C166 78 500 78 500 156"
            />
            <path
              className="scenario-board__path"
              data-tone="purple"
              d="M500 4 C500 78 500 78 500 156"
            />
            <path
              className="scenario-board__path"
              data-tone="amber"
              d="M834 4 C834 78 500 78 500 156"
            />
            <circle className="scenario-board__node" cx="500" cy="156" r="4" />
          </svg>

          <p className="scenario-board__focus">{t.scenario.out}</p>

          <div className="scenario-board__chart">
            <CandleChart
              variant="panel"
              uid="cenario"
              className="absolute inset-0"
            />
            <span className="scan-line" />
          </div>
          <p className="scenario-board__caption scenario-text">{t.scenario.caption}</p>
        </div>

        <p className="deck-lead scenario-text">{t.scenario.lead}</p>
        <p className="scenario-note scenario-text">{t.scenario.note}</p>
      </div>
    </section>
  );
}
