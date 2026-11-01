/*
  NEWS & EVENTS: one folder per post in src/content/news/, named YYYY-MM-DD-short-name.
    it.md   Italian text + the details shared by both languages (date, event, link, photos)
    en.md   English text (title, address, text); if missing, the Italian text is shown
    *.jpg   the post's photos, next to the text files
  See CLAUDE.md for a full example.
*/
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const news = defineCollection({
  loader: glob({ pattern: '*/{it,en}.md', base: './src/content/news' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** last part of the address; defaults to the folder name without the date */
      address: z.string().optional(),
      /** short text for the cards; defaults to the start of the text */
      summary: z.string().optional(),
      /** true = not published */
      draft: z.boolean().default(false),

      // The fields below are read from it.md only.
      /** the day the post was published; the newest is shown first */
      date: z.coerce.date().optional(),
      /** only for events */
      event: z
        .object({
          date: z.coerce.date(),
          time: z.string().optional(),
          place: z.string().optional(),
        })
        .optional(),
      /** button at the end of the post (Facebook, registration form, ...) */
      link: z.string().url().optional(),
      /** main picture: card thumbnail and beside the text (shown whole, never cropped) */
      cover: image().optional(),
      /** more photos, shown as a grid under the text */
      photos: z.array(image()).default([]),
    }),
});

export const collections = { news };
