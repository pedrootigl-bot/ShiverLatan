"use client";

import { useI18n } from "@/components/i18n/LocaleProvider";
import { ROUTES } from "@/lib/config";
import { BROKER_SESSION_WAIT_KEY, tradeRoomUrl } from "@/lib/sala";

export default function CtaLink({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const { locale, t } = useI18n();
  const roomUrl = tradeRoomUrl(locale);

  return (
    <a
      href={roomUrl}
      target="_blank"
      rel="noopener"
      className={className}
      aria-label={t.ctaAria}
      onClick={() => {
        window.sessionStorage.setItem(BROKER_SESSION_WAIT_KEY, "1");
        window.setTimeout(() => {
          window.location.assign(ROUTES.sala);
        }, 0);
      }}
    >
      {children}
    </a>
  );
}
