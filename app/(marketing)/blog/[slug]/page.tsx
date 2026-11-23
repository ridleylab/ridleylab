import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { marked } from "marked";
import { getPostBySlug, getAllPosts } from "@/lib/posts";
import TableOfContents from "@/components/blog/table-of-contents";
import JsonLd from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";
import { getBlogPostSchemaGraph } from "@/lib/seo/schema";
import { programs } from "@/config/programs";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return buildMetadata({
      title: "Artikel Tidak Ditemukan",
      description: "Artikel yang Anda cari tidak tersedia.",
      path: `/blog/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: post.metadata.title,
    description: post.metadata.description,
    path: `/blog/${post.metadata.slug}`,
    image: post.metadata.coverImage || programs.onlineCourse.ogImage,
    type: "article",
    publishedTime: post.metadata.publishedAt,
    modifiedTime: post.metadata.updatedAt,
    authors: [post.metadata.author],
  });
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getAllPosts();

  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const prevPost =
    currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug)
    .filter(
      (p) =>
        p.category === post.metadata.category ||
        p.tags.some((t) => post.metadata.tags.includes(t))
    )
    .slice(0, 3);

  const formattedDate = new Date(post.metadata.publishedAt).toLocaleDateString(
    "id-ID",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  const plainText = post.content.replace(/<[^>]*>?/gm, " ").trim();
  const wordCount = plainText ? plainText.split(/\s+/).filter(Boolean).length : 0;

  const renderedHtml = (() => {
    const html = marked.parse(
      post.content.replace(/<p>/g, "\n\n").replace(/<\/p>/g, "\n\n")
    ) as string;
    return html.replace(
      /<h([23])>(.*?)<\/h\1>/g,
      (match, level, text) => {
        const id = text
          .replace(/<[^>]*>?/gm, "")
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-");
        return `<h${level} id="${id}">${text}</h${level}>`;
      }
    );
  })();

  return (
    <>
      <JsonLd data={getBlogPostSchemaGraph(post.metadata, wordCount)} />

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
              {
                name: post.metadata.category,
                path: `/blog/category/${post.metadata.categorySlug}`,
              },
              { name: post.metadata.title, path: `/blog/${post.metadata.slug}` },
            ]}
            className="mb-8"
          />

          <article>
            {/* POST HEADER */}
            <header className="mb-10 max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 text-xs mb-4 font-semibold">
                <Link
                  href={`/blog/category/${post.metadata.categorySlug}`}
                  className="uppercase tracking-wider text-zinc-950 dark:text-zinc-100 hover:underline"
                >
                  {post.metadata.category}
                </Link>
                <span className="text-zinc-300 dark:text-zinc-700">•</span>
                <span className="text-zinc-500 dark:text-zinc-400">
                  {post.metadata.readingTime}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-5 leading-[1.12]">
                {post.metadata.title}
              </h1>

              <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-6">
                {post.metadata.description}
              </p>

              <div className="flex items-center justify-center gap-3 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                <span className="font-semibold text-zinc-950 dark:text-zinc-100">
                  {post.metadata.author}
                </span>
                <span>•</span>
                <time dateTime={post.metadata.publishedAt}>
                  {formattedDate}
                </time>
              </div>
            </header>

            {/* COVER IMAGE */}
            {post.metadata.coverImage && (
              <div className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden mb-14 border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
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

            {/* CONTENT + SIDEBAR */}
            <div className="grid lg:grid-cols-12 gap-12">
              <div className="lg:col-span-8">
                <div
                  className="prose prose-zinc dark:prose-invert prose-lg max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-a:underline prose-a:underline-offset-4 prose-img:rounded-2xl prose-img:mx-auto"
                  dangerouslySetInnerHTML={{ __html: renderedHtml }}
                />

                {/* SOFT CONVERSION BANNER */}
                <div className="mt-12 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/70 p-7 sm:p-8">
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                    Implementasi Bersama Tim
                  </p>
                  <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-2">
                    Ingin Memasang Sistem Konten &amp; Prompt AI Ini ke Tim
                    Marketing Anda?
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                    Pelajari fondasinya lewat Online Course ({programs.onlineCourse.priceFormatted}) atau bimbing tim Anda 8x sesi privat lewat Online Mentoring Google Meet ({programs.onlineMentoring.priceFormatted}).
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <ButtonLink
                      href={programs.onlineMentoring.path}
                      variant="primary"
                      size="md"
                    >
                      <span>Lihat Online Mentoring</span>
                      <ArrowRight size={15} />
                    </ButtonLink>
                    <ButtonLink
                      href={programs.onlineCourse.path}
                      variant="outline"
                      size="md"
                    >
                      Cek Online Course
                    </ButtonLink>
                  </div>
                </div>

                {/* TAGS */}
                {post.metadata.tags.length > 0 && (
                  <div className="border-t border-zinc-200 dark:border-zinc-800 pt-8 mt-10">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mr-1">
                        Tags:
                      </span>
                      {post.metadata.tags.map((tag) => (
                        <Link
                          key={tag}
                          href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                          className="px-3 py-1 bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 rounded-lg text-xs font-medium hover:text-zinc-950 dark:hover:text-white transition-colors border border-zinc-200 dark:border-zinc-800"
                        >
                          #{tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* PREV / NEXT */}
                <div className="border-t border-zinc-200 dark:border-zinc-800 pt-8 mt-10 grid sm:grid-cols-2 gap-4">
                  {prevPost ? (
                    <Link
                      href={`/blog/${prevPost.slug}`}
                      className="p-5 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors flex flex-col items-start text-left"
                    >
                      <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 inline-flex items-center gap-1 mb-1">
                        <ArrowLeft size={12} /> Artikel Sebelumnya
                      </span>
                      <span className="text-sm font-semibold text-zinc-950 dark:text-zinc-100 line-clamp-1">
                        {prevPost.title}
                      </span>
                    </Link>
                  ) : (
                    <div className="p-5 border border-zinc-100 dark:border-zinc-900 rounded-2xl bg-zinc-50 dark:bg-zinc-900/30 opacity-50">
                      <span className="text-xs text-zinc-400 block mb-1">
                        Artikel Sebelumnya
                      </span>
                      <span className="text-sm text-zinc-400">
                        Tidak ada artikel
                      </span>
                    </div>
                  )}

                  {nextPost ? (
                    <Link
                      href={`/blog/${nextPost.slug}`}
                      className="p-5 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors flex flex-col items-end text-right"
                    >
                      <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 inline-flex items-center gap-1 mb-1">
                        Artikel Selanjutnya <ArrowRight size={12} />
                      </span>
                      <span className="text-sm font-semibold text-zinc-950 dark:text-zinc-100 line-clamp-1">
                        {nextPost.title}
                      </span>
                    </Link>
                  ) : (
                    <div className="p-5 border border-zinc-100 dark:border-zinc-900 rounded-2xl bg-zinc-50 dark:bg-zinc-900/30 opacity-50 flex flex-col items-end text-right">
                      <span className="text-xs text-zinc-400 block mb-1">
                        Artikel Selanjutnya
                      </span>
                      <span className="text-sm text-zinc-400">
                        Tidak ada artikel
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* SIDEBAR */}
              <aside className="lg:col-span-4 space-y-6">
                <div className="sticky top-24 space-y-6">
                  <TableOfContents content={post.content} />

                  <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-950 text-zinc-100 p-6">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                      Program Pendampingan
                    </p>
                    <h4 className="text-base font-semibold text-white mb-2">
                      Online Mentoring via Google Meet
                    </h4>
                    <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                      8x sesi privat melatih tim konten &amp; admin CS Anda
                      memakai AI hingga siap jalan.
                    </p>
                    <ButtonLink
                      href={programs.onlineMentoring.path}
                      variant="inverted"
                      size="sm"
                      fullWidth
                    >
                      Cek Jadwal &amp; Kurikulum
                    </ButtonLink>
                  </div>
                </div>
              </aside>
            </div>
          </article>

          {/* RELATED POSTS */}
          {relatedPosts.length > 0 && (
            <div className="border-t border-zinc-200 dark:border-zinc-800 pt-14 mt-16">
              <h3 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-8">
                Artikel Terkait
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((rPost) => (
                  <Card
                    key={rPost.slug}
                    variant="default"
                    interactive
                    padding="md"
                    className="flex flex-col"
                  >
                    <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2 block">
                      {rPost.category}
                    </span>
                    <h4 className="font-semibold text-zinc-950 dark:text-zinc-50 text-base line-clamp-2 mb-4 hover:underline">
                      <Link href={`/blog/${rPost.slug}`}>{rPost.title}</Link>
                    </h4>
                    <Link
                      href={`/blog/${rPost.slug}`}
                      className="text-xs font-semibold text-zinc-950 dark:text-zinc-100 mt-auto inline-flex items-center gap-1"
                    >
                      <span>Baca Selengkapnya</span>
                      <ArrowRight size={13} />
                    </Link>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
