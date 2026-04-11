import { r as reactExports, j as jsxRuntimeExports, B as Button, e as ue } from "./index-CtugyttR.js";
import { A as AdminLayout } from "./AdminLayout-CUSwgGZ7.js";
import { M as Modal } from "./Modal-CB1d7WGu.js";
import { B as Badge } from "./badge-DvHdE_Hx.js";
import { S as Skeleton } from "./skeleton-lD6-NYnm.js";
import { D as useAdminBookings, E as useAdminUpdateBookingStatus } from "./useBackend-DJ1gFwav.js";
import { B as BookingStatus } from "./backend-gUdCIi-2.js";
import { C as CircleCheckBig } from "./circle-check-big-Ctt98_d1.js";
import { C as CircleX } from "./circle-x-Btg84koK.js";
import { E as Eye } from "./eye-BIVQjBNO.js";
import "./useAuth-DVc-f4-X.js";
import "./building-2-CWrEx0pq.js";
import "./truck-BuWQRKbv.js";
import "./graduation-cap-D0lJeyMd.js";
import "./message-square-D-yhUmMR.js";
import "./chevron-right-DwShqWtx.js";
const STATUS_LABELS = {
  [BookingStatus.pending]: "En attente",
  [BookingStatus.confirmed]: "Confirmée",
  [BookingStatus.cancelled]: "Annulée"
};
const STATUS_COLORS = {
  [BookingStatus.pending]: "bg-amber-50 text-amber-700 border-amber-200",
  [BookingStatus.confirmed]: "bg-primary/10 text-primary border-primary/20",
  [BookingStatus.cancelled]: "bg-destructive/10 text-destructive border-destructive/20"
};
const formatDate = (ts) => new Date(Number(ts) / 1e6).toLocaleDateString("fr-FR");
function AdminReservationsPage() {
  const { data: bookings, isLoading } = useAdminBookings();
  const updateStatus = useAdminUpdateBookingStatus();
  const [selected, setSelected] = reactExports.useState(null);
  const handleStatus = async (booking, status) => {
    try {
      await updateStatus.mutateAsync({ id: booking.id, status });
      ue.success("Statut mis à jour");
      if ((selected == null ? void 0 : selected.id) === booking.id) setSelected({ ...booking, status });
    } catch {
      ue.error("Erreur lors de la mise à jour");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminLayout, { title: "Réservations", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        (bookings == null ? void 0 : bookings.length) ?? 0,
        " réservation(s)"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: [
        BookingStatus.pending,
        BookingStatus.confirmed,
        BookingStatus.cancelled
      ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "span",
        {
          className: `px-2 py-0.5 rounded-full border text-xs ${STATUS_COLORS[s]}`,
          children: [
            (bookings == null ? void 0 : bookings.filter((b) => b.status === s).length) ?? 0,
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3 font-medium text-muted-foreground hidden md:table-cell", children: "Véhicule ID" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3 font-medium text-muted-foreground hidden lg:table-cell", children: "Dates" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3 font-medium text-muted-foreground", children: "Statut" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right p-3 font-medium text-muted-foreground", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
        isLoading ? ["r1", "r2", "r3", "r4", "r5"].map((sk) => /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border", children: ["c1", "c2", "c3", "c4", "c5", "c6"].map((ck) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }) }, ck)) }, sk)) : bookings == null ? void 0 : bookings.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: "border-b border-border last:border-0 hover:bg-muted/20 transition-colors",
            "data-ocid": `admin-booking-${b.id}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 font-medium text-foreground", children: b.customerName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-muted-foreground hidden md:table-cell", children: b.email }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-muted-foreground hidden md:table-cell font-mono text-xs", children: b.vehicleId.toString() }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-3 text-muted-foreground hidden lg:table-cell text-xs whitespace-nowrap", children: [
                b.startDate,
                " → ",
                b.endDate
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: STATUS_COLORS[b.status],
                  children: STATUS_LABELS[b.status]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1", children: [
                b.status === BookingStatus.pending && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "ghost",
                      size: "icon",
                      onClick: () => handleStatus(b, BookingStatus.confirmed),
                      className: "text-primary",
                      "aria-label": "Confirmer",
                      "data-ocid": `confirm-booking-${b.id}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-4 w-4" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "ghost",
                      size: "icon",
                      onClick: () => handleStatus(b, BookingStatus.cancelled),
                      className: "text-destructive",
                      "aria-label": "Annuler",
                      "data-ocid": `cancel-booking-${b.id}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-4 w-4" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "icon",
                    onClick: () => setSelected(b),
                    "aria-label": "Voir",
                    "data-ocid": "view-booking-btn",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" })
                  }
                )
              ] }) })
            ]
          },
          b.id.toString()
        )),
        !isLoading && !(bookings == null ? void 0 : bookings.length) && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "td",
          {
            colSpan: 6,
            className: "p-8 text-center text-muted-foreground",
            "data-ocid": "empty-admin-bookings",
            children: "Aucune réservation pour l'instant"
          }
        ) })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        isOpen: !!selected,
        onClose: () => setSelected(null),
        title: "Détail de la réservation",
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
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Début" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: selected.startDate })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Fin" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: selected.endDate })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Véhicule ID" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs", children: selected.vehicleId.toString() })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Créée le" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: formatDate(selected.createdAt) })
            ] }),
            selected.specialRequests && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Demandes spéciales" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm bg-muted/50 rounded-lg p-3", children: selected.specialRequests })
            ] })
          ] }),
          selected.status === BookingStatus.pending && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-2 border-t border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                onClick: () => handleStatus(selected, BookingStatus.confirmed),
                className: "flex-1",
                "data-ocid": "modal-confirm-btn",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-4 w-4 mr-2" }),
                  "Confirmer"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "destructive",
                onClick: () => handleStatus(selected, BookingStatus.cancelled),
                className: "flex-1",
                "data-ocid": "modal-cancel-btn",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-4 w-4 mr-2" }),
                  "Annuler"
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
  AdminReservationsPage as default
};
