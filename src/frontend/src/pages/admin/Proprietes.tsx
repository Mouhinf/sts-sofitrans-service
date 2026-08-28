import { AdminLayout } from "@/components/AdminLayout";
import {
  AdminAddButton,
  AdminDataTable,
  AdminDeleteButton,
  AdminEditButton,
  DeleteConfirmDialog,
  FormModal,
  PROPERTY_TYPE_OPTIONS,
  PropertyForm,
  type PropertyFormState,
} from "@/components/admin";
import { formatFCFA } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import {
  useAdminCreateProperty,
  useAdminDeleteProperty,
  useAdminProperties,
  useAdminUpdateProperty,
} from "@/hooks/useBackend";
import type { Property, PropertyInput, PropertyType } from "@/types";
import { useState } from "react";
import { toast } from "sonner";

const PROPERTY_TYPE_LABELS = Object.fromEntries(
  PROPERTY_TYPE_OPTIONS.map((o) => [o.value, o.label]),
);

const EMPTY_FORM: PropertyFormState = {
  title: "",
  description: "",
  price: "",
  location: "",
  bedrooms: "0",
  bathrooms: "0",
  areaSqm: "0",
  propertyType: "house" as PropertyType,
  featured: false,
  images: [],
};

function toInput(f: PropertyFormState): PropertyInput {
  return {
    title: f.title,
    description: f.description,
    price: Number(f.price) || 0,
    location: f.location,
    bedrooms: Number(f.bedrooms) || 0,
    bathrooms: Number(f.bathrooms) || 0,
    areaSqm: Number(f.areaSqm) || 0,
    propertyType: f.propertyType as PropertyType,
    featured: f.featured,
    images: f.images,
  };
}

function fromEntity(p: Property): PropertyFormState {
  return {
    title: p.title,
    description: p.description,
    price: String(p.price),
    location: p.location,
    bedrooms: String(p.bedrooms),
    bathrooms: String(p.bathrooms),
    areaSqm: String(p.areaSqm),
    propertyType: p.propertyType,
    featured: p.featured,
    images: p.images,
  };
}

function validate(
  f: PropertyFormState,
): Partial<Record<keyof PropertyFormState, string>> {
  const errors: Partial<Record<keyof PropertyFormState, string>> = {};
  if (!f.title.trim()) errors.title = "Le titre est obligatoire";
  if (!f.description.trim())
    errors.description = "La description est obligatoire";
  if (!f.price || Number(f.price) <= 0)
    errors.price = "Le prix doit être positif";
  if (!f.location.trim()) errors.location = "La localisation est obligatoire";
  return errors;
}

export default function AdminProprietesPage() {
  const { data: properties, isLoading } = useAdminProperties();
  const createMutation = useAdminCreateProperty();
  const updateMutation = useAdminUpdateProperty();
  const deleteMutation = useAdminDeleteProperty();

  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Property | null>(null);
  const [form, setForm] = useState<PropertyFormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<
    Partial<Record<keyof PropertyFormState, string>>
  >({});
  const [deleteConfirm, setDeleteConfirm] = useState<Property | null>(null);

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  function openCreate() {
    setEditTarget(null);
    setForm(EMPTY_FORM);
    setErrors({});
    setModalOpen(true);
  }

  function openEdit(prop: Property) {
    setEditTarget(prop);
    setForm(fromEntity(prop));
    setErrors({});
    setModalOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    const input = toInput(form);
    try {
      if (editTarget) {
        await updateMutation.mutateAsync({ id: editTarget.id, ...input });
        toast.success("Propriété mise à jour");
      } else {
        await createMutation.mutateAsync(input);
        toast.success("Propriété créée");
      }
      setModalOpen(false);
    } catch {
      toast.error("Une erreur est survenue");
    }
  }

  async function handleDelete() {
    if (!deleteConfirm) return;
    try {
      await deleteMutation.mutateAsync(deleteConfirm.id);
      toast.success("Propriété supprimée");
      setDeleteConfirm(null);
    } catch {
      toast.error("Erreur lors de la suppression");
    }
  }

  return (
    <AdminLayout title="Propriétés">
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted-foreground">
          {properties?.length ?? 0} propriété(s)
        </p>
        <AdminAddButton onClick={openCreate} ocid="add-property-btn">
          Ajouter une propriété
        </AdminAddButton>
      </div>

      <AdminDataTable
        items={properties}
        isLoading={isLoading}
        rowOcid={() => "property-row"}
        getRowKey={(p) => p.id}
        emptyOcid="empty-admin-properties"
        emptyMessage="Aucune propriété. Ajoutez-en une !"
        skeletonCols={7}
        columns={[
          {
            key: "image",
            label: "Image",
            render: (p) =>
              p.images[0] ? (
                <img
                  src={p.images[0]?.url}
                  alt={p.title}
                  className="h-10 w-14 object-cover rounded-md"
                />
              ) : (
                <div className="h-10 w-14 bg-muted rounded-md" />
              ),
          },
          {
            key: "title",
            label: "Titre",
            render: (p) => (
              <span className="font-medium text-foreground max-w-[180px] truncate block">
                {p.title}
              </span>
            ),
          },
          {
            key: "location",
            label: "Localisation",
            className: "text-muted-foreground truncate max-w-[120px]",
            showOn: "md",
            render: (p) => p.location,
          },
          {
            key: "price",
            label: "Prix (FCFA)",
            className: "text-right tabular-nums",
            thClassName: "text-right",
            showOn: "md",
            render: (p) => formatFCFA(p.price),
          },
          {
            key: "type",
            label: "Type",
            showOn: "lg",
            render: (p) => (
              <Badge variant="outline">
                {PROPERTY_TYPE_LABELS[p.propertyType] ?? p.propertyType}
              </Badge>
            ),
          },
          {
            key: "featured",
            label: "Vedette",
            className: "text-center",
            thClassName: "text-center",
            showOn: "lg",
            render: (p) =>
              p.featured ? (
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  Oui
                </Badge>
              ) : (
                <span className="text-muted-foreground">—</span>
              ),
          },
        ]}
        renderActions={(p) => (
          <>
            <AdminEditButton
              onClick={() => openEdit(p)}
              ocid="edit-property-btn"
            />
            <AdminDeleteButton
              onClick={() => setDeleteConfirm(p)}
              ocid="delete-property-btn"
            />
          </>
        )}
      />

      <FormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editTarget ? "Modifier la propriété" : "Ajouter une propriété"}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitOcid="save-property-btn"
      >
        <PropertyForm value={form} onChange={setForm} errors={errors} />
      </FormModal>

      <DeleteConfirmDialog
        open={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={handleDelete}
        itemName={deleteConfirm?.title}
        entityLabel="cette propriété"
        isPending={deleteMutation.isPending}
      />
    </AdminLayout>
  );
}
