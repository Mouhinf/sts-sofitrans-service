import { AdminLayout } from "@/components/AdminLayout";
import {
  AdminAddButton,
  AdminDataTable,
  AdminDeleteButton,
  AdminEditButton,
  DeleteConfirmDialog,
  FormModal,
  TrainingForm,
  type TrainingFormState,
} from "@/components/admin";
import { formatFCFA } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  useCreateTraining,
  useDeleteTraining,
  useAdminTrainings,
  useUpdateTraining,
} from "@/hooks/useBackend";
import type {
  ImageRef,
  Training,
  TrainingEnrollment,
  TrainingInput,
} from "@/types";
import { ChevronDown, ChevronUp, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const EMPTY_FORM: TrainingFormState = {
  title: "",
  description: "",
  durationDays: "1",
  price: "",
  maxCapacity: "20",
  image: null,
};

function toInput(f: TrainingFormState): TrainingInput {
  return {
    title: f.title,
    description: f.description,
    durationDays: Number(f.durationDays) || 1,
    price: Number(f.price) || 0,
    maxCapacity: Number(f.maxCapacity) || 20,
    imageUrl: f.image?.url ?? "",
    imagePublicId: f.image?.publicId ?? "",
  };
}

function fromEntity(t: Training): TrainingFormState {
  return {
    title: t.title,
    description: t.description,
    durationDays: String(t.durationDays),
    price: String(t.price),
    maxCapacity: String(t.maxCapacity),
    image: t.imageUrl ? { url: t.imageUrl, publicId: t.imagePublicId ?? "" } : null,
  };
}

function validate(
  f: TrainingFormState,
): Partial<Record<keyof TrainingFormState, string>> {
  const errors: Partial<Record<keyof TrainingFormState, string>> = {};
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
  enrollments,
}: { enrollments: TrainingEnrollment[] }) {
  if (!enrollments.length) {
    return (
      <p className="text-xs text-muted-foreground py-2">Aucune inscription</p>
    );
  }
  return (
    <table className="w-full text-xs">
      <thead>
        <tr className="text-left text-muted-foreground border-b border-border">
          <th className="py-1 pr-3 font-medium">Nom</th>
          <th className="py-1 pr-3 font-medium">Email</th>
          <th className="py-1 font-medium">Téléphone</th>
        </tr>
      </thead>
      <tbody>
        {enrollments.map((e) => (
          <tr
            key={`${e.email}-${e.name}`}
            className="border-b border-border last:border-0"
          >
            <td className="py-1.5 pr-3">{e.name}</td>
            <td className="py-1.5 pr-3 text-muted-foreground">{e.email}</td>
            <td className="py-1.5 text-muted-foreground">{e.phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function AdminFormationsPage() {
  const { data: trainings, isLoading } = useAdminTrainings();
  const createMutation = useCreateTraining();
  const updateMutation = useUpdateTraining();
  const deleteMutation = useDeleteTraining();

  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Training | null>(null);
  const [form, setForm] = useState<TrainingFormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<
    Partial<Record<keyof TrainingFormState, string>>
  >({});
  const [deleteConfirm, setDeleteConfirm] = useState<Training | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  function openCreate() {
    setEditTarget(null);
    setForm(EMPTY_FORM);
    setErrors({});
    setModalOpen(true);
  }

  function openEdit(t: Training) {
    setEditTarget(t);
    setForm(fromEntity(t));
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
        toast.success("Formation mise à jour");
      } else {
        await createMutation.mutateAsync(input);
        toast.success("Formation créée");
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
      toast.success("Formation supprimée");
      setDeleteConfirm(null);
    } catch {
      toast.error("Erreur lors de la suppression");
    }
  }

  return (
    <AdminLayout title="Formations">
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted-foreground">
          {trainings?.length ?? 0} formation(s)
        </p>
        <AdminAddButton onClick={openCreate} ocid="add-training-btn">
          Nouvelle formation
        </AdminAddButton>
      </div>

      <AdminDataTable
        items={trainings}
        isLoading={isLoading}
        rowOcid={() => "training-row"}
        getRowKey={(t) => t.id}
        emptyOcid="empty-admin-trainings"
        emptyMessage="Aucune formation. Créez-en une !"
        skeletonCols={6}
        columns={[
          {
            key: "image",
            label: "Image",
            render: (t) =>
              t.imageUrl ? (
                <img
                  src={t.imageUrl}
                  alt={t.title}
                  className="h-10 w-14 object-cover rounded-md"
                />
              ) : (
                <div className="h-10 w-14 bg-muted rounded-md" />
              ),
          },
          {
            key: "title",
            label: "Titre",
            render: (t) => (
              <span className="font-medium text-foreground max-w-[180px] truncate block">
                {t.title}
              </span>
            ),
          },
          {
            key: "duration",
            label: "Durée",
            className: "text-right tabular-nums",
            thClassName: "text-right",
            showOn: "md",
            render: (t) => `${String(t.durationDays)} j`,
          },
          {
            key: "price",
            label: "Prix",
            className: "text-right tabular-nums",
            thClassName: "text-right",
            showOn: "md",
            render: (t) => formatFCFA(t.price),
          },
          {
            key: "capacity",
            label: "Inscrits",
            className: "text-center",
            thClassName: "text-center",
            showOn: "lg",
            render: (t) => (
              <Badge variant="outline" className="gap-1">
                <Users className="h-3 w-3" />
                {t.enrollments?.length ?? 0}/{String(t.maxCapacity)}
              </Badge>
            ),
          },
        ]}
        renderActions={(t) => (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                setExpandedId((id) =>
                  id === t.id ? null : t.id,
                )
              }
              aria-label="Voir les inscrits"
              data-ocid="view-enrollments-btn"
            >
              {expandedId === t.id ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
            <AdminEditButton
              onClick={() => openEdit(t)}
              ocid="edit-training-btn"
            />
            <AdminDeleteButton
              onClick={() => setDeleteConfirm(t)}
              ocid="delete-training-btn"
            />
          </>
        )}
      />

      {expandedId
        ? (() => {
            const t = trainings?.find((x) => x.id === expandedId);
            if (!t) return null;
            return (
              <div className="mt-4 bg-card border border-border rounded-xl p-4">
                <h3 className="text-sm font-semibold mb-2">
                  Inscrits à cette formation
                </h3>
                <EnrollmentList enrollments={t.enrollments ?? []} />
              </div>
            );
          })()
        : null}

      <FormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editTarget ? "Modifier la formation" : "Nouvelle formation"}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitOcid="save-training-btn"
      >
        <TrainingForm value={form} onChange={setForm} errors={errors} />
      </FormModal>

      <DeleteConfirmDialog
        open={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={handleDelete}
        itemName={deleteConfirm?.title}
        entityLabel="cette formation"
        isPending={deleteMutation.isPending}
      />
    </AdminLayout>
  );
}
