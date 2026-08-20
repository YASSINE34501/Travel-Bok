import { ADSENSE_PUBLISHER_ID } from "@/lib/adsense";

/**
 * Served as a route rather than a static file in /public so the publisher id
 * comes from the same constant as the script tag and every ad unit.
 *
 * A public/ads.txt would be a fourth hand-typed copy of the id, and a mismatch
 * there does not fail loudly — AdSense simply reports the domain as
 * unauthorised and stops serving, days later, with no build error.
 *
 * Format per the IAB ads.txt spec:
 *   <exchange domain>, <publisher id>, <relationship>, <certification id>
 * f08c47fec0942fa0 is Google's TAG certification id and is the same for every
 * AdSense publisher.
 */
export const dynamic = "force-static";

export function GET() {
  const body = `google.com, ${ADSENSE_PUBLISHER_ID}, DIRECT, f08c47fec0942fa0\n`;

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      // Crawled occasionally, changes almost never.
      "cache-control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
