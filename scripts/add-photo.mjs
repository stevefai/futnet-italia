/*
  Copies a photo into the site, made smaller so the repository stays light.
    node scripts/add-photo.mjs <photo> <destination.jpg>
  e.g. node scripts/add-photo.mjs inbox/IMG_1234.jpeg src/content/news/2026-11-15-torneo/foto-1.jpg
  The longest side becomes at most 2000 px, the photo is turned the right way up and saved as JPG.
*/
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const [source, target] = process.argv.slice(2);
if (!source || !target) {
  console.error('Usage: node scripts/add-photo.mjs <photo> <destination.jpg>');
  process.exit(1);
}

await mkdir(path.dirname(target), { recursive: true });
const info = await sharp(source)
  .rotate() // follow the phone's orientation
  .resize({ width: 2000, height: 2000, fit: 'inside', withoutEnlargement: true })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(target);
console.log(`${target}: ${info.width}x${info.height}, ${Math.round(info.size / 1024)} kB`);
