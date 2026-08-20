import { ADSENSE_CLIENT } from "@/lib/adsense";

/**
 * A plain server-rendered <script>, deliberately not `next/script`.
 *
 * `next/script` with `strategy="afterInteractive"` is the better choice for
 * performance — it keeps the ad library off the critical path — but it injects
 * the tag from client JavaScript after hydration. The first HTTP GET therefore
 * contains no script tag at all, only the serialised RSC payload. AdSense's
 * ownership crawler reads that first response and does not reliably execute
 * JavaScript, so verification failed even though the script loaded correctly
 * in a real browser.
 *
 * Rendering it here puts the tag in the initial HTML `<head>`. `async` means it
 * still does not block parsing or rendering; it is only *discovered* earlier.
 *
 * There must be exactly one of these on a page — two AdSense loaders is a
 * policy violation — so this component is mounted once, in the locale layout.
 */
export function AdSenseScript() {
  return (
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
      crossOrigin="anonymous"
    />
  );
}
