import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = "https://www.ridleylab.com";

  // Get dynamic blog lists
  const posts = await getAllPosts();
  const postUrls = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
  }));

  // Setup static marketing routes
  const routes = ["", "/services/online-course", "/services/offline-mentoring", "/blog"].map(
    (route) => ({
      url: `${siteUrl}${route}`,
      lastModified: new Date(),
    })
  );

  return [...routes, ...postUrls];
}
