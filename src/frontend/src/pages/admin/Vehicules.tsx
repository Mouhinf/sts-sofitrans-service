import { AdminLayout } from "@/components/AdminLayout";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { InputField } from "@/components/ui/InputField";
import { Modal } from "@/components/ui/Modal";
import { SelectField } from "@/components/ui/SelectField";
import { TextareaField } from "@/components/ui/TextareaField";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useAdminCreateVehicle,
  useAdminDeleteVehicle,
  useAdminUpdateVehicle,
  useAdminVehicles,
} from "@/hooks/useBackend";
import type { ExternalBlob, Vehicle, VehicleInput, VehicleType } from "@/types";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const VEHICLE_TYPE_LABELS: Record<string, string> = {
  car: "Voiture",
  bus: "Bus",
  truck: "Camion",
  minibus: "Minibus",
};

const TYPE_OPTIONS = [
  { value: "car", label: "Voiture" },
  { value: "bus", label: "Bus" },
  { value: "truck", label: "Camion" },
  { value: "minibus", label: "Minibus" },
];

interface FormState {
  title: string;
  model: string;
  description: string;
  vehicleType: string;
  capacity: string;
  pricePerDay: string;
  featured: boolean;
  images: ExternalBlob[];
}

const EMPTY_FORM: FormState = {
  title: "",
  model: "",
  description: "",
  vehicleType: "car",
  capacity: "1",
  pricePerDay: "",
  featured: false,
  images: [],
};

