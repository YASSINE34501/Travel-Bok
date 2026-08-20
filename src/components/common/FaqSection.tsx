import { getTranslations } from "next-intl/server";
import { ChevronDown } from "lucide-react";

import type { Locale } from "@/i18n/routing";
import type { Faq } from "@/data/faqs";
import { t as pick } from "@/lib/format";
import { JsonLd, faqSchema } from "@/lib/seo";

/**
 * Renders the questions as native <details> and emits the matching FAQPage
 * markup. Answers ship in the HTML whether or not the item is open, which is
 * what Google requires — markup describing content the crawler cannot see is
 * a structured-data violation, not a shortcut.
 */
export async function FaqSection({
  faqs,
  locale,
}: {
  faqs: Faq[];
  locale: Locale;
}) {
  const t = await getTranslations("Faq");

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-ink">{t("title")}</h2>

      <div className="mt-5 divide-y divide-line overflow-hidden rounded-card border border-line bg-surface">
        {faqs.map((faq, i) => (
          <details key={i} className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-start font-medium text-ink transition-colors marker:content-none hover:bg-brand-50/60">
              {pick(faq.question, locale)}
              <ChevronDown
                aria-hidden
                className="size-5 shrink-0 text-ink-muted transition-transform duration-200 group-open:rotate-180"
              />
            </summary>
            <p className="px-5 pb-5 leading-relaxed text-ink-muted">
              {pick(faq.answer, locale)}
            </p>
          </details>
        ))}
      </div>

      <JsonLd
        data={faqSchema(
          faqs.map((faq) => ({
            question: pick(faq.question, locale),
            answer: pick(faq.answer, locale),
          })),
        )}
      />
    </section>
  );
}
