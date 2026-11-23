import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { prisma } from "@/lib/db/prisma";
import { auth } from "@/lib/auth";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => {
      const session = await auth();
      if (!session?.user?.email) {
        throw new UploadThingError("Unauthorized");
      }
      return { userEmail: session.user.email };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete:", file.name, "by", metadata.userEmail);

      try {
        await prisma.media.create({
          data: {
            filename: file.name,
            url: file.url,
            mimeType: file.type || "image/jpeg",
            size: file.size,
          },
        });
      } catch (err) {
        console.error("Failed to save media to database:", err);
      }

      return { uploadedBy: metadata.userEmail, fileUrl: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
