import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("components/RequireAuth.tsx", [
    index("routes/home.tsx"),
    layout("components/RequireAdmin.tsx", [
      route("produtos/novo", "routes/produtos/novo.tsx"),
      route("produtos/:id/editar", "routes/produtos/editar.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
