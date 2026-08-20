import Keycloak from "keycloak-js";

export const keycloak = new Keycloak({
  url: import.meta.env.VITE_KEYCLOAK_URL,
  realm: import.meta.env.VITE_KEYCLOAK_REALM,
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
});

// O ReactKeycloakProvider chama keycloak.init() internamente. Interceptamos
// essa chamada só para reaproveitar a própria Promise que ela já retorna,
// resolvida quando o check-sso realmente termina — sem precisar de nenhum
// evento/callback adicional.
const originalInit = keycloak.init.bind(keycloak);
export const keycloakReady: Promise<boolean> = new Promise((resolve) => {
  keycloak.init = (options) => {
    const result = originalInit(options);
    result.then(resolve).catch(() => resolve(false));
    return result;
  };
});

export const ROLE_ADMIN = "admin";
export const ROLE_USER = "user";

// Client no Keycloak onde as roles admin/user são atribuídas (diferente do
// client de login `keycloak.clientId`), por isso precisa ser passado
// explicitamente para keycloak.hasResourceRole(role, API_CLIENT_ID).
export const API_CLIENT_ID = import.meta.env.VITE_KEYCLOAK_API_CLIENT_ID;
