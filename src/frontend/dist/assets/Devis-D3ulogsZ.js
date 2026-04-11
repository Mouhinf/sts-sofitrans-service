import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, B as Button, e as ue } from "./index-CtugyttR.js";
import { A as AdminLayout } from "./AdminLayout-CUSwgGZ7.js";
import { M as Modal } from "./Modal-CB1d7WGu.js";
import { B as Badge } from "./badge-DvHdE_Hx.js";
import { S as Skeleton } from "./skeleton-lD6-NYnm.js";
import { F as useAdminQuotes, G as useAdminUpdateQuoteStatus } from "./useBackend-DJ1gFwav.js";
import { Q as QuoteStatus } from "./backend-gUdCIi-2.js";
import { C as CircleCheckBig } from "./circle-check-big-Ctt98_d1.js";
import { C as CircleX } from "./circle-x-Btg84koK.js";
import { E as Eye } from "./eye-BIVQjBNO.js";
import "./useAuth-DVc-f4-X.js";
import "./building-2-CWrEx0pq.js";
import "./truck-BuWQRKbv.js";
import "./graduation-cap-D0lJeyMd.js";
import "./message-square-D-yhUmMR.js";
import "./chevron-right-DwShqWtx.js";
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
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode);
const STATUS_LABELS = {
  [QuoteStatus.pending]: "En attente",
  [QuoteStatus.sent]: "Envoyé",
  [QuoteStatus.accepted]: "Accepté",
  [QuoteStatus.declined]: "Refusé"
};
const STATUS_COLORS = {
  [QuoteStatus.pending]: "bg-amber-50 text-amber-700 border-amber-200",
  [QuoteStatus.sent]: "bg-secondary/10 text-secondary border-secondary/20",
  [QuoteStatus.accepted]: "bg-primary/10 text-primary border-primary/20",
  [QuoteStatus.declined]: "bg-destructive/10 text-destructive border-destructive/20"
};
const formatDate = (ts) => new Date(Number(ts) / 1e6).toLocaleDateString("fr-FR");
function AdminDevisPage() {
  const { data: quotes, isLoading } = useAdminQuotes();
  const updateStatus = useAdminUpdateQuoteStatus();
  const [selected, setSelected] = reactExports.useState(null);
  const handleStatus = async (quote, status) => {
    try {
      await updateStatus.mutateAsync({ id: quote.id, status });
      ue.success("Statut mis à jour");
      if ((selected == null ? void 0 : selected.id) === quote.id) setSelected({ ...quote, status });
    } catch {
      ue.error("Erreur lors de la mise à jour");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminLayout, { title: "Devis", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        (quotes == null ? void 0 : quotes.length) ?? 0,
        " devis"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: [
        QuoteStatus.pending,
        QuoteStatus.sent,
        QuoteStatus.accepted,
        QuoteStatus.declined
      ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "span",
        {
          className: `px-2 py-0.5 rounded-full border text-xs ${STATUS_COLORS[s]}`,
          children: [
            (quotes == null ? void 0 : quotes.filter((q) => q.status === s).length) ?? 0,
            " ",
            STATUS_LABELS[s].toLowerCase()
          ]
        },
        s
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/50 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3 font-medium text-muted-foreground", children: "Client" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3 font-medium text-muted-foreground hidden md:table-cell", children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3 font-medium text-muted-foreground hidden md:table-cell", children: "Service" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3 font-medium text-muted-foreground hidden lg:table-cell", children: "Budget" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3 font-medium text-muted-foreground hidden lg:table-cell", children: "Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3 font-medium text-muted-foreground", children: "Statut" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right p-3 font-medium text-muted-foreground", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
        isLoading ? ["r1", "r2", "r3", "r4", "r5"].map((sk) => /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border", children: ["c1", "c2", "c3", "c4", "c5", "c6", "c7"].map((ck) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }) }, ck)) }, sk)) : quotes == null ? void 0 : quotes.map((q) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: "border-b border-border last:border-0 hover:bg-muted/20 transition-colors",
            "data-ocid": `admin-quote-${q.id}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 font-medium text-foreground", children: q.customerName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-muted-foreground hidden md:table-cell", children: q.email }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 hidden md:table-cell max-w-[120px] truncate text-muted-foreground", children: q.serviceType }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 hidden lg:table-cell text-muted-foreground", children: q.budgetRange || "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 hidden lg:table-cell text-muted-foreground text-xs whitespace-nowrap", children: formatDate(q.createdAt) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: STATUS_COLORS[q.status],
                  children: STATUS_LABELS[q.status]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1", children: [
                q.status === QuoteStatus.pending && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "icon",
                    onClick: () => handleStatus(q, QuoteStatus.sent),
                    className: "text-secondary",
                    "aria-label": "Marquer envoyé",
                    "data-ocid": `send-quote-${q.id}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4" })
                  }
                ),
                (q.status === QuoteStatus.pending || q.status === QuoteStatus.sent) && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "ghost",
                      size: "icon",
                      onClick: () => handleStatus(q, QuoteStatus.accepted),
                      className: "text-primary",
                      "aria-label": "Accepter",
                      "data-ocid": `accept-quote-${q.id}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-4 w-4" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "ghost",
                      size: "icon",
                      onClick: () => handleStatus(q, QuoteStatus.declined),
                      className: "text-destructive",
                      "aria-label": "Refuser",
                      "data-ocid": `decline-quote-${q.id}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-4 w-4" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "icon",
                    onClick: () => setSelected(q),
                    "aria-label": "Voir",
                    "data-ocid": "view-quote-btn",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" })
                  }
                )
              ] }) })
            ]
          },
          q.id.toString()
        )),
        !isLoading && !(quotes == null ? void 0 : quotes.length) && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "td",
          {
            colSpan: 7,
            className: "p-8 text-center text-muted-foreground",
            "data-ocid": "empty-admin-quotes",
            children: "Aucun devis pour l'instant"
          }
        ) })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        isOpen: !!selected,
        onClose: () => setSelected(null),
        title: "Détail du devis",
        size: "md",
        children: selected && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Client" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: selected.customerName })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Statut" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: STATUS_COLORS[selected.status],
                  children: STATUS_LABELS[selected.status]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Email" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: `mailto:${selected.email}`,
                  className: "text-primary hover:underline",
                  children: selected.email
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Téléphone" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: selected.phone })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Service demandé" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: selected.serviceType })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Budget estimé" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: selected.budgetRange || "Non précisé" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Reçu le" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: formatDate(selected.createdAt) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Besoins / exigences" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm bg-muted/50 rounded-lg p-3 whitespace-pre-wrap", children: selected.requirements || "—" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-wrap pt-2 border-t border-border", children: [
            selected.status === QuoteStatus.pending && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                onClick: () => handleStatus(selected, QuoteStatus.sent),
                "data-ocid": "modal-send-btn",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-3.5 w-3.5 mr-1.5" }),
                  "Marquer envoyé"
                ]
              }
            ),
            (selected.status === QuoteStatus.pending || selected.status === QuoteStatus.sent) && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  onClick: () => handleStatus(selected, QuoteStatus.accepted),
                  "data-ocid": "modal-accept-btn",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-3.5 w-3.5 mr-1.5" }),
                    "Accepter"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  variant: "destructive",
                  onClick: () => handleStatus(selected, QuoteStatus.declined),
                  "data-ocid": "modal-decline-btn",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-3.5 w-3.5 mr-1.5" }),
                    "Refuser"
                  ]
                }
              )
            ] })
          ] })
        ] })
      }
    )
  ] });
}
export {
  AdminDevisPage as default
};
