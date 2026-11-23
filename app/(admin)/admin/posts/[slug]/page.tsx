import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/db/prisma";
import { parseFaqJson } from "@/lib/posts";
import { siteConfig } from "@/config/site";
import PostEditorShell from "@/components/admin/editor/post-editor-shell";

interface EditPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: EditPostPageProps) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug },
    select: { title: true },
  });

  if (!post) {
    return {
      title: `Artikel Tidak Ditemukan - ${siteConfig.name} Admin`,
    };
  }

  return {
    title: `Edit: ${post.title} - ${siteConfig.name} Admin`,
  };
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { slug } = await params;

  const [post, categories, tags, media, authors] = await Promise.all([
    prisma.post.findUnique({
      where: { slug },
      include: {
        tags: {
          select: {
            tagId: true,
          },
        },
      },
    }),
    prisma.category.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    }),
    prisma.tag.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    }),
    prisma.media.findMany({
      orderBy: { createdAt: "desc" },
      select: { id: true, filename: true, url: true },
    }),
    prisma.user.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true, email: true, role: true },
    }),
  ]);

  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            Edit Artikel
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 truncate">
            Mengedit:{" "}
            <span className="font-semibold text-zinc-950 dark:text-zinc-100">
              {post.title}
            </span>
          </p>
        </div>

        <Link
          href="/admin/posts"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 px-3.5 py-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors w-fit shrink-0"
        >
          <ArrowLeft size={14} />
          <span>Kembali</span>
        </Link>
      </div>

      <PostEditorShell
        categories={categories}
        tags={tags}
        media={media}
        authors={authors}
        initialPost={{
          id: post.id,
          title: post.title,
          slug: post.slug,
          description: post.description,
          metaTitle: post.metaTitle,
          metaDescription: post.metaDescription,
          focusKeyword: post.focusKeyword,
          ogImage: post.ogImage,
          coverImage: post.coverImage,
          content: post.content,
          draft: post.draft,
          categoryId: post.categoryId,
          authorId: post.authorId,
          authorName: post.authorName,
          tags: post.tags,
          faqs: parseFaqJson(post.faqJson),
        }}
      />
    </div>
  );
}
