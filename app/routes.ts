import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("produtos/novo", "routes/produtos/novo.tsx"),
  route("produtos/:id/editar", "routes/produtos/editar.tsx"),
] satisfies RouteConfig;
