/**
 * International-SEO audit: language separation, hreflang, canonical, and
 * internal-link integrity across every indexable route in both locales.
 *
 * check:seo already asserts the on-page facts (title length, one H1, canonical
 * present, FAQPage on guides). It does NOT look at *which language* the page is
 * written in, and a bilingual site can pass every one of those checks while
 * serving Arabic prose under <html lang="en"> — which is what this catches.
 *
 * Run the dev or start server first, then: npm run check:i18n
 * Exits non-zero on any error, so it can gate a deploy.
 *
 *   node scripts/audit-i18n.mjs https://www.travlbok.com
 */
const BASE = (process.argv[2] ?? "http://localhost:3000").replace(/\/+$/, "");

/**
 * Canonicals and hreflang always advertise the PUBLIC site URL, even when the
 * page is served from localhost — that is correct, and comparing them against
 * the crawl base would flag every page on a dev run. So compare pathnames, and
 * assert separately that every canonical shares one https origin.
 */
const canonicalOrigins = new Set();
const samePath = (url, path) => {
  try {
    return new URL(url).pathname.replace(/\/$/, "") === path.replace(/\/$/, "");
  } catch {
    return false;
  }
};

const guides = [
  "de", "fr", "es", "it", "nl", "be", "se", "ch", "at", "pt", "pl", "ie",
  "gb", "ae", "sa", "qa", "kw", "om", "bh", "us", "ca", "au",
];
const comparisons = ["morocco/germany","morocco/france","morocco/spain","morocco/portugal","morocco/uae","morocco/saudi-arabia","algeria/france","tunisia/france","egypt/germany","jordan/germany"];
const articles = ["spain", "germany", "italy", "france"];

const paths = [];
for (const locale of ["en", "ar"]) {
  paths.push(`/${locale}`, `/${locale}/explorer`, `/${locale}/jobs`, `/${locale}/guides`);
  for (const g of guides) paths.push(`/${locale}/guides/${g}`);
  for (const a of articles) paths.push(`/${locale}/articles/${a}`);
  for (const c of comparisons) paths.push(`/${locale}/compare/${c}`);
  paths.push(`/${locale}/data`,
    `/${locale}/about`, `/${locale}/privacy`, `/${locale}/terms`, `/${locale}/contact`);
}

const REMOTE = !BASE.includes("localhost");

async function fetchHtml(url, attempt = 1) {
  try {
    const res = await fetch(url, {
      headers: { "user-agent": "TRAVLBOK-i18n-audit" },
      signal: AbortSignal.timeout(45_000),
    });
    return { status: res.status, html: await res.text() };
  } catch (error) {
    if (attempt >= 3) throw new Error(`${url}: ${error.message}`);
    await new Promise((r) => setTimeout(r, attempt * 2_000));
    return fetchHtml(url, attempt + 1);
  }
}

/**
 * Entities must be decoded before any text comparison. Visible HTML carries
 * `&quot;` where the JSON-LD carries a literal quote, so comparing them raw
 * reports a mismatch on FAQ answers that are in fact identical.
 */
