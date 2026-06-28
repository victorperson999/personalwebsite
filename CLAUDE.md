# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Workflow Rules

- **Plan before code**: For every coding task, present a written plan (files to change, approach, edge cases) and wait for explicit user approval before writing any code.
- **Show your changes**: After writing code, summarize every file that was modified and what changed in each.
- **Log this session**: When the user says "log this session", append a new dated entry to the top of the `## Changelog` section below, summarizing what was implemented in the session as bullet points per file changed (matching the existing entry format). This builds a running reference of prior work for future sessions.

## Commands

```bash
npm install        # install dependencies
npm run dev        # Vite dev server (http://localhost:5173)
npm run build      # type-check (tsc) + production build to dist/
npm run preview    # serve the production build locally to verify it
npm run typecheck  # tsc --noEmit (type-check only, no build)
npm run deploy     # build + wrangler deploy (manual deploy; normally automatic — see Deployment)
```

## Environment Variables

None. This is a purely static frontend with no backend, no secrets, and no `.env` files. If a backend/API is added later, document required vars here.

## Deployment

Hosted on **Cloudflare** as a **static-assets Worker** named `personal-website` (the `name` in `wrangler.jsonc`), serving the built `dist/` folder. Live at **https://www.victorjiang.dev**.

- **Auto-deploy**: pushing to `main` triggers **Workers Builds**, which runs `npm run build` then `npx wrangler deploy` to upload `dist/`. No manual step needed for normal changes.
- **Manual deploy** (rarely needed): `npm run deploy` from a logged-in `wrangler` (`npx wrangler login` first).
- **Config**: `wrangler.jsonc` — `assets.directory` is `./dist`; `not_found_handling` is `single-page-application` (all unmatched paths serve `index.html`, ready for client-side routing).
- The custom domain + SSL are attached to the `personal-website` Worker. The `name` in `wrangler.jsonc` **must stay equal to that Worker's name** — changing it would deploy to a different Worker that doesn't have the domain.
- **TODO**: apex `victorjiang.dev` → `www` 301 redirect is not set up yet (proxied `AAAA 100::` record + a Cloudflare Redirect Rule).

## Architecture

Single-page **Vite + React 18 + TypeScript** static site. No router, backend, or data fetching yet — it's a minimal landing page with room to grow.

### Structure
- `index.html` — HTML shell; loads `/src/main.tsx`, mounts into `<div id="root">`.
- `src/main.tsx` — entry point; mounts `<App />` in `<StrictMode>`.
- `src/App.tsx` — the page (currently a centered name + tagline hero).
- `src/index.css` — global styles; dark theme via CSS custom properties (`--bg`, `--fg`, `--muted`).
- `src/vite-env.d.ts` — Vite client type reference.
- `vite.config.ts` — Vite config (React plugin).
- `tsconfig.json` — strict TypeScript, bundler module resolution, `noEmit` (Vite does the transpiling; `tsc` only type-checks).
- `wrangler.jsonc` — Cloudflare Worker static-assets config (see Deployment).

### Build pipeline
`npm run build` = `tsc && vite build`. The `tsc` pass type-checks (fails the build on type errors); `vite build` (esbuild + Rollup) emits hashed assets to `dist/`.

## Changelog

### 2026-06-28 — No-JavaScript fallback
- **`index.html`** — addressed the site rendering nothing when JS is disabled, blocked, or fails to load (the SPA ships an empty `#root` that only React fills). Added (1) an inline critical `<style>` in `<head>` that locks in the dark background (`#0e1116`/`#ece6d8`) with no JS and before React mounts, avoiding a white flash; (2) a self-contained `<noscript>` fallback in `<body>` — its own scoped `<style>` (chess palette, brass accents, responsive `clamp()` sizing, so it doesn't depend on the bundled CSS), `#root:empty { display:none }` to collapse the empty root, and inline essentials: name, "Software Engineer", a two-line bio, and working `<a>` contact links (Email/LinkedIn/GitHub + Discord handle). Deliberately links to none of the JS-only sub-routes (`/about`, `/projects`, `/experience`) since they serve the same shell and would also be blank. No effect on the JS-enabled site (`<noscript>` is inert when JS runs). Verified via `npm run build` (fallback present verbatim in `dist/index.html`) and a JS-disabled preview.

### 2026-06-26 — Project scaffold + Cloudflare deploy
- **Scaffolded** the site with Vite + React + TypeScript (`package.json`, `index.html`, `vite.config.ts`, `tsconfig.json`, `.gitignore`, `src/main.tsx`, `src/App.tsx`, `src/index.css`, `src/vite-env.d.ts`). Minimal dark landing page with a "Victor Jiang" hero.
- **Cloudflare deploy** — added `wrangler.jsonc` (static-assets Worker serving `dist/`, SPA fallback) and a `deploy` script; connected the repo to the existing `personal-website` Worker via Workers Builds so pushes to `main` auto-deploy. Domain `www.victorjiang.dev` live.
- **`CLAUDE.md`** — created this file (workflow rules, commands, deployment, architecture, changelog).
