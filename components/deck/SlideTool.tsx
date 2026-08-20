import CandleChart from "@/components/CandleChart";
import LiveValue from "@/components/LiveValue";
import {
  MOCK_PAIR,
  MOCK_PRICE,
  MOCK_TOOL_METRICS,
} from "@/lib/mock-market-data";

export default function SlideTool() {
  return (
    <section id="ferramenta" data-slide="3" className="deck-slide deck-slide--tool">
      <div className="deck-slide__layout">
        <div className="deck-slide__copy">
            <p className="deck-eyebrow deck-enter">A ferramenta</p>
            <h2 className="deck-title deck-title--compact">
              <span className="deck-title__fill">Uma</span>
              <span className="deck-title__outline">Visão</span>
            </h2>
        </div>

        <div className="deck-visual deck-enter">
          <div className="deck-panel p-5 md:p-6">
            <div>
              <p className="text-[11px] tracking-[0.18em] text-zinc-500 uppercase">
                {MOCK_PAIR}
              </p>
              <p className="font-headline mt-1 text-2xl font-semibold tracking-tight md:text-3xl">
                <LiveValue value={MOCK_PRICE} prefix="$" decimals={2} />
              </p>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2">
              {MOCK_TOOL_METRICS.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3"
                >
                  <p className="text-[10px] text-zinc-500">{metric.label}</p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    {metric.value}
                  </p>
                  <p className="text-[11px] text-[#7c9bff]">{metric.detail}</p>
                </div>
              ))}
            </div>

            <div className="relative mt-4 h-40 overflow-hidden md:h-48">
              <CandleChart variant="panel" uid="tool" className="absolute inset-0" />
            </div>
          </div>
        </div>

        <p className="deck-lead deck-enter">
          O painel reúne tendência, momentum e volatilidade para o timing.
          A ferramenta auxilia; quem opera é você.
        </p>
      </div>
    </section>
  );
}
