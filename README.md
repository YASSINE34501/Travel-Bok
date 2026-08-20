# TRAVLBOK

Cost-of-living comparison, degree-to-job matching, and visa guides for migrants
and prospective expats. Bilingual (English LTR / Arabic RTL), built for Core Web
Vitals and AdSense from the first commit.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Supabase ·
`next-intl`

---

## 1. Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000 — you land on `/en` or `/ar` depending on your
`Accept-Language` header.

No database is required to run. Every page falls back to the bundled dataset in
`src/data/` when Supabase credentials are absent, so the app is fully functional
on a fresh clone.

Environment variables (copy `.env.example` to `.env.local`):

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, hreflang, sitemap |
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Live data + auth. Empty = bundled dataset |
| `SUPABASE_SERVICE_ROLE_KEY` | Seed script only, never sent to the browser |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | `ca-pub-…`. Empty = ad slots render as reserved placeholders |

## 2. Database

Run `supabase/schema.sql` in the Supabase SQL editor, then push the bundled
content into it:

```bash
npm run seed
```

### Schema

| Table | Holds |
| --- | --- |
| `countries` | Country identity: code, bilingual name, flag, currency, region |
| `cost_of_living` | Monthly USD costs per capital: rent, groceries, utilities, health insurance, transport, internet, meal, average net salary |
| `education_levels` | Ranked ladder (secondary → doctorate); higher rank satisfies lower requirements |
| `job_fields` | Career fields for the matcher filter |
| `job_opportunities` | Role, country, field, minimum education, demand, salary range, sponsorship and licensing flags |
| `visa_guides` | Bilingual guide body plus `routes` and `requirements` as JSONB |
| `profiles` | Per-user home country, education, field, preferred locale |
| `saved_comparisons` | A user's saved country pairs |
| `contact_messages` | Contact form submissions — insert-only, see below |

Two decisions worth knowing:

- **Bilingual columns (`name_en` / `name_ar`) instead of a JSON blob.** Postgres
  can index and full-text search each language separately later; a blob cannot.
- **RLS from the start.** Editorial tables are `select`-only for everyone
  (the anon key used by SSR included) and writable only by the service role.
  `profiles` and `saved_comparisons` are locked to `auth.uid()`.
- **`contact_messages` is a write-only mailbox.** It has an insert policy and
  no select policy, so anyone can submit and nobody can read messages back
  through the API. You read them in the Supabase dashboard.

Costs are stored in USD across the board so countries stay directly comparable
without a live FX feed. Job salaries stay in the destination's own currency,
because that is how local job boards advertise them.

## 3. Folder structure

```
src/
├── app/
│   ├── layout.tsx              # passthrough; real <html> lives in [locale]
│   ├── sitemap.ts robots.ts    # locale-aware, with hreflang alternates
│   └── [locale]/
│       ├── layout.tsx          # <html lang dir>, fonts, nav, footer, JSON-LD
│       ├── page.tsx            # home
│       ├── explorer/           # cost comparison tool
│       ├── jobs/               # degree → job matcher
│       ├── guides/[country]/   # SEO visa guides (prerendered, both locales)
│       ├── login/ register/    # Supabase auth screens (noindex)
│       ├── privacy/ terms/ about/  # policy pages required for AdSense review
│       └── contact/            # contact form + server action
├── components/
│   ├── ui/                     # button, card, badge, field primitives
│   ├── layout/                 # navbar, footer, locale switcher
│   ├── ads/                    # AdSlot, AdSenseScript, ConsentBanner
│   ├── auth/                   # AuthForm, AccountMenu
│   ├── legal/                  # shared policy-page renderer
│   ├── common/                 # DataProvenance
│   ├── explorer/CostComparer.tsx
│   └── jobs/JobMatcher.tsx
├── data/                       # bundled dataset = Supabase fallback
├── i18n/                       # routing, navigation, request config
├── lib/                        # types, formatting, SEO helpers, queries
└── proxy.ts                    # locale negotiation (Next 16 renamed middleware → proxy)
messages/en.json  messages/ar.json
supabase/schema.sql  scripts/seed.mjs
```

## 4. How the pieces work

### Localization

