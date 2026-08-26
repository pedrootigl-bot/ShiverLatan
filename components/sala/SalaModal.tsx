"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/i18n/LocaleProvider";
import { tradeRoomUrl, BROKER_SESSION_WAIT_KEY } from "@/lib/sala";

const AWAY_MS = 4000;

export default function SalaModal({
  resumeOnReturn,
  onFrameLoad,
  onFrameReset,
  onResume,
}: {
  resumeOnReturn: boolean;
  onFrameLoad: () => void;
  onFrameReset: () => void;
  onResume: () => void;
}) {
  const { locale, t } = useI18n();
  const src = tradeRoomUrl(locale);
  const [loaded, setLoaded] = useState(false);
  const [frameKey, setFrameKey] = useState(0);
  const hiddenAtRef = useRef(0);

  useEffect(() => {
    setLoaded(false);
    onFrameReset();
  }, [src, onFrameReset]);

  useEffect(() => {
    if (!resumeOnReturn) {
      hiddenAtRef.current = 0;
      return;
    }

    if (document.visibilityState === "hidden") {
      hiddenAtRef.current = Date.now();
    }

    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        hiddenAtRef.current = Date.now();
        return;
      }

      const awaitingBroker = window.sessionStorage.getItem(BROKER_SESSION_WAIT_KEY) === "1";
      const awayMs = hiddenAtRef.current === 0 ? 0 : Date.now() - hiddenAtRef.current;
      hiddenAtRef.current = 0;

      if (!awaitingBroker && awayMs < AWAY_MS) {
        return;
      }

      if (awaitingBroker) {
        window.sessionStorage.removeItem(BROKER_SESSION_WAIT_KEY);
      }

      onResume();
      setLoaded(false);
      setFrameKey((current) => current + 1);
    };

    const onFocus = () => {
      if (document.visibilityState !== "visible") {
        return;
      }
      onVisibility();
    };

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("focus", onFocus);
    window.addEventListener("pageshow", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("pageshow", onVisibility);
    };
  }, [resumeOnReturn, onResume]);

  return (
    <section className="sala-modal" aria-label={t.sala.roomAria}>
      <header className="sala-modal__bar">
        <div className="sala-modal__copy">
          <p>{t.sala.roomTitle}</p>
          <span>{t.sala.roomSubtitle}</span>
        </div>
      </header>

      <div className="sala-modal__frame">
        {loaded ? null : (
          <div className="sala-modal__wait" aria-hidden>
            <p>{t.sala.opening}</p>
            <a href={src} target="_blank" rel="noreferrer">
              {t.sala.openTab}
            </a>
          </div>
        )}
        <iframe
          key={`${src}-${frameKey}`}
          title={t.sala.roomTitle}
          src={src}
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
