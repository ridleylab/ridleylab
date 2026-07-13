"use server";

import { prisma } from "@/lib/db/prisma";
import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";

export async function uploadMediaAction(formData: FormData) {
  const file = formData.get("file") as File;
  if (!file || file.size === 0) return { success: false, error: "No file provided" };

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public", "uploads");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const safeFilename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    const filepath = path.join(uploadDir, safeFilename);

    fs.writeFileSync(filepath, buffer);

    const fileUrl = `/uploads/${safeFilename}`;

    await prisma.media.create({
      data: {
        filename: file.name,
        url: fileUrl,
        mimeType: file.type,
        size: file.size,
      },
    });

    revalidatePath("/admin/media");
    return { success: true, url: fileUrl };
  } catch (error: any) {
    console.error("File upload error:", error);
    return { success: false, error: error.message };
  }
}

import { UTApi } from "uploadthing/server";

export async function deleteMediaAction(id: string, url: string) {
  try {
    // Delete from UploadThing if it's an UploadThing URL
    if (url.includes("utfs.io/f/")) {
      const fileKey = url.split("/f/")[1];
      const utapi = new UTApi();
      await utapi.deleteFiles(fileKey);
    } else if (url.includes("utfs.io/a/")) {
       // Support for new App ID based URLs if applicable
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
  } catch (error: any) {
    console.error("Delete media error:", error);
    return { success: false, error: error.message };
  }
}
