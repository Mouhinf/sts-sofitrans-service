import { c as createLucideIcon, j as jsxRuntimeExports, B as Button, a as cn, r as reactExports, m as motion, L as Link } from "./index-CtugyttR.js";
import { C as ChevronRight } from "./chevron-right-DwShqWtx.js";
import { B as Badge } from "./badge-DvHdE_Hx.js";
import { S as Skeleton } from "./skeleton-lD6-NYnm.js";
import { g as useBlogPosts } from "./useBackend-DJ1gFwav.js";
import { B as BookOpen } from "./book-open-C8qzRTOr.js";
import { U as User, C as Calendar } from "./user-CwT2wZ-K.js";
import { A as ArrowRight } from "./arrow-right-CVbvl57I.js";
import "./backend-gUdCIi-2.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode);
function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className
}) {
  if (totalPages <= 1) return null;
  const pages = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push("...");
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "nav",
    {
      className: cn("flex items-center justify-center gap-1", className),
      "aria-label": "Pagination",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "icon",
            onClick: () => onPageChange(currentPage - 1),
            disabled: currentPage === 1,
            "aria-label": "Page précédente",
            "data-ocid": "pagination-prev",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" })
          }
        ),
        pages.map(
          (page, idx) => page === "..." ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "px-2 text-muted-foreground",
              children: "…"
            },
            `ellipsis-pos-${String(idx)}`
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: page === currentPage ? "default" : "outline",
              size: "icon",
              onClick: () => onPageChange(page),
              "aria-label": `Page ${page}`,
              "aria-current": page === currentPage ? "page" : void 0,
              "data-ocid": `pagination-page-${page}`,
              children: page
            },
            page
          )
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "icon",
            onClick: () => onPageChange(currentPage + 1),
            disabled: currentPage === totalPages,
            "aria-label": "Page suivante",
            "data-ocid": "pagination-next",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
          }
        )
      ]
    }
  );
}
const CATEGORY_COLORS = {
  Transport: "bg-secondary/10 text-secondary border-secondary/30",
  Immobilier: "bg-primary/10 text-primary border-primary/30",
  Formation: "bg-accent/10 text-accent-foreground border-accent/30",
  Agrobusiness: "bg-chart-3/10 text-foreground border-chart-3/30"
};
function categoryClass(tag) {
  return CATEGORY_COLORS[tag] ?? "bg-muted text-muted-foreground border-border";
}
function formatDate(ts) {
  if (!ts) return "";
  const date = new Date(Number(ts) / 1e6);
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}
const GRADIENTS = [
  "from-primary/20 to-secondary/20",
  "from-secondary/20 to-primary/10",
  "from-primary/10 to-accent/20",
  "from-chart-2/20 to-primary/15",
  "from-accent/15 to-secondary/20",
  "from-primary/15 to-chart-3/20"
];
function PostCard({ post, index }) {
  var _a, _b;
  const excerpt = post.description.length > 150 ? `${post.description.slice(0, 150)}…` : post.description;
  const gradient = GRADIENTS[index % GRADIENTS.length];
  const hasImage = ((_b = (_a = post.featuredImage) == null ? void 0 : _a.getDirectURL) == null ? void 0 : _b.call(_a)) && post.featuredImage.getDirectURL() !== "";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 24 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.4, delay: index * 0.07 },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/blog/$slug",
          params: { slug: post.slug },
          "data-ocid": `blog-post-${post.id}`,
          className: "group flex flex-col h-full rounded-xl overflow-hidden border border-border bg-card shadow-corporate hover-lift transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `relative h-48 overflow-hidden bg-gradient-to-br ${gradient}`,
                children: [
                  hasImage ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: post.featuredImage.getDirectURL(),
                      alt: post.title,
                      className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-12 w-12 text-primary/40" }) }),
                  post.categoryTags[0] && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 left-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      className: `text-xs border ${categoryClass(post.categoryTags[0])} backdrop-blur-sm`,
                      variant: "outline",
                      children: post.categoryTags[0]
                    }
                  ) })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col flex-1 p-5", children: [
              post.categoryTags.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 mb-3", children: post.categoryTags.slice(1, 3).map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: `text-xs border ${categoryClass(tag)}`,
                  children: tag
                },
                tag
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground mb-2 line-clamp-2 leading-snug group-hover:text-primary transition-colors duration-200", children: post.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground line-clamp-3 mb-4 leading-relaxed flex-1", children: excerpt }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-3.5 w-3.5 shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: post.author })
                ] }),
                post.publishDate && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5" }),
                  formatDate(post.publishDate)
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:gap-2 transition-all duration-200", children: [
              "Lire l'article ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5" })
            ] }) })
          ]
        }
      )
    }
  );
}
function BlogSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: ["s1", "s2", "s3", "s4", "s5", "s6"].map((sk) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-xl overflow-hidden border border-border bg-card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 flex flex-col gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-3/4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-2/3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/3" })
          ] })
        ] })
      ]
    },
    sk
  )) });
}
function BlogPage() {
  var _a;
  const [page, setPage] = reactExports.useState(1);
  const pageSize = 9n;
  const { data, isLoading } = useBlogPosts(BigInt(page), pageSize);
  const totalPages = data ? Math.ceil(Number(data.total) / Number(pageSize)) : 1;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative bg-card border-b border-border py-20 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-20 -right-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 md:px-6 relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "inline-flex items-center gap-2 text-primary font-semibold uppercase tracking-widest text-xs mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4" }),
              "Actualités"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-5xl font-bold text-foreground mb-5 leading-tight", children: "Blog & Conseils" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground max-w-xl text-lg leading-relaxed", children: [
              "Actualités et conseils de",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-medium", children: "STS SOFITRANS SERVICE" }),
              " ",
              "— transport, logistique, immobilier et plus."
            ] })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-14 bg-background min-h-[40vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 md:px-6", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(BlogSkeleton, {}) : !((_a = data == null ? void 0 : data.posts) == null ? void 0 : _a.length) ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        className: "flex flex-col items-center justify-center py-24 text-center gap-5",
        "data-ocid": "empty-posts",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 w-20 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-10 w-10 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground", children: "Aucun article publié pour le moment" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-sm", children: "Revenez bientôt ! Nos experts préparent des contenus de qualité sur le transport, la logistique et l'immobilier." })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12", children: data.posts.map((post, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(PostCard, { post, index: i }, post.id.toString())) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Pagination,
        {
          currentPage: page,
          totalPages,
          onPageChange: (p) => {
            setPage(p);
            window.scrollTo({ top: 0, behavior: "smooth" });
          },
          className: "mt-4"
        }
      )
    ] }) }) })
  ] });
}
export {
  BlogPage as default
};
