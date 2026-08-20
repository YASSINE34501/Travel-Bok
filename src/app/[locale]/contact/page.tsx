import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Mail, ShieldAlert, ShieldCheck, PencilLine } from "lucide-react";

import type { Locale } from "@/i18n/routing";
import { Card, CardBody } from "@/components/ui/card";
import { ContactForm } from "@/components/contact/ContactForm";
import { CONTACT_DETAILS } from "@/data/legal";
import { pageMetadata, JsonLd, breadcrumbSchema } from "@/lib/seo";
import { keywordsFor } from "@/data/seo";
import { pageDescription, pageTitle } from "@/lib/seo-content";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({
    title: pageTitle("contact", locale),
    description: pageDescription("contact", locale),
    path: "/contact",
    locale,
    keywords: keywordsFor("contact", locale),
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, footer] = await Promise.all([
    getTranslations("Contact"),
    getTranslations("Footer"),
  ]);

  const channels = [
    {
      icon: Mail,
      title: t("generalTitle"),
      body: t("generalBody"),
      email: CONTACT_DETAILS.general,
    },
    {
      icon: ShieldCheck,
      title: t("privacyTitle"),
      body: t("privacyBody"),
      email: CONTACT_DETAILS.privacy,
    },
    {
      icon: PencilLine,
      title: t("correctionsTitle"),
      body: t("correctionsBody"),
      email: CONTACT_DETAILS.corrections,
    },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-ink sm:text-4xl">{t("title")}</h1>
        <p className="mt-3 max-w-2xl text-ink-muted">{t("subtitle")}</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        {channels.map(({ icon: Icon, title, body, email }) => (
          <Card key={email}>
            <CardBody className="pt-5">
              <span className="grid size-9 place-items-center rounded-lg bg-brand-50 text-brand-700">
                <Icon aria-hidden className="size-4" />
              </span>
              <h2 className="mt-3 font-semibold text-ink">{title}</h2>
              <p className="mt-1 text-sm leading-relaxed text-ink-muted">{body}</p>
              <a
                href={`mailto:${email}`}
                dir="ltr"
                className="mt-3 inline-block break-all text-sm font-medium text-brand-700 hover:underline"
              >
                {email}
              </a>
            </CardBody>
          </Card>
        ))}
      </div>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-ink">{t("formTitle")}</h2>
        <Card className="mt-5">
          <CardBody className="pt-6">
            <ContactForm />
          </CardBody>
        </Card>
      </section>

      {/* Migration fraud is the single biggest risk to this audience. */}
      <aside className="mt-10 flex gap-4 rounded-card border border-negative/20 bg-negative-100/50 p-5">
        <ShieldAlert aria-hidden className="size-6 shrink-0 text-negative" />
        <div>
          <h2 className="font-semibold text-ink">{t("noAgentsTitle")}</h2>
          <p className="mt-1 text-sm leading-relaxed text-ink-muted">
            {t("noAgentsBody")}
          </p>
        </div>
      </aside>

      <JsonLd
        data={breadcrumbSchema(
          [
            { name: footer("company"), path: "/" },
            { name: t("title"), path: "/contact" },
          ],
          locale,
        )}
      />
    </div>
  );
}
