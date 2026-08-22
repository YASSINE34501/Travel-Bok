import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "**.supabase.co" },
      // Guide cover photos are hotlinked from Unsplash. Without this the
      // optimiser refuses the host and next/image throws at request time.
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
    // Guide covers render at a handful of widths; trimming the default list
    // keeps the number of generated variants (and the cache) small.
    deviceSizes: [390, 640, 828, 1080, 1200, 1600],
  },
  // The footer and the guides index read src/data/guides/*.md at render time,
  // and the guides page revalidates on a 12h timer — so those reads happen on
  // the server after the build, not only during it. Without this, tracing does
  // not follow a runtime readdir() and the deployed bundle ships no markdown:
  // getAllGuideDocs() catches the ENOENT and the article list silently renders
  // empty in production while working perfectly in dev.
  outputFileTracingIncludes: {
    "/**": ["./src/data/guides/**/*.md"],
  },

  experimental: {
    // Keeps the client bundle lean: only the icons actually used are shipped.
    optimizePackageImports: ["lucide-react"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
