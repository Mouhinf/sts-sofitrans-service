import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useBlogPostBySlug, useBlogPosts } from "@/hooks/useBackend";
import type { BlogPost } from "@/types";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calendar,
  Tag,
  User,
} from "lucide-react";
import { motion } from "motion/react";

const CATEGORY_COLORS: Record<string, string> = {
  Transport: "bg-secondary/10 text-secondary border-secondary/30",
  Immobilier: "bg-primary/10 text-primary border-primary/30",
  Formation: "bg-accent/10 text-accent-foreground border-accent/30",
  Agrobusiness: "bg-muted text-muted-foreground border-border",
};

function categoryClass(tag: string): string {
  return CATEGORY_COLORS[tag] ?? "bg-muted text-muted-foreground border-border";
}

function formatDate(ts?: bigint): string {
  if (!ts) return "";
  const date = new Date(Number(ts) / 1_000_000);
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function PostContent({ html }: { html: string }) {
  return (
    <div
      className="prose prose-lg max-w-none text-foreground
        [&_h1]:font-display [&_h1]:text-foreground
        [&_h2]:font-display [&_h2]:text-foreground [&_h2]:mt-8 [&_h2]:mb-4
        [&_h3]:font-display [&_h3]:text-foreground [&_h3]:mt-6 [&_h3]:mb-3
        [&_p]:leading-relaxed [&_p]:text-foreground/90 [&_p]:mb-4
        [&_a]:text-primary [&_a]:underline [&_a]:hover:text-primary/80
        [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1
        [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-1
        [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground
        [&_code]:bg-muted [&_code]:rounded [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&_code]:font-mono
        [&_img]:rounded-xl [&_img]:shadow-corporate [&_img]:my-6"
      ref={(el) => {
        if (el && el.innerHTML !== html) {
          el.innerHTML = html;
        }
      }}
    />
  );
}

function RelatedCard({ post }: { post: BlogPost }) {
  const hasImage =
    post.featuredImage?.getDirectURL?.() &&
    post.featuredImage.getDirectURL() !== "";

  return (
    <Link
      to="/blog/$slug"
      params={{ slug: post.slug }}
      data-ocid={`related-post-${post.id}`}
      className="group flex gap-4 rounded-lg border border-border bg-card p-3 hover:border-primary/40 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="h-16 w-20 rounded-md overflow-hidden shrink-0 bg-gradient-to-br from-primary/10 to-secondary/10">
        {hasImage ? (
          <img
            src={post.featuredImage.getDirectURL()}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
        {post.publishDate && (
          <p className="text-xs text-muted-foreground mt-1">
            {formatDate(post.publishDate)}
          </p>
        )}
      </div>
      <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0 self-center group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-200" />
    </Link>
  );
}

function DetailSkeleton() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 max-w-4xl">
      <Skeleton className="h-5 w-32 mb-8" />
      <div className="flex gap-2 mb-4">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-6 w-24" />
      </div>
      <Skeleton className="h-10 w-3/4 mb-3" />
      <Skeleton className="h-4 w-1/2 mb-8" />
      <Skeleton className="h-80 w-full rounded-xl mb-10" />
      <div className="flex flex-col gap-3">
        {["l1", "l2", "l3", "l4", "l5", "l6"].map((sk) => (
          <Skeleton key={sk} className="h-4 w-full" />
        ))}
      </div>
    </div>
  );
}

export default function BlogDetailPage() {
  const { slug } = useParams({ strict: false }) as { slug: string };
  const { data: post, isLoading } = useBlogPostBySlug(slug);
  // Fetch latest posts for related articles
  const { data: latestPage } = useBlogPosts(1n, 10n);

  const relatedPosts =
    latestPage?.posts.filter((p) => p.slug !== slug).slice(0, 3) ?? [];

  const hasImage =
    post?.featuredImage?.getDirectURL?.() &&
    post.featuredImage.getDirectURL() !== "";

  if (isLoading) {
    return <DetailSkeleton />;
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-24 text-center">
        <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
          <BookOpen className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="font-display text-2xl font-semibold text-foreground mb-3">
          Article introuvable
        </h1>
        <p className="text-muted-foreground mb-8">
          Cet article n'existe pas ou a été supprimé.
        </p>
        <Button variant="outline" asChild data-ocid="back-to-blog">
          <Link to="/blog">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour au blog
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <article>
      {/* Full-width Featured Image Header */}
      <header className="relative w-full h-72 md:h-96 overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
        {hasImage && (
          <img
            src={post.featuredImage.getDirectURL()}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />

        {/* Title overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div className="flex gap-2 flex-wrap mb-3">
              {post.categoryTags.map((tag) => (
                <Badge
                  key={tag}
                  className={`text-xs border backdrop-blur-sm ${categoryClass(tag)}`}
                  variant="outline"
                >
                  <Tag className="h-2.5 w-2.5 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="font-display text-2xl md:text-4xl font-bold text-white leading-tight max-w-3xl drop-shadow-lg">
              {post.title}
            </h1>
          </motion.div>
        </div>
      </header>

      {/* Content area */}
      <div className="bg-background py-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-10 max-w-5xl mx-auto">
            {/* Main content */}
            <motion.div
              className="flex-1 min-w-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {/* Back link */}
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="-ml-2 mb-6 text-muted-foreground hover:text-foreground"
                data-ocid="back-to-blog"
              >
                <Link to="/blog">
                  <ArrowLeft className="h-4 w-4 mr-1.5" />
                  Retour au blog
                </Link>
              </Button>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground mb-8 pb-6 border-b border-border">
                <span className="flex items-center gap-1.5">
                  <User className="h-4 w-4 text-primary" />
                  <span className="font-medium text-foreground">
                    {post.author}
                  </span>
                </span>
                {post.publishDate && (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-primary" />
                    {formatDate(post.publishDate)}
                  </span>
                )}
              </div>

              {/* Description lead */}
              {post.description && (
                <p className="text-lg text-muted-foreground font-medium leading-relaxed mb-8 border-l-4 border-primary pl-4">
                  {post.description}
                </p>
              )}

              {/* Article body */}
              <PostContent html={post.content} />
            </motion.div>

            {/* Sidebar — Related Articles */}
            {relatedPosts.length > 0 && (
              <motion.aside
                className="lg:w-72 shrink-0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.25 }}
                aria-label="Articles connexes"
              >
                <div className="sticky top-20">
                  <h2 className="font-display font-semibold text-foreground mb-4 text-base">
                    Articles récents
                  </h2>
                  <div className="flex flex-col gap-3">
                    {relatedPosts.map((related) => (
                      <RelatedCard key={related.id.toString()} post={related} />
                    ))}
                  </div>
                  <div className="mt-6">
                    <Button
                      variant="outline"
                      asChild
                      className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                      data-ocid="all-articles-btn"
                    >
                      <Link to="/blog">Tous les articles</Link>
                    </Button>
                  </div>
                </div>
              </motion.aside>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
