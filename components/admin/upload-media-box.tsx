"use client";

import "@uploadthing/react/styles.css";
import { useRouter } from "next/navigation";
import { UploadDropzone } from "@/utils/uploadthing";
import { useToast } from "@/components/ui/toast";

export default function UploadMediaBox() {
  const router = useRouter();
  const { toast } = useToast();

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 p-6 h-fit">
      <h2 className="font-semibold text-base text-zinc-950 dark:text-zinc-50 mb-1">
        Upload File Baru
      </h2>
      <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">
        Maksimal 4MB per gambar untuk cover dan aset artikel.
      </p>

      <UploadDropzone
        endpoint="imageUploader"
        onClientUploadComplete={(uploaded) => {
          toast({
            title: `${uploaded.length} file berhasil di-upload`,
            variant: "success",
          });
          router.refresh();
        }}
        onUploadError={(error: Error) => {
          toast({
            title: "Gagal meng-upload file",
            description: error.message,
            variant: "error",
          });
        }}
        appearance={{
          button:
            "bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 font-semibold text-xs rounded-xl px-5 py-2.5 cursor-pointer hover:opacity-90 transition-opacity",
          container:
            "border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl p-6 bg-zinc-50 dark:bg-zinc-950 hover:border-zinc-950 dark:hover:border-zinc-400 transition-colors cursor-pointer",
          label:
            "text-zinc-900 dark:text-zinc-100 hover:underline text-sm font-medium",
          allowedContent: "text-zinc-400 text-xs mt-2",
        }}
      />
    </div>
  );
}
