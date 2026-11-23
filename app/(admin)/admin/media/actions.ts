"use server";

import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";
import { UTApi } from "uploadthing/server";
import { requireAdminSession } from "@/lib/auth/require-admin";

export async function deleteMediaAction(id: string, url: string) {
  try {
    await requireAdminSession();

    // Delete from UploadThing if it's an UploadThing URL
    if (url.includes("utfs.io/f/")) {
      const fileKey = url.split("/f/")[1];
      const utapi = new UTApi();
      await utapi.deleteFiles(fileKey);
    } else if (url.includes("utfs.io/a/")) {
      const fileKey = url.split("/").pop();
      if (fileKey) {
        const utapi = new UTApi();
        await utapi.deleteFiles(fileKey);
      }
    }

    // Delete from database
    await prisma.media.delete({ where: { id } });

    revalidatePath("/admin/media");
    return { success: true };
  } catch (error: unknown) {
    console.error("Delete media error:", error);
    const message = error instanceof Error ? error.message : "Gagal menghapus media.";
    return { success: false, error: message };
  }
}
