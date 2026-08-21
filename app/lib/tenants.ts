export type TenantSlug = "victa" | "diagonal-inc";

export interface TenantConfig {
  slug: TenantSlug;
  nome: string;
  dominio: string;
  keycloakRealm: string;
}

// O domínio de cada tenant muda por ambiente (dev usa *.localhost, hml/prod usam
// domínios de verdade) — por isso vem de env var (injetada em build-time pelo
// Vite), diferente de nome/realm, que não mudam entre ambientes.
export const tenants: Record<TenantSlug, TenantConfig> = {
  victa: {
    slug: "victa",
    nome: "Victa",
    dominio: import.meta.env.VITE_TENANT_DOMAIN_VICTA,
    keycloakRealm: "victa",
  },
  "diagonal-inc": {
    slug: "diagonal-inc",
    nome: "Diagonal Inc",
    dominio: import.meta.env.VITE_TENANT_DOMAIN_DIAGONAL_INC,
    keycloakRealm: "diagonal-inc",
  },
};

export const DEFAULT_TENANT_SLUG: TenantSlug = "victa";
