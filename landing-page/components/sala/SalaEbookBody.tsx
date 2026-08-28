import type { SalaEbookBlock, SalaEbookCalloutTone, SalaEbookFigureId } from "@/lib/salaEbook";

function assertNever(value: never): never {
  throw new Error(`Bloco de e-book não tratado: ${String(value)}`);
}

function calloutClass(tone: SalaEbookCalloutTone): string {
  switch (tone) {
    case "cyan":
      return "sala-ebook-callout sala-ebook-callout--cyan";
    case "gold":
      return "sala-ebook-callout sala-ebook-callout--gold";
    case "warn":
      return "sala-ebook-callout sala-ebook-callout--warn";
    case "danger":
      return "sala-ebook-callout sala-ebook-callout--danger";
    case "principle":
      return "sala-ebook-callout sala-ebook-callout--principle";
    default:
      return assertNever(tone);
  }
}

function ExpectancyFigure() {
  return (
    <svg viewBox="0 0 360 168" role="img" aria-label="Expectativa por entrada versus taxa de acerto">
      <line x1="36" y1="18" x2="36" y2="132" stroke="rgba(148,163,184,0.35)" strokeWidth="1" />
      <line x1="36" y1="88" x2="340" y2="88" stroke="rgba(148,163,184,0.45)" strokeWidth="1" strokeDasharray="4 4" />
      <polyline
        fill="none"
        stroke="#38bdf8"
        strokeWidth="2.4"
        strokeLinejoin="round"
        points="36,124 165,88 234,59 340,14"
      />
      <circle cx="165" cy="88" r="4.5" fill="#fbbf24" />
      <circle cx="234" cy="59" r="4.5" fill="#38bdf8" />
      <text x="42" y="16" fill="#94a3b8" fontSize="9">
        +
      </text>
      <text x="42" y="132" fill="#94a3b8" fontSize="9">
        −
      </text>
      <text x="148" y="150" fill="#fbbf24" fontSize="9">
        53,5%
      </text>
      <text x="214" y="150" fill="#38bdf8" fontSize="9">
        58% meta
      </text>
      <text x="36" y="164" fill="#64748b" fontSize="9">
        45%
      </text>
      <text x="318" y="164" fill="#64748b" fontSize="9">
        65%
      </text>
      <text x="248" y="82" fill="#94a3b8" fontSize="8">
        equilíbrio (0)
      </text>
    </svg>
  );
}

function SetupFigure() {
  return (
    <svg viewBox="0 0 360 168" role="img" aria-label="Tendência, teste de suporte e confirmação">
      <line x1="24" y1="128" x2="336" y2="128" stroke="rgba(56,189,248,0.45)" strokeWidth="2" />
      <text x="24" y="120" fill="#7dd3fc" fontSize="9">
        SUPORTE
      </text>
      <rect x="40" y="46" width="18" height="52" fill="#38bdf8" />
      <rect x="78" y="38" width="18" height="48" fill="#38bdf8" />
      <rect x="116" y="58" width="18" height="46" fill="#64748b" />
      <rect x="154" y="78" width="18" height="50" fill="#64748b" />
      <line x1="163" y1="128" x2="163" y2="148" stroke="#94a3b8" strokeWidth="2" />
      <rect x="192" y="42" width="22" height="70" fill="#38bdf8" />
      <rect x="236" y="28" width="18" height="56" fill="#38bdf8" />
      <text x="40" y="28" fill="#94a3b8" fontSize="9">
        1 · TENDÊNCIA
      </text>
      <text x="116" y="164" fill="#94a3b8" fontSize="9">
        2 · TESTA SUPORTE
      </text>
      <text x="192" y="22" fill="#7dd3fc" fontSize="9">
        3 · CONFIRMA
      </text>
      <text x="268" y="48" fill="#38bdf8" fontSize="10" fontWeight="700">
        ENTRADA
      </text>
    </svg>
  );
}

function TradeFigure() {
  return (
    <svg viewBox="0 0 360 168" role="img" aria-label="Setup real com suporte 1,1042 e entrada call">
      <line x1="24" y1="122" x2="336" y2="122" stroke="rgba(56,189,248,0.45)" strokeWidth="2" />
      <text x="24" y="114" fill="#7dd3fc" fontSize="9">
        SUPORTE 1,1042
      </text>
      <text x="24" y="22" fill="#94a3b8" fontSize="9">
        TENDÊNCIA
      </text>
      <rect x="44" y="36" width="16" height="44" fill="#38bdf8" />
      <rect x="80" y="28" width="16" height="40" fill="#38bdf8" />
      <rect x="116" y="48" width="16" height="42" fill="#64748b" />
      <rect x="152" y="70" width="16" height="52" fill="#64748b" />
      <line x1="160" y1="122" x2="160" y2="146" stroke="#94a3b8" strokeWidth="2" />
      <rect x="188" y="34" width="22" height="72" fill="#38bdf8" />
      <rect x="230" y="24" width="16" height="48" fill="#38bdf8" />
      <text x="116" y="164" fill="#94a3b8" fontSize="9">
        TESTA SUPORTE
      </text>
      <text x="188" y="22" fill="#7dd3fc" fontSize="9">
        CONFIRMA + ENTRA
      </text>
      <text x="258" y="42" fill="#38bdf8" fontSize="10" fontWeight="700">
        ENTRADA · CALL
      </text>
    </svg>
  );
}

