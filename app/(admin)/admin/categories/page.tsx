import { prisma } from "@/lib/db/prisma";
import { siteConfig } from "@/config/site";
import CategoriesManager, {
  type AdminCategoryRow,
} from "@/components/admin/categories-manager";

export const metadata = {
  title: `Kelola Kategori - ${siteConfig.name} Admin`,
};

export default async function AdminCategoriesPage() {
  let categories: AdminCategoryRow[] = [];

  try {
    const raw = await prisma.category.findMany({
      orderBy: { name: "asc" },
      include: { _count: { select: { posts: true } } },
    });
    categories = raw.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      postCount: c._count.posts,
    }));
  } catch (error) {
    console.error("Prisma loading error in categories:", error);
  }

  return <CategoriesManager initialCategories={categories} />;
}
