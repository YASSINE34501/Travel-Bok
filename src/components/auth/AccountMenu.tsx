"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { LogOut, UserRound } from "lucide-react";

import { Link, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

/**
 * Auth state is resolved in the browser rather than in the server layout on
 * purpose: reading the session server-side would opt every page out of static
 * rendering. The trade is a brief empty slot on first paint, which is why the
 * container reserves its width.
 */
export function AccountMenu() {
  const t = useTranslations("Auth");
  const nav = useTranslations("Nav");
  const router = useRouter();

  // Known at build time, so the "auth is off" case needs no effect and no
  // loading state — it renders the signed-out links on the very first paint.
  const authEnabled = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );

  const [email, setEmail] = useState<string | null>(null);
  const [ready, setReady] = useState(!authEnabled);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;

    supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? null);
      setReady(true);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setEmail(session?.user.email ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  async function signOut() {
    const supabase = getSupabaseBrowserClient();
    await supabase?.auth.signOut();
    setEmail(null);
    router.refresh();
  }

  // Without credentials there is nothing to sign into, so the nav stays clean.
  // The /login and /register pages still exist and explain themselves.
  if (!authEnabled) return null;

  if (!ready) return <div className="h-9 w-24" aria-hidden />;

  if (email) {
    return (
      <div className="flex items-center gap-2">
        <span
          title={email}
          className="hidden max-w-[12ch] items-center gap-1.5 truncate text-sm text-ink-muted lg:inline-flex"
        >
          <UserRound aria-hidden className="size-4 shrink-0" />
          {email}
        </span>
        <Button variant="ghost" size="sm" onClick={signOut}>
          <LogOut aria-hidden className="flip-rtl" />
          <span className="sr-only sm:not-sr-only">{t("signOut")}</span>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1">
      <Link href="/login">
        <Button variant="ghost" size="sm">
          {nav("login")}
        </Button>
      </Link>
      <Link href="/register" className="hidden sm:block">
        <Button size="sm">{nav("register")}</Button>
      </Link>
    </div>
  );
}
