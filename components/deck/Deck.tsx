"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { gsap } from "gsap";
import { track } from "@/lib/analytics";
import { CTA_HREF, HASH_ALIASES } from "@/lib/config";
import { isSearchCrawler } from "@/lib/crawler";
import {
  goTo as requestSlide,
  isDeckLocked,
  lockDeck,
  next as requestNext,
  previous as requestPrevious,
  setActiveSlide,
  unlockDeck,
  type DeckGoDetail,
  type DeckOrigin,
} from "@/lib/deck-nav";
import { buildSlideMotion } from "@/lib/slide-motion";
import {
  DECK_GO_EVENT,
  DECK_SLIDE_EVENT,
  SLIDE_COUNT,
  SLIDES,
  slideIndexFromHash,
} from "@/lib/slides";
import "./Presentation.css";

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  const tag = target.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    target.isContentEditable
  );
}

function isMenuOpen() {
  return Boolean(document.querySelector(".blob-nav__toggle.is-open"));
}

function canOverflowScroll(value: string) {
  return value === "auto" || value === "scroll" || value === "overlay";
}

function canScroll(element: HTMLElement, deltaY: number) {
  const style = window.getComputedStyle(element);
  if (!canOverflowScroll(style.overflowY) && !canOverflowScroll(style.overflow)) {
    return false;
  }

  const max = element.scrollHeight - element.clientHeight;
  if (max <= 4) {
    return false;
  }

  if (deltaY > 0 && element.scrollTop < max - 2) {
    return true;
  }

  if (deltaY < 0 && element.scrollTop > 2) {
    return true;
  }

  return false;
}

function scrollableFromEvent(event: Event, deltaY: number) {
  const path = event.composedPath();

  for (const node of path) {
    if (!(node instanceof HTMLElement)) {
      continue;
    }

    if (node.classList.contains("deck-faq") && canScroll(node, deltaY)) {
      return true;
    }

    if (node.classList.contains("deck-slide") && canScroll(node, deltaY)) {
      return true;
    }
  }

  return false;
}

function pinSlideScroll(slide: HTMLElement, toBottom: boolean) {
  void slide.offsetHeight;

  if (slide.classList.contains("deck-slide--intro")) {
    slide.scrollTop = 0;
    return;
  }

  if (toBottom) {
    slide.scrollTop = Math.max(0, slide.scrollHeight - slide.clientHeight);
    const faq = slide.querySelector<HTMLElement>(".deck-faq");
    if (faq) {
      faq.scrollTop = Math.max(0, faq.scrollHeight - faq.clientHeight);
    }
    return;
  }

  slide.scrollTop = 0;
  const faq = slide.querySelector<HTMLElement>(".deck-faq");
  if (faq) {
    faq.scrollTop = 0;
  }
}

function motionPreset() {
  const compact = window.matchMedia("(max-width: 1023px)").matches;

  if (compact) {
    return {
      compact: true,
      duration: 0.48,
      travel: 44,
      contentFrom: 16,
      stagger: 0.03,
      contentDelay: 0.04,
      easeIn: "power2.in",
      easeOut: "power2.out",
    };
  }

  return {
    compact: false,
    duration: 0.68,
    travel: 84,
    contentFrom: 24,
    stagger: 0.05,
    contentDelay: 0.08,
    easeIn: "power2.in",
    easeOut: "power3.out",
  };
}

function enterNodes(slide: HTMLElement) {
  return slide.querySelectorAll<HTMLElement>(".deck-enter");
}

