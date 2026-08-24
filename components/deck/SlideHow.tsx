const chaosPoints = [
  "Gráficos desconectados",
  "Indicadores em conflito",
  "Decisão no impulso",
];

const clarityPoints = [
  "Leitura integrada",
  "Sinais objetivos",
  "Timing com contexto",
];

export default function SlideHow() {
  return (
    <section id="como-funciona" data-slide="2" className="deck-slide deck-slide--how">
      <div className="deck-slide__layout">
        <div className="deck-slide__copy">
            <p className="deck-eyebrow deck-enter">Como funciona</p>
            <h2 className="deck-title deck-title--split">
              <span className="sr-only">
                Como a ferramenta da Shiver organiza o timing de compra e venda.{" "}
              </span>
              <span className="deck-title__fill">Caos</span>
              <span className="deck-title__x" aria-hidden>
                x
              </span>
              <span className="deck-title__outline">Clareza</span>
            </h2>
        </div>

        <div className="deck-visual deck-visual--split grid gap-4">
          <article className="deck-panel how-card how-card--chaos overflow-hidden p-6">
            <p className="text-[11px] font-semibold tracking-[0.28em] text-red-400 uppercase">
              Caos
            </p>
            <ul className="mt-4 space-y-2">
              {chaosPoints.map((point) => (
                <li key={point} className="text-sm text-zinc-400">
                  ✕ {point}
                </li>
              ))}
            </ul>
          </article>

          <article className="deck-panel how-card how-card--clarity overflow-hidden p-6">
            <p className="text-[11px] font-semibold tracking-[0.28em] text-[#38bdf8] uppercase">
              Clareza
            </p>
            <ul className="mt-4 space-y-2">
              {clarityPoints.map((point) => (
                <li key={point} className="text-sm text-zinc-300">
                  ✓ {point}
                </li>
              ))}
            </ul>
          </article>
        </div>

        <p className="deck-lead deck-enter">
          Dados brutos viram uma leitura só. A ferramenta organiza o
          cenário. Quem compra e vende é você.
        </p>
      </div>
    </section>
  );
}
