# Futnet Italia website

The website of Futnet Italia (Calcio Tenis), built with Astro + Tailwind + DaisyUI and published on GitHub Pages.
Content is edited **by talking to Claude**. The person asking is usually the club's organiser, who is **not technical**.

## How to talk to the organiser

- Reply in the language they write in (usually Italian). Keep it short and friendly.
- Never use technical words (commit, branch, Markdown, frontmatter, build, YAML...). Say "the site", "the post", "published".
- Ask for missing information **one or two questions at a time**, never as a long form.
- Before publishing, show a short summary of what will change (title, date, place, photos, text in both languages) and wait for a "yes".
- If something can't be done, or would change the look of the whole site, say so simply and suggest asking Stefan.

## The site

| what | where |
|---|---|
| news & events | `src/content/news/<folder>/` (see below) |
| carousel photos ("Foto" section) | `src/assets/gallery/` — every image is shown, sorted by file name |
| players | `src/data/players.ts`, photos in `src/assets/players/` |
| tagline, history, timeline, contacts, button labels (IT + EN) | `src/content.ts` |
| colours, fonts | `src/styles/global.css` |
| layout of a section | `src/components/*.astro` |

Pages: `/` Italian, `/en/` English. Every visible text exists in both languages: when the organiser writes in one
language, **write the other one yourself** (natural, not word for word) and show it in the summary.

## News & events

One folder per post: `src/content/news/YYYY-MM-DD-short-name/` (date = publishing day, short name in Italian, lowercase, dashes).

`it.md` — Italian text and the details shared by both languages:

```md
---
title: Torneo d'autunno di Futnet
date: 2026-10-24            # publishing day (today); newest is shown first
event:                      # ONLY for events; leave the whole block out for news
  date: 2026-11-15
  time: '15:00'             # always in quotes
  place: Palestra comunale, Curtatone
link: https://www.facebook.com/...   # optional button at the end (Facebook, sign-up form...)
cover: ./locandina.jpg      # optional main picture (shown whole, never cropped: posters are fine)
photos:                     # optional, more photos shown as a grid under the text
  - ./foto-1.jpg
  - ./foto-2.jpg
summary: ...                # optional text for the card; otherwise the start of the text is used
draft: true                 # optional: hides the post
---

Normal text. **Bold**, *italic*, [links](https://...), lists with "- ", titles with "## ".

A photo inside the text also works: ![](./foto-3.jpg)
```

`en.md` — English version: `title`, `address` (English words for the web address, e.g. `autumn-futnet-tournament`),
optional `summary`, and the text. Without `en.md` the English page shows the Italian text.

Italian address = folder name without the date (or `address:` in `it.md`). Changing an address breaks links already shared, so don't.

Without a cover the card shows the date in big type: that is intended, a post does not need a picture.

## Photos

- Never invent or generate photos of real events, people or places. Only use photos the organiser gives.
  A poster/graphic is fine **only if they ask**, and you make it clear it is a graphic.
- Always copy photos with the resize script (keeps the repository small, fixes rotation):
  `node scripts/add-photo.mjs <photo> src/content/news/<folder>/foto-1.jpg`
  For the carousel: `src/assets/gallery/foto-NN.jpg` (next free number).
- Photos can arrive attached to the chat (use the file), or in the `inbox/` folder (on GitHub: **Add file > Upload files**).
  If you can see a photo but have no file to copy, ask them to upload it to `inbox/` on GitHub.
  After using photos from `inbox/`, delete them from there (keep `inbox/README.md`).
- iPhone HEIC photos may not work: ask for JPG ("Impostazioni > Fotocamera > Formati > Più compatibile", or send it by WhatsApp/email to themselves).

## Publishing

1. `npm install` (once per session), then `npm run build`. It must pass. If it fails, fix it; never publish a failing build.
2. Content changes (posts, photos, players, texts in `src/content.ts`): commit to `main` with a short message
   in English and push. GitHub Actions publishes the site in 1–2 minutes.
3. Changes to layout, colours, components or anything outside content: open a pull request instead,
   and tell the organiser Stefan will check it before it goes online.
4. Tell the organiser it is done, with the address of the new page:
   `https://<site>/novita/<address>/` and `https://<site>/en/news/<address>/` (site address: the `SITE_URL` variable on GitHub).

To undo a change: `git revert` the commit and push (don't rewrite history).

## Rules

- Keep the layout and style of existing pages; add content, don't redesign.
- Don't touch `.github/`, `astro.config.mjs`, `package.json` unless Stefan asks.
- Don't delete posts unless asked twice; prefer `draft: true` to hide one.
- Placeholders in `[square brackets]` in `src/content.ts` and `src/data/players.ts` still need real text; fill them when the organiser provides it.
