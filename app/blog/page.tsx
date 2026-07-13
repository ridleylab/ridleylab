import Link from "next/link";
import { getAllPosts, getCategories, getTags } from "@/lib/posts";
import PostCard from "@/components/blog/post-card";
import SearchBar from "@/components/blog/search-bar";
import Pagination from "@/components/blog/pagination";

export const metadata = {
  title: "Blog - Pelatihan AI Social Media Marketing",
  description: "Dapatkan wawasan terbaru tentang pemanfaatan AI untuk social media marketing, pembuatan konten, dan strategi scale up bisnis jasa Anda.",
};

interface BlogPageProps {
  searchParams: Promise<{
    search?: string;
    page?: string;
  }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const searchVal = params.search || "";
  const pageVal = parseInt(params.page || "1", 10);

  const posts = await getAllPosts();
  const categories = await getCategories();
  const tags = await getTags();

  // Search logic
  const filteredPosts = posts.filter((post) => {
    const query = searchVal.toLowerCase();
    return (
      query === "" ||
      post.title.toLowerCase().includes(query) ||
      post.description.toLowerCase().includes(query) ||
      post.category.toLowerCase().includes(query) ||
      post.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  });

  // Pagination parameters
  const limit = 6;
  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / limit);
  const currentPage = Math.min(Math.max(1, pageVal), totalPages || 1);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * limit,
    currentPage * limit
  );

  return (
    <div className="bg-white min-h-screen py-16">
      <div className="ridley-container">
        {/* HEADER BLOCK */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h1 className="text-4xl md:text-5xl font-medium text-black mt-4 mb-5 leading-tight">
            Wawasan & Panduan Marketing Berbasis AI
          </h1>
          <p className="ridley-text text-gray-500 text-base">
            Pelajari alur taktis penerapan AI untuk konten social media, mempercepat operasional, dan mendatangkan klien untuk bisnis jasa Anda.
          </p>
        </div>

        {/* SEARCH AND FILTERS */}
        <div className="mb-12 space-y-6">
          <SearchBar />

          {/* Categories bar */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Kategori:
            </span>
            <Link
              href="/blog"
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition ${
                !searchVal
                  ? "bg-ridley-blue text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Semua
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/blog/category/${cat.toLowerCase().replace(/\s+/g, "-")}`}
                className="px-4 py-1.5 rounded-full text-xs font-bold bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>

        {/* CONTENT GRID */}
        {paginatedPosts.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              baseUrl="/blog"
              searchParams={{ search: searchVal }}
            />
          </>
        ) : (
          <div className="text-center py-20 border border-dashed border-gray-200 rounded-3xl">
            <p className="text-gray-400 text-lg font-bold">
              Tidak ada artikel yang cocok dengan pencarian Anda.
            </p>
            <Link
              href="/blog"
              className="inline-block mt-4 text-sm font-bold text-ridley-blue hover:underline"
            >
              Reset Pencarian
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
