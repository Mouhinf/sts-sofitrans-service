import { b as useNavigate, r as reactExports, j as jsxRuntimeExports, m as motion, L as Link } from "./index-CtugyttR.js";
import { A as AdminLayout, C as CalendarCheck, F as FileQuestion, a as FileText } from "./AdminLayout-CUSwgGZ7.js";
import { C as Card, a as CardContent } from "./card-BdjdAgZz.js";
import { S as Skeleton } from "./skeleton-lD6-NYnm.js";
import { u as useAuth } from "./useAuth-DVc-f4-X.js";
import { j as useAdminDashboardStats } from "./useBackend-DJ1gFwav.js";
import { M as MessageSquare } from "./message-square-D-yhUmMR.js";
import { B as Building2 } from "./building-2-CWrEx0pq.js";
import { T as Truck } from "./truck-BuWQRKbv.js";
import { G as GraduationCap } from "./graduation-cap-D0lJeyMd.js";
import { U as Users } from "./users-o0ERafMs.js";
import { T as TrendingUp } from "./trending-up-BUuS6Y-g.js";
import "./chevron-right-DwShqWtx.js";
import "./backend-gUdCIi-2.js";
const STAT_CARDS = [
  {
    key: "totalProperties",
    label: "Propriétés",
    icon: Building2,
    href: "/admin/proprietes",
    color: "text-primary"
  },
  {
    key: "totalVehicles",
    label: "Véhicules",
    icon: Truck,
    href: "/admin/vehicules",
    color: "text-secondary"
  },
  {
    key: "totalTrainings",
    label: "Formations",
    icon: GraduationCap,
    href: "/admin/formations",
    color: "text-primary"
  },
  {
    key: "totalBlogPosts",
    label: "Articles",
    icon: FileText,
    href: "/admin/blog",
    color: "text-secondary"
  },
  {
    key: "totalMessages",
    label: "Messages",
    icon: MessageSquare,
    href: "/admin/messages",
    color: "text-primary"
  },
  {
    key: "totalBookings",
    label: "Réservations",
    icon: CalendarCheck,
    href: "/admin/reservations",
    color: "text-secondary"
  },
  {
    key: "totalQuotes",
    label: "Devis",
    icon: FileQuestion,
    href: "/admin/devis",
    color: "text-primary"
  },
  {
    key: "totalSubscribers",
    label: "Abonnés",
    icon: Users,
    href: "/admin/parametres",
    color: "text-secondary"
  }
];
function AdminDashboardPage() {
  const { isAuthenticated, isInitializing } = useAuth();
  const navigate = useNavigate();
  const { data: stats, isLoading } = useAdminDashboardStats();
  reactExports.useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      navigate({ to: "/admin/login" });
    }
  }, [isAuthenticated, isInitializing, navigate]);
  if (isInitializing) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 animate-spin rounded-full border-4 border-border border-t-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Chargement…" })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLayout, { title: "Tableau de bord", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground", children: "Bienvenue, Administrateur" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Vue d'ensemble de votre plateforme STS SOFITRANS SERVICE." })
        ]
      }
    ),
    stats && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
      Number(stats.unreadMessages) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/admin/messages",
          className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-destructive/10 text-destructive text-xs font-medium",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-3.5 w-3.5" }),
            " ",
            Number(stats.unreadMessages),
            " message(s) non lu(s)"
          ]
        }
      ),
      Number(stats.pendingBookings) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/admin/reservations",
          className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 text-xs font-medium",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarCheck, { className: "h-3.5 w-3.5" }),
            " ",
            Number(stats.pendingBookings),
            " réservation(s) en attente"
          ]
        }
      ),
      Number(stats.pendingQuotes) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/admin/devis",
          className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-medium",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileQuestion, { className: "h-3.5 w-3.5" }),
            " ",
            Number(stats.pendingQuotes),
            " devis en attente"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: STAT_CARDS.map((card, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: i * 0.05 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: card.href, "data-ocid": `stat-card-${card.key}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "hover-lift cursor-pointer border border-border hover:border-primary/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex flex-col gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-lg bg-muted w-fit", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            card.icon,
            {
              className: ["h-5 w-5", card.color].join(" ")
            }
          ) }),
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-12" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl font-bold text-foreground", children: Number((stats == null ? void 0 : stats[card.key]) ?? 0n) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: card.label })
        ] }) }) })
      },
      card.key
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6 flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 rounded-xl bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-6 w-6 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "Plateforme active" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Toutes les sections sont opérationnelles. Continuez à enrichir votre contenu." })
      ] })
    ] }) })
  ] }) });
}
export {
  AdminDashboardPage as default
};
