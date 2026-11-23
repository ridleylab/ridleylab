import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { getAllPosts, getCategoryList } from "@/lib/posts";
import PostCard from "@/components/blog/post-card";
import JsonLd from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";
import { getBlogCategorySchemaGraph } from "@/lib/seo/schema";
import { siteConfig } from "@/config/site";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

function formatFallbackName(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function generateStaticParams() {
  const categories = await getCategoryList();
  return categories.map((cat) => ({
    slug: cat.slug,
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const categories = await getCategoryList();
  const matched = categories.find((c) => c.slug === slug);
  const name = matched?.name || formatFallbackName(slug);

  return buildMetadata({
    title: `Artikel Kategori ${name}`,
    description: `Kumpulan panduan dan wawasan terbaru untuk kategori ${name} dari ${siteConfig.name}.`,
    path: `/blog/category/${slug}`,
  });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  const [posts, categories] = await Promise.all([
    getAllPosts(),
    getCategoryList(),
  ]);

  const matchedCategory = categories.find((c) => c.slug === slug);

  const filteredPosts = posts.filter(
    (p) =>
      p.categorySlug === slug ||
      p.category.toLowerCase().replace(/\s+/g, "-") === slug
  );

  const categoryName =
    matchedCategory?.name ||
    (filteredPosts.length > 0
      ? filteredPosts[0].category
      : formatFallbackName(slug));

  return (
    <>
      <JsonLd
        data={getBlogCategorySchemaGraph(categoryName, slug, filteredPosts)}
      />

      <Section
        variant="default"
        spacing="none"
        className="pt-8 pb-20 md:pt-12 md:pb-24"
      >
        <Container size="xl">
          <Breadcrumb
            items={[
              { name: "Home", path: "/" },
              { name: "Blog", path: "/blog" },
              { name: categoryName, path: `/blog/category/${slug}` },
            ]}
            className="mb-8"
          />

          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge variant="outline" className="mb-4">
              Kategori Artikel
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-4 leading-tight">
              Kategori: {categoryName}
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg leading-relaxed">
              Menampilkan panduan taktis untuk membantu scale up operasional
              bisnis jasa Anda di bawah topik {categoryName}.
            </p>
          </div>

          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-950 dark:text-zinc-100 hover:underline"
            >
              <ArrowLeft size={15} />
              <span>Kembali ke Semua Artikel</span>
            </Link>
          </div>

          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl">
              <p className="text-zinc-500 dark:text-zinc-400 text-base font-medium">
                Tidak ada artikel di kategori ini.
              </p>
              <Link
                href="/blog"
                className="inline-block mt-3 text-sm font-semibold text-zinc-950 dark:text-zinc-100 underline underline-offset-4"
              >
                Lihat Kategori Lain
              </Link>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
