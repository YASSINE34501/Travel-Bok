import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { AuthForm } from "@/components/auth/AuthForm";
import { Card, CardBody } from "@/components/ui/card";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Auth" });
  return {
    ...pageMetadata({
      title: t("loginTitle"),
      description: t("loginSubtitle"),
      path: "/login",
      locale,
    }),
    // Account screens carry no content worth indexing.
    robots: { index: false, follow: true },
  };
}

export default async function LoginPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Auth");

  return (
    <div className="mx-auto max-w-md px-4 py-12 sm:px-6 sm:py-20">
      <h1 className="text-2xl font-bold text-ink sm:text-3xl">
        {t("loginTitle")}
      </h1>
      <p className="mt-2 text-ink-muted">{t("loginSubtitle")}</p>

      <Card className="mt-8">
        <CardBody className="pt-6">
          <AuthForm mode="login" />
        </CardBody>
      </Card>

      <p className="mt-6 text-center text-sm text-ink-muted">
        {t("noAccount")}{" "}
        <Link href="/register" className="font-medium text-brand-700 hover:underline">
          {t("createOne")}
        </Link>
      </p>
    </div>
  );
}
