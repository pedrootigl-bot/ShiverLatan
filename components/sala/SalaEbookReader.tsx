"use client";

import { useEffect, useState } from "react";
import SalaEbookBody from "@/components/sala/SalaEbookBody";
import SalaEbookCover from "@/components/sala/SalaEbookCover";
import SalaEbookDownloadModal from "@/components/sala/SalaEbookDownloadModal";
import { useI18n } from "@/components/i18n/LocaleProvider";
import { downloadSalaEbookPdf, type SalaEbookPdfProgress } from "@/lib/downloadSalaEbookPdf";
import type { SalaEbook } from "@/lib/sala";

type SalaEbookReaderProps = {
  ebook: SalaEbook;
  onCollapse: () => void;
  onBusyChange?: (busy: boolean) => void;
};

export default function SalaEbookReader({ ebook, onCollapse, onBusyChange }: SalaEbookReaderProps) {
  const { t } = useI18n();
  const [busy, setBusy] = useState(false);
  const [fail, setFail] = useState("");
  const [progress, setProgress] = useState<SalaEbookPdfProgress>({
    overall: 0,
    capture: 0,
    save: 0,
    label: t.sala.preparingPdf,
  });

  useEffect(() => {
    onBusyChange?.(busy);
    return () => onBusyChange?.(false);
  }, [busy, onBusyChange]);

  useEffect(() => {
    if (!busy) {
      return;
    }

    const blockEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }
      event.preventDefault();
      event.stopImmediatePropagation();
    };

    window.addEventListener("keydown", blockEscape, true);
    return () => window.removeEventListener("keydown", blockEscape, true);
  }, [busy]);

  const download = async () => {
    if (busy) {
      return;
    }

    setBusy(true);
    setFail("");
    setProgress({
      overall: 0,
      capture: 0,
      save: 0,
      label: t.sala.preparingPdf,
    });

    try {
      await downloadSalaEbookPdf(ebook, setProgress, {
        preparing: t.sala.preparingPdf,
        page: t.sala.pagePdf,
        generating: t.sala.generatingPdf,
        done: t.sala.donePdf,
      });
      await new Promise((resolve) => window.setTimeout(resolve, 120));
    } catch {
      setFail(t.sala.downloadFail);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="sala-ebook-expand">
      <div className="sala-ebook-expand__toolbar">
        <button
          type="button"
          className="sala-ebook-reader__download"
          onClick={() => void download()}
          disabled={busy}
        >
          {busy ? t.sala.generating : t.sala.download}
        </button>
        <button
          type="button"
          className="sala-ebook-reader__close"
          onClick={onCollapse}
          disabled={busy}
        >
          {t.sala.collapse}
        </button>
      </div>
      {fail ? <p className="sala-ebook-reader__fail">{fail}</p> : null}
      <div className="sala-ebook-reader__body">
        <div className="sala-ebook-reader__cover">
          <SalaEbookCover ebook={ebook} size="hero" />
        </div>
        <div className="sala-ebook-reader__copy">
          <header className="sala-ebook-reader__intro">
            <h2 id={`sala-ebook-title-${ebook.id}`}>{ebook.title}</h2>
            <p className="sala-ebook-reader__lead">{ebook.subtitle}</p>
          </header>
          <SalaEbookBody blocks={ebook.body} />
        </div>
      </div>
      {busy ? <SalaEbookDownloadModal title={ebook.title} progress={progress} /> : null}
    </div>
  );
}
