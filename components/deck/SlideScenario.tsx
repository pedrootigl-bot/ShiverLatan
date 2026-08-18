import CandleChart, { Sparkline } from "@/components/CandleChart";
import LiveValue from "@/components/LiveValue";
import {
  MOCK_PAIR,
  MOCK_PRICE,
  MOCK_SCENARIO,
  MOCK_SCENARIO_OUT,
} from "@/lib/mock-market-data";

export default function SlideScenario() {
  return (
    <section
      id="cenario"
      data-slide="4"
      className="deck-slide deck-slide--scenario"
    >
      <div className="deck-slide__layout">
        <div className="deck-slide__copy">
          <p className="deck-eyebrow scenario-text">Na prática</p>
          <h2 className="deck-title deck-title--compact">
            <span className="deck-title__fill">Entenda</span>
            <span className="deck-title__outline">o cenário</span>
          </h2>
          <p className="scenario-kicker scenario-text">antes de decidir</p>
          <p className="deck-lead scenario-text">
            A ferramenta mostra três coisas sobre o mercado, no mesmo lugar:
            para onde o preço está indo, com quanta força, e o quanto ele está
            oscilando. Assim você vê a situação agora — e decide se opera.
          </p>
          <p className="scenario-note scenario-text">
            Ela não prevê o futuro e não diz o que comprar ou vender. Só
            organiza o que está acontecendo. Quem decide e quem opera é você.
          </p>
        </div>

        <div
          className="scenario-board"
          aria-label="Exemplo: três leituras do mercado se juntam em uma visão do momento"
        >
          <p className="scenario-board__hud scenario-text">
            <span>Exemplo · {MOCK_PAIR}</span>
            <strong>
              <LiveValue
                value={MOCK_PRICE}
                prefix="$"
                decimals={2}
                startDelay={300}
              />
            </strong>
          </p>
          <p className="scenario-board__legend scenario-text">
            Três leituras do mesmo recorte
          </p>

          <div className="scenario-board__signals">
            {MOCK_SCENARIO.map((axis) => (
              <div
                key={axis.label}
                className="scenario-signal"
                data-tone={axis.tone}
              >
                <span className="scenario-signal__label">{axis.label}</span>
                <strong className="scenario-signal__value">{axis.value}</strong>
                <span className="scenario-signal__meaning">{axis.meaning}</span>
                <Sparkline
                  tone={axis.tone}
                  points={axis.points}
                  filled
                  className="scenario-signal__spark"
                />
              </div>
            ))}
          </div>

          <svg
            className="scenario-board__converge"
            viewBox="0 0 1000 160"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              className="scenario-board__path"
              data-tone="blue"
              d="M166 4 C166 78 500 78 500 156"
            />
            <path
              className="scenario-board__path"
              data-tone="purple"
              d="M500 4 C500 78 500 78 500 156"
            />
            <path
              className="scenario-board__path"
              data-tone="amber"
              d="M834 4 C834 78 500 78 500 156"
            />
            <circle className="scenario-board__node" cx="500" cy="156" r="4" />
          </svg>

          <p className="scenario-board__focus">{MOCK_SCENARIO_OUT}</p>

          <div className="scenario-board__chart">
            <CandleChart
              variant="panel"
              uid="cenario"
              className="absolute inset-0"
            />
            <span className="scan-line" />
          </div>
          <p className="scenario-board__caption scenario-text">
            Embaixo, o preço. Em cima, o que a ferramenta destaca nesse
            momento.
          </p>
        </div>
      </div>
    </section>
  );
}
