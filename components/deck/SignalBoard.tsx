"use client";

import { useState } from "react";
import { Sparkline } from "@/components/CandleChart";

const signals = [
  {
    label: "Tendência",
    status: "Alta",
    tone: "blue" as const,
    hint: "Direção dominante do cenário — para apoiar o momento de compra ou venda.",
    points: "4,36 28,30 52,32 76,22 100,18 124,12 156,8",
  },
  {
    label: "Momentum",
    status: "Forte",
    tone: "purple" as const,
    hint: "Força do movimento em relação ao recorte recente — contexto para o timing.",
    points: "4,28 26,34 48,16 72,30 96,10 120,22 156,6",
  },
  {
    label: "Volatilidade",
    status: "Moderada",
    tone: "amber" as const,
    hint: "Amplitude das oscilações — contexto, não alarme.",
    points: "4,24 28,18 52,30 76,14 100,28 124,16 156,22",
  },
] as const;

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
      {signals.map((signal) => {
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
