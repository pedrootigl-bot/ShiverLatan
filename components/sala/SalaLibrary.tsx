"use client";

import { useEffect, useRef, useState } from "react";
import SalaEbookCover from "@/components/sala/SalaEbookCover";
import SalaEbookReader from "@/components/sala/SalaEbookReader";
import { IconPanel } from "@/components/sala/SalaIcons";
import { useI18n } from "@/components/i18n/LocaleProvider";
import { getSalaEbooks } from "@/lib/i18n/ebooks";
import type { SalaEbook } from "@/lib/sala";

type SalaLibraryProps = {
  onClose: () => void;
};

type EbookRowProps = {
  ebook: SalaEbook;
  open: boolean;
  onToggle: (id: string) => void;
  onCollapse: () => void;
  onBusyChange: (busy: boolean) => void;
  bodyRef?: (node: HTMLElement | null) => void;
};

function EbookRow({ ebook, open, onToggle, onCollapse, onBusyChange, bodyRef }: EbookRowProps) {
  return (
    <article
      className={open ? "sala-ebook is-open" : "sala-ebook"}
      ref={open ? bodyRef : undefined}
    >
      <button
        type="button"
        className="sala-ebook__toggle"
        aria-expanded={open}
        aria-controls={`sala-ebook-panel-${ebook.id}`}
        onClick={() => onToggle(ebook.id)}
      >
        <SalaEbookCover ebook={ebook} />
        <span className="sala-ebook__body">
          <span className="sala-ebook__tag">{ebook.kicker}</span>
          <strong>{ebook.title}</strong>
          <span>{ebook.subtitle}</span>
        </span>
      </button>
      {open ? (
        <div className="sala-ebook__panel" id={`sala-ebook-panel-${ebook.id}`}>
          <SalaEbookReader
            ebook={ebook}
            onCollapse={onCollapse}
            onBusyChange={onBusyChange}
          />
        </div>
      ) : null}
    </article>
  );
}

export default function SalaLibrary({ onClose }: SalaLibraryProps) {
  const { locale, t } = useI18n();
  const ebooks = getSalaEbooks(locale);
  const [openId, setOpenId] = useState<string | null>(null);
  const [locked, setLocked] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);
  const openRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!openId) {
      return;
    }

    listRef.current?.scrollTo({ top: 0 });

    const body = openRef.current?.querySelector(".sala-ebook-reader__body");
    if (body instanceof HTMLElement) {
      body.scrollTo({ top: 0 });
    }
  }, [openId]);

  const toggleEbook = (id: string) => {
    if (locked) {
      return;
    }
    setOpenId((current) => (current === id ? null : id));
  };

  const openEbook = ebooks.find((ebook) => ebook.id === openId) ?? null;
  const catalog = openEbook ? ebooks.filter((ebook) => ebook.id !== openId) : ebooks;
  const reading = Boolean(openEbook);

  return (
    <section
      className={reading ? "sala-library sala-library--reading" : "sala-library"}
      id="sala-library"
      aria-label={t.sala.libraryAria}
    >
      <header className="sala-chat__head">
        <div>
          <p className="sala-chat__title">
            <span className="sala-chat__name">{t.sala.libraryTitle}</span>
            <span className="sala-chat__bot">TEXTO</span>
          </p>
          <p className="sala-chat__status">
            <span aria-hidden />
            {t.sala.libraryStatus}
          </p>
        </div>
        <button
          type="button"
          className="sala-icon-btn sala-chat__toggle"
          aria-label={t.sala.closeLibrary}
          aria-expanded="true"
          aria-controls="sala-library"
          onClick={onClose}
        >
          <IconPanel />
        </button>
      </header>

      <div
        ref={listRef}
        className={reading ? "sala-library__list is-reading" : "sala-library__list"}
      >
        {openEbook ? (
          <EbookRow
            ebook={openEbook}
            open
            onToggle={toggleEbook}
            onCollapse={() => setOpenId(null)}
            onBusyChange={setLocked}
            bodyRef={(node) => {
              openRef.current = node;
            }}
          />
        ) : null}

        {reading ? (
          <div className="sala-library__rest" aria-label={t.sala.libraryOthers}>
            {catalog.map((ebook) => (
              <EbookRow
                key={ebook.id}
                ebook={ebook}
                open={false}
                onToggle={toggleEbook}
                onCollapse={() => setOpenId(null)}
                onBusyChange={setLocked}
              />
            ))}
          </div>
        ) : (
          catalog.map((ebook) => (
            <EbookRow
              key={ebook.id}
              ebook={ebook}
              open={false}
              onToggle={toggleEbook}
              onCollapse={() => setOpenId(null)}
              onBusyChange={setLocked}
            />
          ))
        )}
      </div>
    </section>
  );
}