function FigureView({ id }: { id: SalaEbookFigureId }) {
  switch (id) {
    case "expectancy":
      return <ExpectancyFigure />;
    case "setup":
      return <SetupFigure />;
    case "trade":
      return <TradeFigure />;
    default:
      return assertNever(id);
  }
}

function SalaEbookBlockView({ block }: { block: SalaEbookBlock }) {
  switch (block.kind) {
    case "chapter":
      return (
        <header className="sala-ebook-block sala-ebook-block--chapter">
          <p className="sala-ebook-block__kicker">{block.kicker}</p>
          <h3>{block.title}</h3>
          {block.lead ? <p className="sala-ebook-block__lead">{block.lead}</p> : null}
        </header>
      );
    case "prose":
      return (
        <section className="sala-ebook-block">
          {block.kicker ? <p className="sala-ebook-block__kicker">{block.kicker}</p> : null}
          {block.heading ? <h3>{block.heading}</h3> : null}
          {block.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>
      );
    case "callout":
      return (
        <aside className={calloutClass(block.tone)}>
          <p className="sala-ebook-block__kicker">{block.title}</p>
          <p>{block.body}</p>
        </aside>
      );
    case "meta":
      return (
        <dl className="sala-ebook-meta">
          {block.items.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      );
    case "toc":
      return (
        <nav className="sala-ebook-block sala-ebook-toc" aria-label="Sumário">
          <p className="sala-ebook-block__kicker">{block.kicker}</p>
          <h3>{block.title}</h3>
          <ol>
            {block.items.map((item) => (
              <li key={item.num}>
                <span>
                  {item.num} — {item.label}
                </span>
                <b>{item.page}</b>
              </li>
            ))}
          </ol>
        </nav>
      );
    case "formula":
      return (
        <aside className="sala-ebook-callout sala-ebook-callout--cyan">
          <p className="sala-ebook-block__kicker">{block.title}</p>
          <p className="sala-ebook-formula">{block.formula}</p>
          {block.note ? <p>{block.note}</p> : null}
        </aside>
      );
    case "stats":
      return (
        <div className="sala-ebook-stats">
          {block.items.map((item) => (
            <div key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      );
    case "table":
      return (
        <div className="sala-ebook-table-wrap">
          <table className="sala-ebook-table">
            <thead>
              <tr>
                {block.headers.map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr key={row.join("|")}>
                  {row.map((cell, cellIndex) => (
                    <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "figure":
      return (
        <figure className="sala-ebook-figure">
          <FigureView id={block.id} />
          <figcaption>{block.caption}</figcaption>
        </figure>
      );
    case "steps":
      return (
        <ol className="sala-ebook-steps">
          {block.items.map((item) => (
            <li key={item.num}>
              <b>{item.num}</b>
              <div>
                <strong>{item.title}</strong>
                <p>{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      );
    case "traps":
      return (
        <section className="sala-ebook-block">
          {block.heading ? <p>{block.heading}</p> : null}
          <ul className="sala-ebook-traps">
            {block.items.map((item) => (
              <li key={item.title}>
                <strong>{item.title}</strong>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        </section>
      );
    case "checklist":
      return (
        <section className="sala-ebook-block">
          {block.title ? <h3>{block.title}</h3> : null}
          <ul className="sala-ebook-check">
            {block.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      );
    case "quote":
      return (
        <blockquote className="sala-ebook-quote">
          <p>{block.text}</p>
          {block.cite ? <cite>{block.cite}</cite> : null}
        </blockquote>
      );
    case "plan":
      return (
        <div className="sala-ebook-plan">
          {block.items.map((item, itemIndex) => (
            <div key={`${item.days}-${itemIndex}`}>
              <strong>{item.days}</strong>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      );
    case "split":
      return (
        <div className="sala-ebook-split">
          <section>
            <h3>{block.doTitle}</h3>
            <p>{block.doText}</p>
          </section>
          <section>
            <h3>{block.dontTitle}</h3>
            <p>{block.dontText}</p>
          </section>
        </div>
      );
    default:
      return assertNever(block);
  }
}

export default function SalaEbookBody({ blocks }: { blocks: SalaEbookBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => (
        <div className="sala-ebook-keep" key={`${block.kind}-${index}`}>
          <SalaEbookBlockView block={block} />
        </div>
      ))}
    </>
  );
}
