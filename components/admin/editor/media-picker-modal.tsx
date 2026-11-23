"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Copy, ImagePlus, Search } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/components/ui/toast";

export interface MediaAssetItem {
  id: string;
  filename: string;
  url: string;
}

interface MediaPickerModalProps {
  open: boolean;
  onClose: () => void;
  media: MediaAssetItem[];
  selectLabel?: string;
  onSelectCover?: (url: string) => void;
  onInsertToEditor?: (url: string, alt: string) => void;
}

export default function MediaPickerModal({
  open,
  onClose,
  media,
  selectLabel = "Cover",
  onSelectCover,
  onInsertToEditor,
}: MediaPickerModalProps) {
  const { toast } = useToast();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return media;
    return media.filter((item) => item.filename.toLowerCase().includes(q));
  }, [media, query]);

  const handleCopyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "URL gambar disalin",
        variant: "success",
      });
    } catch {
      toast({
        title: "Gagal menyalin URL",
        variant: "error",
      });
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Pilih Aset Media"
      description="Gunakan sebagai cover artikel, sisipkan ke dalam tulisan, atau salin URL."
      size="lg"
    >
      <div className="space-y-4">
        <div className="relative">
          <Search
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari nama file media..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-sm text-zinc-950 dark:text-zinc-50 placeholder-zinc-400 outline-none focus:border-zinc-950 dark:focus:border-zinc-400"
          />
        </div>

        <div className="max-h-[420px] overflow-y-auto pr-1">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 overflow-hidden flex flex-col"
                >
                  <div className="relative aspect-video w-full bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
                    <Image
                      src={item.url}
                      alt={item.filename}
                      fill
                      unoptimized
                      className="object-cover"
                      sizes="220px"
                    />
                  </div>
                  <div className="p-2.5 flex-1 flex flex-col justify-between gap-2">
                    <p
                      className="text-[11px] font-medium text-zinc-800 dark:text-zinc-200 truncate"
                      title={item.filename}
                    >
                      {item.filename}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {onSelectCover && (
                        <button
                          type="button"
                          onClick={() => {
                            onSelectCover(item.url);
                            toast({
                              title: `${selectLabel} image diperbarui`,
                              variant: "success",
                            });
                            onClose();
                          }}
                          className="flex-1 px-2 py-1 rounded-lg bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 text-[10px] font-semibold cursor-pointer"
                        >
                          {selectLabel}
                        </button>
                      )}
                      {onInsertToEditor && (
                        <button
                          type="button"
                          onClick={() => {
                            onInsertToEditor(item.url, item.filename);
                            toast({
                              title: "Gambar disisipkan ke editor",
                              variant: "success",
                            });
                            onClose();
                          }}
                          title="Sisipkan ke dalam artikel"
                          className="inline-flex items-center justify-center gap-1 px-2 py-1 rounded-lg border border-zinc-300 dark:border-zinc-700 text-[10px] font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                        >
                          <ImagePlus size={11} />
                          <span>Sisip</span>
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleCopyUrl(item.url)}
                        aria-label={`Salin URL ${item.filename}`}
                        title="Salin URL"
                        className="p-1 rounded-lg border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                      >
                        <Copy size={11} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-sm text-zinc-500 dark:text-zinc-400 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl">
              Belum ada media yang cocok. Upload gambar baru dari menu Media Gallery.
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
