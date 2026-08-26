"use client";

import { createContext, useContext, useLayoutEffect, useMemo, useState, type ReactNode } from "react";
import {
  DEFAULT_LOCALE,
  localeFromStorage,
  persistLocale,
  type Locale,
} from "@/lib/i18n/locale";
import { messages, type Messages } from "@/lib/i18n/messages";

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Messages;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useLayoutEffect(() => {
    const next = localeFromStorage();
    setLocaleState(next);
    persistLocale(next);
  }, []);

  const value = useMemo<I18nContextValue>(() => {
    return {
      locale,
      setLocale: (next) => {
        setLocaleState(next);
        persistLocale(next);
      },
      t: messages[locale],
    };
  }, [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n precisa estar dentro de LocaleProvider");
  }
  return context;
}
