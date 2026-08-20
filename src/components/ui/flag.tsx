import { cn } from "@/lib/utils";

/**
 * Real vector flags, served from flagcdn.
 *
 * Why not emoji: flag emoji are regional-indicator pairs, and Windows ships no
 * glyphs for them — every flag degrades to the bare country code ("MA", "DE").
 * That is the single most visible rendering bug on this site for Windows users,
 * and no font stack fixes it.
 *
 * Why a plain <img> and not next/image: these are ~1KB vectors at a fixed
 * display size. Routing them through the optimiser would rasterise them and add
 * a request per variant for no gain. SVG inside <img> is sandboxed by the
 * browser — scripts do not execute — so this carries none of the risk that
 * `dangerouslyAllowSVG` would.
 *
 * The wrapper fixes the 4:3 box so the row never reflows while the flag loads.
 */
export function Flag({
  code,
  className,
  size = 20,
}: {
  /** ISO 3166-1 alpha-2, any case. */
  code: string;
  className?: string;
  /** Rendered width in px. Height follows the 4:3 flag ratio. */
  size?: number;
}) {
  const lower = code.toLowerCase();
  const height = Math.round((size * 3) / 4);

  return (
    <span
      className={cn(
        "inline-block shrink-0 overflow-hidden rounded-[3px] bg-line align-middle ring-1 ring-inset ring-ink/10",
        className,
      )}
      style={{ width: size, height }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- see file comment:
          fixed-size vector, optimiser would rasterise it for no benefit. */}
      <img
        src={`https://flagcdn.com/${lower}.svg`}
        alt=""
        width={size}
        height={height}
        loading="lazy"
        decoding="async"
        className="size-full object-cover"
      />
    </span>
  );
}
