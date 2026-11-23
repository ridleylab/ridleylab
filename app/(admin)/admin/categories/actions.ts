"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { requireAdminSession } from "@/lib/auth/require-admin";

const nameSchema = z
  .string()
  .trim()
  .min(2, "Nama kategori minimal 2 karakter.")
  .max(60, "Nama kategori maksimal 60 karakter.");

function toCleanSlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function createCategoryAction(name: string) {
  try {
    await requireAdminSession();
    const parsed = nameSchema.safeParse(name);
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0]?.message || "Nama kategori tidak valid.",
      };
    }

    const slug = toCleanSlug(parsed.data);
    if (!slug) {
      return { success: false, error: "Slug kategori tidak valid." };
    }

    const existing = await prisma.category.findFirst({
      where: {
        OR: [{ name: parsed.data }, { slug }],
      },
      select: { id: true },
    });
    if (existing) {
      return { success: false, error: "Kategori dengan nama atau slug ini sudah ada." };
    }

    await prisma.category.create({
      data: { name: parsed.data, slug },
    });

    revalidatePath("/admin/categories");
    revalidatePath("/admin/posts");
    revalidatePath("/blog");
    revalidatePath("/sitemap.xml");

    return { success: true };
  } catch (error: unknown) {
    console.error("Create category error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gagal membuat kategori.",
    };
  }
}

export async function updateCategoryAction(id: string, name: string) {
  try {
    await requireAdminSession();
    const parsed = z
      .object({ id: z.string().min(1), name: nameSchema })
      .safeParse({ id, name });

    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0]?.message || "Input kategori tidak valid.",
      };
    }

    const slug = toCleanSlug(parsed.data.name);
    if (!slug) {
      return { success: false, error: "Slug kategori tidak valid." };
    }

    const collision = await prisma.category.findFirst({
      where: {
        id: { not: parsed.data.id },
        OR: [{ name: parsed.data.name }, { slug }],
      },
      select: { id: true },
    });
    if (collision) {
      return { success: false, error: "Kategori lain sudah menggunakan nama atau slug ini." };
    }

    await prisma.category.update({
      where: { id: parsed.data.id },
      data: { name: parsed.data.name, slug },
    });

    revalidatePath("/admin/categories");
    revalidatePath("/admin/posts");
    revalidatePath("/blog");
    revalidatePath("/sitemap.xml");

    return { success: true };
  } catch (error: unknown) {
    console.error("Update category error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gagal memperbarui kategori.",
    };
  }
}

export async function deleteCategoryAction(id: string) {
  try {
    await requireAdminSession();
    const parsed = z.string().min(1).safeParse(id);
    if (!parsed.success) {
      return { success: false, error: "ID kategori tidak valid." };
    }

    await prisma.category.delete({
      where: { id: parsed.data },
    });

    revalidatePath("/admin/categories");
    revalidatePath("/admin/posts");
    revalidatePath("/blog");
    revalidatePath("/sitemap.xml");

    return { success: true };
  } catch (error: unknown) {
    console.error("Delete category error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gagal menghapus kategori.",
    };
  }
}
