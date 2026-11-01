# Futnet Italia – Calcio Tenis website

Astro + Tailwind CSS + DaisyUI (no React, almost no JavaScript in the browser), published on GitHub Pages.
All content lives in this repository and is edited **by asking Claude** (Claude Code on claude.ai/code or the
Claude desktop app, connected to this repository). The rules Claude follows are in `CLAUDE.md`, and the
step-by-step "add a post" flow is the `new-post` skill in `.claude/skills/`.

```
organiser  ->  Claude (writes the files, checks the build)  ->  push to main  ->  GitHub Action  ->  GitHub Pages
```

## 1. Run it on your computer

```bash
npm install
npm run dev        # http://localhost:4321  (Italian)   /en/  (English)
```

`npm run build` type-checks the content (a wrong date or a missing photo stops the build) and builds `dist/`.

## 2. Content

| what | where |
|---|---|
| News & events | `src/content/news/<YYYY-MM-DD-name>/`: `it.md`, `en.md` and the photos (format in `CLAUDE.md`) |
| Carousel photos | `src/assets/gallery/` |
| New photos from the organiser | `inbox/` (uploaded on GitHub, moved into place by Claude) |

Photos are copied with `node scripts/add-photo.mjs <photo> <destination.jpg>` (max 2000 px, JPG).

## 3. Put it online (GitHub Pages)

1. Create a GitHub repository and push this folder (branch `main`).
2. Repository **Settings > Pages > Build and deployment > Source: GitHub Actions**.
3. Repository **Settings > Secrets and variables > Actions > Variables**:
   - `BASE_PATH` – `/<repository-name>/` while using the github.io address (remove it when the domain is connected)
   - `SITE_URL` – the full address, e.g. `https://<user>.github.io/<repository-name>` (later `https://futnetitalia.it`)
4. Every push to `main` builds and publishes the site (Actions tab; **Run workflow** rebuilds by hand).

## 4. Giving the organiser access

1. Invite them to the repository (Settings > Collaborators, role **Write**).
2. They sign in to claude.ai with a paid plan, open **Code**, connect GitHub and pick this repository.
3. They type what they want, e.g. "Aggiungi un evento: torneo a Curtatone il 15 novembre alle 15".
   Optional: protect `main` for files outside `src/content`, `src/assets` and `inbox` if you want to review layout changes.

## 5. Custom domain (later)

Buy the domain, then Settings > Pages > Custom domain, and add the DNS records GitHub shows.
Remove the `BASE_PATH` variable and set `SITE_URL` to the new address.
(`.it` domains require an Italian/EU/EEA registrant.)

## Languages

- `/` is Italian, `/en/` is English.
- On the first visit to `/`, a tiny script checks the browser languages: English -> `/en/`, otherwise Italian.
- The IT/EN switch remembers the visitor's choice.

## What to edit where

| to change | edit |
|---|---|
| tagline, history, timeline, footer line, contact links, button labels | `src/content.ts` |
| site name, logo file, the team shown in "Teams" (name and crest) | `site` and `club` in `src/content.ts`; image files in `public/` |
| colours (blue, red, gold from the logo) | `src/styles/global.css` (the `futnet` theme at the top) |
| fonts | `src/styles/global.css` (`@theme`) and the `@fontsource` imports in `src/layouts/Layout.astro` |
| layout of a section | `src/components/*.astro` (Tailwind and DaisyUI classes) |
| the few lines of browser JavaScript (phone menu, language links, "Show older posts") | bottom of `src/layouts/Layout.astro` |
| news / events | `src/content/news/` |
| players and their photos | `src/data/players.ts`; photos go in `src/assets/players/` |
| the photo carousel | `src/assets/gallery/` |
