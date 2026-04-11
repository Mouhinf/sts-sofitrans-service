import { c as createLucideIcon, j as jsxRuntimeExports, m as motion, L as Link, r as reactExports, B as Button } from "./index-CtugyttR.js";
import { I as InputField } from "./InputField-FRvVB7Ym.js";
import { T as TextareaField } from "./TextareaField-j00ddAAZ.js";
import { c as useSubmitQuote } from "./useBackend-DJ1gFwav.js";
import { L as Leaf } from "./leaf-CKdhwAN6.js";
import { T as TrendingUp } from "./trending-up-BUuS6Y-g.js";
import { A as ArrowRight } from "./arrow-right-CVbvl57I.js";
import { C as CircleCheck } from "./circle-check-DmsAxiSo.js";
import "./backend-gUdCIi-2.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m15 11-1 9", key: "5wnq3a" }],
  ["path", { d: "m19 11-4-7", key: "cnml18" }],
  ["path", { d: "M2 11h20", key: "3eubbj" }],
  ["path", { d: "m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4", key: "yiazzp" }],
  ["path", { d: "M4.5 15.5h15", key: "13mye1" }],
  ["path", { d: "m5 11 4-7", key: "116ra9" }],
  ["path", { d: "m9 11 1 9", key: "1ojof7" }]
];
const ShoppingBasket = createLucideIcon("shopping-basket", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M7 20h10", key: "e6iznv" }],
  ["path", { d: "M10 20c5.5-2.5.8-6.4 3-10", key: "161w41" }],
  [
    "path",
    {
      d: "M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z",
      key: "9gtqwd"
    }
  ],
  [
    "path",
    {
      d: "M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z",
      key: "bkxnd2"
    }
  ]
];
const Sprout = createLucideIcon("sprout", __iconNode);
const offerings = [
  {
    icon: Sprout,
    title: "Conseil en Agriculture",
    description: "Accompagnement technique et stratégique pour le développement de vos projets agricoles. Analyse de sol, choix des cultures, optimisation des rendements pour le contexte sénégalais et ouest-africain.",
    details: [
      "Études de faisabilité agricole",
      "Conseil en cultures tropicales",
      "Optimisation des intrants",
      "Formation des exploitants"
    ]
  },
  {
    icon: TrendingUp,
    title: "Investissement Agricole",
    description: "Opportunités d'investissement dans le secteur agricole sénégalais. Accompagnement pour les investisseurs locaux et internationaux souhaitant profiter du potentiel de l'agriculture africaine.",
    details: [
      "Identification d'opportunités",
      "Montage de business plans",
      "Accès au foncier agricole",
      "Partenariats stratégiques"
    ]
  },
  {
    icon: ShoppingBasket,
    title: "Commercialisation",
    description: "Mise en marché de vos productions agricoles au niveau local et à l'export. Accès aux marchés régionaux et internationaux via notre réseau de partenaires commerciaux.",
    details: [
      "Accès aux marchés locaux",
      "Export vers l'Europe et la diaspora",
      "Conditionnement et logistique",
      "Certification qualité"
    ]
  }
];
const stats = [
  { value: "14M", label: "Hectares de terres arables au Sénégal" },
  { value: "30%", label: "Du PIB sénégalais provient de l'agriculture" },
  { value: "60%", label: "De la population active dans le secteur" },
  { value: "2035", label: "Vision Sénégal cible l'agro-industrie" }
];
function InquiryForm() {
  const { mutate, isPending, isSuccess, isError } = useSubmitQuote();
  const [form, setForm] = reactExports.useState({
    customerName: "",
    serviceType: "Agrobusiness",
    email: "",
    phone: "",
    requirements: "",
    budgetRange: ""
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(form);
  };
  if (isSuccess) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4 py-10 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-14 h-14 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-display font-bold text-foreground", children: "Message envoyé !" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-md", children: "Merci pour votre intérêt. Notre équipe agrobusiness vous contactera sous 48h pour discuter de vos projets." })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      onSubmit: handleSubmit,
      className: "flex flex-col gap-4",
      "data-ocid": "agro-inquiry-form",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            InputField,
            {
              label: "Nom complet",
              required: true,
              value: form.customerName,
              onChange: (e) => setForm((f) => ({ ...f, customerName: e.target.value })),
              placeholder: "Votre nom",
              "data-ocid": "agro-name"
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
              "data-ocid": "agro-phone"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          InputField,
          {
            label: "Email",
            type: "email",
            required: true,
            value: form.email,
            onChange: (e) => setForm((f) => ({ ...f, email: e.target.value })),
            placeholder: "votre@email.com",
            "data-ocid": "agro-email"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          InputField,
          {
            label: "Budget estimé",
            value: form.budgetRange,
            onChange: (e) => setForm((f) => ({ ...f, budgetRange: e.target.value })),
            placeholder: "Ex: 5 000 000 – 20 000 000 FCFA",
            "data-ocid": "agro-budget"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          TextareaField,
          {
            label: "Décrivez votre projet",
            required: true,
            value: form.requirements,
            onChange: (e) => setForm((f) => ({ ...f, requirements: e.target.value })),
            placeholder: "Parlez-nous de votre projet, vos besoins et vos attentes...",
            rows: 4,
            "data-ocid": "agro-requirements"
          }
        ),
        isError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive text-center", role: "alert", children: "Une erreur s'est produite. Veuillez réessayer." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            className: "w-full bg-primary text-primary-foreground hover:bg-primary/90",
            disabled: isPending,
            "data-ocid": "agro-submit",
            children: isPending ? "Envoi en cours..." : "Soumettre ma demande"
          }
        )
      ]
    }
  );
}
function AgrobusinessPage() {
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
              /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "w-8 h-8" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold uppercase tracking-widest opacity-80", children: "Services" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-5xl font-display font-bold mb-4", children: "Agrobusiness" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg opacity-90 max-w-2xl leading-relaxed", children: "L'Afrique de l'Ouest dispose d'un potentiel agricole immense. Nous vous accompagnons pour en tirer le meilleur parti." })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/40 py-12 px-4 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-6 text-center", children: stats.map((stat, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { delay: i * 0.1 },
        className: "flex flex-col gap-1",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-display font-bold text-primary", children: stat.value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-tight", children: stat.label })
        ]
      },
      stat.label
    )) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-16 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "text-center mb-12",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-display font-bold text-foreground mb-4", children: "Nos Domaines d'Expertise" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-xl mx-auto", children: "Une approche complète pour transformer vos projets agricoles en succès durables." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-8", children: offerings.map((offering, index) => {
        const Icon = offering.icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, x: index % 2 === 0 ? -24 : 24 },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: true },
            transition: { duration: 0.5, delay: index * 0.1 },
            className: "bg-card border border-border rounded-2xl p-6 md:p-8 shadow-corporate",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 bg-primary/10 rounded-xl h-fit shrink-0 self-start", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-8 h-8 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-display font-bold text-foreground mb-3", children: offering.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-5", children: offering.description }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5", children: offering.details.map((detail) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "li",
                  {
                    className: "flex items-center gap-2 text-sm text-foreground",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-primary shrink-0" }),
                      detail
                    ]
                  },
                  detail
                )) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Link,
                  {
                    to: "/contact",
                    className: "inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all duration-200",
                    "data-ocid": `agro-cta-${index}`,
                    children: [
                      "Nous contacter ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
                    ]
                  }
                )
              ] })
            ] })
          },
          offering.title
        );
      }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/40 py-16 px-4 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "text-center mb-10",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-display font-bold text-foreground mb-3", children: "Parlez-nous de votre projet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Remplissez ce formulaire et notre expert agrobusiness vous rappellera sous 48h." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-2xl p-8 shadow-corporate", children: /* @__PURE__ */ jsxRuntimeExports.jsx(InquiryForm, {}) })
    ] }) })
  ] });
}
export {
  AgrobusinessPage as default
};
