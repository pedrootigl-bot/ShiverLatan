import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Página não encontrada",
};

export default function NotFound() {
  return (
    <main
      id="conteudo"
      className="flex min-h-screen flex-col items-center justify-center bg-[#05070d] px-6 text-center text-white"
    >
      <p className="text-xs font-semibold tracking-[0.22em] text-[#38bdf8] uppercase">
        404
      </p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight">
        Página não encontrada
      </h1>
      <p className="mt-3 max-w-md text-sm text-zinc-400">
        Esse endereço não existe nesta landing. Volte ao início para conhecer a
        ferramenta da Shiver.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-gradient-to-r from-[#38bdf8] to-[#2563eb] px-5 py-2.5 text-sm font-semibold text-white"
      >
        Ir ao início
      </Link>
    </main>
  );
}
