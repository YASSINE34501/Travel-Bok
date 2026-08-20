import { ImageResponse } from "next/og";
import { routing } from "@/i18n/routing";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "TRAVLBOK — compare cost of living, jobs and visas";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/**
 * Share card, generated at build time.
 *
 * Deliberately locale-neutral. The renderer behind `next/og` (Satori) cannot
 * shape Arabic — it has no support for the GSUB lookups that produce
 * contextual letterforms, so Arabic copy comes out as disconnected glyphs or
 * fails the build outright. Rather than ship a broken Arabic card, both
 * locales get the same card: the wordmark, which is Latin in either language,
 * and the three things the site does.
 *
 * If an Arabic card matters later, pre-render it as a static PNG in a real
 * text engine and reference it from metadata for /ar.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background:
            "linear-gradient(135deg, #312e81 0%, #4f46e5 58%, #06b6d4 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div
            style={{
              width: 68,
              height: 68,
              borderRadius: 20,
              background: "rgba(255,255,255,0.16)",
              border: "2px solid rgba(255,255,255,0.42)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
            }}
          >
            ✈
          </div>
          <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: -1.5 }}>
            TRAVLBOK
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.12,
              letterSpacing: -2.5,
              maxWidth: 900,
            }}
          >
            Plan your move with real numbers.
          </div>

          <div style={{ display: "flex", gap: 14 }}>
            {["Cost of living", "Jobs for your degree", "Visa guides"].map(
              (label) => (
                <div
                  key={label}
                  style={{
                    fontSize: 24,
                    padding: "10px 22px",
                    borderRadius: 999,
                    background: "rgba(255,255,255,0.14)",
                    border: "1px solid rgba(255,255,255,0.28)",
                  }}
                >
                  {label}
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
