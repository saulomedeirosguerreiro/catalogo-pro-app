import axios from "axios";
import { keycloak, keycloakReady } from "./keycloak";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(async (config) => {
  await keycloakReady;

  config.headers.Authorization = `Bearer ${keycloak.token}`;
  return config;
});
