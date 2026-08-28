import { BlogCardCompact, CTABar, EmptyState } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useBlogPostBySlug, useBlogPosts } from "@/hooks/useBackend";
import { categoryClass, formatBlogDate, hasPostImage } from "@/lib/blog";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  MessageSquare,
  Tag,
  User,
} from "lucide-react";
import { motion } from "motion/react";

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

function NotFoundState() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-24 text-center">
      <EmptyState
        icon={BookOpen}
        title="Article introuvable"
        description="Cet article n'existe pas ou a été supprimé."
        ocid="empty-post"
        action={
          <Button variant="outline" asChild data-ocid="back-to-blog">
            <Link to="/blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour au blog
            </Link>
          </Button>
        }
      />
    </div>
  );
}

function PostHeader({
  post,
  image,
}: {
  post: import("@/types").BlogPost;
  image: boolean;
}) {
  return (
    <header className="relative w-full h-72 md:h-96 overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
      {image ? (
        <img
          src={post.featuredImage.getDirectURL()}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
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
  );
}

function RelatedSidebar({
  related,
}: {
  related: import("@/types").BlogPost[];
}) {
  return (
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
          {related.map((related) => (
            <BlogCardCompact key={related.id.toString()} post={related} />
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
  );
}

export default function BlogDetailPage() {
  const { slug } = useParams({ strict: false }) as { slug: string };
  const { data: post, isLoading } = useBlogPostBySlug(slug);
  const { data: latestPage } = useBlogPosts(1n, 10n);

  const relatedPosts =
    latestPage?.posts.filter((p) => p.slug !== slug).slice(0, 3) ?? [];

  if (isLoading) {
    return <DetailSkeleton />;
  }

  if (!post) {
    return <NotFoundState />;
  }

  const image = hasPostImage(post);

  return (
    <article>
      <PostHeader post={post} image={image} />

      <div className="bg-background py-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-10 max-w-5xl mx-auto">
            <motion.div
              className="flex-1 min-w-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
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

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground mb-8 pb-6 border-b border-border">
                <span className="flex items-center gap-1.5">
                  <User className="h-4 w-4 text-primary" />
                  <span className="font-medium text-foreground">
                    {post.author}
                  </span>
                </span>
                {post.publishDate ? (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-primary" />
                    {formatBlogDate(post.publishDate)}
                  </span>
                ) : null}
              </div>

              {post.description ? (
                <p className="text-lg text-muted-foreground font-medium leading-relaxed mb-8 border-l-4 border-primary pl-4">
                  {post.description}
                </p>
              ) : null}

              <PostContent html={post.content} />
            </motion.div>

            {relatedPosts.length > 0 ? (
              <RelatedSidebar related={relatedPosts} />
            ) : null}
          </div>
        </div>
      </div>

      <CTABar
        title="Un projet en tête ?"
        description="Notre équipe vous accompagne sur tous vos projets immobiliers, de transport, de formation et agrobusiness."
        actions={
          <Button
            asChild
            size="lg"
            className="bg-primary-foreground/20 border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/30"
            data-ocid="blog-cta"
          >
            <Link to="/contact">
              <MessageSquare className="h-4 w-4 mr-2" />
              Contactez-nous
            </Link>
          </Button>
        }
      />
    </article>
  );
}
