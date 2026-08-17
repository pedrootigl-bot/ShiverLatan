import Reveal from "@/components/Reveal";
import BorderGlow from "@/components/BorderGlow";
import LiveValue from "@/components/LiveValue";
import MarketTicker from "@/components/MarketTicker";

const heroMetrics = [
  { label: "Tendência", value: "Alta" },
  { label: "Momentum", value: "Forte" },
  { label: "Risco", value: "Moderado" },
];

const benefitCards = [
  {
    number: "01",
    title: "Análise inteligente",
    description:
      "Informações organizadas para facilitar a leitura e interpretação do mercado.",
  },
  {
    number: "02",
    title: "Mais agilidade",
    description:
      "Encontre rapidamente dados importantes em uma experiência centralizada.",
  },
  {
    number: "03",
    title: "Mais contexto",
    description:
      "Visualize diferentes sinais e informações antes de tomar suas próprias decisões.",
  },
];

export default function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden px-6 pb-24 pt-28 md:pt-36">
      <div className="pointer-events-none absolute left-[-180px] top-[100px] h-[420px] w-[420px] rounded-full bg-[#536dfe]/20 blur-[120px]" />
      <div className="pointer-events-none absolute right-[-100px] top-[50px] h-[420px] w-[420px] rounded-full bg-[#8b5cf6]/16 blur-[120px]" />

      <div className="mx-auto max-w-7xl">
        <div className="-mx-6 mb-10">
          <MarketTicker />
        </div>
        <div className="grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Left */}
          <div className="relative z-10">
            <div className="anim-fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-[#536dfe]/20 bg-[#536dfe]/10 px-4 py-2 text-sm text-[#9aa7ff]">
              <span className="anim-pulse-dot h-2 w-2 rounded-full bg-[#7488ff] shadow-[0_0_12px_#7488ff]" />
              Nova ferramenta para traders
            </div>

            <h1 className="anim-fade-up anim-delay-1 max-w-2xl text-5xl font-bold leading-[1.03] tracking-tight md:text-6xl xl:text-7xl">
              Entenda o mercado
              <span className="anim-gradient-text block bg-gradient-to-r from-[#7488ff] via-[#7f7cff] to-[#8b5cf6] bg-clip-text text-transparent">
                Decida com clareza !
              </span>
            </h1>

            <p className="anim-fade-up anim-delay-2 mt-6 max-w-xl text-lg leading-relaxed text-zinc-400 md:text-xl">
              Uma ferramenta criada para organizar informações relevantes,
              simplificar análises e ajudar você a interpretar melhor o mercado.
            </p>

            <div className="anim-fade-up anim-delay-3 mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#ferramenta"
                className="btn-shine btn-dopamine inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#536dfe] to-[#765cf6] px-7 py-3.5 font-semibold text-white shadow-[0_0_35px_rgba(83,109,254,0.25)]"
              >
                Conhecer a ferramenta
              </a>

              <a
                href="#como-funciona"
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-7 py-3.5 font-semibold text-zinc-200 transition hover:-translate-y-0.5 hover:border-[#536dfe]/30 hover:bg-white/[0.06]"
              >
                Ver como funciona →
              </a>
            </div>

            <div className="anim-fade-up anim-delay-4 mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-zinc-500">
              <span className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span> Informações centralizadas
              </span>
              <span className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span> Leitura simplificada
              </span>
              <span className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span> Mais contexto
              </span>
            </div>
          </div>

          {/* Right / Product */}
          <div className="anim-fade-right relative">
            <div className="pointer-events-none absolute inset-16 rounded-full bg-[#536dfe]/12 blur-[80px]" />

            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0b0f19] shadow-[0_40px_100px_rgba(83,109,254,0.12)]">
              <div className="flex min-h-[520px]">
                {/* Sidebar */}
                <aside className="hidden w-[68px] shrink-0 flex-col items-center border-r border-white/[0.06] bg-[#070a12] py-5 md:flex">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#536dfe] to-[#8b5cf6] text-sm font-bold text-white">
                    S
                  </div>

                  <div className="mt-10 flex flex-col gap-4">
                    <div className="h-9 w-9 rounded-xl border border-[#536dfe]/20 bg-[#536dfe]/15" />
                    <div className="h-9 w-9 rounded-xl border border-white/5 bg-white/[0.025]" />
                    <div className="h-9 w-9 rounded-xl border border-white/5 bg-white/[0.025]" />
                    <div className="h-9 w-9 rounded-xl border border-white/5 bg-white/[0.025]" />
                  </div>
                </aside>

                {/* Main content */}
                <div className="min-w-0 flex-1 p-5 md:p-7">
                  <div className="flex items-start justify-between border-b border-white/[0.06] pb-5">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-zinc-600">
                        Market intelligence
                      </p>

                      <div className="mt-2 flex items-end gap-3">
                        <h2 className="text-2xl font-semibold md:text-3xl">
                          BTC / USD
                        </h2>

                        <span className="mb-1 text-sm font-semibold text-emerald-400">
                          +2.48%
                        </span>
                      </div>
                    </div>

                    <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
                      <span className="anim-pulse-live">●</span> Ativo
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="mt-5 grid grid-cols-3 gap-3">
                    {heroMetrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-3 card-hit-soft"
                      >
                        <p className="text-[10px] uppercase tracking-wide text-zinc-600">
                          {metric.label}
                        </p>

                        <p className="mt-1.5 text-sm font-medium text-zinc-300">
                          {metric.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Chart */}
                  <div className="anim-chart-ready relative mt-5 h-[245px] overflow-hidden rounded-2xl border border-white/[0.06] bg-[#05070d]">
                    {/* Grid */}
                    <div className="absolute inset-0">
                      <div className="absolute top-1/4 h-px w-full bg-white/[0.035]" />
                      <div className="absolute top-2/4 h-px w-full bg-white/[0.035]" />
                      <div className="absolute top-3/4 h-px w-full bg-white/[0.035]" />

                      <div className="absolute left-1/4 h-full w-px bg-white/[0.035]" />
                      <div className="absolute left-2/4 h-full w-px bg-white/[0.035]" />
                      <div className="absolute left-3/4 h-full w-px bg-white/[0.035]" />
                    </div>

                    <div className="absolute left-5 top-5 z-10">
                      <p className="text-xs text-zinc-600">
                        Performance
                      </p>

                      <p className="mt-1 text-xl font-semibold text-zinc-200">
                        <LiveValue value={67842.5} prefix="$" decimals={2} />
                      </p>
                    </div>

                    <div className="absolute right-[3%] top-[10%] z-10 flex items-center gap-2">
                      <span className="h-2.5 w-2.5 animate-ping rounded-full bg-[#8b5cf6] shadow-[0_0_12px_#8b5cf6]" />
                    </div>

                    <svg
                      viewBox="0 0 800 260"
                      preserveAspectRatio="none"
                      className="absolute inset-0 h-full w-full"
                    >
                      <defs>
                        <linearGradient id="heroLine" x1="0" x2="1">
                          <stop offset="0%" stopColor="#536dfe" />
                          <stop offset="100%" stopColor="#8b5cf6" />
                        </linearGradient>

                        <linearGradient
                          id="heroArea"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#536dfe"
                            stopOpacity="0.3"
                          />

                          <stop
                            offset="100%"
                            stopColor="#536dfe"
                            stopOpacity="0"
                          />
                        </linearGradient>
                      </defs>

                      <path
                        className="chart-area"
                        d="
                          M0 215
                          C60 205 90 170 145 182
                          C200 195 220 130 280 145
                          C330 157 370 100 425 112
                          C480 125 500 70 560 82
                          C610 92 650 45 700 57
                          C750 68 775 28 800 34
                          L800 260
                          L0 260
                          Z
                        "
                        fill="url(#heroArea)"
                      />

                      <path
                        className="chart-stroke"
                        pathLength={1}
                        d="
                          M0 215
                          C60 205 90 170 145 182
                          C200 195 220 130 280 145
                          C330 157 370 100 425 112
                          C480 125 500 70 560 82
                          C610 92 650 45 700 57
                          C750 68 775 28 800 34
                        "
                        fill="none"
                        stroke="url(#heroLine)"
                        strokeWidth="4"
                      />
                    </svg>
                  </div>

                  {/* Bottom insight */}
                  <div className="card-hit-soft mt-4 flex items-start gap-3 rounded-2xl border border-[#536dfe]/15 bg-[#536dfe]/5 p-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#536dfe]/15 text-xs font-bold text-[#7488ff]">
                      AI
                    </div>

                    <div>
                      <p className="text-sm font-medium text-zinc-200">
                        Insight identificado
                      </p>

                      <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                        O mercado apresenta movimentação relevante no curto
                        prazo.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom feature cards */}
        <div
          id="beneficios"
          className="mt-24 grid gap-5 md:grid-cols-3"
        >
          {benefitCards.map((card, index) => (
            <Reveal key={card.number} animation="fade-up" delay={index * 140}>
            <BorderGlow>
              <div className="h-full rounded-3xl border border-white/10 bg-white/[0.025] p-7 card-hit">
                <span className="text-xs font-semibold text-[#7488ff]">
                  {card.number}
                </span>

                <h3 className="mt-5 text-xl font-semibold">
                  {card.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-zinc-500">
                  {card.description}
                </p>
              </div>
            </BorderGlow>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}