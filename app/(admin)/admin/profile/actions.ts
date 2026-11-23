"use server";

import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { requireAdminSession } from "@/lib/auth/require-admin";

const profileSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Nama admin minimal 2 karakter.")
      .max(100, "Nama admin maksimal 100 karakter."),
    role: z
      .string()
      .trim()
      .max(120, "Jabatan maksimal 120 karakter.")
      .optional()
      .default(""),
    bio: z
      .string()
      .trim()
      .max(500, "Bio penulis maksimal 500 karakter.")
      .optional()
      .default(""),
    avatarUrl: z
      .string()
      .trim()
      .max(1000, "URL foto maksimal 1000 karakter.")
      .optional()
      .default(""),
    password: z.string().trim().optional().default(""),
    confirmPassword: z.string().trim().optional().default(""),
  })
  .refine((data) => data.password === "" || data.password.length >= 6, {
    message: "Password baru minimal 6 karakter.",
    path: ["password"],
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Konfirmasi password tidak cocok.",
    path: ["confirmPassword"],
  });

export async function updateProfileAction(input: {
  name: string;
  role?: string;
  bio?: string;
  avatarUrl?: string;
  password: string;
  confirmPassword: string;
}) {
  try {
    const session = await requireAdminSession();
    const activeEmail = session.user?.email;

    if (!activeEmail) {
      return { success: false, error: "Sesi email admin tidak ditemukan." };
    }

    const parsed = profileSchema.safeParse(input);
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0]?.message || "Data profil tidak valid.",
      };
    }

    const dataToUpdate: {
      name: string;
      role: string | null;
      bio: string | null;
      avatarUrl: string | null;
      password?: string;
    } = {
      name: parsed.data.name,
      role: parsed.data.role || null,
      bio: parsed.data.bio || null,
      avatarUrl: parsed.data.avatarUrl || null,
    };

    if (parsed.data.password) {
      dataToUpdate.password = await bcrypt.hash(parsed.data.password, 10);
    }

    await prisma.user.update({
      where: { email: activeEmail },
      data: dataToUpdate,
    });

    revalidatePath("/admin/profile");
    revalidatePath("/admin/posts");
    revalidatePath("/blog", "layout");

    return {
      success: true,
      passwordUpdated: Boolean(parsed.data.password),
    };
  } catch (error: unknown) {
    console.error("Update profile error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Gagal memperbarui profil.",
    };
  }
}