`src/i18n/routing.ts` is the single source of truth. `localePrefix: "always"`
keeps every language on one canonical indexable URL (`/en/...`, `/ar/...`),
which is what makes hreflang unambiguous.

RTL is handled by the document, not by duplicated CSS: `[locale]/layout.tsx`
sets `dir` from `localeDirection`, and components use **logical** Tailwind
utilities (`ms-`, `pe-`, `text-start`, `end-4`) so one set of classes serves both
directions. Only genuinely directional glyphs get the `.flip-rtl` utility.

Arabic renders in Cairo with a looser line height, and keeps Latin digits — the
figures are the point of a comparison tool, and mixed numeral systems make them
harder to scan.

Adding a language is: add the code to `locales`, add `messages/xx.json`, add a
direction to `localeDirection`. Key parity between message files is worth a CI
check.

### Landing page

`src/app/[locale]/page.tsx` composes `components/home/`: hero, stats, features,
how-it-works, three product previews, popular destinations, final CTA.

**The previews render real data, not mockups.** The hero card, the cost table
and the job list all read from the same dataset the tools use, so a screenshot
of the landing page cannot drift from what the product actually shows.

**The stats are counted at build time, and are about the dataset — not users.**
There is deliberately no "50K+ people" figure. This site has no user numbers to
report, and inventing them on a page aimed at people making an expensive,
irreversible decision would contradict the sourcing disclosure carried on every
cost and visa page. The four figures are countries compared, guides published,
cost categories tracked, and languages — each derived from the data itself.

Visa complexity on the guide preview is derived from each guide's own fastest
published processing time, not assigned editorially. A hand-set difficulty score
would be an opinion presented as data on a page where every other number cites a
source.

### Scroll reveal

`Reveal` fades a section in the first time it enters the viewport. Three
constraints make it safe rather than decorative:

- **It holds no React state.** The hidden step is a `data-reveal` attribute
  written to the node inside the effect, so the markup is always in the DOM and
  always visible without JavaScript. A reveal whose hidden state lives in the
  initial CSS hides text from crawlers and loses content when a script fails.
- **"Already scrolled past" counts as shown.** An anchor jump, a restored scroll
  position or a fast fling can move past an element without the observer ever
  seeing it intersect. Without `boundingClientRect.top < 0` as a second
  condition, that text stays invisible permanently — verified by jumping
  straight to the page bottom, which stranded 23 blocks before the fix.
- **It disconnects after firing**, and does nothing at all under
  `prefers-reduced-motion`.

### Design system

Tokens live in `globals.css` under `@theme`; components never hard-code a hex.
Swapping the palette is a change to those values, not a rewrite of every
component.

#### Palette, type and motion

- **Palette.** Brand blue `#2563EB` at `brand-600`, with `brand-700` (`#1d4ed8`,
  6.70:1 on white) carrying links and hover states. The accent is **amber**, not
  a second blue — the cost bars put source and destination side by side, and two
  blues at the same weight are unreadable next to each other.
- **Backdrop.** A slate grid: two 1px lines at ~4.5% opacity on a 32px pitch,
  fixed-attachment. Texture at reading distance, invisible in print.
- **Type.** Plus Jakarta Sans for Latin headings, Inter for body, Cairo for
  Arabic. RTL headings explicitly fall back to Cairo — Jakarta's tight tracking
  is a Latin optimisation and does Arabic no favours.
- **Motion.** One shared `.lift` utility (translate + shadow, 200ms) on anything
  clickable, neutralised under `prefers-reduced-motion` while keeping the hover
  shadow so interactivity is still signalled.

`npm run check:contrast` reads the hex values straight out of `globals.css`, so
it can never drift from the tokens, and asserts every foreground/background pair
against WCAG AA. Form control borders use a dedicated `--color-line-input` token:
a field's border is the only thing marking its boundary, which puts it under
WCAG 1.4.11 (3:1), and the lighter grey used for decorative dividers fails it.

### Logo

`src/components/brand/Logo.tsx` — a paper plane banking inside a gradient blue
pill, with a compass tick marking the heading it flies on: direction and
departure in one mark.

