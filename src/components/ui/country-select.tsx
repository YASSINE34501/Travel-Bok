"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, Globe } from "lucide-react";

import { Flag } from "./flag";
import { cn } from "@/lib/utils";

/**
 * Pseudo-options such as "any country" carry a non-ISO code. Requesting a flag
 * for those would 404, so they get a globe instead.
 */
function OptionIcon({ code }: { code: string }) {
  if (/^[a-z]{2}$/i.test(code)) return <Flag code={code} />;
  return (
    <Globe aria-hidden className="size-5 shrink-0 text-ink-muted" strokeWidth={1.75} />
  );
}

export type CountryOption = {
  code: string;
  label: string;
  /** Optional second line, e.g. the city the cost figures describe. */
  hint?: string;
};

/**
 * An accessible listbox, built because a native <select> cannot render an
 * image inside an <option> — and emoji flags are unavailable on Windows.
 *
 * Implements the WAI-ARIA combobox-with-listbox pattern: roving
 * `aria-activedescendant`, Home/End/Arrow navigation, printable-character
 * type-ahead, Escape to close, and focus returned to the trigger on select.
 * It is keyboard-complete, which the plain div-with-onClick version of this
 * component never is.
 */
export function CountrySelect({
  value,
  onChange,
  options,
  id,
  label,
  className,
}: {
  value: string;
  onChange: (code: string) => void;
  options: CountryOption[];
  id?: string;
  /** Accessible name, used when no visible <label> is wired via `id`. */
  label?: string;
  className?: string;
}) {
  const generatedId = useId();
  const listId = `${id ?? generatedId}-listbox`;

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const typeAhead = useRef({ query: "", at: 0 });

  const selectedIndex = useMemo(
    () => Math.max(0, options.findIndex((o) => o.code === value)),
    [options, value],
  );
  const selected = options[selectedIndex];

  const openList = useCallback(() => {
    setActiveIndex(selectedIndex);
    setOpen(true);
  }, [selectedIndex]);

  const commit = useCallback(
    (index: number) => {
      const option = options[index];
      if (option) onChange(option.code);
      setOpen(false);
      triggerRef.current?.focus();
    },
    [onChange, options],
  );

  // Close on outside pointer down and on scroll away from the trigger.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  // Keep the active option in view as the user arrows through the list.
  useEffect(() => {
    if (!open) return;
    listRef.current
      ?.querySelector(`[data-index="${activeIndex}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [open, activeIndex]);

  function onKeyDown(event: React.KeyboardEvent) {
    const last = options.length - 1;

    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
        event.preventDefault();
        openList();
      }
      return;
    }

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActiveIndex((i) => (i >= last ? 0 : i + 1));
        return;
      case "ArrowUp":
        event.preventDefault();
        setActiveIndex((i) => (i <= 0 ? last : i - 1));
        return;
      case "Home":
        event.preventDefault();
        setActiveIndex(0);
        return;
      case "End":
        event.preventDefault();
        setActiveIndex(last);
        return;
      case "Enter":
      case " ":
        event.preventDefault();
        commit(activeIndex);
        return;
      case "Escape":
        event.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
        return;
      case "Tab":
        setOpen(false);
        return;
    }

    // Type-ahead: printable characters jump to the next matching label.
    if (event.key.length === 1 && !event.metaKey && !event.ctrlKey) {
      const now = Date.now();
      const state = typeAhead.current;
      state.query = now - state.at > 800 ? event.key : state.query + event.key;
      state.at = now;

      const query = state.query.toLowerCase();
      const found = options.findIndex((o) =>
        o.label.toLowerCase().startsWith(query),
      );
      if (found >= 0) setActiveIndex(found);
    }
  }

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        ref={triggerRef}
        id={id}
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-haspopup="listbox"
        aria-label={label}
        aria-activedescendant={open ? `${listId}-${activeIndex}` : undefined}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        className={cn(
          "flex h-12 w-full items-center gap-2.5 rounded-xl border border-line-input bg-surface px-3.5 text-start text-sm text-ink",
          "transition-[border-color,box-shadow] duration-200",
          "hover:border-brand-500 focus:border-brand-600 focus:outline-none focus:ring-4 focus:ring-brand-500/15",
          open && "border-brand-600 ring-4 ring-brand-500/15",
        )}
      >
        {selected ? <OptionIcon code={selected.code} /> : null}
        <span className="min-w-0 flex-1 truncate">{selected?.label}</span>
        <ChevronDown
          aria-hidden
          className={cn(
            "size-4 shrink-0 text-ink-muted transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      {open ? (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          aria-label={label}
          tabIndex={-1}
          className="absolute z-50 mt-2 max-h-72 w-full overflow-y-auto rounded-xl border border-line bg-surface p-1.5 shadow-lift"
        >
          {options.map((option, index) => {
            const isSelected = option.code === value;
            const isActive = index === activeIndex;
            return (
              <li
                key={option.code}
                id={`${listId}-${index}`}
                data-index={index}
                role="option"
                aria-selected={isSelected}
                onClick={() => commit(index)}
                onMouseEnter={() => setActiveIndex(index)}
                className={cn(
                  "flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm",
                  isActive ? "bg-brand-50 text-brand-900" : "text-ink",
                )}
              >
                <OptionIcon code={option.code} />
                <span className="min-w-0 flex-1 truncate">
                  {option.label}
                  {option.hint ? (
                    <span className="ms-1.5 text-xs text-ink-muted">
                      {option.hint}
                    </span>
                  ) : null}
                </span>
                {isSelected ? (
                  <Check aria-hidden className="size-4 shrink-0 text-brand-600" />
                ) : null}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
