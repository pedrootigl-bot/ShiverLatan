"use client";

import { SALA_EBOOKS, type SalaEbook } from "@/lib/sala";
import { IconBooks, IconPanel } from "@/components/sala/SalaIcons";

type SalaLibraryProps = {
  onClose: () => void;
  onOpenEbook: (ebook: SalaEbook) => void;
};

export default function SalaLibrary({ onClose, onOpenEbook }: SalaLibraryProps) {
  return (
    <section className="sala-library" id="sala-library" aria-label="Biblioteca de e-books">
      <header className="sala-chat__head">
        <div>
          <p className="sala-chat__title">
            <span className="sala-chat__name">Biblioteca</span>
            <span className="sala-chat__bot">PDF</span>
          </p>
          <p className="sala-chat__status">
            <span aria-hidden />
            E-books · lançamento depois
          </p>
        </div>
        <button
          type="button"
          className="sala-icon-btn sala-chat__toggle"
          aria-label="Fechar biblioteca"
          aria-expanded="true"
          aria-controls="sala-library"
          onClick={onClose}
        >
          <IconPanel />
        </button>
      </header>

      <div className="sala-library__list">
        {SALA_EBOOKS.map((ebook) => (
          <button
            key={ebook.id}
            type="button"
            className="sala-ebook"
            onClick={() => onOpenEbook(ebook)}
          >
            <span className="sala-ebook__cover" aria-hidden>
              <IconBooks />
            </span>
            <span className="sala-ebook__body">
              <span className="sala-ebook__tag">E-book · em breve</span>
              <strong>{ebook.title}</strong>
              <span>{ebook.subtitle}</span>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
