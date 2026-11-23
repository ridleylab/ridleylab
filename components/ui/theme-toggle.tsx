"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/layout/theme-provider";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Ganti tema tampilan terang atau gelap"
      title="Ganti tema Light / Dark"
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer",
        className
      )}
    >
      <Sun className="hidden dark:block h-4 w-4" aria-hidden="true" />
      <Moon className="block dark:hidden h-4 w-4" aria-hidden="true" />
    </button>
  );
}
