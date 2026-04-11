import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, m as motion, B as Button, X } from "./index-CtugyttR.js";
import { I as InputField } from "./InputField-FRvVB7Ym.js";
import { M as Modal } from "./Modal-CB1d7WGu.js";
import { S as SelectField } from "./SelectField-BS7dmjDh.js";
import { T as TextareaField } from "./TextareaField-j00ddAAZ.js";
import { B as Badge } from "./badge-DvHdE_Hx.js";
import { S as Skeleton } from "./skeleton-lD6-NYnm.js";
import { u as useProperties, c as useSubmitQuote } from "./useBackend-DJ1gFwav.js";
import { B as Building2 } from "./building-2-CWrEx0pq.js";
import { B as Bath } from "./bath-DK9JM3H4.js";
import { M as MapPin } from "./map-pin-D1vzAJf-.js";
import { C as CircleCheck } from "./circle-check-DmsAxiSo.js";
import "./backend-gUdCIi-2.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M2 4v16", key: "vw9hq8" }],
  ["path", { d: "M2 8h18a2 2 0 0 1 2 2v10", key: "1dgv2r" }],
  ["path", { d: "M2 17h20", key: "18nfp3" }],
  ["path", { d: "M6 8v9", key: "1yriud" }]
];
const Bed = createLucideIcon("bed", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }]
];
const Square = createLucideIcon("square", __iconNode);
const PROPERTY_TYPE_LABELS = {
  apartment: "Appartement",
  house: "Maison",
  land: "Terrain",
  office: "Bureau"
};
function formatFCFA(amount) {
  return `${new Intl.NumberFormat("fr-FR").format(Number(amount))} FCFA`;
}
function PropertyCard({
  property,
  onClick
}) {
  var _a;
  const imageUrl = ((_a = property.images[0]) == null ? void 0 : _a.getDirectURL()) ?? "/assets/images/placeholder.svg";
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
      "aria-label": `Voir ${property.title}`,
      "data-ocid": "property-card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-52 overflow-hidden bg-muted", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: imageUrl,
              alt: property.title,
              className: "w-full h-full object-cover group-hover:scale-105 transition-smooth"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 left-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary text-primary-foreground text-xs font-semibold", children: PROPERTY_TYPE_LABELS[property.propertyType] ?? property.propertyType }) }),
          property.featured && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 right-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs font-semibold", children: "En vedette" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground text-lg mb-1 truncate group-hover:text-primary transition-colors duration-200", children: property.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-muted-foreground text-sm mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: property.location })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-sm text-muted-foreground mb-4", children: [
            Number(property.bedrooms) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bed, { className: "w-3.5 h-3.5" }),
              String(property.bedrooms),
              " ch."
            ] }),
            Number(property.bathrooms) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bath, { className: "w-3.5 h-3.5" }),
              String(property.bathrooms),
              " sdb."
            ] }),
            Number(property.areaSqm) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Square, { className: "w-3.5 h-3.5" }),
              String(property.areaSqm),
              " m²"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary font-bold text-lg", children: formatFCFA(property.price) })
        ] })
      ]
    }
  );
}
function QuoteForm({
  property,
  onSuccess
}) {
  const { mutate, isPending, isSuccess, isError } = useSubmitQuote();
  const [form, setForm] = reactExports.useState({
    customerName: "",
    serviceType: "Immobilier",
    email: "",
    phone: "",
    requirements: `Intéressé(e) par : ${property.title}`,
    budgetRange: ""
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(form, { onSuccess });
  };
  if (isSuccess) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4 py-6 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-12 h-12 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-display font-bold text-foreground", children: "Demande envoyée !" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Notre équipe vous contactera dans les 24h pour discuter de votre projet immobilier." })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      onSubmit: handleSubmit,
      className: "flex flex-col gap-4",
      "data-ocid": "quote-form",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          InputField,
          {
            label: "Nom complet",
            required: true,
            value: form.customerName,
            onChange: (e) => setForm((f) => ({ ...f, customerName: e.target.value })),
            placeholder: "Votre nom",
            "data-ocid": "quote-name"
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
            "data-ocid": "quote-email"
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
            "data-ocid": "quote-phone"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          InputField,
          {
            label: "Budget",
            value: form.budgetRange,
            onChange: (e) => setForm((f) => ({ ...f, budgetRange: e.target.value })),
            placeholder: "Ex: 50 000 000 – 100 000 000 FCFA",
            "data-ocid": "quote-budget"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          TextareaField,
          {
            label: "Détails de votre demande",
            required: true,
            value: form.requirements,
            onChange: (e) => setForm((f) => ({ ...f, requirements: e.target.value })),
            rows: 3,
            "data-ocid": "quote-requirements"
          }
        ),
        isError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive text-center", role: "alert", children: "Une erreur s'est produite. Veuillez réessayer." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            className: "w-full bg-primary text-primary-foreground hover:bg-primary/90",
            disabled: isPending,
            "data-ocid": "quote-submit",
            children: isPending ? "Envoi en cours..." : "Envoyer la demande"
          }
        )
      ]
    }
  );
}
function ImmobilierPage() {
  const [filter, setFilter] = reactExports.useState({ propertyType: "", minPrice: "", maxPrice: "" });
  const backendFilter = {
    ...filter.propertyType ? { propertyType: filter.propertyType } : {},
    ...filter.minPrice ? { minPrice: BigInt(filter.minPrice) } : {},
    ...filter.maxPrice ? { maxPrice: BigInt(filter.maxPrice) } : {}
  };
  const { data: properties, isLoading } = useProperties(backendFilter);
  const [selectedProperty, setSelectedProperty] = reactExports.useState(
    null
  );
  const [showQuoteModal, setShowQuoteModal] = reactExports.useState(false);
  const hasFilter = !!filter.propertyType || !!filter.minPrice || !!filter.maxPrice;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-primary py-16 px-4 text-primary-foreground relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-10 pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-80 h-80 rounded-full bg-primary-foreground translate-x-1/3 -translate-y-1/3" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-8 h-8" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold uppercase tracking-widest opacity-80", children: "Services" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-5xl font-display font-bold mb-4", children: "Immobilier" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg opacity-90 max-w-xl", children: "Découvrez notre catalogue de biens immobiliers à Dakar et dans les environs." })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b border-border py-5 px-4 sticky top-0 z-30 shadow-corporate", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 items-end", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-[160px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        SelectField,
        {
          label: "Type de bien",
          options: [
            { value: "", label: "Tous les types" },
            { value: "apartment", label: "Appartement" },
            { value: "house", label: "Maison" },
            { value: "land", label: "Terrain" },
            { value: "office", label: "Bureau" }
          ],
          value: filter.propertyType,
          onChange: (e) => setFilter((f) => ({ ...f, propertyType: e.target.value })),
          "data-ocid": "filter-type"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-[140px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        InputField,
        {
          label: "Prix min (FCFA)",
          type: "number",
          value: filter.minPrice,
          onChange: (e) => setFilter((f) => ({ ...f, minPrice: e.target.value })),
          placeholder: "0",
          "data-ocid": "filter-min-price"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-[140px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        InputField,
        {
          label: "Prix max (FCFA)",
          type: "number",
          value: filter.maxPrice,
          onChange: (e) => setFilter((f) => ({ ...f, maxPrice: e.target.value })),
          placeholder: "Illimité",
          "data-ocid": "filter-max-price"
        }
      ) }),
      hasFilter && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "ghost",
          size: "sm",
          onClick: () => setFilter({ propertyType: "", minPrice: "", maxPrice: "" }),
          className: "self-end flex items-center gap-1 text-muted-foreground",
          "data-ocid": "filter-reset",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" }),
            " Réinitialiser"
          ]
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-12 px-4 min-h-[400px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: ["s1", "s2", "s3", "s4", "s5", "s6"].map((sk) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-xl overflow-hidden border border-border",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-52 w-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex flex-col gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-3/4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" })
          ] })
        ]
      },
      sk
    )) }) : !(properties == null ? void 0 : properties.length) ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center gap-4 py-20 text-center",
        "data-ocid": "empty-state-properties",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-16 h-16 text-muted-foreground/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-display font-semibold text-foreground", children: "Aucune propriété trouvée pour ces critères" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-sm", children: "Essayez d'ajuster les filtres ou revenez bientôt pour de nouveaux biens." }),
          hasFilter && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: () => setFilter({ propertyType: "", minPrice: "", maxPrice: "" }),
              "data-ocid": "empty-reset-filters",
              children: "Effacer les filtres"
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: properties.map((property) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      PropertyCard,
      {
        property,
        onClick: () => {
          setSelectedProperty(property);
          setShowQuoteModal(false);
        }
      },
      String(property.id)
    )) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        isOpen: !!selectedProperty && !showQuoteModal,
        onClose: () => setSelectedProperty(null),
        title: selectedProperty == null ? void 0 : selectedProperty.title,
        size: "xl",
        children: selectedProperty && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-5", children: [
          selectedProperty.images[0] && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg overflow-hidden h-56 bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: selectedProperty.images[0].getDirectURL(),
              alt: selectedProperty.title,
              className: "w-full h-full object-cover"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/10 text-primary border-primary/20", children: PROPERTY_TYPE_LABELS[selectedProperty.propertyType] ?? selectedProperty.propertyType }),
            selectedProperty.featured && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: "En vedette" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
            Number(selectedProperty.bedrooms) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/50 rounded-lg p-3 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bed, { className: "w-4 h-4 mx-auto mb-1 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-foreground", children: String(selectedProperty.bedrooms) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Chambres" })
            ] }),
            Number(selectedProperty.bathrooms) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/50 rounded-lg p-3 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bath, { className: "w-4 h-4 mx-auto mb-1 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-foreground", children: String(selectedProperty.bathrooms) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Salles de bain" })
            ] }),
            Number(selectedProperty.areaSqm) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/50 rounded-lg p-3 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Square, { className: "w-4 h-4 mx-auto mb-1 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-foreground", children: String(selectedProperty.areaSqm) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "m²" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/50 rounded-lg p-3 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 mx-auto mb-1 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-foreground text-xs truncate", children: selectedProperty.location }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Localisation" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed text-sm", children: selectedProperty.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-2 border-t border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-primary font-display", children: formatFCFA(selectedProperty.price) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: () => setShowQuoteModal(true),
                className: "bg-primary text-primary-foreground hover:bg-primary/90",
                "data-ocid": "request-quote-btn",
                children: "Demander un devis"
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        isOpen: showQuoteModal && !!selectedProperty,
        onClose: () => setShowQuoteModal(false),
        title: "Demande de devis",
        size: "md",
        children: selectedProperty && /* @__PURE__ */ jsxRuntimeExports.jsx(
          QuoteForm,
          {
            property: selectedProperty,
            onSuccess: () => {
              setShowQuoteModal(false);
              setSelectedProperty(null);
            }
          }
        )
      }
    )
  ] });
}
export {
  ImmobilierPage as default
};
