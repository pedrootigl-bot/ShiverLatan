import type { ReactNode } from "react";
import Link from "next/link";

type LegalPageProps = {
  title: string;
  updated: string;
  children: ReactNode;
};

export default function LegalPage({ title, updated, children }: LegalPageProps) {
  return (
    <main id="conteudo" className="min-h-screen bg-[#05070d] text-white">
      <header className="border-b border-white/[0.06]">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between gap-3 px-4 sm:h-[72px] sm:px-6">
          <Link href="/#inicio" className="flex min-w-0 items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#38bdf8] to-[#2563eb] font-bold">
              S
            </span>
            <span className="font-headline text-sm font-bold tracking-[0.08em] sm:text-lg">
              SHIVER
            </span>
          </Link>
          <Link
            href="/#inicio"
            className="shrink-0 py-2 text-sm text-zinc-400 transition hover:text-white"
          >
            Voltar ao início
          </Link>
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
        <nav aria-label="Navegação estrutural" className="text-sm text-zinc-500">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="transition hover:text-white">
                Início
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-zinc-300">{title}</li>
          </ol>
        </nav>
        <p className="mt-8 text-xs font-semibold tracking-[0.2em] text-[#7488ff] uppercase">
          Legal
        </p>
        <h1 className="font-headline mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 text-sm text-zinc-500">Atualizado em {updated}.</p>
        <div className="legal-copy mt-10 space-y-5 text-base leading-relaxed text-zinc-400">
          {children}
        </div>
      </article>
    </main>
  );
}
