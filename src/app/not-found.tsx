import type { Metadata } from "next";
// Plain next/link, not the i18n Link: there is no locale context here, and the
// hrefs are already absolute locale roots.
import Link from "next/link";
import "./globals.css";

/**
 * 404 for URLs that never reach a locale segment — e.g. /nope.
 *
 * In production those were returning **500**, not 404. The reason is that
 * `app/layout.tsx` is a passthrough that renders only `children`: the real
 * <html>/<body> live in `app/[locale]/layout.tsx`, which an unprefixed URL
 * never gets to. With no document element anywhere in the tree, rendering the
 * default not-found threw. A 500 on a missing page also tells crawlers the
 * server is broken rather than the page is gone.
 *
 * So this file supplies its own document, and its own stylesheet, because
 * nothing above it does.
 *
 * It deliberately avoids next-intl: there is no locale to read, and calling
 * into the request-scoped translator here would reintroduce the same class of
 * failure. It offers both languages instead of guessing.
 */
export const metadata: Metadata = {
  title: "Page not found | TRAVLBOK",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <html lang="en">
      <body className="bg-paper">
        <main className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center px-6 text-center">
          <p className="tnum text-5xl font-bold text-brand-600">404</p>

          <h1 className="mt-4 text-2xl font-bold text-ink">
            This page doesn’t exist
          </h1>
          <p className="mt-2 text-ink-muted">
            The link may be broken, or the page may have moved.
          </p>

          <p lang="ar" dir="rtl" className="mt-4 text-ink-muted">
            هذه الصفحة غير موجودة. ربما يكون الرابط معطلًا أو نُقلت الصفحة.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/en"
              className="rounded-xl bg-brand-600 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-700"
            >
              Continue in English
            </Link>
            <Link
              href="/ar"
              lang="ar"
              className="rounded-xl border border-line bg-surface px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-brand-500"
            >
              المتابعة بالعربية
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
