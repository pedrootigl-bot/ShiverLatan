import Reveal from "@/components/Reveal";

const questions = [
  {
    question: "O que é essa ferramenta?",
    answer:
      "É uma solução criada para organizar informações de mercado e apresentar dados relevantes de forma mais clara e objetiva.",
  },
  {
    question: "Para quem ela foi criada?",
    answer:
      "A ferramenta foi pensada para traders que desejam ter mais contexto e praticidade durante suas análises.",
  },
  {
    question: "Ela executa operações automaticamente?",
    answer:
      "Não. A Shiver não executa ordens e não opera em seu nome. A proposta é fornecer informações e contexto para apoiar a sua análise.",
  },
  {
    question: "Quando estará disponível?",
    answer:
      "Mais informações sobre acesso e disponibilidade serão divulgadas em breve.",
  },
];

export default function FAQ() {
  return (
    <section
      id="faq"
      className="relative overflow-hidden px-6 py-24 md:py-32"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#536dfe]/5 blur-[120px]" />

      <div className="relative mx-auto max-w-5xl">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          {/* Left */}
          <Reveal animation="fade-left">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#7488ff]">
              FAQ
            </span>

            <h2 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
              Ainda tem alguma dúvida?
            </h2>

            <p className="mt-5 max-w-md text-lg leading-relaxed text-zinc-400">
              Confira algumas respostas rápidas sobre a ferramenta e como ela
              funciona.
            </p>
          </Reveal>

          {/* Questions */}
          <div className="space-y-4">
            {questions.map((item, index) => (
              <Reveal key={item.question} animation="fade-right" delay={index * 90}>
              <details
                className="group rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 transition hover:border-[#536dfe]/40 hover:bg-[#536dfe]/5 hover:shadow-[0_0_40px_rgba(83,109,254,0.12)]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5">
                  <span className="font-medium text-zinc-200">
                    {item.question}
                  </span>

                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.025] text-zinc-500 transition duration-300 group-open:rotate-45 group-open:border-[#536dfe]/30 group-open:text-[#7488ff]">
                    +
                  </span>
                </summary>

                <p className="mt-5 max-w-3xl pr-10 text-sm leading-relaxed text-zinc-500">
                  {item.answer}
                </p>
              </details>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}