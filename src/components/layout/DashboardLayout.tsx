import type { ReactNode } from "react";
import { AdSlot } from "@/components/ads/AdSlot";
import { cn } from "@/lib/utils";

/**
 * Two-column tool layout: content on the inline-start side, a sticky ad rail on
 * the inline-end side from `lg` up.
 *
 * The rail is `aside`, not a second column of content, and it collapses
 * entirely below `lg` — a 300px sidebar on a phone would either squeeze the
 * tool or push ads above the fold, and AdSense treats the latter as a policy
 * problem. On small screens the in-content slot the page already renders is
 * the only ad shown.
 *
 * `sticky top-20` clears the 64px navbar; `h-fit` stops the sidebar stretching
 * to the full grid-row height, which is what breaks position: sticky in a
 * CSS grid.
 */
export function DashboardLayout({
  children,
  sidebarSlot,
  className,
}: {
  children: ReactNode;
  /** AdSense ad unit id for the sticky rail. */
  sidebarSlot: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-10",
        className,
      )}
    >
      <div className="min-w-0">{children}</div>

      <aside className="hidden lg:block">
        <div className="sticky top-20 h-fit space-y-6">
          <AdSlot slot={sidebarSlot} format="rectangle" className="my-0" />
        </div>
      </aside>
    </div>
  );
}
