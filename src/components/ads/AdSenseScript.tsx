import Script from "next/script";

import { ADSENSE_CLIENT } from "@/lib/adsense";

/**
 * Loaded once from the root layout. `afterInteractive` keeps the ad library off
 * the critical path so it cannot delay LCP or block hydration.
 */
export function AdSenseScript() {
  return (
    <Script
      id="adsbygoogle-init"
      async
      strategy="afterInteractive"
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
    />
  );
}
