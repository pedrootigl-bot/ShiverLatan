import Reveal from "@/components/Reveal";
import BorderGlow from "@/components/BorderGlow";

const steps = [
  {
    number: "01",
    title: "Observe",
    description:
      "Acompanhe informações relevantes do mercado em uma interface centralizada.",
  },
  {
    number: "02",
    title: "Analise",
    description:
      "Visualize dados, sinais e movimentos com uma leitura mais organizada.",
  },
  {
    number: "03",
    title: "Interprete",
    description:
      "Transforme informações complexas em um contexto mais simples e objetivo.",
  },
  {
    number: "04",
    title: "Decida",
    description:
      "Use as informações disponíveis como apoio para suas próprias decisões.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="como-funciona"
      className="relative overflow-hidden px-6 py-24 md:py-32"
    >
      {/* Background */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#536dfe]/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
          <Reveal animation="fade-left">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#7488ff]">
              Como funciona
            </span>

            <h2 className="mt-5 max-w-2xl text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Informação transformada em
              <span className="block text-zinc-500">
                contexto para você.
              </span>
            </h2>
          </Reveal>

          <Reveal animation="fade-right" delay={120}>
            <div className="lg:flex lg:justify-end">
              <p className="max-w-lg text-lg leading-relaxed text-zinc-400">
                Uma experiência criada para tornar a leitura do mercado mais
                clara, rápida e organizada.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Steps */}
        <Reveal animation="fade-in" className="relative mt-20">
          {/* Linha desktop */}
          <div className="how-line absolute left-[5%] right-[5%] top-[31px] hidden h-px bg-gradient-to-r from-transparent via-[#536dfe]/40 to-transparent lg:block" />

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <Reveal
                key={step.number}
                animation="scale-in"
                delay={index * 140}
                className="group relative"
              >
                {/* Número */}
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#536dfe]/20 bg-[#0b0f19] text-sm font-semibold text-[#7488ff] shadow-[0_0_35px_rgba(83,109,254,0.08)] transition duration-300 group-hover:border-[#536dfe]/50 group-hover:shadow-[0_0_40px_rgba(83,109,254,0.15)]">
                  {step.number}
                </div>

                {/* Card */}
                <BorderGlow className="mt-6">
                  <div className="min-h-[230px] rounded-3xl border border-white/[0.08] bg-white/[0.025] p-7 card-hit">
                    <div className="mb-8 flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                        Etapa {step.number}
                      </span>

                      {index < steps.length - 1 && (
                        <span className="text-sm text-zinc-700">
                          →
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl font-semibold tracking-tight">
                      {step.title}
                    </h3>

                    <p className="mt-4 text-sm leading-relaxed text-zinc-500">
                      {step.description}
                    </p>

                    {/* Mini visual */}
                    <div className="mt-8 flex items-end gap-1.5">
                      {[30, 45, 38, 58, 50, 70, 62, 78].map(
                        (height, barIndex) => (
                          <div
                            key={barIndex}
                            className="anim-bar w-full rounded-sm bg-gradient-to-t from-[#536dfe]/10 to-[#7488ff]/60"
                            style={{
                              height: `${height / 2}px`,
                              opacity:
                                barIndex <= index + 3 ? 1 : 0.25,
                            }}
                          />
                        )
                      )}
                    </div>
                  </div>
                </BorderGlow>
              </Reveal>
            ))}
          </div>
        </Reveal>

        {/* Bottom message */}
        <Reveal animation="fade-up" delay={180}>
        <div className="card-hit mt-16 flex flex-col gap-6 rounded-3xl border border-white/[0.08] bg-[#0b0f19]/60 p-7 md:flex-row md:items-center md:justify-between md:p-9">
          <div>
            <p className="text-sm text-zinc-500">
              Da informação à decisão
            </p>

            <p className="mt-2 text-xl font-medium text-zinc-200">
              Tudo em uma experiência mais simples e organizada.
            </p>
          </div>

          <a
            href="#ferramenta"
            className="btn-shine btn-dopamine inline-flex shrink-0 items-center justify-center rounded-full border border-[#536dfe]/20 bg-[#536dfe]/10 px-6 py-3 text-sm font-semibold text-[#9aa7ff] transition hover:border-[#536dfe]/40 hover:bg-[#536dfe]/15"
          >
            Ver a ferramenta →
          </a>
        </div>
        </Reveal>
      </div>
    </section>
  );
}