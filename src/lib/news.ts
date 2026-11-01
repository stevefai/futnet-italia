/*
  Runs at BUILD time only (never in the visitor's browser).
  Reads the news & events in src/content/news/ (one folder per post, see src/content.config.ts)
  and turns them into the posts the pages use.
*/
import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang, Localized, Post, SiteData } from './types';

type Entry = CollectionEntry<'news'>;

const isoDay = (date: Date) => date.toISOString().slice(0, 10);

/** The start of the Markdown text as plain text, cut at a word boundary. */
function excerptOf(markdown: string, max = 200): string {
  const text = markdown
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p && !/^(#|!\[|<|[-*+] |\d+\. |>)/.test(p)) // only normal paragraphs
    .join(' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (text.length <= max) return text;
  return text.slice(0, max).replace(/\s+\S*$/, '') + '…';
}

function toPosts(entries: Entry[]): Post[] {
  const folders = new Map<string, Partial<Record<Lang, Entry>>>();
  for (const entry of entries) {
    // e.g. src/content/news/2026-10-24-torneo/it.md
    const [folder, file] = (entry.filePath ?? '').split('/').slice(-2);
    const lang = file.replace(/\.md$/, '') as Lang;
    folders.set(folder, { ...folders.get(folder), [lang]: entry });
  }

  const posts: Post[] = [];
  for (const [folder, files] of folders) {
    const it = files.it;
    if (!it) throw new Error(`[news] ${folder}: it.md is missing (every post needs one).`);
    if (it.data.draft) continue;
    if (!it.data.date) throw new Error(`[news] ${folder}/it.md: "date" is missing (e.g. date: 2026-10-24).`);
    // a language without its own file shows the Italian one
    const entry = { it, en: files.en ?? it };
    const fallbackSlug = folder.replace(/^\d{4}-\d{2}-\d{2}-/, '');
    const title: Localized = { it: it.data.title, en: entry.en.data.title };
    const { event } = it.data;

    posts.push({
      id: folder,
      type: event ? 'event' : 'news',
      slug: { it: it.data.address ?? fallbackSlug, en: files.en?.data.address ?? fallbackSlug },
      posted: isoDay(it.data.date),
      title,
      excerpt: {
        it: it.data.summary ?? excerptOf(it.body ?? ''),
        en: entry.en.data.summary ?? excerptOf(entry.en.body ?? ''),
      },
      entry,
      eventDate: event ? isoDay(event.date) : '',
      eventTime: event?.time ?? '',
      place: event?.place ?? '',
      link: it.data.link ?? '',
      cover: it.data.cover,
      photos: it.data.photos,
    });
  }
  // newest first; on the same day, the folder name decides
  return posts.sort((a, b) => b.posted.localeCompare(a.posted) || b.id.localeCompare(a.id));
}

let cached: Promise<SiteData> | null = null;

/** All pages share one read per build. */
export function loadSiteData(): Promise<SiteData> {
  if (!cached) cached = getCollection('news').then((entries) => ({ posts: toPosts(entries) }));
  return cached;
}
