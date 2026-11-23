import type { Prisma } from "@prisma/client";
import { siteConfig } from "@/config/site";
import { prisma } from "@/lib/db/prisma";

export interface PostFaqItem {
  question: string;
  answer: string;
}

export interface PostAuthorProfile {
  id: string;
  name: string;
  role?: string;
  bio?: string;
  avatarUrl?: string;
}

export interface TagSummary {
  name: string;
  slug: string;
}

export interface CategorySummary {
  name: string;
  slug: string;
}

export interface PostMetadata {
  slug: string;
  title: string;
  description: string;
  metaTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  ogImage?: string;
  faqs: PostFaqItem[];
  coverImage?: string;
  publishedAt: string;
  updatedAt: string;
  draft: boolean;
  category: string;
  categorySlug: string;
  tags: string[];
  tagItems: TagSummary[];
  author: string;
  authorProfile?: PostAuthorProfile;
  readingTime: string;
}

export interface Post {
  metadata: PostMetadata;
  content: string;
}

export interface PaginatedPostsOptions {
  search?: string;
  categorySlug?: string;
  tagSlug?: string;
  page?: number;
  limit?: number;
  includeDrafts?: boolean;
}

export interface PaginatedPostsResult {
  posts: PostMetadata[];
  total: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}

export interface AdjacentPostSummary {
  slug: string;
  title: string;
}

const postSummarySelect = {
  slug: true,
  title: true,
  description: true,
  metaTitle: true,
  metaDescription: true,
  focusKeyword: true,
  ogImage: true,
  faqJson: true,
  coverImage: true,
  publishedAt: true,
  createdAt: true,
  updatedAt: true,
  draft: true,
  authorName: true,
  readingTime: true,
  category: {
    select: {
      name: true,
      slug: true,
    },
  },
  author: {
    select: {
      id: true,
      name: true,
      role: true,
      bio: true,
      avatarUrl: true,
    },
  },
  tags: {
    select: {
      tag: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
  },
} satisfies Prisma.PostSelect;

type PostSummaryRow = Prisma.PostGetPayload<{
  select: typeof postSummarySelect;
}>;

function toSlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function parseFaqJson(raw: unknown): PostFaqItem[] {
  if (!Array.isArray(raw)) return [];
  const items: PostFaqItem[] = [];

  for (const entry of raw) {
    if (!entry || typeof entry !== "object") continue;
    const record = entry as Record<string, unknown>;
    const question =
      typeof record.question === "string" ? record.question.trim() : "";
    const answer =
      typeof record.answer === "string" ? record.answer.trim() : "";
    if (question && answer) {
      items.push({ question, answer });
    }
  }

  return items;
}

// Calculate reading time based on 200 WPM
export function calculateReadingTime(content: string): string {
  const plainText = content.replace(/<[^>]*>/g, " ").trim();
  const words = plainText ? plainText.split(/\s+/).filter(Boolean).length : 0;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

function mapPostToMetadata(post: PostSummaryRow): PostMetadata {
  const categoryName = post.category?.name || "General";
  const tagItems = post.tags.map((t) => ({
    name: t.tag.name,
    slug: t.tag.slug,
  }));
  const resolvedAuthorName =
    post.author?.name?.trim() || post.authorName || siteConfig.name;

  const authorProfile: PostAuthorProfile | undefined = post.author
    ? {
        id: post.author.id,
        name: resolvedAuthorName,
        role: post.author.role?.trim() || undefined,
        bio: post.author.bio?.trim() || undefined,
        avatarUrl: post.author.avatarUrl?.trim() || undefined,
      }
    : undefined;

  return {
    slug: post.slug,
    title: post.title,
    description: post.description,
    metaTitle: post.metaTitle?.trim() || undefined,
    metaDescription: post.metaDescription?.trim() || undefined,
    focusKeyword: post.focusKeyword?.trim() || undefined,
    ogImage: post.ogImage?.trim() || undefined,
    faqs: parseFaqJson(post.faqJson),
    coverImage: post.coverImage || undefined,
    publishedAt:
      post.publishedAt?.toISOString() || post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
    draft: post.draft,
    category: categoryName,
    categorySlug: post.category?.slug || toSlug(categoryName),
    tags: tagItems.map((t) => t.name),
    tagItems,
    author: resolvedAuthorName,
    authorProfile,
    readingTime: post.readingTime || "1 min read",
  };
}

export async function getPostBySlug(
  slug: string,
  options?: { includeDrafts?: boolean }
): Promise<Post | null> {
  try {
    const post = await prisma.post.findUnique({
      where: { slug },
      select: {
        ...postSummarySelect,
        content: true,
      },
    });

    if (!post || (!options?.includeDrafts && post.draft)) {
      return null;
    }

    const metadata = mapPostToMetadata(post);
    if (!post.readingTime) {
      metadata.readingTime = calculateReadingTime(post.content);
    }

    return { metadata, content: post.content };
  } catch (error) {
    console.error(`Error loading post ${slug} from DB:`, error);
    return null;
  }
}

export async function getPaginatedPosts(
  options: PaginatedPostsOptions = {}
): Promise<PaginatedPostsResult> {
  const {
    search = "",
    categorySlug,
    tagSlug,
    page = 1,
    limit = 6,
    includeDrafts = false,
  } = options;

  const safeLimit = Math.max(1, Math.min(limit, 50));
  const query = search.trim();

  const where: Prisma.PostWhereInput = {
    ...(includeDrafts ? {} : { draft: false }),
    ...(categorySlug ? { category: { slug: categorySlug } } : {}),
    ...(tagSlug ? { tags: { some: { tag: { slug: tagSlug } } } } : {}),
    ...(query
      ? {
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
            { focusKeyword: { contains: query, mode: "insensitive" } },
            { category: { name: { contains: query, mode: "insensitive" } } },
            {
              tags: {
                some: { tag: { name: { contains: query, mode: "insensitive" } } },
              },
            },
          ],
        }
      : {}),
  };

  try {
    const total = await prisma.post.count({ where });
    if (total === 0) {
      return {
        posts: [],
        total: 0,
        totalPages: 0,
        currentPage: 1,
        limit: safeLimit,
      };
    }

    const totalPages = Math.ceil(total / safeLimit);
    const currentPage = Math.min(Math.max(1, page), totalPages);

    const rows = await prisma.post.findMany({
      where,
      select: postSummarySelect,
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      skip: (currentPage - 1) * safeLimit,
      take: safeLimit,
    });

    return {
      posts: rows.map(mapPostToMetadata),
      total,
      totalPages,
      currentPage,
      limit: safeLimit,
    };
  } catch (error) {
    console.error("Error loading paginated posts from DB:", error);
    return {
      posts: [],
      total: 0,
      totalPages: 0,
      currentPage: 1,
      limit: safeLimit,
    };
  }
}

export async function getAdjacentAndRelatedPosts(post: PostMetadata): Promise<{
  prevPost: AdjacentPostSummary | null;
  nextPost: AdjacentPostSummary | null;
  relatedPosts: PostMetadata[];
}> {
  try {
    const anchorDate = new Date(post.publishedAt);
    const tagSlugs = post.tagItems.map((t) => t.slug);
    const relatedFilters: Prisma.PostWhereInput[] = [];

    if (post.categorySlug && post.categorySlug !== "general") {
      relatedFilters.push({ category: { slug: post.categorySlug } });
    }
    if (tagSlugs.length > 0) {
      relatedFilters.push({ tags: { some: { tag: { slug: { in: tagSlugs } } } } });
    }

    const [prevPost, nextPost, relatedRows] = await Promise.all([
      prisma.post.findFirst({
        where: {
          draft: false,
          slug: { not: post.slug },
          OR: [
            { publishedAt: { lt: anchorDate } },
            { publishedAt: anchorDate, slug: { lt: post.slug } },
            { publishedAt: null, createdAt: { lt: anchorDate } },
          ],
        },
        orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }, { slug: "desc" }],
        select: { slug: true, title: true },
      }),
      prisma.post.findFirst({
        where: {
          draft: false,
          slug: { not: post.slug },
          OR: [
            { publishedAt: { gt: anchorDate } },
            { publishedAt: anchorDate, slug: { gt: post.slug } },
          ],
        },
        orderBy: [{ publishedAt: "asc" }, { createdAt: "asc" }, { slug: "asc" }],
        select: { slug: true, title: true },
      }),
      prisma.post.findMany({
        where: {
          draft: false,
          slug: { not: post.slug },
          ...(relatedFilters.length > 0 ? { OR: relatedFilters } : {}),
        },
        orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
        take: 3,
        select: postSummarySelect,
      }),
    ]);

    return {
      prevPost,
      nextPost,
      relatedPosts: relatedRows.map(mapPostToMetadata),
    };
  } catch (error) {
    console.error("Error loading adjacent/related posts from DB:", error);
    return { prevPost: null, nextPost: null, relatedPosts: [] };
  }
}

