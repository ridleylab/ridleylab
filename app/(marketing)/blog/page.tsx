import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts, getCategoryList } from "@/lib/posts";
import PostCard from "@/components/blog/post-card";
import SearchBar from "@/components/blog/search-bar";
import Pagination from "@/components/blog/pagination";
import JsonLd from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";
import { getBlogIndexSchemaGraph } from "@/lib/seo/schema";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export const revalidate = 600;

interface BlogPageProps {
  searchParams: Promise<{
    search?: string;
    page?: string;
  }>;
}

export async function generateMetadata({
  searchParams,
}: BlogPageProps): Promise<Metadata> {
  const params = await searchParams;
  const searchVal = (params.search || "").trim();
  const pageNum = Math.max(1, parseInt(params.page || "1", 10) || 1);

  if (searchVal) {
    return buildMetadata({
      title: `Hasil Pencarian "${searchVal}" di Blog`,
      description: `Menampilkan hasil pencarian artikel AI Social Media Marketing untuk kata kunci "${searchVal}".`,
      path: "/blog",
      noIndex: true,
    });
  }

  return buildMetadata({
    title:
      pageNum > 1
        ? `Blog Pelatihan AI Social Media Marketing - Halaman ${pageNum}`
        : "Blog Pelatihan AI Social Media Marketing",
    description:
      "Dapatkan wawasan terbaru tentang pemanfaatan AI untuk social media marketing, pembuatan konten, SOP tim, dan strategi scale up bisnis jasa Anda.",
    path: pageNum > 1 ? `/blog?page=${pageNum}` : "/blog",
  });
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const searchVal = params.search || "";
  const pageVal = parseInt(params.page || "1", 10) || 1;

  const [posts, categories] = await Promise.all([
    getAllPosts(),
    getCategoryList(),
  ]);

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

  const limit = 6;
  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / limit);
  const currentPage = Math.min(Math.max(1, pageVal), totalPages || 1);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * limit,
    currentPage * limit
  );

  return (
    <>
      <JsonLd data={getBlogIndexSchemaGraph(paginatedPosts)} />

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
            ]}
            className="mb-8"
          />

          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge variant="outline" className="mb-4">
              Blog &amp; Panduan
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-4 leading-tight">
              Wawasan &amp; Panduan Marketing Berbasis AI
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg leading-relaxed">
              Alur taktis penerapan AI untuk konten social media, efisiensi SOP
              tim, dan konversi leads untuk bisnis jasa Anda.
            </p>
          </div>

          <div className="mb-12 space-y-5">
            <SearchBar />

            <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
              <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mr-1">
                Kategori:
              </span>
              <Link
                href="/blog"
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  !searchVal
                    ? "bg-zinc-950 text-white dark:bg-zinc-50 dark:text-zinc-950"
                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800"
                }`}
              >
                Semua
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/blog/category/${cat.slug}`}
                  className="px-4 py-1.5 rounded-full text-xs font-semibold bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          {paginatedPosts.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <div className="text-center py-16 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl">
              <p className="text-zinc-500 dark:text-zinc-400 text-base font-medium">
                Tidak ada artikel yang cocok dengan pencarian Anda.
              </p>
              <Link
                href="/blog"
                className="inline-block mt-3 text-sm font-semibold text-zinc-950 dark:text-zinc-100 underline underline-offset-4"
              >
                Reset Pencarian
              </Link>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
