"use client";

import { useState } from "react";

const ASSETS = ["EUR/USD", "BTC/USD", "ETH/USDT"] as const;
const EXPIRATIONS = ["1M", "5M"] as const;

export default function SalaSignalDebug() {
  const [asset, setAsset] = useState<(typeof ASSETS)[number]>("EUR/USD");
  const [direction, setDirection] = useState<"BUY" | "SELL">("BUY");
  const [expiration, setExpiration] = useState<(typeof EXPIRATIONS)[number]>("5M");
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState("");

  const send = async () => {
    setBusy(true);
    setNote("");

    try {
      const response = await fetch("/api/signals/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          asset,
          direction,
          expiration,
          entryTime: new Date().toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        }),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? "Falha ao enviar.");
      }

      setNote("Sinal enviado.");
    } catch (error) {
      setNote(error instanceof Error ? error.message : "Falha ao enviar.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form
      className="sala-signal-debug"
      onSubmit={(event) => {
        event.preventDefault();
        void send();
      }}
    >
      <p>Simulador de sinal</p>
      <label>
        Ativo
        <select value={asset} onChange={(event) => setAsset(event.target.value as typeof asset)}>
          {ASSETS.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
      <label>
        Direção
        <select
          value={direction}
          onChange={(event) => setDirection(event.target.value as "BUY" | "SELL")}
        >
          <option value="BUY">Compra</option>
          <option value="SELL">Venda</option>
        </select>
      </label>
      <label>
        Expiração
        <select
          value={expiration}
          onChange={(event) => setExpiration(event.target.value as typeof expiration)}
        >
          {EXPIRATIONS.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
      <button type="submit" disabled={busy}>
        {busy ? "Enviando…" : "Enviar sinal"}
      </button>
      {note ? <span>{note}</span> : null}
    </form>
  );
}