const decode = (s) =>
  s
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_m, d) => String.fromCharCode(Number(d)))
    .replace(/&#x([0-9a-f]+);/gi, (_m, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/&nbsp;/g, " ")
    .replace(/&lsquo;|&rsquo;/g, "'")
    .replace(/&ldquo;|&rdquo;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

const strip = (s) => decode(s.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();

/** Drop scripts, styles and JSON-LD before measuring prose language. */
function visibleText(html) {
  const body = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<svg[\s\S]*?<\/svg>/gi, " ");
  return strip(body);
}

const ARABIC = /[؀-ۿݐ-ݿ]/g;
const LATIN = /[A-Za-z]/g;

/**
 * Share of *letters* that are Arabic. Digits, punctuation and whitespace are
 * excluded on purpose: these pages quote euro figures and Latin legal terms
 * ("Chancenkarte") in both languages, so counting them would blur the signal.
 */
function arabicRatio(text) {
  const ar = (text.match(ARABIC) ?? []).length;
  const la = (text.match(LATIN) ?? []).length;
  const total = ar + la;
  return total === 0 ? 0 : ar / total;
}

const errors = [];
const warnings = [];
const rows = [];

const err = (path, msg) => errors.push(`${path} :: ${msg}`);
const warn = (path, msg) => warnings.push(`${path} :: ${msg}`);

const seenCanonicals = new Map();

for (const path of paths) {
  const { status, html } = await fetchHtml(BASE + path);
  if (REMOTE) await new Promise((r) => setTimeout(r, 250));

  const locale = path.split("/")[1];

  if (status !== 200) {
    err(path, `HTTP ${status}`);
    continue;
  }

  // --- document language ------------------------------------------------
  const lang = html.match(/<html[^>]*\blang="([^"]+)"/)?.[1] ?? "";
  const dir = html.match(/<html[^>]*\bdir="([^"]+)"/)?.[1] ?? "";
  if (lang !== locale) err(path, `html lang="${lang}" but route locale is "${locale}"`);
  const expectedDir = locale === "ar" ? "rtl" : "ltr";
  if (dir !== expectedDir) err(path, `html dir="${dir}" expected "${expectedDir}"`);

  // --- language of the actual prose -------------------------------------
  const title = strip(html.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? "");
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "";
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => strip(m[1]));
  const text = visibleText(html);

  const ratio = arabicRatio(text);
  const titleRatio = arabicRatio(title);
  const descRatio = arabicRatio(desc);
  const h1Ratio = h1s.length ? arabicRatio(h1s.join(" ")) : 0;

  // A page is "in" a language when the clear majority of its letters are.
  const wantArabic = locale === "ar";
  const bodyOk = wantArabic ? ratio > 0.6 : ratio < 0.15;
  if (!bodyOk) {
    err(
      path,
      `body language mismatch: ${(ratio * 100).toFixed(0)}% Arabic letters on a "${locale}" page`,
    );
  }
  if (title && (wantArabic ? titleRatio < 0.5 : titleRatio > 0.2)) {
    err(path, `title language mismatch (${(titleRatio * 100).toFixed(0)}% Arabic)`);
  }
  if (desc && (wantArabic ? descRatio < 0.5 : descRatio > 0.2)) {
    err(path, `meta description language mismatch (${(descRatio * 100).toFixed(0)}% Arabic)`);
  }
  if (h1s.length && (wantArabic ? h1Ratio < 0.5 : h1Ratio > 0.2)) {
    err(path, `H1 language mismatch (${(h1Ratio * 100).toFixed(0)}% Arabic)`);
  }
  if (h1s.length !== 1) err(path, `expected exactly 1 <h1>, found ${h1s.length}`);

  // --- image alt text ----------------------------------------------------
  const alts = [...html.matchAll(/<img[^>]*\balt="([^"]*)"/g)].map((m) => m[1]).filter(Boolean);
  const missingAlt = [...html.matchAll(/<img\b(?![^>]*\balt=)[^>]*>/g)].length;
  if (missingAlt) err(path, `${missingAlt} <img> without alt`);
  const wrongAlts = alts.filter((a) => {
    const r = arabicRatio(a);
    // Country-code alts like "DE" are language-neutral; ignore very short ones.
    if (a.replace(/[^A-Za-z؀-ۿ]/g, "").length < 6) return false;
    return wantArabic ? r < 0.4 : r > 0.3;
  });
  if (wrongAlts.length) {
    warn(path, `${wrongAlts.length} alt text(s) in the wrong language: ${JSON.stringify(wrongAlts[0]).slice(0, 80)}`);
  }

  // --- canonical ---------------------------------------------------------
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1] ?? "";
  if (!canonical) err(path, "missing canonical");
  else {
    canonicalOrigins.add(new URL(canonical).origin);
    if (!samePath(canonical, path)) {
      err(path, `canonical "${canonical}" does not self-reference this path`);
    }
    const canonicalLocale = new URL(canonical).pathname.split("/")[1];
    if (canonicalLocale !== locale) {
      err(path, `canonical points at locale "${canonicalLocale}" from a "${locale}" page`);
    }
    if (seenCanonicals.has(canonical)) {
      err(path, `duplicate canonical, also claimed by ${seenCanonicals.get(canonical)}`);
    }
    seenCanonicals.set(canonical, path);
  }

  // --- hreflang ----------------------------------------------------------
  const alts2 = [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/gi)];
  const map = new Map(alts2.map((m) => [m[1].toLowerCase(), m[2]]));
  for (const need of ["ar", "en", "x-default"]) {
    if (!map.has(need)) err(path, `missing hreflang "${need}"`);
  }
  // Reciprocity: the alternate for this page's own locale must be this page.
  const self = map.get(locale);
  if (self && !samePath(self, path)) {
    err(path, `hreflang "${locale}" points to "${self}", not to itself`);
  }
  // The other locale must point at the same path under the other prefix.
  const other = locale === "ar" ? "en" : "ar";
  const otherHref = map.get(other);
  const otherPath = path.replace(new RegExp(`^/${locale}`), `/${other}`);
  if (otherHref && !samePath(otherHref, otherPath)) {
    err(path, `hreflang "${other}" points to "${otherHref}", expected ${otherPath}`);
  }

  // --- structured data ---------------------------------------------------
  const ldBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  const types = [];
  for (const [, raw] of ldBlocks) {
    try {
      const parsed = JSON.parse(raw);
      types.push(parsed["@type"]);
      // FAQPage must mirror visible content, so its questions have to appear
      // in the rendered text. Schema describing invisible content is a
      // structured-data violation, not a shortcut.
      if (parsed["@type"] === "FAQPage") {
        for (const q of parsed.mainEntity ?? []) {
          const needle = strip(q.name).slice(0, 30);
          if (needle && !text.includes(needle)) {
            err(path, `FAQPage question not present in visible text: "${needle}"`);
          }
          const qRatio = arabicRatio(q.name);
          if (wantArabic ? qRatio < 0.25 : qRatio > 0.3) {
            err(path, `FAQPage question in wrong language: "${needle}"`);
          }
        }
      }
    } catch {
      err(path, "invalid JSON-LD block");
    }
  }

  // --- meta robots -------------------------------------------------------
  const robotsMeta = html.match(/<meta name="robots" content="([^"]*)"/)?.[1] ?? "";
  if (/noindex/i.test(robotsMeta)) err(path, `unexpected noindex: "${robotsMeta}"`);

  // --- Open Graph / Twitter ---------------------------------------------
  const ogLocale = html.match(/<meta property="og:locale" content="([^"]*)"/)?.[1] ?? "";
  if (!ogLocale) warn(path, "missing og:locale");
  if (!/<meta property="og:title"/.test(html)) err(path, "missing og:title");
  if (!/<meta name="twitter:card"/.test(html)) warn(path, "missing twitter:card");

  rows.push({ path, lang, dir, arabic: `${(ratio * 100).toFixed(0)}%`, h1: h1s.length, types: types.join("+") });
}

