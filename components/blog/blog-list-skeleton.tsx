import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Skeleton } from "@/components/ui/skeleton";

interface BlogListSkeletonProps {
  showSearch?: boolean;
  showBackLink?: boolean;
}

export function BlogListSkeleton({
  showSearch = false,
  showBackLink = false,
}: BlogListSkeletonProps) {
  return (
    <Section
      variant="default"
      spacing="none"
      className="pt-8 pb-20 md:pt-12 md:pb-24"
    >
      <Container size="xl">
        <div role="status" aria-busy="true" aria-label="Memuat daftar artikel">
          <span className="sr-only">Memuat...</span>

          <Skeleton className="h-4 w-44 mb-8" />

          <div className="max-w-3xl mx-auto text-center mb-12 space-y-3">
            <Skeleton className="h-10 sm:h-12 w-4/5 mx-auto" />
            <Skeleton className="h-4 w-full max-w-xl mx-auto" />
            <Skeleton className="h-4 w-2/3 max-w-md mx-auto" />
          </div>

          {showSearch && (
            <div className="mb-12 space-y-5">
              <Skeleton className="h-12 w-full max-w-xl mx-auto rounded-2xl" />
              <div className="flex flex-wrap justify-center gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-8 w-24 rounded-full" />
                ))}
              </div>
            </div>
          )}

          {showBackLink && <Skeleton className="h-5 w-44 mb-8" />}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden flex flex-col"
              >
                <Skeleton className="aspect-[16/10] w-full rounded-none" />
                <div className="p-6 space-y-3 flex-1 flex flex-col">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-4/5" />
                  <div className="space-y-2 pt-1 flex-1">
                    <Skeleton className="h-3.5 w-full" />
                    <Skeleton className="h-3.5 w-full" />
                    <Skeleton className="h-3.5 w-3/4" />
                  </div>
                  <div className="pt-4 border-t border-zinc-100 dark:border-zinc-900 flex items-center justify-between">
                    <Skeleton className="h-3.5 w-24" />
                    <Skeleton className="h-3.5 w-20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
