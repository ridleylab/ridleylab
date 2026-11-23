"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import ClientSection from "./client-section";
import type { PortfolioItem } from "@/config/portfolio";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type { PortfolioItem };

interface PortfolioContentProps {
  items: PortfolioItem[];
}

export default function PortfolioContent({ items }: PortfolioContentProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [visibleCount, setVisibleCount] = useState(4);

  const categories = useMemo(() => {
    const cats = new Set(items.map((item) => item.category));
    return Array.from(cats);
  }, [items]);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.toLowerCase();
    return items.filter((item) => {
      const matchCategory =
        activeCategory === "Semua" || item.category === activeCategory;
      const matchQuery =
        item.name.toLowerCase().includes(normalizedQuery) ||
        item.businessType.toLowerCase().includes(normalizedQuery) ||
        item.category.toLowerCase().includes(normalizedQuery) ||
        item.location.toLowerCase().includes(normalizedQuery);

      return matchCategory && matchQuery;
    });
  }, [items, query, activeCategory]);

  const displayedItems = filteredItems.slice(0, visibleCount);

  return (
    <div>
      {/* SEARCH AND FILTERS */}
      <div className="mb-12 space-y-5">
        <div className="relative w-full max-w-md mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
            <Search size={17} />
          </div>
          <input
            type="text"
            placeholder="Cari bisnis atau kota..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setVisibleCount(4);
            }}
            className="w-full pl-11 pr-4 py-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:border-zinc-950 dark:focus:border-zinc-400 focus:bg-white dark:focus:bg-zinc-950 text-zinc-950 dark:text-zinc-50 placeholder-zinc-400 rounded-xl outline-none transition-colors text-sm"
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mr-1">
            Kategori:
          </span>
          {["Semua", ...categories].map((cat) => {
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setActiveCategory(cat);
                  setVisibleCount(4);
                }}
                className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer",
                  active
                    ? "bg-zinc-950 text-white dark:bg-zinc-50 dark:text-zinc-950"
                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800"
                )}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* CONTENT LIST */}
      {displayedItems.length > 0 ? (
        <div className="space-y-8">
          {displayedItems.map((item) => (
            <ClientSection
              key={item.id}
              name={item.name}
              businessType={item.businessType}
              location={item.location}
              mentoringDetails={item.mentoringDetails}
              videoIds={item.videoIds}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl">
          <p className="text-zinc-500 dark:text-zinc-400 text-base font-medium">
            Tidak ada bisnis yang cocok dengan pencarian Anda.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setActiveCategory("Semua");
              setVisibleCount(4);
            }}
            className="inline-block mt-3 text-sm font-semibold text-zinc-950 dark:text-zinc-100 underline underline-offset-4 cursor-pointer"
          >
            Reset Pencarian
          </button>
        </div>
      )}

      {visibleCount < filteredItems.length && (
        <div className="mt-10 text-center">
          <Button
            variant="outline"
            onClick={() => setVisibleCount((prev) => prev + 4)}
          >
            Tampilkan Lebih Banyak
          </Button>
        </div>
      )}
    </div>
  );
}
