"use client";

import LanguageSwitch from "@/components/i18n/LanguageSwitch";
import { useI18n } from "@/components/i18n/LocaleProvider";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useI18n();

  return (
    <main
      id="conteudo"
      className="flex min-h-screen flex-col items-center justify-center bg-[#05070d] px-6 text-center text-white"
    >
      <div className="absolute top-5 right-5">
        <LanguageSwitch />
      </div>
      <p className="text-xs font-semibold tracking-[0.22em] text-[#38bdf8] uppercase">
        {t.errors.loadKicker}
      </p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight">{t.errors.loadTitle}</h1>
      <p className="mt-3 max-w-md text-sm text-zinc-400">{t.errors.loadText}</p>
      <button
        type="button"
        className="mt-8 rounded-full bg-gradient-to-r from-[#38bdf8] to-[#2563eb] px-5 py-2.5 text-sm font-semibold text-white"
        onClick={() => reset()}
      >
        {t.errors.retry}
      </button>
    </main>
  );
}
