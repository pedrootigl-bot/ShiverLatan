import { jsPDF } from "jspdf";
import type { SalaEbook } from "@/lib/sala";
import type { SalaEbookBlock, SalaEbookCalloutTone, SalaEbookFigureId } from "@/lib/salaEbook";

const WHITE: RGB = [255, 255, 255];
const CYAN: RGB = [56, 189, 248];
const GOLD: RGB = [251, 191, 36];
const WARN: RGB = [254, 202, 202];
const MUTED: RGB = [226, 232, 240];
const LINE: RGB = [56, 70, 90];
const PAGE: RGB = [11, 15, 22];

type RGB = [number, number, number];
type FontStyle = "normal" | "bold" | "italic" | "bolditalic";

function pdfSafe(text: string): string {
  return text
    .replace(/[“”«»]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/×/g, "x")
    .replace(/[−–—]/g, "-")
    .replace(/→/g, "->")
    .replace(/·/g, " - ")
    .replace(/…/g, "...")
    .replace(/€/g, "EUR");
}

export type SalaEbookPdfProgress = {
  overall: number;
  capture: number;
  save: number;
  label: string;
};

export type SalaEbookPdfCopy = {
  preparing: string;
  page: (index: number, total: number) => string;
  generating: string;
  done: string;
};

function assertNever(value: never): never {
  throw new Error(`Bloco de e-book não tratado no PDF: ${String(value)}`);
}

function calloutAccent(tone: SalaEbookCalloutTone): RGB {
  switch (tone) {
    case "gold":
      return GOLD;
    case "warn":
    case "danger":
      return WARN;
    case "cyan":
    case "principle":
      return CYAN;
    default:
      return assertNever(tone);
  }
}

function figureNote(id: SalaEbookFigureId): string {
  switch (id) {
    case "expectancy":
      return "Expectativa por entrada sobe com a taxa de acerto. Equilíbrio perto de 53,5%. Meta de 58%.";
    case "setup":
      return "1 tendência → 2 testa suporte → 3 confirma → entrada.";
    case "trade":
      return "Exemplo: suporte 1,1042, confirmação e entrada em call.";
    default:
      return assertNever(id);
  }
}

class PdfBook {
  readonly pdf: jsPDF;
  readonly pageW: number;
  readonly pageH: number;
  readonly margin = 16;
  readonly footer = 12;
  readonly contentW: number;
  y: number;
  page = 1;
  private readonly brand: string;

  constructor(brand: string) {
    this.pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4", compress: true });
    this.pageW = this.pdf.internal.pageSize.getWidth();
    this.pageH = this.pdf.internal.pageSize.getHeight();
    this.contentW = this.pageW - this.margin * 2;
    this.brand = brand;
    this.y = this.margin;
    this.paint();
  }

  private paint(): void {
    this.pdf.setFillColor(...PAGE);
    this.pdf.rect(0, 0, this.pageW, this.pageH, "F");
    this.pdf.setFont("helvetica", "normal");
    this.pdf.setFontSize(8);
    this.pdf.setTextColor(...MUTED);
    this.pdf.text(this.brand, this.margin, this.pageH - 7);
    this.pdf.text(String(this.page), this.pageW - this.margin, this.pageH - 7, { align: "right" });
  }

  newPage(): void {
    this.pdf.addPage();
    this.page += 1;
    this.paint();
    this.y = this.margin;
  }

  ensure(height: number): void {
    if (this.y + height > this.pageH - this.footer) {
      this.newPage();
    }
  }

  gap(mm: number): void {
    this.y += mm;
    if (this.y > this.pageH - this.footer) {
      this.newPage();
    }
  }

  wrap(text: string, size: number, style: FontStyle, width = this.contentW): string[] {
    this.pdf.setFont("helvetica", style);
    this.pdf.setFontSize(size);
    const lines = this.pdf.splitTextToSize(pdfSafe(text), width) as string[];
    return lines.length === 0 ? [""] : lines;
  }

  lineHeight(size: number): number {
    return size * 0.42;
  }

  write(
    lines: string[],
    size: number,
    color: RGB,
    style: FontStyle = "normal",
    x = this.margin,
  ): void {
    const lh = this.lineHeight(size);
    this.pdf.setFont("helvetica", style);
    this.pdf.setFontSize(size);
    this.pdf.setTextColor(...color);
    for (const line of lines) {
      this.ensure(lh);
      this.pdf.text(line, x, this.y + lh * 0.78);
      this.y += lh;
    }
  }

