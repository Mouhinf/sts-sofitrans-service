import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, m as motion, B as Button } from "./index-CtugyttR.js";
import { I as InputField } from "./InputField-FRvVB7Ym.js";
import { M as Modal } from "./Modal-CB1d7WGu.js";
import { B as Badge } from "./badge-DvHdE_Hx.js";
import { S as Skeleton } from "./skeleton-lD6-NYnm.js";
import { e as useTrainings, f as useEnrollInTraining } from "./useBackend-DJ1gFwav.js";
import { G as GraduationCap } from "./graduation-cap-D0lJeyMd.js";
import { B as BookOpen } from "./book-open-C8qzRTOr.js";
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
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode);
function formatFCFA(amount) {
  return `${new Intl.NumberFormat("fr-FR").format(Number(amount))} FCFA`;
}
function TrainingCard({
  training,
  onClick
}) {
  var _a;
  const imageUrl = ((_a = training.image) == null ? void 0 : _a.getDirectURL()) ?? "/assets/images/placeholder.svg";
  const enrolled = training.enrollments.length;
  const capacity = Number(training.maxCapacity);
  const isFull = enrolled >= capacity;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.4 },
      className: "group bg-card border border-border rounded-xl overflow-hidden shadow-corporate hover-lift",
      "data-ocid": `training-card-${training.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-44 overflow-hidden bg-muted", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: imageUrl,
              alt: training.title,
              className: "w-full h-full object-cover group-hover:scale-105 transition-smooth"
            }
          ),
          isFull && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-foreground/60 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-card text-foreground text-sm font-semibold px-3 py-1 rounded-full", children: "Complet" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground text-lg mb-2 group-hover:text-primary transition-colors duration-200 line-clamp-2", children: training.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed", children: training.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "flex items-center gap-1 text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
              String(training.durationDays),
              " jours"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "flex items-center gap-1 text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3 h-3" }),
              enrolled,
              "/",
              capacity,
              " inscrits"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary font-bold text-lg", children: formatFCFA(training.price) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                onClick,
                disabled: isFull,
                className: "bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50",
                "data-ocid": `enroll-${training.id}`,
                children: isFull ? "Complet" : "S'inscrire"
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function EnrollmentForm({
  training,
  onSuccess
}) {
  const { mutate, isPending, isSuccess, isError } = useEnrollInTraining();
  const [form, setForm] = reactExports.useState({
    trainingId: training.id,
    name: "",
    email: "",
    phone: ""
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(form, { onSuccess });
  };
  if (isSuccess) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4 py-6 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-12 h-12 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-display font-bold text-foreground", children: "Inscription confirmée !" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground max-w-sm", children: [
        "Votre inscription à ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: training.title }),
        " a été enregistrée. Vous recevrez les détails de la formation par email."
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      onSubmit: handleSubmit,
      className: "flex flex-col gap-4",
      "data-ocid": "enrollment-form",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/50 rounded-lg p-4 border border-border mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: training.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 mt-1 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
              String(training.durationDays),
              " jours"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-primary", children: formatFCFA(training.price) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          InputField,
          {
            label: "Nom complet",
            required: true,
            value: form.name,
            onChange: (e) => setForm((f) => ({ ...f, name: e.target.value })),
            placeholder: "Votre nom",
            "data-ocid": "enrollment-name"
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
            "data-ocid": "enrollment-email"
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
            "data-ocid": "enrollment-phone"
          }
        ),
        isError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive text-center", role: "alert", children: "Une erreur s'est produite. Veuillez réessayer." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            className: "w-full bg-primary text-primary-foreground hover:bg-primary/90",
            disabled: isPending,
            "data-ocid": "enrollment-submit",
            children: isPending ? "Inscription en cours..." : "Confirmer l'inscription"
          }
        )
      ]
    }
  );
}
const benefits = [
  { icon: BookOpen, label: "Formateurs experts" },
  { icon: GraduationCap, label: "Certifications reconnues" },
  { icon: Users, label: "Groupes de 10 à 30 personnes" },
  { icon: Clock, label: "Formations courtes et intensives" }
];
function FormationPage() {
  const { data: trainings, isLoading } = useTrainings();
  const [selectedTraining, setSelectedTraining] = reactExports.useState(
    null
  );
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
              /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "w-8 h-8" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold uppercase tracking-widest opacity-80", children: "Services" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-5xl font-display font-bold mb-4", children: "Formation" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg opacity-90 max-w-2xl leading-relaxed", children: "Des formations professionnelles certifiées pour développer vos compétences en logistique, transport et gestion d'entreprise." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-3 mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: "/contact",
                className: "inline-flex items-center gap-2 bg-primary-foreground/20 border border-primary-foreground/30 text-primary-foreground px-5 py-2.5 rounded-xl font-semibold hover:bg-primary-foreground/30 transition-smooth",
                "data-ocid": "contact-nous-cta",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "w-4 h-4" }),
                  "Nous contacter"
                ]
              }
            ) })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/40 py-10 px-4 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-6", children: benefits.map((benefit, i) => {
      const Icon = benefit.icon;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.1 },
          className: "flex flex-col items-center gap-2 text-center",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 bg-primary/10 rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: benefit.label })
          ]
        },
        benefit.label
      );
    }) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-12 px-4 min-h-[400px]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-8 flex-wrap gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-display font-bold text-foreground", children: "Nos Formations Disponibles" }),
        trainings && trainings.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm", children: [
          trainings.length,
          " formation",
          trainings.length > 1 ? "s" : "",
          " disponible",
          trainings.length > 1 ? "s" : ""
        ] })
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: ["s1", "s2", "s3", "s4", "s5", "s6"].map((sk) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 rounded-xl" }, sk)) }) : !(trainings == null ? void 0 : trainings.length) ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center gap-4 py-20 text-center",
          "data-ocid": "empty-trainings",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "w-16 h-16 text-muted-foreground/40" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-display font-semibold text-foreground", children: "Aucune formation disponible" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-sm", children: "Nos prochaines formations seront annoncées bientôt. Contactez-nous pour être informé en priorité." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                asChild: true,
                className: "bg-primary text-primary-foreground hover:bg-primary/90 mt-2",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: "https://wa.me/221770000000",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    "data-ocid": "empty-whatsapp-cta",
                    children: "Être informé via WhatsApp"
                  }
                )
              }
            )
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: trainings.map((training) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        TrainingCard,
        {
          training,
          onClick: () => setSelectedTraining(training)
        },
        String(training.id)
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        isOpen: !!selectedTraining,
        onClose: () => setSelectedTraining(null),
        title: "Inscription à la formation",
        size: "md",
        children: selectedTraining && /* @__PURE__ */ jsxRuntimeExports.jsx(
          EnrollmentForm,
          {
            training: selectedTraining,
            onSuccess: () => setSelectedTraining(null)
          }
        )
      }
    )
  ] });
}
export {
  FormationPage as default
};
