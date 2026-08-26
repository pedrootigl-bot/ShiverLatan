"use client";

import { useI18n } from "@/components/i18n/LocaleProvider";

export default function SkipLink() {
  const { t } = useI18n();

  return (
    <a href="#conteudo" className="skip-link">
      {t.skip}
    </a>
  );
}
