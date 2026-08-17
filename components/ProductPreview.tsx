import Reveal from "@/components/Reveal";
import LiveValue from "@/components/LiveValue";

const marketMetrics = [
  {
    label: "Tendência",
    value: "Positiva",
    detail: "+18.4%",
    fill: "72%",
  },
  {
    label: "Momentum",
    value: "Forte",
    detail: "74%",
    fill: "74%",
  },
  {
    label: "Volatilidade",
    value: "Moderada",
    detail: "42%",
    fill: "42%",
  },
];

const assets = [
  { name: "BTC / USD", value: "$67,842", change: "+2.48%" },
  { name: "ETH / USD", value: "$3,542", change: "+1.76%" },
  { name: "EUR / USD", value: "1.0842", change: "+0.32%" },
];

export default function ProductPreview() {
  return (
    <section
      id="ferramenta"
      className="relative overflow-x-clip px-6 py-24 md:py-32"
    >
      <div className="pointer-events-none absolute left-1/2 top-[55%] h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#536dfe]/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        <Reveal animation="blur-in" className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#7488ff]">
            A ferramenta
          </span>

          <h2 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Tudo que importa.
            <span className="block text-zinc-500">Em uma única visão.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
            Centralize informações relevantes, visualize movimentos do mercado
            e encontre contexto de forma mais simples e objetiva.
          </p>
        </Reveal>

        <Reveal
          animation="fade-in"
          delay={80}
          once
          className="relative mt-16 md:mt-20"
        >
          <div className="relative overflow-hidden rounded-[28px] border border-white/[0.09] bg-[#080b13] shadow-[0_50px_140px_rgba(83,109,254,0.14)]">

            <div className="flex h-12 items-center justify-between border-b border-white/[0.06] bg-[#0b0f19] px-5">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              </div>

              <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-600">
                Shiver Market Intelligence
              </span>

              <div className="w-12" />
            </div>

            <div className="flex">
              <aside className="hidden w-[76px] shrink-0 flex-col items-center border-r border-white/[0.06] bg-[#070a12] py-6 md:flex">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#536dfe] to-[#8b5cf6] font-bold text-white shadow-[0_0_30px_rgba(83,109,254,0.25)]">
                  S
                </div>

                <div className="mt-12 flex flex-col gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#536dfe]/20 bg-[#536dfe]/15">
                    <span className="h-2 w-2 rounded-full bg-[#7488ff]" />
                  </div>
                  <div className="h-10 w-10 rounded-xl border border-white/[0.05] bg-white/[0.025]" />
                  <div className="h-10 w-10 rounded-xl border border-white/[0.05] bg-white/[0.025]" />
                  <div className="h-10 w-10 rounded-xl border border-white/[0.05] bg-white/[0.025]" />
                </div>
              </aside>

              <div className="min-w-0 flex-1 p-5 md:p-7 lg:p-8">
                <div className="flex flex-col gap-4 border-b border-white/[0.06] pb-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-zinc-600">
                      Market Overview
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-100">
                      Visão geral do mercado
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <div className="rounded-full border border-white/[0.07] bg-white/[0.025] px-4 py-2 text-xs text-zinc-500">
                      Últimas 24h
                    </div>
                    <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs text-emerald-400">
                      <span className="anim-pulse-live">●</span> Mercado ativo
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {marketMetrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="card-hit-soft rounded-2xl border border-white/[0.06] bg-white/[0.025] p-5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs text-zinc-600">{metric.label}</p>
                          <p className="mt-2 text-lg font-semibold text-zinc-200">
                            {metric.value}
                          </p>
                        </div>
                        <span className="text-xs font-semibold text-[#7488ff]">
                          {metric.detail}
                        </span>
                      </div>

                      <div className="mt-5 h-1 overflow-hidden rounded-full bg-white/[0.05]">
                        <div
                          className="anim-progress h-full rounded-full bg-gradient-to-r from-[#536dfe] to-[#8b5cf6]"
                          style={{ width: metric.fill }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 grid items-stretch gap-5 xl:grid-cols-[minmax(0,1.65fr)_minmax(260px,0.85fr)]">
                  <div className="card-hit-soft min-w-0 rounded-3xl border border-white/[0.06] bg-[#05070d] p-5 md:p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-xs text-zinc-600">BTC / USD</p>
                        <div className="mt-2 flex items-end gap-3">
                          <p className="text-2xl font-semibold tracking-tight md:text-3xl">
                            <LiveValue
                              value={67842.5}
                              prefix="$"
                              decimals={2}
                            />
                          </p>
                          <span className="mb-1 text-sm font-semibold text-emerald-400">
                            +2.48%
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {["1H", "4H", "1D"].map((period) => (
                          <span
                            key={period}
                            className={
                              period === "1D"
                                ? "rounded-lg bg-[#536dfe]/15 px-3 py-1.5 text-xs text-[#9aa7ff] transition hover:bg-[#536dfe]/25"
                                : "rounded-lg px-3 py-1.5 text-xs text-zinc-600 transition hover:bg-white/[0.06] hover:text-zinc-300"
                            }
                          >
                            {period}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="anim-chart-ready relative mt-6 h-[240px] overflow-hidden sm:h-[280px]">
                      <div className="absolute inset-0">
                        <div className="absolute top-1/4 h-px w-full bg-white/[0.035]" />
                        <div className="absolute top-2/4 h-px w-full bg-white/[0.035]" />
                        <div className="absolute top-3/4 h-px w-full bg-white/[0.035]" />
                        <div className="absolute left-1/4 h-full w-px bg-white/[0.035]" />
                        <div className="absolute left-2/4 h-full w-px bg-white/[0.035]" />
                        <div className="absolute left-3/4 h-full w-px bg-white/[0.035]" />
                      </div>

                      <svg
                        viewBox="0 0 900 300"
                        preserveAspectRatio="none"
                        className="absolute inset-0 h-full w-full"
                      >
                        <defs>
                          <linearGradient id="previewLine" x1="0" x2="1">
                            <stop offset="0%" stopColor="#536dfe" />
                            <stop offset="100%" stopColor="#8b5cf6" />
                          </linearGradient>
                          <linearGradient
                            id="previewArea"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="0%"
                              stopColor="#536dfe"
                              stopOpacity="0.32"
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
                          d="M0 245 C60 238 95 205 140 215 C195 228 215 170 265 178 C320 190 350 130 400 145 C455 160 480 95 535 110 C595 125 620 70 675 85 C735 98 760 42 815 58 C850 68 875 35 900 42 L900 300 L0 300 Z"
                          fill="url(#previewArea)"
                        />
                        <path
                          className="chart-stroke"
                          pathLength={1}
                          d="M0 245 C60 238 95 205 140 215 C195 228 215 170 265 178 C320 190 350 130 400 145 C455 160 480 95 535 110 C595 125 620 70 675 85 C735 98 760 42 815 58 C850 68 875 35 900 42"
                          fill="none"
                          stroke="url(#previewLine)"
                          strokeWidth="3"
                          vectorEffect="non-scaling-stroke"
                        />
                      </svg>

                      <div className="absolute top-[12%] right-[2%] flex items-center gap-2">
                        <span className="h-2.5 w-2.5 animate-ping rounded-full bg-[#8b5cf6] shadow-[0_0_12px_#8b5cf6]" />
                        <span className="rounded-lg border border-[#8b5cf6]/20 bg-[#8b5cf6]/10 px-2 py-1 text-[10px] text-[#a99aff]">
                          $67,842
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 flex justify-between text-[10px] text-zinc-700">
                      <span>00h</span>
                      <span>04h</span>
                      <span>08h</span>
                      <span>12h</span>
                      <span>16h</span>
                      <span>20h</span>
                      <span>24h</span>
                    </div>
                  </div>

                  <div className="flex min-w-0 flex-col gap-5">
                    <div className="card-hit-soft rounded-3xl border border-[#536dfe]/20 bg-gradient-to-b from-[#536dfe]/10 to-transparent p-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#536dfe] to-[#8b5cf6] text-xs font-bold">
                          AI
                        </div>
                        <div>
                          <p className="text-sm font-medium text-zinc-200">
                            AI Insight
                          </p>
                          <p className="text-xs text-zinc-600">Atualizado agora</p>
                        </div>
                      </div>

                      <p className="mt-5 text-sm leading-relaxed text-zinc-400">
                        Movimento positivo identificado com aumento de momentum
                        no curto prazo.
                      </p>

                      <div className="mt-5">
                        <div className="flex justify-between text-xs">
                          <span className="text-zinc-600">Confiança</span>
                          <span className="text-[#9aa7ff]">82%</span>
                        </div>
                        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.05]">
                          <div className="anim-progress h-full w-[82%] rounded-full bg-gradient-to-r from-[#536dfe] to-[#8b5cf6]" />
                        </div>
                      </div>
                    </div>

                    <div className="card-hit-soft flex-1 rounded-3xl border border-white/[0.06] bg-white/[0.02] p-5">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-zinc-300">
                          Mercados
                        </p>
                        <span className="text-xs text-zinc-600">Ver todos</span>
                      </div>

                      <div className="mt-5 space-y-4">
                        {assets.map((asset) => (
                          <div
                            key={asset.name}
                            className="card-row -mx-2 flex items-center justify-between rounded-xl border-b border-white/[0.04] px-2 py-3 last:border-0"
                          >
                            <div>
                              <p className="text-sm font-medium text-zinc-300">
                                {asset.name}
                              </p>
                              <p className="mt-1 text-xs text-zinc-600">
                                {asset.value}
                              </p>
                            </div>
                            <span className="text-xs font-semibold text-emerald-400">
                              {asset.change}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-white/[0.05] bg-white/[0.02] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <span className="anim-pulse-dot h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                    <p className="text-xs text-zinc-500">
                      Dados atualizados em tempo real
                    </p>
                  </div>
                  <p className="text-xs text-zinc-700">
                    Última atualização: agora
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-8 border-t border-white/[0.06] pt-12 md:grid-cols-3">
          <Reveal animation="fade-up" delay={0}>
            <p className="text-xs font-semibold text-[#7488ff]">01</p>
            <h3 className="mt-4 text-lg font-semibold">Tudo centralizado</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-500">
              Menos tempo procurando informações em diferentes ambientes.
            </p>
          </Reveal>

          <Reveal animation="fade-up" delay={120}>
            <p className="text-xs font-semibold text-[#7488ff]">02</p>
            <h3 className="mt-4 text-lg font-semibold">Mais clareza</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-500">
              Informações organizadas para facilitar sua leitura do cenário.
            </p>
          </Reveal>

          <Reveal animation="fade-up" delay={240}>
            <p className="text-xs font-semibold text-[#7488ff]">03</p>
            <h3 className="mt-4 text-lg font-semibold">Mais contexto</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-500">
              Dados e sinais relevantes reunidos para apoiar sua análise.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
