import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, B as Button, e as ue } from "./index-CtugyttR.js";
import { A as AdminLayout } from "./AdminLayout-CUSwgGZ7.js";
import { M as Modal } from "./Modal-CB1d7WGu.js";
import { B as Badge } from "./badge-DvHdE_Hx.js";
import { S as Skeleton } from "./skeleton-lD6-NYnm.js";
import { B as useAdminMessages, C as useAdminUpdateMessageStatus } from "./useBackend-DJ1gFwav.js";
import { M as MessageStatus } from "./backend-gUdCIi-2.js";
import { M as Mail } from "./mail-DAN-GL6r.js";
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
  ["rect", { width: "20", height: "5", x: "2", y: "3", rx: "1", key: "1wp1u1" }],
  ["path", { d: "M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8", key: "1s80jp" }],
  ["path", { d: "M10 12h4", key: "a56b0p" }]
];
const Archive = createLucideIcon("archive", __iconNode);
const STATUS_LABELS = {
  unread: "Non lu",
  read: "Lu",
  archived: "Archivé"
};
const formatDate = (ts) => new Date(Number(ts) / 1e6).toLocaleString("fr-FR", {
  day: "2-digit",
  month: "short",
  year: "numeric"
});
function AdminMessagesPage() {
  const { data: messages, isLoading } = useAdminMessages();
  const updateStatus = useAdminUpdateMessageStatus();
  const [filter, setFilter] = reactExports.useState("all");
  const [selected, setSelected] = reactExports.useState(null);
  const filtered = messages == null ? void 0 : messages.filter(
    (m) => filter === "all" ? true : m.status === filter
  );
  const handleStatus = async (msg, status) => {
    try {
      await updateStatus.mutateAsync({ id: msg.id, status });
      ue.success("Statut mis à jour");
      if ((selected == null ? void 0 : selected.id) === msg.id) setSelected({ ...msg, status });
    } catch {
      ue.error("Erreur lors de la mise à jour");
    }
  };
  const filters = [
    { value: "all", label: "Tous" },
    { value: MessageStatus.unread, label: "Non lus" },
    { value: MessageStatus.read, label: "Lus" },
    { value: MessageStatus.archived, label: "Archivés" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminLayout, { title: "Messages", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 mb-6 flex-wrap", "data-ocid": "message-filters", children: filters.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setFilter(f.value),
        className: `px-3 py-1.5 text-sm rounded-lg border transition-colors duration-150 ${filter === f.value ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-muted-foreground hover:bg-muted/50"}`,
        "data-ocid": `filter-${f.value}`,
        children: [
          f.label,
          f.value !== "all" && messages && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1.5 text-xs opacity-70", children: [
            "(",
            messages.filter((m) => m.status === f.value).length,
            ")"
          ] })
        ]
      },
      f.value
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/50 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3 font-medium text-muted-foreground", children: "Nom" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3 font-medium text-muted-foreground hidden md:table-cell", children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3 font-medium text-muted-foreground hidden md:table-cell", children: "Téléphone" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3 font-medium text-muted-foreground hidden lg:table-cell", children: "Extrait" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3 font-medium text-muted-foreground hidden lg:table-cell", children: "Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3 font-medium text-muted-foreground", children: "Statut" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right p-3 font-medium text-muted-foreground", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
        isLoading ? ["r1", "r2", "r3", "r4", "r5"].map((sk) => /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border", children: ["c1", "c2", "c3", "c4", "c5", "c6", "c7"].map((ck) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }) }, ck)) }, sk)) : filtered == null ? void 0 : filtered.map((msg) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: `border-b border-border last:border-0 hover:bg-muted/20 transition-colors cursor-pointer ${msg.status === MessageStatus.unread ? "font-medium" : ""}`,
            onClick: () => setSelected(msg),
            onKeyDown: (e) => e.key === "Enter" && setSelected(msg),
            tabIndex: 0,
            "data-ocid": `admin-message-${msg.id}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-foreground", children: msg.customerName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-muted-foreground hidden md:table-cell", children: msg.email }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-muted-foreground hidden md:table-cell", children: msg.phone }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-muted-foreground hidden lg:table-cell max-w-[200px] truncate", children: msg.message }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-muted-foreground hidden lg:table-cell text-xs whitespace-nowrap", children: formatDate(msg.createdAt) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: msg.status === MessageStatus.unread ? "default" : "outline",
                  className: msg.status === MessageStatus.unread ? "bg-primary/10 text-primary border-primary/20" : "",
                  children: STATUS_LABELS[msg.status] ?? msg.status
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "td",
                {
                  className: "p-3",
                  onClick: (e) => e.stopPropagation(),
                  onKeyDown: (e) => e.stopPropagation(),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1", children: [
                    msg.status !== MessageStatus.read && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "ghost",
                        size: "icon",
                        onClick: () => handleStatus(msg, MessageStatus.read),
                        "aria-label": "Marquer comme lu",
                        "data-ocid": `mark-read-${msg.id}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4 w-4" })
                      }
                    ),
                    msg.status !== MessageStatus.archived && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "ghost",
                        size: "icon",
                        onClick: () => handleStatus(msg, MessageStatus.archived),
                        "aria-label": "Archiver",
                        "data-ocid": `archive-msg-${msg.id}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Archive, { className: "h-4 w-4" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "ghost",
                        size: "icon",
                        onClick: () => setSelected(msg),
                        "aria-label": "Voir",
                        "data-ocid": "view-message-btn",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" })
                      }
                    )
                  ] })
                }
              )
            ]
          },
          msg.id.toString()
        )),
        !isLoading && !(filtered == null ? void 0 : filtered.length) && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "td",
          {
            colSpan: 7,
            className: "p-8 text-center text-muted-foreground",
            "data-ocid": "empty-admin-messages",
            children: "Aucun message dans cette catégorie"
          }
        ) })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        isOpen: !!selected,
        onClose: () => setSelected(null),
        title: "Détail du message",
        size: "md",
        children: selected && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Nom" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: selected.customerName })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Statut" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: selected.status === MessageStatus.unread ? "default" : "outline",
                  children: STATUS_LABELS[selected.status] ?? selected.status
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
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: selected.phone || "—" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Reçu le" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: formatDate(selected.createdAt) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/50 rounded-lg p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground mb-2", children: "Message" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground whitespace-pre-wrap", children: selected.message })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-wrap", children: [
            selected.status !== MessageStatus.read && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                onClick: () => handleStatus(selected, MessageStatus.read),
                "data-ocid": "modal-mark-read-btn",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-3.5 w-3.5 mr-1.5" }),
                  "Marquer comme lu"
                ]
              }
            ),
            selected.status !== MessageStatus.archived && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                onClick: () => handleStatus(selected, MessageStatus.archived),
                "data-ocid": "modal-archive-btn",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Archive, { className: "h-3.5 w-3.5 mr-1.5" }),
                  "Archiver"
                ]
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  AdminMessagesPage as default
};