  kicker(text: string, color: RGB = CYAN): void {
    this.write(this.wrap(text, 8, "bold"), 8, color, "bold");
    this.gap(1.1);
  }

  heading(text: string, size = 14): void {
    this.write(this.wrap(text, size, "bold"), size, WHITE, "bold");
    this.gap(2);
  }

  body(text: string, size = 11): void {
    this.write(this.wrap(text, size, "normal"), size, WHITE, "normal");
    this.gap(2.2);
  }

  rule(): void {
    this.ensure(4);
    this.pdf.setDrawColor(...LINE);
    this.pdf.setLineWidth(0.25);
    this.pdf.line(this.margin, this.y, this.margin + this.contentW, this.y);
    this.gap(3);
  }
}

function renderBlock(book: PdfBook, block: SalaEbookBlock): void {
  switch (block.kind) {
    case "chapter":
      book.gap(2);
      book.kicker(block.kicker);
      book.heading(block.title, 16);
      if (block.lead) {
        book.body(block.lead);
      }
      book.rule();
      return;
    case "prose":
      if (block.kicker) {
        book.kicker(block.kicker);
      }
      if (block.heading) {
        book.heading(block.heading, 13);
      }
      for (const paragraph of block.paragraphs) {
        book.body(paragraph);
      }
      return;
    case "callout":
      book.kicker(block.title, calloutAccent(block.tone));
      book.body(block.body);
      return;
    case "meta": {
      const col = book.contentW / Math.max(1, block.items.length);
      book.ensure(16);
      block.items.forEach((item, index) => {
        const x = book.margin + col * index;
        const y = book.y;
        book.pdf.setFont("helvetica", "bold");
        book.pdf.setFontSize(8);
        book.pdf.setTextColor(...CYAN);
        book.pdf.text(item.label.toUpperCase(), x, y + 4);
        book.pdf.setFont("helvetica", "bold");
        book.pdf.setFontSize(11);
        book.pdf.setTextColor(...WHITE);
        book.pdf.text(item.value, x, y + 10);
      });
      book.y += 14;
      book.gap(3);
      return;
    }
    case "toc":
      book.kicker(block.kicker);
      book.heading(block.title, 13);
      for (const item of block.items) {
        const label = `${item.num}  ${item.label}`;
        const lines = book.wrap(label, 10, "normal", book.contentW - 14);
        book.write(lines, 10, WHITE);
        const rowY = book.y - book.lineHeight(10) * 0.22;
        book.pdf.setFont("helvetica", "bold");
        book.pdf.setFontSize(10);
        book.pdf.setTextColor(...MUTED);
        book.pdf.text(item.page, book.margin + book.contentW, rowY, { align: "right" });
        book.gap(1.4);
      }
      return;
    case "formula":
      book.kicker(block.title);
      book.write(book.wrap(block.formula, 12, "bold"), 12, WHITE, "bold");
      book.gap(1.6);
      if (block.note) {
        book.body(block.note, 10);
      }
      return;
    case "stats": {
      const col = book.contentW / Math.max(1, block.items.length);
      book.ensure(20);
      block.items.forEach((item, index) => {
        const x = book.margin + col * index;
        book.pdf.setFont("helvetica", "bold");
        book.pdf.setFontSize(14);
        book.pdf.setTextColor(...CYAN);
        book.pdf.text(item.value, x, book.y + 6);
        const labelLines = book.wrap(item.label, 8, "normal", col - 3);
        book.pdf.setFont("helvetica", "normal");
        book.pdf.setFontSize(8);
        book.pdf.setTextColor(...WHITE);
        book.pdf.text(labelLines, x, book.y + 12);
      });
      book.y += 22;
      book.gap(3);
      return;
    }
    case "table": {
      const cols = Math.max(1, block.headers.length);
      const colW = book.contentW / cols;
      const cell = (text: string, bold: boolean) => book.wrap(text, 9, bold ? "bold" : "normal", colW - 3);
      const headerLines = block.headers.map((header) => cell(header, true));
      const headerH = Math.max(...headerLines.map((lines) => lines.length), 1) * book.lineHeight(9) + 3;
      book.ensure(headerH + 2);
      headerLines.forEach((lines, index) => {
        book.pdf.setFont("helvetica", "bold");
        book.pdf.setFontSize(9);
        book.pdf.setTextColor(...CYAN);
        book.pdf.text(lines, book.margin + colW * index, book.y + 4);
      });
      book.y += headerH;
      for (const row of block.rows) {
        const rowLines = row.map((value) => cell(value, false));
        const rowH = Math.max(...rowLines.map((lines) => lines.length), 1) * book.lineHeight(9) + 2.5;
        book.ensure(rowH);
        rowLines.forEach((lines, index) => {
          book.pdf.setFont("helvetica", "normal");
          book.pdf.setFontSize(9);
          book.pdf.setTextColor(...WHITE);
          book.pdf.text(lines, book.margin + colW * index, book.y + 4);
        });
        book.y += rowH;
      }
      book.gap(3);
      return;
    }
    case "figure":
      book.kicker("Figura");
      book.body(figureNote(block.id), 10);
      book.body(block.caption, 10);
      return;
    case "steps":
      for (const item of block.items) {
        book.write(book.wrap(`${item.num}  ${item.title}`, 11, "bold"), 11, CYAN, "bold");
        book.gap(0.8);
        book.body(item.text);
      }
      return;
    case "traps":
      if (block.heading) {
        book.heading(block.heading, 13);
      }
      for (const item of block.items) {
        book.write(book.wrap(item.title, 11, "bold"), 11, GOLD, "bold");
        book.gap(0.8);
        book.body(item.text);
      }
      return;
    case "checklist":
      if (block.title) {
        book.heading(block.title, 13);
      }
      for (const item of block.items) {
        book.write(book.wrap(`-  ${item}`, 11, "normal"), 11, WHITE);
        book.gap(1.6);
      }
      return;
    case "quote":
      book.write(book.wrap(`"${block.text}"`, 12, "italic"), 12, WHITE, "italic");
      book.gap(1.4);
      if (block.cite) {
        book.write(book.wrap(block.cite, 9, "normal"), 9, MUTED);
        book.gap(2.4);
      }
      return;
    case "plan":
      for (const item of block.items) {
        book.write(book.wrap(item.days, 11, "bold"), 11, CYAN, "bold");
        book.gap(0.6);
        book.body(item.text);
      }
      return;
    case "split":
      book.write(book.wrap(block.doTitle, 11, "bold"), 11, CYAN, "bold");
      book.gap(0.8);
      book.body(block.doText);
      book.write(book.wrap(block.dontTitle, 11, "bold"), 11, GOLD, "bold");
      book.gap(0.8);
      book.body(block.dontText);
      return;
    default:
      return assertNever(block);
  }
}

