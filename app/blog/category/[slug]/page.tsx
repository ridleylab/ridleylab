import Link from "next/link";
import { getAllPosts, getCategories } from "@/lib/posts";
import PostCard from "@/components/blog/post-card";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((cat) => ({
    slug: cat.toLowerCase().replace(/\s+/g, "-"),
  }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params;
  const name = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `Artikel Kategori ${name}`,
    description: `Kumpulan panduan dan wawasan terbaru untuk kategori ${name} dari RIDLEY.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  const posts = await getAllPosts();
  const filteredPosts = posts.filter(
    (p) => p.category.toLowerCase().replace(/\s+/g, "-") === slug
  );

  // Find actual capitalized category name from list
  const categoryName =
    filteredPosts.length > 0
      ? filteredPosts[0].category
      : slug
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

  return (
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
  );
}
