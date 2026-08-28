import type { SalaEbook } from "@/lib/sala";
import type { SalaEbookBlock } from "@/lib/salaEbook";

function assertNever(value: never): never {
  throw new Error(`Bloco de e-book sem marca Shiver: ${String(value)}`);
}

export function brandEbookText(text: string): string {
  return text
    .replace(/bullex\s*\|\s*f[áa]brica de traders/gi, "Shiver")
    .replace(/f[áa]brica de traders\s*\|\s*bullex/gi, "Shiver")
    .replace(/bullex/gi, "Shiver")
    .replace(/f[áa]brica de traders/gi, "Shiver")
    .replace(/Shiver(\s*\|\s*Shiver)+/g, "Shiver");
}

function brandBlock(block: SalaEbookBlock): SalaEbookBlock {
  switch (block.kind) {
    case "chapter":
      return {
        ...block,
        kicker: brandEbookText(block.kicker),
        title: brandEbookText(block.title),
        lead: block.lead ? brandEbookText(block.lead) : undefined,
      };
    case "prose":
      return {
        ...block,
        kicker: block.kicker ? brandEbookText(block.kicker) : undefined,
        heading: block.heading ? brandEbookText(block.heading) : undefined,
        paragraphs: block.paragraphs.map(brandEbookText),
      };
    case "callout":
      return {
        ...block,
        title: brandEbookText(block.title),
        body: brandEbookText(block.body),
      };
    case "meta":
      return {
        ...block,
        items: block.items.map((item) => ({
          label: brandEbookText(item.label),
          value: brandEbookText(item.value),
        })),
      };
    case "toc":
      return {
        ...block,
        kicker: brandEbookText(block.kicker),
        title: brandEbookText(block.title),
        items: block.items.map((item) => ({
          ...item,
          label: brandEbookText(item.label),
        })),
      };
    case "formula":
      return {
        ...block,
        title: brandEbookText(block.title),
        formula: brandEbookText(block.formula),
        note: block.note ? brandEbookText(block.note) : undefined,
      };
    case "stats":
      return {
        ...block,
        items: block.items.map((item) => ({
          value: brandEbookText(item.value),
          label: brandEbookText(item.label),
        })),
      };
    case "table":
      return {
        ...block,
        headers: block.headers.map(brandEbookText),
        rows: block.rows.map((row) => row.map(brandEbookText)),
      };
    case "figure":
      return {
        ...block,
        caption: brandEbookText(block.caption),
      };
    case "steps":
      return {
        ...block,
        items: block.items.map((item) => ({
          ...item,
          title: brandEbookText(item.title),
          text: brandEbookText(item.text),
        })),
      };
    case "traps":
      return {
        ...block,
        heading: block.heading ? brandEbookText(block.heading) : undefined,
        items: block.items.map((item) => ({
          title: brandEbookText(item.title),
          text: brandEbookText(item.text),
        })),
      };
    case "checklist":
      return {
        ...block,
        title: block.title ? brandEbookText(block.title) : undefined,
        items: block.items.map(brandEbookText),
      };
    case "quote":
      return {
        ...block,
        text: brandEbookText(block.text),
        cite: block.cite ? brandEbookText(block.cite) : undefined,
      };
    case "plan":
      return {
        ...block,
        items: block.items.map((item) => ({
          days: brandEbookText(item.days),
          text: brandEbookText(item.text),
        })),
      };
    case "split":
      return {
        ...block,
        doTitle: brandEbookText(block.doTitle),
        doText: brandEbookText(block.doText),
        dontTitle: brandEbookText(block.dontTitle),
        dontText: brandEbookText(block.dontText),
      };
    default:
      return assertNever(block);
  }
}

export function brandEbook(ebook: SalaEbook): SalaEbook {
  return {
    ...ebook,
    title: brandEbookText(ebook.title),
    subtitle: brandEbookText(ebook.subtitle),
    kicker: brandEbookText(ebook.kicker),
    coverLabel: brandEbookText(ebook.coverLabel),
    body: ebook.body.map(brandBlock),
  };
}
