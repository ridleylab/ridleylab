import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "outline" | "solid" | "inverted";
  className?: string;
}

const variantClasses: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default:
    "bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-zinc-800/80 dark:text-zinc-300 dark:border-zinc-700",
  outline:
    "bg-transparent text-zinc-700 border border-zinc-300 dark:text-zinc-300 dark:border-zinc-700",
  solid:
    "bg-zinc-950 text-white dark:bg-zinc-50 dark:text-zinc-950 border border-transparent",
  inverted:
    "bg-zinc-800 text-zinc-100 border border-zinc-700",
};

export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
