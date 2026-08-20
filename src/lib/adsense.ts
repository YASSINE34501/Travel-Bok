/**
 * The AdSense publisher id, in one place.
 *
 * Hardcoded as the default rather than left to the environment. The id is
 * public by necessity — it ships in the script URL, in every ad unit's
 * `data-ad-client`, and in ads.txt — so there is nothing to protect, and an
 * env-only value has a specific failure mode this project has already hit
 * once: `NEXT_PUBLIC_SITE_URL` was never set in the hosting dashboard, so
 * production quietly fell back to the wrong value for weeks. Here the
 * equivalent failure is worse but silent — `AdSenseScript` returns null, no
 * script loads, and the site simply earns nothing while looking fine.
 *
 * The environment still wins when set, so a fork or a staging deploy can point
 * at a different account without touching the source.
 */
export const ADSENSE_CLIENT =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim() || "ca-pub-3161798966897202";

/** The bare publisher number, as ads.txt and reporting use it. */
export const ADSENSE_PUBLISHER_ID = ADSENSE_CLIENT.replace(/^ca-/, "");
