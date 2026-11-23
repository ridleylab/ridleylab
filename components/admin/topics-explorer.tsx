"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TopicCategoryGroup {
  name: string;
  topics: string[];
}

interface TopicsExplorerProps {
  categories: TopicCategoryGroup[];
}

export default function TopicsExplorer({ categories }: TopicsExplorerProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");

  const filteredGroups = useMemo(() => {
    const q = search.trim().toLowerCase();
    return categories
      .filter((c) => activeCategory === "Semua" || c.name === activeCategory)
      .map((c) => ({
        name: c.name,
        topics: q
          ? c.topics.filter((t) => t.toLowerCase().includes(q))
          : c.topics,
      }))
      .filter((c) => c.topics.length > 0);
  }, [categories, search, activeCategory]);

  return (
    <div className="space-y-6">
      {/* Search + Category Filter */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 p-4">
        <div className="relative flex-1 max-w-md">
          <Search
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari ide topik artikel..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-sm text-zinc-950 dark:text-zinc-50 placeholder-zinc-400 outline-none focus:border-zinc-950 dark:focus:border-zinc-400"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {["Semua", ...categories.map((c) => c.name)].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer",
                activeCategory === cat
                  ? "bg-zinc-950 text-white dark:bg-zinc-50 dark:text-zinc-950"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-800"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredGroups.map((group) => (
          <div
            key={group.name}
            className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 overflow-hidden flex flex-col"
          >
            <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/60 flex items-center justify-between">
              <h2 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">
                {group.name}
              </h2>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300">
                {group.topics.length} Topik
              </span>
            </div>

            <ul className="divide-y divide-zinc-100 dark:divide-zinc-800 max-h-[420px] overflow-y-auto p-2">
              {group.topics.map((topic, idx) => {
                const writeUrl = `/admin/posts/new?topic=${encodeURIComponent(
                  topic
                )}&category=${encodeURIComponent(group.name)}`;

                return (
                  <li
                    key={topic}
                    className="p-3 hover:bg-zinc-50 dark:hover:bg-zinc-950/60 transition-colors flex items-center justify-between gap-3 rounded-xl"
                  >
                    <div className="flex items-start gap-2.5 min-w-0">
                      <span className="text-zinc-400 font-mono text-xs mt-0.5 shrink-0">
                        {(idx + 1).toString().padStart(2, "0")}.
                      </span>
                      <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200 leading-snug">
                        {topic}
                      </p>
                    </div>

                    <Link
                      href={writeUrl}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 text-[11px] font-semibold hover:opacity-90 transition-opacity shrink-0"
                    >
                      <span>Tulis Artikel</span>
                      <ArrowUpRight size={12} />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {filteredGroups.length === 0 && (
        <div className="rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 p-12 text-center text-sm text-zinc-500 dark:text-zinc-400">
          Tidak ada ide topik yang sesuai pencarian Anda.
        </div>
      )}
    </div>
  );
}
