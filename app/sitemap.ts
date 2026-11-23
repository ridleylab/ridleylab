import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/config/site";
import { programs } from "@/config/programs";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = siteConfig.url;

  // Get dynamic blog lists
  const posts = await getAllPosts();
  const postUrls = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
  }));

  // Setup static marketing routes
  const routes = [
    "",
    programs.onlineCourse.path,
    programs.offlineMentoring.path,
    "/blog",
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));

  return [...routes, ...postUrls];
}