Inline SVG, so it costs no request, inherits `currentColor`, and can never be
the LCP element. It takes a `gradientId` prop because two instances on one page
(navbar and footer) sharing a `<defs>` id silently breaks the second one. The
favicon at `src/app/icon.svg` is the same mark redrawn on a 32px grid.

### Glass panels

The tool input panels are `bg-surface/85 backdrop-blur-md backdrop-saturate-150`
over the grid backdrop.

These use **Tailwind's backdrop utilities, not a hand-written `.glass` class**.
A custom class with `backdrop-filter` inside `@layer utilities` looks correct in
the source and is silently stripped by Lightning CSS during the build — the blur
simply never reaches the browser. Tailwind's own `backdrop-*` utilities emit it
correctly. If you reintroduce a custom class here, verify the computed
`backdrop-filter` in the browser rather than trusting the stylesheet.

### Flags

Country flags are real SVGs from flagcdn, rendered by `<Flag>`.

**Emoji flags are not an option.** They are regional-indicator pairs, and
Windows ships no glyphs for them — every flag degrades to the bare country code
("MA", "DE"). No font stack fixes this.

Because a native `<option>` cannot contain an image, the country pickers are a
custom `<CountrySelect>` implementing the WAI-ARIA combobox/listbox pattern:
roving `aria-activedescendant`, Arrow/Home/End navigation, printable-character
type-ahead, Escape to close, and focus returned to the trigger on select.
Pseudo-options such as "any country" carry a non-ISO code and get a globe icon,
since requesting a flag for them would 404.

Flags load through a plain `<img>`, not `next/image`: they are ~1KB vectors at a
fixed display size, and the optimiser would rasterise them for no gain. SVG
inside `<img>` is sandboxed by the browser, so this carries none of the risk
that enabling `dangerouslyAllowSVG` would.

### Control alignment

The explorer's filter panel is one 10-column grid on `lg`, split 3 / 1 / 3 / 3
(origin, swap, destination, income), and `items-start` — not `items-end`.

That distinction was the bug. `items-end` aligns grid item *bottoms*, and the
income field is taller than the others because it carries a helper line, so its
label and input sat 38px above the two country selects. Aligning to the top puts
every label on one baseline and every control on the next, and lets the helper
text hang below without moving anything.

The swap button gets `mt-[1.875rem]`: 26px for the label plus its gap, and half
the 8px difference between the 48px control and the 40px button, so it centres
on the control row rather than the label row.

The salary hint reserves `min-h-8` (two lines). It interpolates a figure that
rewraps as the country changes, and without a floor the whole panel would jump
on every swap.

### Currency and numeric input

Two things in the cost explorer are easy to get wrong and were:

**Currency.** CLDR gives Arabic some currency symbols that are Latin
abbreviations glued to a symbol: USD becomes "US$", GBP "UK£", CAD "CA$".
Inside Arabic copy those read as a mangled fragment of English rather than a
price. `format.ts` therefore switches to the ISO code in Arabic **when the
symbol contains Latin letters**, giving "2,000 USD"; currencies with genuine
native symbols (€, ر.س., د.إ.) keep them. The rule is derived from the symbol
itself, so a currency added later is handled without editing a list. For CHF,
SEK and PLN the symbol already is the code, making it a no-op.

**The income field** is `type="text"` with `inputMode="numeric"`, not
`type="number"` — a number input still accepts `e`, `+` and `-`, changes value
on scroll, and reports an empty string for invalid input. Sanitising instead
maps Arabic-Indic (٠-٩) and Eastern Arabic-Indic (۰-۹) numerals to Latin, since
an Arabic keyboard types those and dropping them would empty the field for
exactly this site’s audience. It also truncates at the first decimal separator
rather than stripping it, because stripping turns a pasted "2,500.75" into
"250075" — a 100x error.

The currency chip inside the field carries no `dir` override. `end-3.5` must
resolve against the page direction so the chip lands on the same side as the
input’s reserved `pe-16`; setting `dir="ltr"` flips one and not the other, and
the digits then run underneath it in Arabic.

### Dashboard layout

`DashboardLayout` gives the explorer and job matcher a
`minmax(0,1fr) / 300px` grid from `lg` up, with a `sticky top-20` ad rail on the
inline-end side. The rail is `h-fit` — without that it stretches to the grid row
height and `position: sticky` silently stops working.

