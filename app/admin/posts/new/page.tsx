import { prisma } from "@/lib/db/prisma";
import PostForm from "@/components/admin/post-form";
import Link from "next/link";

export const metadata = {
  title: "Artikel Baru - RIDLEY Admin",
};

export default async function NewPostPage() {
  // Fetch lists from database to populate options
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  const tags = await prisma.tag.findMany({
    orderBy: { name: "asc" },
  });

  const media = await prisma.media.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8 text-black">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-medium text-black">Buat Artikel Baru</h1>
          <p className="text-sm text-gray-500 mt-1">
            Tulis dan publikasikan postingan artikel blog baru.
          </p>
        </div>
        <Link
          href="/admin/posts"
          className="text-xs font-bold text-gray-500 hover:text-black border px-3.5 py-2 rounded-xl hover:bg-white/50 transition font-semibold"
        >
          &larr; Kembali
        </Link>
      </div>

      <PostForm categories={categories} tags={tags} media={media} />
    </div>
  );
}
