"use client";

import { useId, useState } from "react";
import { useTranslations } from "next-intl";
import { AlertCircle, MailCheck } from "lucide-react";

import { Link, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

type Mode = "login" | "register";

/**
 * Maps Supabase's error strings onto our own copy. Supabase returns English
 * messages regardless of locale, so surfacing them directly would break the
 * Arabic page — and leak more detail than a sign-in form should.
 */
function messageKey(raw: string): string {
  const error = raw.toLowerCase();
  if (error.includes("invalid login")) return "errorInvalid";
  if (error.includes("already registered") || error.includes("already exists"))
    return "errorExists";
  if (error.includes("password")) return "errorWeak";
  if (error.includes("rate limit") || error.includes("too many"))
    return "errorRateLimit";
  if (error.includes("email")) return "errorEmail";
  return "errorGeneric";
}

export function AuthForm({ mode }: { mode: Mode }) {
  const t = useTranslations("Auth");
  const router = useRouter();
  const id = useId();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [resetSent, setResetSent] = useState(false);

  const supabase = getSupabaseBrowserClient();

  if (!supabase) {
    return (
      <div className="rounded-card border border-line bg-accent-100/60 p-5">
        <h2 className="font-semibold text-ink">{t("notConfiguredTitle")}</h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">
          {t("notConfiguredBody")}
        </p>
      </div>
    );
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) return;

    setPending(true);
    setError(null);

    try {
      if (mode === "register") {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name || null },
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });
        if (signUpError) throw signUpError;
        setSentTo(email);
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
        // refresh() re-runs server components so the nav picks up the session.
        router.refresh();
        router.push("/");
      }
    } catch (caught) {
      setError(
        t(messageKey(caught instanceof Error ? caught.message : "") as never),
      );
    } finally {
      setPending(false);
    }
  }

  async function handleReset() {
    if (!supabase || !email) {
      setError(t("errorEmail"));
      return;
    }
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback`,
    });
    setResetSent(true);
  }

  if (sentTo) {
    return (
      <div className="rounded-card border border-line bg-surface p-6 text-center">
        <span className="mx-auto grid size-12 place-items-center rounded-full bg-positive-100 text-positive">
          <MailCheck aria-hidden className="size-6" />
        </span>
        <h2 className="mt-4 text-lg font-semibold text-ink">
          {t("checkEmailTitle")}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">
          {t("checkEmailBody", { email: sentTo })}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {mode === "register" ? (
        <Field label={t("nameOptional")} htmlFor={`${id}-name`}>
          <Input
            id={`${id}-name`}
            name="name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Field>
      ) : null}

      <Field label={t("email")} htmlFor={`${id}-email`}>
        <Input
          id={`${id}-email`}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          dir="ltr"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Field>

      <Field
        label={t("password")}
        htmlFor={`${id}-password`}
        hint={mode === "register" ? t("passwordHint") : undefined}
      >
        <Input
          id={`${id}-password`}
          name="password"
          type="password"
          autoComplete={mode === "register" ? "new-password" : "current-password"}
          required
          minLength={8}
          dir="ltr"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Field>

      {error ? (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-xl bg-negative-100 p-3 text-sm text-negative"
        >
          <AlertCircle aria-hidden className="mt-0.5 size-4 shrink-0" />
          {error}
        </p>
      ) : null}

      {resetSent ? (
        <p role="status" className="rounded-xl bg-positive-100 p-3 text-sm text-positive">
          {t("forgotSent")}
        </p>
      ) : null}

      <Button type="submit" disabled={pending} className="w-full">
        {pending
          ? mode === "register"
            ? t("signingUp")
            : t("signingIn")
          : mode === "register"
            ? t("signUp")
            : t("signIn")}
      </Button>

      {mode === "login" ? (
        <button
          type="button"
          onClick={handleReset}
          className="w-full text-sm text-ink-muted underline-offset-4 hover:text-brand-700 hover:underline"
        >
          {t("forgot")}
        </button>
      ) : (
        <p className="text-xs leading-relaxed text-ink-muted">
          {t.rich("agree", {
            terms: (chunks) => (
              <Link href="/terms" className="text-brand-700 underline">
                {chunks}
              </Link>
            ),
            privacy: (chunks) => (
              <Link href="/privacy" className="text-brand-700 underline">
                {chunks}
              </Link>
            ),
          })}
        </p>
      )}
    </form>
  );
}
