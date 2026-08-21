import { DEFAULT_TENANT_SLUG, tenants, type TenantConfig, type TenantSlug } from "./tenants";

const domainToSlug = new Map<string, TenantSlug>(
  Object.values(tenants).map((tenant) => [tenant.dominio, tenant.slug]),
);

export function resolveTenantSlug(hostname: string): TenantSlug {
  const slug = domainToSlug.get(hostname);
  if (slug) {
    return slug;
  }

  // `npm run dev` roda em localhost/127.0.0.1 sem passar pelo hosts file —
  // cai num tenant default para não travar o dia a dia de desenvolvimento.
  if (hostname === "localhost" || hostname === "127.0.0.1") {
    return DEFAULT_TENANT_SLUG;
  }

  console.warn(
    `[tenant] Hostname "${hostname}" não corresponde a nenhum tenant conhecido; usando "${DEFAULT_TENANT_SLUG}" como fallback.`,
  );
  return DEFAULT_TENANT_SLUG;
}

export function getCurrentTenantSlug(): TenantSlug {
  // react-router build faz um prerender único do shell SPA em Node (sem
  // `window`) para gerar o HTML de fallback estático — nesse contexto não
  // há hostname real, então cai no tenant default sem erro.
  if (typeof window === "undefined") {
    return DEFAULT_TENANT_SLUG;
  }

  return resolveTenantSlug(window.location.hostname);
}

export function getCurrentTenant(): TenantConfig {
  return tenants[getCurrentTenantSlug()];
}
