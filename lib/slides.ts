import { HASH_ALIASES } from "@/lib/config";

export const SLIDES = [
  { id: "inicio", label: "Início" },
  { id: "beneficios", label: "Benefícios" },
  { id: "como-funciona", label: "Como funciona" },
  { id: "ferramenta", label: "Ferramenta" },
  { id: "cenario", label: "Cenário" },
  { id: "metodo", label: "Método" },
  { id: "faq", label: "FAQ" },
] as const;

export type SlideId = (typeof SLIDES)[number]["id"];

export const SLIDE_COUNT = SLIDES.length;

export const DECK_SLIDE_EVENT = "shiver:deck-slide";
export const DECK_GO_EVENT = "shiver:deck-go";

export function slideIndexFromHash(hash = ""): number {
  const id = hash.replace(/^#/, "");
  const mapped = HASH_ALIASES[id] ?? id;
  const index = SLIDES.findIndex((slide) => slide.id === mapped);
  return index >= 0 ? index : 0;
}
