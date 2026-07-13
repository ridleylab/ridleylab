import { prisma } from "@/lib/db/prisma";
import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import { uploadMediaAction } from "./actions";
import UploadMediaBox from "@/components/admin/upload-media-box";

import DeleteMediaButton from "@/components/admin/delete-media-button";

export const metadata = {
  title: "Media Gallery - RIDLEY Admin",
};

export default async function AdminMediaPage() {
  let mediaList: any[] = [];
  try {
    mediaList = await prisma.media.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Prisma loading error in media:", error);
  }

  // Format bytes helper
  function formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  return (
    <div className="space-y-8 text-black">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-medium text-black">Media Gallery</h1>
          <p className="text-sm text-gray-500 mt-1">
            Upload dan kelola gambar sampul atau aset visual untuk postingan.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* FILE UPLOAD BOX */}
        <UploadMediaBox />

        {/* MEDIA GRID LIST */}
        <div className="lg:col-span-8">
          {mediaList.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {mediaList.map((media) => (
                <div
                  key={media.id}
                  className="bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl p-3 shadow-sm hover:shadow-md transition flex flex-col h-full"
                >
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-3 border border-black/5 bg-white/50 flex items-center justify-center">
                    {media.mimeType.startsWith("image/") ? (
                      <Image
                        src={media.url}
                        alt={media.filename}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 250px"
                      />
                    ) : (
                      <span className="text-3xl">📄</span>
                    )}
                  </div>
                  <div className="flex-grow">
                    <p className="text-xs font-bold text-black truncate" title={media.filename}>
                      {media.filename}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{formatBytes(media.size)}</p>
                  </div>
                  <div className="border-t border-white/50 pt-2 mt-3 flex items-center justify-between text-[10px] font-bold text-gray-400">
                    <div className="flex items-center gap-3">
                      <a
                        href={media.url}
                        target="_blank"
                        className="text-ridley-blue hover:underline"
                      >
                        Buka Aset
                      </a>
                      <DeleteMediaButton id={media.id} url={media.url} />
                    </div>
                    <span>
                      {new Date(media.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl p-16 text-center shadow-sm text-gray-400">
              <img src="/assets/images/admin/media2.svg" alt="Empty Media" className="w-16 h-16 mb-4 mx-auto opacity-80" />
              <p className="font-semibold">Belum ada file media yang di-upload.</p>
              <p className="text-xs text-gray-400 mt-1">
                Gunakan form di samping untuk meng-upload file media pertama Anda.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
