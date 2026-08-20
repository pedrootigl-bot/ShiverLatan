"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import type { CardNavItem } from "@/components/CardNav";
import { CTA_HREF, CTA_LABEL } from "@/lib/cta";
import { DECK_SLIDE_EVENT } from "@/lib/slides";

const CardNav = dynamic(() => import("@/components/CardNav"), {
  ssr: false,
});

const items: CardNavItem[] = [
  {
    label: "Produto",
    href: "#beneficios",
    bgColor: "#7c9bff",
    textColor: "#ffffff",
    links: [
      { label: "Benefícios", href: "#beneficios", ariaLabel: "Ver benefícios" },
      { label: "Como funciona", href: "#como-funciona", ariaLabel: "Ver como funciona" },
    ],
  },
  {
    label: "Ferramenta",
    href: "#ferramenta",
    bgColor: "#12172a",
    textColor: "#dbe1ff",
    links: [
      { label: "Painel", href: "#ferramenta", ariaLabel: "Conhecer a ferramenta" },
      { label: "Cenário", href: "#cenario", ariaLabel: "Ver leitura em cenário real" },
      { label: "Método", href: "#metodo", ariaLabel: "Ver o método" },
    ],
  },
  {
    label: "Começar",
    href: "#comecar",
    bgColor: "#38bdf8",
    textColor: "#ffffff",
    links: [
      { label: "FAQ", href: "#faq", ariaLabel: "Ver perguntas frequentes" },
      { label: "Conheça a ferramenta", href: "#ferramenta", ariaLabel: "Conhecer a ferramenta" },
    ],
  },
];

const sectionIds = [
  "beneficios",
  "como-funciona",
  "ferramenta",
  "cenario",
  "metodo",
  "faq",
] as const;

type SectionId = (typeof sectionIds)[number];

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
            ctaLabel={CTA_LABEL}
            ctaHref={CTA_HREF}
            ease="power3.out"
          />
        ) : null}
      </div>

      <div className="pointer-events-auto hidden w-full lg:block">
        <div className="bg-gradient-to-b from-[#05070d]/75 to-transparent">
          <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-4 px-6">
            <a href="#inicio" className="flex min-w-0 items-center gap-3" aria-label="Shiver — início">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#38bdf8] to-[#2563eb] font-bold text-white shadow-[0_0_25px_rgba(56,189,248,0.45)]">
                S
              </div>
              <span className="font-headline text-lg font-bold tracking-[0.08em] text-white">
                SHIVER
              </span>
            </a>

            <nav className="flex min-w-0 items-center gap-4 text-[13px] xl:gap-6 xl:text-sm" aria-label="Seções">
              <a
                href="#beneficios"
                className={`${navClass(active, "beneficios")} whitespace-nowrap`}
                aria-current={active === "beneficios" ? "true" : undefined}
              >
                Benefícios
              </a>
              <a
                href="#como-funciona"
                className={`${navClass(active, "como-funciona")} whitespace-nowrap`}
                aria-current={active === "como-funciona" ? "true" : undefined}
              >
                Como funciona
              </a>
              <a
                href="#ferramenta"
                className={`${navClass(active, "ferramenta")} whitespace-nowrap`}
                aria-current={active === "ferramenta" ? "true" : undefined}
              >
                Ferramenta
              </a>
              <a
                href="#cenario"
                className={`${navClass(active, "cenario")} whitespace-nowrap`}
                aria-current={active === "cenario" ? "true" : undefined}
              >
                Cenário
              </a>
              <a
                href="#metodo"
                className={`${navClass(active, "metodo")} whitespace-nowrap`}
                aria-current={active === "metodo" ? "true" : undefined}
              >
                Método
              </a>
              <a
                href="#faq"
                className={`${navClass(active, "faq")} whitespace-nowrap`}
                aria-current={active === "faq" ? "true" : undefined}
              >
                FAQ
              </a>
            </nav>

            <div className="flex shrink-0 items-center gap-3">
              <a
                href={CTA_HREF}
                className="btn-shine btn-dopamine rounded-full bg-gradient-to-r from-[#38bdf8] to-[#2563eb] px-4 py-2 text-xs font-semibold whitespace-nowrap text-white xl:px-5 xl:py-2.5 xl:text-sm"
              >
                {CTA_LABEL}
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
