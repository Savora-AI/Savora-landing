# Savora Website

Marketing site for [Savora](https://savora.com) — the operating brain for independent restaurants.

## Stack

- React 18 + TypeScript
- Vite 6
- Tailwind CSS 4
- Motion (animations)
- React Router 7

## Getting started

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build to `dist/` |

## Waitlist API (dev only)

In development, `POST /api/waitlist` with `{ "email": "..." }` saves signups to `data/waitlist.json` (gitignored). For production, set `VITE_WAITLIST_URL` to your backend endpoint.

## Project structure

```
src/
  app/
    components/   # Page sections and UI
    App.tsx         # Root app + preloader
    routes.tsx      # Router config
  styles/
    index.css       # Brand tokens and global styles
public/
  assets/           # Static images and marks
```

## Assets

Place `savora-logo-white.png` in `public/assets/` before deploying.
