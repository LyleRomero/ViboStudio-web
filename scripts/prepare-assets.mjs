/**
 * One-off asset preparation.
 *
 * The three desktop captures were taken as full Chrome windows. The browser
 * chrome (tabs, personal bookmarks bar, localhost URL) and the Windows taskbar
 * are cropped away so the laptop mockups frame the live sites only. The site
 * pixels themselves are untouched.
 *
 * Run with: node scripts/prepare-assets.mjs
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const work = path.resolve("public/work");

// Expressed as ratios of the capture so they hold at any DPI scaling.
const CHROME_TOP = 118 / 801; // below the bookmarks bar
const TASKBAR_TOP = 754 / 801; // above the Windows taskbar
const SCROLLBAR = 14 / 1280;

const desktopShots = [
  "eternique-essence-web",
  "reto21-evento-web",
  "ag-ingenieria-web",
];

for (const name of desktopShots) {
  const src = path.join(work, `${name}.webp`);
  const out = path.join(work, `${name}-screen.webp`);
  const meta = await sharp(src).metadata();
  const top = Math.round(meta.height * CHROME_TOP);
  await sharp(src)
    .extract({
      left: 0,
      top,
      width: meta.width - Math.round(meta.width * SCROLLBAR),
      height: Math.round(meta.height * TASKBAR_TOP) - top,
    })
    .webp({ quality: 88 })
    .toFile(out);
  const o = await sharp(out).metadata();
  console.log(`${name}: ${meta.width}x${meta.height} -> ${o.width}x${o.height}`);
}

const phoneShots = fs
  .readdirSync(work)
  .filter((f) => f.endsWith("-social.webp"));
for (const f of phoneShots) {
  const m = await sharp(path.join(work, f)).metadata();
  console.log(`${f}: ${m.width}x${m.height} (ratio ${(m.width / m.height).toFixed(4)})`);
}
