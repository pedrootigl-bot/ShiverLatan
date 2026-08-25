"use client";

import { useEffect, useRef } from "react";
import { SALA_BOT_NAME } from "@/lib/sala";
import { IconPanel } from "@/components/sala/SalaIcons";
import SalaSignalDebug from "@/components/sala/SalaSignalDebug";
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

function directionLabel(direction: SignalDirection): string {
  switch (direction) {
    case "BUY":
      return "Compra";
    case "SELL":
      return "Venda";
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

function formatExpiration(value: string): string {
  const match = value.trim().match(/^(\d+)\s*M$/i);
  if (!match) {
    return value;
  }

  const amount = Number(match[1]);
  return amount === 1 ? "1 minuto" : `${amount} minutos`;
}

function formatEntry(signal: TradingSignal): string {
  if (signal.entryTime) {
    return signal.entryTime;
  }

  const date = new Date(signal.createdAt);
  if (Number.isNaN(date.getTime())) {
    return "--:--";
  }

  return date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

function statusCopy(status: SignalConnectionStatus): string {
  switch (status) {
    case "connecting":
      return "Conectando ao assistente...";
    case "connected":
      return "Assistente online";
    case "reconnecting":
    case "disconnected":
      return "Reconectando ao assistente...";
    default:
      return assertNever(status);
  }
}

function SignalBlock({ signal }: { signal: TradingSignal }) {
  const buy = signal.direction === "BUY";

  return (
    <div className={buy ? "sala-signal sala-signal--buy" : "sala-signal sala-signal--sell"}>
      <p className="sala-signal__tag">
        <span>Nova leitura</span>
        <time dateTime={signal.createdAt}>{formatEntry(signal)}</time>
      </p>
      <p className="sala-signal__asset">{signal.asset}</p>
      <p className="sala-signal__side">
        {directionMark(signal.direction)} {directionLabel(signal.direction)}
      </p>
      <dl>
        {signal.expiration ? (
          <div>
            <dt>Expiração</dt>
            <dd>{formatExpiration(signal.expiration)}</dd>
          </div>
        ) : null}
        {signal.timeframe ? (
          <div>
            <dt>Tempo</dt>
            <dd>{signal.timeframe}</dd>
          </div>
        ) : null}
        <div>
          <dt>Entrada</dt>
          <dd>{formatEntry(signal)}</dd>
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
    <section className="sala-chat" id="sala-chat" aria-label="Disparos do assistente">
      <header className="sala-chat__head">
        <div>
          <p className="sala-chat__title">
            <span className="sala-chat__name">{SALA_BOT_NAME}</span>
            <span className="sala-chat__bot">BOT</span>
          </p>
          <p
            className={`sala-chat__status ${online ? "sala-chat__status--online" : ""}`}
          >
            <span aria-hidden />
            {statusCopy(connectionStatus)}
            {online ? <em className="sala-chat__status-extra"> · só disparos</em> : null}
          </p>
        </div>
        <button
          type="button"
          className="sala-icon-btn sala-chat__toggle"
          aria-label="Fechar chat"
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
          <p className="sala-chat__wait">Aguardando uma nova leitura de mercado...</p>
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
