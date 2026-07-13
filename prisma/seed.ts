import "dotenv/config";
import { prisma } from "@/lib/db/prisma";
import bcrypt from "bcryptjs";

async function main() {
  console.log("Seeding database...");

  // 1. Create Default Admin User
  const adminEmail = process.env.ADMIN_EMAIL || "labridley@gmail.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "Aka05457!@#$";
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: "RIDLEY Admin",
      password: hashedPassword,
    },
  });
  console.log(`Created admin user: ${admin.email}`);

  // 2. Create Default Categories
  const categories = [
    { name: "Content System", slug: "content-system" },
    { name: "Business Scale Up", slug: "business-scale-up" },
    { name: "Workflow & SOP", slug: "workflow-sop" },
    { name: "AI Implementation", slug: "ai-implementation" },
  ];

  for (const cat of categories) {
    const createdCat = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
    console.log(`Created category: ${createdCat.name}`);
  }

  // 3. Create Default Tags
  const tags = [
    { name: "AI", slug: "ai" },
    { name: "SOP", slug: "sop" },
    { name: "Content Strategy", slug: "content-strategy" },
    { name: "Instagram", slug: "instagram" },
    { name: "TikTok", slug: "tiktok" },
    { name: "Scale Up", slug: "scale-up" },
  ];

  for (const tag of tags) {
    const createdTag = await prisma.tag.upsert({
      where: { slug: tag.slug },
      update: {},
      create: tag,
    });
    console.log(`Created tag: ${createdTag.name}`);
  }

  // 4. Create Default Post
  const firstPostSlug = "my-first-post";

  const contentSystemCategory = await prisma.category.findUnique({
    where: { slug: "content-system" },
  });

  const aiTag = await prisma.tag.findUnique({ where: { slug: "ai" } });
  const sopTag = await prisma.tag.findUnique({ where: { slug: "sop" } });
  const strategyTag = await prisma.tag.findUnique({ where: { slug: "content-strategy" } });

  if (contentSystemCategory && aiTag && sopTag && strategyTag) {
    const postData = {
      slug: firstPostSlug,
      title: "Cara Membangun Workflow Konten yang Bisa Scale dengan AI",
      description: "Pelajari bagaimana menyusun SOP, workflow, dan implementasi prompt AI di bisnis Anda agar tim dapat memproduksi konten secara konsisten.",
      coverImage: "/assets/images/online-course/OC-OG.jpg",
      content: `<h2>Mengapa SOP Konten itu Penting?</h2>
<p>Banyak pemilik bisnis merasa lelah karena harus mengawasi proses produksi konten setiap hari. Mulai dari ide, penulisan script, editing video, hingga membalas komentar.</p>
<p>Solusinya adalah membangun <strong>workflow terstruktur</strong> dan memanfaatkan <strong>AI (Artificial Intelligence)</strong>.</p>
<h3>Langkah 1: Tentukan Funnel Konten Anda</h3>
<p>Sebelum memproduksi konten, pastikan alurnya jelas:</p>
<ol>
<li><strong>Traffic</strong>: Dapatkan perhatian di TikTok / Instagram.</li>
<li><strong>Trust</strong>: Berikan edukasi bernilai tinggi di feed.</li>
<li><strong>Conversion</strong>: Arahkan ke landing page untuk closing.</li>
</ol>
<h3>Langkah 2: Gunakan Prompt AI untuk Ideasi</h3>
<p>Berikut adalah contoh prompt ChatGPT / Claude untuk mencari ide konten:</p>
<pre><code>Kamu adalah content strategist untuk brand UMKM Jasa Interior. 
Buat 5 ide konten edukatif yang membahas masalah utama calon customer yang ingin renovasi rumah dengan budget terbatas.</code></pre>
`,
      readingTime: "5 min read",
      draft: false,
      publishedAt: new Date("2026-07-06T12:00:00Z"),
      categoryId: contentSystemCategory.id,
      authorName: "Thofhan Zaka Anshori",
    };

    const post = await prisma.post.upsert({
      where: { slug: firstPostSlug },
      update: {
        title: postData.title,
        description: postData.description,
        coverImage: postData.coverImage,
        // @ts-ignore
        content: postData.content,
        readingTime: postData.readingTime,
        draft: postData.draft,
        publishedAt: postData.publishedAt,
        categoryId: postData.categoryId,
        authorName: postData.authorName,
      },
      // @ts-ignore
      create: postData,
    });

    await prisma.tagOnPost.deleteMany({
      where: { postId: post.id },
    });

    await prisma.tagOnPost.createMany({
      data: [
        { postId: post.id, tagId: aiTag.id },
        { postId: post.id, tagId: sopTag.id },
        { postId: post.id, tagId: strategyTag.id },
      ],
    });

    console.log(`Created post: ${post.title}`);
  }

  console.log("Seeding finished successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
