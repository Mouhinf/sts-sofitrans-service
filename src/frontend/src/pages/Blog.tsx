import { BlogCard, CatalogGrid, EmptyState } from "@/components/shared";
import { Pagination } from "@/components/ui/PaginationNav";
import { useBlogPosts } from "@/hooks/useBackend";
import { BookOpen } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

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
              Blog &amp; Conseils
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
          <CatalogGrid
            items={data?.posts ?? []}
            isLoading={isLoading}
            skeletonCount={6}
            skeletonHeight={64}
            emptyIcon={BookOpen}
            emptyTitle="Aucun article publié pour le moment"
            emptyDescription="Revenez bientôt ! Nos experts préparent des contenus de qualité sur le transport, la logistique et l'immobilier."
            emptyOcid="empty-posts"
            getKey={(p) => p.id.toString()}
            renderItem={(post, i) => <BlogCard post={post} index={i} />}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          />

          {!isLoading && (data?.posts?.length ?? 0) > 0 ? (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(p) => {
                setPage(p);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="mt-4"
            />
          ) : null}
        </div>
      </section>
    </div>
  );
}
