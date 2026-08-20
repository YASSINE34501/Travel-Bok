import type { MetadataRoute } from "next";
import { locales } from "@/i18n/routing";
import { SITE_URL } from "@/lib/seo";

/**
 * Account screens are disallowed in both locales; everything else is open.
 * Mediapartners-Google gets an explicit allow — AdSense cannot serve ads on a
 * page its crawler is blocked from reading.
 */
export default function robots(): MetadataRoute.Robots {
  const accountPaths = locales.flatMap((locale) => [
    `/${locale}/login`,
    `/${locale}/register`,
  ]);

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/auth/", ...accountPaths],
      },
      { userAgent: "Mediapartners-Google", allow: "/" },
      { userAgent: "AdsBot-Google", allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
