"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { Cookie } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export const CONSENT_KEY = "travlbok:ad-consent";
export const CONSENT_EVENT = "travlbok:open-consent";

export type AdConsent = "personalised" | "basic";

export function readConsent(): AdConsent | null {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem(CONSENT_KEY);
  return stored === "personalised" || stored === "basic" ? stored : null;
}

/**
 * Tells the AdSense queue whether it may personalise. Setting
 * `requestNonPersonalizedAds` before any ad renders is what keeps a declining
 * visitor out of behavioural targeting.
 *
 * Note: for visitors in the EEA/UK, Google additionally requires a *certified*
 * CMP (Funding Choices or an IAB TCF vendor) to serve ads at all. This banner
 * handles our own cookie choice; enable Google's messaging in the AdSense
 * dashboard before taking European traffic.
 */
export function applyConsent(consent: AdConsent) {
  if (typeof window === "undefined") return;
  const queue = (window.adsbygoogle = window.adsbygoogle || []);
  (queue as unknown as { requestNonPersonalizedAds?: number }).requestNonPersonalizedAds =
    consent === "personalised" ? 0 : 1;
}

/**
 * localStorage is an external store, so it is read through
 * useSyncExternalStore rather than an effect. The server snapshot is
 * "unknown", which means the prerendered HTML never contains the banner:
 * no hydration mismatch, and no layout shift for returning visitors.
 */
const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getSnapshot(): string {
  return window.localStorage.getItem(CONSENT_KEY) ?? "none";
}

function getServerSnapshot(): string {
  return "unknown";
}

export function ConsentBanner() {
  const t = useTranslations("Consent");
  const [reopened, setReopened] = useState(false);

  const stored = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const consent: AdConsent | null =
    stored === "personalised" || stored === "basic" ? stored : null;

  // Legitimate effect: pushing the current choice into an external system.
  useEffect(() => {
    if (consent) applyConsent(consent);
  }, [consent]);

  useEffect(() => {
    const reopen = () => setReopened(true);
    window.addEventListener(CONSENT_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_EVENT, reopen);
  }, []);

  const choose = useCallback((next: AdConsent) => {
    window.localStorage.setItem(CONSENT_KEY, next);
    applyConsent(next);
    setReopened(false);
    listeners.forEach((notify) => notify());
  }, []);

  const open = reopened || (stored === "none" && consent === null);
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="consent-title"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-surface/95 p-4 shadow-lift backdrop-blur-md sm:p-5"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-4 sm:flex-row sm:items-center">
        <Cookie aria-hidden className="size-6 shrink-0 text-brand-700" />

        <div className="min-w-0 flex-1">
          <h2 id="consent-title" className="text-sm font-semibold text-ink">
            {t("title")}
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-ink-muted">
            {t("body")}{" "}
            <Link href="/privacy" className="text-brand-700 underline">
              {t("policy")}
            </Link>
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <Button size="sm" variant="secondary" onClick={() => choose("basic")}>
            {t("reject")}
          </Button>
          <Button size="sm" onClick={() => choose("personalised")}>
            {t("accept")}
          </Button>
        </div>
      </div>
    </div>
  );
}

/** Footer control that reopens the banner, as the privacy policy promises. */
export function CookieSettingsButton() {
  const t = useTranslations("Consent");
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(CONSENT_EVENT))}
      className="text-start hover:text-brand-700"
    >
      {t("manage")}
    </button>
  );
}
