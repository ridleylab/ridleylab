import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { siteConfig } from "@/config/site";
import PostEditorShell from "@/components/admin/editor/post-editor-shell";

export const metadata = {
  title: `Artikel Baru - ${siteConfig.name} Admin`,
};

interface NewPostPageProps {
  searchParams: Promise<{
    topic?: string;
    category?: string;
  }>;
}

export default async function NewPostPage({ searchParams }: NewPostPageProps) {
  const params = await searchParams;
  const initialTopic = (params.topic || "").trim();
  const initialCategoryName = (params.category || "").trim().toLowerCase();

  const [session, categories, tags, media, authors] = await Promise.all([
    auth(),
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

  const matchedCategory = initialCategoryName
    ? categories.find((c) => c.name.toLowerCase() === initialCategoryName)
    : undefined;

  const activeAuthor =
    authors.find((a) => a.email === session?.user?.email) || authors[0];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            Buat Artikel Baru
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            Tulis manual atau manfaatkan AI Brief Modal dengan Live SERP Preview
            &amp; Schema FAQ.
          </p>
        </div>

        <Link
          href="/admin/posts"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 px-3.5 py-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors w-fit"
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
        defaultAuthorId={activeAuthor?.id || ""}
        defaultAuthorName={activeAuthor?.name || siteConfig.founder.name}
        initialTopic={initialTopic}
        initialCategoryId={matchedCategory?.id || ""}
      />
    </div>
  );
}
