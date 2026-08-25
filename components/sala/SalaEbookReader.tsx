"use client";

import { useRef, useState } from "react";
import SalaEbookCover from "@/components/sala/SalaEbookCover";
import { downloadSalaEbookPdf } from "@/lib/downloadSalaEbookPdf";
import type { SalaEbook } from "@/lib/sala";

type SalaEbookReaderProps = {
  ebook: SalaEbook;
  onClose: () => void;
};

export default function SalaEbookReader({ ebook, onClose }: SalaEbookReaderProps) {
  const printRef = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState(false);
  const [fail, setFail] = useState("");

  const download = async () => {
    const root = printRef.current;
    if (!root || busy) {
      return;
    }

    setBusy(true);
    setFail("");

    try {
      await downloadSalaEbookPdf(root, ebook.title);
    } catch {
      setFail("Não foi possível gerar o PDF. Tente de novo.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="sala-ebook-reader" role="presentation" onClick={onClose}>
      <article
        className="sala-ebook-reader__card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sala-ebook-title"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="sala-ebook-reader__head">
          <p>{ebook.kicker}</p>
          <div className="sala-ebook-reader__actions">
            <button type="button" className="sala-ebook-reader__download" onClick={() => void download()} disabled={busy}>
              {busy ? "Gerando PDF…" : "Baixar e-book"}
            </button>
            <button type="button" onClick={onClose}>
              Fechar
            </button>
          </div>
        </header>
        {fail ? <p className="sala-ebook-reader__fail">{fail}</p> : null}
        <div ref={printRef} className="sala-ebook-reader__scroll">
          <SalaEbookCover ebook={ebook} size="hero" />
          <h2 id="sala-ebook-title">{ebook.title}</h2>
          <p className="sala-ebook-reader__lead">{ebook.subtitle}</p>
          {ebook.body.map((section) => (
            <section key={section.heading ?? section.paragraphs[0]}>
              {section.heading ? <h3>{section.heading}</h3> : null}
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
        </div>
      </article>
    </div>
  );
}
