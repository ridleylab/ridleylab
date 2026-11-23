"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Edit3, Plus, Search, Trash2 } from "lucide-react";
import {
  createTagAction,
  deleteTagAction,
  updateTagAction,
} from "@/app/(admin)/admin/tags/actions";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/components/ui/toast";

export interface AdminTagRow {
  id: string;
  name: string;
  slug: string;
  postCount: number;
}

interface TagsManagerProps {
  initialTags: AdminTagRow[];
}

export default function TagsManager({ initialTags }: TagsManagerProps) {
  const router = useRouter();
  const { toast } = useToast();

  const [newName, setNewName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [search, setSearch] = useState("");

  const [editTarget, setEditTarget] = useState<AdminTagRow | null>(null);
  const [editName, setEditName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState<AdminTagRow | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return initialTags;
    return initialTags.filter(
      (t) => t.name.toLowerCase().includes(q) || t.slug.toLowerCase().includes(q)
    );
  }, [initialTags, search]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setIsCreating(true);
    const res = await createTagAction(newName);
    setIsCreating(false);

    if (res.success) {
      toast({ title: "Tag ditambahkan", variant: "success" });
      setNewName("");
      router.refresh();
    } else {
      toast({
        title: "Gagal menambah tag",
        description: res.error,
        variant: "error",
      });
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTarget || !editName.trim()) return;
    setIsUpdating(true);
    const res = await updateTagAction(editTarget.id, editName);
    setIsUpdating(false);

    if (res.success) {
      toast({ title: "Tag diperbarui", variant: "success" });
      setEditTarget(null);
      router.refresh();
    } else {
      toast({
        title: "Gagal memperbarui tag",
        description: res.error,
        variant: "error",
      });
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    const res = await deleteTagAction(deleteTarget.id);
    setIsDeleting(false);

    if (res.success) {
      toast({
        title: "Tag dihapus",
        description: `#${deleteTarget.name}`,
        variant: "success",
      });
      setDeleteTarget(null);
      router.refresh();
    } else {
      toast({
        title: "Gagal menghapus tag",
        description: res.error,
        variant: "error",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          Kelola Tag
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
          Buat, ubah nama, atau hapus tag topik untuk artikel blog.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 p-6">
          <h2 className="font-semibold text-base text-zinc-950 dark:text-zinc-50 mb-4">
            Tag Baru
          </h2>
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label
                htmlFor="tag-new-name"
                className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5"
              >
                Nama Tag
              </label>
              <input
                id="tag-new-name"
                type="text"
                required
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Misal: Instagram"
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-sm text-zinc-950 dark:text-zinc-50 placeholder-zinc-400 outline-none focus:border-zinc-950 dark:focus:border-zinc-400"
              />
            </div>

            <Button type="submit" variant="primary" fullWidth disabled={isCreating}>
              <Plus size={15} />
              <span>{isCreating ? "Menyimpan..." : "Tambah Tag"}</span>
            </Button>
          </form>
        </div>

        <div className="lg:col-span-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 overflow-hidden">
          <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
            <div className="relative max-w-xs">
              <Search
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari tag..."
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs sm:text-sm text-zinc-950 dark:text-zinc-50 placeholder-zinc-400 outline-none focus:border-zinc-950 dark:focus:border-zinc-400"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-50 dark:bg-zinc-950/60 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-800 whitespace-nowrap">
                <tr>
                  <th className="px-6 py-3.5">Tag</th>
                  <th className="px-6 py-3.5">Slug</th>
                  <th className="px-6 py-3.5">Artikel</th>
                  <th className="px-6 py-3.5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {filtered.map((tag) => (
                  <tr
                    key={tag.id}
                    className="hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-colors"
                  >
                    <td className="px-6 py-4 font-semibold text-zinc-950 dark:text-zinc-100">
                      #{tag.name}
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-zinc-500 dark:text-zinc-400">
                      {tag.slug}
                    </td>
                    <td className="px-6 py-4 text-xs text-zinc-600 dark:text-zinc-400">
                      {tag.postCount} artikel
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditTarget(tag);
                            setEditName(tag.name);
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                        >
                          <Edit3 size={12} />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(tag)}
                          aria-label={`Hapus ${tag.name}`}
                          className="p-1.5 rounded-lg text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 dark:hover:text-red-400 cursor-pointer"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-12 text-center text-sm text-zinc-500 dark:text-zinc-400"
                    >
                      Belum ada tag yang sesuai.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal
        open={Boolean(editTarget)}
        onClose={() => !isUpdating && setEditTarget(null)}
        title="Ubah Tag"
        description="Slug URL tag akan disesuaikan otomatis."
        size="sm"
      >
        <form onSubmit={handleUpdate} className="space-y-4">
          <input
            type="text"
            required
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-sm text-zinc-950 dark:text-zinc-50 outline-none focus:border-zinc-950 dark:focus:border-zinc-400"
          />
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isUpdating}
              onClick={() => setEditTarget(null)}
            >
              Batal
            </Button>
            <Button type="submit" variant="primary" size="sm" disabled={isUpdating}>
              {isUpdating ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        open={Boolean(deleteTarget)}
        onClose={() => !isDeleting && setDeleteTarget(null)}
        title="Hapus Tag?"
        description="Tag akan dilepas dari seluruh artikel terkait."
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
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white dark:bg-red-600 dark:text-white dark:hover:bg-red-700"
            >
              {isDeleting ? "Menghapus..." : "Hapus Tag"}
            </Button>
          </>
        }
      >
        <p className="text-sm text-zinc-700 dark:text-zinc-300">
          Yakin ingin menghapus tag{" "}
          <span className="font-semibold text-zinc-950 dark:text-zinc-50">
            #{deleteTarget?.name}
          </span>
          ?
        </p>
      </Modal>
    </div>
  );
}
