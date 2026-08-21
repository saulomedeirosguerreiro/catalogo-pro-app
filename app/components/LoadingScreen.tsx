import { Logo } from "~/components/Logo";

export function LoadingScreen() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 bg-gray-950">
      <Logo size="lg" />
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-700 border-t-white" />
      <p className="text-sm text-gray-400">Carregando...</p>
    </main>
  );
}
