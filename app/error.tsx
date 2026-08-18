"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main
      id="conteudo"
      className="flex min-h-screen flex-col items-center justify-center bg-[#05070d] px-6 text-center text-white"
    >
      <p className="text-xs font-semibold tracking-[0.22em] text-[#e879f9] uppercase">
        Erro
      </p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight">
        Não foi possível carregar
      </h1>
      <p className="mt-3 max-w-md text-sm text-zinc-400">
        Recarregue a página. Se o problema continuar, volte ao início.
      </p>
      <button
        type="button"
        className="mt-8 rounded-full bg-gradient-to-r from-[#e879f9] to-[#7c9bff] px-5 py-2.5 text-sm font-semibold text-white"
        onClick={() => reset()}
      >
        Tentar de novo
      </button>
    </main>
  );
}
