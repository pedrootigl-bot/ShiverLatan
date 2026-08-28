"use client";

import { useId } from "react";
import { useI18n } from "@/components/i18n/LocaleProvider";
import type { Locale } from "@/lib/i18n/locale";
import "./LanguageSwitch.css";

function FlagPortugal({ clipId }: { clipId: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <clipPath id={clipId}>
        <circle cx="12" cy="12" r="12" />
      </clipPath>
      <g clipPath={`url(#${clipId})`}>
        <rect width="24" height="24" fill="#c8102e" />
        <rect width="9.6" height="24" fill="#006600" />
        <circle cx="9.6" cy="12" r="3.15" fill="#ffd700" />
        <circle cx="9.6" cy="12" r="2.05" fill="#c8102e" />
        <circle cx="9.6" cy="12" r="1.15" fill="#fff" />
      </g>
    </svg>
  );
}

function FlagSpain({ clipId }: { clipId: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <clipPath id={clipId}>
        <circle cx="12" cy="12" r="12" />
      </clipPath>
      <g clipPath={`url(#${clipId})`}>
        <rect width="24" height="24" fill="#c60b1e" />
        <rect y="6" width="24" height="12" fill="#ffc400" />
      </g>
    </svg>
  );
}

const OPTIONS: Array<{ locale: Locale; code: string }> = [
  { locale: "pt", code: "Pt" },
  { locale: "es", code: "Es" },
];

export default function LanguageSwitch({
  variant = "header",
}: {
  variant?: "header" | "sala";
}) {
  const { locale, setLocale, t } = useI18n();
  const uid = useId().replace(/:/g, "");

  return (
    <div className={`lang-switch lang-switch--${variant}`} role="group" aria-label={t.language.group}>
      {OPTIONS.map((option) => {
        const active = locale === option.locale;
        const name = option.locale === "pt" ? t.language.pt : t.language.es;
        const clipId = `lang-flag-${option.locale}-${uid}`;

        return (
          <button
            key={option.locale}
            type="button"
            className={active ? "lang-switch__btn is-active" : "lang-switch__btn"}
            aria-pressed={active}
            aria-label={name}
            onClick={() => setLocale(option.locale)}
          >
            <span className="lang-switch__flag">
              {option.locale === "pt" ? <FlagPortugal clipId={clipId} /> : <FlagSpain clipId={clipId} />}
            </span>
            <span className="lang-switch__code">{option.code}</span>
          </button>
        );
      })}
    </div>
  );
}
