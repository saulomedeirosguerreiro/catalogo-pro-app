import axios from "axios";
import { keycloak, keycloakReady } from "./keycloak";

// A API decide o tenant pelo token (seu `iss`/realm), não pelo Host da
// requisição — por isso a chamada vai sempre para o mesmo VITE_API_URL,
// independente do hostname da página atual.
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(async (config) => {
  await keycloakReady;

  config.headers.Authorization = `Bearer ${keycloak.token}`;
  return config;
});
