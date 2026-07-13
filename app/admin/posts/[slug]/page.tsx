import { prisma } from "@/lib/db/prisma";
import { notFound } from "next/navigation";
import PostForm from "@/components/admin/post-form";
import Link from "next/link";

interface EditPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: EditPostPageProps) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug },
  });

  if (!post) {
    return {
      title: "Artikel Tidak Ditemukan - RIDLEY Admin",
    };
  }

  return {
    title: `Edit: ${post.title} - RIDLEY Admin`,
  };
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { slug } = await params;

  // Fetch the post from the database along with its tag links
  const post = await prisma.post.findUnique({
    where: { slug },
    include: {
      tags: {
        select: {
          tagId: true,
        },
      },
    },
  });

  if (!post) {
    notFound();
  }

  // Fetch selections from database
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
          <h1 className="text-3xl font-medium text-black">Edit Artikel</h1>
          <p className="text-sm text-gray-500 mt-1">
            Mengedit konten dan metadata artikel: <span className="font-bold text-black">{post.title}</span>
          </p>
        </div>
        <Link
          href="/admin/posts"
          className="text-xs font-bold text-gray-500 hover:text-black border px-3.5 py-2 rounded-xl hover:bg-white/50 transition font-semibold"
        >
          &larr; Kembali
        </Link>
      </div>

      <PostForm
        categories={categories}
        tags={tags}
        media={media}
        // @ts-ignore
        initialPost={post}
      />
    </div>
  );
}
