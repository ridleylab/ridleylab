import { prisma } from "@/lib/db/prisma";

export interface PostMetadata {
  slug: string;
  title: string;
  description: string;
  coverImage?: string;
  publishedAt: string;
  draft: boolean;
  category: string;
  tags: string[];
  author: string;
  readingTime: string;
}

export interface Post {
  metadata: PostMetadata;
  content: string;
}

// Calculate reading time based on 200 WPM
export function calculateReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const post = await prisma.post.findUnique({
      where: { slug },
      include: {
        category: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    if (!post) return null;

    const metadata: PostMetadata = {
      slug: post.slug,
      title: post.title,
      description: post.description,
      coverImage: post.coverImage || undefined,
      publishedAt: post.publishedAt?.toISOString() || post.createdAt.toISOString(),
      draft: post.draft,
      category: post.category?.name || "General",
      tags: post.tags.map((t) => t.tag.name),
      author: post.authorName,
      readingTime: post.readingTime || calculateReadingTime(post.content),
    };

    return { metadata, content: post.content };
  } catch (error) {
    console.error(`Error loading post ${slug} from DB:`, error);
    return null;
  }
}

export async function getAllPosts(includeDrafts = false): Promise<PostMetadata[]> {
  try {
    console.time("getAllPosts");
    
    const posts = await prisma.post.findMany({
      where: includeDrafts ? {} : { draft: false },
    
      select: {
        slug: true,
        title: true,
        description: true,
        coverImage: true,
        publishedAt: true,
        createdAt: true,
        draft: true,
        authorName: true,
        readingTime: true,
    
        category: {
          select: {
            name: true,
          },
        },
    
        tags: {
          select: {
            tag: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    
      orderBy: {
        publishedAt: "desc",
      },
    });

    console.timeEnd("getAllPosts");
    
    return posts.map((post) => ({
      slug: post.slug,
      title: post.title,
      description: post.description,
      coverImage: post.coverImage || undefined,
      publishedAt: post.publishedAt?.toISOString() || post.createdAt.toISOString(),
      draft: post.draft,
      category: post.category?.name || "General",
      tags: post.tags.map((t) => t.tag.name),
      author: post.authorName,
      readingTime: post.readingTime || "1 min read",
    }));
  } catch (error) {
    console.error("Error loading all posts from DB:", error);
    return [];
  }
}

export async function getCategories(): Promise<string[]> {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });
    return categories.map((c) => c.name);
  } catch (error) {
    console.error("Error loading categories from DB:", error);
    return [];
  }
}

export async function getTags(): Promise<string[]> {
  try {
    const tags = await prisma.tag.findMany({
      orderBy: { name: "asc" },
    });
    return tags.map((t) => t.name);
  } catch (error) {
    console.error("Error loading tags from DB:", error);
    return [];
  }
}
