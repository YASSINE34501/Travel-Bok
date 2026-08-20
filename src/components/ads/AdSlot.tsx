"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { applyConsent, readConsent } from "./ConsentBanner";
import { ADSENSE_CLIENT } from "@/lib/adsense";
import { cn } from "@/lib/utils";

type AdFormat = "leaderboard" | "rectangle" | "inline";

/**
 * Fixed heights, not min-heights. The box is the exact size of the standard
 * AdSense unit at each breakpoint and cannot grow once the ad arrives, so CLS
 * from advertising is structurally zero rather than merely small:
 *
 *   leaderboard  320×100 mobile  →  728×90 from sm
 *   rectangle    300×250 everywhere
 *   inline       336×280 mobile  →  300×250 from sm
 */
const FORMAT_STYLES: Record<AdFormat, string> = {
  leaderboard: "h-[100px] sm:h-[90px]",
  rectangle: "h-[250px]",
  inline: "h-[280px] sm:h-[250px]",
};

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export function AdSlot({
  slot,
  format = "inline",
  className,
}: {
  /** AdSense ad unit id (data-ad-slot). */
  slot: string;
  format?: AdFormat;
  className?: string;
}) {
  const t = useTranslations("Ads");
  const client = ADSENSE_CLIENT;
  const pushed = useRef(false);

  useEffect(() => {
    if (!client || pushed.current) return;
    // React 18+ can mount effects twice in dev; guard so we never double-push.
    pushed.current = true;
    try {
      // No recorded choice means no personalisation. Ads still serve, so the
      // page earns without assuming a consent the visitor never gave.
      applyConsent(readConsent() ?? "basic");
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // A blocked or offline ad script must never break the page.
    }
  }, [client]);

  return (
    <aside
      aria-label={t("label")}
      className={cn("my-8 w-full", className)}
      data-ad-slot-id={slot}
    >
      <p className="mb-1 text-center text-[10px] uppercase tracking-widest text-ink-muted/70">
        {t("label")}
      </p>
      <div
        className={cn(
          "flex w-full items-center justify-center overflow-hidden rounded-card border border-dashed border-line bg-surface/60",
          FORMAT_STYLES[format],
        )}
      >
        {client ? (
          <ins
            className="adsbygoogle block size-full"
            // The unit fills the reserved box exactly; it cannot push content.
            style={{ display: "block", width: "100%", height: "100%" }}
            data-ad-client={client}
            data-ad-slot={slot}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        ) : (
          <span className="text-xs text-ink-muted/60">{slot}</span>
        )}
      </div>
    </aside>
  );
}
