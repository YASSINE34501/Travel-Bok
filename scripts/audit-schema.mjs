/**
 * Structured-data regression audit.
 *
 * The other gates check that schema *exists*. This one checks that it is
 * honest and internally consistent — the failure modes that get structured
 * data ignored or penalised rather than merely unrewarded:
 *
 *   - every JSON-LD block parses
 *   - one @id describes one entity IDENTICALLY on every page and in both
 *     locales (a locale-dependent Organization.url is two conflicting
 *     definitions of the same entity)
 *   - exactly one Organization and one WebSite per page
 *   - WebSite.publisher resolves to the Organization @id actually emitted
 *   - no Review, Rating, AggregateRating or Offer anywhere: TRAVLBOK has no
 *     reviews or products, and inventing them is the fastest route to a
 *     manual action
 *   - Article schema only on real article pages, with a parseable date
 *   - BreadcrumbList positions sequential from 1
 *   - Dataset only on /data, and only with the properties that page can
 *     honestly support — never a licence, a download or a version
 *   - WebPage resolves to the Organization and WebSite actually emitted, so a
 *     page cannot declare itself part of a site that is not there
 *
 * Run the dev or start server first, then: npm run check:schema
 *
 *   node scripts/audit-schema.mjs https://www.travlbok.com
 */
const BASE = (process.argv[2] ?? "http://localhost:3000").replace(/\/+$/, "");

const paths = [];
for (const locale of ["en", "ar"]) {
  paths.push(
    `/${locale}`,
    `/${locale}/explorer`,
    `/${locale}/jobs`,
    `/${locale}/guides`,
    `/${locale}/guides/de`,
    `/${locale}/articles/spain`,
    `/${locale}/compare/morocco/germany`,
    `/${locale}/data`,
    `/${locale}/about`,
    `/${locale}/privacy`,
    `/${locale}/terms`,
    `/${locale}/contact`,
  );
}

/** Schema types that would be a lie on this site if they ever appeared. */
const FORBIDDEN = ["Review", "Rating", "AggregateRating", "Offer", "Product"];

const errors = [];
const warnings = [];
const err = (p, m) => errors.push(`${p} :: ${m}`);
const warn = (p, m) => warnings.push(`${p} :: ${m}`);

/** @id -> canonical JSON of the entity, plus where it was first seen. */
const entityDefinitions = new Map();
const rows = [];

/**
 * Retry before reporting a failure.
 *
 * A dev server compiles routes on demand, so under a multi-route crawl a page
 * nobody has hit yet can time out or 500 while it builds — /en/contact did
 * exactly that here and then returned 200 on three consecutive direct
 * requests. Reporting that as a structured-data failure trains people to
 * ignore the gate, so a route only fails after three attempts with backoff.
 */
async function fetchPage(path, attempt = 1) {
  const res = await fetch(BASE + path, {
    headers: { "user-agent": "TRAVLBOK-schema-audit" },
    signal: AbortSignal.timeout(45_000),
  }).catch(() => null);

  if (res && res.status === 200) return res;
  if (attempt >= 3) return res;
  await new Promise((r) => setTimeout(r, attempt * 2_000));
  return fetchPage(path, attempt + 1);
}

