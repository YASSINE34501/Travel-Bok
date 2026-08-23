import "server-only";

import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

import type { Locale } from "@/i18n/routing";

/**
 * Reader for the long-form markdown articles in src/data/guides/.
 *
 * These are deliberately separate from the structured guides in src/data/*.ts:
 * those are `GuideSections` objects built so two countries can be *compared*,
 * while these are editorial articles meant to be *read*. Mixing them would put
 * prose into a type whose whole purpose is to keep every country answering the
 * same five questions.
 *
 * **One file per locale — `{slug}.{locale}.md`.** An earlier version kept one
 * bilingual file whose body was Arabic and whose frontmatter carried both
 * languages, which meant /en/articles/* served Arabic prose under
 * <html lang="en"> with Arabic FAQPage markup: a language-mismatch and a
 * structured-data problem at once. Splitting per locale makes the wrong-language
 * page impossible to build rather than merely discouraged.
 *
 * Everything here runs at build time — see `dynamicParams = false` on the page.
 * The markdown lives in the repo, so it cannot change without a deploy, which
 * is why there is no revalidate timer. next.config.ts traces these files into
 * the deployment because the footer reads them at render time on every page.
 */

const GUIDES_DIR = path.join(process.cwd(), "src", "data", "guides");

/** Frontmatter contract every file in src/data/guides/ must satisfy. */
export type GuideDocFrontmatter = {
  locale: Locale;
  slug: string;
  country: string;
  last_reviewed: string;

  title: string;
  h1: string;
  meta_description: string;
  keywords?: string[];

  cover_image?: {
    url: string;
    source?: string;
    photographer?: string;
    page?: string;
    alt?: string;
    license?: string;
  };

  /**
   * Frequently-asked questions, structured rather than prose.
   *
   * These live in frontmatter and not in the body so the rendered <details>
   * block and the FAQPage schema come from one source. Emitting markup that
   * describes content the crawler cannot see is a structured-data violation,
   * so the two must never drift apart.
   */
  faq?: { q: string; a: string }[];
};

export type GuideDoc = {
  /** URL segment — the filename stem, e.g. "spain". */
  slug: string;
  locale: Locale;
  frontmatter: GuideDocFrontmatter;
  content: React.ReactElement;
};

/**
 * Every requirement table in these articles is wider than a 375px phone. The
 * `.table-scroll` styles exist in globals.css, but markdown emits a bare
 * <table> with nowhere to hang the class — so the wrapper is injected here.
 *
 * Without it the table stretches the document instead of scrolling inside its
 * own box, and the whole page scrolls sideways on mobile. Verified at 375px:
 * scrollWidth 484 before, equal to the viewport after.
 */
const MDX_COMPONENTS = {
  table: (props: React.ComponentPropsWithoutRef<"table">) => (
    <div className="table-scroll">
      <table {...props} />
    </div>
  ),
};

const FILE_RE = /^([a-z0-9-]+)\.([a-z]{2})\.md$/;

async function listFiles(): Promise<{ slug: string; locale: string }[]> {
  let entries: string[];
  try {
    entries = await readdir(GUIDES_DIR);
  } catch {
    // No markdown directory at all is a valid state — the route simply has no
    // pages, the same way queries.ts degrades quietly to its bundled dataset.
    return [];
  }

  return entries
    .map((f) => FILE_RE.exec(f))
    .filter((m): m is RegExpExecArray => m !== null)
    .map((m) => ({ slug: m[1], locale: m[2] }))
    .sort((a, b) => a.slug.localeCompare(b.slug));
}

/**
 * Every (locale, slug) pair that actually has a file.
 *
 * generateStaticParams and the sitemap both build from this, so a slug that
 * exists in only one language never produces a route — or an hreflang
 * alternate — pointing at a page that would 404.
 */
export async function listGuideDocParams(): Promise<{ locale: Locale; slug: string }[]> {
  const files = await listFiles();
  return files.map((f) => ({ locale: f.locale as Locale, slug: f.slug }));
}

/** Distinct slugs, regardless of which locales they exist in. */
export async function listGuideDocSlugs(): Promise<string[]> {
  const files = await listFiles();
  return [...new Set(files.map((f) => f.slug))];
}

/** The locales a given slug is published in. */
export async function localesForSlug(slug: string): Promise<Locale[]> {
  const files = await listFiles();
  return files.filter((f) => f.slug === slug).map((f) => f.locale as Locale);
}

/**
 * Compile one article in one language. Returns null when that combination does
 * not exist, so the page can call notFound() instead of rendering the wrong
 * language or crashing the build on a bad link.
 */
export async function getGuideDoc(
  slug: string,
  locale: Locale,
): Promise<GuideDoc | null> {
  // Defend the path join: the slug arrives from the URL, and "../../.env"
  // would otherwise read outside the guides directory.
  if (!/^[a-z0-9-]+$/.test(slug)) return null;

  let source: string;
  try {
    source = await readFile(path.join(GUIDES_DIR, `${slug}.${locale}.md`), "utf8");
  } catch {
    return null;
  }

  const { content, frontmatter } = await compileMDX<GuideDocFrontmatter>({
    source,
    components: MDX_COMPONENTS,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        // GFM is what turns the requirement tables in these articles into real
        // markup; without it every table renders as a wall of pipe characters.
        remarkPlugins: [remarkGfm],
      },
    },
  });

  return { slug, locale, frontmatter, content };
}

/** All articles published in one locale, for index listings. */
export async function getGuideDocsForLocale(locale: Locale): Promise<GuideDoc[]> {
  const slugs = [...new Set((await listFiles()).filter((f) => f.locale === locale).map((f) => f.slug))];
  const docs = await Promise.all(slugs.map((slug) => getGuideDoc(slug, locale)));
  return docs.filter((d): d is GuideDoc => d !== null);
}
