import Link from "next/link";
import { getAllPosts, getTags } from "@/lib/posts";
import PostCard from "@/components/blog/post-card";

interface TagPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const tags = await getTags();
  return tags.map((tag) => ({
    slug: tag.toLowerCase().replace(/\s+/g, "-"),
  }));
}

export async function generateMetadata({ params }: TagPageProps) {
  const { slug } = await params;
  const name = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `Artikel dengan Tag #${name}`,
    description: `Kumpulan panduan dan wawasan terbaru dengan tag #${name} dari RIDLEY.`,
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { slug } = await params;

  const posts = await getAllPosts();
  const filteredPosts = posts.filter((p) =>
    p.tags.some((tag) => tag.toLowerCase().replace(/\s+/g, "-") === slug)
  );

  // Find actual tag capitalized name
  let tagName = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  if (filteredPosts.length > 0) {
    const matchedTag = filteredPosts[0].tags.find(
      (t) => t.toLowerCase().replace(/\s+/g, "-") === slug
    );
    if (matchedTag) tagName = matchedTag;
  }

  return (
    <div className="bg-white min-h-screen py-16">
      <div className="ridley-container">
        {/* HEADER BLOCK */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h1 className="text-4xl md:text-5xl font-medium text-black mt-4 mb-5 leading-tight">
            Tag: #{tagName}
          </h1>
          <p className="ridley-text text-gray-500">
            Menampilkan panduan taktis yang berfokus pada topik #{tagName}.
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
              Tidak ada artikel dengan tag ini.
            </p>
            <Link
              href="/blog"
              className="inline-block mt-4 text-sm font-bold text-ridley-blue hover:underline"
            >
              Lihat Tag Lain
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
