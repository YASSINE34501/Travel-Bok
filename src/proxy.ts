import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

/**
 * Next.js 16 renamed the `middleware` convention to `proxy`. This handles
 * locale negotiation: it detects the visitor's language, redirects "/" to
 * "/en" or "/ar", and sets the locale cookie for subsequent visits.
 */
export const proxy = createMiddleware(routing);

export const config = {
  // Skip API routes, Next internals, and anything with a file extension.
  matcher: ["/", "/(ar|en)/:path*", "/((?!api|auth|_next|_vercel|.*\..*).*)"],
};
