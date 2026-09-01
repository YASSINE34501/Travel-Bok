import { getTranslations } from "next-intl/server";

import type { Locale } from "@/i18n/routing";
import type { Faq } from "@/data/faqs";
import { t as pick } from "@/lib/format";
import { FaqList } from "@/components/common/FaqList";

/**
 * The editorial FAQ blocks on /explorer and /jobs. Resolves each bilingual
 * entry to the current locale and hands the markup and the FAQPage JSON-LD to
 * FaqList, so this page and the comparison pages cannot drift apart in how
 * they render or describe their questions.
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
    <FaqList
      title={t("title")}
      items={faqs.map((faq) => ({
        question: pick(faq.question, locale),
        answer: pick(faq.answer, locale),
      }))}
    />
  );
}
