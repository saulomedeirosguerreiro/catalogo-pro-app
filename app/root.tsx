import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { ReactKeycloakProvider } from "@react-keycloak/web";

import type { Route } from "./+types/root";
import { Header } from "./components/Header";
import { keycloak } from "./lib/keycloak";
import "./lib/theme-init";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    // Inter (victa) e Sora (diagonal-inc) carregadas juntas no bundle: um
    // único build/deploy atende os dois tenants, sem lógica condicional aqui.
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Sora:wght@400;500;600;700&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ReactKeycloakProvider
          authClient={keycloak}
          initOptions={{
            // "check-sso" faz uma checagem silenciosa via iframe apontando
            // pro Keycloak — mas o Keycloak, por padrão, bloqueia ser exibido
            // num iframe de outra origem (Content-Security-Policy
            // frame-ancestors 'self'), então esse iframe nunca carrega e a
            // Promise do init() trava pra sempre. Como todas as rotas daqui
            // já exigem login (RequireAuth), não há motivo pra checagem
            // silenciosa: "login-required" redireciona a página inteira pro
            // Keycloak direto, sem iframe nenhum — não trava.
            onLoad: "login-required",
          }}
          onEvent={(event) => {
            if (event === "onAuthRefreshError") {
              keycloak.login();
            }
          }}
        >
          <Header />
          {children}
        </ReactKeycloakProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
