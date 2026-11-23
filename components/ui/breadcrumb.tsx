import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbNavItem {
  name: string;
  path: string;
}

interface BreadcrumbProps {
  items: BreadcrumbNavItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={cn("text-xs sm:text-sm", className)}>
      <ol className="flex flex-wrap items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={`${item.path}-${item.name}`} className="inline-flex items-center gap-1.5">
              {idx > 0 && (
                <ChevronRight
                  size={14}
                  className="text-zinc-400 dark:text-zinc-600 shrink-0"
                  aria-hidden="true"
                />
              )}
              {isLast ? (
                <span
                  aria-current="page"
                  className="font-medium text-zinc-950 dark:text-zinc-100 truncate max-w-[260px] sm:max-w-none"
                >
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.path}
                  className="hover:text-zinc-950 dark:hover:text-white transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
