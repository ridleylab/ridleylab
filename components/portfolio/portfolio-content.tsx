"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import ClientSection from "./client-section";
import type { PortfolioItem } from "@/config/portfolio";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { cn } from "@/lib/utils";

export type { PortfolioItem };

interface PortfolioContentProps {
  items: PortfolioItem[];
}

export default function PortfolioContent({ items }: PortfolioContentProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [visibleCount, setVisibleCount] = useState(6);
  const [previewItem, setPreviewItem] = useState<PortfolioItem | null>(null);

  const categories = useMemo(() => {
    const cats = new Set(items.map((item) => item.category));
    return Array.from(cats);
  }, [items]);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.toLowerCase().trim();
    return items.filter((item) => {
      const matchCategory =
        activeCategory === "Semua" || item.category === activeCategory;
      const matchQuery =
        !normalizedQuery ||
        item.name.toLowerCase().includes(normalizedQuery) ||
        item.businessType.toLowerCase().includes(normalizedQuery) ||
        item.category.toLowerCase().includes(normalizedQuery) ||
        item.location.toLowerCase().includes(normalizedQuery) ||
        item.resultMetric.toLowerCase().includes(normalizedQuery);

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
            placeholder="Cari bisnis, kategori, hasil, atau kota..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setVisibleCount(6);
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
                  setVisibleCount(6);
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

      {/* CASE STUDY IMAGE CARDS */}
      {displayedItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedItems.map((item) => (
            <ClientSection
              key={item.id}
              item={item}
              onPreviewImage={setPreviewItem}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl">
          <p className="text-zinc-500 dark:text-zinc-400 text-base font-medium">
            Tidak ada studi kasus yang cocok dengan pencarian Anda.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setActiveCategory("Semua");
              setVisibleCount(6);
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
            onClick={() => setVisibleCount((prev) => prev + 6)}
          >
            Tampilkan Lebih Banyak
          </Button>
        </div>
      )}

      {/* Lightbox Image Modal */}
      <Modal
        open={previewItem !== null}
        onClose={() => setPreviewItem(null)}
        title={previewItem?.name || ""}
        description={
          previewItem
            ? `${previewItem.location} · ${previewItem.resultMetric}`
            : undefined
        }
        size="lg"
      >
        {previewItem && (
          <div className="space-y-4">
            <div className="relative w-full aspect-[4/3] sm:aspect-video rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
              <Image
                src={previewItem.image}
                alt={previewItem.imageAlt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 95vw, 880px"
              />
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {previewItem.mentoringDetails}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}
