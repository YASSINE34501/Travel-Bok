import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Check } from "lucide-react";

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
      title: t("registerTitle"),
      description: t("registerSubtitle"),
      path: "/register",
      locale,
    }),
    robots: { index: false, follow: true },
  };
}

export default async function RegisterPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Auth");

  return (
    <div className="mx-auto grid max-w-4xl gap-10 px-4 py-12 sm:px-6 sm:py-20 md:grid-cols-2 md:gap-14">
      <div>
        <h1 className="text-2xl font-bold text-ink sm:text-3xl">
          {t("registerTitle")}
        </h1>
        <p className="mt-2 text-ink-muted">{t("registerSubtitle")}</p>

        <h2 className="mt-8 text-sm font-semibold text-ink">
          {t("benefitsTitle")}
        </h2>
        <ul className="mt-3 space-y-3">
          {[t("benefit1"), t("benefit2"), t("benefit3")].map((benefit) => (
            <li key={benefit} className="flex gap-2.5 text-sm text-ink-muted">
              <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-600" />
              <span className="leading-relaxed">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <Card>
          <CardBody className="pt-6">
            <AuthForm mode="register" />
          </CardBody>
        </Card>

        <p className="mt-6 text-center text-sm text-ink-muted">
          {t("haveAccount")}{" "}
          <Link href="/login" className="font-medium text-brand-700 hover:underline">
            {t("signInInstead")}
          </Link>
        </p>
      </div>
    </div>
  );
}
