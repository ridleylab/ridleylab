"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { deleteMediaAction } from "@/app/admin/media/actions";

export default function DeleteMediaButton({ id, url }: { id: string; url: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm("Yakin ingin menghapus media ini secara permanen?")) return;

    setIsDeleting(true);
    const res = await deleteMediaAction(id, url);
    setIsDeleting(false);

    if (res?.error) {
      alert(`Gagal menghapus: ${res.error}`);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className={`text-red-500 hover:text-red-600 transition flex items-center justify-center p-1 rounded-md hover:bg-red-50 ${
        isDeleting ? "opacity-50 cursor-not-allowed" : ""
      }`}
      title="Hapus Media"
    >
      <Trash2 size={14} />
    </button>
  );
}