It collapses entirely below `lg`. A 300px sidebar on a phone either squeezes the
tool or pushes ads above the fold, and AdSense treats the latter as a policy
problem.

### Country guides

22 destinations, each rendered in both locales (44 static pages). Content lives
in `src/data/`:

| File | Holds |
| --- | --- |
| `guides.ts` | The original eight guides, plus the aggregator that merges every source and sorts them |
| `guides-europe.ts`, `guides-europe-2.ts` | France, Spain, Italy, Belgium, Sweden, Switzerland, Austria, Poland, Ireland |
| `guides-gulf.ts` | Saudi Arabia, Qatar, Kuwait, Oman, Bahrain |
| `guide-sections.ts` | Standardised sections for the original eight, merged on at aggregation |
| `images.ts` | Per-country image manifest and bilingual alt text |

Every guide carries the same five-part body, defined by the `GuideSections`
type: immigration pathways, residency and legal framework, cost of living,
job market and qualifications, and life quality. It is **structured data, not
prose blobs** — that is what lets two countries be compared rather than merely
read one after the other, and it is why adding a country cannot quietly skip a
section.

One editorial rule is applied consistently in the Gulf guides: residence is
tied to employment and naturalisation is not a realistic outcome. Each of those
six guides says so explicitly rather than leaving it implied. Guides that omit
this leave people planning for a future the system does not offer.

### Images

Every guide shows a real photo of the city that guide quotes figures for —
Zurich rather than Bern, Milan rather than Rome. A capital shot beside another
city's prices misreads.

**Sourced from Wikimedia Commons, served from `/public`.** Not a stock library
and not hotlinked: no third-party image host in the critical path, nothing to
license, and no photo id that rots into a 404. `scripts/fetch-city-photos.mjs`
searches Commons, rejects portraits and off-topic results, resizes to 1200x675
with sharp, and records author + licence + source for each file. 22 photos,
2.3MB total, ~100KB each.

**Attribution is a licence condition, not a nicety.** Almost every file is
CC-BY or CC-BY-SA, which require the author, the licence and a link to the
source wherever the image appears. `PhotoCredits` renders that on both the
index (collapsed, since 22 credits would outweigh the content) and each guide
page, with `rel="license"` links back to Commons. If you replace a photo,
regenerate the manifest rather than editing `src` by hand — dropping the credit
puts the site out of compliance.

Layout stability is structural: aspect ratios are fixed in CSS
(`aspect-[21/9]`, `h-48`) so the box exists at final size before paint, and
`sizes` stops a 390px phone receiving a 1200px file.

Alt text is derived from the city name at render time rather than stored.
Hand-written descriptions drift the moment a photo is replaced, and an alt
string that misdescribes the image is worse than a plain one.

### Flag rendering

Flags are SVGs from flagcdn, never emoji — everywhere, including inside the
country pickers, the guide index cards and the guide page header.

Flag emoji are regional-indicator pairs and **Windows ships no glyphs for
them**, so `🇦🇺` renders as the literal text "AU". That is what made the guide
cards look like unfinished wireframes, and no font stack fixes it.


### Data access

Pages never touch Supabase directly. They call `src/lib/queries.ts`, which tries
the database and falls back to `src/data/` on any error or empty result. That
keeps the fallback logic in one place and means a database outage degrades to
slightly stale content instead of a 500.

### Performance

- 43 pages are **prerendered** across both locales and revalidate on a 12-hour
  timer. Only `/explorer` renders per request, because `?from=&to=` makes a
  comparison shareable.
- Filters use native `<select>` rather than a JS combobox: no bundle cost, real
  mobile pickers, RTL for free, and INP stays flat on low-end phones.
- The mobile menu is a `<details>` element — zero hydration cost.
- Fonts are `next/font` with `display: swap` and preloaded subsets.
- `optimizePackageImports` ships only the Lucide icons actually used.
- Auth state resolves in the browser, not in the server layout. Reading the
  session server-side would opt every page out of static rendering; the cost is
  a reserved-width slot in the nav on first paint.
- The consent banner reads localStorage through `useSyncExternalStore` with an
  "unknown" server snapshot, so the prerendered HTML never contains it — no
  hydration mismatch and no layout shift for returning visitors.

