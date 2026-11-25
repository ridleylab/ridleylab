import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Skeleton } from "@/components/ui/skeleton";

export default function BlogPostLoading() {
  return (
    <Section
      variant="default"
      spacing="none"
      className="pt-8 pb-20 md:pt-12 md:pb-24"
    >
      <Container size="xl">
        <div role="status" aria-busy="true" aria-label="Memuat artikel">
          <span className="sr-only">Memuat...</span>

          <Skeleton className="h-4 w-64 max-w-full mb-8" />

          <div className="mb-10 max-w-4xl mx-auto text-center space-y-4">
            <Skeleton className="h-4 w-40 mx-auto" />
            <Skeleton className="h-10 sm:h-12 w-full" />
            <Skeleton className="h-10 sm:h-12 w-3/4 mx-auto" />
            <Skeleton className="h-5 w-2/3 mx-auto" />
            <Skeleton className="h-4 w-48 mx-auto" />
          </div>

          <Skeleton className="w-full aspect-[21/9] rounded-3xl mb-14" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="min-w-0 lg:col-span-8 space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-8 w-2/3 mt-8" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-8 w-1/2 mt-8" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>

            <div className="min-w-0 lg:col-span-4 space-y-6">
              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 p-6 space-y-3">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              <Skeleton className="h-44 w-full rounded-2xl" />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
