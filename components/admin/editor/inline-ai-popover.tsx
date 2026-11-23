"use client";

import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { editWithAI } from "@/app/(admin)/admin/posts/ai-actions";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/components/ui/toast";

interface InlineAiPopoverProps {
  open: boolean;
  onClose: () => void;
  selectedText: string;
  onApply: (revisedHtml: string) => void;
}

const presets = [
  {
    label: "Perbaiki Bahasa",
    instruction:
      "Perbaiki tata bahasa Indonesia agar lebih natural, rapi, jelas, dan profesional tanpa mengubah makna inti.",
  },
  {
    label: "Perdalam Poin",
    instruction:
      "Kembangkan penjelasan ini agar lebih mendalam dengan contoh penerapan konkret untuk bisnis jasa di Indonesia.",
  },
  {
    label: "Ringkas Padat",
    instruction:
      "Ringkas paragraf ini menjadi lebih padat, tajam, dan mudah dipahami dalam sekali baca.",
  },
  {
    label: "Ubah ke Bullet List",
    instruction:
      "Ubah teks ini menjadi daftar poin HTML (<ul><li>...</li></ul>) yang terstruktur rapi dengan <strong> di awal tiap poin.",
  },
];

export default function InlineAiPopover({
  open,
  onClose,
  selectedText,
  onApply,
}: InlineAiPopoverProps) {
  const { toast } = useToast();
  const [instruction, setInstruction] = useState(presets[0].instruction);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (customInstruction?: string) => {
    const activeInstruction = (customInstruction ?? instruction).trim();
    if (!activeInstruction) {
      toast({
        title: "Instruksi masih kosong",
        description: "Pilih preset atau tuliskan instruksi revisi AI.",
        variant: "error",
      });
      return;
    }

    setIsLoading(true);
    const res = await editWithAI(selectedText, activeInstruction);
    setIsLoading(false);

    if (res.success && res.text) {
      onApply(res.text);
      toast({
        title: "Teks berhasil direvisi AI",
        variant: "success",
      });
      onClose();
    } else {
      toast({
        title: "Gagal merevisi teks",
        description: res.error || "Terjadi kesalahan saat menghubungi AI.",
        variant: "error",
      });
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => !isLoading && onClose()}
      title="Inline AI Rewrite"
      description="Ubah atau sempurnakan bagian teks yang Anda blok di editor."
      size="md"
      footer={
        <>
          <Button
            variant="outline"
            size="sm"
            disabled={isLoading}
            onClick={onClose}
          >
            Batal
          </Button>
          <Button
            variant="primary"
            size="sm"
            disabled={isLoading}
            onClick={() => handleSubmit()}
          >
            {isLoading ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Sparkles size={14} />
            )}
            <span>{isLoading ? "Memproses..." : "Terapkan Revisi"}</span>
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
            Teks Terpilih
          </p>
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-3 text-xs text-zinc-700 dark:text-zinc-300 max-h-28 overflow-y-auto leading-relaxed">
            {selectedText}
          </div>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
            Preset Cepat
          </p>
          <div className="flex flex-wrap gap-2">
            {presets.map((preset) => (
              <button
                key={preset.label}
                type="button"
                disabled={isLoading}
                onClick={() => {
                  setInstruction(preset.instruction);
                  handleSubmit(preset.instruction);
                }}
                className="px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:border-zinc-950 dark:hover:border-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer disabled:opacity-50"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label
            htmlFor="ai-inline-instruction"
            className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5"
          >
            Custom Instruction
          </label>
          <textarea
            id="ai-inline-instruction"
            rows={3}
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
            placeholder="Misal: Tambahkan contoh studi kasus klinik kecantikan..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-sm text-zinc-950 dark:text-zinc-50 placeholder-zinc-400 outline-none focus:border-zinc-950 dark:focus:border-zinc-400 resize-none"
          />
        </div>
      </div>
    </Modal>
  );
}
