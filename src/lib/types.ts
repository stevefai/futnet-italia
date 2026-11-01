import type { ImageMetadata } from 'astro';
import type { CollectionEntry } from 'astro:content';

export type Lang = 'it' | 'en';

export interface Localized {
  it: string;
  en: string;
}

export interface Post {
  id: string;
  /** an event has an event date, news does not */
  type: 'event' | 'news';
  /** address of the post page, per language (the last part of the URL) */
  slug: Localized;
  /** YYYY-MM-DD, the day it was published */
  posted: string;
  title: Localized;
  /** short plain-text preview for the cards */
  excerpt: Localized;
  /** the Markdown file whose text is shown, per language */
  entry: Record<Lang, CollectionEntry<'news'>>;
  /** YYYY-MM-DD, events only */
  eventDate: string;
  eventTime: string;
  place: string;
  link: string;
  /** main picture, if any */
  cover?: ImageMetadata;
  /** more photos shown under the text */
  photos: ImageMetadata[];
}

/** A player as written in src/data/players.ts */
export interface PlayerInput {
  number: string;
  name: string;
  role: Localized;
  captain?: boolean;
  /** file name inside src/assets/players/ */
  photo?: string;
}

export interface SiteData {
  posts: Post[];
}
