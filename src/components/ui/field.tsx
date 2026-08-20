import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Native <select> and <input> on purpose: they weigh nothing, open the real
 * mobile picker, and inherit RTL from the document without extra work — which
 * keeps INP flat on low-end phones where a JS combobox would not.
 */

export function Field({
  label,
  htmlFor,
  hint,
  hintClassName,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  /**
   * Lets a caller reserve a fixed height for the hint (e.g. `min-h-8` for two
   * lines). Worth doing where the hint interpolates a value: the explorer's
   * salary note rewraps between one and two lines as the country changes, and
   * without a floor the whole panel would jump each time.
   */
  hintClassName?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-ink-muted"
      >
        {label}
      </label>
      {children}
      {hint ? (
        <p className={cn("text-xs leading-4 text-ink-muted", hintClassName)}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}

const controlBase = [
  "h-12 w-full rounded-xl border border-line-input bg-surface px-4 text-sm text-ink",
  "transition-[border-color,box-shadow] duration-200",
  "hover:border-brand-500 focus:border-brand-600 focus:outline-none",
  "focus:ring-4 focus:ring-brand-500/15",
].join(" ");

export const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => (
  <div className="relative">
    <select
      ref={ref}
      className={cn(controlBase, "appearance-none pe-11", className)}
      {...props}
    >
      {children}
    </select>
    <ChevronDown
      aria-hidden
      className="pointer-events-none absolute end-4 top-1/2 size-4 -translate-y-1/2 text-ink-muted"
    />
  </div>
));
Select.displayName = "Select";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input ref={ref} className={cn(controlBase, className)} {...props} />
));
Input.displayName = "Input";
