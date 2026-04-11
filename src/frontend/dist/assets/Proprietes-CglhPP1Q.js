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
import { k as useAdminProperties, l as useAdminCreateProperty, m as useAdminUpdateProperty, n as useAdminDeleteProperty } from "./useBackend-DJ1gFwav.js";
import "./useAuth-DVc-f4-X.js";
import "./backend-gUdCIi-2.js";
import "./building-2-CWrEx0pq.js";
import "./truck-BuWQRKbv.js";
import "./graduation-cap-D0lJeyMd.js";
import "./message-square-D-yhUmMR.js";
import "./chevron-right-DwShqWtx.js";
const PROPERTY_TYPE_LABELS = {
  house: "Maison",
  apartment: "Appartement",
  land: "Terrain",
  office: "Bureau"
};
const TYPE_OPTIONS = [
  { value: "house", label: "Maison" },
  { value: "apartment", label: "Appartement" },
  { value: "land", label: "Terrain" },
  { value: "office", label: "Bureau" }
];
const EMPTY_FORM = {
  title: "",
  description: "",
  price: "",
  location: "",
  bedrooms: "0",
  bathrooms: "0",
  areaSqm: "0",
  propertyType: "house",
  featured: false,
  images: []
};
function toInput(f) {
  return {
    title: f.title,
    description: f.description,
    price: BigInt(Number(f.price) || 0),
    location: f.location,
    bedrooms: BigInt(Number(f.bedrooms) || 0),
    bathrooms: BigInt(Number(f.bathrooms) || 0),
    areaSqm: BigInt(Number(f.areaSqm) || 0),
    propertyType: f.propertyType,
    featured: f.featured,
    images: f.images
  };
}
function validate(f) {
  const errors = {};
  if (!f.title.trim()) errors.title = "Le titre est obligatoire";
  if (!f.description.trim())
    errors.description = "La description est obligatoire";
  if (!f.price || Number(f.price) <= 0)
    errors.price = "Le prix doit être positif";
  if (!f.location.trim()) errors.location = "La localisation est obligatoire";
  return errors;
}
function AdminProprietesPage() {
  const { data: properties, isLoading } = useAdminProperties();
  const createMutation = useAdminCreateProperty();
  const updateMutation = useAdminUpdateProperty();
  const deleteMutation = useAdminDeleteProperty();
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
  const openEdit = (prop) => {
    setEditTarget(prop);
    setForm({
      title: prop.title,
      description: prop.description,
      price: prop.price.toString(),
      location: prop.location,
      bedrooms: prop.bedrooms.toString(),
      bathrooms: prop.bathrooms.toString(),
      areaSqm: prop.areaSqm.toString(),
      propertyType: prop.propertyType,
      featured: prop.featured,
      images: prop.images
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
        ue.success("Propriété mise à jour");
      } else {
        await createMutation.mutateAsync(input);
        ue.success("Propriété créée");
      }
      setModalOpen(false);
    } catch {
      ue.error("Une erreur est survenue");
    }
  };
  const handleDelete = async (prop) => {
    try {
      await deleteMutation.mutateAsync(prop.id);
      ue.success("Propriété supprimée");
      setDeleteConfirm(null);
    } catch {
      ue.error("Erreur lors de la suppression");
    }
  };
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminLayout, { title: "Propriétés", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        (properties == null ? void 0 : properties.length) ?? 0,
        " propriété(s)"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: openCreate, "data-ocid": "add-property-btn", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
        "Ajouter une propriété"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/50 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3 font-medium text-muted-foreground", children: "Image" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3 font-medium text-muted-foreground", children: "Titre" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3 font-medium text-muted-foreground hidden md:table-cell", children: "Localisation" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right p-3 font-medium text-muted-foreground hidden md:table-cell", children: "Prix (FCFA)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left p-3 font-medium text-muted-foreground hidden lg:table-cell", children: "Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center p-3 font-medium text-muted-foreground hidden lg:table-cell", children: "Vedette" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right p-3 font-medium text-muted-foreground", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
        isLoading ? ["r0", "r1", "r2", "r3"].map((rk) => /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border", children: ["c0", "c1", "c2", "c3", "c4", "c5", "c6"].map((ck) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }) }, ck)) }, rk)) : properties == null ? void 0 : properties.map((prop) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: "border-b border-border last:border-0 hover:bg-muted/20 transition-colors",
            "data-ocid": "property-row",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: prop.images[0] ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: prop.images[0].getDirectURL(),
                  alt: prop.title,
                  className: "h-10 w-14 object-cover rounded-md"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-14 bg-muted rounded-md" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 font-medium text-foreground max-w-[180px] truncate", children: prop.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-muted-foreground hidden md:table-cell truncate max-w-[120px]", children: prop.location }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-right tabular-nums hidden md:table-cell", children: Number(prop.price).toLocaleString("fr-FR") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 hidden lg:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: PROPERTY_TYPE_LABELS[prop.propertyType] ?? prop.propertyType }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-center hidden lg:table-cell", children: prop.featured ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/10 text-primary border-primary/20", children: "Oui" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "—" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "icon",
                    onClick: () => openEdit(prop),
                    "aria-label": "Modifier",
                    "data-ocid": "edit-property-btn",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "icon",
                    onClick: () => setDeleteConfirm(prop),
                    className: "text-destructive hover:text-destructive",
                    "aria-label": "Supprimer",
                    "data-ocid": "delete-property-btn",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
                  }
                )
              ] }) })
            ]
          },
          prop.id.toString()
        )),
        !isLoading && !(properties == null ? void 0 : properties.length) && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "td",
          {
            colSpan: 7,
            className: "p-8 text-center text-muted-foreground",
            "data-ocid": "empty-admin-properties",
            children: "Aucune propriété. Ajoutez-en une !"
          }
        ) })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        isOpen: modalOpen,
        onClose: () => setModalOpen(false),
        title: editTarget ? "Modifier la propriété" : "Ajouter une propriété",
        size: "xl",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "form",
          {
            onSubmit: handleSubmit,
            className: "flex flex-col gap-4 max-h-[70vh] overflow-y-auto pr-1",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  InputField,
                  {
                    label: "Titre",
                    required: true,
                    value: form.title,
                    onChange: (e) => set("title", e.target.value),
                    error: errors.title
                  }
                ) }),
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
                    label: "Localisation",
                    required: true,
                    value: form.location,
                    onChange: (e) => set("location", e.target.value),
                    error: errors.location
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  InputField,
                  {
                    label: "Chambres",
                    type: "number",
                    min: "0",
                    value: form.bedrooms,
                    onChange: (e) => set("bedrooms", e.target.value)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  InputField,
                  {
                    label: "Salles de bain",
                    type: "number",
                    min: "0",
                    value: form.bathrooms,
                    onChange: (e) => set("bathrooms", e.target.value)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  InputField,
                  {
                    label: "Surface (m²)",
                    type: "number",
                    min: "0",
                    value: form.areaSqm,
                    onChange: (e) => set("areaSqm", e.target.value)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectField,
                  {
                    label: "Type",
                    options: TYPE_OPTIONS,
                    value: form.propertyType,
                    onChange: (e) => set("propertyType", e.target.value)
                  }
                ),
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
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground mb-2", children: "Images (max 5)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: ["img0", "img1", "img2", "img3", "img4"].slice(0, Math.min(5, form.images.length + 1)).map((slotKey, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
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
                      id: "featured-p",
                      checked: form.featured,
                      onCheckedChange: (v) => set("featured", !!v)
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "featured-p", children: "Mettre en vedette" })
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
                    "data-ocid": "save-property-btn",
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
  AdminProprietesPage as default
};
