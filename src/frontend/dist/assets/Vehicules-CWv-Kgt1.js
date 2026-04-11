import { r as reactExports, j as jsxRuntimeExports, B as Button, e as ue } from "./index-CtugyttR.js";
import { A as AdminLayout } from "./AdminLayout-CUSwgGZ7.js";
import { P as Plus, a as Pencil, T as Trash2, I as ImageUpload } from "./ImageUpload-B_DuzyVO.js";
import { I as InputField, L as Label } from "./InputField-FRvVB7Ym.js";
import { M as Modal } from "./Modal-CB1d7WGu.js";
import { S as SelectField } from "./SelectField-BS7dmjDh.js";
import { T as TextareaField } from "./TextareaField-j00ddAAZ.js";
import { B as Badge } from "./badge-DvHdE_Hx.js";
import { C as Checkbox } from "./checkbox-DfnM__hE.js";
import { S as Skeleton } from "./skeleton-lD6-NYnm.js";
import { o as useAdminVehicles, p as useAdminCreateVehicle, q as useAdminUpdateVehicle, r as useAdminDeleteVehicle } from "./useBackend-DJ1gFwav.js";
import "./useAuth-DVc-f4-X.js";
import "./backend-gUdCIi-2.js";
import "./building-2-CWrEx0pq.js";
import "./truck-BuWQRKbv.js";
import "./graduation-cap-D0lJeyMd.js";
import "./message-square-D-yhUmMR.js";
import "./chevron-right-DwShqWtx.js";
const VEHICLE_TYPE_LABELS = {
  car: "Voiture",
  bus: "Bus",
  truck: "Camion",
  minibus: "Minibus"
};
const TYPE_OPTIONS = [
  { value: "car", label: "Voiture" },
  { value: "bus", label: "Bus" },
  { value: "truck", label: "Camion" },
  { value: "minibus", label: "Minibus" }
];
const EMPTY_FORM = {
  title: "",
  model: "",
  description: "",
  vehicleType: "car",
  capacity: "1",
  pricePerDay: "",
  featured: false,
  images: []
};
function toInput(f) {
  return {
    title: f.title,
    model: f.model,
    description: f.description,
    vehicleType: f.vehicleType,
    capacity: BigInt(Number(f.capacity) || 1),
    pricePerDay: BigInt(Number(f.pricePerDay) || 0),
    featured: f.featured,
    images: f.images
  };
}
function validate(f) {
  const errors = {};
  if (!f.title.trim()) errors.title = "Le titre est obligatoire";
  if (!f.model.trim()) errors.model = "Le modèle est obligatoire";
  if (!f.description.trim())
    errors.description = "La description est obligatoire";
  if (!f.pricePerDay || Number(f.pricePerDay) <= 0)
    errors.pricePerDay = "Le prix doit être positif";
  if (!f.capacity || Number(f.capacity) < 1)
    errors.capacity = "La capacité doit être ≥ 1";
  return errors;
}
function AdminVehiculesPage() {
  const { data: vehicles, isLoading } = useAdminVehicles();
  const createMutation = useAdminCreateVehicle();
  const updateMutation = useAdminUpdateVehicle();
  const deleteMutation = useAdminDeleteVehicle();
  const [modalOpen, setModalOpen] = reactExports.useState(false);
  const [editTarget, setEditTarget] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(EMPTY_FORM);
  const [errors, setErrors] = reactExports.useState({});
  const [deleteConfirm, setDeleteConfirm] = reactExports.useState(null);
  const openCreate = () => {
    setEditTarget(null);
    setForm(EMPTY_FORM);
    setErrors({});
    setModalOpen(true);
  };
  const openEdit = (v) => {
    setEditTarget(v);
    setForm({
      title: v.title,
      model: v.model,
      description: v.description,
      vehicleType: v.vehicleType,
      capacity: v.capacity.toString(),
      pricePerDay: v.pricePerDay.toString(),
      featured: v.featured,
      images: v.images
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
        ue.success("Véhicule mis à jour");
      } else {
        await createMutation.mutateAsync(input);
        ue.success("Véhicule créé");
      }
      setModalOpen(false);
    } catch {
      ue.error("Une erreur est survenue");
    }
  };
  const handleDelete = async (v) => {
    try {
      await deleteMutation.mutateAsync(v.id);
      ue.success("Véhicule supprimé");
      setDeleteConfirm(null);
    } catch {
      ue.error("Erreur lors de la suppression");
    }
  };
  const set = (k, val) => setForm((f) => ({ ...f, [k]: val }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminLayout, { title: "Véhicules", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        (vehicles == null ? void 0 : vehicles.length) ?? 0,
        " véhicule(s)"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: openCreate, "data-ocid": "add-vehicle-btn", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
        "Ajouter un véhicule"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/50 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3 font-medium text-muted-foreground", children: "Image" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3 font-medium text-muted-foreground", children: "Titre" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3 font-medium text-muted-foreground hidden md:table-cell", children: "Modèle" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3 font-medium text-muted-foreground hidden md:table-cell", children: "Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right p-3 font-medium text-muted-foreground hidden lg:table-cell", children: "Capacité" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right p-3 font-medium text-muted-foreground hidden lg:table-cell", children: "Prix/jour" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center p-3 font-medium text-muted-foreground hidden lg:table-cell", children: "Vedette" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right p-3 font-medium text-muted-foreground", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
        isLoading ? ["r0", "r1", "r2", "r3"].map((rk) => /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border", children: ["c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7"].map(
          (ck) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }) }, ck)
        ) }, rk)) : vehicles == null ? void 0 : vehicles.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: "border-b border-border last:border-0 hover:bg-muted/20 transition-colors",
            "data-ocid": "vehicle-row",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: v.images[0] ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: v.images[0].getDirectURL(),
                  alt: v.title,
                  className: "h-10 w-14 object-cover rounded-md"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-14 bg-muted rounded-md" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 font-medium text-foreground max-w-[160px] truncate", children: v.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-muted-foreground hidden md:table-cell", children: v.model }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 hidden md:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: VEHICLE_TYPE_LABELS[v.vehicleType] ?? v.vehicleType }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-right tabular-nums hidden lg:table-cell", children: v.capacity.toString() }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-right tabular-nums hidden lg:table-cell", children: Number(v.pricePerDay).toLocaleString("fr-FR") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-center hidden lg:table-cell", children: v.featured ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/10 text-primary border-primary/20", children: "Oui" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "—" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "icon",
                    onClick: () => openEdit(v),
                    "aria-label": "Modifier",
                    "data-ocid": "edit-vehicle-btn",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "icon",
                    onClick: () => setDeleteConfirm(v),
                    className: "text-destructive hover:text-destructive",
                    "aria-label": "Supprimer",
                    "data-ocid": "delete-vehicle-btn",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
                  }
                )
              ] }) })
            ]
          },
          v.id.toString()
        )),
        !isLoading && !(vehicles == null ? void 0 : vehicles.length) && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "td",
          {
            colSpan: 8,
            className: "p-8 text-center text-muted-foreground",
            "data-ocid": "empty-admin-vehicles",
            children: "Aucun véhicule. Ajoutez-en un !"
          }
        ) })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        isOpen: modalOpen,
        onClose: () => setModalOpen(false),
        title: editTarget ? "Modifier le véhicule" : "Ajouter un véhicule",
        size: "xl",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "form",
          {
            onSubmit: handleSubmit,
            className: "flex flex-col gap-4 max-h-[70vh] overflow-y-auto pr-1",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
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
                  InputField,
                  {
                    label: "Modèle",
                    required: true,
                    value: form.model,
                    onChange: (e) => set("model", e.target.value),
                    error: errors.model
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectField,
                  {
                    label: "Type",
                    options: TYPE_OPTIONS,
                    value: form.vehicleType,
                    onChange: (e) => set("vehicleType", e.target.value)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  InputField,
                  {
                    label: "Capacité (personnes)",
                    required: true,
                    type: "number",
                    min: "1",
                    value: form.capacity,
                    onChange: (e) => set("capacity", e.target.value),
                    error: errors.capacity
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  InputField,
                  {
                    label: "Prix/jour (FCFA)",
                    required: true,
                    type: "number",
                    min: "0",
                    value: form.pricePerDay,
                    onChange: (e) => set("pricePerDay", e.target.value),
                    error: errors.pricePerDay
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TextareaField,
                  {
                    label: "Description",
                    required: true,
                    value: form.description,
                    onChange: (e) => set("description", e.target.value),
                    error: errors.description,
                    rows: 3
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground mb-2", children: "Images" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: ["img0", "img1", "img2", "img3"].slice(0, Math.min(4, form.images.length + 1)).map((slotKey, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ImageUpload,
                    {
                      value: form.images[i] ?? null,
                      onChange: (blob) => {
                        const imgs = [...form.images];
                        if (blob) {
                          imgs[i] = blob;
                        } else {
                          imgs.splice(i, 1);
                        }
                        set("images", imgs);
                      }
                    },
                    slotKey
                  )) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Checkbox,
                    {
                      id: "featured-v",
                      checked: form.featured,
                      onCheckedChange: (v) => set("featured", !!v)
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "featured-v", children: "Mettre en vedette" })
                ] })
              ] }),
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
                    "data-ocid": "save-vehicle-btn",
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
  AdminVehiculesPage as default
};
