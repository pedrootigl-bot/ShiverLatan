import type { SalaEbook, SalaEbookTone } from "@/lib/sala";

function assertNever(value: never): never {
  throw new Error(`Capa de e-book não tratada: ${String(value)}`);
}

function toneClass(tone: SalaEbookTone): string {
  switch (tone) {
    case "cyan":
      return "sala-ebook-cover--cyan";
    case "green":
      return "sala-ebook-cover--green";
    case "amber":
      return "sala-ebook-cover--amber";
    case "violet":
      return "sala-ebook-cover--violet";
    default:
      return assertNever(tone);
  }
}

export default function SalaEbookCover({
  ebook,
  size = "card",
}: {
  ebook: SalaEbook;
  size?: "card" | "hero";
}) {
  const className = `sala-ebook-cover ${toneClass(ebook.coverTone)} sala-ebook-cover--${size}${ebook.coverSrc ? " sala-ebook-cover--photo" : ""}`;

  if (ebook.coverSrc) {
    return (
      <span className={className}>
        <img src={ebook.coverSrc} alt="" />
      </span>
    );
  }

  return (
    <span className={className} aria-hidden>
      <em>{ebook.coverLabel}</em>
      <strong>{ebook.title}</strong>
    </span>
  );
}
