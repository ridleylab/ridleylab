"use server";

import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";
import { calculateReadingTime } from "@/lib/posts";

export async function savePost(
  id: string | null,
  data: {
    title: string;
    slug: string;
    description: string;
    coverImage: string;
    content: string;
    draft: boolean;
    categoryId: string | null;
    tagIds: string[];
    authorName?: string;
  }
) {
  try {
    const {
      title,
      slug,
      description,
      coverImage,
      content,
      draft,
      categoryId,
      tagIds,
      authorName = "RIDLEY",
    } = data;

    if (!title || !slug) {
      return { success: false, error: "Judul dan slug wajib diisi." };
    }

    // Calculate reading time
    const readingTime = calculateReadingTime(content);

    // Clean slug format
    const cleanSlug = slug.toLowerCase().trim().replace(/\s+/g, "-");

    // Setup data object
    const dbData: any = {
      title,
      slug: cleanSlug,
      description,
      coverImage: coverImage || null,
      content,
      readingTime,
      draft,
      categoryId: categoryId || null,
      authorName,
    };

    // Set publishedAt if transitioning to published
    if (!draft) {
      dbData.publishedAt = new Date();
    }

    let post;

    if (id) {
      // Update existing post
      post = await prisma.post.update({
        where: { id },
        data: dbData,
      });
    } else {
      // Create new post
      // Check if slug is unique
      const existing = await prisma.post.findUnique({
        where: { slug: cleanSlug },
      });

      if (existing) {
        return { success: false, error: "Slug sudah digunakan. Silakan ubah judul atau slug." };
      }

      post = await prisma.post.create({
        data: dbData,
      });
    }

    // Sync tags (TagOnPost relations)
    // Delete existing tag mappings
    await prisma.tagOnPost.deleteMany({
      where: { postId: post.id },
    });

    // Insert new tag mappings
    if (tagIds.length > 0) {
      await prisma.tagOnPost.createMany({
        data: tagIds.map((tagId) => ({
          postId: post.id,
          tagId,
        })),
      });
    }

    // Revalidate cache for blog pages and admin table
    revalidatePath("/blog");
    revalidatePath(`/blog/${post.slug}`);
    revalidatePath("/admin/posts");
    revalidatePath(`/admin/posts/${post.slug}`);
    revalidatePath("/admin");

    return { success: true, slug: post.slug };
  } catch (error: any) {
    console.error("Save post error:", error);
    return { success: false, error: error.message || "Gagal menyimpan artikel." };
  }
}

export async function deletePost(id: string) {
  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      return { success: false, error: "Artikel tidak ditemukan." };
    }

    // Cascade delete is configured for TagOnPost in prisma, but delete post first
    await prisma.post.delete({
      where: { id },
    });

    // Revalidate paths
    revalidatePath("/blog");
    revalidatePath(`/blog/${post.slug}`);
    revalidatePath("/admin/posts");
    revalidatePath("/admin");

    return { success: true };
  } catch (error: any) {
    console.error("Delete post error:", error);
    return { success: false, error: error.message || "Gagal menghapus artikel." };
  }
}
