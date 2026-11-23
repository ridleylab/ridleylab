"use server";

import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { requireAdminSession } from "@/lib/auth/require-admin";
import type { PostFaqItem } from "@/lib/posts";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

const seoInputSchema = z.object({
  content: z.string().trim().min(50, "Konten minimal 50 karakter untuk generate SEO."),
  focusKeyword: z.string().trim().max(100).optional(),
});

const rewriteInputSchema = z.object({
  selectedText: z.string().trim().min(3, "Pilih teks terlebih dahulu."),
  instruction: z.string().trim().min(3, "Instruksi minimal 3 karakter.").max(500),
});

const articleBriefSchema = z.object({
  topic: z.string().trim().min(5, "Topik artikel minimal 5 karakter.").max(300),
  focusKeyword: z.string().trim().max(120).optional(),
  audience: z.string().trim().max(200).optional(),
  tone: z.string().trim().max(100).optional(),
});

export type ArticleBriefInput = z.infer<typeof articleBriefSchema>;

export async function generateSEO(content: string, focusKeyword?: string) {
  try {
    await requireAdminSession();

    const parsed = seoInputSchema.safeParse({ content, focusKeyword });
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0]?.message || "Input tidak valid.",
      };
    }

    if (!process.env.GOOGLE_API_KEY) {
      return {
        success: false,
        error: "GOOGLE_API_KEY belum dikonfigurasi pada environment variables.",
      };
    }

    const plainText = parsed.data.content
      .replace(/<[^>]*>?/gm, " ")
      .replace(/\s+/g, " ")
      .trim()
      .substring(0, 6000);

    const keywordInstruction = parsed.data.focusKeyword
      ? `Sertakan focus keyword "${parsed.data.focusKeyword}" secara natural di awal judul maupun meta description.`
      : "";

    const prompt = `Anda adalah spesialis SEO bahasa Indonesia untuk RidleyLab (platform pelatihan AI Social Media Marketing bisnis jasa).
Berdasarkan konten artikel berikut, buat:
1. "title": Judul artikel SEO-friendly maksimal 60 karakter.
2. "description": Meta description persuasif antara 120 hingga 155 karakter.
${keywordInstruction}

Kembalikan HANYA objek JSON murni dengan format:
{
  "title": "...",
  "description": "..."
}

KONTEN ARTIKEL:
${plainText}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("Respons AI kosong.");
    }

    const data = JSON.parse(text) as { title?: string; description?: string };
    return {
      success: true,
      data: {
        title: (data.title || "").trim(),
        description: (data.description || "").trim(),
      },
    };
  } catch (error: unknown) {
    console.error("AI SEO Error:", error);
    const message =
      error instanceof Error ? error.message : "Gagal menghasilkan metadata SEO.";
    return { success: false, error: message };
  }
}

export async function editWithAI(selectedText: string, instruction: string) {
  try {
    await requireAdminSession();

    const parsed = rewriteInputSchema.safeParse({ selectedText, instruction });
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0]?.message || "Input tidak valid.",
      };
    }

    if (!process.env.GOOGLE_API_KEY) {
      return {
        success: false,
        error: "GOOGLE_API_KEY belum dikonfigurasi pada environment variables.",
      };
    }

    const prompt = `Anda adalah editor konten profesional bahasa Indonesia untuk blog marketing & AI bisnis jasa.
Ubah teks asli di bawah ini sesuai instruksi berikut:

INSTRUKSI:
${parsed.data.instruction}

TEKS ASLI:
${parsed.data.selectedText}

Ketentuan keluaran:
- Kembalikan HANYA teks/HTML hasil revisi yang siap dimasukkan ke editor Tiptap (gunakan <p>, <ul>, <li>, <strong> jika membuat daftar poin; jika hanya satu paragraf cukup teks langsung).
- Jangan bungkus dalam backticks markdown atau kata pengantar tambahan.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = response.text;
    if (!text) {
      throw new Error("Respons AI kosong.");
    }

    return { success: true, text: text.trim() };
  } catch (error: unknown) {
    console.error("AI Rewrite Error:", error);
    const message =
      error instanceof Error ? error.message : "Gagal memproses teks dengan AI.";
    return { success: false, error: message };
  }
}

