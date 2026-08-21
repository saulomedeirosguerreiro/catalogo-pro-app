import { useKeycloak } from "@react-keycloak/web";
import { Logo } from "~/components/Logo";

export function Header() {
  const { keycloak, initialized } = useKeycloak();

  if (!initialized || !keycloak.authenticated) {
    return null;
  }

  const nomeUsuario =
    keycloak.tokenParsed?.name ?? keycloak.tokenParsed?.preferred_username;

  function handleLogout() {
    keycloak.logout();
  }

  return (
    <header className="border-b border-black/10 bg-primary">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2.5">
          <Logo />
          <span className="text-base font-semibold text-white">
            Catálogo Pro
          </span>
        </div>

        <div className="flex items-center gap-4">
          {nomeUsuario && (
            <span className="text-sm text-gray-300">{nomeUsuario}</span>
          )}
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.75}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <path d="M16 17l5-5-5-5" />
              <path d="M21 12H9" />
            </svg>
            Sair
          </button>
        </div>
      </div>
    </header>
  );
}