export default function Deck({ children }: { children: ReactNode }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useLayoutEffect(() => {
    const root = document.documentElement;
    const viewport = viewportRef.current;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    root.classList.add("is-deck");

    if (!viewport) {
      return () => root.classList.remove("is-deck");
    }

    const slides = Array.from(
      viewport.querySelectorAll<HTMLElement>("[data-slide]"),
    );

    if (slides.length === 0) {
      return () => root.classList.remove("is-deck");
    }

    if (isSearchCrawler()) {
      root.classList.add("is-crawler");
      viewport.classList.add("is-crawler");
      slides.forEach((slide) => {
        gsap.set(slide, {
          autoAlpha: 1,
          x: 0,
          y: 0,
          scale: 1,
          rotation: 0,
          clipPath: "none",
        });
        gsap.set(enterNodes(slide), {
          autoAlpha: 1,
          x: 0,
          y: 0,
          scale: 1,
          rotation: 0,
        });
        slide.classList.add("is-visible", "is-revealed");
        slide.setAttribute("aria-hidden", "false");
        slide.removeAttribute("inert");
        slide.style.pointerEvents = "auto";
        slide.style.zIndex = "1";
      });

      return () => {
        root.classList.remove("is-deck", "is-crawler");
      };
    }

    let current = slideIndexFromHash(window.location.hash);
    setActiveSlide(current);
    let animating = false;
    let touchY = 0;
    let activeTimeline: gsap.core.Timeline | null = null;
    const nebula = document.querySelector<HTMLElement>(".deck-bg__nebula");

    const sync = (index: number, history: "replace" | "push" | "none" = "replace") => {
      current = index;
      setActive(index);
      setActiveSlide(index);
      const id = SLIDES[index]?.id ?? "inicio";
      track("slide_view", { id, index });
      window.dispatchEvent(
        new CustomEvent(DECK_SLIDE_EVENT, { detail: { id, index } }),
      );

      const url = `${window.location.pathname}${window.location.search}#${id}`;
      if (history === "push") {
        window.history.pushState({ index }, "", url);
        return;
      }

      if (history === "replace") {
        window.history.replaceState({ index }, "", url);
      }
    };

    const restSlide = (slide: HTMLElement, visible: boolean) => {
      gsap.set(slide, {
        autoAlpha: visible ? 1 : 0,
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0,
        clipPath: "inset(0% 0% 0% 0%)",
        force3D: true,
      });
      slide.classList.toggle("is-visible", visible);
      if (!visible) {
        slide.classList.remove("is-revealed");
      }
      slide.setAttribute("aria-hidden", visible ? "false" : "true");
      if (visible) {
        slide.removeAttribute("inert");
      } else {
        slide.setAttribute("inert", "");
      }
      slide.style.pointerEvents = visible ? "auto" : "none";
      slide.style.zIndex = visible ? "2" : "1";
    };

    const resetEnter = (slide: HTMLElement, visible: boolean) => {
      gsap.set(enterNodes(slide), {
        autoAlpha: visible ? 1 : 0,
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0,
      });
    };

    const showInstant = (
      index: number,
      history: "replace" | "push" | "none" = "replace",
    ) => {
      slides.forEach((slide, slideIndex) => {
        restSlide(slide, slideIndex === index);
        resetEnter(slide, slideIndex === index);
      });
      if (reducedMotion) {
        slides[index]?.classList.add("is-revealed");
      }
      sync(index, history);
    };

    const revealContent = (slide: HTMLElement, index: number) => {
      const preset = motionPreset();
      const motion = buildSlideMotion(index, 1, preset);
      const nodes = enterNodes(slide);

      slide.classList.add("is-revealed");

      if (nodes.length === 0) {
        return;
      }

      gsap.killTweensOf(nodes);
      gsap.set(nodes, {
        ...motion.contentFrom,
        force3D: true,
      });
      gsap.to(nodes, {
        ...motion.contentTo,
        duration: preset.compact ? 0.5 : 0.78,
        stagger: preset.stagger,
        delay: preset.contentDelay,
        ease: preset.easeOut,
        overwrite: "auto",
      });
    };

    const goTo = (
      next: number,
      origin: DeckOrigin = "jump",
      fromHistory = false,
    ) => {
      const target = Number(next);
      if (!Number.isInteger(target) || target < 0 || target >= slides.length) {
        return;
      }

      if (target === current) {
        const slide = slides[target];
        if (origin === "jump" && slide) {
          restSlide(slide, true);
          resetEnter(slide, true);
          slide.classList.remove("is-revealed");
          void slide.offsetWidth;
          slide.classList.add("is-visible", "is-revealed");
        }
        return;
      }

      if (animating) {
        activeTimeline?.kill();
        activeTimeline = null;
        gsap.killTweensOf(slides);
        viewport.classList.remove("is-animating");
        animating = false;
        slides.forEach((slide, slideIndex) => {
          restSlide(slide, slideIndex === current);
          resetEnter(slide, slideIndex === current);
        });
      }

      const outgoing = slides[current];
      const incoming = slides[target];
      const direction = target > current ? 1 : -1;
      const preset = motionPreset();
      const motion = buildSlideMotion(target, direction, preset);

      incoming.style.pointerEvents = "auto";
      incoming.style.zIndex = "3";
      outgoing.style.zIndex = "2";
      incoming.removeAttribute("inert");
      incoming.setAttribute("aria-hidden", "false");
      void incoming.offsetHeight;

      const toBottom =
        origin === "scroll" &&
        direction < 0 &&
        !incoming.classList.contains("deck-slide--intro");

      if (reducedMotion) {
        outgoing.classList.remove("is-visible", "is-revealed");
        incoming.classList.add("is-visible");
        showInstant(target, fromHistory ? "none" : "push");
        pinSlideScroll(incoming, toBottom);
        unlockDeck();
        return;
      }

      animating = true;
      lockDeck((preset.duration + 0.18) * 1000);
      viewport.classList.add("is-animating");
      outgoing.classList.remove("is-visible", "is-revealed");
      incoming.classList.remove("is-revealed");
      void incoming.offsetWidth;
      incoming.classList.add("is-visible", "is-revealed");
      pinSlideScroll(incoming, toBottom);
      if (toBottom) {
        requestAnimationFrame(() => pinSlideScroll(incoming, true));
      }

      const outgoingEnter = enterNodes(outgoing);
      const incomingEnter = enterNodes(incoming);

      gsap.killTweensOf([outgoing, incoming]);
      gsap.killTweensOf(outgoingEnter);
      gsap.killTweensOf(incomingEnter);

      gsap.set(incoming, {
        autoAlpha: 1,
        ...motion.inFrom,
        force3D: true,
      });
      gsap.set(incomingEnter, {
        ...motion.contentFrom,
        force3D: true,
      });

      const timeline = gsap.timeline({
        defaults: { force3D: true, overwrite: "auto" },
        onComplete: () => {
          restSlide(outgoing, false);
          resetEnter(outgoing, false);
          gsap.set(incoming, {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            clipPath: "inset(0% 0% 0% 0%)",
          });
          incoming.style.zIndex = "2";
          viewport.classList.remove("is-animating");
          animating = false;
          activeTimeline = null;
          unlockDeck();
        },
      });

      activeTimeline = timeline;

      timeline.to(
        outgoing,
        {
          ...motion.outTo,
          duration: preset.duration * 0.72,
          ease: preset.easeIn,
        },
        0,
      );
      timeline.to(
        outgoingEnter,
        {
          ...motion.contentOut,
          duration: preset.duration * 0.38,
          stagger: preset.stagger * 0.4,
          ease: preset.easeIn,
        },
        0,
      );
      timeline.to(
        incoming,
        {
          ...motion.inTo,
          duration: preset.duration,
          ease: preset.easeOut,
        },
        0.02,
      );
      timeline.to(
        incomingEnter,
        {
          ...motion.contentTo,
          duration: preset.compact ? 0.48 : 0.72,
          stagger: preset.stagger,
          ease: preset.easeOut,
        },
        preset.contentDelay,
      );

      if (nebula) {
        const amount = preset.compact ? 0.4 : 1;
        const shifts = [
          { x: 0, y: 0, scale: 1 },
          { x: -90, y: 48, scale: 0.92 },
          { x: -180, y: 28, scale: 1.04 },
          { x: -40, y: 80, scale: 0.9 },
          { x: -120, y: -24, scale: 1.08 },
          { x: -70, y: 36, scale: 0.94 },
          { x: -150, y: -18, scale: 1.02 },
          { x: -200, y: 64, scale: 0.96 },
        ];
        const shift = shifts[target] ?? shifts[0];
        gsap.to(nebula, {
          x: shift.x * amount,
          y: shift.y * amount,
          scale: 1 + (shift.scale - 1) * amount,
          duration: preset.duration,
          ease: "power2.inOut",
          overwrite: "auto",
        });
      }

      sync(target, fromHistory ? "none" : "push");
    };

    const startIntro = () => {
      if (reducedMotion) {
        return;
      }
      revealContent(slides[current], current);
    };

    showInstant(current);
    if (!reducedMotion) {
      gsap.set(enterNodes(slides[current]), {
        ...buildSlideMotion(current, 1, motionPreset()).contentFrom,
      });
    }

    if (document.querySelector(".shiver-splash")) {
      window.addEventListener("shiver:preloader-done", startIntro, {
        once: true,
      });
    } else {
      startIntro();
    }

    const onGo = (event: Event) => {
      const detail = (event as CustomEvent<DeckGoDetail>).detail;
      if (typeof detail?.index !== "number") {
        return;
      }

      goTo(detail.index, detail.origin ?? "jump", Boolean(detail.fromHistory));
    };

    const onWheel = (event: WheelEvent) => {
      if (isMenuOpen() || isTypingTarget(event.target)) {
        return;
      }

      if (scrollableFromEvent(event, event.deltaY)) {
        return;
      }

      event.preventDefault();
      if (isDeckLocked() || Math.abs(event.deltaY) < 16) {
        return;
      }

      if (event.deltaY > 0) {
        requestNext();
        return;
      }

      requestPrevious();
    };

    const onKey = (event: KeyboardEvent) => {
      if (isTypingTarget(event.target) || isMenuOpen()) {
        return;
      }

      switch (event.key) {
        case "ArrowDown":
        case "PageDown":
        case "ArrowRight":
          event.preventDefault();
          requestNext();
          break;
        case " ":
          if (
            event.target instanceof HTMLElement &&
            event.target.closest("a, button, summary, input, textarea")
          ) {
            break;
          }
          event.preventDefault();
          requestNext();
          break;
        case "ArrowUp":
        case "PageUp":
        case "ArrowLeft":
          event.preventDefault();
          requestPrevious();
          break;
        case "Home":
          event.preventDefault();
          requestSlide(0);
          break;
        case "End":
          event.preventDefault();
          requestSlide(slides.length - 1);
          break;
        default:
          break;
      }
    };

    const onTouchStart = (event: TouchEvent) => {
      touchY = event.changedTouches[0]?.clientY ?? 0;
    };

    const onTouchEnd = (event: TouchEvent) => {
      if (isMenuOpen()) {
        return;
      }

      const endY = event.changedTouches[0]?.clientY ?? touchY;
      const deltaY = touchY - endY;

      if (Math.abs(deltaY) < 48) {
        return;
      }

      if (scrollableFromEvent(event, deltaY)) {
        return;
      }

      if (deltaY > 0) {
        requestNext();
        return;
      }

      requestPrevious();
    };

    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement | null)?.closest("a");
      if (!link) {
        return;
      }

      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) {
        return;
      }

      const nextIndex = slideIndexFromHash(href);
      const id = href.slice(1);
      if (!(id in HASH_ALIASES) && !SLIDES.some((slide) => slide.id === id)) {
        return;
      }

      event.preventDefault();
      if (href === CTA_HREF) {
        track("cta_click", { href });
      }
      requestSlide(nextIndex);
    };

    const onHashNav = () => {
      requestSlide(slideIndexFromHash(window.location.hash), "jump", true);
    };

    window.addEventListener(DECK_GO_EVENT, onGo);
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("popstate", onHashNav);
    window.addEventListener("hashchange", onHashNav);
    viewport.addEventListener("touchstart", onTouchStart, { passive: true });
    viewport.addEventListener("touchend", onTouchEnd, { passive: true });
    document.addEventListener("click", onClick);

    return () => {
      unlockDeck();
      gsap.killTweensOf(slides);
      window.removeEventListener("shiver:preloader-done", startIntro);
      window.removeEventListener(DECK_GO_EVENT, onGo);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("popstate", onHashNav);
      window.removeEventListener("hashchange", onHashNav);
      viewport.removeEventListener("touchstart", onTouchStart);
      viewport.removeEventListener("touchend", onTouchEnd);
      document.removeEventListener("click", onClick);
      root.classList.remove("is-deck");
    };
  }, []);

  const isLast = active === SLIDE_COUNT - 1;

  return (
    <>
      <div className="deck-bg" data-active={active} aria-hidden>
        <div className="deck-bg__nebula" />
      </div>

      <p className="sr-only" aria-live="polite">
        {SLIDES[active]?.label ?? "Início"}
      </p>

      <nav className="deck-dots" aria-label="Slides da apresentação">
        {SLIDES.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            className={index === active ? "is-active" : undefined}
            aria-current={index === active ? "true" : undefined}
            aria-label={slide.label}
            title={slide.label}
            onClick={() => requestSlide(index)}
          />
        ))}
      </nav>

      <div className="deck-meta">
        <p className="deck-index" key={active}>
          {pad(active + 1)} / {pad(SLIDE_COUNT)}
        </p>
        <button
          type="button"
          className="deck-scroll"
          aria-label={isLast ? "Voltar ao início" : "Ir para o próximo slide"}
          onClick={() => (isLast ? requestSlide(0) : requestNext())}
        >
          {isLast ? "Topo" : "Scroll"}
        </button>
      </div>

      <div ref={viewportRef} className="deck-viewport">
        {children}
      </div>
    </>
  );
}
