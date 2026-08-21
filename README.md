# CatalogoPro App

Front-end React (React Router v8, modo SPA) do CatalogoPro — CRUD de produtos e categorias, multi-tenant (`victa` / `diagonal-inc`), autenticado via Keycloak.

Consome a API em [`CatalogoProApi`](../CatalogoProApi) (esperado como pasta irmã desta, no mesmo workspace).

## Stack

- React 19 + React Router v8 (SPA, sem SSR)
- TypeScript
- Tailwind CSS v4 (CSS-first, variáveis CSS para tema por tenant)
- `keycloak-js` / `@react-keycloak/web` para autenticação
- axios para chamadas à API

## Multi-tenant

- Cada tenant tem tema visual próprio (cores, fonte, logo) e seu **próprio realm no Keycloak**.
- O tenant é resolvido no browser a partir do `hostname` (`app/lib/tenant-resolution.ts`) — usado para: montar o tema (`app/lib/theme-init.ts`) e escolher com qual realm do Keycloak fazer login (`app/lib/keycloak.ts`), antes de existir qualquer token.
- Uma vez logado, a chamada à API (`app/lib/api.ts`) sempre vai para o mesmo `VITE_API_URL` — quem decide o tenant do lado do back-end é o **token JWT**, não o hostname da página (ver `docs/ARQUITETURA-MULTI-TENANT.md` no repositório da API).
- Uma única build atende os dois tenants; nada é resolvido em build-time.

Local de teste sem editar o hosts file: qualquer subdomínio de `*.localhost` (ex. `victa.localhost`, `diagonal-inc.localhost`) já resolve para `127.0.0.1` nos navegadores modernos.

## Rodando localmente

```bash
npm install
cp .env.example .env   # ajuste VITE_API_URL / VITE_KEYCLOAK_* conforme seu ambiente
npm run dev            # http://localhost:5173, com HMR
```

Outros comandos:

```bash
npm run build      # build de produção (build/client + build/server)
npm run start      # roda o build de produção (react-router-serve)
npm run typecheck  # gera os tipos de rota e roda tsc --noEmit
```

Não há test runner nem linter configurados neste projeto ainda.

### Variáveis de ambiente

Ver `.env.example`:

| Variável | Descrição |
|---|---|
| `VITE_API_URL` | URL base da API do CatalogoPro |
| `VITE_KEYCLOAK_URL` | URL base do Keycloak (infra, comum a todos os tenants) |
| `VITE_KEYCLOAK_CLIENT_ID` | client de login do front-end no Keycloak |
| `VITE_KEYCLOAK_API_CLIENT_ID` | client no Keycloak onde as roles `admin`/`user` estão definidas |

O realm do Keycloak **não** é uma env var — é resolvido por tenant em runtime (`app/lib/tenants.ts`).

## Docker

```bash
docker build -t catalogo-pro-app .
docker run -p 3000:3000 catalogo-pro-app
```

Para rodar a stack completa (API + Postgres + Keycloak + este front-end) de uma vez, use o `docker-compose.yml` do repositório `CatalogoProApi` (clone as duas pastas lado a lado) — ver `docs/MULTI-TENANT-LAB.md` lá.

## Estrutura

```
app/
  components/      componentes de UI (Header, forms, guards de rota)
  hooks/            hooks (ex.: useIsAdmin)
  lib/              api client, integração Keycloak, resolução/temas de tenant
  routes/           páginas registradas em app/routes.ts
  services/         chamadas à API por domínio (produtos)
  types/            tipos compartilhados
  root.tsx          shell da aplicação, ReactKeycloakProvider
```
