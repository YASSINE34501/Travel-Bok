/**
 * AdSense pre-submission audit.
 *
 * Checks the things that get a publisher rejected or silently unpaid, none of
 * which any other gate in this repo covers:
 *
 *   - ads.txt reachable, text/plain, and exactly the IAB line AdSense expects
 *   - exactly ONE adsbygoogle loader per page (two is a policy violation)
 *   - the loader present in the INITIAL HTML, because the ownership crawler
 *     does not reliably execute JavaScript
 *   - every data-ad-slot numerically valid — "article-end" is not an ad unit id
 *   - every ad container carrying a fixed height, so CLS from ads stays zero
 *   - Privacy / Terms / Contact linked from every public page
 *   - no ad units on auth screens
 *
 * Run the dev or start server first, then: npm run check:ads
 *
 *   node scripts/audit-ads.mjs https://www.travlbok.com
 */
const BASE = (process.argv[2] ?? "http://localhost:3000").replace(/\/+$/, "");

const PUBLISHER_ID = "pub-3161798966897202";
const EXPECTED_ADS_TXT = `google.com, ${PUBLISHER_ID}, DIRECT, f08c47fec0942fa0`;

const contentPaths = [];
for (const locale of ["en", "ar"]) {
  contentPaths.push(
    `/${locale}`,
    `/${locale}/explorer`,
    `/${locale}/jobs`,
    `/${locale}/guides`,
    `/${locale}/guides/de`,
    `/${locale}/articles/spain`,
    `/${locale}/about`,
    `/${locale}/privacy`,
    `/${locale}/terms`,
    `/${locale}/contact`,
  );
}
const authPaths = ["/en/login", "/en/register", "/ar/login", "/ar/register"];

const errors = [];
const warnings = [];
const err = (p, m) => errors.push(`${p} :: ${m}`);
const warn = (p, m) => warnings.push(`${p} :: ${m}`);

async function get(path) {
  const res = await fetch(BASE + path, {
    headers: { "user-agent": "TRAVLBOK-ads-audit" },
    signal: AbortSignal.timeout(45_000),
  });
  return { status: res.status, headers: res.headers, body: await res.text() };
}

// --- 1. ads.txt -----------------------------------------------------------
{
  const { status, headers, body } = await get("/ads.txt");
  if (status !== 200) err("/ads.txt", `HTTP ${status}`);

  const type = headers.get("content-type") ?? "";
  if (!type.includes("text/plain")) {
    err("/ads.txt", `content-type is "${type}", AdSense requires text/plain`);
  }

  const lines = body.trim().split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  if (!lines.includes(EXPECTED_ADS_TXT)) {
    err("/ads.txt", `missing the authorisation line. Got: ${JSON.stringify(body.trim())}`);
  }
  // A stray second publisher line is how sites accidentally authorise a
  // reseller they no longer work with.
  const extra = lines.filter((l) => !l.startsWith("#") && l !== EXPECTED_ADS_TXT);
  if (extra.length) warn("/ads.txt", `unexpected extra line(s): ${extra.join(" | ")}`);

  console.log(`ads.txt: HTTP ${status}, ${type.split(";")[0]}, ${lines.length} line(s)`);
}

// --- 2. content pages -----------------------------------------------------
const rows = [];

for (const path of contentPaths) {
  const { status, body: html } = await get(path);
  if (status !== 200) {
    err(path, `HTTP ${status}`);
    continue;
  }

  // Exactly one loader, and it must be in the raw HTML.
  //
  // Match real <script> TAGS, not bare occurrences of the URL: Next.js also
  // serialises the tag into the RSC flight payload (self.__next_f), where it
  // appears escaped as \"src\":\"…\". That copy is data the client uses to
  // reconcile the tree, not a second executable script — counting it reports
  // a policy violation on every page of a correctly configured site.
  const loaders = [...html.matchAll(/<script[^>]+adsbygoogle\.js\?client=([^"'&\s>]+)[^>]*>/g)];
  if (loaders.length === 0) err(path, "no AdSense loader in the initial HTML");
  if (loaders.length > 1) {
    err(path, `${loaders.length} AdSense loaders — two on one page is a policy violation`);
  }
  if (loaders[0] && loaders[0][1] !== `ca-${PUBLISHER_ID}`) {
    err(path, `loader client is "${loaders[0][1]}", expected ca-${PUBLISHER_ID}`);
  }

  // The <head> is what the ownership crawler reads.
  const head = html.split(/<\/head>/i)[0] ?? "";
  if (!/<script[^>]+adsbygoogle\.js/.test(head)) {
    err(path, "loader is not inside <head> of the initial response");
  }

  // Every ad unit needs a numeric slot id.
  const slots = [...html.matchAll(/data-ad-slot="([^"]*)"/g)].map((m) => m[1]);
  for (const s of slots) {
    if (!/^\d{6,}$/.test(s)) {
      err(path, `data-ad-slot="${s}" is not a numeric AdSense ad unit id`);
    }
  }

  // Reserved boxes: each <ins> must sit in a container with a fixed height.
  const containers = [...html.matchAll(/class="([^"]*\bh-\[\d+px\][^"]*)"/g)];
  const insCount = (html.match(/class="[^"]*\badsbygoogle\b/g) ?? []).length;
  const placeholderCount = (html.match(/data-ad-slot-id="/g) ?? []).length;
  if (placeholderCount > 0 && containers.length < placeholderCount) {
    err(
      path,
      `${placeholderCount} ad slot(s) but only ${containers.length} fixed-height container(s) — unreserved slots shift layout`,
    );
  }

  // Legal links must be reachable from every public page.
  for (const [label, re] of [
    ["privacy", /href="\/(en|ar)\/privacy"/],
    ["terms", /href="\/(en|ar)\/terms"/],
    ["contact", /href="\/(en|ar)\/contact"/],
  ]) {
    if (!re.test(html)) err(path, `no link to ${label} on this page`);
  }

  rows.push({
    path,
    loaders: loaders.length,
    slots: placeholderCount,
    units: insCount,
    reserved: containers.length,
  });
}

// --- 3. auth screens must carry no ad units -------------------------------
for (const path of authPaths) {
  const { status, body: html } = await get(path);
  if (status !== 200) {
    warn(path, `HTTP ${status}`);
    continue;
  }
  const units = (html.match(/class="[^"]*\badsbygoogle\b/g) ?? []).length;
  if (units > 0) err(path, `${units} ad unit(s) on an auth screen`);
  if (!/name="robots"[^>]*noindex/i.test(html)) {
    warn(path, "auth screen is not noindex");
  }
}

// --- report ---------------------------------------------------------------
console.table(rows);

if (warnings.length) {
  console.log(`\n## warnings (${warnings.length})`);
  for (const w of warnings) console.log("  ! " + w);
}

if (errors.length) {
  console.log(`\n## errors (${errors.length})`);
  for (const e of errors) console.log("  ✗ " + e);
  console.log(`\nAdSense audit FAILED with ${errors.length} error(s).`);
  process.exit(1);
}

console.log(`\nAll AdSense checks pass across ${contentPaths.length + authPaths.length} routes.`);
