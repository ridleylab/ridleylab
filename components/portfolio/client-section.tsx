"use client";

import Image from "next/image";
import { Check, Expand, MapPin } from "lucide-react";
import type { PortfolioItem } from "@/config/portfolio";
import { Card } from "@/components/ui/card";

interface ClientSectionProps {
  item: PortfolioItem;
  onPreviewImage: (item: PortfolioItem) => void;
}

export default function ClientSection({
  item,
  onPreviewImage,
}: ClientSectionProps) {
  return (
    <article id={item.slug} className="scroll-mt-24 h-full">
      <Card
        variant="default"
        padding="none"
        interactive
        className="flex flex-col h-full overflow-hidden group"
      >
        <button
          type="button"
          onClick={() => onPreviewImage(item)}
          aria-label={`Perbesar dokumentasi hasil ${item.name}`}
          className="relative w-full aspect-[4/3] overflow-hidden bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 cursor-zoom-in text-left"
        >
          <Image
            src={item.image}
            alt={item.imageAlt}
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <span
            aria-hidden="true"
            className="absolute bottom-3 right-3 h-8 w-8 rounded-full bg-zinc-950/75 text-white border border-white/15 backdrop-blur-sm flex items-center justify-center opacity-85 group-hover:opacity-100 transition-opacity"
          >
            <Expand size={14} />
          </span>
        </button>

        <div className="p-6 flex flex-col flex-1 min-w-0">
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
            <span className="inline-flex items-center gap-1">
              <MapPin size={12} />
              <span>{item.location}</span>
            </span>
            <span>·</span>
            <span>{item.businessType}</span>
          </p>

          <h2 className="text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-3">
            {item.name}
          </h2>

          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/70 px-3.5 py-2.5 mb-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Dampak &amp; Hasil Utama
            </p>
            <p className="text-sm font-semibold text-zinc-950 dark:text-zinc-50 mt-0.5">
              {item.resultMetric}
            </p>
          </div>

          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-5">
            {item.mentoringDetails}
          </p>

          <ul className="space-y-2 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 mb-6 flex-1">
            {item.highlights.map((pt) => (
              <li key={pt} className="flex items-start gap-2">
                <Check
                  size={15}
                  className="shrink-0 mt-0.5 text-zinc-950 dark:text-zinc-100"
                />
                <span>{pt}</span>
              </li>
            ))}
          </ul>

          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-900 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-500 dark:text-zinc-400 mt-auto">
            <span className="font-medium text-zinc-700 dark:text-zinc-300">
              {item.program}
            </span>
            <span>{item.period}</span>
          </div>
        </div>
      </Card>
    </article>
  );
}