### AdSense

`AdSlot` uses **fixed** heights, not min-heights — each slot is the exact size of
the standard AdSense unit at that breakpoint (320×100 → 728×90 leaderboard,
300×250 rectangle, 336×280 → 300×250 inline) and cannot grow once the ad
arrives. That makes CLS from advertising structurally zero rather than merely
small. The script loads once from the root layout with
`strategy="afterInteractive"` so it never blocks LCP, and a blocked or offline ad
script is caught rather than breaking the page.

With `NEXT_PUBLIC_ADSENSE_CLIENT` unset, slots render as labelled placeholders —
useful while your account is still in review. Slot IDs are placeholders; replace
them with your real ad unit IDs.

Placement is deliberate: one unit after the fold on content pages, one mid-guide
after the intro, one at the end. Nothing above the fold, nothing between a
heading and its content.

### Auth

`/login` and `/register` talk to Supabase Auth from the browser. Supabase
returns English error strings whatever the locale, so `AuthForm` maps them onto
our own message keys — the Arabic page stays Arabic, and the form never echoes
back more detail than a sign-in screen should.

Email confirmation and password resets land on `/auth/callback`, which exchanges
the one-time code for a session cookie and redirects into the localised app. The
locale is read from our own allow-list, never taken raw from the URL.

Both screens are `noindex` and excluded from the sitemap and robots.txt. With no
Supabase credentials configured, the account menu disappears from the nav and the
pages explain that accounts are switched off — every tool still works.

### Consent and cookies

`ConsentBanner` records a personalised / non-personalised choice, sets
`requestNonPersonalizedAds` on the AdSense queue before any slot renders, and is
reopenable from the "Cookie settings" link in the footer — which is what the
privacy policy promises. No recorded choice means non-personalised: ads still
serve, without assuming consent nobody gave.

**This is not a certified CMP.** For visitors in the EEA, UK and Switzerland,
Google requires a certified consent management platform before it will serve ads
at all. Turn on Google's own messaging (Funding Choices) in
**AdSense → Privacy & messaging** before taking European traffic. This banner
covers our own cookie choice and the disclosure obligation; it does not replace
that requirement.

### Data provenance

`DataProvenance` sits under the cost explorer and inside every visa guide. It
states plainly that figures are estimates for shortlisting, shows when they were
last reviewed, and expands into the sources they are compiled from plus the
destination's official immigration authority.

It is a `<details>` element, so the source links stay in the DOM for crawlers —
which is what makes the E-E-A-T signal real rather than cosmetic — and it costs
no JavaScript.

### SEO

`src/lib/seo.tsx` centralises canonical + hreflang alternates (including
`x-default`) and the Schema.org builders. Guide pages emit `Article`,
`BreadcrumbList` and `FAQPage` — each visa route becomes an FAQ entry, which is
what earns the rich result. `Organization` and `WebSite` come from the root
layout, and policy pages emit `Article`.

**Title tags are not H1s.** `src/lib/seo-content.ts` builds search-intent titles
from candidate lists and returns the longest that fits a 60-character budget —
*after* the layout's `title.template` appends the brand. Two things this caught:
36 of 60 pages had titles Google would truncate (Switzerland was 81 characters),
and appending the brand in both places produced `… | TRAVLBOK | TRAVLBOK`.

**Guide descriptions are generated per country, not templated.** Each one
interpolates that country's own city, rent, salary and route count, so 22
guides do not ship 22 near-duplicate snippets. `fitDescription` appends
progressively shorter tail clauses until the string lands in the 150–160 band,
so nobody counts characters by hand.

**Internal linking.** `RelatedLinks` puts contextual links from the cost
explorer into the guide and job matcher for the country being compared, with
anchor text that names the destination. The jobs page reads `?country=` for
this reason — the link says "in-demand jobs in Canada", so it has to actually
filter to Canada.

```bash
npm run check:seo
```

Crawls all 60 indexable routes against a running server and fails on title
length, description length, multiple or missing H1, missing canonical, missing
keywords, or a visa guide without `FAQPage`. Thin-content counts are reported
but not enforced: contact pages are legitimately short, and Arabic word counts
run ~20% below English for identical content.

