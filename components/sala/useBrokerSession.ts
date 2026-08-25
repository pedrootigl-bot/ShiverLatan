"use client";

import { useEffect, useRef, useState } from "react";

const SETTLE_MS = 4000;
const GUEST_BOUNCE_MS = 8000;

export function useBrokerSession() {
  const [authed, setAuthed] = useState(false);
  const loadsRef = useRef(0);
  const firstAtRef = useRef(0);
  const timerRef = useRef(0);

  const onFrameLoad = () => {
    loadsRef.current += 1;
    const loads = loadsRef.current;
    const now = Date.now();

    if (loads === 1) {
      firstAtRef.current = now;
      timerRef.current = window.setTimeout(() => {
        if (loadsRef.current === 1) {
          setAuthed(true);
        }
      }, SETTLE_MS);
      return;
    }

    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = 0;
    }

    if (loads === 2 && now - firstAtRef.current < GUEST_BOUNCE_MS) {
      setAuthed(false);
      return;
    }

    setAuthed(true);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  return { authed, onFrameLoad };
}
