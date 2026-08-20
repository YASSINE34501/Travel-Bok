import { getTranslations } from "next-intl/server";
import { Menu } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/brand/Logo";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { AccountMenu } from "@/components/auth/AccountMenu";

const NAV = [
  { href: "/explorer", key: "explorer" },
  { href: "/jobs", key: "jobs" },
  { href: "/guides", key: "guides" },
  { href: "/about", key: "about" },
] as const;

export async function Navbar() {
  const t = await getTranslations("Nav");

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:px-6">
        <Link
          href="/"
          aria-label="TRAVLBOK"
          className="group/logo shrink-0 rounded-lg"
        >
          <Logo
            gradientId="logo-nav"
            markClassName="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/logo:rotate-[18deg] motion-reduce:group-hover/logo:rotate-0"
          />
        </Link>

        <nav className="ms-auto hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-ink-muted transition-colors hover:bg-brand-50 hover:text-brand-700"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="ms-auto flex items-center gap-2 md:ms-0">
          <div className="hidden sm:block">
            <AccountMenu />
          </div>
          <LocaleSwitcher />

          {/* No JS: <details> gives a working mobile menu with zero hydration cost. */}
          <details className="relative md:hidden">
            <summary
              className="grid size-10 cursor-pointer list-none place-items-center rounded-full border border-line bg-surface text-ink-muted marker:content-none"
              aria-label={t("menu")}
            >
              <Menu aria-hidden className="size-4" />
            </summary>
            <div className="absolute end-0 mt-2 w-52 rounded-card border border-line bg-surface p-2 shadow-lift">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-ink hover:bg-brand-50"
                >
                  {t(item.key)}
                </Link>
              ))}
              <div className="mt-1 border-t border-line px-1 pt-2 sm:hidden">
                <AccountMenu />
              </div>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
