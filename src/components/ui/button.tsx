import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 rounded-full font-medium",
    // Springy easing + a 1% press: enough to feel responsive, not bouncy.
    "transition-[background-color,border-color,color,box-shadow,transform,gap] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
    "active:scale-[0.98] motion-reduce:active:scale-100",
    // Widening the gap reads as the icon leading forward, and unlike a
    // translate it composes with the RTL mirroring on directional icons.
    "hover:gap-2.5",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:size-4 [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        primary:
          "bg-brand-600 text-white shadow-brand hover:bg-brand-700 hover:shadow-lift",
        secondary:
          "border border-line bg-surface text-ink shadow-card hover:border-brand-500 hover:text-brand-700 hover:shadow-lift",
        accent: "bg-accent-500 text-ink hover:bg-accent-600",
        ghost: "text-ink-muted hover:bg-brand-50 hover:text-brand-700",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-5 text-sm",
        lg: "h-12 px-7 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  ),
);
Button.displayName = "Button";

export { buttonVariants };
