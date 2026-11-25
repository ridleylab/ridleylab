import { Skeleton } from "@/components/ui/skeleton";

export default function AdminPanduanLoading() {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-label="Memuat panduan CMS"
      className="space-y-6 max-w-4xl"
    >
      <span className="sr-only">Memuat...</span>

      <div className="space-y-2">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-4 w-80 max-w-full" />
      </div>

      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 p-6 space-y-3"
          >
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ))}
      </div>
    </div>
  );
}
