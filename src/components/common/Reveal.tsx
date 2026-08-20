"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Fades a section in the first time it scrolls into view.
 *
 * Deliberately holds no React state. The hidden step is applied by writing a
 * `data-reveal` attribute to the node inside the effect, so:
 *
 *  - The markup is always in the DOM and always visible without JavaScript.
 *    A reveal whose hidden state lives in the initial CSS is a content-loss bug
 *    waiting for a script to fail, and it hides text from crawlers.
 *  - There is no setState during an effect, so it cannot cascade renders.
 *
 * It also unobserves after the first intersection. Re-animating every time a
 * section scrolls past is what makes these effects feel cheap.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  /** Stagger, in ms. Keep it small — this is a fade, not a performance. */
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect the OS setting: nothing to hide, nothing to animate.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    el.dataset.reveal = "pending";
    if (delay) el.style.transitionDelay = `${delay}ms`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // `top < 0` means the element is already above the viewport. A jump to
        // an anchor, a restored scroll position, or a fast fling can move past
        // an element without the observer ever seeing it intersect — and then
        // the text would stay invisible for good. Treat "already passed" as
        // shown rather than risk losing content.
        const passed = entry.boundingClientRect.top < 0;
        if (!entry.isIntersecting && !passed) return;

        el.dataset.reveal = "shown";
        observer.disconnect();
      },
      { rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-[opacity,transform] duration-700 ease-out-soft",
        className,
      )}
    >
      {children}
    </div>
  );
}
