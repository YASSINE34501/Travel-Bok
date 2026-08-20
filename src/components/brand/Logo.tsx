import { cn } from "@/lib/utils";

/**
 * A paper plane banking inside a gradient pill, with a compass tick marking
 * the heading it is flying on — direction and departure in one mark.
 *
 * Inline SVG rather than an <img>: no request, inherits currentColor, and it
 * can never be the LCP element that delays a paint. `gradientId` keeps the
 * <defs> id unique when the logo appears twice on a page (navbar + footer),
 * which otherwise breaks the second instance.
 */
export function LogoMark({
  className,
  gradientId = "travlbok-mark",
}: {
  className?: string;
  gradientId?: string;
}) {
  return (
    <svg
      viewBox="0 0 44 32"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn("h-8 w-11", className)}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="44" y2="32">
          <stop offset="0%" stopColor="var(--color-brand-500)" />
          <stop offset="55%" stopColor="var(--color-brand-600)" />
          <stop offset="100%" stopColor="var(--color-brand-900)" />
        </linearGradient>
      </defs>

      {/* Pill */}
      <rect width="44" height="32" rx="16" fill={`url(#${gradientId})`} />

      {/* Compass tick: the heading the plane is flying */}
      <circle
        cx="22"
        cy="16"
        r="11"
        stroke="white"
        strokeOpacity="0.28"
        strokeWidth="1.1"
      />

      {/* Paper plane, banking up and to the right */}
      <path
        d="M30.2 9.1 15.6 15.2a.62.62 0 0 0-.05 1.12l4.03 2.06 2.06 4.03a.62.62 0 0 0 1.12-.05l6.1-14.6a.62.62 0 0 0-.66-.66Z"
        fill="white"
      />
      {/* Fold line — reads as a crease, keeps the plane from looking like a dart */}
      <path
        d="m19.58 18.38 5.55-5.55"
        stroke="white"
        strokeOpacity="0.55"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({
  className,
  markClassName,
  gradientId,
  showWordmark = true,
}: {
  className?: string;
  markClassName?: string;
  gradientId?: string;
  showWordmark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className={markClassName} gradientId={gradientId} />
      {showWordmark ? (
        <span
          // Latin in both locales: it is the brand name, not copy to translate.
          dir="ltr"
          className="font-display text-[1.125rem] font-extrabold tracking-[-0.035em] text-ink"
        >
          TRAVLBOK
        </span>
      ) : null}
    </span>
  );
}
