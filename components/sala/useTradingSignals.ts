"use client";

import { useEffect, useState } from "react";
import {
  SIGNAL_HISTORY_LIMIT,
  isTradingSignal,
  type SignalConnectionStatus,
  type TradingSignal,
} from "@/lib/signals/types";

export function useTradingSignals() {
  const [signals, setSignals] = useState<TradingSignal[]>([]);
  const [connectionStatus, setConnectionStatus] =
    useState<SignalConnectionStatus>("connecting");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    let source: EventSource | null = null;

    const addSignal = (signal: TradingSignal) => {
      setSignals((prev) => {
        if (prev.some((item) => item.id === signal.id)) {
          return prev;
        }

        return [signal, ...prev].slice(0, SIGNAL_HISTORY_LIMIT);
      });
    };

    async function connect() {
      try {
        const response = await fetch("/api/signals/recent", { cache: "no-store" });
        if (!response.ok) {
          throw new Error("recent_failed");
        }

        const body: unknown = await response.json();
        const list =
          body && typeof body === "object" && Array.isArray((body as { signals?: unknown }).signals)
            ? (body as { signals: unknown[] }).signals
            : [];

        if (!cancelled) {
          setSignals(
            list.filter(isTradingSignal).slice(0, SIGNAL_HISTORY_LIMIT),
          );
          setError(null);
        }
      } catch {
        if (!cancelled) {
          setError("Não foi possível carregar o histórico de sinais.");
        }
      }

      if (cancelled) {
        return;
      }

      source = new EventSource("/api/signals/stream");

      source.onopen = () => {
        if (!cancelled) {
          setConnectionStatus("connected");
        }
      };

      source.addEventListener("connected", () => {
        if (!cancelled) {
          setConnectionStatus("connected");
        }
      });

      source.addEventListener("signal", (event) => {
        if (cancelled || !(event instanceof MessageEvent) || typeof event.data !== "string") {
          return;
        }

        try {
          const parsed: unknown = JSON.parse(event.data);
          if (isTradingSignal(parsed)) {
            addSignal(parsed);
          }
        } catch {
          return;
        }
      });

      source.onerror = () => {
        if (cancelled || !source) {
          return;
        }

        setConnectionStatus(
          source.readyState === EventSource.CONNECTING ? "reconnecting" : "disconnected",
        );
      };
    }

    void connect();

    return () => {
      cancelled = true;
      source?.close();
    };
  }, []);

  return { signals, connectionStatus, error };
}
