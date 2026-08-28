import { Badge } from "@/components/ui/badge";
import type { BlogPost } from "@/types";
import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Calendar, User } from "lucide-react";
import { motion } from "motion/react";
import { categoryClass, formatBlogDate, hasPostImage, truncate } from "@/lib/blog";

const GRADIENTS = [
  "from-primary/20 to-secondary/20",
  "from-secondary/20 to-primary/10",
  "from-primary/10 to-accent/20",
  "from-chart-2/20 to-primary/15",
  "from-accent/15 to-secondary/20",
  "from-primary/15 to-chart-3/20",
];

interface BlogCardProps {
  post: BlogPost;
  index?: number;
  excerptLength?: number;
  className?: string;
}

export function BlogCard({
  post,
  index = 0,
  excerptLength = 150,
  className,
}: BlogCardProps) {
  const excerpt = truncate(post.description, excerptLength);
  const gradient = GRADIENTS[index % GRADIENTS.length];
  const image = hasPostImage(post);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className={className}
    >
      <Link
        to="/blog/$slug"
        params={{ slug: post.slug }}
        data-ocid={`blog-post-${post.id}`}
        className="group flex flex-col h-full rounded-xl overflow-hidden border border-border bg-card shadow-corporate hover-lift transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <div
          className={`relative h-48 overflow-hidden bg-gradient-to-br ${gradient}`}
        >
          {image ? (
            <img
              src={post.featuredImageUrl}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <BookOpen className="h-12 w-12 text-primary/40" />
            </div>
          )}
          {post.categoryTags[0] ? (
            <div className="absolute top-3 left-3">
              <Badge
                className={`text-xs border ${categoryClass(post.categoryTags[0])} backdrop-blur-sm`}
                variant="outline"
              >
                {post.categoryTags[0]}
              </Badge>
            </div>
          ) : null}
        </div>
        <div className="flex flex-col flex-1 p-5">
          {post.categoryTags.length > 1 ? (
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
          ) : null}
          <h3 className="font-display font-semibold text-foreground mb-2 line-clamp-2 leading-snug group-hover:text-primary transition-colors duration-200">
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-3 mb-4 leading-relaxed flex-1">
            {excerpt}
          </p>
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border">
            <span className="flex items-center gap-1.5 min-w-0">
              <User className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{post.author}</span>
            </span>
            {post.publishDate ? (
              <span className="flex items-center gap-1 shrink-0">
                <Calendar className="h-3.5 h-3.5" />
                {formatBlogDate(post.publishDate)}
              </span>
            ) : null}
          </div>
        </div>
        <div className="px-5 pb-4">
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:gap-2 transition-all duration-200">
            Lire l'article <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
