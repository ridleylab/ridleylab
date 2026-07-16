import Link from "next/link";

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
  
    // Pertahankan search params yang sudah ada
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
  
    // Jangan tambahkan ?page=1
    if (page > 1) {
      params.set("page", page.toString());
    } else {
      params.delete("page");
    }
  
    const query = params.toString();
  
    return query ? `${baseUrl}?${query}` : baseUrl;
  };

  return (
    <div className="flex items-center justify-center gap-6 mt-14">
      {currentPage > 1 ? (
        <Link
          href={createPageUrl(currentPage - 1)}
          className="inline-flex items-center justify-center py-3 px-6 rounded-xl border border-gray-200 bg-white font-bold text-sm hover:bg-gray-50 transition"
        >
          &larr; Halaman Sebelumnya
        </Link>
      ) : (
        <span className="inline-flex items-center justify-center py-3 px-6 rounded-xl border border-gray-100 bg-gray-50/50 font-bold text-sm text-gray-300 cursor-not-allowed">
          &larr; Halaman Sebelumnya
        </span>
      )}

      <span className="text-sm font-bold text-gray-500">
        Halaman {currentPage} dari {totalPages}
      </span>

      {currentPage < totalPages ? (
        <Link
          href={createPageUrl(currentPage + 1)}
          className="inline-flex items-center justify-center py-3 px-6 rounded-xl border border-gray-200 bg-white font-bold text-sm hover:bg-gray-50 transition"
        >
          Halaman Berikutnya &rarr;
        </Link>
      ) : (
        <span className="inline-flex items-center justify-center py-3 px-6 rounded-xl border border-gray-100 bg-gray-50/50 font-bold text-sm text-gray-300 cursor-not-allowed">
          Halaman Berikutnya &rarr;
        </span>
      )}
    </div>
  );
}
