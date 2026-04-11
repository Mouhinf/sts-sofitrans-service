import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, B as Button, C as ChevronDown, e as ue } from "./index-CtugyttR.js";
import { A as AdminLayout } from "./AdminLayout-CUSwgGZ7.js";
import { P as Plus, a as Pencil, T as Trash2, I as ImageUpload } from "./ImageUpload-B_DuzyVO.js";
import { I as InputField } from "./InputField-FRvVB7Ym.js";
import { M as Modal } from "./Modal-CB1d7WGu.js";
import { T as TextareaField } from "./TextareaField-j00ddAAZ.js";
import { S as Skeleton } from "./skeleton-lD6-NYnm.js";
import { s as useAdminTrainings, t as useAdminCreateTraining, v as useAdminUpdateTraining, w as useAdminDeleteTraining } from "./useBackend-DJ1gFwav.js";
import { U as Users } from "./users-o0ERafMs.js";
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
const __iconNode = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]];
const ChevronUp = createLucideIcon("chevron-up", __iconNode);
const EMPTY_FORM = {
  title: "",
  description: "",
  durationDays: "1",
  price: "",
  maxCapacity: "20",
  image: null
};
function toInput(f) {
  return {
    title: f.title,
    description: f.description,
    durationDays: BigInt(Number(f.durationDays) || 1),
    price: BigInt(Number(f.price) || 0),
    maxCapacity: BigInt(Number(f.maxCapacity) || 20),
    image: f.image
  };
}
function validate(f) {
  const errors = {};
  if (!f.title.trim()) errors.title = "Le titre est obligatoire";
  if (!f.description.trim())
    errors.description = "La description est obligatoire";
  if (!f.price || Number(f.price) <= 0)
    errors.price = "Le prix doit être positif";
  if (!f.durationDays || Number(f.durationDays) < 1)
    errors.durationDays = "La durée doit être ≥ 1";
  if (!f.maxCapacity || Number(f.maxCapacity) < 1)
    errors.maxCapacity = "La capacité doit être ≥ 1";
  if (!f.image) errors.image = "L'image est obligatoire";
  return errors;
}
function EnrollmentList({
  enrollments
}) {
  if (!enrollments.length) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground py-2", children: "Aucune inscription" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-left text-muted-foreground border-b border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-1 pr-3 font-medium", children: "Nom" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-1 pr-3 font-medium", children: "Email" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-1 font-medium", children: "Téléphone" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: enrollments.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "tr",
      {
        className: "border-b border-border last:border-0",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 pr-3", children: e.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 pr-3 text-muted-foreground", children: e.email }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-1.5 text-muted-foreground", children: e.phone })
        ]
      },
      `${e.email}-${e.name}`
    )) })
  ] });
}
function AdminFormationsPage() {
  const { data: trainings, isLoading } = useAdminTrainings();
  const createMutation = useAdminCreateTraining();
  const updateMutation = useAdminUpdateTraining();
  const deleteMutation = useAdminDeleteTraining();
  const [modalOpen, setModalOpen] = reactExports.useState(false);
  const [editTarget, setEditTarget] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(EMPTY_FORM);
  const [errors, setErrors] = reactExports.useState({});
  const [deleteConfirm, setDeleteConfirm] = reactExports.useState(null);
  const [expandedId, setExpandedId] = reactExports.useState(null);
  const openCreate = () => {
    setEditTarget(null);
    setForm(EMPTY_FORM);
    setErrors({});
    setModalOpen(true);
  };
  const openEdit = (t) => {
    setEditTarget(t);
    setForm({
      title: t.title,
      description: t.description,
      durationDays: t.durationDays.toString(),
      price: t.price.toString(),
      maxCapacity: t.maxCapacity.toString(),
      image: t.image
    });
    setErrors({});
    setModalOpen(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    const input = toInput(form);
    try {
      if (editTarget) {
        await updateMutation.mutateAsync({ id: editTarget.id, input });
        ue.success("Formation mise à jour");
      } else {
        await createMutation.mutateAsync(input);
        ue.success("Formation créée");
      }
      setModalOpen(false);
    } catch {
      ue.error("Une erreur est survenue");
    }
  };
  const handleDelete = async (t) => {
    try {
      await deleteMutation.mutateAsync(t.id);
      ue.success("Formation supprimée");
      setDeleteConfirm(null);
    } catch {
      ue.error("Erreur lors de la suppression");
    }
  };
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminLayout, { title: "Formations", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        (trainings == null ? void 0 : trainings.length) ?? 0,
        " formation(s)"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: openCreate, "data-ocid": "add-training-btn", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
        "Nouvelle formation"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/50 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3 font-medium text-muted-foreground", children: "Titre" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right p-3 font-medium text-muted-foreground hidden md:table-cell", children: "Durée (j)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right p-3 font-medium text-muted-foreground hidden md:table-cell", children: "Prix (FCFA)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right p-3 font-medium text-muted-foreground hidden lg:table-cell", children: "Capacité max" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right p-3 font-medium text-muted-foreground hidden lg:table-cell", children: "Inscrits" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right p-3 font-medium text-muted-foreground", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
        isLoading ? ["r0", "r1", "r2"].map((rk) => /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border", children: ["c0", "c1", "c2", "c3", "c4", "c5"].map((ck) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }) }, ck)) }, rk)) : trainings == null ? void 0 : trainings.map((t) => {
          const tid = t.id.toString();
          const isExpanded = expandedId === tid;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: "border-b border-border hover:bg-muted/20 transition-colors",
                "data-ocid": "training-row",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 font-medium text-foreground", children: t.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-right hidden md:table-cell", children: t.durationDays.toString() }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-right tabular-nums hidden md:table-cell", children: Number(t.price).toLocaleString("fr-FR") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-right hidden lg:table-cell", children: t.maxCapacity.toString() }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-right hidden lg:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center justify-end gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3 w-3 text-muted-foreground" }),
                    t.enrollments.length
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "ghost",
                        size: "icon",
                        onClick: () => setExpandedId(isExpanded ? null : tid),
                        "aria-label": "Voir inscrits",
                        "data-ocid": "toggle-enrollments-btn",
                        children: isExpanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "ghost",
                        size: "icon",
                        onClick: () => openEdit(t),
                        "aria-label": "Modifier",
                        "data-ocid": "edit-training-btn",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "ghost",
                        size: "icon",
                        onClick: () => setDeleteConfirm(t),
                        className: "text-destructive hover:text-destructive",
                        "aria-label": "Supprimer",
                        "data-ocid": "delete-training-btn",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
                      }
                    )
                  ] }) })
                ]
              },
              tid
            ),
            isExpanded && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "tr",
              {
                className: "border-b border-border bg-muted/20",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { colSpan: 6, className: "px-6 py-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground mb-2", children: "Inscrits à cette formation" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(EnrollmentList, { enrollments: t.enrollments })
                ] })
              },
              `${tid}-enrollments`
            )
          ] });
        }),
        !isLoading && !(trainings == null ? void 0 : trainings.length) && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "td",
          {
            colSpan: 6,
            className: "p-8 text-center text-muted-foreground",
            "data-ocid": "empty-admin-trainings",
            children: "Aucune formation. Créez-en une !"
          }
        ) })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        isOpen: modalOpen,
        onClose: () => setModalOpen(false),
        title: editTarget ? "Modifier la formation" : "Nouvelle formation",
        size: "lg",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "form",
          {
            onSubmit: handleSubmit,
            className: "flex flex-col gap-4 max-h-[70vh] overflow-y-auto pr-1",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                InputField,
                {
                  label: "Titre",
                  required: true,
                  value: form.title,
                  onChange: (e) => set("title", e.target.value),
                  error: errors.title
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                TextareaField,
                {
                  label: "Description",
                  required: true,
                  value: form.description,
                  onChange: (e) => set("description", e.target.value),
                  error: errors.description,
                  rows: 3
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  InputField,
                  {
                    label: "Durée (jours)",
                    required: true,
                    type: "number",
                    min: "1",
                    value: form.durationDays,
                    onChange: (e) => set("durationDays", e.target.value),
                    error: errors.durationDays
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  InputField,
                  {
                    label: "Prix (FCFA)",
                    required: true,
                    type: "number",
                    min: "0",
                    value: form.price,
                    onChange: (e) => set("price", e.target.value),
                    error: errors.price
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  InputField,
                  {
                    label: "Capacité max",
                    required: true,
                    type: "number",
                    min: "1",
                    value: form.maxCapacity,
                    onChange: (e) => set("maxCapacity", e.target.value),
                    error: errors.maxCapacity
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ImageUpload,
                {
                  label: "Image",
                  value: form.image,
                  onChange: (blob) => set("image", blob)
                }
              ),
              errors.image && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.image }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2 border-t border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    onClick: () => setModalOpen(false),
                    className: "flex-1",
                    children: "Annuler"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "submit",
                    className: "flex-1",
                    disabled: createMutation.isPending || updateMutation.isPending,
                    "data-ocid": "save-training-btn",
                    children: createMutation.isPending || updateMutation.isPending ? "Enregistrement…" : "Enregistrer"
                  }
                )
              ] })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Modal,
      {
        isOpen: !!deleteConfirm,
        onClose: () => setDeleteConfirm(null),
        title: "Confirmer la suppression",
        size: "sm",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-4", children: [
            "Supprimer ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: deleteConfirm == null ? void 0 : deleteConfirm.title }),
            " ? Cette action est irréversible."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                onClick: () => setDeleteConfirm(null),
                className: "flex-1",
                children: "Annuler"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "destructive",
                onClick: () => deleteConfirm && handleDelete(deleteConfirm),
                disabled: deleteMutation.isPending,
                className: "flex-1",
                "data-ocid": "confirm-delete-btn",
                children: deleteMutation.isPending ? "Suppression…" : "Supprimer"
              }
            )
          ] })
        ]
      }
    )
  ] });
}
export {
  AdminFormationsPage as default
};
