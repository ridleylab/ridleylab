"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Image as ImageIcon,
  Loader2,
  Save,
  Send,
  Sparkles,
  Trash2,
} from "lucide-react";
import { generateSEO } from "@/app/(admin)/admin/posts/ai-actions";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

export interface AuthorOption {
  id: string;
  name: string | null;
  email: string;
  role: string | null;
}

interface PostSeoSidebarProps {
  title: string;
  slug: string;
  description: string;
  onDescriptionChange: (val: string) => void;
  metaTitle: string;
  onMetaTitleChange: (val: string) => void;
  metaDescription: string;
  onMetaDescriptionChange: (val: string) => void;
  focusKeyword: string;
  onFocusKeywordChange: (val: string) => void;
  coverImage: string;
  onCoverImageChange: (val: string) => void;
  ogImage: string;
  onOgImageChange: (val: string) => void;
  authorId: string;
  onAuthorIdChange: (authorId: string) => void;
  authors: AuthorOption[];
  authorName: string;
  onAuthorNameChange: (val: string) => void;
  categoryId: string;
  onCategoryIdChange: (val: string) => void;
  categories: Array<{ id: string; name: string }>;
  tags: Array<{ id: string; name: string }>;
  selectedTagIds: string[];
  onToggleTag: (tagId: string) => void;
  faqsCount: number;
  content: string;
  isDraft: boolean;
  isEditingExisting: boolean;
  isSaving: boolean;
  isDeleting: boolean;
  onPublish: () => void;
  onSaveDraft: () => void;
  onRequestDelete: () => void;
  onOpenMediaPicker: () => void;
  onOpenOgMediaPicker: () => void;
  onApplyAiSeo: (seo: { title: string; description: string }) => void;
}

