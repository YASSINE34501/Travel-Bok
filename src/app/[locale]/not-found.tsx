import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export default async function NotFound() {
  const t = await getTranslations("Guides");

  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
      <p className="tnum text-5xl font-bold text-brand-600">404</p>
      <h1 className="mt-4 text-2xl font-bold text-ink">{t("notFound")}</h1>
      <Link href="/guides" className="mt-8 inline-block">
        <Button variant="secondary">{t("backToGuides")}</Button>
      </Link>
    </div>
  );
}
