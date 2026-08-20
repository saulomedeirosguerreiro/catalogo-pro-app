import axios from "axios";
import { keycloak, keycloakReady } from "./keycloak";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(async (config) => {
  await keycloakReady;

  try {
    await keycloak.updateToken(30);
  } catch {
    return Promise.reject(new Error("Sessão expirada."));
  }

  config.headers.Authorization = `Bearer ${keycloak.token}`;
  return config;
});