export async function generateFullArticle(input: string | ArticleBriefInput) {
  try {
    await requireAdminSession();

    const rawBrief = typeof input === "string" ? { topic: input } : input;
    const parsed = articleBriefSchema.safeParse(rawBrief);
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0]?.message || "Brief topik tidak valid.",
      };
    }

    if (!process.env.GOOGLE_API_KEY) {
      return {
        success: false,
        error: "GOOGLE_API_KEY belum dikonfigurasi pada environment variables.",
      };
    }

    const {
      topic,
      focusKeyword = "",
      audience = "Pemilik bisnis jasa, UMKM, klinik, konstruksi, dan tim marketing di Indonesia",
      tone = "Praktis, terstruktur, dan mudah dipraktekkan",
    } = parsed.data;

    const prompt = `Anda adalah senior content strategist & SEO specialist berbahasa Indonesia untuk RidleyLab (platform pelatihan AI Social Media Marketing untuk bisnis jasa di Indonesia).

Susun artikel blog SEO yang mendalam dan komprehensif dari brief berikut:
- Topik Utama: "${topic}"
- Focus Keyword: "${focusKeyword || topic}"
- Target Audiens: ${audience}
- Gaya Bahasa: ${tone}

Ketentuan Kualitas & Struktur (WAJIB DIPATUHI):
1. Panjang artikel antara 1.200 hingga 1.600 kata. Tulis substansial, konkret, tidak normatif/klise.
2. Paragraf pembuka langsung menjawab kebutuhan audiens dan menyebut focus keyword secara natural.
3. Gunakan struktur heading HTML rapi: 4 sampai 5 heading <h2> serta beberapa <h3> pendukung di dalamnya. Jangan pakai tag <h1>.
4. Sertakan contoh nyata penerapan untuk bisnis jasa di Indonesia (misalnya alur riset ide, contoh prompt AI siap pakai di dalam <blockquote>, SOP tim konten, atau alur konversi DM/WA).
5. Gunakan daftar poin (<ul><li> atau <ol><li>) dan penebalan (<strong>) agar artikel nyaman dipindai pembaca.
6. JANGAN masukkan bagian FAQ ke dalam "content" HTML. Sebagai gantinya, susun tepat 3 tanya-jawab ringkas dan praktis di field JSON "faqs" (yang otomatis dirender sebagai Accordion FAQ + Schema FAQPage).
7. Tutup "content" dengan ajakan bertindak (CTA) relevan dan sertakan persis 1 tombol CTA HTML semantik berikut:
   <p><a data-type="cta-button" class="article-cta-btn" href="/services/online-mentoring" target="_blank" rel="noopener noreferrer">Konsultasi Online Mentoring RidleyLab</a></p>
8. Kembalikan HTML bersih (<p>, <h2>, <h3>, <ul>, <ol>, <li>, <strong>, <blockquote>, <a>) TANPA markdown dan TANPA backticks.

Format respons HARUS berupa JSON murni persis dengan key berikut:
{
  "title": "Judul Artikel SEO menarik (maks 60 karakter, mengandung keyword)",
  "description": "Meta description memancing klik (120-155 karakter)",
  "suggestedSlug": "slug-url-ringkas-huruf-kecil-dan-strip",
  "content": "<p>...</p><h2>...</h2>...",
  "faqs": [
    {
      "question": "Pertanyaan relevan terkait topik artikel?",
      "answer": "Jawaban ringkas dan aplikatif tanpa tag HTML."
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("Respons AI kosong.");
    }

    const data = JSON.parse(text) as {
      title?: string;
      description?: string;
      suggestedSlug?: string;
      content?: string;
      faqs?: Array<{ question?: string; answer?: string }>;
    };

    const faqs: PostFaqItem[] = Array.isArray(data.faqs)
      ? data.faqs
          .map((item) => ({
            question: typeof item?.question === "string" ? item.question.trim() : "",
            answer: typeof item?.answer === "string" ? item.answer.trim() : "",
          }))
          .filter((item) => item.question.length > 0 && item.answer.length > 0)
          .slice(0, 8)
      : [];

    return {
      success: true,
      data: {
        title: (data.title || topic).trim(),
        description: (data.description || "").trim(),
        suggestedSlug: (data.suggestedSlug || "")
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-"),
        content: (data.content || "").trim(),
        faqs,
      },
    };
  } catch (error: unknown) {
    console.error("AI Article Gen Error:", error);
    const message =
      error instanceof Error ? error.message : "Gagal menghasilkan artikel dengan AI.";
    return { success: false, error: message };
  }
}
