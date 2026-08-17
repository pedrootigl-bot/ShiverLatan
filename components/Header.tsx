"use client";

import CardNav, { type CardNavItem } from "@/components/CardNav";

const items: CardNavItem[] = [
  {
    label: "Produto",
    href: "#beneficios",
    bgColor: "#536dfe",
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
      { label: "Dashboard", href: "#ferramenta", ariaLabel: "Ver a ferramenta" },
      { label: "Método", href: "#metodo", ariaLabel: "Ver o método" },
    ],
  },
  {
    label: "Começar",
    href: "#comecar",
    bgColor: "#8b5cf6",
    textColor: "#ffffff",
    links: [
      { label: "FAQ", href: "#faq", ariaLabel: "Ver perguntas frequentes" },
      { label: "Conhecer agora", href: "#comecar", ariaLabel: "Começar a usar a ferramenta" },
    ],
  },
];

const navLinkClass = "text-zinc-400 transition hover:text-white";

export default function Header() {
  return (
    <header className="anim-header pointer-events-none fixed top-0 right-0 left-0 z-50">
      <div className="pointer-events-auto md:hidden">
        <CardNav
          logo={
            <a href="#inicio">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#536dfe] to-[#8b5cf6] text-sm font-bold text-white shadow-[0_0_18px_rgba(83,109,254,0.28)]">
                S
              </span>
              <span className="text-sm font-bold tracking-[0.14em] text-white">
                SHIVER
              </span>
            </a>
          }
          items={items}
          baseColor="#0b0f19"
          menuColor="#ffffff"
          buttonBgColor="#536dfe"
          buttonTextColor="#ffffff"
          ctaLabel="Conhecer ferramenta"
          ctaHref="#comecar"
          ease="power3.out"
        />
      </div>

      <div className="pointer-events-auto hidden w-full md:block">
        <div className="border-b border-white/[0.06] bg-[#05070d]/90 backdrop-blur-md">
          <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-6">
            <a href="#inicio" className="flex items-center gap-3" aria-label="Shiver — início">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#536dfe] to-[#8b5cf6] font-bold text-white shadow-[0_0_25px_rgba(83,109,254,0.25)]">
                S
              </div>
              <span className="text-lg font-bold tracking-[0.12em] text-white">
                SHIVER
              </span>
            </a>

            <nav className="flex items-center gap-8 text-sm">
              <a href="#beneficios" className={navLinkClass}>
                Benefícios
              </a>
              <a href="#como-funciona" className={navLinkClass}>
                Como funciona
              </a>
              <a href="#ferramenta" className={navLinkClass}>
                Ferramenta
              </a>
              <a href="#metodo" className={navLinkClass}>
                Método
              </a>
              <a href="#faq" className={navLinkClass}>
                FAQ
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <a
                href="#comecar"
                className="btn-shine btn-dopamine rounded-full bg-gradient-to-r from-[#536dfe] to-[#765cf6] px-5 py-2.5 text-sm font-semibold text-white"
              >
                Conhecer ferramenta
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
