"use client";

import { useEffect, useRef } from "react";
import {
  CHAT_STATUS_LABEL,
  SALA_BOT_NAME,
  type ChatMessage,
  type ChatStatus,
  type SignalCard,
} from "@/lib/sala";
import { IconPanel } from "@/components/sala/SalaIcons";

type SalaChatProps = {
  messages: ChatMessage[];
  status: ChatStatus;
  onClose: () => void;
};

function SignalBlock({ signal, time }: { signal: SignalCard; time: string }) {
  const buy = signal.side === "compra";

  return (
    <div className={buy ? "sala-signal sala-signal--buy" : "sala-signal sala-signal--sell"}>
      <p className="sala-signal__tag">
        <span>{buy ? "Sinal de compra" : "Sinal de venda"}</span>
        <time dateTime={time}>{time}</time>
      </p>
      <dl>
        <div>
          <dt>Ativo</dt>
          <dd>{signal.asset}</dd>
        </div>
        <div>
          <dt>Entrada</dt>
          <dd>{signal.entry}</dd>
        </div>
        <div>
          <dt>Alvos</dt>
          <dd>{signal.targets}</dd>
        </div>
        <div>
          <dt>Stop</dt>
          <dd>{signal.stop}</dd>
        </div>
      </dl>
    </div>
  );
}

function Message({ message }: { message: ChatMessage }) {
  return (
    <article className="sala-msg">
      <SignalBlock signal={message.signal} time={message.time} />
    </article>
  );
}

export default function SalaChat({ messages, status, onClose }: SalaChatProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) {
      return;
    }
    root.scrollTop = root.scrollHeight;
  }, [messages]);

  return (
    <section className="sala-chat" id="sala-chat" aria-label="Disparos do assistente">
      <header className="sala-chat__head">
        <div>
          <p className="sala-chat__title">
            <span className="sala-chat__name">{SALA_BOT_NAME}</span>
            <span className="sala-chat__bot">BOT</span>
          </p>
          <p className={`sala-chat__status sala-chat__status--${status}`}>
            <span aria-hidden />
            {CHAT_STATUS_LABEL[status]}
            <em className="sala-chat__status-extra"> · só disparos</em>
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

      <div ref={scrollerRef} className="sala-chat__thread">
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
    </section>
  );
}
