"use client";

import "@uploadthing/react/styles.css";
import { UploadDropzone } from "@/utils/uploadthing";
import { useRouter } from "next/navigation";

export default function UploadMediaBox() {
  const router = useRouter();

  return (
    <div className="lg:col-span-4 bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl p-6 shadow-sm h-fit">
      <h3 className="font-bold text-black text-base mb-4">Upload File Baru</h3>
      
      <UploadDropzone
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          alert("Upload berhasil!");
          router.refresh();
        }}
        onUploadError={(error: Error) => {
          alert(`Gagal upload: ${error.message}`);
        }}
        appearance={{
          button: "bg-ridley-blue text-white font-bold rounded-xl px-6 py-2 cursor-pointer hover:bg-[#216694] transition-colors focus-within:ring-2 focus-within:ring-ridley-blue focus-within:ring-offset-2",
          container: "border-2 border-dashed border-gray-300 rounded-xl p-8 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer",
          label: "text-ridley-blue hover:text-blue-600 font-medium",
          allowedContent: "text-gray-400 text-xs mt-2",
        }}
      />
    </div>
  );
}
