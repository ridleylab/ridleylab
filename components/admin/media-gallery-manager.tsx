"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  Copy,
  Expand,
  ExternalLink,
  FileText,
  Image as ImageIcon,
  Search,
  Trash2,
} from "lucide-react";
import { deleteMediaAction } from "@/app/(admin)/admin/media/actions";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/components/ui/toast";

export interface AdminMediaItem {
  id: string;
  filename: string;
  url: string;
  mimeType: string;
  size: number;
  createdAt: string;
}

interface MediaGalleryManagerProps {
  initialMedia: AdminMediaItem[];
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export default function MediaGalleryManager({
  initialMedia,
}: MediaGalleryManagerProps) {
  const router = useRouter();
  const { toast } = useToast();

  const [search, setSearch] = useState("");
  const [previewTarget, setPreviewTarget] = useState<AdminMediaItem | null>(
    null
  );
  const [deleteTarget, setDeleteTarget] = useState<AdminMediaItem | null>(
    null
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return initialMedia;
    return initialMedia.filter((m) => m.filename.toLowerCase().includes(q));
  }, [initialMedia, search]);

  const handleCopyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "URL aset disalin",
        description: url,
        variant: "success",
      });
    } catch {
      toast({
        title: "Gagal menyalin URL",
        variant: "error",
      });
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    const res = await deleteMediaAction(deleteTarget.id, deleteTarget.url);
    setIsDeleting(false);

    if (res.success) {
      toast({
        title: "Media berhasil dihapus",
        description: deleteTarget.filename,
        variant: "success",
      });
      setDeleteTarget(null);
      router.refresh();
    } else {
      toast({
        title: "Gagal menghapus media",
        description: res.error,
        variant: "error",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative max-w-sm">
        <Search
          size={15}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari nama file media..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm text-zinc-950 dark:text-zinc-50 placeholder-zinc-400 outline-none focus:border-zinc-950 dark:focus:border-zinc-400"
        />
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filtered.map((media) => {
            const isImage = media.mimeType.startsWith("image/");
            return (
              <div
                key={media.id}
                className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 p-3 flex flex-col"
              >
                <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-3 border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950 flex items-center justify-center group">
                  {isImage ? (
                    <>
                      <Image
                        src={media.url}
                        alt={media.filename}
                        fill
                        unoptimized
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 280px"
                      />
                      <button
                        type="button"
                        onClick={() => setPreviewTarget(media)}
                        aria-label={`Perbesar ${media.filename}`}
                        className="absolute inset-0 bg-black/0 group-hover:bg-black/35 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                      >
                        <Expand size={18} />
                      </button>
                    </>
                  ) : (
                    <FileText size={28} className="text-zinc-400" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p
                    className="text-xs font-semibold text-zinc-950 dark:text-zinc-100 truncate"
                    title={media.filename}
                  >
                    {media.filename}
                  </p>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                    {formatBytes(media.size)} ·{" "}
                    {new Date(media.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <div className="border-t border-zinc-100 dark:border-zinc-800 pt-2.5 mt-3 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleCopyUrl(media.url)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-zinc-200 dark:border-zinc-800 text-[11px] font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                    >
                      <Copy size={11} />
                      <span>Copy URL</span>
                    </button>

                    <a
                      href={media.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Buka di tab baru"
                      className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-950 dark:hover:text-white"
                    >
                      <ExternalLink size={12} />
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={() => setDeleteTarget(media)}
                    aria-label={`Hapus ${media.filename}`}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 dark:hover:text-red-400 cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-14 text-center">
          <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400">
            <ImageIcon size={22} />
          </div>
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Tidak ada aset media ditemukan.
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Upload gambar baru di panel sebelah kiri.
          </p>
        </div>
      )}

      {/* Lightbox Modal */}
      <Modal
        open={Boolean(previewTarget)}
        onClose={() => setPreviewTarget(null)}
        title={previewTarget?.filename || "Preview Media"}
        size="lg"
        footer={
          previewTarget && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopyUrl(previewTarget.url)}
              >
                <Copy size={13} />
                <span>Copy URL</span>
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setPreviewTarget(null)}
              >
                Tutup
              </Button>
            </>
          )
        }
      >
        {previewTarget && (
          <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <Image
              src={previewTarget.url}
              alt={previewTarget.filename}
              fill
              unoptimized
              className="object-contain"
              sizes="680px"
            />
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        open={Boolean(deleteTarget)}
        onClose={() => !isDeleting && setDeleteTarget(null)}
        title="Hapus Aset Media?"
        description="File akan dihapus dari galeri serta UploadThing (jika di-host di UploadThing)."
        size="sm"
        footer={
          <>
            <Button
              variant="outline"
              size="sm"
              disabled={isDeleting}
              onClick={() => setDeleteTarget(null)}
            >
              Batal
            </Button>
            <Button
              variant="primary"
              size="sm"
              disabled={isDeleting}
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white dark:bg-red-600 dark:text-white dark:hover:bg-red-700"
            >
              {isDeleting ? "Menghapus..." : "Hapus Permanen"}
            </Button>
          </>
        }
      >
        <p className="text-sm text-zinc-700 dark:text-zinc-300">
          Yakin ingin menghapus{" "}
          <span className="font-semibold text-zinc-950 dark:text-zinc-50 break-all">
            {deleteTarget?.filename}
          </span>
          ?
        </p>
      </Modal>
    </div>
  );
}
