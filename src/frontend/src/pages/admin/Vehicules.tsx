import { AdminLayout } from "@/components/AdminLayout";
import {
  AdminAddButton,
  AdminDataTable,
  AdminDeleteButton,
  AdminEditButton,
  DeleteConfirmDialog,
  FormModal,
  VEHICLE_TYPE_OPTIONS,
  VehicleForm,
  type VehicleFormState,
} from "@/components/admin";
import { formatFCFA } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import {
  useAdminCreateVehicle,
  useAdminDeleteVehicle,
  useAdminUpdateVehicle,
  useAdminVehicles,
} from "@/hooks/useBackend";
import type { Vehicle, VehicleInput, VehicleType } from "@/types";
import { useState } from "react";
import { toast } from "sonner";

const VEHICLE_TYPE_LABELS = Object.fromEntries(
  VEHICLE_TYPE_OPTIONS.map((o) => [o.value, o.label]),
);

const EMPTY_FORM: VehicleFormState = {
  title: "",
  model: "",
  description: "",
  vehicleType: "car" as VehicleType,
  capacity: "1",
  pricePerDay: "",
  featured: false,
  images: [],
};

function toInput(f: VehicleFormState): VehicleInput {
  return {
    title: f.title,
    model: f.model,
    description: f.description,
    vehicleType: f.vehicleType as VehicleType,
    capacity: BigInt(Number(f.capacity) || 1),
    pricePerDay: BigInt(Number(f.pricePerDay) || 0),
    featured: f.featured,
    images: f.images,
  };
}

function fromEntity(v: Vehicle): VehicleFormState {
  return {
    title: v.title,
    model: v.model,
    description: v.description,
    vehicleType: v.vehicleType,
    capacity: v.capacity.toString(),
    pricePerDay: v.pricePerDay.toString(),
    featured: v.featured,
    images: v.images,
  };
}

function validate(
  f: VehicleFormState,
): Partial<Record<keyof VehicleFormState, string>> {
  const errors: Partial<Record<keyof VehicleFormState, string>> = {};
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

export default function AdminVehiculesPage() {
  const { data: vehicles, isLoading } = useAdminVehicles();
  const createMutation = useAdminCreateVehicle();
  const updateMutation = useAdminUpdateVehicle();
  const deleteMutation = useAdminDeleteVehicle();

  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Vehicle | null>(null);
  const [form, setForm] = useState<VehicleFormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<
    Partial<Record<keyof VehicleFormState, string>>
  >({});
  const [deleteConfirm, setDeleteConfirm] = useState<Vehicle | null>(null);

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  function openCreate() {
    setEditTarget(null);
    setForm(EMPTY_FORM);
    setErrors({});
    setModalOpen(true);
  }

  function openEdit(v: Vehicle) {
    setEditTarget(v);
    setForm(fromEntity(v));
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
        await updateMutation.mutateAsync({ id: editTarget.id, input });
        toast.success("Véhicule mis à jour");
      } else {
        await createMutation.mutateAsync(input);
        toast.success("Véhicule créé");
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
      toast.success("Véhicule supprimé");
      setDeleteConfirm(null);
    } catch {
      toast.error("Erreur lors de la suppression");
    }
  }

  return (
    <AdminLayout title="Véhicules">
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted-foreground">
          {vehicles?.length ?? 0} véhicule(s)
        </p>
        <AdminAddButton onClick={openCreate} ocid="add-vehicle-btn">
          Ajouter un véhicule
        </AdminAddButton>
      </div>

      <AdminDataTable
        items={vehicles}
        isLoading={isLoading}
        rowOcid={() => "vehicle-row"}
        getRowKey={(v) => v.id.toString()}
        emptyOcid="empty-admin-vehicles"
        emptyMessage="Aucun véhicule. Ajoutez-en un !"
        skeletonCols={8}
        columns={[
          {
            key: "image",
            label: "Image",
            render: (v) =>
              v.images[0] ? (
                <img
                  src={v.images[0].getDirectURL()}
                  alt={v.title}
                  className="h-10 w-14 object-cover rounded-md"
                />
              ) : (
                <div className="h-10 w-14 bg-muted rounded-md" />
              ),
          },
          {
            key: "title",
            label: "Titre",
            render: (v) => (
              <span className="font-medium text-foreground max-w-[160px] truncate block">
                {v.title}
              </span>
            ),
          },
          {
            key: "model",
            label: "Modèle",
            className: "text-muted-foreground",
            showOn: "md",
            render: (v) => v.model,
          },
          {
            key: "type",
            label: "Type",
            showOn: "md",
            render: (v) => (
              <Badge variant="outline">
                {VEHICLE_TYPE_LABELS[v.vehicleType] ?? v.vehicleType}
              </Badge>
            ),
          },
          {
            key: "capacity",
            label: "Capacité",
            className: "text-right tabular-nums",
            thClassName: "text-right",
            showOn: "lg",
            render: (v) => v.capacity.toString(),
          },
          {
            key: "price",
            label: "Prix/jour",
            className: "text-right tabular-nums",
            thClassName: "text-right",
            showOn: "lg",
            render: (v) => formatFCFA(v.pricePerDay),
          },
          {
            key: "featured",
            label: "Vedette",
            className: "text-center",
            thClassName: "text-center",
            showOn: "lg",
            render: (v) =>
              v.featured ? (
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  Oui
                </Badge>
              ) : (
                <span className="text-muted-foreground">—</span>
              ),
          },
        ]}
        renderActions={(v) => (
          <>
            <AdminEditButton
              onClick={() => openEdit(v)}
              ocid="edit-vehicle-btn"
            />
            <AdminDeleteButton
              onClick={() => setDeleteConfirm(v)}
              ocid="delete-vehicle-btn"
            />
          </>
        )}
      />

      <FormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editTarget ? "Modifier le véhicule" : "Ajouter un véhicule"}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitOcid="save-vehicle-btn"
      >
        <VehicleForm value={form} onChange={setForm} errors={errors} />
      </FormModal>

      <DeleteConfirmDialog
        open={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={handleDelete}
        itemName={deleteConfirm?.title}
        entityLabel="ce véhicule"
        isPending={deleteMutation.isPending}
      />
    </AdminLayout>
  );
}
