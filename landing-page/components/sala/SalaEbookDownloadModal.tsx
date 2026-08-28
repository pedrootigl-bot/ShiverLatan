"use client";

import type { SalaEbookPdfProgress } from "@/lib/downloadSalaEbookPdf";
import { useI18n } from "@/components/i18n/LocaleProvider";

function clampPercent(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function SalaEbookLoadBar({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  const percent = clampPercent(value);

  return (
    <div className="sala-ebook-load__row">
      <div className="sala-ebook-load__row-head">
        <span>{label}</span>
        <b>{percent}%</b>
      </div>
      <div
        className="sala-ebook-load__bar"
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
      >
        <span style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

export default function SalaEbookDownloadModal({
  title,
  progress,
}: {
  title: string;
  progress: SalaEbookPdfProgress;
}) {
  const { t } = useI18n();

  return (
    <div className="sala-ebook-load" role="alertdialog" aria-modal="true" aria-labelledby="sala-ebook-load-title">
      <div className="sala-ebook-load__card" onClick={(event) => event.stopPropagation()}>
        <p className="sala-ebook-load__kicker">{t.sala.loadKicker}</p>
        <h2 id="sala-ebook-load-title">{t.sala.loadTitle}</h2>
        <p className="sala-ebook-load__file">{title}</p>
        <p className="sala-ebook-load__status">{progress.label}</p>
        <SalaEbookLoadBar label={t.sala.loadOverall} value={progress.overall} />
        <SalaEbookLoadBar label={t.sala.loadPages} value={progress.capture} />
        <SalaEbookLoadBar label={t.sala.loadFile} value={progress.save} />
        <p className="sala-ebook-load__hint">{t.sala.loadHint}</p>
      </div>
    </div>
  );
}
