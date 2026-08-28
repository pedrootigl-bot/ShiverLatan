"use client";

import {
  buildSalaEbookPdf,
  fileNameFromTitle,
  type SalaEbookPdfCopy,
  type SalaEbookPdfProgress,
} from "@/lib/salaEbookPdf";
import type { SalaEbook } from "@/lib/sala";

export type { SalaEbookPdfCopy, SalaEbookPdfProgress };

async function loadCoverDataUrl(src: string): Promise<string | undefined> {
  try {
    const response = await fetch(src);
    if (!response.ok) {
      return undefined;
    }
    const blob = await response.blob();
    return await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(typeof reader.result === "string" ? reader.result : undefined);
      };
      reader.onerror = () => resolve(undefined);
      reader.readAsDataURL(blob);
    });
  } catch {
    return undefined;
  }
}

export async function downloadSalaEbookPdf(
  ebook: SalaEbook,
  onProgress?: (progress: SalaEbookPdfProgress) => void,
  copy?: SalaEbookPdfCopy,
): Promise<void> {
  if (ebook.body.length === 0) {
    throw new Error("empty-ebook");
  }

  onProgress?.({
    overall: 4,
    capture: 0,
    save: 0,
    label: copy?.preparing ?? "Preparando o e-book…",
  });

  const coverDataUrl = ebook.coverSrc ? await loadCoverDataUrl(ebook.coverSrc) : undefined;
  const pdf = await buildSalaEbookPdf(ebook, { coverDataUrl, onProgress, copy });
  pdf.save(fileNameFromTitle(ebook.title));

  onProgress?.({
    overall: 100,
    capture: 100,
    save: 100,
    label: copy?.done ?? "Download concluído",
  });
}
