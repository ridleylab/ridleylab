import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts, getCategoryList } from "@/lib/posts";
import PostCard from "@/components/blog/post-card";
import JsonLd from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";
import { getBlogCategorySchemaGraph } from "@/lib/seo/schema";
import { siteConfig } from "@/config/site";

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

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
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
    (filteredPosts.length > 0 ? filteredPosts[0].category : formatFallbackName(slug));

  return (
    <>
      <JsonLd data={getBlogCategorySchemaGraph(categoryName, slug, filteredPosts)} />
      <div className="bg-white min-h-screen py-16">
        <div className="ridley-container">
          {/* HEADER BLOCK */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h1 className="text-4xl md:text-5xl font-medium text-black mt-4 mb-5 leading-tight">
              Kategori: {categoryName}
            </h1>
            <p className="ridley-text text-gray-500">
              Menampilkan panduan taktis untuk membantu scale up operasional bisnis Anda di bawah topik {categoryName}.
            </p>
          </div>

          {/* BACK TO BLOG */}
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-ridley-blue hover:underline"
            >
              &larr; Kembali ke Semua Artikel
            </Link>
          </div>

          {/* CONTENT GRID */}
          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border border-dashed border-gray-200 rounded-3xl">
              <p className="text-gray-400 text-lg font-bold">
                Tidak ada artikel di kategori ini.
              </p>
              <Link
                href="/blog"
                className="inline-block mt-4 text-sm font-bold text-ridley-blue hover:underline"
              >
                Lihat Kategori Lain
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
