"use server";

import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { calculateReadingTime, type PostFaqItem } from "@/lib/posts";
import { requireAdminSession } from "@/lib/auth/require-admin";
import { siteConfig } from "@/config/site";

const faqItemSchema = z.object({
  question: z
    .string()
    .trim()
    .min(3, "Pertanyaan FAQ minimal 3 karakter.")
    .max(300, "Pertanyaan FAQ maksimal 300 karakter."),
  answer: z
    .string()
    .trim()
    .min(3, "Jawaban FAQ minimal 3 karakter.")
    .max(1500, "Jawaban FAQ maksimal 1500 karakter."),
});

const savePostSchema = z.object({
  title: z.string().trim().min(3, "Judul minimal 3 karakter.").max(200),
  slug: z.string().trim().min(2, "Slug wajib diisi.").max(200),
  description: z.string().trim().max(320),
  metaTitle: z.string().trim().max(120).optional().default(""),
  metaDescription: z.string().trim().max(320).optional().default(""),
  focusKeyword: z.string().trim().max(120).optional().default(""),
  ogImage: z.string().trim().max(1000).optional().default(""),
  coverImage: z.string().trim().max(1000).optional().default(""),
  content: z.string(),
  draft: z.boolean(),
  categoryId: z.string().nullable(),
  tagIds: z.array(z.string()),
  authorId: z.string().trim().nullable().optional().default(null),
  authorName: z.string().trim().max(120).optional(),
  faqs: z.array(faqItemSchema).max(15).optional().default([]),
});

function cleanUrlSlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export interface SavePostInput {
  title: string;
  slug: string;
  description: string;
  metaTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  ogImage?: string;
  coverImage: string;
  content: string;
  draft: boolean;
  categoryId: string | null;
  tagIds: string[];
  authorId?: string | null;
  authorName?: string;
  faqs?: PostFaqItem[];
}

export async function savePost(id: string | null, data: SavePostInput) {
  try {
    await requireAdminSession();

    const parsed = savePostSchema.safeParse(data);
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0]?.message || "Input artikel tidak valid.",
      };
    }

    const {
      title,
      slug,
      description,
      metaTitle,
      metaDescription,
      focusKeyword,
      ogImage,
      coverImage,
      content,
      draft,
      categoryId,
      tagIds,
      authorId,
      authorName,
      faqs,
    } = parsed.data;

    const cleanSlug = cleanUrlSlug(slug || title);
    if (!cleanSlug) {
      return { success: false, error: "Slug tidak valid." };
    }

    const readingTime = calculateReadingTime(content);

    const baseData = {
      title,
      slug: cleanSlug,
      description,
      metaTitle: metaTitle || null,
      metaDescription: metaDescription || null,
      focusKeyword: focusKeyword || null,
      ogImage: ogImage || null,
      faqJson:
        faqs.length > 0
          ? (faqs as unknown as Prisma.InputJsonValue)
          : Prisma.DbNull,
      coverImage: coverImage || null,
      content,
      readingTime,
      draft,
      categoryId: categoryId || null,
      authorId: authorId || null,
      authorName: authorName || siteConfig.founder.name,
    };

    let post;
    let previousSlug: string | null = null;

    if (id) {
      const existingPost = await prisma.post.findUnique({
        where: { id },
        select: { slug: true, publishedAt: true },
      });

      if (!existingPost) {
        return { success: false, error: "Artikel tidak ditemukan." };
      }

      previousSlug = existingPost.slug;

      if (cleanSlug !== existingPost.slug) {
        const collision = await prisma.post.findUnique({
          where: { slug: cleanSlug },
          select: { id: true },
        });
        if (collision) {
          return {
            success: false,
            error: "Slug sudah digunakan artikel lain.",
          };
        }
      }

      post = await prisma.post.update({
        where: { id },
        data: {
          ...baseData,
          // Preserve original publish date when editing an already-published article
          ...(!draft && !existingPost.publishedAt
            ? { publishedAt: new Date() }
            : {}),
        },
      });
    } else {
      const existing = await prisma.post.findUnique({
        where: { slug: cleanSlug },
        select: { id: true },
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

    revalidatePath("/blog", "layout");
    revalidatePath(`/blog/${post.slug}`);
    if (previousSlug && previousSlug !== post.slug) {
      revalidatePath(`/blog/${previousSlug}`);
    }
    revalidatePath("/blog/rss");
    revalidatePath("/admin/posts");
    revalidatePath(`/admin/posts/${post.slug}`);
    revalidatePath("/admin");
    revalidatePath("/sitemap.xml");
    revalidatePath("/llms.txt");

    return { success: true, slug: post.slug };
  } catch (error: unknown) {
    console.error("Save post error:", error);
    const message =
      error instanceof Error ? error.message : "Gagal menyimpan artikel.";
    return { success: false, error: message };
  }
}

export async function togglePostStatusAction(id: string, draft: boolean) {
  try {
    await requireAdminSession();

    const parsed = z
      .object({ id: z.string().min(1), draft: z.boolean() })
      .safeParse({ id, draft });

    if (!parsed.success) {
      return { success: false, error: "Permintaan ubah status tidak valid." };
    }

    const existing = await prisma.post.findUnique({
      where: { id: parsed.data.id },
      select: { slug: true, publishedAt: true },
    });

    if (!existing) {
      return { success: false, error: "Artikel tidak ditemukan." };
    }

    await prisma.post.update({
      where: { id: parsed.data.id },
      data: {
        draft: parsed.data.draft,
        ...(!parsed.data.draft && !existing.publishedAt
          ? { publishedAt: new Date() }
          : {}),
      },
    });

    revalidatePath("/blog", "layout");
    revalidatePath(`/blog/${existing.slug}`);
    revalidatePath("/blog/rss");
    revalidatePath("/admin/posts");
    revalidatePath("/admin");
    revalidatePath("/sitemap.xml");
    revalidatePath("/llms.txt");

    return { success: true };
  } catch (error: unknown) {
    console.error("Toggle status error:", error);
    const message =
      error instanceof Error ? error.message : "Gagal mengubah status artikel.";
    return { success: false, error: message };
  }
}

export async function deletePost(id: string) {
  try {
    await requireAdminSession();

    const parsed = z.string().min(1).safeParse(id);
    if (!parsed.success) {
      return { success: false, error: "ID artikel tidak valid." };
    }

    const post = await prisma.post.findUnique({
      where: { id: parsed.data },
    });

    if (!post) {
      return { success: false, error: "Artikel tidak ditemukan." };
    }

    await prisma.post.delete({
      where: { id: parsed.data },
    });

    revalidatePath("/blog", "layout");
    revalidatePath(`/blog/${post.slug}`);
    revalidatePath("/blog/rss");
    revalidatePath("/admin/posts");
    revalidatePath("/admin");
    revalidatePath("/sitemap.xml");
    revalidatePath("/llms.txt");

    return { success: true };
  } catch (error: unknown) {
    console.error("Delete post error:", error);
    const message =
      error instanceof Error ? error.message : "Gagal menghapus artikel.";
    return { success: false, error: message };
  }
}