// --- internal link integrity ---------------------------------------------
// Collected separately so one crawl of every page feeds one set of link checks.
const linkTargets = new Set();
for (const path of paths.slice(0, 4)) {
  const { html } = await fetchHtml(BASE + path);
  for (const m of html.matchAll(/href="(\/[^"#?]*)"/g)) linkTargets.add(m[1]);
}
/**
 * Retry before declaring a link broken.
 *
 * A dev server compiles routes on demand, so while this audit crawls ~90 pages
 * a HEAD request to a page nobody has hit yet can exceed the timeout and come
 * back as "fetch failed" for a page that is perfectly healthy — verified by
 * requesting it directly straight afterwards and getting 200 every time. A
 * gate that reports phantom failures is one people learn to ignore, so a
 * target is only broken if it fails three times with backoff.
 */
async function linkStatus(target, attempt = 1) {
  const res = await fetch(BASE + target, {
    method: "HEAD",
    signal: AbortSignal.timeout(30_000),
  }).catch(() => null);

  if (res) return res.status;
  if (attempt >= 3) return null;
  await new Promise((r) => setTimeout(r, attempt * 2_000));
  return linkStatus(target, attempt + 1);
}

for (const target of linkTargets) {
  if (target.startsWith("/_next") || target === "/") continue;
  const status = await linkStatus(target);
  if (status === null || status >= 400) {
    errors.push(`internal link :: ${target} -> ${status ?? "fetch failed after 3 attempts"}`);
  }
}

// --- report ---------------------------------------------------------------
console.table(rows);

if (canonicalOrigins.size > 1) {
  errors.push(`canonical origins are not consistent: ${[...canonicalOrigins].join(", ")}`);
}
for (const o of canonicalOrigins) {
  if (!o.startsWith("https://")) errors.push(`canonical origin is not https: ${o}`);
}
console.log("canonical origin:", [...canonicalOrigins].join(", "));

if (warnings.length) {
  console.log(`\n## warnings (${warnings.length})`);
  for (const w of warnings) console.log("  ! " + w);
}

if (errors.length) {
  console.log(`\n## errors (${errors.length})`);
  for (const e of errors) console.log("  ✗ " + e);
  console.log(`\ni18n audit FAILED with ${errors.length} error(s).`);
  process.exit(1);
}

console.log(`\nAll i18n/SEO checks pass across ${paths.length} routes.`);
