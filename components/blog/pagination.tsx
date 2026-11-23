import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  searchParams?: Record<string, string>;
}

export default function Pagination({
  currentPage,
  totalPages,
  baseUrl,
  searchParams = {},
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams();

    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });

    if (page > 1) {
      params.set("page", page.toString());
    } else {
      params.delete("page");
    }

    const query = params.toString();
    return query ? `${baseUrl}?${query}` : baseUrl;
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 mt-14">
      {currentPage > 1 ? (
        <Link
          href={createPageUrl(currentPage - 1)}
          className="inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 font-semibold text-sm text-zinc-950 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
        >
          <ArrowLeft size={15} />
          <span>Sebelumnya</span>
        </Link>
      ) : (
        <span className="inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl border border-zinc-100 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-900/40 font-semibold text-sm text-zinc-300 dark:text-zinc-700 cursor-not-allowed">
          <ArrowLeft size={15} />
          <span>Sebelumnya</span>
        </span>
      )}

      <span className="text-xs sm:text-sm font-medium text-zinc-500 dark:text-zinc-400">
        Halaman {currentPage} dari {totalPages}
      </span>

      {currentPage < totalPages ? (
        <Link
          href={createPageUrl(currentPage + 1)}
          className="inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 font-semibold text-sm text-zinc-950 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
        >
          <span>Berikutnya</span>
          <ArrowRight size={15} />
        </Link>
      ) : (
        <span className="inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl border border-zinc-100 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-900/40 font-semibold text-sm text-zinc-300 dark:text-zinc-700 cursor-not-allowed">
          <span>Berikutnya</span>
          <ArrowRight size={15} />
        </span>
      )}
    </div>
  );
}
