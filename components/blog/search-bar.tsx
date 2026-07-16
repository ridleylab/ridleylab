"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/use-debounce";

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
      } else {
        params.delete("search");
      }
      params.set("page", "1"); // Reset page to 1 on new search

      router.push(`/blog?${params.toString()}`, { scroll: false });
    });
  }, [debouncedQuery, router, searchParams]);

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 ${isPending ? "text-ridley-blue animate-pulse" : "text-gray-400"}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        type="text"
        placeholder="Cari artikel..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 focus:border-ridley-blue focus:bg-white text-black placeholder-gray-400 rounded-2xl outline-none transition duration-300 text-sm"
      />
    </div>
  );
}
