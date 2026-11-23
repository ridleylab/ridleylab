"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { requireAdminSession } from "@/lib/auth/require-admin";

const nameSchema = z
  .string()
  .trim()
  .min(2, "Nama tag minimal 2 karakter.")
  .max(50, "Nama tag maksimal 50 karakter.");

function toCleanSlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function createTagAction(name: string) {
  try {
    await requireAdminSession();
    const parsed = nameSchema.safeParse(name);
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0]?.message || "Nama tag tidak valid.",
      };
    }

    const slug = toCleanSlug(parsed.data);
    if (!slug) {
      return { success: false, error: "Slug tag tidak valid." };
    }

    const existing = await prisma.tag.findFirst({
      where: {
        OR: [{ name: parsed.data }, { slug }],
      },
      select: { id: true },
    });
    if (existing) {
      return { success: false, error: "Tag dengan nama atau slug ini sudah ada." };
    }

    await prisma.tag.create({
      data: { name: parsed.data, slug },
    });

    revalidatePath("/admin/tags");
    revalidatePath("/admin/posts");
    revalidatePath("/blog");

    return { success: true };
  } catch (error: unknown) {
    console.error("Create tag error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gagal membuat tag.",
    };
  }
}

export async function updateTagAction(id: string, name: string) {
  try {
    await requireAdminSession();
    const parsed = z
      .object({ id: z.string().min(1), name: nameSchema })
      .safeParse({ id, name });

    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0]?.message || "Input tag tidak valid.",
      };
    }

    const slug = toCleanSlug(parsed.data.name);
    if (!slug) {
      return { success: false, error: "Slug tag tidak valid." };
    }

    const collision = await prisma.tag.findFirst({
      where: {
        id: { not: parsed.data.id },
        OR: [{ name: parsed.data.name }, { slug }],
      },
      select: { id: true },
    });
    if (collision) {
      return { success: false, error: "Tag lain sudah menggunakan nama atau slug ini." };
    }

    await prisma.tag.update({
      where: { id: parsed.data.id },
      data: { name: parsed.data.name, slug },
    });

    revalidatePath("/admin/tags");
    revalidatePath("/admin/posts");
    revalidatePath("/blog");

    return { success: true };
  } catch (error: unknown) {
    console.error("Update tag error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gagal memperbarui tag.",
    };
  }
}

export async function deleteTagAction(id: string) {
  try {
    await requireAdminSession();
    const parsed = z.string().min(1).safeParse(id);
    if (!parsed.success) {
      return { success: false, error: "ID tag tidak valid." };
    }

    await prisma.tag.delete({
      where: { id: parsed.data },
    });

    revalidatePath("/admin/tags");
    revalidatePath("/admin/posts");
    revalidatePath("/blog");

    return { success: true };
  } catch (error: unknown) {
    console.error("Delete tag error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gagal menghapus tag.",
    };
  }
}
