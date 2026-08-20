/**
 * Sources one real capital/major-city photo per guide country from Wikimedia
 * Commons, resizes it, and writes it into public/countries/.
 *
 * Commons is used rather than a stock library because its files are public
 * domain or Creative Commons: they can be hosted locally, so there is no
 * third-party image host in the critical path and no licence to buy. CC-BY and
 * CC-BY-SA *do* require visible attribution, which is why this script records
 * the author, licence and source URL for every file it keeps — that metadata is
 * a legal obligation, not decoration.
 *
 * Run: node scripts/fetch-city-photos.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import sharp from "sharp";

const UA = "TRAVLBOK/1.0 (https://travlbok.com; hello@travlbok.com)";
const OUT = "public/countries";

/**
 * The city each guide actually quotes cost figures for — not always the
 * capital. Showing Bern while quoting Zurich prices would misrepresent the
 * numbers, so the photo follows the data.
 */
const CITIES = {
  de: "Berlin", fr: "Paris", es: "Madrid", it: "Milan",
  nl: "Amsterdam", be: "Brussels", se: "Stockholm", ch: "Zurich",
  at: "Vienna", pt: "Lisbon", pl: "Warsaw", ie: "Dublin",
  gb: "London", ae: "Dubai", sa: "Riyadh", qa: "Doha",
  kw: "Kuwait City", om: "Muscat", bh: "Manama", us: "New York City",
  ca: "Toronto", au: "Sydney",
};

/** Tried in order until one yields a usable landscape photo. */
const TERMS = (city) => [
  `${city} skyline`,
  `${city} cityscape`,
  `${city} panorama city`,
  `${city} city view`,
];

async function search(term) {
  const url =
    "https://commons.wikimedia.org/w/api.php?action=query&format=json" +
    "&generator=search&gsrnamespace=6&gsrlimit=12" +
    `&gsrsearch=${encodeURIComponent(`filetype:bitmap ${term}`)}` +
    "&prop=imageinfo&iiprop=url|size|extmetadata&iiurlwidth=1600";

  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) return [];
  const json = await res.json();

  return Object.values(json.query?.pages ?? []).map((page) => {
    const info = page.imageinfo?.[0] ?? {};
    const meta = info.extmetadata ?? {};
    const strip = (v) => (v?.value ?? "").replace(/<[^>]*>/g, "").trim();
    return {
      title: page.title,
      width: info.width,
      height: info.height,
      url: info.thumburl,
      source: info.descriptionurl,
      licence: strip(meta.LicenseShortName) || "unknown",
      author: strip(meta.Artist) || "unknown",
    };
  });
}

/** Rejects portraits, small files, and the sports/event shots search leaks in. */
function usable(hit, city) {
  if (!hit.url || !hit.width) return false;
  if (hit.width < hit.height * 1.3) return false;
  if (hit.width < 1200) return false;
  if (/unknown/i.test(hit.licence)) return false;
  const t = hit.title.toLowerCase();
  if (!t.includes(city.toLowerCase().split(" ")[0])) return false;
  return !/(basketball|football|match|festival|protest|parade|concert|portrait|map|logo|diagram)/.test(t);
}

const manifest = {};
await mkdir(OUT, { recursive: true });

for (const [code, city] of Object.entries(CITIES)) {
  let picked = null;

  for (const term of TERMS(city)) {
    const hits = await search(term);
    picked = hits.find((h) => usable(h, city));
    if (picked) break;
    await new Promise((r) => setTimeout(r, 250));
  }

  if (!picked) {
    console.log(`${code}: NO MATCH (${city})`);
    continue;
  }

  const bytes = await fetch(picked.url, { headers: { "User-Agent": UA } }).then(
    (r) => r.arrayBuffer(),
  );

  // 1200x675 (16:9) covers the largest slot the card or hero ever renders at,
  // on a 2x screen, without shipping a 6000px original.
  await sharp(Buffer.from(bytes))
    .resize(1200, 675, { fit: "cover", position: "attention" })
    .jpeg({ quality: 78, mozjpeg: true })
    .toFile(`${OUT}/${code}.jpg`);

  manifest[code] = {
    city,
    title: picked.title.replace(/^File:/, ""),
    author: picked.author,
    licence: picked.licence,
    source: picked.source,
  };
  console.log(`${code}: ${picked.title} — ${picked.licence}`);
  await new Promise((r) => setTimeout(r, 250));
}

await writeFile(
  "scripts/city-photos.json",
  JSON.stringify(manifest, null, 2) + "\n",
);
console.log(`\ndone: ${Object.keys(manifest).length}/${Object.keys(CITIES).length}`);
