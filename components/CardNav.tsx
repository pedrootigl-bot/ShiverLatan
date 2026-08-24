"use client";

import { useLayoutEffect, useEffect, useRef, useState, type ReactNode } from "react";
import { gsap } from "gsap";
import "./CardNav.css";
import { DECK_SLIDE_EVENT } from "@/lib/slides";

type CardNavLink = {
  label: string;
  href: string;
  ariaLabel: string;
};

export type CardNavItem = {
  label: string;
  href?: string;
  bgColor: string;
  textColor: string;
  links: CardNavLink[];
};

export type CardNavProps = {
  logo: ReactNode;
  items: CardNavItem[];
  className?: string;
  ease?: string;
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
};

const CLOSED_SIZE = 44;
const HOVER_SIZE = 52;
const OPEN_WIDTH = 260;
const CLOSED_RADIUS = 12;
const OPEN_RADIUS = 16;

export default function CardNav({
  logo,
  items,
  className = "",
  baseColor = "#0b0f19",
  buttonBgColor = "#38bdf8",
  buttonTextColor = "#ffffff",
}: CardNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const linksRef = useRef<HTMLElement>(null);
  const isOpenRef = useRef(false);

  useLayoutEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  useLayoutEffect(() => {
    const toggle = toggleRef.current;
    const closeButton = closeRef.current;
    const links = linksRef.current;

    if (!toggle || !closeButton || !links) {
      return;
    }

    gsap.set(toggle, {
      width: CLOSED_SIZE,
      height: CLOSED_SIZE,
      borderRadius: CLOSED_RADIUS,
    });
    gsap.set(closeButton, { autoAlpha: 0 });
    gsap.set(links, { autoAlpha: 0 });
    gsap.set(links.querySelectorAll("a"), { y: -10, autoAlpha: 0 });
  }, []);

  const canHover = () =>
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const onToggleEnter = () => {
    const toggle = toggleRef.current;
    if (!toggle || isOpenRef.current || !canHover()) {
      return;
    }

    gsap.to(toggle, {
      width: HOVER_SIZE,
      height: HOVER_SIZE,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  const onToggleLeave = () => {
    const toggle = toggleRef.current;
    if (!toggle || isOpenRef.current || !canHover()) {
      return;
    }

    gsap.to(toggle, {
      width: CLOSED_SIZE,
      height: CLOSED_SIZE,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  const openMenu = () => {
    const toggle = toggleRef.current;
    const bars = barsRef.current;
    const closeButton = closeRef.current;
    const links = linksRef.current;
    if (!toggle || !bars || !closeButton || !links) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    setIsOpen(true);
    isOpenRef.current = true;
    gsap.killTweensOf([toggle, closeButton, links, ...links.querySelectorAll("a")]);
    gsap.set(bars, { autoAlpha: 0 });

    const nav = toggle.closest(".blob-nav");
    const openWidth = Math.min(
      OPEN_WIDTH,
      Math.max(CLOSED_SIZE, (nav?.clientWidth ?? window.innerWidth) - 12),
    );
    const linkCount = links.querySelectorAll("a").length;
    const openHeight = Math.min(
      44 + 36 + linkCount * 40,
      Math.round(window.innerHeight * 0.62),
    );

    if (prefersReducedMotion) {
      gsap.set(toggle, {
        width: openWidth,
        height: openHeight,
        borderRadius: OPEN_RADIUS,
      });
      gsap.set(closeButton, { autoAlpha: 1 });
      gsap.set(links, { autoAlpha: 1 });
      gsap.set(links.querySelectorAll("a"), { y: 0, autoAlpha: 1 });
      return;
    }

    gsap.to(toggle, {
      width: openWidth,
      height: openHeight,
      borderRadius: OPEN_RADIUS,
      duration: 0.2,
      delay: 0.22,
      ease: "power2.out",
    });

    gsap.to(closeButton, { autoAlpha: 1, duration: 0.15, delay: 0.45 });
    gsap.set(links, { autoAlpha: 1, delay: 0.5 });
    gsap.to(links.querySelectorAll("a"), {
      y: 0,
      autoAlpha: 1,
      duration: 0.2,
      stagger: 0.04,
      delay: 0.5,
      ease: "power2.out",
    });
  };

  const closeMenu = (event?: { stopPropagation?: () => void }) => {
    event?.stopPropagation?.();

    const toggle = toggleRef.current;
    const bars = barsRef.current;
    const closeButton = closeRef.current;
    const links = linksRef.current;
    if (!toggle || !bars || !closeButton || !links || !isOpenRef.current) {
      return;
    }

    gsap.killTweensOf([toggle, closeButton, links, ...links.querySelectorAll("a")]);
    isOpenRef.current = false;
    setIsOpen(false);

    gsap.to(links.querySelectorAll("a"), {
      y: -8,
      autoAlpha: 0,
      duration: 0.12,
      stagger: 0.02,
    });
    gsap.to(links, { autoAlpha: 0, duration: 0.12 });
    gsap.to(closeButton, { autoAlpha: 0, duration: 0.12 });

    gsap.to(toggle, {
      width: CLOSED_SIZE,
      height: CLOSED_SIZE,
      borderRadius: CLOSED_RADIUS,
      duration: 0.2,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.set(bars, { autoAlpha: 1 });
      },
    });
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpenRef.current) {
        closeMenu();
      }
    };

    const onSlide = () => {
      if (isOpenRef.current) {
        closeMenu();
      }
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener(DECK_SLIDE_EVENT, onSlide);

    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(DECK_SLIDE_EVENT, onSlide);
    };
  }, []);

  const toggleMenu = () => {
    if (isOpenRef.current) {
      closeMenu();
      return;
    }

    openMenu();
  };

  const seen = new Set<string>();
  const menuLinks = items.flatMap((item) => item.links).filter((link) => {
    const key = `${link.href}-${link.label}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });

  return (
    <div className={`card-nav-container ${className}`.trim()}>
      <nav className="blob-nav" style={{ backgroundColor: baseColor }}>
        <div className="blob-nav__brand">{logo}</div>

        <div
          ref={toggleRef}
          className={`blob-nav__toggle${isOpen ? " is-open" : ""}`}
          style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
          onMouseEnter={onToggleEnter}
          onMouseLeave={onToggleLeave}
        >
          <button
            type="button"
            className="blob-nav__hit"
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isOpen}
            aria-controls="menu-mobile"
            onClick={toggleMenu}
          />

          <div ref={barsRef} className="blob-nav__bars" aria-hidden>
            <span />
            <span />
            <span />
          </div>

          <button
            ref={closeRef}
            type="button"
            className="blob-nav__close"
            onClick={closeMenu}
          >
            ×
          </button>

          <nav ref={linksRef} id="menu-mobile" className="blob-nav__links" aria-hidden={!isOpen}>
            {menuLinks.map((link) => (
              <a
                key={`${link.href}-${link.label}`}
                href={link.href}
                aria-label={link.ariaLabel}
                onClick={closeMenu}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </nav>
    </div>
  );
}
