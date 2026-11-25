import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Skeleton } from "@/components/ui/skeleton";

export default function PortfolioLoading() {
  return (
    <Section
      variant="default"
      spacing="none"
      className="pt-8 pb-20 md:pt-12 md:pb-24"
    >
      <Container size="xl">
        <div role="status" aria-busy="true" aria-label="Memuat portfolio">
          <span className="sr-only">Memuat...</span>

          <Skeleton className="h-4 w-36 mb-8" />

          <div className="max-w-3xl mx-auto text-center mb-12 space-y-3">
            <Skeleton className="h-10 sm:h-12 w-2/3 mx-auto" />
            <Skeleton className="h-4 w-full max-w-xl mx-auto" />
            <Skeleton className="h-4 w-3/4 max-w-md mx-auto" />
          </div>

          <div className="mb-12 space-y-5">
            <Skeleton className="h-12 w-full max-w-md mx-auto" />
            <div className="flex flex-wrap justify-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-28 rounded-full" />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden"
              >
                <Skeleton className="aspect-[4/3] w-full rounded-none" />
                <div className="p-6 space-y-3">
                  <Skeleton className="h-3.5 w-36" />
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-14 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <div className="space-y-2 pt-2">
                    <Skeleton className="h-3.5 w-full" />
                    <Skeleton className="h-3.5 w-4/5" />
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
