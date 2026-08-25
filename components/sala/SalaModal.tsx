"use client";

import { useState } from "react";
import { TRADE_ROOM_URL } from "@/lib/sala";

export default function SalaModal({ onFrameLoad }: { onFrameLoad: () => void }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <section className="sala-modal" aria-label="Sala de operação da corretora">
      <header className="sala-modal__bar">
        <div>
          <p>Traderoom Shiver</p>
          <span>Ambiente da corretora · quem opera é você</span>
        </div>
      </header>

      <div className="sala-modal__frame">
        {loaded ? null : (
          <div className="sala-modal__wait" aria-hidden>
            <p>Abrindo a sala da corretora…</p>
            <a href={TRADE_ROOM_URL} target="_blank" rel="noreferrer">
              Se não carregar, abra em nova aba
            </a>
          </div>
        )}
        <iframe
          title="Traderoom Shiver"
          src={TRADE_ROOM_URL}
          allow="clipboard-read; clipboard-write; fullscreen; payment"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={() => {
            setLoaded(true);
            onFrameLoad();
          }}
        />
      </div>
    </section>
  );
}
