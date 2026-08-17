import Reveal from "@/components/Reveal";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] px-6">
      <Reveal animation="fade-in">
      <div className="mx-auto max-w-7xl py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
          {/* Brand */}
          <div>
            <a href="#inicio" className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#536dfe] to-[#8b5cf6] font-bold text-white">
                S
              </div>

              <span className="text-lg font-bold tracking-[0.12em]">
                SHIVER
              </span>
            </a>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-600">
              Tecnologia e informação para uma leitura mais clara do mercado.
              Shiver não executa operações.
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap gap-x-8 gap-y-4 text-sm text-zinc-500">
            <a
              href="#beneficios"
              className="transition hover:text-white"
            >
              Benefícios
            </a>

            <a
              href="#como-funciona"
              className="transition hover:text-white"
            >
              Como funciona
            </a>

            <a
              href="#metodo"
              className="transition hover:text-white"
            >
              Método
            </a>

            <a
              href="#ferramenta"
              className="transition hover:text-white"
            >
              Ferramenta
            </a>

            <a
              href="#faq"
              className="transition hover:text-white"
            >
              FAQ
            </a>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-5 border-t border-white/[0.05] pt-8 text-sm text-zinc-700 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 Shiver. Todos os direitos reservados.
          </p>

          <div className="flex gap-6">
            <a
              href="#"
              className="transition hover:text-zinc-400"
            >
              Termos
            </a>

            <a
              href="#"
              className="transition hover:text-zinc-400"
            >
              Privacidade
            </a>
          </div>
        </div>
      </div>
      </Reveal>
    </footer>
  );
}