"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import type { CardNavItem } from "@/components/CardNav";
import { CTA_HREF, CTA_LABEL } from "@/lib/cta";
import { DECK_SLIDE_EVENT } from "@/lib/slides";

const CardNav = dynamic(() => import("@/components/CardNav"), {
  ssr: false,
});

const NAV_SECTIONS = [
  {
    id: "beneficios",
    label: "Benefícios",
    href: "#beneficios",
    ariaLabel: "Ver benefícios",
  },
  {
    id: "como-funciona",
    label: "Como funciona",
    href: "#como-funciona",
    ariaLabel: "Ver como funciona",
  },
  {
    id: "ferramenta",
    label: "Ferramenta",
    href: "#ferramenta",
    ariaLabel: "Conhecer a ferramenta",
  },
  {
    id: "cenario",
    label: "Cenário",
    href: "#cenario",
    ariaLabel: "Ver leitura em cenário real",
  },
  {
    id: "metodo",
    label: "Método",
    href: "#metodo",
    ariaLabel: "Ver o método",
  },
  {
    id: "planos",
    label: "Planos",
    href: "#planos",
    ariaLabel: "Ver planos Grátis e VIP",
  },
  {
    id: "faq",
    label: "FAQ",
    href: "#faq",
    ariaLabel: "Ver perguntas frequentes",
  },
] as const;

const items: CardNavItem[] = [
  {
    label: "Seções",
    bgColor: "#7c9bff",
    textColor: "#ffffff",
    links: NAV_SECTIONS.map((section) => ({
      label: section.label,
      href: section.href,
      ariaLabel: section.ariaLabel,
    })),
  },
];

const sectionIds = NAV_SECTIONS.map((section) => section.id);

type SectionId = (typeof NAV_SECTIONS)[number]["id"];

function navClass(active: SectionId | "", id: SectionId) {
  return active === id
    ? "text-[#38bdf8]"
    : "text-zinc-400 transition hover:text-white";
}

export default function Header() {
  const [active, setActive] = useState<SectionId | "">("");
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1023px)");
    const update = () => setCompact(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const onSlide = (event: Event) => {
      const id = (event as CustomEvent<{ id: string }>).detail?.id;
      if (id && sectionIds.includes(id as SectionId)) {
        setActive(id as SectionId);
        return;
      }
      setActive("");
    };

    window.addEventListener(DECK_SLIDE_EVENT, onSlide);
    return () => window.removeEventListener(DECK_SLIDE_EVENT, onSlide);
  }, []);

  return (
    <header className="anim-header pointer-events-none fixed top-0 right-0 left-0 z-50">
      <div className="pointer-events-auto lg:hidden">
        {compact ? (
          <CardNav
            logo={
              <a href="#inicio">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#38bdf8] to-[#2563eb] text-sm font-bold text-white shadow-[0_0_18px_rgba(56,189,248,0.45)]">
                  S
                </span>
                <span className="font-headline text-sm font-bold tracking-[0.1em] text-white">
                  SHIVER
                </span>
              </a>
            }
            items={items}
            baseColor="#0b0f19"
            menuColor="#ffffff"
            buttonBgColor="#38bdf8"
            buttonTextColor="#ffffff"
            ease="power3.out"
          />
        ) : null}
      </div>

      <div className="pointer-events-auto hidden w-full lg:block">
        <div className="bg-gradient-to-b from-[#05070d]/75 to-transparent">
          <div className="grid h-[76px] w-full grid-cols-[1fr_auto_1fr] items-center gap-4 px-6">
            <a href="#inicio" className="flex min-w-0 items-center gap-3 justify-self-start" aria-label="Shiver — início">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#38bdf8] to-[#2563eb] font-bold text-white shadow-[0_0_25px_rgba(56,189,248,0.45)]">
                S
              </div>
              <span className="font-headline text-lg font-bold tracking-[0.08em] text-white">
                SHIVER
              </span>
            </a>

            <nav className="flex min-w-0 items-center gap-3 text-[12px] xl:gap-5 xl:text-sm" aria-label="Seções">
              {NAV_SECTIONS.map((section) => (
                <a
                  key={section.id}
                  href={section.href}
                  className={`${navClass(active, section.id)} whitespace-nowrap`}
                  aria-current={active === section.id ? "true" : undefined}
                >
                  {section.label}
                </a>
              ))}
            </nav>

            <a
              href={CTA_HREF}
              className="btn-shine btn-dopamine inline-flex shrink-0 items-center justify-center justify-self-end rounded-full bg-gradient-to-r from-[#38bdf8] to-[#2563eb] px-4 py-2 text-center text-xs font-semibold whitespace-nowrap text-white xl:px-5 xl:py-2.5 xl:text-sm"
            >
              {CTA_LABEL}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
