"use client";

import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import {
  generateFullArticle,
  type ArticleBriefInput,
} from "@/app/(admin)/admin/posts/ai-actions";
import type { PostFaqItem } from "@/lib/posts";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/components/ui/toast";

interface AiWriterModalProps {
  open: boolean;
  onClose: () => void;
  initialTopic?: string;
  onGenerated: (result: {
    title: string;
    description: string;
    suggestedSlug: string;
    content: string;
    focusKeyword: string;
    faqs: PostFaqItem[];
  }) => void;
}

const toneOptions = [
  "Praktis & Profesional",
  "Edukatif & Mengalir",
  "Tegas & Analitis",
  "Ramah & Konsultatif",
];

export default function AiWriterModal({
  open,
  onClose,
  initialTopic = "",
  onGenerated,
}: AiWriterModalProps) {
  const { toast } = useToast();
  const [topic, setTopic] = useState(initialTopic);
  const [focusKeyword, setFocusKeyword] = useState("");
  const [audience, setAudience] = useState(
    "Pemilik bisnis jasa, UMKM, klinik, konstruksi, dan tim marketing di Indonesia"
  );
  const [tone, setTone] = useState(toneOptions[0]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim() || topic.trim().length < 5) {
      toast({
        title: "Topik terlalu singkat",
        description: "Masukkan minimal 5 karakter topik artikel.",
        variant: "error",
      });
      return;
    }

    setIsGenerating(true);
    const brief: ArticleBriefInput = {
      topic: topic.trim(),
      focusKeyword: focusKeyword.trim() || undefined,
      audience: audience.trim() || undefined,
      tone,
    };

    const res = await generateFullArticle(brief);
    setIsGenerating(false);

    if (res.success && res.data) {
      onGenerated({
        ...res.data,
        focusKeyword: focusKeyword.trim(),
      });
      toast({
        title: "Draf artikel AI selesai dibuat",
        description: "Silakan tinjau konten, cover image, dan SEO checklist sebelum publish.",
        variant: "success",
      });
      onClose();
    } else {
      toast({
        title: "Gagal generate artikel AI",
        description: res.error || "Periksa koneksi atau GOOGLE_API_KEY.",
        variant: "error",
      });
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => !isGenerating && onClose()}
      title="AI Article Brief (1.200+ Kata SEO)"
      description="Susun draf artikel mendalam lengkap dengan subheading H2/H3, contoh kasus bisnis jasa, FAQ, dan CTA."
      size="lg"
    >
      <form onSubmit={handleGenerate} className="space-y-4">
        <div>
          <label
            htmlFor="ai-brief-topic"
            className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5"
          >
            Topik / Judul Ide Artikel
          </label>
          <textarea
            id="ai-brief-topic"
            rows={2}
            required
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Misal: Cara Menggunakan AI untuk Membuat SOP Konten Instagram & TikTok Bisnis Jasa"
            className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-sm text-zinc-950 dark:text-zinc-50 placeholder-zinc-400 outline-none focus:border-zinc-950 dark:focus:border-zinc-400 resize-none"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="ai-brief-keyword"
              className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5"
            >
              Focus Keyword (Opsional)
            </label>
            <input
              id="ai-brief-keyword"
              type="text"
              value={focusKeyword}
              onChange={(e) => setFocusKeyword(e.target.value)}
              placeholder="Misal: SOP konten AI bisnis jasa"
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-sm text-zinc-950 dark:text-zinc-50 placeholder-zinc-400 outline-none focus:border-zinc-950 dark:focus:border-zinc-400"
            />
          </div>

          <div>
            <label
              htmlFor="ai-brief-tone"
              className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5"
            >
              Gaya Bahasa
            </label>
            <select
              id="ai-brief-tone"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-sm text-zinc-950 dark:text-zinc-50 outline-none focus:border-zinc-950 dark:focus:border-zinc-400"
            >
              {toneOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="ai-brief-audience"
            className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5"
          >
            Target Audiens
          </label>
          <input
            id="ai-brief-audience"
            type="text"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-sm text-zinc-950 dark:text-zinc-50 outline-none focus:border-zinc-950 dark:focus:border-zinc-400"
          />
        </div>

        <div className="pt-3 flex items-center justify-end gap-3 border-t border-zinc-200 dark:border-zinc-800">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={isGenerating}
            onClick={onClose}
          >
            Batal
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <Sparkles size={15} />
            )}
            <span>
              {isGenerating ? "Menulis Artikel (±15 dtk)..." : "Generate Artikel Lengkap"}
            </span>
          </Button>
        </div>
      </form>
    </Modal>
  );
}
