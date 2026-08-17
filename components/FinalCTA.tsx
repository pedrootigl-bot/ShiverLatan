import Reveal from "@/components/Reveal";

export default function FinalCTA() {
  return (
    <section
      id="comecar"
      className="relative overflow-hidden px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[36px] border border-[#536dfe]/20 bg-[#0b0f19] px-8 py-16 text-center shadow-[0_40px_140px_rgba(83,109,254,0.22)] md:px-16 md:py-24">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[380px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#536dfe]/18 blur-[100px]" />

          <Reveal animation="scale-in" className="relative">
            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-[#536dfe]/20 bg-[#536dfe]/10 px-4 py-2 text-sm text-[#9aa7ff]">
              <span className="anim-pulse-dot h-2 w-2 rounded-full bg-[#7488ff]" />
              Conheça uma nova experiência
            </div>

            <h2 className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
              Uma nova forma de
              <span className="anim-gradient-text block bg-gradient-to-r from-[#7488ff] via-[#7f7cff] to-[#8b5cf6] bg-clip-text text-transparent">
                interpretar o mercado.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400 md:text-xl">
              Tenha informações relevantes, mais contexto e uma leitura mais
              clara em um único ambiente.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#ferramenta"
                className="btn-shine btn-dopamine inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#536dfe] to-[#765cf6] px-8 py-4 font-semibold text-white shadow-[0_0_35px_rgba(83,109,254,0.25)]"
              >
                Quero conhecer a ferramenta
              </a>

              <a
                href="#como-funciona"
                className="inline-flex items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.025] px-8 py-4 font-semibold text-zinc-300 transition hover:-translate-y-0.5 hover:border-[#536dfe]/30 hover:bg-white/[0.05]"
              >
                Ver como funciona →
              </a>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-zinc-500">
              <span className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span> Mais clareza
              </span>
              <span className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span> Mais contexto
              </span>
              <span className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span> Mais agilidade
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}