/**
 * Downloads photography from Openverse, restricted to CC0 images from curated
 * stock sources, crops each to its target box and writes WebP files into
 * `public/images`, plus a CREDITS.md.
 *
 * CC0 waives attribution; we credit anyway so provenance stays auditable.
 *
 * Usage:
 *   node scripts/fetch-images.mjs --dry      # print candidates only
 *   node scripts/fetch-images.mjs            # download + convert
 *   node scripts/fetch-images.mjs coach      # only slots matching "coach"
 *
 * Requires ImageMagick (`magick`).
 */

import { execFile } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const run = promisify(execFile);
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = resolve(root, "public/images");

const API = "https://api.openverse.org/v1/images/";
const DEFAULT_SOURCES = "stocksnap,rawpixel";
/** People must come from StockSnap; rawpixel CC0 skews to vintage portraits. */
const PEOPLE_SOURCES = "stocksnap";

/**
 * name · query · output width · crop ratio (w/h) · which candidate to take.
 * `gravity` steers the crop — "north" keeps heads in frame when a landscape
 * source has to become a portrait.
 */
const slots = [
  // The coach herself — shared across all three landings.
  {
    name: "coach-portrait",
    q: "portrait woman smiling professional",
    w: 800,
    ratio: 4 / 5,
    pick: 3,
    source: PEOPLE_SOURCES,
    gravity: "north",
    anyOrientation: true,
  },
  { name: "coach-candid", q: "woman writing notebook", w: 1000, ratio: 4 / 3, pick: 0, source: PEOPLE_SOURCES },
  { name: "session", q: "people talking coffee", w: 1200, ratio: 3 / 2, pick: 0, source: PEOPLE_SOURCES },

  // Supporting imagery, one mood per landing.
  { name: "mood-warm", q: "plant leaves", w: 1000, ratio: 1, pick: 0 },
  { name: "mood-energy", q: "sunrise mountains", w: 1200, ratio: 3 / 2, pick: 0 },
  { name: "mood-minimal", q: "architecture building", w: 1200, ratio: 3 / 2, pick: 0 },
  { name: "mood-desk", q: "notebook coffee desk", w: 1000, ratio: 4 / 3, pick: 0 },

  // Clients quoted in testimonials.
  { name: "client-1", q: "portrait young woman student", w: 300, ratio: 1, pick: 1, source: PEOPLE_SOURCES, gravity: "north" },
  { name: "client-2", q: "portrait man smiling professional", w: 300, ratio: 1, pick: 1, source: PEOPLE_SOURCES },
  { name: "client-3", q: "portrait woman glasses office", w: 300, ratio: 1, pick: 1, source: PEOPLE_SOURCES },
];

const args = process.argv.slice(2);
const dry = args.includes("--dry");
const filters = args.filter((a) => !a.startsWith("--"));
const targets = filters.length ? slots.filter((s) => filters.some((f) => s.name.includes(f))) : slots;

async function search(slot) {
  const sources = slot.source ?? DEFAULT_SOURCES;
  const url = `${API}?q=${encodeURIComponent(slot.q)}&source=${sources}&license=cc0&size=large&page_size=8`;
  const res = await fetch(url, { headers: { "User-Agent": "landing-examples/1.0" } });
  if (!res.ok) throw new Error(`Openverse ${res.status} for "${slot.q}"`);
  const { results = [] } = await res.json();
  // `anyOrientation` keeps every candidate in play, so `pick` indexes the raw
  // result list — needed when the best photo is landscape but the slot is portrait.
  if (slot.anyOrientation) return results[slot.pick] ?? results[0];
  const wantsLandscape = slot.ratio > 1.05;
  const wantsPortrait = slot.ratio < 0.95;
  const fits = results.filter((r) => {
    if (!r.width || !r.height) return false;
    const ar = r.width / r.height;
    if (wantsLandscape) return ar >= 1.2;
    if (wantsPortrait) return ar <= 0.9;
    return true;
  });
  return (fits.length ? fits : results)[slot.pick] ?? results[0];
}

async function download(slot, hit) {
  const height = Math.round(slot.w / slot.ratio);
  const target = resolve(outDir, `${slot.name}.webp`);
  const res = await fetch(hit.url, { headers: { "User-Agent": "landing-examples/1.0" } });
  if (!res.ok) throw new Error(`download ${res.status} for ${slot.name}`);
  const tmp = resolve(outDir, `.${slot.name}.tmp`);
  await writeFile(tmp, Buffer.from(await res.arrayBuffer()));
  await run("magick", [
    tmp,
    "-auto-orient",
    "-resize", `${slot.w}x${height}^`,
    "-gravity", slot.gravity ?? "center",
    "-extent", `${slot.w}x${height}`,
    "-strip",
    "-quality", "80",
    target,
  ]);
  await run("rm", ["-f", tmp]);
  return { width: slot.w, height };
}

if (!existsSync(outDir)) await mkdir(outDir, { recursive: true });

const credits = [];
for (const slot of targets) {
  try {
    const hit = await search(slot);
    if (!hit) {
      console.log(`✗ ${slot.name.padEnd(18)} no results for "${slot.q}"`);
      continue;
    }
    const label = `${(hit.title ?? "untitled").slice(0, 40)} · ${hit.source} · ${hit.license}`;
    if (dry) {
      console.log(`· ${slot.name.padEnd(18)} ${hit.width}x${hit.height}  ${label}`);
      continue;
    }
    const { width, height } = await download(slot, hit);
    credits.push({ slot: slot.name, width, height, hit });
    console.log(`✓ ${slot.name.padEnd(18)} ${width}x${height}  ${label}`);
  } catch (error) {
    console.log(`✗ ${slot.name.padEnd(18)} ${error.message}`);
  }
}

if (!dry && credits.length) {
  const rows = credits
    .map(
      ({ slot, hit }) =>
        `| \`${slot}.webp\` | ${(hit.title ?? "Untitled").replace(/\|/g, "-")} | ${hit.creator ?? "Unknown"} | ${hit.license.toUpperCase()} | [${hit.source}](${hit.foreign_landing_url ?? hit.url}) |`,
    )
    .join("\n");

  await writeFile(
    resolve(root, "CREDITS.md"),
    `# Image credits

Every photograph in \`public/images\` comes from [Openverse](https://openverse.org)
under a **CC0 / public-domain dedication**, so no attribution is legally required.
Credited anyway, so any image can be traced and replaced.

Regenerate with:

\`\`\`bash
node scripts/fetch-images.mjs
\`\`\`

| File | Title | Creator | License | Source |
| --- | --- | --- | --- | --- |
${rows}
`,
  );
  console.log(`\nCREDITS.md written with ${credits.length} entries`);
}
