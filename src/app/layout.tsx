import type { ReactNode } from "react";

/**
 * The real <html> element lives in app/[locale]/layout.tsx, because `lang` and
 * `dir` depend on the active locale. This root layout only exists so Next has
 * something above the locale segment to render.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