function toInput(f: FormState): VehicleInput {
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

function validate(f: FormState): Partial<Record<keyof FormState, string>> {
  const errors: Partial<Record<keyof FormState, string>> = {};
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
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const [deleteConfirm, setDeleteConfirm] = useState<Vehicle | null>(null);

  const openCreate = () => {
    setEditTarget(null);
    setForm(EMPTY_FORM);
    setErrors({});
    setModalOpen(true);
  };

  const openEdit = (v: Vehicle) => {
    setEditTarget(v);
    setForm({
      title: v.title,
      model: v.model,
      description: v.description,
      vehicleType: v.vehicleType,
      capacity: v.capacity.toString(),
      pricePerDay: v.pricePerDay.toString(),
      featured: v.featured,
      images: v.images,
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
        toast.success("Véhicule mis à jour");
      } else {
        await createMutation.mutateAsync(input);
        toast.success("Véhicule créé");
      }
      setModalOpen(false);
    } catch {
      toast.error("Une erreur est survenue");
    }
  };

  const handleDelete = async (v: Vehicle) => {
    try {
      await deleteMutation.mutateAsync(v.id);
      toast.success("Véhicule supprimé");
      setDeleteConfirm(null);
    } catch {
      toast.error("Erreur lors de la suppression");
    }
  };

  const set = (k: keyof FormState, val: FormState[keyof FormState]) =>
    setForm((f) => ({ ...f, [k]: val }));

  return (
    <AdminLayout title="Véhicules">
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted-foreground">
          {vehicles?.length ?? 0} véhicule(s)
        </p>
        <Button onClick={openCreate} data-ocid="add-vehicle-btn">
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un véhicule
        </Button>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left p-3 font-medium text-muted-foreground">
                  Image
                </th>
                <th className="text-left p-3 font-medium text-muted-foreground">
                  Titre
                </th>
                <th className="text-left p-3 font-medium text-muted-foreground hidden md:table-cell">
                  Modèle
                </th>
                <th className="text-left p-3 font-medium text-muted-foreground hidden md:table-cell">
                  Type
                </th>
                <th className="text-right p-3 font-medium text-muted-foreground hidden lg:table-cell">
                  Capacité
                </th>
                <th className="text-right p-3 font-medium text-muted-foreground hidden lg:table-cell">
                  Prix/jour
                </th>
                <th className="text-center p-3 font-medium text-muted-foreground hidden lg:table-cell">
                  Vedette
                </th>
                <th className="text-right p-3 font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading
                ? ["r0", "r1", "r2", "r3"].map((rk) => (
                    <tr key={rk} className="border-b border-border">
                      {["c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7"].map(
                        (ck) => (
                          <td key={ck} className="p-3">
                            <Skeleton className="h-4 w-full" />
                          </td>
                        ),
                      )}
                    </tr>
                  ))
                : vehicles?.map((v) => (
                    <tr
                      key={v.id.toString()}
                      className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                      data-ocid="vehicle-row"
                    >
                      <td className="p-3">
                        {v.images[0] ? (
                          <img
                            src={v.images[0].getDirectURL()}
                            alt={v.title}
                            className="h-10 w-14 object-cover rounded-md"
                          />
                        ) : (
                          <div className="h-10 w-14 bg-muted rounded-md" />
                        )}
                      </td>
                      <td className="p-3 font-medium text-foreground max-w-[160px] truncate">
                        {v.title}
                      </td>
                      <td className="p-3 text-muted-foreground hidden md:table-cell">
                        {v.model}
                      </td>
                      <td className="p-3 hidden md:table-cell">
                        <Badge variant="outline">
                          {VEHICLE_TYPE_LABELS[v.vehicleType] ?? v.vehicleType}
                        </Badge>
                      </td>
                      <td className="p-3 text-right tabular-nums hidden lg:table-cell">
                        {v.capacity.toString()}
                      </td>
                      <td className="p-3 text-right tabular-nums hidden lg:table-cell">
                        {Number(v.pricePerDay).toLocaleString("fr-FR")}
                      </td>
                      <td className="p-3 text-center hidden lg:table-cell">
                        {v.featured ? (
                          <Badge className="bg-primary/10 text-primary border-primary/20">
                            Oui
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                      <td className="p-3">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEdit(v)}
                            aria-label="Modifier"
                            data-ocid="edit-vehicle-btn"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setDeleteConfirm(v)}
                            className="text-destructive hover:text-destructive"
                            aria-label="Supprimer"
                            data-ocid="delete-vehicle-btn"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
              {!isLoading && !vehicles?.length && (
                <tr>
                  <td
                    colSpan={8}
                    className="p-8 text-center text-muted-foreground"
                    data-ocid="empty-admin-vehicles"
                  >
                    Aucun véhicule. Ajoutez-en un !
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
        title={editTarget ? "Modifier le véhicule" : "Ajouter un véhicule"}
        size="xl"
      >
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto pr-1"
        >
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Titre"
              required
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              error={errors.title}
            />
            <InputField
              label="Modèle"
              required
              value={form.model}
              onChange={(e) => set("model", e.target.value)}
              error={errors.model}
            />
            <SelectField
              label="Type"
              options={TYPE_OPTIONS}
              value={form.vehicleType}
              onChange={(e) => set("vehicleType", e.target.value)}
            />
            <InputField
              label="Capacité (personnes)"
              required
              type="number"
              min="1"
              value={form.capacity}
              onChange={(e) => set("capacity", e.target.value)}
              error={errors.capacity}
            />
            <InputField
              label="Prix/jour (FCFA)"
              required
              type="number"
              min="0"
              value={form.pricePerDay}
              onChange={(e) => set("pricePerDay", e.target.value)}
              error={errors.pricePerDay}
            />
            <div />
            <div className="col-span-2">
              <TextareaField
                label="Description"
                required
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                error={errors.description}
                rows={3}
              />
            </div>
            <div className="col-span-2">
              <p className="text-sm font-medium text-foreground mb-2">Images</p>
              <div className="grid grid-cols-2 gap-3">
                {["img0", "img1", "img2", "img3"]
                  .slice(0, Math.min(4, form.images.length + 1))
                  .map((slotKey, i) => (
                    <ImageUpload
                      key={slotKey}
                      value={form.images[i] ?? null}
                      onChange={(blob) => {
                        const imgs = [...form.images];
                        if (blob) {
                          imgs[i] = blob;
                        } else {
                          imgs.splice(i, 1);
                        }
                        set("images", imgs);
                      }}
                    />
                  ))}
              </div>
            </div>
            <div className="col-span-2 flex items-center gap-2">
              <Checkbox
                id="featured-v"
                checked={form.featured}
                onCheckedChange={(v) => set("featured", !!v)}
              />
              <Label htmlFor="featured-v">Mettre en vedette</Label>
            </div>
          </div>
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
              data-ocid="save-vehicle-btn"
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
