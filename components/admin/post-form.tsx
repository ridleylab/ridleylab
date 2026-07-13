"use client";

import React, { useState, useEffect } from "react";
import { savePost, deletePost } from "@/app/admin/posts/actions";
import { useRouter } from "next/navigation";
import Image from "next/image";
import RichTextEditor from "./rich-text-editor";
import { generateSEO, generateFullArticle } from "@/app/admin/posts/ai-actions";

interface PostFormProps {
  categories: { id: string; name: string }[];
  tags: { id: string; name: string }[];
  media: { id: string; filename: string; url: string }[];
  initialPost?: {
    id: string;
    title: string;
    slug: string;
    description: string;
    coverImage: string | null;
    content: string;
    draft: boolean;
    categoryId: string | null;
    authorName: string;
    tags: { tagId: string }[];
  };
}

export default function PostForm({
  categories,
  tags,
  media,
  initialPost,
}: PostFormProps) {
  const router = useRouter();

  // Form states
  const [title, setTitle] = useState(initialPost?.title || "");
  const [slug, setSlug] = useState(initialPost?.slug || "");
  const [description, setDescription] = useState(initialPost?.description || "");
  const [coverImage, setCoverImage] = useState(initialPost?.coverImage || "");
  const [content, setContent] = useState(initialPost?.content || "");
  const [draft, setDraft] = useState(initialPost?.draft ?? true);
  const [categoryId, setCategoryId] = useState(initialPost?.categoryId || "");
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>(
    initialPost?.tags.map((t) => t.tagId) || []
  );
  const [authorName, setAuthorName] = useState(initialPost?.authorName || "Thofhan Zaka Anshori");

  // UI States
  const [isSlugLocked, setIsSlugLocked] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isGeneratingSEO, setIsGeneratingSEO] = useState(false);
  const [isGeneratingArticle, setIsGeneratingArticle] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [isMediaDrawerOpen, setIsMediaDrawerOpen] = useState(false);

  // Auto-generate slug from title
  useEffect(() => {
    if (isSlugLocked && !initialPost) {
      const generatedSlug = title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "") // remove special chars
        .replace(/\s+/g, "-") // replace spaces with hyphens
        .replace(/-+/g, "-"); // remove duplicate hyphens
      setSlug(generatedSlug);
    }
  }, [title, isSlugLocked, initialPost]);

  // Toggle tag selection
  const handleTagToggle = (tagId: string) => {
    setSelectedTagIds((prev) =>
      prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]
    );
  };

  // Save Post Handler
  const handleSave = async (e: React.FormEvent, isDraft: boolean) => {
    e.preventDefault();
    setIsSaving(true);
    setDraft(isDraft);
    setMessage(null);

    const result = await savePost(initialPost?.id || null, {
      title,
      slug,
      description,
      coverImage,
      content,
      draft: isDraft,
      categoryId: categoryId || null,
      tagIds: selectedTagIds,
      authorName,
    });

    setIsSaving(false);

    if (result.success) {
      setMessage({ type: "success", text: "Artikel berhasil disimpan!" });
      router.push("/admin/posts");
      router.refresh();
    } else {
      setMessage({ type: "error", text: result.error || "Gagal menyimpan artikel." });
    }
  };

  // Delete Post Handler
  const handleDelete = async () => {
    if (!initialPost?.id) return;
    if (!confirm("Apakah Anda yakin ingin menghapus artikel ini? Tindakan ini tidak dapat dibatalkan.")) return;

    setIsDeleting(true);
    setMessage(null);

    const result = await deletePost(initialPost.id);
    setIsDeleting(false);

    if (result.success) {
      router.push("/admin/posts");
      router.refresh();
    } else {
      setMessage({ type: "error", text: result.error || "Gagal menghapus artikel." });
    }
  };

  const handleGenerateSEO = async () => {
    if (!content || content.length < 50) {
      alert("Tulis artikel terlebih dahulu (minimal 50 karakter) agar AI bisa membaca isinya!");
      return;
    }

    setIsGeneratingSEO(true);
    try {
      const res = await generateSEO(content);
      if (res.success && res.data) {
        setTitle(res.data.title);
        setDescription(res.data.description);
        // Force update slug if it was locked or empty
        if (!isSlugLocked) {
          setSlug(res.data.title.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-"));
        }
      } else {
        alert(res.error || "Gagal menghasilkan SEO dengan AI.");
      }
    } catch (error) {
      alert("Terjadi kesalahan saat memanggil AI.");
    } finally {
      setIsGeneratingSEO(false);
    }
  };

  const handleGenerateArticle = async () => {
    const topic = window.prompt("Ide / Topik Artikel (contoh: 'Strategi Instagram Marketing untuk Scale Up Bisnis' atau 'Pentingnya SOP Konten'):");
    if (!topic) return;

    setIsGeneratingArticle(true);
    try {
      const res = await generateFullArticle(topic);
      if (res.success && res.data) {
        setTitle(res.data.title);
        setDescription(res.data.description);
        setContent(res.data.content);
        if (!isSlugLocked || slug === "") {
          setSlug(res.data.title.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-"));
        }
      } else {
        alert(res.error || "Gagal menghasilkan artikel dengan AI.");
      }
    } catch (error) {
      alert("Terjadi kesalahan saat memanggil AI.");
    } finally {
      setIsGeneratingArticle(false);
    }
  };

  return (
    <div className="relative text-black">
      {/* ALERT MESSAGE */}
      {message && (
        <div
          className={`mb-6 p-4 rounded-xl border text-sm font-semibold flex items-center justify-between ${message.type === "success"
            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
            : "bg-red-50 text-red-700 border-red-200"
            }`}
        >
          <span>{message.text}</span>
          <button onClick={() => setMessage(null)} className="text-xs hover:underline">
            Tutup
          </button>
        </div>
      )}

      {/* FORM BODY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: MAIN EDITOR */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 shadow-sm flex items-center justify-between">
            <div>
              <h3 className="font-bold text-ridley-blue text-lg">AI Auto-Pilot</h3>
              <p className="text-gray-600 text-sm">Buat judul, isi, dan SEO meta otomatis dari sebuah topik.</p>
            </div>
            <button
              type="button"
              onClick={handleGenerateArticle}
              disabled={isGeneratingArticle}
              className="bg-ridley-blue hover:bg-[#216694] text-white px-5 py-3 rounded-xl font-bold transition shadow-md shadow-ridley-blue/20 disabled:opacity-50 flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed"
            >
              {isGeneratingArticle ? "Generating..." : "Generate Full Article"}
            </button>
          </div>

          {/* TITLE & SLUG */}
          <div className="bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl p-6 shadow-sm space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Judul Artikel
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Masukkan judul artikel..."
                required
                className="w-full px-4 py-3 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 border border-white/60 backdrop-blur-sm focus:border-ridley-blue focus:bg-white text-black font-bold placeholder-gray-400 rounded-xl outline-none transition text-base"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>Slug Artikel (URL)</span>
                <button
                  type="button"
                  onClick={() => setIsSlugLocked(!isSlugLocked)}
                  className="text-ridley-blue text-xs font-bold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  {isSlugLocked ? "🔓 Edit Manual" : "🔒 Kunci Slug"}
                </button>
              </label>
              <div className="flex rounded-xl bg-gradient-to-r from-blue-50/50 to-indigo-50/50 border border-white/60 backdrop-blur-sm overflow-hidden">
                <span className="bg-gray-100 border-r px-3.5 py-3 text-xs text-gray-400 select-none flex items-center font-bold">
                  /blog/
                </span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  disabled={isSlugLocked}
                  placeholder="slug-artikel-ini"
                  required
                  className="w-full px-4 py-3 bg-transparent text-gray-800 disabled:text-gray-500 font-mono text-sm outline-none transition"
                />
              </div>
            </div>
          </div>

          {/* EDITOR AREA */}
          <div className="bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl shadow-sm overflow-hidden flex flex-col min-h-[500px]">
            <RichTextEditor value={content} onChange={setContent} />
          </div>
        </div>

        {/* RIGHT COLUMN: METADATA & CONTROLS */}
        <div className="lg:col-span-4 space-y-6">
          {/* ACTIONS CARD */}
          <div className="bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-black text-sm border-b pb-2 mb-4">Publication</h3>

            <div className="space-y-3">
              <button
                type="button"
                onClick={(e) => handleSave(e, false)}
                disabled={isSaving}
                className="w-full bg-ridley-blue text-white py-3 rounded-xl font-bold text-sm hover:bg-[#216694] transition shadow-md shadow-ridley-blue/20 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
              >
                {isSaving && !draft ? "Processing..." : "Publish"}
              </button>

              <button
                type="button"
                onClick={(e) => handleSave(e, true)}
                disabled={isSaving}
                className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-bold text-sm hover:bg-gray-200 transition disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
              >
                {isSaving && draft ? "Saving..." : "Save Draft"}
              </button>

              {initialPost?.id && (
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="w-full border border-red-200 bg-red-50/50 text-red-600 hover:bg-red-50 py-3 rounded-xl font-bold text-sm transition disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              )}
            </div>
          </div>

          {/* METADATA CARD */}
          <div className="bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="font-bold text-black text-sm">Meta Description & Cover</h3>
              <button
                type="button"
                onClick={handleGenerateSEO}
                disabled={isGeneratingSEO}
                className="text-[10px] font-bold bg-blue-50 text-ridley-blue border border-blue-200 px-2 py-1 rounded-md hover:bg-blue-100 transition disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
              >
                {isGeneratingSEO ? "⏳ Generating..." : "✨ Generate SEO"}
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Meta Description (Ringkasan)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tulis ringkasan singkat artikel..."
                rows={3}
                required
                className="w-full px-4 py-3 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 border border-white/60 backdrop-blur-sm focus:border-ridley-blue focus:bg-white text-gray-800 text-sm rounded-xl outline-none resize-none leading-relaxed transition"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>URL Cover Image</span>
                <button
                  type="button"
                  onClick={() => setIsMediaDrawerOpen(true)}
                  className="text-ridley-blue hover:underline text-[10px] font-bold cursor-pointer"
                >
                  Pilih dari Media
                </button>
              </label>
              <input
                type="text"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="Contoh: /uploads/cover.jpg"
                className="w-full px-4 py-3 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 border border-white/60 backdrop-blur-sm focus:border-ridley-blue focus:bg-white text-gray-800 text-xs rounded-xl outline-none font-mono transition"
              />
              {coverImage && (
                <div className="relative aspect-video w-full rounded-xl overflow-hidden mt-3 border border-white/60 bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
                  <img src={coverImage} alt="Cover Preview" className="object-cover w-full h-full" />
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Writer Name
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Nama Penulis..."
                className="w-full px-4 py-3 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 border border-white/60 backdrop-blur-sm focus:border-ridley-blue focus:bg-white text-gray-800 text-sm rounded-xl outline-none transition"
              />
            </div>
          </div>

          {/* CATEGORY & TAGS CARD */}
          <div className="bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-black text-sm border-b pb-2">Category & Tag</h3>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Category
              </label>
              <div className="relative">
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full pl-4 pr-10 py-3 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 border border-white/60 backdrop-blur-sm focus:border-ridley-blue focus:bg-white text-gray-800 text-sm rounded-xl outline-none transition cursor-pointer appearance-none"
                >
                  <option value="">-- Pilih Kategori --</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Tag Article
              </label>
              <div className="grid grid-cols-2 gap-2 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 p-4 border border-white/60 rounded-xl max-h-48 overflow-y-auto">
                {tags.map((tag) => (
                  <label
                    key={tag.id}
                    className="flex items-center gap-2 text-xs font-semibold text-gray-700 cursor-pointer select-none"
                  >
                    <input
                      type="checkbox"
                      checked={selectedTagIds.includes(tag.id)}
                      onChange={() => handleTagToggle(tag.id)}
                      className="rounded border-gray-400 text-ridley-blue focus:ring-ridley-blue w-4 h-4 cursor-pointer"
                    />
                    <span>{tag.name}</span>
                  </label>
                ))}
                {tags.length === 0 && (
                  <span className="text-[10px] text-gray-400 col-span-2">
                    Belum ada tag yang dibuat.
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MEDIA DRAWER SLIDE-OVER */}
      {isMediaDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMediaDrawerOpen(false)}
          ></div>

          {/* Drawer Content */}
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-white/60 animate-slide-in">
            {/* Drawer Header */}
            <div className="p-6 border-b border-white/60 flex items-center justify-between">
              <div>
                <h3 className="font-black text-black text-lg">Pilih dari Media</h3>
                <p className="text-xs text-gray-400">Sisipkan gambar atau salin URL media ter-upload</p>
              </div>
              <button
                type="button"
                onClick={() => setIsMediaDrawerOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center font-bold text-sm"
              >
                ✕
              </button>
            </div>

            {/* Media Items Grid */}
            <div className="flex-grow p-6 overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                {media.map((item) => (
                  <div
                    key={item.id}
                    className="group border border-white/60 rounded-xl overflow-hidden hover:border-ridley-blue transition bg-gradient-to-r from-blue-50/50 to-indigo-50/50 flex flex-col"
                  >
                    <div className="relative aspect-video w-full bg-gray-100 overflow-hidden">
                      <img
                        src={item.url}
                        alt={item.filename}
                        className="object-cover w-full h-full group-hover:scale-105 transition duration-300"
                      />
                    </div>
                    <div className="p-3 space-y-2 flex-grow flex flex-col justify-between">
                      <p className="text-[10px] text-gray-500 font-bold truncate" title={item.filename}>
                        {item.filename}
                      </p>
                      <div className="grid grid-cols-2 gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setCoverImage(item.url);
                            setIsMediaDrawerOpen(false);
                          }}
                          className="px-2 py-1.5 bg-gray-100 hover:bg-gray-200 text-black text-[9px] font-bold rounded-lg transition"
                        >
                          Cover
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(item.url);
                            setIsMediaDrawerOpen(false);
                            alert("URL Gambar berhasil disalin! Silakan gunakan fitur 'Image' di editor.");
                          }}
                          className="px-2 py-1.5 bg-ridley-blue text-white text-[9px] font-bold rounded-lg hover:bg-[#216694] transition"
                        >
                          Salin URL
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {media.length === 0 && (
                  <div className="col-span-2 text-center py-12 text-gray-400 space-y-2">
                    <p className="text-sm font-semibold">Media Gallery Kosong</p>
                    <p className="text-xs">
                      Silakan upload gambar terlebih dahulu di menu Media Gallery.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


