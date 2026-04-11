import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, m as motion, B as Button } from "./index-CtugyttR.js";
import { I as InputField } from "./InputField-FRvVB7Ym.js";
import { M as Modal } from "./Modal-CB1d7WGu.js";
import { T as TextareaField } from "./TextareaField-j00ddAAZ.js";
import { B as Badge } from "./badge-DvHdE_Hx.js";
import { S as Skeleton } from "./skeleton-lD6-NYnm.js";
import { a as useVehicles, d as useSubmitBooking } from "./useBackend-DJ1gFwav.js";
import { T as Truck } from "./truck-BuWQRKbv.js";
import { U as Users } from "./users-o0ERafMs.js";
import { C as CircleCheck } from "./circle-check-DmsAxiSo.js";
import "./backend-gUdCIi-2.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M16 14h.01", key: "1gbofw" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M16 18h.01", key: "kzsmim" }]
];
const CalendarDays = createLucideIcon("calendar-days", __iconNode);
const VEHICLE_TYPE_LABELS = {
  car: "Voiture",
  bus: "Bus",
  truck: "Camion",
  minibus: "Minibus"
};
function formatFCFA(amount) {
  return `${new Intl.NumberFormat("fr-FR").format(Number(amount))} FCFA`;
}
function VehicleCard({
  vehicle,
  onClick
}) {
  var _a;
  const imageUrl = ((_a = vehicle.images[0]) == null ? void 0 : _a.getDirectURL()) ?? "/assets/images/placeholder.svg";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.button,
    {
      type: "button",
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.4 },
      className: "group bg-card border border-border rounded-xl overflow-hidden shadow-corporate hover-lift cursor-pointer text-left w-full",
      onClick,
      "aria-label": `Voir ${vehicle.title}`,
      "data-ocid": "vehicle-card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-48 overflow-hidden bg-muted", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: imageUrl,
              alt: vehicle.title,
              className: "w-full h-full object-cover group-hover:scale-105 transition-smooth"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 left-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-secondary text-secondary-foreground text-xs font-semibold", children: VEHICLE_TYPE_LABELS[vehicle.vehicleType] ?? vehicle.vehicleType }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground text-lg mb-1 truncate group-hover:text-secondary transition-colors duration-200", children: vehicle.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-1", children: vehicle.model }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3 text-sm text-muted-foreground mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3.5 h-3.5" }),
            String(vehicle.capacity),
            " places"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-secondary font-bold text-lg", children: [
            formatFCFA(vehicle.pricePerDay),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-normal text-muted-foreground", children: [
              " ",
              "/ jour"
            ] })
          ] })
        ] })
      ]
    }
  );
}
function BookingForm({
  vehicle,
  onSuccess
}) {
  const { mutate, isPending, isSuccess, isError } = useSubmitBooking();
  const [form, setForm] = reactExports.useState({
    customerName: "",
    vehicleId: vehicle.id,
    email: "",
    phone: "",
    startDate: "",
    endDate: "",
    specialRequests: ""
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(form, { onSuccess });
  };
  if (isSuccess) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4 py-6 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-12 h-12 text-secondary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-display font-bold text-foreground", children: "Réservation envoyée !" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Votre demande de réservation a été soumise. Notre équipe vous confirmera sous 24h." })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      onSubmit: handleSubmit,
      className: "flex flex-col gap-4",
      "data-ocid": "booking-form",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          InputField,
          {
            label: "Nom complet",
            required: true,
            value: form.customerName,
            onChange: (e) => setForm((f) => ({ ...f, customerName: e.target.value })),
            placeholder: "Votre nom",
            "data-ocid": "booking-name"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          InputField,
          {
            label: "Email",
            type: "email",
            required: true,
            value: form.email,
            onChange: (e) => setForm((f) => ({ ...f, email: e.target.value })),
            placeholder: "votre@email.com",
            "data-ocid": "booking-email"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          InputField,
          {
            label: "Téléphone",
            type: "tel",
            required: true,
            value: form.phone,
            onChange: (e) => setForm((f) => ({ ...f, phone: e.target.value })),
            placeholder: "+221 XX XXX XX XX",
            "data-ocid": "booking-phone"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            InputField,
            {
              label: "Date de début",
              type: "date",
              required: true,
              value: form.startDate,
              onChange: (e) => setForm((f) => ({ ...f, startDate: e.target.value })),
              "data-ocid": "booking-start-date"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            InputField,
            {
              label: "Date de fin",
              type: "date",
              required: true,
              value: form.endDate,
              onChange: (e) => setForm((f) => ({ ...f, endDate: e.target.value })),
              "data-ocid": "booking-end-date"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          TextareaField,
          {
            label: "Demandes spéciales",
            value: form.specialRequests,
            onChange: (e) => setForm((f) => ({ ...f, specialRequests: e.target.value })),
            placeholder: "Informations supplémentaires...",
            rows: 3,
            "data-ocid": "booking-requests"
          }
        ),
        isError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive text-center", role: "alert", children: "Une erreur s'est produite. Veuillez réessayer." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            className: "w-full bg-secondary text-secondary-foreground hover:bg-secondary/90",
            disabled: isPending,
            "data-ocid": "booking-submit",
            children: isPending ? "Envoi en cours..." : "Confirmer la réservation"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: `https://wa.me/221770000000?text=Je souhaite réserver : ${encodeURIComponent(vehicle.title)}`,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "flex items-center justify-center gap-2 w-full border border-border text-muted-foreground px-4 py-2.5 rounded-md text-sm font-medium hover:border-primary/40 hover:text-foreground transition-smooth",
            "data-ocid": "booking-whatsapp",
            children: "Réserver via WhatsApp"
          }
        )
      ]
    }
  );
}
const TYPE_FILTERS = [
  { value: "", label: "Tous" },
  { value: "car", label: "Voiture" },
  { value: "bus", label: "Bus" },
  { value: "truck", label: "Camion" },
  { value: "minibus", label: "Minibus" }
];
function TransportPage() {
  const [vehicleTypeFilter, setVehicleTypeFilter] = reactExports.useState("");
  const [maxPriceFilter, setMaxPriceFilter] = reactExports.useState("");
  const backendFilter = vehicleTypeFilter ? { vehicleType: vehicleTypeFilter } : {};
  const { data: vehicles, isLoading } = useVehicles(backendFilter);
  const [selectedVehicle, setSelectedVehicle] = reactExports.useState(null);
  const filteredVehicles = vehicles == null ? void 0 : vehicles.filter((v) => {
    if (!maxPriceFilter) return true;
    const maxPrice = Number(maxPriceFilter.replace(/\s/g, ""));
    if (Number.isNaN(maxPrice)) return true;
    return Number(v.pricePerDay) <= maxPrice;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-secondary py-16 px-4 text-secondary-foreground relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-10 pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-80 h-80 rounded-full bg-secondary-foreground translate-x-1/3 -translate-y-1/3" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-8 h-8" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold uppercase tracking-widest opacity-80", children: "Services" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-5xl font-display font-bold mb-4", children: "Transport" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg opacity-90 max-w-xl", children: "Location et affrètement de véhicules professionnels pour tous vos déplacements." })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b border-border py-5 px-4 sticky top-0 z-30 shadow-corporate", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Type :" }),
        TYPE_FILTERS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setVehicleTypeFilter(opt.value),
            className: `px-3 py-1.5 rounded-full text-sm font-medium transition-smooth ${vehicleTypeFilter === opt.value ? "bg-secondary text-secondary-foreground shadow-corporate" : "bg-muted text-muted-foreground hover:bg-muted/80"}`,
            "data-ocid": `filter-${opt.value || "all"}`,
            children: opt.label
          },
          opt.value
        ))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        InputField,
        {
          label: "",
          id: "max-price-filter",
          type: "number",
          value: maxPriceFilter,
          onChange: (e) => setMaxPriceFilter(e.target.value),
          placeholder: "Prix max/jour (FCFA)",
          "data-ocid": "filter-max-price"
        }
      ) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-12 px-4 min-h-[400px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: ["s1", "s2", "s3", "s4", "s5", "s6"].map((sk) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-xl overflow-hidden border border-border",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 w-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex flex-col gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-3/4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/2" })
          ] })
        ]
      },
      sk
    )) }) : !(filteredVehicles == null ? void 0 : filteredVehicles.length) ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center gap-4 py-20 text-center",
        "data-ocid": "empty-state-vehicles",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-16 h-16 text-muted-foreground/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-display font-semibold text-foreground", children: "Aucun véhicule disponible" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-sm", children: "Aucun véhicule ne correspond à ce filtre. Essayez un autre type." })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: filteredVehicles.map((vehicle) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      VehicleCard,
      {
        vehicle,
        onClick: () => setSelectedVehicle(vehicle)
      },
      String(vehicle.id)
    )) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        isOpen: !!selectedVehicle,
        onClose: () => setSelectedVehicle(null),
        title: selectedVehicle == null ? void 0 : selectedVehicle.title,
        size: "xl",
        children: selectedVehicle && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-5", children: [
          selectedVehicle.images[0] && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg overflow-hidden h-48 bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: selectedVehicle.images[0].getDirectURL(),
              alt: selectedVehicle.title,
              className: "w-full h-full object-cover"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-secondary/10 text-secondary border-secondary/20", children: VEHICLE_TYPE_LABELS[selectedVehicle.vehicleType] ?? selectedVehicle.vehicleType }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3 h-3" }),
              String(selectedVehicle.capacity),
              " places"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "w-3 h-3" }),
              formatFCFA(selectedVehicle.pricePerDay),
              "/jour"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: selectedVehicle.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border pt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground mb-4", children: "Formulaire de réservation" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              BookingForm,
              {
                vehicle: selectedVehicle,
                onSuccess: () => setSelectedVehicle(null)
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  TransportPage as default
};
