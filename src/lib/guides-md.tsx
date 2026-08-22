import "server-only";

import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

import type { Locale } from "@/i18n/routing";

/**
 * Reader for the long-form markdown guides in src/data/guides/.
 *
 * These are deliberately separate from the structured guides in src/data/*.ts:
 * those are `GuideSections` objects built so two countries can be *compared*,
 * while these are editorial articles meant to be *read*. Mixing them would put
 * prose into a type whose whole purpose is to keep every country answering the
 * same five questions.
 *
 * Everything here runs at build time only — see `dynamicParams = false` on the
 * page. The markdown lives in the repo, so it cannot change without a deploy,
 * which is why there is no revalidate timer: an ISR window would re-read files
 * that are guaranteed not to have moved.
 */

const GUIDES_DIR = path.join(process.cwd(), "src", "data", "guides");

/**
 * Element overrides for the compiled markdown.
 *
 * The country-requirement tables are far wider than a phone. Giving each one
 * its own scroll container is what keeps the *page* from scrolling sideways —
 * a table left bare would push the whole document past the viewport.
 */
const MDX_COMPONENTS = {
  table: (props: React.ComponentPropsWithoutRef<"table">) => (
    <div className="table-scroll">
      <table {...props} />
    </div>
  ),
  // Markdown links are relative or external; open only the external ones in a
  // new tab, and never without noopener.
  a: ({ href = "", ...props }: React.ComponentPropsWithoutRef<"a">) =>
    href.startsWith("http") ? (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props} />
    ) : (
      <a href={href} {...props} />
    ),
};

/** Frontmatter contract every file in src/data/guides/ must satisfy. */
export type GuideDocFrontmatter = {
  slug: string;
  country_en: string;
  country_ar: string;
  last_reviewed: string;

  title_ar: string;
  title_en: string;
  h1_ar: string;
  h1_en: string;

  meta_description_ar: string;
  meta_description_en: string;

  keywords_ar?: string[];
  keywords_en?: string[];

  canonical_path?: string;

  /**
   * Frequently-asked questions, structured rather than prose.
   *
   * These live in frontmatter and not in the body so the rendered <details>
   * block and the FAQPage schema come from one source. Emitting markup that
   * describes content the crawler cannot see is a structured-data violation,
   * so the two must never drift apart.
   */
  faq?: { q: string; a: string }[];

  cover_image?: {
    url: string;
    source?: string;
    photographer?: string;
    page?: string;
    alt_ar?: string;
    alt_en?: string;
    license?: string;
  };
};

export type GuideDoc = {
  /** URL segment — the filename without .md, e.g. "spain". */
  slug: string;
  frontmatter: GuideDocFrontmatter;
  content: React.ReactElement;
};

/** Slugs for generateStaticParams, sorted so the build output is stable. */
export async function listGuideDocSlugs(): Promise<string[]> {
  let entries: string[];
  try {
    entries = await readdir(GUIDES_DIR);
  } catch {
    // No markdown directory at all is a valid state — the route simply has no
    // pages, exactly like the Supabase fallback in queries.ts degrades quietly.
    return [];
  }

  return entries
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""))
    .sort();
}

/**
 * Remove the cover image, its credit line and the first H1 from the body.
 *
 * These files are published to GitHub as standalone documents too, where a
 * title and a hero image are exactly what you want. On the site the page
 * already renders both from frontmatter, so leaving them in the body produced
 * the image twice and — worse — two <h1> elements, which is one of the failures
 * `npm run check:seo` is built to catch.
 *
 * Stripping here rather than editing the files keeps both surfaces correct from
 * a single source.
 */
function stripHero(source: string): string {
  const match = source.match(/^(---\r?\n[\s\S]*?\r?\n---\r?\n)([\s\S]*)$/);
  if (!match) return source;

  const [, frontmatter, body] = match;

  const cleaned = body
    .replace(/^\s*!\[[^\]]*\]\([^)]*\)\s*$/m, "") // hero image
    .replace(/^\s*<small>[\s\S]*?<\/small>\s*$/m, "") // its credit line
    .replace(/^\s*#\s+.+$/m, "") // the duplicate H1
    .replace(/^\s*\n+/, "");

  return frontmatter + cleaned;
}

/**
 * Compile one article. Returns null when the slug does not exist so the page
 * can call notFound() rather than crashing the build on a bad link.
 */
export async function getGuideDoc(slug: string): Promise<GuideDoc | null> {
  // Defend the path join: a slug arrives from the URL, and "../../.env" would
  // otherwise read outside the guides directory.
  if (!/^[a-z0-9-]+$/.test(slug)) return null;

  let source: string;
  try {
    source = await readFile(path.join(GUIDES_DIR, `${slug}.md`), "utf8");
  } catch {
    return null;
  }

  source = stripHero(source);

  const { content, frontmatter } = await compileMDX<GuideDocFrontmatter>({
    source,
    components: MDX_COMPONENTS,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        // GFM is what turns the requirement tables and strikethroughs in these
        // articles into real markup; without it every table renders as a wall
        // of pipe characters.
        remarkPlugins: [remarkGfm],
      },
    },
  });

  return { slug, frontmatter, content };
}

/** All articles, for the index listing. */
export async function getAllGuideDocs(): Promise<GuideDoc[]> {
  const slugs = await listGuideDocSlugs();
  const docs = await Promise.all(slugs.map(getGuideDoc));
  return docs.filter((d): d is GuideDoc => d !== null);
}

/** Pick the localised half of a bilingual frontmatter pair. */
export function localised(
  frontmatter: GuideDocFrontmatter,
  field: "title" | "h1" | "meta_description" | "country",
  locale: Locale,
): string {
  const key = `${field}_${locale}` as keyof GuideDocFrontmatter;
  const value = frontmatter[key];
  if (typeof value === "string") return value;

  // Arabic is the authored language of these articles; English frontmatter is
  // present for search engines. Falling back to _en keeps a half-translated
  // file rendering instead of throwing.
  const fallback = frontmatter[`${field}_en` as keyof GuideDocFrontmatter];
  return typeof fallback === "string" ? fallback : "";
}

export function keywordsFor(
  frontmatter: GuideDocFrontmatter,
  locale: Locale,
): string[] {
  return (locale === "ar" ? frontmatter.keywords_ar : frontmatter.keywords_en) ?? [];
}
