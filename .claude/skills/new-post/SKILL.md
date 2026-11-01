---
name: new-post
description: Add a news item or an event to the Futnet Italia site, step by step with the organiser. Use when they ask to add, announce or publish an event, tournament, result, news or post ("aggiungi un evento", "nuovo post", "pubblica una notizia").
---

# New news item or event

Follow CLAUDE.md (tone, file format, photos, publishing). Talk in the organiser's language, one or two questions at a time.

1. **Event or news?** Guess from their message; ask only if unclear.
2. **Collect the details** (skip whatever they already said):
   - event: name, day, time, place; optional link (Facebook event, sign-up form)
   - news / result: what happened (a few sentences or bullet points are enough; you write the text)
   - photos: "Hai foto o una locandina?" — optional. If there are several, ask which is the main one (or pick the poster).
3. **Write the post**: create `src/content/news/<today>-<short-name>/` with `it.md` and `en.md`.
   Write a clear, warm text from what they said; don't invent facts (scores, names, prizes) they didn't give.
   Copy photos with `node scripts/add-photo.mjs`: main picture as `cover`, the rest in `photos`.
4. **Check**: `npm run build` must pass.
5. **Summary and confirm**: show the title, date/time/place, the Italian text, the English text and the list of photos.
   Ask "Pubblico?" and wait. Apply any corrections and show the summary again.
6. **Publish**: commit to `main` ("Add post: <title>") and push. Tell them it will be online in a couple of minutes,
   with the two page addresses. Empty `inbox/` of the photos you used.
