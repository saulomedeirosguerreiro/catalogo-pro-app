export function LoadingScreen() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 bg-gray-950">
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-base font-semibold text-gray-900">
        CP
      </span>
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-700 border-t-white" />
      <p className="text-sm text-gray-400">Carregando...</p>
    </main>
  );
}
