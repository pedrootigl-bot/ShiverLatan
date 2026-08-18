const principles = [
  {
    index: "01",
    title: "Menos ruído",
    description: "Um painel só, para reduzir a troca de telas na hora de operar.",
  },
  {
    index: "02",
    title: "Mais contexto",
    description:
      "Sinais juntos para auxiliar a hora de compra e venda — não para substituir o trader.",
  },
  {
    index: "03",
    title: "Decisão sua",
    description:
      "A ferramenta não opera sozinha. Quem decide e quem opera é você.",
  },
];

export default function SlideMethod() {
  return (
    <section id="metodo" data-slide="4" className="deck-slide deck-slide--method">
      <div className="deck-slide__layout">
        <div className="deck-slide__copy">
          <p className="deck-eyebrow deck-enter">Método</p>
          <h2 className="deck-title deck-title--compact">
            <span className="deck-title__fill">Como</span>
            <span className="deck-title__outline">Lemos</span>
          </h2>
          <p className="deck-lead deck-enter">
            O painel descreve o cenário para auxiliar o momento. A decisão, o
            risco e a ordem continuam sendo seus.
          </p>
        </div>

        <div className="deck-visual deck-visual--steps flex flex-col gap-4">
          {principles.map((principle) => (
            <article key={principle.index} className="deck-stat deck-enter">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.22em] text-[#e879f9] uppercase">
                  {principle.index}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-white">
                  {principle.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {principle.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
