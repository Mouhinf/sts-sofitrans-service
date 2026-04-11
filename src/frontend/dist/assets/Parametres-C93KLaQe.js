import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, P as Phone, B as Button, e as ue } from "./index-CtugyttR.js";
import { A as AdminLayout } from "./AdminLayout-CUSwgGZ7.js";
import { I as InputField } from "./InputField-FRvVB7Ym.js";
import { S as Skeleton } from "./skeleton-lD6-NYnm.js";
import { H as useCompanySettings, I as useAdminUpdateCompanySettings } from "./useBackend-DJ1gFwav.js";
import "./useAuth-DVc-f4-X.js";
import "./backend-gUdCIi-2.js";
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
const __iconNode$5 = [
  [
    "path",
    { d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z", key: "1jg4f8" }
  ]
];
const Facebook = createLucideIcon("facebook", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20", key: "13o1zl" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }]
];
const Globe = createLucideIcon("globe", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["rect", { width: "20", height: "20", x: "2", y: "2", rx: "5", ry: "5", key: "2e1cvw" }],
  ["path", { d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z", key: "9exkf1" }],
  ["line", { x1: "17.5", x2: "17.51", y1: "6.5", y2: "6.5", key: "r4j83e" }]
];
const Instagram = createLucideIcon("instagram", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z",
      key: "c2jq9f"
    }
  ],
  ["rect", { width: "4", height: "12", x: "2", y: "9", key: "mk3on5" }],
  ["circle", { cx: "4", cy: "4", r: "2", key: "bt5ra8" }]
];
const Linkedin = createLucideIcon("linkedin", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode$1);
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
      d: "M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17",
      key: "1q2vi4"
    }
  ],
  ["path", { d: "m10 15 5-3-5-3z", key: "1jp15x" }]
];
const Youtube = createLucideIcon("youtube", __iconNode);
const EMPTY = {
  phone: "",
  whatsapp: "",
  email: "",
  address: "Zac Mbao Rond Point Sipres, Dakar, Sénégal",
  logoUrl: "",
  facebookUrl: void 0,
  instagramUrl: void 0,
  linkedinUrl: void 0,
  youtubeUrl: void 0
};
function AdminParametresPage() {
  const { data: settings, isLoading } = useCompanySettings();
  const updateMutation = useAdminUpdateCompanySettings();
  const [form, setForm] = reactExports.useState(EMPTY);
  const [saved, setSaved] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (settings) {
      setForm({
        phone: settings.phone ?? "",
        whatsapp: settings.whatsapp ?? "",
        email: settings.email ?? "",
        address: settings.address ?? "",
        logoUrl: settings.logoUrl ?? "",
        facebookUrl: settings.facebookUrl,
        instagramUrl: settings.instagramUrl,
        linkedinUrl: settings.linkedinUrl,
        youtubeUrl: settings.youtubeUrl
      });
    }
  }, [settings]);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v || void 0 }));
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.phone.trim() || !form.email.trim()) {
      ue.error("Le téléphone et l'email sont obligatoires");
      return;
    }
    try {
      await updateMutation.mutateAsync(form);
      setSaved(true);
      ue.success("Paramètres enregistrés avec succès");
      setTimeout(() => setSaved(false), 3e3);
    } catch {
      ue.error("Erreur lors de l'enregistrement");
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLayout, { title: "Paramètres", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-2xl flex flex-col gap-4", children: ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8"].map((sk) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full rounded-lg" }, sk)) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLayout, { title: "Paramètres", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      onSubmit: handleSubmit,
      className: "max-w-2xl",
      "data-ocid": "settings-form",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card border border-border rounded-xl p-6 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-base font-semibold font-display text-foreground mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4 text-primary" }),
            "Coordonnées"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                InputField,
                {
                  label: "Téléphone",
                  required: true,
                  type: "tel",
                  value: form.phone ?? "",
                  onChange: (e) => set("phone", e.target.value),
                  placeholder: "+221 77 000 00 00",
                  "data-ocid": "settings-phone"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                InputField,
                {
                  label: "WhatsApp",
                  type: "tel",
                  value: form.whatsapp ?? "",
                  onChange: (e) => set("whatsapp", e.target.value),
                  placeholder: "221770000000",
                  "data-ocid": "settings-whatsapp"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              InputField,
              {
                label: "Email",
                required: true,
                type: "email",
                value: form.email ?? "",
                onChange: (e) => set("email", e.target.value),
                placeholder: "contact@sts-sofitrans.com",
                "data-ocid": "settings-email"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              InputField,
              {
                label: "Adresse",
                value: form.address ?? "",
                onChange: (e) => set("address", e.target.value),
                placeholder: "Zac Mbao Rond Point Sipres, Dakar, Sénégal",
                "data-ocid": "settings-address"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card border border-border rounded-xl p-6 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-base font-semibold font-display text-foreground mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-4 w-4 text-primary" }),
            "Identité visuelle"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            InputField,
            {
              label: "URL du logo",
              value: form.logoUrl ?? "",
              onChange: (e) => set("logoUrl", e.target.value),
              placeholder: "https://...",
              hint: "URL publique de l'image du logo"
            }
          ),
          form.logoUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 p-3 bg-muted/50 rounded-lg inline-block", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: form.logoUrl,
              alt: "Aperçu du logo",
              className: "h-12 w-auto object-contain",
              onError: (e) => {
                e.target.style.display = "none";
              }
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card border border-border rounded-xl p-6 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-base font-semibold font-display text-foreground mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-4 w-4 text-primary" }),
            "Réseaux sociaux"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Facebook, { className: "h-4 w-4 text-muted-foreground mt-2.5 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                InputField,
                {
                  label: "Facebook",
                  value: form.facebookUrl ?? "",
                  onChange: (e) => set("facebookUrl", e.target.value),
                  placeholder: "https://facebook.com/...",
                  className: "flex-1",
                  "data-ocid": "settings-facebook"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Instagram, { className: "h-4 w-4 text-muted-foreground mt-2.5 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                InputField,
                {
                  label: "Instagram",
                  value: form.instagramUrl ?? "",
                  onChange: (e) => set("instagramUrl", e.target.value),
                  placeholder: "https://instagram.com/...",
                  className: "flex-1",
                  "data-ocid": "settings-instagram"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Linkedin, { className: "h-4 w-4 text-muted-foreground mt-2.5 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                InputField,
                {
                  label: "LinkedIn",
                  value: form.linkedinUrl ?? "",
                  onChange: (e) => set("linkedinUrl", e.target.value),
                  placeholder: "https://linkedin.com/...",
                  className: "flex-1",
                  "data-ocid": "settings-linkedin"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Youtube, { className: "h-4 w-4 text-muted-foreground mt-2.5 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                InputField,
                {
                  label: "YouTube",
                  value: form.youtubeUrl ?? "",
                  onChange: (e) => set("youtubeUrl", e.target.value),
                  placeholder: "https://youtube.com/...",
                  className: "flex-1",
                  "data-ocid": "settings-youtube"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              disabled: updateMutation.isPending,
              className: "min-w-[160px]",
              "data-ocid": "settings-save-btn",
              children: updateMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" }),
                "Enregistrement…"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4 mr-2" }),
                "Enregistrer les modifications"
              ] })
            }
          ),
          saved && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-primary font-medium", children: "✓ Paramètres enregistrés" })
        ] })
      ]
    }
  ) });
}
export {
  AdminParametresPage as default
};
