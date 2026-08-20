import { getTranslations } from "next-intl/server";
import { Logo } from "@/components/brand/Logo";
import { Link } from "@/i18n/navigation";
import { CookieSettingsButton } from "@/components/ads/ConsentBanner";

export async function Footer() {
  const [t, nav, meta] = await Promise.all([
    getTranslations("Footer"),
    getTranslations("Nav"),
    getTranslations("Meta"),
  ]);

  return (
    <footer className="mt-20 border-t border-line bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <Logo gradientId="logo-footer" />
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-muted">
            {t("built")}
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-ink">{t("product")}</h2>
          <ul className="mt-3 space-y-2 text-sm text-ink-muted">
            <li><Link href="/explorer" className="hover:text-brand-700">{nav("explorer")}</Link></li>
            <li><Link href="/jobs" className="hover:text-brand-700">{nav("jobs")}</Link></li>
            <li><Link href="/guides" className="hover:text-brand-700">{nav("guides")}</Link></li>
            <li><Link href="/about" className="hover:text-brand-700">{t("about")}</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-ink">{t("legal")}</h2>
          <ul className="mt-3 space-y-2 text-sm text-ink-muted">
            <li><Link href="/privacy" className="hover:text-brand-700">{t("privacy")}</Link></li>
            <li><Link href="/terms" className="hover:text-brand-700">{t("terms")}</Link></li>
            <li><Link href="/contact" className="hover:text-brand-700">{t("contact")}</Link></li>
            <li><CookieSettingsButton /></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line px-4 py-5 text-center text-xs text-ink-muted sm:px-6">
        © {new Date().getFullYear()} {meta("siteName")}. {t("rights")}
      </div>
    </footer>
  );
}