export default function PostSeoSidebar({
  title,
  slug,
  description,
  onDescriptionChange,
  metaTitle,
  onMetaTitleChange,
  metaDescription,
  onMetaDescriptionChange,
  focusKeyword,
  onFocusKeywordChange,
  coverImage,
  onCoverImageChange,
  ogImage,
  onOgImageChange,
  authorId,
  onAuthorIdChange,
  authors,
  authorName,
  onAuthorNameChange,
  categoryId,
  onCategoryIdChange,
  categories,
  tags,
  selectedTagIds,
  onToggleTag,
  faqsCount,
  content,
  isDraft,
  isEditingExisting,
  isSaving,
  isDeleting,
  onPublish,
  onSaveDraft,
  onRequestDelete,
  onOpenMediaPicker,
  onOpenOgMediaPicker,
  onApplyAiSeo,
}: PostSeoSidebarProps) {
  const { toast } = useToast();
  const [isGeneratingSEO, setIsGeneratingSEO] = useState(false);

  const effectiveTitle = metaTitle.trim() || title.trim();
  const effectiveDescription = metaDescription.trim() || description.trim();

  const seoMetrics = useMemo(() => {
    const plainText = content
      .replace(/<[^>]*>?/gm, " ")
      .replace(/\s+/g, " ")
      .trim();
    const words = plainText ? plainText.split(/\s+/).filter(Boolean).length : 0;
    const h2Count = (content.match(/<h2\b/gi) || []).length;
    const kw = focusKeyword.trim().toLowerCase();
    const intro = plainText.slice(0, 260).toLowerCase();

    const titleOk = effectiveTitle.length >= 25 && effectiveTitle.length <= 65;
    const descOk =
      effectiveDescription.length >= 100 && effectiveDescription.length <= 165;
    const wordsOk = words >= 800;
    const h2Ok = h2Count >= 3;
    const coverOk =
      coverImage.trim().length > 0 || ogImage.trim().length > 0;
    const faqOk = faqsCount > 0;
    const kwInTitle = !kw || effectiveTitle.toLowerCase().includes(kw);
    const kwInSlug =
      !kw ||
      slug.toLowerCase().includes(kw.replace(/\s+/g, "-")) ||
      slug.toLowerCase().includes(kw.split(" ")[0] || "");
    const kwInIntro = !kw || intro.includes(kw);

    return {
      words,
      h2Count,
      titleOk,
      descOk,
      wordsOk,
      h2Ok,
      coverOk,
      faqOk,
      hasKeyword: Boolean(kw),
      kwInTitle,
      kwInSlug,
      kwInIntro,
    };
  }, [
    content,
    effectiveTitle,
    effectiveDescription,
    coverImage,
    ogImage,
    faqsCount,
    focusKeyword,
    slug,
  ]);

  const handleGenerateSEO = async () => {
    const plainLen = content.replace(/<[^>]*>?/gm, "").trim().length;
    if (plainLen < 50) {
      toast({
        title: "Konten masih terlalu pendek",
        description:
          "Tulis minimal 50 karakter di editor agar AI bisa membaca isinya.",
        variant: "error",
      });
      return;
    }

    setIsGeneratingSEO(true);
    const res = await generateSEO(content, focusKeyword.trim() || undefined);
    setIsGeneratingSEO(false);

    if (res.success && res.data) {
      onApplyAiSeo({
        title: res.data.title,
        description: res.data.description,
      });
      toast({
        title: "Meta Title & Meta Description SEO diperbarui AI",
        variant: "success",
      });
    } else {
      toast({
        title: "Gagal generate SEO",
        description: res.error || "Terjadi kesalahan saat memanggil AI.",
        variant: "error",
      });
    }
  };

  const titleLen = effectiveTitle.length;
  const descLen = description.trim().length;
  const metaDescLen = metaDescription.trim().length;
  const effectiveDescLen = effectiveDescription.length;

  const checklist = [
    {
      label: `Panjang Judul SEO (${titleLen}/60 karakter)`,
      ok: seoMetrics.titleOk,
      hint: "Ideal 25–65 karakter (Title atau Meta Title Kustom)",
    },
    {
      label: `Meta Description Aktif (${effectiveDescLen}/155 karakter)`,
      ok: seoMetrics.descOk,
      hint: "Ideal 100–165 karakter",
    },
    {
      label: `Kedalaman Konten (${seoMetrics.words} kata)`,
      ok: seoMetrics.wordsOk,
      hint: "Target minimal 800–1.200+ kata",
    },
    {
      label: `Struktur Subheading H2 (${seoMetrics.h2Count} H2)`,
      ok: seoMetrics.h2Ok,
      hint: "Minimal 3 bagian <h2>",
    },
    {
      label: "Cover atau OG Image terisi",
      ok: seoMetrics.coverOk,
      hint: "Wajib untuk OpenGraph & kartu blog",
    },
    {
      label: `FAQ Schema (${faqsCount} pertanyaan)`,
      ok: seoMetrics.faqOk,
      hint: "Tambah minimal 1 FAQ untuk Rich Results",
    },
    ...(seoMetrics.hasKeyword
      ? [
          {
            label: "Focus keyword di Judul & Slug",
            ok: seoMetrics.kwInTitle && seoMetrics.kwInSlug,
            hint: "Bantu relevansi URL",
          },
          {
            label: "Focus keyword di Paragraf Pembuka",
            ok: seoMetrics.kwInIntro,
            hint: "Sebut di 250 karakter awal",
          },
        ]
      : []),
  ];

  const passCount = checklist.filter((c) => c.ok).length;

  const isRenderableOg =
    ogImage.trim().startsWith("/") ||
    ogImage.trim().startsWith("https://") ||
    ogImage.trim().startsWith("http://");

  return (
    <div className="space-y-5">
      {/* Publication Card */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
          <h3 className="font-semibold text-sm text-zinc-950 dark:text-zinc-50">
            Publikasi
          </h3>
          <span
            className={cn(
              "px-2.5 py-0.5 rounded-full text-[11px] font-semibold",
              isDraft
                ? "bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-900"
                : "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-900"
            )}
          >
            {isDraft ? "Draft" : "Published"}
          </span>
        </div>

        <div className="space-y-2.5">
          <Button
            variant="primary"
            fullWidth
            disabled={isSaving}
            onClick={onPublish}
          >
            {isSaving && !isDraft ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <Send size={15} />
            )}
            <span>
              {isSaving && !isDraft ? "Menyimpan..." : "Publish Artikel"}
            </span>
          </Button>

          <Button
            variant="secondary"
            fullWidth
            disabled={isSaving}
            onClick={onSaveDraft}
          >
            {isSaving && isDraft ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <Save size={15} />
            )}
            <span>
              {isSaving && isDraft ? "Menyimpan..." : "Simpan sebagai Draft"}
            </span>
          </Button>

          {isEditingExisting && slug && (
            <Link
              href={`/blog/${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 py-2.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
            >
              <ExternalLink size={13} />
              <span>Buka Halaman Artikel</span>
            </Link>
          )}

          {isEditingExisting && (
            <button
              type="button"
              disabled={isDeleting}
              onClick={onRequestDelete}
              className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl border border-red-200 dark:border-red-900/60 bg-red-50/60 dark:bg-red-950/30 py-2.5 text-xs font-semibold text-red-700 dark:text-red-300 hover:bg-red-100/70 dark:hover:bg-red-950/60 transition-colors cursor-pointer disabled:opacity-50"
            >
              <Trash2 size={13} />
              <span>{isDeleting ? "Menghapus..." : "Hapus Artikel"}</span>
            </button>
          )}
        </div>
      </div>

      {/* Live Google SERP Preview */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm text-zinc-950 dark:text-zinc-50">
            Live Google SERP Preview
          </h3>
          <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
            Simulasi
          </span>
        </div>

        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-4 space-y-1">
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
            {siteConfig.url}/blog/{slug || "slug-artikel-anda"}
          </p>
          <p className="text-sm font-semibold text-blue-700 dark:text-blue-400 line-clamp-1">
            {effectiveTitle ||
              "Judul Artikel SEO Anda di Hasil Pencarian Google"}
          </p>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
            {effectiveDescription ||
              "Meta description ringkas yang menjelaskan nilai artikel untuk menarik klik dari hasil pencarian."}
          </p>
        </div>
      </div>

      {/* SEO Toolkit & Health Checklist */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
          <div>
            <h3 className="font-semibold text-sm text-zinc-950 dark:text-zinc-50">
              SEO Metadata &amp; Health
            </h3>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
              {passCount}/{checklist.length} indikator terpenuhi
            </p>
          </div>
          <button
            type="button"
            disabled={isGeneratingSEO}
            onClick={handleGenerateSEO}
            className="inline-flex items-center gap-1 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 px-2.5 py-1.5 text-[11px] font-semibold text-zinc-900 dark:text-zinc-100 hover:border-zinc-950 dark:hover:border-zinc-400 transition-colors cursor-pointer disabled:opacity-50"
          >
            {isGeneratingSEO ? (
              <Loader2 size={12} className="animate-spin" />
            ) : (
              <Sparkles size={12} />
            )}
            <span>{isGeneratingSEO ? "AI..." : "Generate SEO"}</span>
          </button>
        </div>

        <div>
          <label
            htmlFor="seo-focus-kw"
            className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5"
          >
            Focus Keyword (Tersimpan ke DB)
          </label>
          <input
            id="seo-focus-kw"
            type="text"
            value={focusKeyword}
            onChange={(e) => onFocusKeywordChange(e.target.value)}
            placeholder="Misal: SOP konten AI"
            className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs text-zinc-950 dark:text-zinc-50 placeholder-zinc-400 outline-none focus:border-zinc-950 dark:focus:border-zinc-400"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="seo-meta-title"
              className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
            >
              Meta Title Kustom (Opsional)
            </label>
            <span
              className={cn(
                "text-[11px] font-medium",
                metaTitle.trim().length > 65
                  ? "text-amber-600 dark:text-amber-400"
                  : "text-zinc-400"
              )}
            >
              {metaTitle.trim().length}/60
            </span>
          </div>
          <input
            id="seo-meta-title"
            type="text"
            maxLength={120}
            value={metaTitle}
            onChange={(e) => onMetaTitleChange(e.target.value)}
            placeholder="Kosongkan untuk pakai Judul Artikel"
            className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs text-zinc-950 dark:text-zinc-50 placeholder-zinc-400 outline-none focus:border-zinc-950 dark:focus:border-zinc-400"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="seo-meta-desc-custom"
              className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
            >
              Meta Description Kustom (Opsional)
            </label>
            <span
              className={cn(
                "text-[11px] font-medium",
                metaDescLen > 160
                  ? "text-red-600 dark:text-red-400"
                  : metaDescLen >= 110
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-zinc-400"
              )}
            >
              {metaDescLen}/155
            </span>
          </div>
          <textarea
            id="seo-meta-desc-custom"
            rows={2}
            maxLength={320}
            value={metaDescription}
            onChange={(e) => onMetaDescriptionChange(e.target.value)}
            placeholder="Kosongkan untuk pakai Ringkasan Artikel di bawah"
            className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs text-zinc-950 dark:text-zinc-50 placeholder-zinc-400 outline-none focus:border-zinc-950 dark:focus:border-zinc-400 resize-none leading-relaxed"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="seo-meta-desc"
              className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
            >
              Ringkasan Artikel
            </label>
            <span
              className={cn(
                "text-[11px] font-medium",
                descLen > 160
                  ? "text-red-600 dark:text-red-400"
                  : descLen >= 110
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-zinc-400"
              )}
            >
              {descLen}/155
            </span>
          </div>
          <textarea
            id="seo-meta-desc"
            rows={3}
            required
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="Ringkasan singkat artikel untuk kartu blog & fallback meta description (120–155 karakter)..."
            className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs sm:text-sm text-zinc-950 dark:text-zinc-50 placeholder-zinc-400 outline-none focus:border-zinc-950 dark:focus:border-zinc-400 resize-none leading-relaxed"
          />
        </div>

        <div className="space-y-2 pt-2 border-t border-zinc-200 dark:border-zinc-800">
          {checklist.map((item) => (
            <div
              key={item.label}
              className="flex items-start gap-2 text-xs leading-snug"
            >
              {item.ok ? (
                <CheckCircle2
                  size={14}
                  className="shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400"
                />
              ) : (
                <AlertCircle
                  size={14}
                  className="shrink-0 mt-0.5 text-amber-500"
                />
              )}
              <div>
                <p
                  className={cn(
                    "font-medium",
                    item.ok
                      ? "text-zinc-800 dark:text-zinc-200"
                      : "text-zinc-600 dark:text-zinc-400"
                  )}
                >
                  {item.label}
                </p>
                {!item.ok && (
                  <p className="text-[11px] text-zinc-400">{item.hint}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cover, OG Image, Writer & Taxonomy */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 p-5 space-y-4">
        <h3 className="font-semibold text-sm text-zinc-950 dark:text-zinc-50 border-b border-zinc-200 dark:border-zinc-800 pb-3">
          Visual, Penulis &amp; Taksonomi
        </h3>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="post-cover-url"
              className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
            >
              Cover Image
            </label>
            <button
              type="button"
              onClick={onOpenMediaPicker}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-zinc-900 dark:text-zinc-100 hover:underline cursor-pointer"
            >
              <ImageIcon size={12} />
              <span>Pilih Media</span>
            </button>
          </div>
          <input
            id="post-cover-url"
            type="text"
            value={coverImage}
            onChange={(e) => onCoverImageChange(e.target.value)}
            placeholder="/images/og/online-course.jpg atau https://utfs.io/..."
            className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs font-mono text-zinc-950 dark:text-zinc-50 placeholder-zinc-400 outline-none focus:border-zinc-950 dark:focus:border-zinc-400"
          />
          {coverImage && (
            <div className="relative aspect-video w-full rounded-xl overflow-hidden mt-2.5 border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
              <Image
                src={coverImage}
                alt="Preview Cover Artikel"
                fill
                unoptimized
                className="object-cover"
                sizes="360px"
              />
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="post-og-url"
              className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
            >
              OG Image Kustom (Opsional)
            </label>
            <button
              type="button"
              onClick={onOpenOgMediaPicker}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-zinc-900 dark:text-zinc-100 hover:underline cursor-pointer"
            >
              <ImageIcon size={12} />
              <span>Pilih Media</span>
            </button>
          </div>
          <input
            id="post-og-url"
            type="text"
            value={ogImage}
            onChange={(e) => onOgImageChange(e.target.value)}
            placeholder="Kosongkan untuk pakai Cover Image"
            className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs font-mono text-zinc-950 dark:text-zinc-50 placeholder-zinc-400 outline-none focus:border-zinc-950 dark:focus:border-zinc-400"
          />
          {isRenderableOg && (
            <div className="relative aspect-video w-full rounded-xl overflow-hidden mt-2.5 border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
              <Image
                src={ogImage.trim()}
                alt="Preview OG Image"
                fill
                unoptimized
                className="object-cover"
                sizes="360px"
              />
            </div>
          )}
        </div>

        {authors.length > 0 && (
          <div>
            <label
              htmlFor="post-author-id"
              className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5"
            >
              Akun Penulis (E-E-A-T)
            </label>
            <select
              id="post-author-id"
              value={authorId}
              onChange={(e) => onAuthorIdChange(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs sm:text-sm text-zinc-950 dark:text-zinc-50 outline-none focus:border-zinc-950 dark:focus:border-zinc-400"
            >
              <option value="">-- Gunakan Author Name Manual --</option>
              {authors.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name || a.email}
                  {a.role ? ` (${a.role})` : ""}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label
            htmlFor="post-author-name"
            className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5"
          >
            Author Name (Fallback)
          </label>
          <input
            id="post-author-name"
            type="text"
            value={authorName}
            onChange={(e) => onAuthorNameChange(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs sm:text-sm text-zinc-950 dark:text-zinc-50 outline-none focus:border-zinc-950 dark:focus:border-zinc-400"
          />
        </div>

        <div>
          <label
            htmlFor="post-category"
            className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5"
          >
            Kategori
          </label>
          <select
            id="post-category"
            value={categoryId}
            onChange={(e) => onCategoryIdChange(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs sm:text-sm text-zinc-950 dark:text-zinc-50 outline-none focus:border-zinc-950 dark:focus:border-zinc-400"
          >
            <option value="">-- Pilih Kategori --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
            Tags
          </p>
          <div className="grid grid-cols-2 gap-2 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 max-h-44 overflow-y-auto">
            {tags.map((tag) => (
              <label
                key={tag.id}
                className="flex items-center gap-2 text-xs font-medium text-zinc-700 dark:text-zinc-300 cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={selectedTagIds.includes(tag.id)}
                  onChange={() => onToggleTag(tag.id)}
                  className="rounded border-zinc-300 dark:border-zinc-700 accent-zinc-950 dark:accent-zinc-100 w-3.5 h-3.5 cursor-pointer"
                />
                <span className="truncate">{tag.name}</span>
              </label>
            ))}
            {tags.length === 0 && (
              <span className="text-xs text-zinc-400 col-span-2">
                Belum ada tag dibuat.
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
