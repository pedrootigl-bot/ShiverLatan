"use client";

import { useLayoutEffect, useState, type ReactNode } from "react";
import "./Preloader.css";

const STORAGE_KEY = "shiver-preloader-seen";

type PreloaderProps = {
  children: ReactNode;
  brandText?: string;
  tagline?: string;
};

export default function Preloader({
  children,
  brandText = "SHIVER",
  tagline = "CORRETORA",
}: PreloaderProps) {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const alreadySeen =
      window.sessionStorage.getItem(STORAGE_KEY) === "1" ||
      document.documentElement.classList.contains("splash-seen");

    if (prefersReducedMotion || alreadySeen) {
      document.documentElement.classList.add("splash-seen");
      document.body.style.overflow = "";
      window.dispatchEvent(new Event("shiver:preloader-done"));
      return;
    }

    document.body.style.overflow = "hidden";

    const exitTimer = window.setTimeout(() => {
      setExiting(true);
    }, 1350);

    const doneTimer = window.setTimeout(() => {
      window.sessionStorage.setItem(STORAGE_KEY, "1");
      document.documentElement.classList.add("splash-seen");
      document.body.style.overflow = "";
      setVisible(false);
      window.dispatchEvent(new Event("shiver:preloader-done"));
    }, 1700);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(doneTimer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      {visible ? (
        <div
          className={exiting ? "shiver-splash shiver-splash--exit" : "shiver-splash"}
          role="status"
          aria-live="polite"
          aria-label="Carregando conteúdo"
          aria-hidden={exiting}
        >
          <div className="shiver-splash__logo">
            <span className="shiver-splash__mark">S</span>
          </div>

          <div className="shiver-splash__svg">
            <svg width="100%" height="100%" aria-hidden="true">
              <rect width="100%" height="100%" />
            </svg>
          </div>

          <div className="shiver-splash__minimize">
            <svg width="100%" height="100%" aria-hidden="true">
              <rect width="100%" height="100%" />
            </svg>
          </div>

          <div className="shiver-splash__text">
            <p className="shiver-splash__wordmark">{brandText}</p>
            <p className="shiver-splash__tag">{tagline}</p>
          </div>
        </div>
      ) : null}

      {children}
    </>
  );
}
