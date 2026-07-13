import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { marked } from "marked";
import { getPostBySlug, getAllPosts } from "@/lib/posts";
import TableOfContents from "@/components/blog/table-of-contents";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Artikel Tidak Ditemukan",
    };
  }

  return {
    title: post.metadata.title,
    description: post.metadata.description,
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.description,
      type: "article",
      publishedTime: post.metadata.publishedAt,
      authors: [post.metadata.author],
      images: [
        {
          url: post.metadata.coverImage || "/assets/images/online-course/OC-OG.jpg",
          alt: post.metadata.title,
        },
      ],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getAllPosts();

  // Find Prev / Next posts
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  // Find Related Posts (same category or sharing tags, excluding current)
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug)
    .filter((p) => p.category === post.metadata.category || p.tags.some((t) => post.metadata.tags.includes(t)))
    .slice(0, 3);

  const formattedDate = new Date(post.metadata.publishedAt).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.metadata.title,
    description: post.metadata.description,
    image: post.metadata.coverImage || "https://www.ridleylab.com/assets/images/online-course/OC-OG.jpg",
    datePublished: post.metadata.publishedAt,
    author: {
      "@type": "Organization",
      name: "RIDLEY - Pelatihan AI Social Media Marketing"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="bg-white min-h-screen py-16 text-black">
        <div className="ridley-container max-w-6xl">
        {/* BACK BUTTON */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-ridley-blue hover:underline"
          >
            &larr; Kembali ke Blog
          </Link>
        </div>

        {/* POST HEADER */}
        <header className="mb-10 text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 text-xs mb-4 font-bold">
            <Link
              href={`/blog/category/${post.metadata.category.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-ridley-blue uppercase tracking-wider hover:underline"
            >
              {post.metadata.category}
            </Link>
            <span className="text-gray-300">•</span>
            <span className="text-gray-500">{post.metadata.readingTime}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-medium mb-6 leading-tight tracking-tight">
            {post.metadata.title}
          </h1>

          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed mb-6">
            {post.metadata.description}
          </p>

          <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
            <span className="font-semibold text-black">{post.metadata.author}</span>
            <span>•</span>
            <span>{formattedDate}</span>
          </div>
        </header>

        {/* COVER IMAGE */}
        {post.metadata.coverImage && (
          <div className="relative w-full aspect-[21/9] rounded-[32px] overflow-hidden mb-16 border border-black/5 shadow-md">
            <Image
              src={post.metadata.coverImage}
              alt={post.metadata.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
        )}

        {/* CONTENT LAYOUT */}
        <div className="grid lg:grid-cols-12 gap-12">
          {/* MAIN HTML BODY */}
          <div className="lg:col-span-8">
            <div
              className="prose prose-lg md:prose-xl max-w-none prose-a:text-ridley-blue hover:prose-a:text-black prose-headings:font-medium prose-img:rounded-3xl prose-img:mx-auto prose-img:shadow-md"
              dangerouslySetInnerHTML={{ 
                __html: (() => {
                  const html = marked.parse(post.content.replace(/<p>/g, '\n\n').replace(/<\/p>/g, '\n\n')) as string;
                  return html.replace(/<h([23])>(.*?)<\/h\1>/g, (match, level, text) => {
                    const id = text.replace(/<[^>]*>?/gm, '').toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
                    return `<h${level} id="${id}">${text}</h${level}>`;
                  });
                })()
              }}
            />

            {/* TAGS BLOCK */}
            {post.metadata.tags.length > 0 && (
              <div className="border-t border-gray-150 pt-8 mt-12">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mr-2">
                    Tags:
                  </span>
                  {post.metadata.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                      className="px-3.5 py-1 bg-gray-50 text-gray-500 rounded-xl text-xs font-bold hover:bg-gray-100 transition border border-gray-200"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* PREV & NEXT NAVIGATION */}
            <div className="border-t border-gray-150 pt-10 mt-12 grid sm:grid-cols-2 gap-6">
              {prevPost ? (
                <Link
                  href={`/blog/${prevPost.slug}`}
                  className="p-5 border border-gray-200 rounded-2xl hover:border-ridley-blue transition flex flex-col items-start text-left"
                >
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                    &larr; Artikel Sebelumnya
                  </span>
                  <span className="text-sm font-bold text-black line-clamp-1">
                    {prevPost.title}
                  </span>
                </Link>
              ) : (
                <div className="p-5 border border-gray-100 rounded-2xl bg-gray-50/50 flex flex-col items-start opacity-50 cursor-not-allowed">
                  <span className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">
                    &larr; Artikel Sebelumnya
                  </span>
                  <span className="text-sm font-bold text-gray-300">Tidak ada artikel</span>
                </div>
              )}

              {nextPost ? (
                <Link
                  href={`/blog/${nextPost.slug}`}
                  className="p-5 border border-gray-200 rounded-2xl hover:border-ridley-blue transition flex flex-col items-end text-right"
                >
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                    Artikel Selanjutnya &rarr;
                  </span>
                  <span className="text-sm font-bold text-black line-clamp-1">
                    {nextPost.title}
                  </span>
                </Link>
              ) : (
                <div className="p-5 border border-gray-100 rounded-2xl bg-gray-50/50 flex flex-col items-end opacity-50 cursor-not-allowed">
                  <span className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">
                    Artikel Selanjutnya &rarr;
                  </span>
                  <span className="text-sm font-bold text-gray-300">Tidak ada artikel</span>
                </div>
              )}
            </div>
          </div>

          {/* SIDEBAR BLOCK */}
          <aside className="lg:col-span-4 space-y-8">
            <TableOfContents content={post.content} />
          </aside>
        </div>

        {/* RELATED POSTS SECTION */}
        {relatedPosts.length > 0 && (
          <div className="border-t border-gray-150 pt-16 mt-16">
            <h3 className="text-2xl font-medium text-black mb-8 text-center sm:text-left">
              Artikel Terkait
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((rPost) => (
                <article
                  key={rPost.slug}
                  className="bg-white border border-gray-150 rounded-2xl p-5 flex flex-col hover:shadow-md transition duration-300"
                >
                  <span className="text-[10px] font-bold text-ridley-blue uppercase tracking-wider mb-2 block">
                    {rPost.category}
                  </span>
                  <h4 className="font-bold text-black text-base line-clamp-2 mb-4 hover:text-ridley-blue transition duration-300">
                    <Link href={`/blog/${rPost.slug}`}>{rPost.title}</Link>
                  </h4>
                  <Link
                    href={`/blog/${rPost.slug}`}
                    className="text-xs font-bold text-ridley-blue mt-auto inline-flex items-center gap-1"
                  >
                    Baca Selengkapnya
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3 h-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
    </>
  );
}
