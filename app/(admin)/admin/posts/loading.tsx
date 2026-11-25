import { Skeleton } from "@/components/ui/skeleton";

export default function AdminPostsLoading() {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-label="Memuat daftar artikel"
      className="space-y-6"
    >
      <span className="sr-only">Memuat...</span>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-52" />
          <Skeleton className="h-4 w-72 max-w-full" />
        </div>
        <Skeleton className="h-10 w-36" />
      </div>

      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 p-4 flex flex-col md:flex-row gap-3">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 w-full md:w-44" />
        <Skeleton className="h-10 w-full md:w-44" />
      </div>

      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 overflow-hidden">
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 grid grid-cols-12 gap-4">
          <Skeleton className="h-3.5 col-span-5" />
          <Skeleton className="h-3.5 col-span-3 hidden sm:block" />
          <Skeleton className="h-3.5 col-span-2 hidden sm:block" />
          <Skeleton className="h-3.5 col-span-2" />
        </div>
        <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="p-4 flex items-center justify-between gap-4">
              <div className="space-y-2 flex-1 min-w-0">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-48" />
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-8 w-8 rounded-lg" />
                <Skeleton className="h-8 w-8 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
