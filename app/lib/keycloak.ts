import Keycloak from "keycloak-js";

export const keycloak = new Keycloak({
  url: import.meta.env.VITE_KEYCLOAK_URL,
  realm: import.meta.env.VITE_KEYCLOAK_REALM,
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
});

let markKeycloakReady: () => void;

// Resolvido pelo onEvent do ReactKeycloakProvider quando o check-sso inicial
// termina (com sucesso ou erro). Evita que requisições disparadas por
// clientLoader/clientAction tentem usar o token antes da inicialização
// terminar, o que causava um loop de redirecionamentos para o login.
export const keycloakReady = new Promise<void>((resolve) => {
  markKeycloakReady = resolve;
});

export function notifyKeycloakReady() {
  markKeycloakReady();
}

export const ROLE_ADMIN = "admin";
export const ROLE_USER = "user";

export function getResourceRoles(client: Keycloak): string[] {
  const clientId = import.meta.env.VITE_KEYCLOAK_CLIENT_ID;
  return client.tokenParsed?.resource_access?.[clientId]?.roles ?? [];
}

export function hasRole(client: Keycloak, role: string): boolean {
  return getResourceRoles(client).includes(role);
}
