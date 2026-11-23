import { prisma } from "@/lib/db/prisma";
import { siteConfig } from "@/config/site";
import PostsManager, { type AdminPostRow } from "@/components/admin/posts-manager";

export const metadata = {
  title: `Kelola Artikel - ${siteConfig.name} Admin`,
};

interface AdminPostsPageProps {
  searchParams: Promise<{ status?: string }>;
}

export default async function AdminPostsPage({ searchParams }: AdminPostsPageProps) {
  const params = await searchParams;
  const initialStatusFilter =
    params.status === "published" || params.status === "draft"
      ? params.status
      : "all";

  let posts: AdminPostRow[] = [];
  let categories: Array<{ id: string; name: string }> = [];

  try {
    const [rawPosts, rawCategories] = await Promise.all([
      prisma.post.findMany({
        orderBy: { updatedAt: "desc" },
        select: {
          id: true,
          slug: true,
          title: true,
          description: true,
          draft: true,
          readingTime: true,
          publishedAt: true,
          updatedAt: true,
          categoryId: true,
          category: { select: { name: true } },
        },
      }),
      prisma.category.findMany({
        orderBy: { name: "asc" },
        select: { id: true, name: true },
      }),
    ]);

    posts = rawPosts.map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      description: p.description,
      draft: p.draft,
      readingTime: p.readingTime,
      publishedAt: p.publishedAt ? p.publishedAt.toISOString() : null,
      updatedAt: p.updatedAt.toISOString(),
      categoryId: p.categoryId,
      categoryName: p.category?.name || "General",
    }));
    categories = rawCategories;
  } catch (error) {
    console.error("AdminPostsPage Prisma error:", error);
  }

  return (
    <PostsManager
      initialPosts={posts}
      categories={categories}
      initialStatusFilter={initialStatusFilter}
    />
  );
}
