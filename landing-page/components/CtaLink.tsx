"use client";

import { useI18n } from "@/components/i18n/LocaleProvider";
import { REGISTER_URL } from "@/lib/config";

export default function CtaLink({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const { t } = useI18n();

  return (
    <a href={REGISTER_URL} className={className} aria-label={t.ctaAria}>
      {children}
    </a>
  );
}
