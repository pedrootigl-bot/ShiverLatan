"use client";

import { useEffect, useRef, useState } from "react";
import { DECK_SLIDE_EVENT } from "@/lib/slides";

type LiveValueProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
};

function formatValue(value: number, decimals: number) {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export default function LiveValue({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
}: LiveValueProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || started) {
      return;
    }

    const slide = element.closest<HTMLElement>("[data-slide]");

    const tryStart = () => {
      if (slide?.classList.contains("is-visible")) {
        setStarted(true);
      }
    };

    tryStart();
    window.addEventListener(DECK_SLIDE_EVENT, tryStart);

    return () => {
      window.removeEventListener(DECK_SLIDE_EVENT, tryStart);
    };
  }, [started]);

  useEffect(() => {
    if (!started) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      const frame = requestAnimationFrame(() => {
        setDisplay(value);
      });

      return () => cancelAnimationFrame(frame);
    }

    let frame = 0;
    const start = performance.now();
    const duration = 900;
    const from = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setDisplay(from + (value - from) * eased);

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [started, value]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`.trim()}>
      {prefix}
      {formatValue(display, decimals)}
      {suffix}
    </span>
  );
}
