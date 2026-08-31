"use client";

import ShiverPlatform from "@/components/ShiverPlatform";
import { tradeRoomUrl } from "@/lib/sala";
import { useI18n } from "@/components/i18n/LocaleProvider";

export default function SalaModal({
  authed,
  resumeOnReturn,
  onFrameLoad,
  onFrameReset,
  onResume,
  onAuthSuccess,
}: {
  authed: boolean;
  resumeOnReturn: boolean;
  onFrameLoad: () => void;
  onFrameReset: () => void;
  onResume: () => void;
  onAuthSuccess?: () => void;
}) {
  const { locale } = useI18n();
  const src = tradeRoomUrl(locale);

  return (
    <ShiverPlatform
      src={src}
      authed={authed}
      resumeOnReturn={resumeOnReturn}
      onFrameLoad={onFrameLoad}
      onFrameReset={onFrameReset}
      onResume={onResume}
      onAuthSuccess={onAuthSuccess}
    />
  );
}
