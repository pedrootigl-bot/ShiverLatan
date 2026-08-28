import type { Locale } from "@/lib/i18n/locale";
import { brandEbook, brandEbookText } from "@/lib/brandEbook";
import { SALA_EBOOKS, type SalaEbook } from "@/lib/sala";

const ES_COPY: Record<string, { title: string; subtitle: string; kicker: string }> = {
  timing: {
    title: "100% por reglas en M5",
    subtitle: "Menos prisa, más lectura.",
    kicker: "E-book 01",
  },
  indicadores: {
    title: "¿Para qué sirven los indicadores de trading?",
    subtitle: "El precio decide. El indicador confirma.",
    kicker: "E-book 02",
  },
  diario: {
    title: "Diario del trader",
    subtitle: "Organización que sostiene el desempeño.",
    kicker: "E-book 03",
  },
  consistencia: {
    title: "¿Cómo ganar de verdad en el mercado financiero?",
    subtitle: "La consistencia vence a las ganancias rápidas.",
    kicker: "E-book 04",
  },
  horarios: {
    title: "Mejores horarios para invertir y operar",
    subtitle: "Sesión correcta, liquidez correcta.",
    kicker: "E-book 05",
  },
  psicologia: {
    title: "Psicología del trader en binarias",
    subtitle: "Domina la mente antes del mercado.",
    kicker: "E-book 06",
  },
  golpes: {
    title: "Cómo evitar estafas y promesas falsas",
    subtitle: "Conocimiento para operar con seguridad.",
    kicker: "E-book 07",
  },
  plano: {
    title: "Plan de operaciones en binarias",
    subtitle: "Antes, durante y después de la operación.",
    kicker: "E-book 08",
  },
  recuperacao: {
    title: "Estrategias de recuperación de loss",
    subtitle: "Técnicas para gestionar pérdidas con disciplina.",
    kicker: "E-book 09",
  },
  banca: {
    title: "Gestión de banca para cuentas pequeñas",
    subtitle: "Disciplina, paciencia y foco en el largo plazo.",
    kicker: "E-book 10",
  },
  timeframes: {
    title: "Estrategias de M1, M5 y M15",
    subtitle: "Elegir el tiempo correcto cambia la lectura.",
    kicker: "E-book 11",
  },
  origem: {
    title: "¿Cómo surgió el mercado financiero?",
    subtitle: "Educativo — para principiantes.",
    kicker: "E-book 12",
  },
  pares: {
    title: "¿Qué son los pares de divisas y sus correlaciones?",
    subtitle: "Entiende la base del trade.",
    kicker: "E-book 13",
  },
  rotina: {
    title: "Cómo operar con poco tiempo al día",
    subtitle: "Estrategias para quien tiene agenda apretada.",
    kicker: "E-book 14",
  },
  mindset: {
    title: "Mindset de consistencia en binarias",
    subtitle: "Disciplina mental aplicada al trading.",
    kicker: "E-book 15",
  },
  suporte: {
    title: "¿Qué son soporte y resistencia?",
    subtitle: "La base para cualquier estrategia.",
    kicker: "E-book 16",
  },
  tendencia: {
    title: "¿Cómo usar líneas de tendencia correctamente?",
    subtitle: "Entiende en la práctica ahora.",
    kicker: "E-book 17",
  },
};

export function getSalaEbooks(locale: Locale): SalaEbook[] {
  const branded = SALA_EBOOKS.map(brandEbook);

  if (locale !== "es") {
    return branded;
  }

  return branded.map((ebook) => {
    const copy = ES_COPY[ebook.id];
    if (!copy) {
      return ebook;
    }

    return {
      ...ebook,
      title: brandEbookText(copy.title),
      subtitle: brandEbookText(copy.subtitle),
      kicker: brandEbookText(copy.kicker),
    };
  });
}
