import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PostMetadata } from "@/lib/posts";
import { programs } from "@/config/programs";
import { Card } from "@/components/ui/card";

interface PostCardProps {
  post: PostMetadata;
}

export default function PostCard({ post }: PostCardProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article className="h-full">
      <Card
        variant="default"
        padding="none"
        interactive
        className="flex flex-col h-full group overflow-hidden"
      >
        <Link
          href={`/blog/${post.slug}`}
          className="relative block aspect-[16/10] overflow-hidden bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800"
        >
          <Image
            src={post.coverImage || programs.onlineCourse.ogImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </Link>

        <div className="flex flex-col flex-1 p-6">
          <div className="flex items-center gap-2.5 text-xs mb-3 font-medium">
            <Link
              href={`/blog/category/${post.categorySlug}`}
              className="text-zinc-950 dark:text-zinc-100 hover:underline uppercase tracking-wider font-semibold"
            >
              {post.category}
            </Link>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <span className="text-zinc-500 dark:text-zinc-400">
              {post.readingTime}
            </span>
          </div>

          <h3 className="text-lg font-semibold tracking-tight mb-2.5 text-zinc-950 dark:text-zinc-50 line-clamp-2 group-hover:underline underline-offset-4">
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </h3>

          <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3 mb-6 leading-relaxed flex-1">
            {post.description}
          </p>

          <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-900 pt-4 mt-auto">
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {formattedDate}
            </span>
            <Link
              href={`/blog/${post.slug}`}
              className="text-xs font-semibold text-zinc-950 dark:text-zinc-100 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
            >
              <span>Baca Artikel</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </Card>
    </article>
  );
}
