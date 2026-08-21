import type { TenantSlug } from "../tenants";
import { diagonalInc } from "./diagonal-inc";
import type { Theme } from "./types";
import { victa } from "./victa";

const registry: Record<TenantSlug, Theme> = {
  victa,
  "diagonal-inc": diagonalInc,
};

export function getTheme(slug: TenantSlug): Theme {
  return registry[slug];
}

export type { Theme };
