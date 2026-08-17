import Reveal from "@/components/Reveal";
import BorderGlow from "@/components/BorderGlow";

const benefits = [
  {
    title: "Mais clareza",
    description:
      "Visualize informações importantes do mercado de forma simples, organizada e objetiva.",
  },
  {
    title: "Mais agilidade",
    description:
      "Centralize dados relevantes e reduza o tempo gasto procurando informações em diferentes fontes.",
  },
  {
    title: "Mais contexto",
    description:
      "Tenha uma visão mais completa do cenário antes de tomar suas decisões no mercado.",
  },
];

export default function Benefits() {
  return (
    <section id="beneficios" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal animation="fade-up" className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#7488ff]">
            Benefícios
          </span>

          <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            Informação mais clara para decisões mais conscientes.
          </h2>

      
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {benefits.map((benefit, index) => (
            <Reveal key={benefit.title} animation="fade-up" delay={index * 140}>
            <BorderGlow>
              <div className="card-hit h-full rounded-3xl border border-white/10 bg-white/[0.03] p-8">
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#536dfe]/20 bg-[#536dfe]/10 text-sm font-bold text-[#7488ff]">
                  0{index + 1}
                </div>

                <h3 className="text-2xl font-semibold">{benefit.title}</h3>

                <p className="mt-4 leading-relaxed text-zinc-400">
                  {benefit.description}
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