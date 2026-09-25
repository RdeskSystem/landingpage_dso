import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-btn)] px-5 py-3 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--dso-red-bright)] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--dso-red)] text-white shadow-[0_10px_30px_rgba(192,0,0,0.22)] hover:bg-[var(--dso-red-bright)]",
        secondary:
          "border border-[var(--dso-line)] bg-white text-[var(--dso-ink)] hover:border-[var(--dso-red)] hover:text-[var(--dso-red)]",
        dark: "border border-white/20 bg-white/10 text-white hover:bg-white/20",
        ghost: "px-3 text-[var(--dso-muted)] hover:bg-[var(--dso-mist)] hover:text-[var(--dso-ink)]",
      },
      size: {
        default: "min-h-11",
        sm: "min-h-9 px-3 py-2 text-xs",
        lg: "min-h-13 px-6 py-3.5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
