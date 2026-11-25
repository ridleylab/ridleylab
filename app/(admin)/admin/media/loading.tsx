import { Skeleton } from "@/components/ui/skeleton";

export default function AdminMediaLoading() {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-label="Memuat galeri media"
      className="space-y-6"
    >
      <span className="sr-only">Memuat...</span>

      <div className="space-y-2">
        <Skeleton className="h-8 w-44" />
        <Skeleton className="h-4 w-80 max-w-full" />
      </div>

      <Skeleton className="h-40 w-full rounded-2xl" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <Skeleton className="h-10 w-full sm:max-w-sm" />
        <Skeleton className="h-4 w-24" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 p-3 space-y-3"
          >
            <Skeleton className="aspect-video w-full" />
            <Skeleton className="h-3.5 w-4/5" />
            <div className="flex gap-2">
              <Skeleton className="h-7 flex-1 rounded-lg" />
              <Skeleton className="h-7 w-7 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
