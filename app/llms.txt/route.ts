import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";
import { programs } from "@/config/programs";
import { locations } from "@/config/locations";
import { getAllPosts } from "@/lib/posts";

export const revalidate = 3600;

export async function GET() {
  const posts = await getAllPosts();
  const cityNames = locations.map((loc) => loc.city).join(", ");

  const content = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.description}`,
    "",
    `- **Canonical URL:** ${siteConfig.url}`,
    `- **Founder:** ${siteConfig.founder.name}`,
    `- **Lokasi Basecamp:** ${siteConfig.address.locality}, ${siteConfig.address.district}, ${siteConfig.address.region}, ${siteConfig.address.countryName}`,
    `- **Area Layanan:** ${cityNames}, serta seluruh Indonesia via Google Meet`,
    `- **WhatsApp Konsultasi:** ${siteConfig.contact.whatsappDisplay} (https://wa.me/${siteConfig.contact.whatsappNumber})`,
    `- **Email:** ${siteConfig.contact.email}`,
    `- **Instagram & TikTok:** ${siteConfig.social.instagram.handle}`,
    "",
    "## Program Utama",
    "",
    `- **${programs.onlineCourse.name} (${programs.onlineCourse.priceFormatted} ${programs.onlineCourse.priceUnit})**: ${programs.onlineCourse.description} (${siteConfig.url}${programs.onlineCourse.path})`,
    `- **${programs.onlineMentoring.name} (${programs.onlineMentoring.priceFormatted} ${programs.onlineMentoring.priceUnit})**: ${programs.onlineMentoring.description} (${siteConfig.url}${programs.onlineMentoring.path})`,
    `- **${programs.offlineMentoring.name} (${programs.offlineMentoring.priceFormatted} ${programs.offlineMentoring.priceUnit})**: ${programs.offlineMentoring.description} (${siteConfig.url}${programs.offlineMentoring.path})`,
    "",
    "## Halaman Utama",
    "",
    `- [Homepage](${siteConfig.url}/)`,
    `- [Semua Layanan](${siteConfig.url}/services)`,
    `- [${programs.onlineCourse.name}](${siteConfig.url}${programs.onlineCourse.path})`,
    `- [${programs.onlineMentoring.name}](${siteConfig.url}${programs.onlineMentoring.path})`,
    `- [${programs.offlineMentoring.name}](${siteConfig.url}${programs.offlineMentoring.path})`,
    `- [Portfolio Klien](${siteConfig.url}/portfolio)`,
    `- [Tentang RidleyLab](${siteConfig.url}/about)`,
    `- [Blog & Panduan AI Marketing](${siteConfig.url}/blog)`,
    `- [RSS Feed Blog](${siteConfig.url}/blog/rss)`,
    `- [Sitemap XML](${siteConfig.url}/sitemap.xml)`,
    "",
    "## Lokasi Layanan",
    "",
    ...locations.map(
      (loc) =>
        `- [Pelatihan AI ${loc.city}](${siteConfig.url}/lokasi/${loc.slug}): ${loc.metaDescription}`
    ),
    "",
    ...(posts.length > 0
      ? [
          "## Artikel Terbaru",
          "",
          ...posts
            .slice(0, 10)
            .map(
              (post) =>
                `- [${post.title}](${siteConfig.url}/blog/${post.slug}): ${post.description}`
            ),
          "",
        ]
      : []),
  ].join("\n");

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=600",
    },
  });
}
