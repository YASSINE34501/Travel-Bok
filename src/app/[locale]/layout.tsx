import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Inter, Cairo, Plus_Jakarta_Sans } from "next/font/google";

import { routing, localeDirection, type Locale } from "@/i18n/routing";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AdSenseScript } from "@/components/ads/AdSenseScript";
import { ADSENSE_CLIENT } from "@/lib/adsense";
import { ConsentBanner } from "@/components/ads/ConsentBanner";
import {
  JsonLd,
  organizationSchema,
  websiteSchema,
  SITE_URL,
  alternates,
} from "@/lib/seo";
import "../globals.css";

// `display: swap` + preloaded subsets keep text visible during font load,
// which is what LCP is actually measuring on a text-heavy page.
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Display face for Latin headings only — its tighter tracking and higher
// contrast do the work a heading needs without paying for it in body text.
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700", "800"],
  variable: "--font-jakarta",
});

const cairo = Cairo({
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-cairo",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  // An unprefixed URL like /nope matches this segment with locale="nope".
  // The page component below guards with hasLocale, but generateMetadata runs
  // first — and getTranslations on an unknown locale throws, which Next serves
  // as a 500. A missing page must answer 404, not "the server is broken".
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations({ locale, namespace: "Meta" });

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${t("siteName")} — ${t("tagline")}`,
      template: `%s | ${t("siteName")}`,
    },
    description: t("description"),
    applicationName: t("siteName"),
    alternates: alternates("/", locale as Locale),
    // Renders <meta name="google-site-verification" ...>. The token is public
    // by design — it only proves control of the property — so it lives in the
    // source rather than an env var, where a fork or a fresh deploy would
    // silently lose it and unverify the property.
    verification: {
      google: "mLpVTK8LD_27KYcFZAgWFDQqCvNPzaVDC3zVHNeOSz0",
    },
    // AdSense ownership. Next has no typed field for this one, so it goes
    // through `other`, which renders <meta name="google-adsense-account">.
    other: {
      "google-adsense-account": ADSENSE_CLIENT,
    },
    robots: { index: true, follow: true },
    formatDetection: { telephone: false },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // Required for static rendering of every page under this layout.
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Nav" });
  const skip = t("skipToContent");

  return (
    <html
      lang={locale}
      dir={localeDirection[locale]}
      className={`${inter.variable} ${jakarta.variable} ${cairo.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* In <head>, server-rendered: AdSense's ownership crawler reads the
            first HTTP response and does not reliably run client JavaScript. */}
        <AdSenseScript />
      </head>
      <body className="flex min-h-screen flex-col">
        <NextIntlClientProvider>
          <a href="#main" className="skip-link rounded-full bg-brand-600 px-4 py-2 text-sm font-medium text-white">
            {skip}
          </a>
          <Navbar />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <ConsentBanner />
        </NextIntlClientProvider>
        <JsonLd data={organizationSchema(locale)} />
        <JsonLd data={websiteSchema(locale)} />
      </body>
    </html>
  );
}
