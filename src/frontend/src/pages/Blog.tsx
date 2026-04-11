import { Pagination } from "@/components/ui/PaginationNav";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useBlogPosts } from "@/hooks/useBackend";
import type { BlogPost } from "@/types";
import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Calendar, User } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const CATEGORY_COLORS: Record<string, string> = {
  Transport: "bg-secondary/10 text-secondary border-secondary/30",
  Immobilier: "bg-primary/10 text-primary border-primary/30",
  Formation: "bg-accent/10 text-accent-foreground border-accent/30",
  Agrobusiness: "bg-chart-3/10 text-foreground border-chart-3/30",
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

const GRADIENTS = [
  "from-primary/20 to-secondary/20",
  "from-secondary/20 to-primary/10",
  "from-primary/10 to-accent/20",
  "from-chart-2/20 to-primary/15",
  "from-accent/15 to-secondary/20",
  "from-primary/15 to-chart-3/20",
];

function PostCard({ post, index }: { post: BlogPost; index: number }) {
  const excerpt =
    post.description.length > 150
      ? `${post.description.slice(0, 150)}…`
      : post.description;
  const gradient = GRADIENTS[index % GRADIENTS.length];
  const hasImage =
    post.featuredImage?.getDirectURL?.() &&
    post.featuredImage.getDirectURL() !== "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
    >
      <Link
        to="/blog/$slug"
        params={{ slug: post.slug }}
        data-ocid={`blog-post-${post.id}`}
        className="group flex flex-col h-full rounded-xl overflow-hidden border border-border bg-card shadow-corporate hover-lift transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {/* Image zone */}
        <div
          className={`relative h-48 overflow-hidden bg-gradient-to-br ${gradient}`}
        >
          {hasImage ? (
            <img
              src={post.featuredImage.getDirectURL()}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <BookOpen className="h-12 w-12 text-primary/40" />
            </div>
          )}
          {/* Category chip overlay */}
          {post.categoryTags[0] && (
            <div className="absolute top-3 left-3">
              <Badge
                className={`text-xs border ${categoryClass(post.categoryTags[0])} backdrop-blur-sm`}
                variant="outline"
              >
                {post.categoryTags[0]}
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5">
          {/* Extra tags */}
          {post.categoryTags.length > 1 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {post.categoryTags.slice(1, 3).map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className={`text-xs border ${categoryClass(tag)}`}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <h3 className="font-display font-semibold text-foreground mb-2 line-clamp-2 leading-snug group-hover:text-primary transition-colors duration-200">
            {post.title}
          </h3>

          <p className="text-sm text-muted-foreground line-clamp-3 mb-4 leading-relaxed flex-1">
            {excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border">
            <span className="flex items-center gap-1.5 min-w-0">
              <User className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{post.author}</span>
            </span>
            {post.publishDate && (
              <span className="flex items-center gap-1 shrink-0">
                <Calendar className="h-3.5 w-3.5" />
                {formatDate(post.publishDate)}
              </span>
            )}
          </div>
        </div>

        {/* Read more arrow */}
        <div className="px-5 pb-4">
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:gap-2 transition-all duration-200">
            Lire l'article <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

function BlogSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {["s1", "s2", "s3", "s4", "s5", "s6"].map((sk) => (
        <div
          key={sk}
          className="rounded-xl overflow-hidden border border-border bg-card"
        >
          <Skeleton className="h-48 w-full" />
          <div className="p-5 flex flex-col gap-3">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <div className="flex justify-between pt-2">
              <Skeleton className="h-3 w-1/4" />
              <Skeleton className="h-3 w-1/3" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function BlogPage() {
  const [page, setPage] = useState(1);
  const pageSize = 9n;
  const { data, isLoading } = useBlogPosts(BigInt(page), pageSize);

  const totalPages = data
    ? Math.ceil(Number(data.total) / Number(pageSize))
    : 1;

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative bg-card border-b border-border py-20 overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="inline-flex items-center gap-2 text-primary font-semibold uppercase tracking-widest text-xs mb-4">
              <BookOpen className="h-4 w-4" />
              Actualités
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-5 leading-tight">
              Blog & Conseils
            </h1>
            <p className="text-muted-foreground max-w-xl text-lg leading-relaxed">
              Actualités et conseils de{" "}
              <span className="text-primary font-medium">
                STS SOFITRANS SERVICE
              </span>{" "}
              — transport, logistique, immobilier et plus.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-14 bg-background min-h-[40vh]">
        <div className="container mx-auto px-4 md:px-6">
          {isLoading ? (
            <BlogSkeleton />
          ) : !data?.posts?.length ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-24 text-center gap-5"
              data-ocid="empty-posts"
            >
              <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center">
                <BookOpen className="h-10 w-10 text-muted-foreground" />
              </div>
              <h2 className="font-display text-xl font-semibold text-foreground">
                Aucun article publié pour le moment
              </h2>
              <p className="text-muted-foreground max-w-sm">
                Revenez bientôt ! Nos experts préparent des contenus de qualité
                sur le transport, la logistique et l'immobilier.
              </p>
            </motion.div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {data.posts.map((post, i) => (
                  <PostCard key={post.id.toString()} post={post} index={i} />
                ))}
              </div>
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={(p) => {
                  setPage(p);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="mt-4"
              />
            </>
          )}
        </div>
      </section>
    </div>
  );
}
