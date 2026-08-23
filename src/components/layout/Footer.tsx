import { getLocale, getTranslations } from "next-intl/server";
import { Logo } from "@/components/brand/Logo";
import { Link } from "@/i18n/navigation";
import { CookieSettingsButton } from "@/components/ads/ConsentBanner";
import { getGuideDocsForLocale } from "@/lib/guides-md";
import type { Locale } from "@/i18n/routing";

export async function Footer() {
  const [t, nav, meta, articles, locale] = await Promise.all([
    getTranslations("Footer"),
    getTranslations("Nav"),
    getTranslations("Meta"),
    getTranslations("Articles"),
    getLocale() as Promise<Locale>,
  ]);

  // Locale-scoped: the footer must never link to an article that is not
  // published in the language the visitor is reading.
  const docs = await getGuideDocsForLocale(locale);

  return (
    <footer className="mt-20 border-t border-line bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 sm:grid-cols-2 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <Logo gradientId="logo-footer" />
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-muted">
            {t("built")}
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-ink">{t("product")}</h2>
          <ul className="mt-3 space-y-2 text-sm text-ink-muted">
            <li><Link href="/explorer" className="hover:text-brand-700">{nav("explorer")}</Link></li>
            <li><Link href="/jobs" className="hover:text-brand-700">{nav("jobs")}</Link></li>
            <li><Link href="/guides" className="hover:text-brand-700">{nav("guides")}</Link></li>
            <li><Link href="/about" className="hover:text-brand-700">{t("about")}</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-ink">
            {articles("footerHeading")}
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-ink-muted">
            {docs.map((doc) => (
              <li key={doc.slug}>
                {/* Country name, not the SEO title: a footer list needs short
                    scannable anchors, and the full title wraps to three lines. */}
                <Link
                  href={"/articles/" + doc.slug}
                  className="hover:text-brand-700"
                >
                  {doc.frontmatter.country}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-ink">{t("legal")}</h2>
          <ul className="mt-3 space-y-2 text-sm text-ink-muted">
            <li><Link href="/privacy" className="hover:text-brand-700">{t("privacy")}</Link></li>
            <li><Link href="/terms" className="hover:text-brand-700">{t("terms")}</Link></li>
            <li><Link href="/contact" className="hover:text-brand-700">{t("contact")}</Link></li>
            <li><CookieSettingsButton /></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line px-4 py-5 text-center text-xs text-ink-muted sm:px-6">
        © {new Date().getFullYear()} {meta("siteName")}. {t("rights")}
      </div>
    </footer>
  );
}
