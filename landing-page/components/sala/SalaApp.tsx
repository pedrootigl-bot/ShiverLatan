"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useI18n } from "@/components/i18n/LocaleProvider";
import SalaChat from "@/components/sala/SalaChat";
import { IconBooks, IconLock, IconRobot, IconRuler } from "@/components/sala/SalaIcons";
import SalaLibrary from "@/components/sala/SalaLibrary";
import SalaModal from "@/components/sala/SalaModal";
import { useBrokerSession } from "@/components/sala/useBrokerSession";
import { useTradingSignals } from "@/components/sala/useTradingSignals";
import { ROUTES } from "@/lib/config";
import "./Sala.css";

type SalaTool = "chat" | "ruler" | "books";
type SidePanel = "chat" | "library";

function assertNever(value: never): never {
  throw new Error(`Ferramenta da sala não tratada: ${String(value)}`);
}

function SalaNav({
  active,
  locked,
  onSelect,
}: {
  active: SalaTool | null;
  locked: boolean;
  onSelect: (tool: SalaTool) => void;
}) {
  const { t } = useI18n();
  const className = (tool: SalaTool, extra?: string) => {
    const names = extra ? [extra] : [];
    if (active === tool && !locked) {
      names.push("is-active");
    }
    if (locked) {
      names.push("is-locked");
    }
    return names.join(" ") || undefined;
  };

  return (
    <>
      <button
        type="button"
        className={className("chat", "sala-nav__ia")}
        aria-label={locked ? t.sala.chatLocked : t.sala.chat}
        aria-pressed={locked ? false : active === "chat"}
        aria-controls="sala-chat"
        aria-disabled={locked}
        onClick={() => onSelect("chat")}
      >
        <span className="sala-nav__ia-ring">
          <IconRobot />
        </span>
        <span className="sala-nav__ia-label">IA</span>
        <span className="sala-nav__name">Sala de Sinais</span>
        {locked ? (
          <span className="sala-nav__lock" aria-hidden>
            <IconLock />
          </span>
        ) : null}
      </button>
      <button
        type="button"
        className={className("ruler")}
        aria-label={locked ? t.sala.rulerLocked : t.sala.ruler}
        aria-pressed={locked ? false : active === "ruler"}
        aria-haspopup="dialog"
        aria-disabled={locked}
        onClick={() => onSelect("ruler")}
      >
        <IconRuler />
        <span className="sala-nav__name">{t.sala.ruler}</span>
        {locked ? (
          <span className="sala-nav__lock" aria-hidden>
            <IconLock />
          </span>
        ) : null}
      </button>
      <button
        type="button"
        className={className("books")}
        aria-label={locked ? t.sala.booksLocked : t.sala.books}
        aria-pressed={locked ? false : active === "books"}
        aria-controls="sala-library"
        aria-disabled={locked}
        onClick={() => onSelect("books")}
      >
        <IconBooks />
        <span className="sala-nav__name">{t.sala.books}</span>
        {locked ? (
          <span className="sala-nav__lock" aria-hidden>
            <IconLock />
          </span>
        ) : null}
      </button>
    </>
  );
}

export default function SalaApp() {
  const { t } = useI18n();
  const { signals, connectionStatus, error } = useTradingSignals();
  const { authed, onFrameLoad, resetSession, markResume } = useBrokerSession();
  const [sideOpen, setSideOpen] = useState(false);
  const [panel, setPanel] = useState<SidePanel>("chat");
  const [soonOpen, setSoonOpen] = useState(false);
  const [notice, setNotice] = useState({ kicker: "", title: "", text: "" });
  const [active, setActive] = useState<SalaTool | null>(null);
  const [debugSignals, setDebugSignals] = useState(false);

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
    if (authed) {
      return;
    }
    setSideOpen(false);
    setActive(null);
    setSoonOpen(false);
  }, [authed]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setDebugSignals(
      process.env.NODE_ENV !== "production" && params.get("debugSignals") === "true",
    );
  }, []);

  useEffect(() => {
    if (!soonOpen) {
      return;
    }

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }
      closeSoon();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [soonOpen, sideOpen, panel]);

  const selectTool = (tool: SalaTool) => {
    if (!authed) {
      setNotice({
        kicker: t.sala.blockedKicker,
        title: t.sala.blockedTitle,
        text: t.sala.blockedText,
      });
      setSoonOpen(true);
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
          kicker: t.sala.soonKicker,
          title: t.sala.soonTitle,
          text: t.sala.soonText,
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
      <aside className="sala-rail" aria-label={t.sala.railAria}>
        <Link href={ROUTES.home} className="sala-rail__brand" aria-label={t.sala.homeAria}>
          S
        </Link>
        <nav>
          <SalaNav active={active} locked={!authed} onSelect={selectTool} />
        </nav>
      </aside>

      <div className="sala-shell">
        <nav className="sala-tools" aria-label={t.sala.toolsAria}>
          <SalaNav active={active} locked={!authed} onSelect={selectTool} />
        </nav>

        <div className="sala-body">
          {side === "closed" ? null : (
            <button
              type="button"
              className="sala-scrim"
              aria-label={t.sala.closePanel}
              onClick={closeSide}
            />
          )}
          {side === "chat" ? (
            <SalaChat
              signals={signals}
              connectionStatus={connectionStatus}
              error={error}
              debug={debugSignals}
              onClose={closeSide}
            />
          ) : null}
          {side === "library" ? (
            <SalaLibrary onClose={closeSide} />
          ) : null}
          <div className="sala-stage">
            <SalaModal
              resumeOnReturn={!authed}
              onFrameLoad={onFrameLoad}
              onFrameReset={resetSession}
              onResume={markResume}
            />
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
            <header className="sala-soon__head">
              <span className="sala-soon__mark" aria-hidden>
                {notice.kicker === t.sala.blockedKicker ? <IconLock /> : <IconRuler />}
              </span>
              <div>
                <p className="sala-soon__kicker">{notice.kicker}</p>
                <h2 id="sala-soon-title">{notice.title}</h2>
              </div>
            </header>
            <p className="sala-soon__text">{notice.text}</p>
            <footer className="sala-soon__foot">
              <button type="button" onClick={closeSoon}>
                {t.sala.understood}
              </button>
            </footer>
          </div>
        </div>
      ) : null}
    </div>
  );
}
