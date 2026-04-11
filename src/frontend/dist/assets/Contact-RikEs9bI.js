import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, m as motion, P as Phone, B as Button } from "./index-CtugyttR.js";
import { I as InputField } from "./InputField-FRvVB7Ym.js";
import { S as SelectField } from "./SelectField-BS7dmjDh.js";
import { T as TextareaField } from "./TextareaField-j00ddAAZ.js";
import { i as useSubmitMessage, c as useSubmitQuote } from "./useBackend-DJ1gFwav.js";
import { M as MapPin } from "./map-pin-D1vzAJf-.js";
import { M as Mail } from "./mail-DAN-GL6r.js";
import { M as MessageSquare } from "./message-square-D-yhUmMR.js";
import { C as CircleCheck } from "./circle-check-DmsAxiSo.js";
import { C as CircleX } from "./circle-x-Btg84koK.js";
import "./backend-gUdCIi-2.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
];
const ExternalLink = createLucideIcon("external-link", __iconNode);
const WHATSAPP_URL = "https://wa.me/221771234567";
const TEL_HREF = "tel:+22133XXXXXXX";
const MAPS_URL = "https://maps.google.com/?q=Zac+Mbao+Dakar+Senegal";
const SERVICE_OPTIONS = [
  { value: "Immobilier", label: "Immobilier" },
  { value: "Transport", label: "Transport & Logistique" },
  { value: "Agrobusiness", label: "Agrobusiness" },
  { value: "Formation", label: "Formation" }
];
function validateContact(f) {
  const e = {};
  if (!f.customerName.trim()) e.customerName = "Le nom complet est requis.";
  if (!f.email.trim()) e.email = "L'adresse email est requise.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email))
    e.email = "Veuillez entrer une adresse email valide.";
  if (!f.message.trim()) e.message = "Le message est requis.";
  return e;
}
function validateQuote(f) {
  const e = {};
  if (!f.customerName.trim()) e.customerName = "Le nom complet est requis.";
  if (!f.email.trim()) e.email = "L'adresse email est requise.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email))
    e.email = "Veuillez entrer une adresse email valide.";
  if (!f.phone.trim()) e.phone = "Le numéro de téléphone est requis.";
  return e;
}
function FeedbackBanner({ ok, msg }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: -6 },
      animate: { opacity: 1, y: 0 },
      className: `flex items-start gap-3 rounded-lg border p-4 ${ok ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-destructive/30 bg-destructive/5 text-destructive"}`,
      role: "alert",
      children: [
        ok ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "mt-0.5 h-5 w-5 shrink-0 text-emerald-600" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "mt-0.5 h-5 w-5 shrink-0 text-destructive" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: msg })
      ]
    }
  );
}
function ContactForm() {
  const [form, setForm] = reactExports.useState({
    customerName: "",
    email: "",
    phone: "",
    message: ""
  });
  const [errors, setErrors] = reactExports.useState({});
  const [feedback, setFeedback] = reactExports.useState(null);
  const { mutateAsync, isPending } = useSubmitMessage();
  function set(field, val) {
    setForm((p) => ({ ...p, [field]: val }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: "" }));
  }
  function blur(field) {
    const v = validateContact(form);
    if (v[field]) setErrors((p) => ({ ...p, [field]: v[field] }));
  }
  async function submit(e) {
    e.preventDefault();
    const v = validateContact(form);
    if (Object.keys(v).length) {
      setErrors(v);
      return;
    }
    const input = {
      customerName: form.customerName,
      email: form.email,
      phone: form.phone,
      message: form.message
    };
    try {
      await mutateAsync(input);
      setFeedback("success");
      setForm({ customerName: "", email: "", phone: "", message: "" });
      setErrors({});
    } catch {
      setFeedback("error");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "flex flex-col gap-5", noValidate: true, children: [
    feedback && /* @__PURE__ */ jsxRuntimeExports.jsx(
      FeedbackBanner,
      {
        ok: feedback === "success",
        msg: feedback === "success" ? "Votre message a bien été envoyé ! Nous vous répondrons dans les plus brefs délais." : "Une erreur est survenue. Veuillez réessayer."
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-5 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        InputField,
        {
          label: "Nom complet",
          id: "c-name",
          value: form.customerName,
          onChange: (e) => set("customerName", e.target.value),
          onBlur: () => blur("customerName"),
          error: errors.customerName,
          required: true,
          placeholder: "Amadou Diallo",
          "data-ocid": "contact-form-nom"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        InputField,
        {
          label: "Adresse email",
          id: "c-email",
          type: "email",
          value: form.email,
          onChange: (e) => set("email", e.target.value),
          onBlur: () => blur("email"),
          error: errors.email,
          required: true,
          placeholder: "amadou@exemple.sn",
          "data-ocid": "contact-form-email"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      InputField,
      {
        label: "Téléphone",
        id: "c-phone",
        type: "tel",
        value: form.phone,
        onChange: (e) => set("phone", e.target.value),
        placeholder: "+221 77 000 00 00",
        "data-ocid": "contact-form-tel"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      TextareaField,
      {
        label: "Message",
        id: "c-message",
        value: form.message,
        onChange: (e) => set("message", e.target.value),
        onBlur: () => blur("message"),
        error: errors.message,
        required: true,
        placeholder: "Comment pouvons-nous vous aider ?",
        rows: 5,
        "data-ocid": "contact-form-message"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        type: "submit",
        disabled: isPending,
        className: "w-full sm:w-auto font-semibold bg-primary text-primary-foreground hover:bg-primary/90",
        "data-ocid": "contact-form-submit",
        children: isPending ? "Envoi en cours…" : "Envoyer le message"
      }
    )
  ] });
}
function QuoteForm() {
  const [form, setForm] = reactExports.useState({
    customerName: "",
    email: "",
    phone: "",
    serviceType: "",
    requirements: "",
    budgetRange: ""
  });
  const [errors, setErrors] = reactExports.useState({});
  const [feedback, setFeedback] = reactExports.useState(null);
  const { mutateAsync, isPending } = useSubmitQuote();
  function set(field, val) {
    setForm((p) => ({ ...p, [field]: val }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: "" }));
  }
  function blur(field) {
    const v = validateQuote(form);
    if (v[field]) setErrors((p) => ({ ...p, [field]: v[field] }));
  }
  async function submit(e) {
    e.preventDefault();
    const v = validateQuote(form);
    if (Object.keys(v).length) {
      setErrors(v);
      return;
    }
    const input = {
      customerName: form.customerName,
      email: form.email,
      phone: form.phone,
      serviceType: form.serviceType || "Non précisé",
      requirements: form.requirements,
      budgetRange: form.budgetRange
    };
    try {
      await mutateAsync(input);
      setFeedback("success");
      setForm({
        customerName: "",
        email: "",
        phone: "",
        serviceType: "",
        requirements: "",
        budgetRange: ""
      });
      setErrors({});
    } catch {
      setFeedback("error");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "flex flex-col gap-5", noValidate: true, children: [
    feedback && /* @__PURE__ */ jsxRuntimeExports.jsx(
      FeedbackBanner,
      {
        ok: feedback === "success",
        msg: feedback === "success" ? "Votre demande de devis a bien été envoyée ! Nous vous répondrons dans les plus brefs délais." : "Une erreur est survenue. Veuillez réessayer."
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-5 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        InputField,
        {
          label: "Nom complet",
          id: "q-name",
          value: form.customerName,
          onChange: (e) => set("customerName", e.target.value),
          onBlur: () => blur("customerName"),
          error: errors.customerName,
          required: true,
          placeholder: "Amadou Diallo",
          "data-ocid": "devis-form-nom"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        InputField,
        {
          label: "Adresse email",
          id: "q-email",
          type: "email",
          value: form.email,
          onChange: (e) => set("email", e.target.value),
          onBlur: () => blur("email"),
          error: errors.email,
          required: true,
          placeholder: "amadou@exemple.sn",
          "data-ocid": "devis-form-email"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-5 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        InputField,
        {
          label: "Téléphone",
          id: "q-phone",
          type: "tel",
          value: form.phone,
          onChange: (e) => set("phone", e.target.value),
          onBlur: () => blur("phone"),
          error: errors.phone,
          required: true,
          placeholder: "+221 77 000 00 00",
          "data-ocid": "devis-form-tel"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SelectField,
        {
          label: "Service concerné",
          id: "q-service",
          value: form.serviceType,
          onChange: (e) => set("serviceType", e.target.value),
          options: SERVICE_OPTIONS,
          placeholder: "Choisir un service",
          "data-ocid": "devis-form-service"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      TextareaField,
      {
        label: "Description de vos besoins",
        id: "q-requirements",
        value: form.requirements,
        onChange: (e) => set("requirements", e.target.value),
        placeholder: "Décrivez votre projet ou vos besoins en détail…",
        rows: 4,
        "data-ocid": "devis-form-besoins"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      InputField,
      {
        label: "Budget estimé",
        id: "q-budget",
        value: form.budgetRange,
        onChange: (e) => set("budgetRange", e.target.value),
        placeholder: "Ex : 500 000 – 1 000 000 FCFA",
        "data-ocid": "devis-form-budget"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        type: "submit",
        disabled: isPending,
        className: "w-full sm:w-auto font-semibold bg-secondary text-secondary-foreground hover:bg-secondary/90",
        "data-ocid": "devis-form-submit",
        children: isPending ? "Envoi en cours…" : "Envoyer la demande de devis"
      }
    )
  ] });
}
function ContactPage() {
  const [activeTab, setActiveTab] = reactExports.useState("contact");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden border-b border-border bg-card py-20 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "pointer-events-none absolute inset-0 opacity-[0.04]",
          style: {
            backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 39px,currentColor 39px,currentColor 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,currentColor 39px,currentColor 40px)"
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.55 },
          className: "relative mx-auto max-w-3xl px-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-4 inline-block rounded-full bg-primary px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground", children: "Contactez-nous" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl font-bold leading-tight text-foreground md:text-5xl", children: "Nous Sommes à Votre Écoute" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-lg text-muted-foreground", children: "Notre équipe est disponible pour répondre à toutes vos questions et vous accompagner dans vos projets." })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-14", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-6xl px-4 md:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-4", children: [
      {
        icon: MapPin,
        title: "Adresse",
        value: "Zac Mbao, Rond Point Sipres, Dakar, Sénégal",
        href: void 0,
        color: "bg-emerald-50 text-emerald-700",
        delay: 0
      },
      {
        icon: Phone,
        title: "Téléphone",
        value: "+221 33 XXX XX XX",
        href: TEL_HREF,
        color: "bg-blue-50 text-blue-700",
        delay: 0.05
      },
      {
        icon: Mail,
        title: "Email",
        value: "contact@sofitrans.sn",
        href: "mailto:contact@sofitrans.sn",
        color: "bg-emerald-50 text-emerald-700",
        delay: 0.1
      },
      {
        icon: MessageSquare,
        title: "WhatsApp",
        value: "Discutez sur WhatsApp",
        href: WHATSAPP_URL,
        color: "text-white",
        isWhatsApp: true,
        delay: 0.15
      }
    ].map((card) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { delay: card.delay },
        className: "flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 text-center shadow-corporate transition-smooth hover-lift",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `flex h-14 w-14 items-center justify-center rounded-full ${card.isWhatsApp ? "" : card.color}`,
              style: card.isWhatsApp ? { backgroundColor: "#25D366" } : {},
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(card.icon, { className: "h-7 w-7" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground", children: card.title }),
          card.href ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: card.href,
              target: card.isWhatsApp ? "_blank" : void 0,
              rel: card.isWhatsApp ? "noopener noreferrer" : void 0,
              className: "text-sm font-medium text-foreground transition-colors hover:text-primary",
              "data-ocid": card.isWhatsApp ? "contact-whatsapp-btn" : void 0,
              children: card.value
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: card.value })
        ]
      },
      card.title
    )) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-6xl px-4 md:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-10 lg:grid-cols-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, x: -20 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          className: "lg:col-span-2",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-24 flex flex-col gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground", children: "Notre Localisation" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-2xl border border-border shadow-corporate", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "relative h-72 lg:h-96",
                style: { backgroundColor: "#e8f5e9" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "absolute inset-0 opacity-25",
                      style: {
                        backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 31px,#81c784 31px,#81c784 32px),repeating-linear-gradient(90deg,transparent,transparent 31px,#81c784 31px,#81c784 32px)"
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "absolute left-0 right-0 top-1/2 h-3 -translate-y-1/2 opacity-40",
                      style: { backgroundColor: "#a5d6a7" }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "absolute bottom-0 left-1/2 top-0 w-3 -translate-x-1/2 opacity-40",
                      style: { backgroundColor: "#a5d6a7" }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "flex h-12 w-12 items-center justify-center rounded-full shadow-elevated",
                        style: { backgroundColor: "#2e7d32" },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-6 w-6 text-white" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "h-2.5 w-0.5",
                        style: { backgroundColor: "#2e7d32" }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "h-1 w-3 rounded-full opacity-30",
                        style: { backgroundColor: "#2e7d32" }
                      }
                    )
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-card px-3 py-1.5 text-sm font-semibold text-foreground shadow-corporate", children: "Zac Mbao, Dakar, Sénégal" })
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: MAPS_URL,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:underline",
                "data-ocid": "contact-maps-link",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-4 w-4" }),
                  "Voir sur Google Maps"
                ]
              }
            )
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: 20 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          className: "lg:col-span-3",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "mb-6 flex rounded-xl border border-border bg-card p-1 shadow-corporate",
                role: "tablist",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      role: "tab",
                      "aria-selected": activeTab === "contact",
                      onClick: () => setActiveTab("contact"),
                      type: "button",
                      className: `flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition-smooth ${activeTab === "contact" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
                      "data-ocid": "contact-tab-contact",
                      children: "Envoyer un message"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      role: "tab",
                      "aria-selected": activeTab === "devis",
                      type: "button",
                      onClick: () => setActiveTab("devis"),
                      className: `flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition-smooth ${activeTab === "devis" ? "bg-secondary text-secondary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
                      "data-ocid": "contact-tab-devis",
                      children: "Demande de Devis"
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-border bg-card p-6 shadow-corporate md:p-8", children: activeTab === "contact" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground", children: "Envoyez-nous un message" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Nous vous répondrons dans les 24 heures ouvrables." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ContactForm, {})
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground", children: "Demande de Devis" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Décrivez votre projet et recevez une offre personnalisée." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(QuoteForm, {})
            ] }) })
          ]
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-14 text-white",
        style: {
          background: "linear-gradient(135deg, #1b5e20 0%, #1565c0 100%)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-4xl px-4 md:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            className: "flex flex-col items-center gap-6 text-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold md:text-4xl", children: "Besoin d'une réponse immédiate ?" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-xl text-base opacity-90", children: "Notre équipe est disponible pour vous accompagner. Appelez-nous directement ou contactez-nous sur WhatsApp." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4 sm:flex-row", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "a",
                  {
                    href: TEL_HREF,
                    className: "inline-flex items-center gap-2.5 rounded-xl border-2 border-white px-8 py-3.5 text-sm font-bold transition-smooth hover:bg-white hover:text-blue-900 active:scale-95",
                    "data-ocid": "cta-appel-btn",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-5 w-5" }),
                      "Appel direct"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "a",
                  {
                    href: WHATSAPP_URL,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "inline-flex items-center gap-2.5 rounded-xl px-8 py-3.5 text-sm font-bold transition-smooth active:scale-95",
                    style: { backgroundColor: "#25D366" },
                    "data-ocid": "cta-whatsapp-btn",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-5 w-5" }),
                      "WhatsApp"
                    ]
                  }
                )
              ] })
            ]
          }
        ) })
      }
    )
  ] });
}
export {
  ContactPage as default
};
