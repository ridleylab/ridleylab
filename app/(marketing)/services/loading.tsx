import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Skeleton } from "@/components/ui/skeleton";

export default function ServicesLoading() {
  return (
    <Section
      variant="default"
      spacing="none"
      className="pt-8 pb-20 md:pt-12 md:pb-24"
    >
      <Container size="xl">
        <div role="status" aria-busy="true" aria-label="Memuat halaman layanan">
          <span className="sr-only">Memuat...</span>

          <Skeleton className="h-4 w-52 mb-8" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16">
            <div className="min-w-0 lg:col-span-6 space-y-5">
              <Skeleton className="h-10 sm:h-12 w-full" />
              <Skeleton className="h-10 sm:h-12 w-4/5" />
              <Skeleton className="h-4 w-full max-w-lg" />
              <Skeleton className="h-4 w-3/4 max-w-md" />
              <div className="flex flex-col sm:flex-row gap-3.5 pt-2">
                <Skeleton className="h-12 w-full sm:w-48" />
                <Skeleton className="h-12 w-full sm:w-48" />
              </div>
            </div>

            <div className="min-w-0 lg:col-span-6">
              <Skeleton className="w-full h-80 sm:h-96 rounded-3xl" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="rounded-3xl border border-zinc-200 dark:border-zinc-800 p-8 space-y-4"
              >
                <Skeleton className="h-3.5 w-28" />
                <Skeleton className="h-7 w-40" />
                <Skeleton className="h-9 w-36" />
                <div className="space-y-2.5 pt-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
                <Skeleton className="h-11 w-full mt-4" />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
