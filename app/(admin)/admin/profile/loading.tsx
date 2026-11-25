import { Skeleton } from "@/components/ui/skeleton";

export default function AdminProfileLoading() {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-label="Memuat profil admin"
      className="space-y-6 max-w-2xl"
    >
      <span className="sr-only">Memuat...</span>

      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96 max-w-full" />
      </div>

      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 p-6 sm:p-8 space-y-5">
        <div className="space-y-2">
          <Skeleton className="h-3.5 w-28" />
          <Skeleton className="h-10 w-full" />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Skeleton className="h-3.5 w-32" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-3.5 w-32" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>

        <div className="space-y-2">
          <Skeleton className="h-3.5 w-36" />
          <Skeleton className="h-24 w-full" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-3.5 w-40" />
          <Skeleton className="h-10 w-full" />
        </div>

        <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>

        <Skeleton className="h-10 w-44" />
      </div>
    </div>
  );
}
