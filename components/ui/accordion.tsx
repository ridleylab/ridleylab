"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItemData {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItemData[];
  defaultOpenIndex?: number | null;
  allowMultiple?: boolean;
  className?: string;
}

export function Accordion({
  items,
  defaultOpenIndex = 0,
  allowMultiple = false,
  className,
}: AccordionProps) {
  const baseId = useId();
  const [openIndices, setOpenIndices] = useState<number[]>(() =>
    defaultOpenIndex !== null && defaultOpenIndex >= 0 && defaultOpenIndex < items.length
      ? [defaultOpenIndex]
      : []
  );

  const toggleIndex = (idx: number) => {
    setOpenIndices((prev) => {
      const isOpen = prev.includes(idx);
      if (allowMultiple) {
        return isOpen ? prev.filter((i) => i !== idx) : [...prev, idx];
      }
      return isOpen ? [] : [idx];
    });
  };

  return (
    <div
      className={cn(
        "divide-y divide-zinc-200 dark:divide-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden",
        className
      )}
    >
      {items.map((item, idx) => {
        const isOpen = openIndices.includes(idx);
        const buttonId = `${baseId}-btn-${idx}`;
        const panelId = `${baseId}-panel-${idx}`;

        return (
          <div key={item.question}>
            <button
              id={buttonId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggleIndex(idx)}
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-zinc-50 dark:hover:bg-zinc-900/60 transition-colors cursor-pointer"
            >
              <span className="font-semibold text-sm sm:text-base text-zinc-950 dark:text-zinc-50 leading-snug">
                {item.question}
              </span>
              <ChevronDown
                size={18}
                className={cn(
                  "shrink-0 text-zinc-500 dark:text-zinc-400 transition-transform duration-200",
                  isOpen && "rotate-180 text-zinc-950 dark:text-zinc-50"
                )}
              />
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className={cn(
                "px-6 pb-5 pt-0 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed",
                !isOpen && "hidden"
              )}
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
