# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project state

This repository is currently the unmodified React Router v7 ("Framework Mode") starter template — SSR enabled, one route (`/`), no backend/data layer, no tests, and no linter configured yet. Treat the existing structure as scaffolding, not established convention; there isn't yet a "catalogo pro" domain model to preserve.

## Commands

```bash
npm run dev        # start dev server with HMR at http://localhost:5173
npm run build      # production build (outputs to build/client and build/server)
npm run start      # run the production build (react-router-serve ./build/server/index.js)
npm run typecheck  # regenerate React Router route types, then run tsc --noEmit
```

There is no test runner and no lint script configured — don't assume `npm test` or `npm run lint` exist.

## Architecture

- **Routing**: routes are registered explicitly in `app/routes.ts` using `@react-router/dev/routes` helpers (`index()`, `route()`, etc.) — there is no filesystem-based route convention here. Add new routes by creating a file under `app/routes/` and registering it in `app/routes.ts`.
- **Route typegen**: each route file gets generated types via `import type { Route } from "./+types/<routename>"`, providing typed `loader`/`action`/`meta` args. These types are generated into `.react-router/types/` by `react-router typegen` (run automatically as part of `dev`/`build`, and explicitly by `npm run typecheck`) — don't hand-write them.
- **Root layout**: `app/root.tsx` defines the HTML document shell (`Layout`), the top-level `App` component (renders `<Outlet />`), and a shared `ErrorBoundary` that distinguishes route errors (`isRouteErrorResponse`) from unexpected exceptions (showing the stack trace only in dev).
- **Path alias**: `~/*` maps to `app/*` (configured in `tsconfig.json` and picked up via `vite-tsconfig-paths` through the React Router Vite plugin).
- **Styling**: Tailwind CSS v4 via `@tailwindcss/vite`, imported globally in `app/app.css` from `root.tsx`. No component library is set up.
- **SSR toggle**: `react-router.config.ts` controls server rendering (`ssr: true`); set to `false` to switch the app to SPA mode.
- **Deployment**: `Dockerfile` uses a multi-stage build (separate dev/prod dependency install stages, then a build stage, then a slim runtime image) and expects the container to run `npm run start` against the built `build/` output. Any platform that can run a Node server works (the README lists Fly.io, Railway, ECS, Cloud Run, Azure Container Apps, DigitalOcean as reference targets, not decided infra).
