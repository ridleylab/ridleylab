import { Skeleton } from "@/components/ui/skeleton";

export default function AdminTopikLoading() {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-label="Memuat 99 ide topik artikel"
      className="space-y-6"
    >
      <span className="sr-only">Memuat...</span>

      <div className="space-y-2">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-4 w-96 max-w-full" />
      </div>

      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 p-4 space-y-4">
        <Skeleton className="h-10 w-full max-w-md" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-28 rounded-full" />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 p-5 flex items-center justify-between gap-4"
          >
            <div className="space-y-2 flex-1">
              <Skeleton className="h-3.5 w-24" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
            <Skeleton className="h-9 w-28 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
