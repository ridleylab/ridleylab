import { prisma } from "@/lib/db/prisma";
import { siteConfig } from "@/config/site";
import TagsManager, { type AdminTagRow } from "@/components/admin/tags-manager";

export const metadata = {
  title: `Kelola Tag - ${siteConfig.name} Admin`,
};

export default async function AdminTagsPage() {
  let tags: AdminTagRow[] = [];

  try {
    const raw = await prisma.tag.findMany({
      orderBy: { name: "asc" },
      include: { _count: { select: { posts: true } } },
    });
    tags = raw.map((t) => ({
      id: t.id,
      name: t.name,
      slug: t.slug,
      postCount: t._count.posts,
    }));
  } catch (error) {
    console.error("Prisma loading error in tags:", error);
  }

  return <TagsManager initialTags={tags} />;
}
