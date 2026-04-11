import { c as createLucideIcon, j as jsxRuntimeExports, m as motion, B as Button, L as Link, M as MessageCircle, P as Phone, r as reactExports } from "./index-CtugyttR.js";
import { B as Badge } from "./badge-DvHdE_Hx.js";
import { C as Card, a as CardContent } from "./card-BdjdAgZz.js";
import { S as Skeleton } from "./skeleton-lD6-NYnm.js";
import { u as useProperties, a as useVehicles, b as useSubscribeNewsletter } from "./useBackend-DJ1gFwav.js";
import { A as ArrowRight } from "./arrow-right-CVbvl57I.js";
import { B as Building2 } from "./building-2-CWrEx0pq.js";
import { T as Truck } from "./truck-BuWQRKbv.js";
import { L as Leaf } from "./leaf-CKdhwAN6.js";
import { G as GraduationCap } from "./graduation-cap-D0lJeyMd.js";
import { C as ChevronRight } from "./chevron-right-DwShqWtx.js";
import { S as Star } from "./star-D-pngBH9.js";
import { U as Users } from "./users-o0ERafMs.js";
import { M as MapPin } from "./map-pin-D1vzAJf-.js";
import { B as Bath } from "./bath-DK9JM3H4.js";
import { C as CircleCheck } from "./circle-check-DmsAxiSo.js";
import "./backend-gUdCIi-2.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8", key: "1k78r4" }],
  ["path", { d: "M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4", key: "fb3tl2" }],
  ["path", { d: "M12 4v6", key: "1dcgq2" }],
  ["path", { d: "M2 18h20", key: "ajqnye" }]
];
const BedDouble = createLucideIcon("bed-double", __iconNode$1);
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
      d: "M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2",
      key: "5owen"
    }
  ],
  ["circle", { cx: "7", cy: "17", r: "2", key: "u2ysq9" }],
  ["path", { d: "M9 17h6", key: "r8uit2" }],
  ["circle", { cx: "17", cy: "17", r: "2", key: "axvx0g" }]
];
const Car = createLucideIcon("car", __iconNode);
function formatFCFA(amount) {
  return `${new Intl.NumberFormat("fr-FR").format(Number(amount))} FCFA`;
}
const SERVICES = [
  {
    icon: Building2,
    title: "Immobilier",
    description: "Achat, vente et location de biens immobiliers de prestige au Sénégal.",
    href: "/services/immobilier",
    color: "text-primary",
    bg: "bg-primary/10"
  },
  {
    icon: Truck,
    title: "Transport",
    description: "Solutions de transport professionnel et logistique intégrée.",
    href: "/services/transport",
    color: "text-secondary",
    bg: "bg-secondary/10"
  },
  {
    icon: Leaf,
    title: "Agrobusiness",
    description: "Investissement et conseil en agrobusiness pour une agriculture moderne.",
    href: "/services/agrobusiness",
    color: "text-primary",
    bg: "bg-primary/10"
  },
  {
    icon: GraduationCap,
    title: "Formation",
    description: "Formations professionnelles certifiées pour booster votre carrière.",
    href: "/services/formation",
    color: "text-secondary",
    bg: "bg-secondary/10"
  }
];
const STATS = [
  { value: "15+", label: "Ans d'expérience", icon: Star },
  { value: "500+", label: "Clients satisfaits", icon: Users },
  { value: "50+", label: "Propriétés", icon: Building2 },
  { value: "100+", label: "Véhicules", icon: Car }
];
const TESTIMONIALS = [
  {
    name: "Amadou Diallo",
    company: "Import-Export Dakar",
    text: "STS SOFITRANS a transformé notre chaîne logistique. Service impeccable et équipe très professionnelle.",
    rating: 5
  },
  {
    name: "Fatou Ndiaye",
    company: "Groupe Immobilier Sénégal",
    text: "Un partenaire de confiance pour tous nos projets immobiliers. Réactivité et expertise inégalées.",
    rating: 5
  },
  {
    name: "Cheikh Mbaye",
    company: "Agro Distribution SA",
    text: "Grâce à STS, notre distribution agricole a gagné en efficacité. Je les recommande vivement.",
    rating: 5
  }
];
function PropertyCard({
  property,
  index
}) {
  const hasImage = property.images.length > 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 24 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.4, delay: index * 0.1 },
      className: "bg-card rounded-xl overflow-hidden border border-border shadow-corporate hover-lift group",
      "data-ocid": "property-card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-52 overflow-hidden bg-muted", children: [
          hasImage ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: property.images[0].getDirectURL(),
              alt: property.title,
              className: "w-full h-full object-cover group-hover:scale-105 transition-smooth"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-16 h-16 text-primary/30" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-semibold capitalize", children: property.propertyType })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-lg leading-snug line-clamp-1 mb-1", children: property.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-muted-foreground text-sm mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: property.location })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-sm text-muted-foreground mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BedDouble, { className: "w-4 h-4" }),
              property.bedrooms.toString(),
              " ch."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bath, { className: "w-4 h-4" }),
              property.bathrooms.toString(),
              " sdb."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary font-display font-bold text-xl", children: formatFCFA(property.price) })
        ] })
      ]
    }
  );
}
function VehicleCard({ vehicle, index }) {
  const hasImage = vehicle.images.length > 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 24 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.4, delay: index * 0.1 },
      className: "bg-card rounded-xl overflow-hidden border border-border shadow-corporate hover-lift group",
      "data-ocid": "vehicle-card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-52 overflow-hidden bg-muted", children: [
          hasImage ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: vehicle.images[0].getDirectURL(),
              alt: vehicle.title,
              className: "w-full h-full object-cover group-hover:scale-105 transition-smooth"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center bg-gradient-to-br from-secondary/20 to-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-16 h-16 text-secondary/30" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "absolute top-3 left-3 bg-secondary text-secondary-foreground text-xs font-semibold capitalize", children: vehicle.vehicleType })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-lg leading-snug line-clamp-1 mb-1", children: vehicle.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-4 line-clamp-2", children: vehicle.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-secondary font-display font-bold text-xl", children: [
              formatFCFA(vehicle.pricePerDay),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm font-normal font-body ml-1", children: "/jour" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-muted-foreground text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4" }),
              vehicle.capacity.toString(),
              " pers."
            ] })
          ] })
        ] })
      ]
    }
  );
}
function CardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl overflow-hidden border border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-52 w-full" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-3/4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-1/3" })
    ] })
  ] });
}
function NewsletterSection() {
  const [email, setEmail] = reactExports.useState("");
  const { mutate, isPending, isSuccess, isError } = useSubscribeNewsletter();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) mutate(email.trim());
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/40 py-16 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-2xl mx-auto px-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.5 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl md:text-3xl font-bold text-foreground mb-3", children: "Restez informé" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8", children: "Recevez nos dernières offres immobilières et actualités directement dans votre boîte mail." }),
        isSuccess ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 text-primary font-semibold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Inscription réussie ! Merci de votre confiance." })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "form",
          {
            onSubmit: handleSubmit,
            className: "flex flex-col sm:flex-row gap-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "email",
                  value: email,
                  onChange: (e) => setEmail(e.target.value),
                  placeholder: "Votre adresse email",
                  required: true,
                  className: "flex-1 px-4 py-3 rounded-lg border border-input bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm",
                  "data-ocid": "newsletter-email"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "submit",
                  disabled: isPending,
                  className: "bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3",
                  "data-ocid": "newsletter-submit",
                  children: isPending ? "Inscription..." : "S'inscrire"
                }
              )
            ]
          }
        ),
        isError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive text-sm mt-3", children: "Une erreur s'est produite. Veuillez réessayer." })
      ]
    }
  ) }) });
}
function Home() {
  const { data: properties, isLoading: propsLoading } = useProperties({});
  const { data: vehicles, isLoading: vecsLoading } = useVehicles({});
  const featuredProperties = (properties ?? []).slice(0, 3);
  const featuredVehicles = (vehicles ?? []).slice(0, 3);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative min-h-[90vh] flex items-center overflow-hidden",
        style: {
          background: "linear-gradient(135deg, oklch(0.22 0.1 145) 0%, oklch(0.18 0.12 249) 60%, oklch(0.12 0.08 249) 100%)"
        },
        "data-ocid": "hero-section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 bg-cover bg-center opacity-15 pointer-events-none",
              style: {
                backgroundImage: "url('/assets/generated/hero-logistics.dim_1200x700.jpg')"
              },
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 opacity-20 pointer-events-none",
              style: {
                backgroundImage: "radial-gradient(circle at 15% 80%, oklch(0.55 0.15 145) 0%, transparent 45%), radial-gradient(circle at 85% 20%, oklch(0.55 0.15 249) 0%, transparent 45%)"
              },
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid md:grid-cols-2 gap-12 items-center w-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, x: -40 },
                animate: { opacity: 1, x: 0 },
                transition: { duration: 0.7, ease: "easeOut" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-8", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden shadow-elevated bg-white/10 flex items-center justify-center border border-white/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: "/assets/logo.jpg",
                        alt: "Logo STS SOFITRANS SERVICE",
                        className: "w-full h-full object-contain",
                        onError: (e) => {
                          e.target.style.display = "none";
                        }
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50 text-xs font-semibold uppercase tracking-widest mb-0.5", children: "Dakar, Sénégal" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/80 text-sm font-medium", children: "Votre partenaire de confiance" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4", children: [
                    "STS SOFITRANS",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/85", children: "SERVICE" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl md:text-2xl italic text-white/75 mb-6 font-medium", children: '"Pour Mieux Vous Servir !"' }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/65 text-base md:text-lg leading-relaxed mb-10 max-w-lg", children: "Solutions d'excellence en immobilier, transport professionnel, agrobusiness et formation au Sénégal." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        size: "lg",
                        className: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-elevated font-semibold px-8 w-full sm:w-auto",
                        asChild: true,
                        "data-ocid": "hero-cta-services",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/services", children: [
                          "Découvrir nos services",
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-2 h-5 w-5" })
                        ] })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        size: "lg",
                        variant: "outline",
                        className: "border-2 border-white/40 text-white bg-transparent hover:bg-white/10 px-8 w-full sm:w-auto",
                        asChild: true,
                        "data-ocid": "hero-cta-contact",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", children: "Nous contacter" })
                      }
                    )
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, x: 40 },
                animate: { opacity: 1, x: 0 },
                transition: { duration: 0.7, delay: 0.2 },
                className: "hidden md:grid grid-cols-2 gap-4",
                children: SERVICES.map((svc, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 0.5, delay: 0.3 + i * 0.1 },
                    className: "bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-smooth",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(svc.icon, { className: "w-5 h-5 text-white" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-white text-sm mb-1", children: svc.title }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/55 text-xs leading-relaxed", children: svc.description })
                    ]
                  },
                  svc.title
                ))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute bottom-0 left-0 right-0 h-16 pointer-events-none",
              style: {
                background: "linear-gradient(to top, oklch(0.98 0 0 / 0.08), transparent)"
              },
              "aria-hidden": "true"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-20", "data-ocid": "services-section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5 },
          className: "text-center mb-14",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary font-semibold uppercase tracking-widest text-xs mb-3", children: "Nos Domaines" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl md:text-4xl font-bold text-foreground mb-4", children: "Des services d'excellence" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-xl mx-auto", children: "Nous vous accompagnons dans tous vos projets avec expertise et professionnalisme." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: SERVICES.map((svc, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.4, delay: i * 0.1 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: svc.href, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Card,
            {
              className: "h-full hover-lift border-border hover:border-primary/30 group cursor-pointer",
              "data-ocid": `service-card-${svc.title.toLowerCase()}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-8 flex flex-col gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `w-14 h-14 rounded-2xl ${svc.bg} flex items-center justify-center`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(svc.icon, { className: `w-7 h-7 ${svc.color}` })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold text-foreground mb-2", children: svc.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: svc.description })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: `flex items-center gap-1 text-sm font-semibold mt-auto ${svc.color} group-hover:gap-2 transition-smooth`,
                    children: [
                      "En savoir plus ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
                    ]
                  }
                )
              ] })
            }
          ) })
        },
        svc.title
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-muted/30 py-20 border-y border-border",
        "data-ocid": "properties-section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, x: -20 },
                whileInView: { opacity: 1, x: 0 },
                viewport: { once: true },
                transition: { duration: 0.5 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary font-semibold uppercase tracking-widest text-xs mb-2", children: "Immobilier" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl md:text-4xl font-bold text-foreground", children: "Propriétés en Vedette" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, x: 20 },
                whileInView: { opacity: 1, x: 0 },
                viewport: { once: true },
                transition: { duration: 0.5 },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "outline",
                    className: "border-primary/30 text-primary hover:bg-primary/5",
                    asChild: true,
                    "data-ocid": "properties-view-all",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/services/immobilier", children: [
                      "Voir toutes les propriétés",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-2 w-4 h-4" })
                    ] })
                  }
                )
              }
            )
          ] }),
          propsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(CardSkeleton, {}, i)) }) : featuredProperties.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: featuredProperties.map((property, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            PropertyCard,
            {
              property,
              index: i
            },
            property.id.toString()
          )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-12 h-12 mx-auto mb-4 opacity-25" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium mb-1", children: "Propriétés à venir" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Notre catalogue sera bientôt disponible." })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-20", "data-ocid": "vehicles-section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: true },
            transition: { duration: 0.5 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-secondary font-semibold uppercase tracking-widest text-xs mb-2", children: "Transport" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl md:text-4xl font-bold text-foreground", children: "Nos Véhicules" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: true },
            transition: { duration: 0.5 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                className: "border-secondary/30 text-secondary hover:bg-secondary/5",
                asChild: true,
                "data-ocid": "vehicles-view-all",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/services/transport", children: [
                  "Voir tous les véhicules",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-2 w-4 h-4" })
                ] })
              }
            )
          }
        )
      ] }),
      vecsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(CardSkeleton, {}, i)) }) : featuredVehicles.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: featuredVehicles.map((vehicle, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        VehicleCard,
        {
          vehicle,
          index: i
        },
        vehicle.id.toString()
      )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16 text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-12 h-12 mx-auto mb-4 opacity-25" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium mb-1", children: "Flotte à venir" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Nos véhicules seront bientôt disponibles." })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "py-20 relative overflow-hidden",
        style: {
          background: "linear-gradient(135deg, oklch(0.22 0.1 145) 0%, oklch(0.2 0.12 249) 100%)"
        },
        "data-ocid": "stats-section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 opacity-[0.04] pointer-events-none",
              style: {
                backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                backgroundSize: "36px 36px"
              },
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6", children: STATS.map((stat, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 30 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.5, delay: i * 0.1 },
              className: "text-center",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(stat.icon, { className: "w-6 h-6 text-white/60" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-4xl md:text-5xl font-bold text-white mb-2", children: stat.value }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/55 text-sm font-medium", children: stat.label })
              ]
            },
            stat.label
          )) }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 py-20 border-y border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "text-center mb-12",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary font-semibold uppercase tracking-widest text-xs mb-3", children: "Témoignages" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl md:text-4xl font-bold text-foreground", children: "Ce que disent nos clients" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: TESTIMONIALS.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.1 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "h-full shadow-corporate hover-lift", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5 mb-4", children: Array.from({ length: t.rating }).map((_, j) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Star,
              {
                className: "h-4 w-4 fill-amber-400 text-amber-400"
              },
              `star-${t.name}-${j}`
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed mb-4 italic text-sm", children: [
              '"',
              t.text,
              '"'
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm", children: t.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t.company })
            ] })
          ] }) })
        },
        t.name
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-20", "data-ocid": "cta-section", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-3xl mx-auto px-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary font-semibold uppercase tracking-widest text-xs mb-4", children: "Travaillons ensemble" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl md:text-4xl font-bold text-foreground mb-4", children: "Prêt à travailler avec nous ?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg mb-10 leading-relaxed", children: "Notre équipe d'experts est disponible pour répondre à toutes vos questions et vous accompagner dans vos projets." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "lg",
                className: "bg-[#25D366] text-white hover:bg-[#25D366]/90 font-semibold gap-2 shadow-corporate px-8",
                asChild: true,
                "data-ocid": "cta-whatsapp",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "a",
                  {
                    href: "https://wa.me/221770000000",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-5 h-5" }),
                      "WhatsApp"
                    ]
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "lg",
                variant: "outline",
                className: "border-primary/40 text-primary hover:bg-primary/5 gap-2 px-8",
                asChild: true,
                "data-ocid": "cta-devis",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contact", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-5 h-5" }),
                  "Demander un devis"
                ] })
              }
            )
          ] })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(NewsletterSection, {})
  ] });
}
export {
  Home as default
};
