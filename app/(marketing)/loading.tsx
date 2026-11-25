import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Skeleton } from "@/components/ui/skeleton";

export default function MarketingLoading() {
  return (
    <Section
      variant="default"
      spacing="none"
      className="pt-10 pb-20 md:pt-14 md:pb-24"
    >
      <Container size="xl">
        <div role="status" aria-busy="true" aria-label="Memuat halaman">
          <span className="sr-only">Memuat...</span>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="min-w-0 lg:col-span-6 space-y-5">
              <Skeleton className="h-11 sm:h-14 w-full" />
              <Skeleton className="h-11 sm:h-14 w-4/5" />
              <div className="space-y-2.5 pt-2">
                <Skeleton className="h-4 w-full max-w-lg" />
                <Skeleton className="h-4 w-5/6 max-w-md" />
              </div>
              <div className="flex flex-col sm:flex-row gap-3.5 pt-2">
                <Skeleton className="h-12 w-full sm:w-44" />
                <Skeleton className="h-12 w-full sm:w-44" />
              </div>
            </div>

            <div className="min-w-0 lg:col-span-6 flex justify-center lg:justify-end">
              <Skeleton className="w-full max-w-[460px] aspect-square rounded-3xl" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="rounded-3xl border border-zinc-200 dark:border-zinc-800 p-7 space-y-4"
              >
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-7 w-2/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-10 w-full mt-4" />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
