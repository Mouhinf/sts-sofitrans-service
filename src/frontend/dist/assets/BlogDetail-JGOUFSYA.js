import { c as createLucideIcon, u as useParams, j as jsxRuntimeExports, B as Button, L as Link, m as motion } from "./index-CtugyttR.js";
import { B as Badge } from "./badge-DvHdE_Hx.js";
import { S as Skeleton } from "./skeleton-lD6-NYnm.js";
import { h as useBlogPostBySlug, g as useBlogPosts } from "./useBackend-DJ1gFwav.js";
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
const __iconNode$1 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
      key: "vktsd0"
    }
  ],
  ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" }]
];
const Tag = createLucideIcon("tag", __iconNode);
const CATEGORY_COLORS = {
  Transport: "bg-secondary/10 text-secondary border-secondary/30",
  Immobilier: "bg-primary/10 text-primary border-primary/30",
  Formation: "bg-accent/10 text-accent-foreground border-accent/30",
  Agrobusiness: "bg-muted text-muted-foreground border-border"
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
function PostContent({ html }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "prose prose-lg max-w-none text-foreground\n        [&_h1]:font-display [&_h1]:text-foreground\n        [&_h2]:font-display [&_h2]:text-foreground [&_h2]:mt-8 [&_h2]:mb-4\n        [&_h3]:font-display [&_h3]:text-foreground [&_h3]:mt-6 [&_h3]:mb-3\n        [&_p]:leading-relaxed [&_p]:text-foreground/90 [&_p]:mb-4\n        [&_a]:text-primary [&_a]:underline [&_a]:hover:text-primary/80\n        [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1\n        [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-1\n        [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground\n        [&_code]:bg-muted [&_code]:rounded [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&_code]:font-mono\n        [&_img]:rounded-xl [&_img]:shadow-corporate [&_img]:my-6",
      ref: (el) => {
        if (el && el.innerHTML !== html) {
          el.innerHTML = html;
        }
      }
    }
  );
}
function RelatedCard({ post }) {
  var _a, _b;
  const hasImage = ((_b = (_a = post.featuredImage) == null ? void 0 : _a.getDirectURL) == null ? void 0 : _b.call(_a)) && post.featuredImage.getDirectURL() !== "";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: "/blog/$slug",
      params: { slug: post.slug },
      "data-ocid": `related-post-${post.id}`,
      className: "group flex gap-4 rounded-lg border border-border bg-card p-3 hover:border-primary/40 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-20 rounded-md overflow-hidden shrink-0 bg-gradient-to-br from-primary/10 to-secondary/10", children: hasImage ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: post.featuredImage.getDirectURL(),
            alt: post.title,
            className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-5 w-5 text-primary/40" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-center min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-200", children: post.title }),
          post.publishDate && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: formatDate(post.publishDate) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 text-muted-foreground shrink-0 self-center group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-200" })
      ]
    }
  );
}
function DetailSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 md:px-6 py-12 max-w-4xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-32 mb-8" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-20" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-24" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-3/4 mb-3" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/2 mb-8" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-80 w-full rounded-xl mb-10" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: ["l1", "l2", "l3", "l4", "l5", "l6"].map((sk) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }, sk)) })
  ] });
}
function BlogDetailPage() {
  var _a, _b;
  const { slug } = useParams({ strict: false });
  const { data: post, isLoading } = useBlogPostBySlug(slug);
  const { data: latestPage } = useBlogPosts(1n, 10n);
  const relatedPosts = (latestPage == null ? void 0 : latestPage.posts.filter((p) => p.slug !== slug).slice(0, 3)) ?? [];
  const hasImage = ((_b = (_a = post == null ? void 0 : post.featuredImage) == null ? void 0 : _a.getDirectURL) == null ? void 0 : _b.call(_a)) && post.featuredImage.getDirectURL() !== "";
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(DetailSkeleton, {});
  }
  if (!post) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 md:px-6 py-24 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 w-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-10 w-10 text-muted-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-semibold text-foreground mb-3", children: "Article introuvable" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8", children: "Cet article n'existe pas ou a été supprimé." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", asChild: true, "data-ocid": "back-to-blog", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/blog", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4 mr-2" }),
        "Retour au blog"
      ] }) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "relative w-full h-72 md:h-96 overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20", children: [
      hasImage && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: post.featuredImage.getDirectURL(),
          alt: post.title,
          className: "absolute inset-0 w-full h-full object-cover"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex flex-col justify-end p-6 md:p-10 container mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.45 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap mb-3", children: post.categoryTags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                className: `text-xs border backdrop-blur-sm ${categoryClass(tag)}`,
                variant: "outline",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "h-2.5 w-2.5 mr-1" }),
                  tag
                ]
              },
              tag
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl md:text-4xl font-bold text-white leading-tight max-w-3xl drop-shadow-lg", children: post.title })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-background py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 md:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col lg:flex-row gap-10 max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "flex-1 min-w-0",
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4, delay: 0.1 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "sm",
                asChild: true,
                className: "-ml-2 mb-6 text-muted-foreground hover:text-foreground",
                "data-ocid": "back-to-blog",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/blog", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4 mr-1.5" }),
                  "Retour au blog"
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground mb-8 pb-6 border-b border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: post.author })
              ] }),
              post.publishDate && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4 text-primary" }),
                formatDate(post.publishDate)
              ] })
            ] }),
            post.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground font-medium leading-relaxed mb-8 border-l-4 border-primary pl-4", children: post.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(PostContent, { html: post.content })
          ]
        }
      ),
      relatedPosts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.aside,
        {
          className: "lg:w-72 shrink-0",
          initial: { opacity: 0, x: 20 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.4, delay: 0.25 },
          "aria-label": "Articles connexes",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground mb-4 text-base", children: "Articles récents" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: relatedPosts.map((related) => /* @__PURE__ */ jsxRuntimeExports.jsx(RelatedCard, { post: related }, related.id.toString())) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                asChild: true,
                className: "w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground",
                "data-ocid": "all-articles-btn",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/blog", children: "Tous les articles" })
              }
            ) })
          ] })
        }
      )
    ] }) }) })
  ] });
}
export {
  BlogDetailPage as default
};
