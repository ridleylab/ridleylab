import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  variant?: "default" | "subtle" | "elevated" | "inverted";
  padding?: "none" | "sm" | "md" | "lg";
  interactive?: boolean;
  className?: string;
}

const variantClasses: Record<NonNullable<CardProps["variant"]>, string> = {
  default:
    "bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800",
  subtle:
    "bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800",
  elevated:
    "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm",
  inverted:
    "bg-zinc-950 dark:bg-zinc-950 text-zinc-50 border border-zinc-800",
};

const paddingClasses: Record<NonNullable<CardProps["padding"]>, string> = {
  none: "",
  sm: "p-5",
  md: "p-6 sm:p-7",
  lg: "p-7 sm:p-9",
};

export function Card({
  children,
  variant = "default",
  padding = "md",
  interactive = false,
  className,
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl transition-all duration-200",
        variantClasses[variant],
        paddingClasses[padding],
        interactive &&
          "hover:-translate-y-0.5 hover:border-zinc-400 dark:hover:border-zinc-600 hover:shadow-md",
        className
      )}
    >
      {children}
    </div>
  );
}