for (const path of paths) {
  const res = await fetchPage(path);
  if (!res || res.status !== 200) {
    err(path, `HTTP ${res ? res.status : "fetch failed"} after 3 attempts`);
    continue;
  }
  const html = await res.text();

  const blocks = [...html.matchAll(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
  )];

  const types = [];
  let orgCount = 0;
  let siteCount = 0;
  let orgId = null;
  let siteId = null;
  let publisherRef = null;
  /** Checked after the loop: JSON-LD order does not guarantee Organization first. */
  const webPageRefs = [];

  for (const [, raw] of blocks) {
    let node;
    try {
      node = JSON.parse(raw);
    } catch (e) {
      err(path, `JSON-LD does not parse: ${e.message}`);
      continue;
    }

    const type = node["@type"];
    types.push(type);

    // Forbidden types, checked over the whole serialised node so a nested
    // aggregateRating cannot hide inside an otherwise valid object.
    const serialised = JSON.stringify(node);
    for (const bad of FORBIDDEN) {
      if (new RegExp(`"@type"\\s*:\\s*"${bad}"`).test(serialised)) {
        err(path, `forbidden schema type "${bad}" — this site has no such data`);
      }
    }

    if (type === "Organization") {
      orgCount++;
      orgId = node["@id"];
      if (!node.name || !node.url || !node.logo) {
        err(path, "Organization missing name, url or logo");
      }
      if (node.sameAs) {
        warn(path, "Organization declares sameAs — verify every profile is genuinely official");
      }
    }

    if (type === "WebSite") {
      siteCount++;
      siteId = node["@id"];
      publisherRef = node.publisher?.["@id"] ?? null;
    }

    if (type === "WebPage") {
      for (const field of ["name", "description", "url", "inLanguage"]) {
        if (!node[field]) err(path, `WebPage missing ${field}`);
      }
      webPageRefs.push({
        isPartOf: node.isPartOf?.["@id"] ?? null,
        publisher: node.publisher?.["@id"] ?? null,
      });
    }

    if (type === "Article") {
      if (!/\/articles\/|\/guides\/|\/about|\/privacy|\/terms/.test(path)) {
        err(path, "Article schema on a page that is not an article");
      }
      for (const field of ["headline", "description"]) {
        if (!node[field]) err(path, `Article missing ${field}`);
      }
      const date = node.dateModified ?? node.datePublished;
      if (date && Number.isNaN(Date.parse(date))) {
        err(path, `Article date is not parseable: "${date}"`);
      }
    }

    if (type === "BreadcrumbList") {
      const items = node.itemListElement ?? [];
      items.forEach((it, i) => {
        if (it.position !== i + 1) {
          err(path, `BreadcrumbList position ${it.position} at index ${i}`);
        }
        if (!it.item) err(path, "BreadcrumbList item missing a URL");
      });
    }

    if (type === "Dataset") {
      // /data is the one page that describes a dataset. Anywhere else this is
      // a page claiming to be something it is not.
      if (!path.endsWith("/data")) {
        err(path, "Dataset schema on a page that publishes no dataset");
      }
      for (const field of ["name", "description", "dateModified", "variableMeasured"]) {
        if (!node[field]) err(path, `Dataset missing ${field}`);
      }
      if (node.dateModified && Number.isNaN(Date.parse(node.dateModified))) {
        err(path, `Dataset dateModified is not parseable: "${node.dateModified}"`);
      }
      // TRAVLBOK declares no licence, ships no download and keeps no version
      // history. Advertising any of them would send a crawler after something
      // that does not exist.
      for (const bad of ["license", "distribution", "downloadURL", "version", "temporalCoverage"]) {
        if (node[bad]) err(path, `Dataset declares ${bad} — the site publishes no such thing`);
      }
    }

    // Entity consistency: the same @id must serialise identically everywhere.
    const id = node["@id"];
    if (id) {
      const prev = entityDefinitions.get(id);
      if (prev && prev.json !== serialised) {
        err(
          path,
          `entity ${id} differs from its definition on ${prev.path} — one @id must describe one entity identically`,
        );
      } else if (!prev) {
        entityDefinitions.set(id, { json: serialised, path });
      }
    }
  }

  if (orgCount !== 1) err(path, `expected exactly 1 Organization, found ${orgCount}`);
  if (siteCount !== 1) err(path, `expected exactly 1 WebSite, found ${siteCount}`);
  if (publisherRef && orgId && publisherRef !== orgId) {
    err(path, `WebSite.publisher "${publisherRef}" does not match the Organization @id "${orgId}"`);
  }
  for (const ref of webPageRefs) {
    if (ref.isPartOf !== siteId) {
      err(path, `WebPage.isPartOf "${ref.isPartOf}" does not match the WebSite @id "${siteId}"`);
    }
    if (ref.publisher !== orgId) {
      err(path, `WebPage.publisher "${ref.publisher}" does not match the Organization @id "${orgId}"`);
    }
  }

  rows.push({ path, blocks: blocks.length, types: types.join("+") });
}

console.table(rows);
console.log(`\ndistinct @id entities: ${[...entityDefinitions.keys()].join(", ")}`);

if (warnings.length) {
  console.log(`\n## warnings (${warnings.length})`);
  for (const w of warnings) console.log("  ! " + w);
}

if (errors.length) {
  console.log(`\n## errors (${errors.length})`);
  for (const e of errors) console.log("  ✗ " + e);
  console.log(`\nSchema audit FAILED with ${errors.length} error(s).`);
  process.exit(1);
}

console.log(`\nAll structured-data checks pass across ${paths.length} routes.`);
