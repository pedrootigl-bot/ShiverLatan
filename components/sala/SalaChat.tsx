"use client";

import { useEffect, useRef } from "react";
import { IconPanel } from "@/components/sala/SalaIcons";
import SalaSignalDebug from "@/components/sala/SalaSignalDebug";
import { useI18n } from "@/components/i18n/LocaleProvider";
import type { SignalConnectionStatus, SignalDirection, TradingSignal } from "@/lib/signals/types";

type SalaChatProps = {
  signals: TradingSignal[];
  connectionStatus: SignalConnectionStatus;
  error: string | null;
  debug: boolean;
  onClose: () => void;
};

function assertNever(value: never): never {
  throw new Error(`Direção de sinal não tratada: ${String(value)}`);
}

function directionLabel(direction: SignalDirection, buy: string, sell: string): string {
  switch (direction) {
    case "BUY":
      return buy;
    case "SELL":
      return sell;
    default:
      return assertNever(direction);
  }
}

function directionMark(direction: SignalDirection): string {
  switch (direction) {
    case "BUY":
      return "↑";
    case "SELL":
      return "↓";
    default:
      return assertNever(direction);
  }
}

function formatExpiration(value: string, minute: string, minutes: (amount: number) => string): string {
  const match = value.trim().match(/^(\d+)\s*M$/i);
  if (!match) {
    return value;
  }

  const amount = Number(match[1]);
  return amount === 1 ? minute : minutes(amount);
}

function formatEntry(signal: TradingSignal, locale: string): string {
  if (signal.entryTime) {
    return signal.entryTime;
  }

  const date = new Date(signal.createdAt);
  if (Number.isNaN(date.getTime())) {
    return "--:--";
  }

  return date.toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" });
}

function statusCopy(
  status: SignalConnectionStatus,
  copy: { connecting: string; online: string; reconnecting: string },
): string {
  switch (status) {
    case "connecting":
      return copy.connecting;
    case "connected":
      return copy.online;
    case "reconnecting":
    case "disconnected":
      return copy.reconnecting;
    default:
      return assertNever(status);
  }
}

function SignalBlock({ signal }: { signal: TradingSignal }) {
  const { locale, t } = useI18n();
  const buy = signal.direction === "BUY";
  const htmlLocale = locale === "es" ? "es" : "pt-BR";

  return (
    <div className={buy ? "sala-signal sala-signal--buy" : "sala-signal sala-signal--sell"}>
      <p className="sala-signal__tag">
        <span>{t.sala.newRead}</span>
        <time dateTime={signal.createdAt}>{formatEntry(signal, htmlLocale)}</time>
      </p>
      <p className="sala-signal__asset">{signal.asset}</p>
      <p className="sala-signal__side">
        {directionMark(signal.direction)} {directionLabel(signal.direction, t.sala.buy, t.sala.sell)}
      </p>
      <dl>
        {signal.expiration ? (
          <div>
            <dt>{t.sala.expiration}</dt>
            <dd>{formatExpiration(signal.expiration, t.sala.minute, t.sala.minutes)}</dd>
          </div>
        ) : null}
        {signal.timeframe ? (
          <div>
            <dt>{t.sala.timeframe}</dt>
            <dd>{signal.timeframe}</dd>
          </div>
        ) : null}
        <div>
          <dt>{t.sala.entry}</dt>
          <dd>{formatEntry(signal, htmlLocale)}</dd>
        </div>
      </dl>
    </div>
  );
}

export default function SalaChat({
  signals,
  connectionStatus,
  error,
  debug,
  onClose,
}: SalaChatProps) {
  const { t } = useI18n();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const online = connectionStatus === "connected";

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) {
      return;
    }
    root.scrollTop = 0;
  }, [signals]);

  return (
    <section className="sala-chat" id="sala-chat" aria-label={t.sala.chatAria}>
      <header className="sala-chat__head">
        <div>
          <p className="sala-chat__title">
            <span className="sala-chat__name">{t.sala.botName}</span>
            <span className="sala-chat__bot">BOT</span>
          </p>
          <p
            className={`sala-chat__status ${online ? "sala-chat__status--online" : ""}`}
          >
            <span aria-hidden />
            {statusCopy(connectionStatus, t.sala)}
            {online ? <em className="sala-chat__status-extra">{t.sala.onlySignals}</em> : null}
          </p>
        </div>
        <button
          type="button"
          className="sala-icon-btn sala-chat__toggle"
          aria-label={t.sala.closeChat}
          aria-expanded="true"
          aria-controls="sala-chat"
          onClick={onClose}
        >
          <IconPanel />
        </button>
      </header>

      <div
        ref={scrollerRef}
        className="sala-chat__thread"
        aria-live="polite"
        aria-relevant="additions"
      >
        {error ? <p className="sala-chat__wait">{error}</p> : null}
        {signals.length === 0 ? (
          <p className="sala-chat__wait">{t.sala.waiting}</p>
        ) : (
          signals.map((signal) => (
            <article key={signal.id} className="sala-msg">
              <SignalBlock signal={signal} />
            </article>
          ))
        )}
      </div>
      {debug ? <SalaSignalDebug /> : null}
    </section>
  );
}
