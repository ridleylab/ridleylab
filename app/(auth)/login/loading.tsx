import { Skeleton } from "@/components/ui/skeleton";

export default function LoginLoading() {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-label="Memuat halaman login"
      className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-5 py-12"
    >
      <span className="sr-only">Memuat...</span>

      <div className="w-full max-w-md rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 p-7 sm:p-9 space-y-6">
        <div className="flex flex-col items-center space-y-3">
          <Skeleton className="h-9 w-36" />
          <Skeleton className="h-6 w-44" />
          <Skeleton className="h-4 w-60" />
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-3.5 w-24" />
            <Skeleton className="h-11 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-3.5 w-20" />
            <Skeleton className="h-11 w-full" />
          </div>
          <Skeleton className="h-11 w-full mt-2" />
        </div>
      </div>
    </div>
  );
}
