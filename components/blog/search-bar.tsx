"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams?.get("search") || "");
  const debouncedQuery = useDebounce(query, 300);
  const [isPending, startTransition] = useTransition();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    startTransition(() => {
      const params = new URLSearchParams(searchParams?.toString() || "");

      if (debouncedQuery) {
        params.set("search", debouncedQuery);
        params.set("page", "1");
      } else {
        params.delete("search");
        params.delete("page");
      }

      const queryString = params.toString();

      router.push(queryString ? `/blog?${queryString}` : "/blog", {
        scroll: false,
      });
    });
  }, [debouncedQuery, router, searchParams]);

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search
          size={17}
          className={cn(
            "transition-colors",
            isPending
              ? "text-zinc-950 dark:text-zinc-100 animate-pulse"
              : "text-zinc-400"
          )}
        />
      </div>
      <input
        type="text"
        placeholder="Cari artikel..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full pl-11 pr-4 py-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:border-zinc-950 dark:focus:border-zinc-400 focus:bg-white dark:focus:bg-zinc-950 text-zinc-950 dark:text-zinc-50 placeholder-zinc-400 rounded-xl outline-none transition-colors text-sm"
      />
    </div>
  );
}
