"use client";

import { useLayoutEffect, useState, type ReactNode } from "react";
import { isSearchCrawler } from "@/lib/crawler";
import { PRELOADER } from "@/lib/config";
import { useI18n } from "@/components/i18n/LocaleProvider";
import "./Preloader.css";

type PreloaderProps = {
  children: ReactNode;
};

const AXES = [
  { label: "Tendência", tone: "blue" },
  { label: "Momentum", tone: "purple" },
  { label: "Volatilidade", tone: "amber" },
] as const;

const CANDLES = [
  { x: 10, up: true, body: 22, wick: 10 },
  { x: 28, up: false, body: 16, wick: 8 },
  { x: 46, up: true, body: 28, wick: 12 },
  { x: 64, up: true, body: 18, wick: 9 },
  { x: 82, up: false, body: 24, wick: 11 },
  { x: 100, up: true, body: 32, wick: 13 },
  { x: 118, up: false, body: 14, wick: 7 },
  { x: 136, up: true, body: 26, wick: 10 },
  { x: 154, up: true, body: 20, wick: 8 },
] as const;

export default function Preloader({ children }: PreloaderProps) {
  const { t } = useI18n();
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  useLayoutEffect(() => {
    let finished = false;

    const finish = () => {
      if (finished) {
        return;
      }

      finished = true;

      document.documentElement.classList.add("splash-seen");
      document.body.style.overflow = "";
      setVisible(false);
      window.dispatchEvent(new Event("shiver:preloader-done"));
    };

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const failsafe = window.setTimeout(finish, PRELOADER.failsafeMs);

    if (prefersReducedMotion || isSearchCrawler()) {
      finish();
      return () => {
        window.clearTimeout(failsafe);
        document.body.style.overflow = "";
      };
    }

    document.body.style.overflow = "hidden";

    const exitTimer = window.setTimeout(() => {
      setExiting(true);
    }, PRELOADER.exitMs);

    const doneTimer = window.setTimeout(finish, PRELOADER.doneMs);

    return () => {
      window.clearTimeout(failsafe);
      window.clearTimeout(exitTimer);
      window.clearTimeout(doneTimer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      {visible ? (
        <div
          className={
            exiting ? "shiver-splash shiver-splash--exit" : "shiver-splash"
          }
          role="status"
          aria-live="polite"
          aria-label={t.splash.aria}
          aria-hidden={exiting}
        >
          <div className="shiver-splash__bg" aria-hidden>
            <div className="shiver-splash__nebula" />
          </div>

          <div className="shiver-splash__stage">
            <p className="shiver-splash__eyebrow">{t.splash.eyebrow}</p>

            <div className="shiver-splash__brand">
              <span className="shiver-splash__mark">S</span>
              <h2 className="shiver-splash__title">
                <span className="shiver-splash__fill">Shiver</span>
                <span className="shiver-splash__outline">{t.splash.outline}</span>
              </h2>
            </div>

            <p className="shiver-splash__lead">{t.splash.lead}</p>

            <ul className="shiver-splash__axes">
              {AXES.map((axis, index) => (
                <li
                  key={axis.tone}
                  className="shiver-splash__axis"
                  data-tone={axis.tone}
                >
                  {t.splash.axes[index]}
                </li>
              ))}
            </ul>

            <div className="shiver-splash__chart">
              <svg viewBox="0 0 172 72" aria-hidden>
                {CANDLES.map((candle, index) => {
                  const mid = 46;
                  const bodyTop = candle.up ? mid - candle.body : mid;
                  const color = candle.up ? "#22d3ee" : "#2563eb";

                  return (
                    <g
                      key={candle.x}
                      className="shiver-splash__candle"
                      style={{ animationDelay: `${0.72 + index * 0.06}s` }}
                    >
                      <line
                        x1={candle.x + 4}
                        x2={candle.x + 4}
                        y1={bodyTop - candle.wick * 0.45}
                        y2={bodyTop + candle.body + candle.wick * 0.4}
                        stroke={color}
                        strokeWidth="1.2"
                      />
                      <rect
                        x={candle.x}
                        y={bodyTop}
                        width="8"
                        height={candle.body}
                        rx="1.2"
                        fill={color}
                      />
                    </g>
                  );
                })}
              </svg>
              <span className="shiver-splash__scan" />
            </div>

            <p className="shiver-splash__kicker">{t.splash.kicker}</p>
          </div>

          <span className="shiver-splash__bar" aria-hidden />
        </div>
      ) : null}

      {children}
    </>
  );
}
