import { formatBlogDate, hasPostImage } from "@/lib/blog";
import type { BlogPost } from "@/types";
import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen } from "lucide-react";

interface BlogCardCompactProps {
  post: BlogPost;
  className?: string;
}

/**
 * Sidebar-friendly blog post card. Renders as a horizontal link with
 * thumbnail, title, optional date and a chevron. Used for "related posts"
 * rails.
 */
export function BlogCardCompact({ post, className }: BlogCardCompactProps) {
  const image = hasPostImage(post);
  return (
    <Link
      to="/blog/$slug"
      params={{ slug: post.slug }}
      data-ocid={`related-post-${post.id}`}
      className={`group flex gap-4 rounded-lg border border-border bg-card p-3 hover:border-primary/40 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${className ?? ""}`}
    >
      <div className="h-16 w-20 rounded-md overflow-hidden shrink-0 bg-gradient-to-br from-primary/10 to-secondary/10">
        {image ? (
          <img
            src={post.featuredImage.getDirectURL()}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <BookOpen className="h-5 w-5 text-primary/40" />
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center min-w-0">
        <p className="text-sm font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-200">
          {post.title}
        </p>
        {post.publishDate ? (
          <p className="text-xs text-muted-foreground mt-1">
            {formatBlogDate(post.publishDate)}
          </p>
        ) : null}
      </div>
      <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0 self-center group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-200" />
    </Link>
  );
}
