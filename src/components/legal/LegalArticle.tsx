import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { LegalDocument } from "@/data/legal";
import { t as pick, formatDate } from "@/lib/format";

/**
 * One renderer for every policy page. Sections carry stable anchor ids so the
 * table of contents links survive translation — an Arabic heading and its
 * English counterpart share the same `#id`.
 */
export async function LegalArticle({
  doc,
  locale,
}: {
  doc: LegalDocument;
  locale: Locale;
}) {
  const t = await getTranslations("Legal");

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <header>
        <h1 className="text-3xl font-bold text-ink sm:text-4xl">
          {pick(doc.title, locale)}
        </h1>
        <p className="mt-2 text-xs text-ink-muted">
          {t("updated", { date: formatDate(doc.updatedAt, locale) })}
        </p>
        <p className="mt-5 text-lg leading-relaxed text-ink-muted">
          {pick(doc.intro, locale)}
        </p>
      </header>

      <nav
        aria-label={t("onThisPage")}
        className="mt-8 rounded-card border border-line bg-surface p-5"
      >
        <h2 className="text-sm font-semibold text-ink">{t("onThisPage")}</h2>
        <ol className="mt-3 space-y-2">
          {doc.sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="text-sm text-brand-700 hover:underline"
              >
                {pick(section.heading, locale)}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-10 space-y-10">
        {doc.sections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-20">
            <h2 className="text-xl font-bold text-ink sm:text-2xl">
              {pick(section.heading, locale)}
            </h2>

            {section.paragraphs?.map((paragraph, i) => (
              <p key={i} className="mt-4 leading-relaxed text-ink">
                {pick(paragraph, locale)}
              </p>
            ))}

            {section.bullets ? (
              <ul className="mt-4 space-y-3">
                {section.bullets.map((bullet, i) => (
                  <li key={i} className="flex gap-3 leading-relaxed text-ink">
                    <span
                      aria-hidden
                      className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand-600"
                    />
                    <span>{pick(bullet, locale)}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </div>

      <aside className="mt-12 rounded-card border border-brand-100 bg-brand-50 p-6">
        <h2 className="font-semibold text-ink">{t("questionsTitle")}</h2>
        <p className="mt-1 text-sm text-ink-muted">{t("questionsBody")}</p>
        <Link
          href="/contact"
          className="mt-3 inline-block text-sm font-medium text-brand-700 hover:underline"
        >
          {t("contactLink")}
        </Link>
      </aside>
    </article>
  );
}
