import { AdminLayout } from "@/components/AdminLayout";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { InputField } from "@/components/ui/InputField";
import { Modal } from "@/components/ui/Modal";
import { TextareaField } from "@/components/ui/TextareaField";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useAdminCreateTraining,
  useAdminDeleteTraining,
  useAdminTrainings,
  useAdminUpdateTraining,
} from "@/hooks/useBackend";
import type {
  ExternalBlob,
  Training,
  TrainingEnrollment,
  TrainingInput,
} from "@/types";
import {
  ChevronDown,
  ChevronUp,
  Pencil,
  Plus,
  Trash2,
  Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface FormState {
  title: string;
  description: string;
  durationDays: string;
  price: string;
  maxCapacity: string;
  image: ExternalBlob | null;
}

const EMPTY_FORM: FormState = {
  title: "",
  description: "",
  durationDays: "1",
  price: "",
  maxCapacity: "20",
  image: null,
};

function toInput(f: FormState): TrainingInput {
  return {
    title: f.title,
    description: f.description,
    durationDays: BigInt(Number(f.durationDays) || 1),
    price: BigInt(Number(f.price) || 0),
    maxCapacity: BigInt(Number(f.maxCapacity) || 20),
    image: f.image!,
  };
}

function validate(f: FormState): Partial<Record<keyof FormState, string>> {
  const errors: Partial<Record<keyof FormState, string>> = {};
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
  const createMutation = useAdminCreateTraining();
  const updateMutation = useAdminUpdateTraining();
  const deleteMutation = useAdminDeleteTraining();

  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Training | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const [deleteConfirm, setDeleteConfirm] = useState<Training | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const openCreate = () => {
    setEditTarget(null);
    setForm(EMPTY_FORM);
    setErrors({});
    setModalOpen(true);
  };

  const openEdit = (t: Training) => {
    setEditTarget(t);
    setForm({
      title: t.title,
      description: t.description,
      durationDays: t.durationDays.toString(),
      price: t.price.toString(),
      maxCapacity: t.maxCapacity.toString(),
      image: t.image,
    });
    setErrors({});
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
        toast.success("Formation mise à jour");
      } else {
        await createMutation.mutateAsync(input);
        toast.success("Formation créée");
      }
      setModalOpen(false);
    } catch {
      toast.error("Une erreur est survenue");
    }
  };

  const handleDelete = async (t: Training) => {
    try {
      await deleteMutation.mutateAsync(t.id);
      toast.success("Formation supprimée");
      setDeleteConfirm(null);
    } catch {
      toast.error("Erreur lors de la suppression");
    }
  };

  const set = (k: keyof FormState, v: FormState[keyof FormState]) =>
    setForm((f) => ({ ...f, [k]: v }));

  return (
    <AdminLayout title="Formations">
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted-foreground">
          {trainings?.length ?? 0} formation(s)
        </p>
        <Button onClick={openCreate} data-ocid="add-training-btn">
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle formation
        </Button>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left p-3 font-medium text-muted-foreground">
                  Titre
                </th>
                <th className="text-right p-3 font-medium text-muted-foreground hidden md:table-cell">
                  Durée (j)
                </th>
                <th className="text-right p-3 font-medium text-muted-foreground hidden md:table-cell">
                  Prix (FCFA)
                </th>
                <th className="text-right p-3 font-medium text-muted-foreground hidden lg:table-cell">
                  Capacité max
                </th>
                <th className="text-right p-3 font-medium text-muted-foreground hidden lg:table-cell">
                  Inscrits
                </th>
                <th className="text-right p-3 font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading
                ? ["r0", "r1", "r2"].map((rk) => (
                    <tr key={rk} className="border-b border-border">
                      {["c0", "c1", "c2", "c3", "c4", "c5"].map((ck) => (
                        <td key={ck} className="p-3">
                          <Skeleton className="h-4 w-full" />
                        </td>
                      ))}
                    </tr>
                  ))
                : trainings?.map((t) => {
                    const tid = t.id.toString();
                    const isExpanded = expandedId === tid;
                    return (
                      <>
                        <tr
                          key={tid}
                          className="border-b border-border hover:bg-muted/20 transition-colors"
                          data-ocid="training-row"
                        >
                          <td className="p-3 font-medium text-foreground">
                            {t.title}
                          </td>
                          <td className="p-3 text-right hidden md:table-cell">
                            {t.durationDays.toString()}
                          </td>
                          <td className="p-3 text-right tabular-nums hidden md:table-cell">
                            {Number(t.price).toLocaleString("fr-FR")}
                          </td>
                          <td className="p-3 text-right hidden lg:table-cell">
                            {t.maxCapacity.toString()}
                          </td>
                          <td className="p-3 text-right hidden lg:table-cell">
                            <span className="flex items-center justify-end gap-1">
                              <Users className="h-3 w-3 text-muted-foreground" />
                              {t.enrollments.length}
                            </span>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center justify-end gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  setExpandedId(isExpanded ? null : tid)
                                }
                                aria-label="Voir inscrits"
                                data-ocid="toggle-enrollments-btn"
                              >
                                {isExpanded ? (
                                  <ChevronUp className="h-4 w-4" />
                                ) : (
                                  <ChevronDown className="h-4 w-4" />
                                )}
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => openEdit(t)}
                                aria-label="Modifier"
                                data-ocid="edit-training-btn"
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setDeleteConfirm(t)}
                                className="text-destructive hover:text-destructive"
                                aria-label="Supprimer"
                                data-ocid="delete-training-btn"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                        {isExpanded && (
                          <tr
                            key={`${tid}-enrollments`}
                            className="border-b border-border bg-muted/20"
                          >
                            <td colSpan={6} className="px-6 py-3">
                              <p className="text-xs font-semibold text-foreground mb-2">
                                Inscrits à cette formation
                              </p>
                              <EnrollmentList enrollments={t.enrollments} />
                            </td>
                          </tr>
                        )}
                      </>
                    );
                  })}
              {!isLoading && !trainings?.length && (
                <tr>
                  <td
                    colSpan={6}
                    className="p-8 text-center text-muted-foreground"
                    data-ocid="empty-admin-trainings"
                  >
                    Aucune formation. Créez-en une !
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editTarget ? "Modifier la formation" : "Nouvelle formation"}
        size="lg"
      >
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto pr-1"
        >
          <InputField
            label="Titre"
            required
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            error={errors.title}
          />
          <TextareaField
            label="Description"
            required
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            error={errors.description}
            rows={3}
          />
          <div className="grid grid-cols-3 gap-4">
            <InputField
              label="Durée (jours)"
              required
              type="number"
              min="1"
              value={form.durationDays}
              onChange={(e) => set("durationDays", e.target.value)}
              error={errors.durationDays}
            />
            <InputField
              label="Prix (FCFA)"
              required
              type="number"
              min="0"
              value={form.price}
              onChange={(e) => set("price", e.target.value)}
              error={errors.price}
            />
            <InputField
              label="Capacité max"
              required
              type="number"
              min="1"
              value={form.maxCapacity}
              onChange={(e) => set("maxCapacity", e.target.value)}
              error={errors.maxCapacity}
            />
          </div>
          <ImageUpload
            label="Image"
            value={form.image}
            onChange={(blob) => set("image", blob)}
          />
          {errors.image && (
            <p className="text-xs text-destructive">{errors.image}</p>
          )}
          <div className="flex gap-3 pt-2 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={() => setModalOpen(false)}
              className="flex-1"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={createMutation.isPending || updateMutation.isPending}
              data-ocid="save-training-btn"
            >
              {createMutation.isPending || updateMutation.isPending
                ? "Enregistrement…"
                : "Enregistrer"}
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        title="Confirmer la suppression"
        size="sm"
      >
        <p className="text-sm text-muted-foreground mb-4">
          Supprimer <strong>{deleteConfirm?.title}</strong> ? Cette action est
          irréversible.
        </p>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => setDeleteConfirm(null)}
            className="flex-1"
          >
            Annuler
          </Button>
          <Button
            variant="destructive"
            onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
            disabled={deleteMutation.isPending}
            className="flex-1"
            data-ocid="confirm-delete-btn"
          >
            {deleteMutation.isPending ? "Suppression…" : "Supprimer"}
          </Button>
        </div>
      </Modal>
    </AdminLayout>
  );
}
