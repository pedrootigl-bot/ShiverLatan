export const LOCALES = ["pt", "es"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "pt";
export const LOCALE_STORAGE_KEY = "shiver-locale";

export const LOCALE_META: Record<
  Locale,
  { code: string; html: string; name: string }
> = {
  pt: { code: "Pt", html: "pt-BR", name: "Português" },
  es: { code: "Es", html: "es", name: "Español" },
};

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "pt" || value === "es";
}

export function localeFromStorage(): Locale {
  if (typeof window === "undefined") {
    return DEFAULT_LOCALE;
  }

  try {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    return isLocale(stored) ? stored : DEFAULT_LOCALE;
  } catch {
    return DEFAULT_LOCALE;
  }
}

export function persistLocale(locale: Locale) {
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    return;
  }

  document.documentElement.lang = LOCALE_META[locale].html;
}
