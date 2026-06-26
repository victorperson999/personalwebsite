# personalwebsite

Personal website for [www.victorjiang.dev](https://www.victorjiang.dev).

## Stack

- [Vite](https://vite.dev/) + React + TypeScript
- Hosted on Cloudflare (deploys on push to `main`)

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check + production build to dist/
npm run preview  # preview the production build locally
```

## Deploy

Pushing to `main` triggers an automatic Cloudflare build and deploy.

- Build command: `npm run build`
- Build output directory: `dist`
