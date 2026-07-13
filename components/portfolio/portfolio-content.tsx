"use client";

import { useState, useMemo } from "react";
import ClientSection from "./client-section";

export interface PortfolioItem {
  id: string;
  name: string;
  category: string;
  businessType: string;
  location: string;
  mentoringDetails: string;
  videoIds: string[];
}

interface PortfolioContentProps {
  items: PortfolioItem[];
}

export default function PortfolioContent({ items }: PortfolioContentProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [visibleCount, setVisibleCount] = useState(2);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set(items.map((item) => item.category));
    return Array.from(cats);
  }, [items]);

  // Filter items based on query and activeCategory
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchCategory =
        activeCategory === "Semua" || item.category === activeCategory;
      const matchQuery =
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.businessType.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase());

      return matchCategory && matchQuery;
    });
  }, [items, query, activeCategory]);

  const displayedItems = filteredItems.slice(0, visibleCount);

  const handleSeeMore = () => {
    setVisibleCount((prev) => prev + 2);
  };

  return (
    <div>
      {/* SEARCH AND FILTERS */}
      <div className="mb-12 space-y-6">
        {/* Search Bar */}
        <div className="relative w-full max-w-md mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
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
            placeholder="Cari bisnis..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setVisibleCount(2); // reset on search
            }}
            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 focus:border-ridley-blue focus:bg-white text-black placeholder-gray-400 rounded-2xl outline-none transition duration-300 text-sm"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Kategori:
          </span>
          <button
            onClick={() => {
              setActiveCategory("Semua");
              setVisibleCount(2);
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition ${
              activeCategory === "Semua"
                ? "bg-ridley-blue text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Semua
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setVisibleCount(2);
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition ${
                activeCategory === cat
                  ? "bg-ridley-blue text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT GRID */}
      {displayedItems.length > 0 ? (
        <div className="px-4">
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
        <div className="text-center py-20 border border-dashed border-gray-200 rounded-3xl">
          <p className="text-gray-400 text-lg font-bold">
            Tidak ada bisnis yang cocok dengan pencarian Anda.
          </p>
          <button
            onClick={() => {
              setQuery("");
              setActiveCategory("Semua");
              setVisibleCount(2);
            }}
            className="inline-block mt-4 text-sm font-bold text-ridley-blue hover:underline"
          >
            Reset Pencarian
          </button>
        </div>
      )}

      {/* See More Button */}
      {visibleCount < filteredItems.length && (
        <div className="mt-12 text-center">
          <button
            onClick={handleSeeMore}
            className="px-8 py-3 bg-ridley-blue text-white font-bold rounded-xl hover:bg-blue-700 transition"
          >
            See more
          </button>
        </div>
      )}
    </div>
  );
}