function yieldFrame(): Promise<void> {
  return new Promise((resolve) => {
    if (typeof requestAnimationFrame === "function") {
      requestAnimationFrame(() => resolve());
      return;
    }
    resolve();
  });
}

export async function buildSalaEbookPdf(
  ebook: SalaEbook,
  options?: {
    coverDataUrl?: string;
    onProgress?: (progress: SalaEbookPdfProgress) => void;
    copy?: SalaEbookPdfCopy;
  },
): Promise<jsPDF> {
  const labels: SalaEbookPdfCopy = options?.copy ?? {
    preparing: "Preparando o e-book…",
    page: (index, total) => `Montando páginas · ${index} de ${total}`,
    generating: "Gerando o arquivo PDF…",
    done: "Download concluído",
  };
  const report = options?.onProgress;
  report?.({ overall: 8, capture: 6, save: 0, label: labels.preparing });
  await yieldFrame();

  const book = new PdfBook(`Shiver  ·  ${ebook.kicker}`);

  if (options?.coverDataUrl) {
    try {
      const width = book.contentW;
      const height = width * 0.56;
      book.ensure(height + 4);
      book.pdf.addImage(
        options.coverDataUrl,
        options.coverDataUrl.includes("image/jpeg") ? "JPEG" : "PNG",
        book.margin,
        book.y,
        width,
        height,
      );
      book.y += height + 6;
    } catch {
      // Capa opcional: o texto segue mesmo se a imagem falhar.
    }
  }

  book.kicker(ebook.kicker);
  book.heading(ebook.title, 22);
  book.body(ebook.subtitle, 12);
  book.rule();

  const total = ebook.body.length;
  for (let index = 0; index < total; index += 1) {
    const block = ebook.body[index];
    if (!block) {
      continue;
    }
    renderBlock(book, block);
    if (index === 0 || index === total - 1 || index % 5 === 0) {
      const done = (index + 1) / total;
      report?.({
        overall: 12 + done * 78,
        capture: done * 100,
        save: done * 35,
        label: labels.page(index + 1, total),
      });
      await yieldFrame();
    }
  }

  report?.({ overall: 94, capture: 100, save: 70, label: labels.generating });
  await yieldFrame();
  return book.pdf;
}

export function fileNameFromTitle(title: string): string {
  const slug = title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

  return `shiver-${slug || "ebook"}.pdf`;
}
