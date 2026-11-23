import { prisma } from "@/lib/db/prisma";
import UploadMediaBox from "@/components/admin/upload-media-box";
import MediaGalleryManager, {
  type AdminMediaItem,
} from "@/components/admin/media-gallery-manager";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: `Media Gallery - ${siteConfig.name} Admin`,
};

export default async function AdminMediaPage() {
  let mediaList: AdminMediaItem[] = [];

  try {
    const raw = await prisma.media.findMany({
      orderBy: { createdAt: "desc" },
    });
    mediaList = raw.map((m) => ({
      id: m.id,
      filename: m.filename,
      url: m.url,
      mimeType: m.mimeType,
      size: m.size,
      createdAt: m.createdAt.toISOString(),
    }));
  } catch (error) {
    console.error("Prisma loading error in media:", error);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          Media Gallery
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
          Upload gambar via UploadThing, cari aset, salin URL, atau hapus media.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-4">
          <UploadMediaBox />
        </div>
        <div className="lg:col-span-8">
          <MediaGalleryManager initialMedia={mediaList} />
        </div>
      </div>
    </div>
  );
}
