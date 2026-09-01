import { ChevronDown } from "lucide-react";

import { JsonLd, faqSchema } from "@/lib/seo";

export type FaqItem = { question: string; answer: string };

/**
 * Renders already-resolved questions as native <details> and emits the matching
 * FAQPage markup from the very same array.
 *
 * Two callers need this with different inputs: FaqSection has editorial `Faq`
 * objects holding both languages, while the comparison pages build their
 * questions from that corridor's computed figures and only ever hold the
 * current locale. Both funnel through here so there is one implementation of
 * the rule that matters — answers ship in the HTML whether or not the item is
 * open, because markup describing content the crawler cannot see is a
 * structured-data violation rather than a shortcut.
 */
export function FaqList({
  items,
  title,
  className = "mt-12",
}: {
  items: FaqItem[];
  title: string;
  className?: string;
}) {
  return (
    <section className={className}>
      <h2 className="text-2xl font-bold text-ink">{title}</h2>

      <div className="mt-5 divide-y divide-line overflow-hidden rounded-card border border-line bg-surface">
        {items.map((item, i) => (
          <details key={i} className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-start font-medium text-ink transition-colors marker:content-none hover:bg-brand-50/60">
              {item.question}
              <ChevronDown
                aria-hidden
                className="size-5 shrink-0 text-ink-muted transition-transform duration-200 group-open:rotate-180"
              />
            </summary>
            <p className="px-5 pb-5 leading-relaxed text-ink-muted">
              {item.answer}
            </p>
          </details>
        ))}
      </div>

      <JsonLd data={faqSchema(items)} />
    </section>
  );
}
