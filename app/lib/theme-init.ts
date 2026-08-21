import { getCurrentTenantSlug } from "./tenant-resolution";
import { getTheme } from "./themes";

export function applyTenantTheme(): void {
  // Sem `document` durante o prerender em Node do shell SPA (build-time) —
  // nada a fazer, o navegador aplica o tema de verdade ao carregar o bundle.
  if (typeof document === "undefined") {
    return;
  }

  const theme = getTheme(getCurrentTenantSlug());
  const root = document.documentElement.style;

  root.setProperty("--color-primary", theme.colors.primary);
  root.setProperty("--color-secondary", theme.colors.secondary);
  root.setProperty("--color-background", theme.colors.background);
  root.setProperty("--color-text", theme.colors.text);
  root.setProperty("--font-sans", theme.fontFamily);
}

// Efeito de módulo: roda no import (antes da árvore React montar) para
// evitar flash do tema errado, sem depender de nenhuma chamada de API.
applyTenantTheme();
