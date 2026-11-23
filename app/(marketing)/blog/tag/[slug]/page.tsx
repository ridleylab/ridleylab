import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { getAllPosts, getTags } from "@/lib/posts";
import PostCard from "@/components/blog/post-card";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

interface TagPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const tags = await getTags();
  return tags.map((tag) => ({
    slug: tag.toLowerCase().replace(/\s+/g, "-"),
  }));
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { slug } = await params;
  const name = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return buildMetadata({
    title: `Artikel dengan Tag #${name}`,
    description: `Kumpulan panduan dan wawasan terbaru dengan tag #${name} dari ${siteConfig.name}.`,
    path: `/blog/tag/${slug}`,
    noIndex: true,
  });
}

export default async function TagPage({ params }: TagPageProps) {
  const { slug } = await params;

  const posts = await getAllPosts();
  const filteredPosts = posts.filter((p) =>
    p.tags.some((tag) => tag.toLowerCase().replace(/\s+/g, "-") === slug)
  );

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
            { name: `#${tagName}`, path: `/blog/tag/${slug}` },
          ]}
          className="mb-8"
        />

        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="outline" className="mb-4">
            Arsip Tag
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mb-4 leading-tight">
            Tag: #{tagName}
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg leading-relaxed">
            Menampilkan panduan taktis yang berfokus pada topik #{tagName}.
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
              Tidak ada artikel dengan tag ini.
            </p>
            <Link
              href="/blog"
              className="inline-block mt-3 text-sm font-semibold text-zinc-950 dark:text-zinc-100 underline underline-offset-4"
            >
              Lihat Tag Lain
            </Link>
          </div>
        )}
      </Container>
    </Section>
  );
}
