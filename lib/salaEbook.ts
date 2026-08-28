export type SalaEbookCalloutTone = "cyan" | "gold" | "warn" | "danger" | "principle";

export type SalaEbookFigureId = "expectancy" | "setup" | "trade";

export type SalaEbookBlock =
  | {
      kind: "chapter";
      kicker: string;
      title: string;
      lead?: string;
    }
  | {
      kind: "prose";
      kicker?: string;
      heading?: string;
      paragraphs: string[];
    }
  | {
      kind: "callout";
      tone: SalaEbookCalloutTone;
      title: string;
      body: string;
    }
  | {
      kind: "meta";
      items: { label: string; value: string }[];
    }
  | {
      kind: "toc";
      kicker: string;
      title: string;
      items: { num: string; label: string; page: string }[];
    }
  | {
      kind: "formula";
      title: string;
      formula: string;
      note?: string;
    }
  | {
      kind: "stats";
      items: { value: string; label: string }[];
    }
  | {
      kind: "table";
      headers: string[];
      rows: string[][];
    }
  | {
      kind: "figure";
      id: SalaEbookFigureId;
      caption: string;
    }
  | {
      kind: "steps";
      items: { num: string; title: string; text: string }[];
    }
  | {
      kind: "traps";
      heading?: string;
      items: { title: string; text: string }[];
    }
  | {
      kind: "checklist";
      title?: string;
      items: string[];
    }
  | {
      kind: "quote";
      text: string;
      cite?: string;
    }
  | {
      kind: "plan";
      items: { days: string; text: string }[];
    }
  | {
      kind: "split";
      doTitle: string;
      doText: string;
      dontTitle: string;
      dontText: string;
    };
