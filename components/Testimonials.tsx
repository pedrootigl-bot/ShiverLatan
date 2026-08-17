import Reveal from "@/components/Reveal";
import BorderGlow from "@/components/BorderGlow";

const principles = [
  {
    index: "01",
    title: "Menos ruído",
    description:
      "Informações de mercado reunidas em um painel único, para reduzir a troca de telas e a leitura fragmentada.",
  },
  {
    index: "02",
    title: "Mais contexto",
    description:
      "Sinais, métricas e movimento aparecem juntos. A proposta é apoiar a análise — não substituir o julgamento do trader.",
  },
  {
    index: "03",
    title: "Decisão sua",
    description:
      "A Shiver não executa ordens e não promete resultado. O que entregamos é clareza para você decidir com responsabilidade.",
  },
];

export default function Testimonials() {
  return (
    <section
      id="metodo"
      className="relative overflow-hidden px-6 py-24 md:py-32"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#536dfe]/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <Reveal animation="fade-left">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#7488ff]">
              Método
            </span>

            <h2 className="mt-5 max-w-2xl text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Como lemos
              <span className="block text-zinc-500">o mercado.</span>
            </h2>
          </Reveal>

          <Reveal animation="fade-right" delay={140}>
            <div className="lg:flex lg:justify-end">
              <p className="max-w-lg text-lg leading-relaxed text-zinc-400">
                Sem depoimentos inventados. Três princípios que guiam a
                ferramenta — e o que ela, de propósito, não faz.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {principles.map((principle, index) => (
            <Reveal
              key={principle.index}
              animation="fade-up"
              delay={index * 160}
            >
              <BorderGlow>
                <article className="card-hit group relative flex min-h-[300px] flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.025] p-7">
                  <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#536dfe]/10 blur-[70px] opacity-0 transition duration-300 group-hover:opacity-100" />

                  <div className="relative flex h-full flex-col">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7488ff]">
                      {principle.index}
                    </span>

                    <h3 className="mt-8 text-2xl font-semibold tracking-tight text-white">
                      {principle.title}
                    </h3>

                    <p className="mt-4 flex-1 text-base leading-relaxed text-zinc-400">
                      {principle.description}
                    </p>
                  </div>
                </article>
              </BorderGlow>
            </Reveal>
          ))}
        </div>

        <Reveal
          animation="fade-in"
          delay={200}
          className="mt-12 flex flex-col gap-4 border-t border-white/[0.06] pt-8 md:flex-row md:items-center md:justify-between"
        >
          <p className="max-w-xl text-sm leading-relaxed text-zinc-600">
            Ferramenta de leitura e contexto. Não é robô de operação, não é
            consultoria e não é garantia de lucro.
          </p>

          <p className="text-xs uppercase tracking-[0.18em] text-zinc-700">
            Análise consciente
          </p>
        </Reveal>
      </div>
    </section>
  );
}