export async function getAllPosts(
  includeDrafts = false
): Promise<PostMetadata[]> {
  try {
    const posts = await prisma.post.findMany({
      where: includeDrafts ? {} : { draft: false },
      select: postSummarySelect,
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    });

    return posts.map(mapPostToMetadata);
  } catch (error) {
    console.error("Error loading all posts from DB:", error);
    return [];
  }
}

export async function getCategoryList(): Promise<CategorySummary[]> {
  try {
    return await prisma.category.findMany({
      orderBy: { name: "asc" },
      select: {
        name: true,
        slug: true,
      },
    });
  } catch (error) {
    console.error("Error loading category list from DB:", error);
    return [];
  }
}

export async function getCategoryBySlug(
  slug: string
): Promise<CategorySummary | null> {
  try {
    return await prisma.category.findUnique({
      where: { slug },
      select: { name: true, slug: true },
    });
  } catch (error) {
    console.error(`Error loading category ${slug} from DB:`, error);
    return null;
  }
}

export async function getCategories(): Promise<string[]> {
  const categories = await getCategoryList();
  return categories.map((c) => c.name);
}

export async function getTagList(): Promise<TagSummary[]> {
  try {
    return await prisma.tag.findMany({
      orderBy: { name: "asc" },
      select: { name: true, slug: true },
    });
  } catch (error) {
    console.error("Error loading tag list from DB:", error);
    return [];
  }
}

export async function getTagBySlug(slug: string): Promise<TagSummary | null> {
  try {
    return await prisma.tag.findUnique({
      where: { slug },
      select: { name: true, slug: true },
    });
  } catch (error) {
    console.error(`Error loading tag ${slug} from DB:`, error);
    return null;
  }
}

export async function getTags(): Promise<string[]> {
  const tags = await getTagList();
  return tags.map((t) => t.name);
}
