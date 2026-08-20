/**
 * Crawls every indexable route against a running server and asserts the
 * on-page SEO facts that are easy to regress silently: title length, meta
 * description length, exactly one H1, canonical presence, keywords, and
 * FAQPage markup on every visa guide.
 *
 * Run the dev or start server first, then: npm run check:seo
 * Exits non-zero if any check fails, so it can gate a deploy.
 */
const BASE = "http://localhost:3000";

const guides = [
  "de","fr","es","it","nl","be","se","ch","at","pt","pl","ie",
  "gb","ae","sa","qa","kw","om","bh","us","ca","au",
];

const paths = [];
for (const locale of ["en", "ar"]) {
  paths.push(`/${locale}`, `/${locale}/explorer`, `/${locale}/jobs`, `/${locale}/guides`);
  for (const g of guides) paths.push(`/${locale}/guides/${g}`);
  paths.push(`/${locale}/about`, `/${locale}/privacy`, `/${locale}/terms`, `/${locale}/contact`);
}

const strip = (s) => s.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
const rows = [];

for (const path of paths) {
  const html = await (await fetch(BASE + path)).text();

  const title = strip(html.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? "");
  const desc =
    html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "";
  const keywords =
    html.match(/<meta name="keywords" content="([^"]*)"/)?.[1] ?? "";
  const canonical =
    html.match(/<link rel="canonical" href="([^"]*)"/)?.[1] ?? "";
  const hreflang = [...html.matchAll(/hreflang="([^"]*)"/g)].map((m) => m[1]);

  const h1 = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => strip(m[1]));
  const h2 = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map((m) => strip(m[1]));
  const h3 = [...html.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/g)].map((m) => strip(m[1]));

  const schemas = [...html.matchAll(/"@type":"([^"]+)"/g)].map((m) => m[1]);

  // Rough word count of visible body text, for a thin-content signal.
  const bodyText = strip(
    (html.match(/<main[\s\S]*?<\/main>/)?.[0] ?? html)
      .replace(/<script[\s\S]*?<\/script>/g, "")
      .replace(/<style[\s\S]*?<\/style>/g, ""),
  );
  const words = bodyText.split(" ").filter(Boolean).length;

  rows.push({
    path,
    titleLen: title.length,
    title,
    descLen: desc.length,
    desc,
    hasKeywords: keywords.length > 0,
    canonical: canonical.replace("https://travlbok.com", ""),
    hreflang: [...new Set(hreflang)].join(","),
    h1Count: h1.length,
    h1: h1[0] ?? "",
    h2Count: h2.length,
    h3Count: h3.length,
    schemas: [...new Set(schemas)].join(","),
    words,
  });
}

const bad = {
  titleTooLong: rows.filter((r) => r.titleLen > 60),
  titleTooShort: rows.filter((r) => r.titleLen < 30),
  descOutOfRange: rows.filter((r) => r.descLen < 150 || r.descLen > 160),
  multipleH1: rows.filter((r) => r.h1Count !== 1),
  noKeywords: rows.filter((r) => !r.hasKeywords),
  noCanonical: rows.filter((r) => !r.canonical),
  thin: rows.filter((r) => r.words < 300),
  guidesNoFaq: rows.filter(
    (r) => /\/guides\/[a-z]{2}$/.test(r.path) && !r.schemas.includes("FAQPage"),
  ),
};

console.log("pages audited:", rows.length);
for (const [k, v] of Object.entries(bad)) {
  console.log(`\n## ${k}: ${v.length}`);
  v.slice(0, 8).forEach((r) =>
    console.log(
      `  ${r.path.padEnd(24)} t=${r.titleLen} d=${r.descLen} h1=${r.h1Count} w=${r.words}`,
    ),
  );
}

console.log("\n## sample titles");
rows.filter((r) => /guides\/(de|ae)$/.test(r.path) || /\/(en|ar)$/.test(r.path))
  .forEach((r) => console.log(`  [${r.titleLen}] ${r.path} :: ${r.title}`));

console.log("\n## sample descriptions");
rows.filter((r) => /guides\/de$/.test(r.path) || /explorer$/.test(r.path))
  .forEach((r) => console.log(`  [${r.descLen}] ${r.path} :: ${r.desc}`));

console.log("\n## schemas seen");
console.log(" ", [...new Set(rows.flatMap((r) => r.schemas.split(",")))].join(", "));

// "thin" is reported but not enforced: contact pages are legitimately short,
// and Arabic word counts run below English for identical content.
const failed = Object.entries(bad).filter(
  ([key, list]) => key !== "thin" && list.length > 0,
);

if (failed.length) {
  console.error(
    "\nFAIL: " + failed.map(([k, v]) => `${k}=${v.length}`).join(", "),
  );
  process.exit(1);
}
console.log("\nAll SEO checks pass.");
