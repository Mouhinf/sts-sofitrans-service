import { j as jsxRuntimeExports, m as motion, L as Link } from "./index-CtugyttR.js";
import { B as Building2 } from "./building-2-CWrEx0pq.js";
import { T as Truck } from "./truck-BuWQRKbv.js";
import { L as Leaf } from "./leaf-CKdhwAN6.js";
import { G as GraduationCap } from "./graduation-cap-D0lJeyMd.js";
import { A as ArrowRight } from "./arrow-right-CVbvl57I.js";
const services = [
  {
    icon: Building2,
    title: "Immobilier",
    description: "Achat, vente et location de biens immobiliers à Dakar et environs. Un catalogue complet d'appartements, maisons, terrains et bureaux.",
    href: "/services/immobilier",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    badge: "Catalogue disponible"
  },
  {
    icon: Truck,
    title: "Transport",
    description: "Location et affrètement de véhicules professionnels. Voitures, bus, camions et minibus pour tous vos besoins de mobilité.",
    href: "/services/transport",
    iconBg: "bg-secondary/10",
    iconColor: "text-secondary",
    badge: "Réservation en ligne"
  },
  {
    icon: Leaf,
    title: "Agrobusiness",
    description: "Conseil, investissement et développement en agrobusiness. Opportunités agricoles durables au Sénégal et en Afrique de l'Ouest.",
    href: "/services/agrobusiness",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    badge: "Conseil & Investissement"
  },
  {
    icon: GraduationCap,
    title: "Formation",
    description: "Formations professionnelles certifiées en logistique et gestion. Développez vos compétences avec nos experts du secteur.",
    href: "/services/formation",
    iconBg: "bg-secondary/10",
    iconColor: "text-secondary",
    badge: "Certifié"
  }
];
function ServicesPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-primary py-20 px-4 text-primary-foreground relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 opacity-10 pointer-events-none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-96 h-96 rounded-full bg-primary-foreground translate-x-1/2 -translate-y-1/2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 w-64 h-64 rounded-full bg-primary-foreground -translate-x-1/2 translate-y-1/2" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold uppercase tracking-widest mb-3 opacity-80", children: "STS SOFITRANS SERVICE" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-6xl font-display font-bold mb-5 leading-tight", children: "Nos Services" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg md:text-xl opacity-90 max-w-2xl leading-relaxed", children: "Une plateforme multi-service complète pour répondre à tous vos besoins : immobilier, transport, agrobusiness et formation professionnelle." })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-20 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: services.map((service, index) => {
      const Icon = service.icon;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 32 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5, delay: index * 0.1 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: service.href,
              className: "group block bg-card border border-border rounded-2xl p-8 shadow-corporate hover-lift hover:border-primary/30 transition-smooth h-full",
              "data-ocid": `service-card-${service.title.toLowerCase()}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `p-4 rounded-xl ${service.iconBg} shrink-0 group-hover:scale-110 transition-smooth`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-8 h-8 ${service.iconColor}` })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3 flex-wrap", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-display font-bold text-foreground group-hover:text-primary transition-colors duration-200", children: service.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold bg-muted text-muted-foreground px-2.5 py-1 rounded-full", children: service.badge })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-5", children: service.description }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all duration-200", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Découvrir" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
                  ] })
                ] })
              ] })
            }
          )
        },
        service.title
      );
    }) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/40 py-16 px-4 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-3xl mx-auto text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-display font-bold text-foreground mb-4", children: "Besoin d'un service personnalisé ?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8 text-lg", children: "Notre équipe est disponible pour répondre à toutes vos demandes spécifiques." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/contact",
                className: "inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-xl font-semibold hover:bg-primary/90 transition-smooth shadow-corporate",
                "data-ocid": "services-contact-cta",
                children: [
                  "Nous contacter",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: "https://wa.me/221770000000",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "inline-flex items-center justify-center gap-2 bg-card border border-border text-foreground px-8 py-3.5 rounded-xl font-semibold hover:border-primary/40 transition-smooth shadow-corporate",
                "data-ocid": "services-whatsapp-cta",
                children: "WhatsApp"
              }
            )
          ] })
        ]
      }
    ) }) })
  ] });
}
export {
  ServicesPage as default
};
