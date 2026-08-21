export type TenantSlug = "victa" | "diagonal-inc";

export interface TenantConfig {
  slug: TenantSlug;
  nome: string;
  dominio: string;
  keycloakRealm: string;
}

export const tenants: Record<TenantSlug, TenantConfig> = {
  victa: {
    slug: "victa",
    nome: "Victa",
    dominio: "victa.catalogopro.local",
    keycloakRealm: "victa",
  },
  "diagonal-inc": {
    slug: "diagonal-inc",
    nome: "Diagonal Inc",
    dominio: "diagonal-inc.catalogopro.local",
    keycloakRealm: "diagonal-inc",
  },
};

export const DEFAULT_TENANT_SLUG: TenantSlug = "victa";
