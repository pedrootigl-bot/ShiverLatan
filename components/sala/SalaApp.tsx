"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import SalaChat from "@/components/sala/SalaChat";
import { IconBooks, IconRobot, IconRuler } from "@/components/sala/SalaIcons";
import SalaLibrary from "@/components/sala/SalaLibrary";
import SalaModal from "@/components/sala/SalaModal";
import { useBrokerSession } from "@/components/sala/useBrokerSession";
import { useSalaChat } from "@/components/sala/useSalaChat";
import { ROUTES } from "@/lib/config";
import type { SalaEbook } from "@/lib/sala";
import "./Sala.css";

type SalaTool = "chat" | "ruler" | "books";
type SidePanel = "chat" | "library";

function assertNever(value: never): never {
  throw new Error(`Ferramenta da sala não tratada: ${String(value)}`);
}

function SalaNav({
  active,
  onSelect,
}: {
  active: SalaTool | null;
  onSelect: (tool: SalaTool) => void;
}) {
  return (
    <>
      <button
        type="button"
        className={active === "chat" ? "sala-nav__ia is-active" : "sala-nav__ia"}
        aria-label="IA — Sala de Sinais"
        aria-pressed={active === "chat"}
        aria-controls="sala-chat"
        onClick={() => onSelect("chat")}
      >
        <span className="sala-nav__ia-ring">
          <IconRobot />
        </span>
        <span className="sala-nav__ia-label">IA</span>
        <span className="sala-nav__name">Sala de Sinais</span>
      </button>
      <button
        type="button"
        className={active === "ruler" ? "is-active" : undefined}
        aria-label="Métricas"
        aria-pressed={active === "ruler"}
        aria-haspopup="dialog"
        onClick={() => onSelect("ruler")}
      >
        <IconRuler />
        <span className="sala-nav__name">Métricas</span>
      </button>
      <button
        type="button"
        className={active === "books" ? "is-active" : undefined}
        aria-label="E-books"
        aria-pressed={active === "books"}
        aria-controls="sala-library"
        onClick={() => onSelect("books")}
      >
        <IconBooks />
        <span className="sala-nav__name">E-books</span>
      </button>
    </>
  );
}

export default function SalaApp() {
  const { messages, status } = useSalaChat();
  const { authed, onFrameLoad } = useBrokerSession();
  const [sideOpen, setSideOpen] = useState(false);
  const [panel, setPanel] = useState<SidePanel>("chat");
  const [soonOpen, setSoonOpen] = useState(false);
  const [notice, setNotice] = useState({ title: "", text: "" });
  const [active, setActive] = useState<SalaTool | null>(null);

  const closeSoon = () => {
    setSoonOpen(false);
    setActive((current) => {
      if (current !== "ruler") {
        return current;
      }
      if (!sideOpen) {
        return null;
      }
      return panel === "library" ? "books" : "chat";
    });
  };

  const closeSide = () => {
    setSideOpen(false);
    setActive((current) => (current === "ruler" ? current : null));
  };

  useEffect(() => {
    if (!soonOpen) {
      return;
    }

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeSoon();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [soonOpen, sideOpen, panel]);

  const selectTool = (tool: SalaTool) => {
    if (!authed) {
      return;
    }

    switch (tool) {
      case "chat":
        setSoonOpen(false);
        setPanel("chat");
        setSideOpen(true);
        setActive("chat");
        return;
      case "ruler":
        setNotice({
          title: "Ferramenta em atualização",
          text: "Com novas atualizações essa ferramenta estará disponível.",
        });
        setSoonOpen(true);
        setActive("ruler");
        return;
      case "books":
        setSoonOpen(false);
        setPanel("library");
        setSideOpen(true);
        setActive("books");
        return;
      default:
        return assertNever(tool);
    }
  };

  const openEbook = (ebook: SalaEbook) => {
    if (ebook.pdfUrl) {
      window.open(ebook.pdfUrl, "_blank", "noopener,noreferrer");
      return;
    }

    setNotice({
      title: ebook.title,
      text: "O PDF deste e-book será lançado depois. O card já está pronto para abrir o arquivo.",
    });
    setSoonOpen(true);
  };

  let side: "chat" | "library" | "closed";
  if (!authed || !sideOpen) {
    side = "closed";
  } else if (panel === "library") {
    side = "library";
  } else {
    side = "chat";
  }

  return (
    <div className={`sala sala--${side}${authed ? "" : " sala--guest"}`}>
      {authed ? (
        <aside className="sala-rail" aria-label="Navegação da sala">
          <Link href={ROUTES.home} className="sala-rail__brand" aria-label="Shiver — início">
            S
          </Link>
          <nav>
            <SalaNav active={active} onSelect={selectTool} />
          </nav>
        </aside>
      ) : null}

      <div className="sala-shell">
        {authed ? (
          <nav className="sala-tools" aria-label="Ferramentas da sala">
            <SalaNav active={active} onSelect={selectTool} />
          </nav>
        ) : null}

        <div className="sala-body">
          {side === "closed" ? null : (
            <button
              type="button"
              className="sala-scrim"
              aria-label="Fechar painel"
              onClick={closeSide}
            />
          )}
          {side === "chat" ? (
            <SalaChat
              messages={messages}
              status={status}
              onClose={closeSide}
            />
          ) : null}
          {side === "library" ? (
            <SalaLibrary onClose={closeSide} onOpenEbook={openEbook} />
          ) : null}
          <div className="sala-stage">
            <SalaModal onFrameLoad={onFrameLoad} />
          </div>
        </div>
      </div>

      {soonOpen ? (
        <div
          className="sala-soon"
          role="presentation"
          onClick={closeSoon}
        >
          <div
            className="sala-soon__card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="sala-soon-title"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="sala-soon__kicker">Em breve</p>
            <h2 id="sala-soon-title">{notice.title}</h2>
            <p>{notice.text}</p>
            <button type="button" onClick={closeSoon}>
              Entendi
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
