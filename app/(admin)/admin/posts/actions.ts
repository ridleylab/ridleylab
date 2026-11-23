"use server";

import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";
import { calculateReadingTime } from "@/lib/posts";
import { requireAdminSession } from "@/lib/auth/require-admin";
import { siteConfig } from "@/config/site";

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
    await requireAdminSession();

    const {
      title,
      slug,
      description,
      coverImage,
      content,
      draft,
      categoryId,
      tagIds,
      authorName = siteConfig.name,
    } = data;

    if (!title || !slug) {
      return { success: false, error: "Judul dan slug wajib diisi." };
    }

    const readingTime = calculateReadingTime(content);
    const cleanSlug = slug.toLowerCase().trim().replace(/\s+/g, "-");

    const baseData = {
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

    let post;

    if (id) {
      const existingPost = await prisma.post.findUnique({
        where: { id },
        select: { publishedAt: true },
      });

      post = await prisma.post.update({
        where: { id },
        data: {
          ...baseData,
          // Preserve original publish date when editing an already-published article
          ...( !draft && !existingPost?.publishedAt ? { publishedAt: new Date() } : {} ),
        },
      });
    } else {
      const existing = await prisma.post.findUnique({
        where: { slug: cleanSlug },
      });

      if (existing) {
        return {
          success: false,
          error: "Slug sudah digunakan. Silakan ubah judul atau slug.",
        };
      }

      post = await prisma.post.create({
        data: {
          ...baseData,
          publishedAt: !draft ? new Date() : null,
        },
      });
    }

    // Sync tags (TagOnPost relations)
    await prisma.tagOnPost.deleteMany({
      where: { postId: post.id },
    });

    if (tagIds.length > 0) {
      await prisma.tagOnPost.createMany({
        data: tagIds.map((tagId) => ({
          postId: post.id,
          tagId,
        })),
      });
    }

    revalidatePath("/blog");
    revalidatePath(`/blog/${post.slug}`);
    revalidatePath("/admin/posts");
    revalidatePath(`/admin/posts/${post.slug}`);
    revalidatePath("/admin");

    return { success: true, slug: post.slug };
  } catch (error: unknown) {
    console.error("Save post error:", error);
    const message =
      error instanceof Error ? error.message : "Gagal menyimpan artikel.";
    return { success: false, error: message };
  }
}

export async function deletePost(id: string) {
  try {
    await requireAdminSession();

    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      return { success: false, error: "Artikel tidak ditemukan." };
    }

    await prisma.post.delete({
      where: { id },
    });

    revalidatePath("/blog");
    revalidatePath(`/blog/${post.slug}`);
    revalidatePath("/admin/posts");
    revalidatePath("/admin");

    return { success: true };
  } catch (error: unknown) {
    console.error("Delete post error:", error);
    const message =
      error instanceof Error ? error.message : "Gagal menghapus artikel.";
    return { success: false, error: message };
  }
}
