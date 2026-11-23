import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  variant?: "default" | "subtle" | "inverted";
  spacing?: "none" | "sm" | "md" | "lg";
  borderTop?: boolean;
  id?: string;
  className?: string;
}

const variantClasses: Record<NonNullable<SectionProps["variant"]>, string> = {
  default: "bg-white dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50",
  subtle: "bg-zinc-50 dark:bg-zinc-900/50 text-zinc-950 dark:text-zinc-50",
  inverted:
    "bg-zinc-950 dark:bg-zinc-900 text-zinc-50 border-y border-zinc-800/80",
};

const spacingClasses: Record<NonNullable<SectionProps["spacing"]>, string> = {
  none: "",
  sm: "py-12 md:py-16",
  md: "py-16 md:py-24",
  lg: "py-20 md:py-28",
};

export function Section({
  children,
  variant = "default",
  spacing = "md",
  borderTop = false,
  id,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative overflow-x-clip transition-colors duration-200",
        variantClasses[variant],
        spacingClasses[spacing],
        borderTop && "border-t border-zinc-200 dark:border-zinc-800",
        className
      )}
    >
      {children}
    </section>
  );
}
