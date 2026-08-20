import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  [
    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
    "ring-1 ring-inset transition-colors duration-200",
  ].join(" "),
  {
    variants: {
      tone: {
        neutral: "bg-brand-50 text-brand-700 ring-brand-100",
        high: "bg-positive-100 text-positive ring-positive/15",
        // accent-700, not accent-600: 600 on accent-100 misses AA at this size.
        medium: "bg-accent-100 text-accent-700 ring-accent-500/20",
        low: "bg-negative-100 text-negative ring-negative/15",
        outline: "bg-surface text-ink-muted ring-line-strong",
      },
    },
    defaultVariants: { tone: "neutral" },
  },
);

export function Badge({
  className,
  tone,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />;
}
