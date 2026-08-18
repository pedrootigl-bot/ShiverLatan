"use client";

import { useState } from "react";
import { Sparkline } from "@/components/CandleChart";
import { MOCK_SIGNALS } from "@/lib/mock-market-data";

export default function SignalBoard() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div
      className={
        active
          ? "deck-visual deck-visual--stack signal-board has-focus"
          : "deck-visual deck-visual--stack signal-board"
      }
      aria-label="Três sinais. Clique para destacar."
    >
      {MOCK_SIGNALS.map((signal) => {
        const selected = active === signal.label;

        return (
          <button
            key={signal.label}
            type="button"
            className={
              selected
                ? "signal-card deck-enter is-active"
                : "signal-card deck-enter"
            }
            data-tone={signal.tone}
            aria-pressed={selected}
            onClick={() =>
              setActive((current) =>
                current === signal.label ? null : signal.label,
              )
            }
          >
            <span className="signal-card__accent" aria-hidden />
            <span className="signal-card__meta">
              <span className="signal-card__label">
                <span className="signal-card__pulse" aria-hidden />
                {signal.label}
              </span>
              <span className="signal-card__status">{signal.status}</span>
              <span className="signal-card__hint">{signal.hint}</span>
            </span>
            <span className="signal-card__chart">
              <Sparkline
                tone={signal.tone}
                points={signal.points}
                filled
                className="signal-card__spark"
              />
            </span>
          </button>
        );
      })}
    </div>
  );
}
