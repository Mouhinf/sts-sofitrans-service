import { c as createLucideIcon, j as jsxRuntimeExports, m as motion, L as Link, B as Button } from "./index-CtugyttR.js";
import { B as Badge } from "./badge-DvHdE_Hx.js";
import { C as CircleCheck } from "./circle-check-DmsAxiSo.js";
import { S as Star } from "./star-D-pngBH9.js";
import { S as Shield } from "./shield-Bi8eJdUN.js";
import { U as Users } from "./users-o0ERafMs.js";
import { A as ArrowRight } from "./arrow-right-CVbvl57I.js";
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
      d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",
      key: "1gvzjb"
    }
  ],
  ["path", { d: "M9 18h6", key: "x1upvd" }],
  ["path", { d: "M10 22h4", key: "ceow96" }]
];
const Lightbulb = createLucideIcon("lightbulb", __iconNode);
const STATS = [
  { value: "15+", label: "Ans d'expérience" },
  { value: "500+", label: "Clients satisfaits" },
  { value: "4", label: "Secteurs d'activité" },
  { value: "100%", label: "Engagement qualité" }
];
const MISSIONS = [
  {
    key: "mission",
    title: "Notre Mission",
    Icon: CircleCheck,
    gradientClass: "from-primary/10 to-primary/5",
    borderClass: "border-primary/30",
    iconClass: "text-primary",
    text: "Connecter entreprises et particuliers avec des opportunités immobilières de qualité, des solutions de transport fiables, des projets agribusiness rentables et des formations professionnelles d'excellence — pour mieux vous servir à chaque étape."
  },
  {
    key: "vision",
    title: "Notre Vision",
    Icon: Star,
    gradientClass: "from-secondary/10 to-secondary/5",
    borderClass: "border-secondary/30",
    iconClass: "text-secondary",
    text: "Devenir la référence incontournable des services multi-sectoriels en Afrique de l'Ouest : un groupe intégré qui inspire confiance, crée de la valeur et contribue au développement économique de la région à l'horizon 2035."
  }
];
const VALUES = [
  {
    Icon: Shield,
    title: "Confiance",
    description: "Chaque engagement est tenu. Nous bâtissons des relations durables fondées sur la transparence et l'intégrité absolue envers nos clients et partenaires."
  },
  {
    Icon: Star,
    title: "Excellence",
    description: "Nous visons l'excellence dans chaque prestation, en combinant expertise locale et standards internationaux pour dépasser les attentes."
  },
  {
    Icon: Lightbulb,
    title: "Innovation",
    description: "Nous adoptons les meilleures pratiques et technologies pour proposer des solutions modernes adaptées aux réalités du marché ouest-africain."
  },
  {
    Icon: Users,
    title: "Proximité",
    description: "Présents à vos côtés à chaque étape, nos équipes offrent un accompagnement personnalisé, réactif et humain — au Sénégal et au-delà."
  }
];
const TEAM = [
  {
    initials: "MD",
    name: "Moussa Diallo",
    title: "Directeur Général",
    gradientClass: "from-primary to-primary/70",
    quote: "L'excellence au service du progrès"
  },
  {
    initials: "AF",
    name: "Aissatou Fall",
    title: "Responsable Immobilier",
    gradientClass: "from-secondary to-secondary/70",
    quote: "Trouver votre espace de vie idéal"
  },
  {
    initials: "IS",
    name: "Ibrahim Sow",
    title: "Chef Transport & Logistique",
    gradientClass: "from-primary/80 to-secondary/80",
    quote: "Chaque livraison, une promesse tenue"
  }
];
const SECTORS = [
  "Transport & Logistique",
  "Immobilier",
  "Agrobusiness",
  "Formation"
];
function AboutPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative min-h-[480px] flex items-center justify-center overflow-hidden",
        style: {
          backgroundImage: "url('/assets/generated/about-company-hero.dim_1400x600.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        },
        "data-ocid": "about-hero",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-[oklch(0.25_0.14_136/0.92)] via-[oklch(0.20_0.10_200/0.85)] to-[oklch(0.22_0.16_249/0.90)]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center py-24", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 30 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.7 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "mb-6 bg-white/20 text-white border-white/30 text-sm px-4 py-1.5 backdrop-blur-sm", children: "STS SOFITRANS SERVICE" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight", children: "À propos de nous" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/85 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed", children: "Votre partenaire de confiance en logistique, immobilier, agrobusiness et formation professionnelle depuis plus de 15 ans au Sénégal." })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.7, delay: 0.3 },
                className: "mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto",
                children: STATS.map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-4 text-center",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-3xl font-bold text-white", children: stat.value }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/70 text-xs mt-1", children: stat.label })
                    ]
                  },
                  stat.label
                ))
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 bg-background", "data-ocid": "about-histoire", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -40 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          transition: { duration: 0.6 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "mb-4 bg-primary/10 text-primary border-primary/20 text-xs uppercase tracking-widest", children: "Notre Histoire" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl sm:text-4xl font-bold text-foreground mb-6 leading-tight", children: "Plus de 15 ans d'expertise au service de nos clients" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 text-muted-foreground leading-relaxed", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                "Fondée à Dakar avec la conviction que l'Afrique de l'Ouest mérite des services professionnels de classe mondiale,",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "STS SOFITRANS SERVICE" }),
                " ",
                "a progressivement construit un groupe multi-services ancré dans les réalités du terrain sénégalais."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "De ses débuts dans le transport et la logistique, la société a étendu son expertise à l'immobilier résidentiel et commercial, à l'agrobusiness, et à la formation professionnelle — quatre piliers complémentaires qui répondent aux besoins croissants des entreprises et des particuliers." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                "Établis à",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Zac Mbao, Rond Point Sipres, Dakar" }),
                ", nous opérons à travers tout le Sénégal et accompagnons nos clients dans leur expansion régionale. Notre slogan,",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "text-primary font-semibold", children: '"Pour Mieux Vous Servir !"' }),
                ", traduit notre engagement quotidien envers l'excellence."
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 flex flex-wrap gap-3", children: SECTORS.map((sector) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "inline-flex items-center gap-1.5 bg-primary/8 border border-primary/20 text-primary text-sm px-3 py-1.5 rounded-full font-medium",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-primary inline-block" }),
                  sector
                ]
              },
              sector
            )) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: 40 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          transition: { duration: 0.6, delay: 0.15 },
          className: "relative",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-2xl overflow-hidden shadow-elevated", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: "/assets/generated/about-team-story.dim_700x500.jpg",
                  alt: "L'équipe STS SOFITRANS SERVICE",
                  className: "w-full h-80 lg:h-96 object-cover"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-4 left-4 right-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-semibold text-sm", children: "L'équipe STS SOFITRANS SERVICE — Dakar, Sénégal" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute -bottom-4 -right-4 bg-primary text-white rounded-xl px-5 py-4 shadow-elevated hidden sm:block", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl font-bold", children: "15+" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-white/80", children: "Ans d'expertise" })
            ] })
          ]
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 bg-muted/30", "data-ocid": "about-mission-vision", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5 },
          className: "text-center mb-12",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "mb-4 bg-secondary/10 text-secondary border-secondary/20 text-xs uppercase tracking-widest", children: "Ce qui nous guide" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl sm:text-4xl font-bold text-foreground", children: "Mission & Vision" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto", children: MISSIONS.map((item, index) => {
        const Icon = item.Icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 30 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.55, delay: index * 0.15 },
            className: `bg-gradient-to-br ${item.gradientClass} border ${item.borderClass} rounded-2xl p-8 hover-lift`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-background flex items-center justify-center mb-5 shadow-corporate", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-6 h-6 ${item.iconClass}` }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h3",
                {
                  className: `font-display text-xl font-bold mb-3 ${item.iconClass}`,
                  children: item.title
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed text-sm", children: item.text })
            ]
          },
          item.key
        );
      }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 bg-background", "data-ocid": "about-valeurs", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5 },
          className: "text-center mb-14",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "mb-4 bg-primary/10 text-primary border-primary/20 text-xs uppercase tracking-widest", children: "Nos piliers" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl sm:text-4xl font-bold text-foreground mb-3", children: "Nos Valeurs" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-xl mx-auto text-sm", children: "Quatre piliers fondamentaux qui guident chacune de nos actions et décisions depuis notre création." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: VALUES.map((val, index) => {
        const Icon = val.Icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 30 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.5, delay: index * 0.1 },
            className: "bg-card border border-border rounded-2xl p-6 text-center group hover-lift cursor-default",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary transition-smooth", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-7 h-7 text-primary group-hover:text-white transition-smooth" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-bold text-foreground mb-3", children: val.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: val.description })
            ]
          },
          val.title
        );
      }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 bg-muted/30", "data-ocid": "about-equipe", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5 },
          className: "text-center mb-14",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "mb-4 bg-secondary/10 text-secondary border-secondary/20 text-xs uppercase tracking-widest", children: "Les hommes & femmes derrière STS" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl sm:text-4xl font-bold text-foreground mb-3", children: "Notre Équipe" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-xl mx-auto text-sm", children: "Des professionnels passionnés, experts dans leurs domaines, unis par la même vision d'excellence au service de l'Afrique de l'Ouest." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto", children: TEAM.map((member, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.55, delay: index * 0.12 },
          className: "bg-card border border-border rounded-2xl p-8 text-center hover-lift",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `w-20 h-20 rounded-full bg-gradient-to-br ${member.gradientClass} flex items-center justify-center mx-auto mb-5 shadow-elevated`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl font-bold text-white", children: member.initials })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-bold text-foreground mb-1", children: member.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary font-medium text-sm mb-3", children: member.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-xs italic leading-relaxed", children: [
              '"',
              member.quote,
              '"'
            ] })
          ]
        },
        member.name
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "py-20 bg-gradient-to-br from-primary via-primary/90 to-secondary relative overflow-hidden",
        "data-ocid": "about-cta",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 translate-x-1/3 -translate-y-1/3 pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/5 -translate-x-1/4 translate-y-1/4 pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.96 },
              whileInView: { opacity: 1, scale: 1 },
              viewport: { once: true },
              transition: { duration: 0.6 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 text-sm uppercase tracking-widest mb-3 font-medium", children: "Construisons ensemble" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight max-w-2xl mx-auto", children: "Rejoignez notre réseau de partenaires" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/80 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed", children: "Que vous soyez entrepreneur, investisseur ou particulier, nous avons les solutions adaptées à vos ambitions. Prenons contact." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", "data-ocid": "about-cta-btn", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "lg",
                    className: "bg-white text-primary hover:bg-white/90 font-semibold px-8 py-6 text-base rounded-xl shadow-elevated transition-smooth group",
                    children: [
                      "Nous contacter",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-2 w-5 h-5 group-hover:translate-x-1 transition-smooth" })
                    ]
                  }
                ) })
              ]
            }
          ) })
        ]
      }
    )
  ] });
}
export {
  AboutPage as default
};
