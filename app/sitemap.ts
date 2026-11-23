import { MetadataRoute } from "next";
import { getAllPosts, getCategoryList } from "@/lib/posts";
import { siteConfig } from "@/config/site";
import { programs } from "@/config/programs";

const STATIC_LAST_UPDATED = new Date("2026-11-23T00:00:00Z");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = siteConfig.url;

  const [posts, categories] = await Promise.all([
    getAllPosts(),
    getCategoryList(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: programs.onlineCourse.path, priority: 0.9, changeFrequency: "weekly" as const },
    { path: programs.offlineMentoring.path, priority: 0.9, changeFrequency: "weekly" as const },
    // Note: `/services`, `/services/online-mentoring`, and `/lokasi/[city]` routes
    // will be added here in Fase 3 once their pages are live.
    { path: "/portfolio", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/blog", priority: 0.8, changeFrequency: "daily" as const },
    { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/terms-of-service", priority: 0.3, changeFrequency: "yearly" as const },
  ].map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: STATIC_LAST_UPDATED,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${siteUrl}/blog/category/${cat.slug}`,
    lastModified: STATIC_LAST_UPDATED,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...categoryRoutes, ...postRoutes];
}
