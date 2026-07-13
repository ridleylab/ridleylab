"use server";

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

export async function generateSEO(content: string) {
  try {
    if (!process.env.GOOGLE_API_KEY) {
      throw new Error("GOOGLE_API_KEY is not set in environment variables");
    }

    const prompt = `Anda adalah seorang ahli SEO. Berdasarkan isi konten artikel di bawah ini, berikan:
1. Judul artikel yang sangat menarik dan SEO-friendly (maksimal 60 karakter).
2. Deskripsi singkat (meta description) yang memancing klik dan relevan dengan SEO (maksimal 150 karakter).

Format hasil harus berupa JSON persis seperti ini, tanpa tambahan apa pun (tidak ada markdown code block):
{
  "title": "judul hasil",
  "description": "deskripsi hasil"
}

KONTEN ARTIKEL:
${content.replace(/<[^>]*>?/gm, "").substring(0, 5000)}`; // Hapus tag HTML dan batasi panjang

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("Empty response from AI");
    }

    const data = JSON.parse(text);
    return { success: true, data };
  } catch (error: any) {
    console.error("AI SEO Error:", error);
    return { success: false, error: error.message || "Failed to generate SEO" };
  }
}

export async function editWithAI(selectedText: string, instruction: string) {
  try {
    if (!process.env.GOOGLE_API_KEY) {
      throw new Error("GOOGLE_API_KEY is not set in environment variables");
    }

    const prompt = `Anda adalah asisten penulis (editor). Tugas Anda adalah mengubah atau memperbaiki teks yang diberikan sesuai dengan instruksi.

INSTRUKSI:
${instruction}

TEKS ASLI:
${selectedText}

KEMBALIKAN HANYA TEKS HASIL REVISI, tanpa embel-embel, tanpa tanda kutip tambahan, dan tanpa penjelasan apa pun.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = response.text;
    if (!text) {
      throw new Error("Empty response from AI");
    }

    return { success: true, text: text.trim() };
  } catch (error: any) {
    console.error("AI Rewrite Error:", error);
    return { success: false, error: error.message || "Failed to rewrite text" };
  }
}

export async function generateFullArticle(topic: string) {
  try {
    if (!process.env.GOOGLE_API_KEY) {
      throw new Error("GOOGLE_API_KEY is not set in environment variables");
    }

    const prompt = `Anda adalah seorang penulis konten profesional dan ahli SEO. 
Tuliskan sebuah artikel blog yang lengkap dan sangat menarik berdasarkan topik berikut:
"${topic}"

Ketentuan:
1. Tulis dalam bahasa Indonesia yang natural, informatif, dan profesional.
2. Gunakan tag HTML yang valid untuk memformat artikel (seperti <h2>, <h3>, <p>, <ul>, <li>, <strong>). Jangan gunakan markdown atau backticks (\`\`\`).
3. Artikel harus komprehensif, minimal 3-5 paragraf.
4. Jangan tambahkan tag <h1> karena judul artikel akan diatur terpisah.

Berikan output dalam format JSON (tanpa markdown blok) dengan struktur persis seperti ini:
{
  "title": "Judul Artikel yang Menarik dan SEO Friendly (maks 60 karakter)",
  "description": "Deskripsi singkat / meta description yang memancing klik (maks 150 karakter)",
  "content": "Isi artikel berformat HTML lengkap di sini"
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
      throw new Error("Empty response from AI");
    }

    const data = JSON.parse(text);
    return { success: true, data };
  } catch (error: any) {
    console.error("AI Article Gen Error:", error);
    return { success: false, error: error.message || "Failed to generate article" };
  }
}
