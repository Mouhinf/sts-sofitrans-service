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
  useAdminCreateProperty,
  useAdminDeleteProperty,
  useAdminProperties,
  useAdminUpdateProperty,
} from "@/hooks/useBackend";
import type {
  ExternalBlob,
  Property,
  PropertyInput,
  PropertyType,
} from "@/types";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const PROPERTY_TYPE_LABELS: Record<string, string> = {
  house: "Maison",
  apartment: "Appartement",
  land: "Terrain",
  office: "Bureau",
};

const TYPE_OPTIONS = [
  { value: "house", label: "Maison" },
  { value: "apartment", label: "Appartement" },
  { value: "land", label: "Terrain" },
  { value: "office", label: "Bureau" },
];

interface FormState {
  title: string;
  description: string;
  price: string;
  location: string;
  bedrooms: string;
  bathrooms: string;
  areaSqm: string;
  propertyType: string;
  featured: boolean;
  images: ExternalBlob[];
}

const EMPTY_FORM: FormState = {
  title: "",
  description: "",
  price: "",
  location: "",
  bedrooms: "0",
  bathrooms: "0",
  areaSqm: "0",
  propertyType: "house",
  featured: false,
  images: [],
};

function toInput(f: FormState): PropertyInput {
  return {
    title: f.title,
    description: f.description,
    price: BigInt(Number(f.price) || 0),
    location: f.location,
    bedrooms: BigInt(Number(f.bedrooms) || 0),
    bathrooms: BigInt(Number(f.bathrooms) || 0),
    areaSqm: BigInt(Number(f.areaSqm) || 0),
    propertyType: f.propertyType as PropertyType,
    featured: f.featured,
    images: f.images,
  };
}

function validate(f: FormState): Partial<Record<keyof FormState, string>> {
  const errors: Partial<Record<keyof FormState, string>> = {};
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
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const [deleteConfirm, setDeleteConfirm] = useState<Property | null>(null);

  const openCreate = () => {
    setEditTarget(null);
    setForm(EMPTY_FORM);
    setErrors({});
    setModalOpen(true);
  };

  const openEdit = (prop: Property) => {
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
      images: prop.images,
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
        toast.success("Propriété mise à jour");
      } else {
        await createMutation.mutateAsync(input);
        toast.success("Propriété créée");
      }
      setModalOpen(false);
    } catch {
      toast.error("Une erreur est survenue");
    }
  };

  const handleDelete = async (prop: Property) => {
    try {
      await deleteMutation.mutateAsync(prop.id);
      toast.success("Propriété supprimée");
      setDeleteConfirm(null);
    } catch {
      toast.error("Erreur lors de la suppression");
    }
  };

  const set = (k: keyof FormState, v: FormState[keyof FormState]) =>
    setForm((f) => ({ ...f, [k]: v }));

  return (
    <AdminLayout title="Propriétés">
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted-foreground">
          {properties?.length ?? 0} propriété(s)
        </p>
        <Button onClick={openCreate} data-ocid="add-property-btn">
          <Plus className="h-4 w-4 mr-2" />
          Ajouter une propriété
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
                  Localisation
                </th>
                <th className="text-right p-3 font-medium text-muted-foreground hidden md:table-cell">
                  Prix (FCFA)
                </th>
                <th className="text-left p-3 font-medium text-muted-foreground hidden lg:table-cell">
                  Type
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
                      {["c0", "c1", "c2", "c3", "c4", "c5", "c6"].map((ck) => (
                        <td key={ck} className="p-3">
                          <Skeleton className="h-4 w-full" />
                        </td>
                      ))}
                    </tr>
                  ))
                : properties?.map((prop) => (
                    <tr
                      key={prop.id.toString()}
                      className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                      data-ocid="property-row"
                    >
                      <td className="p-3">
                        {prop.images[0] ? (
                          <img
                            src={prop.images[0].getDirectURL()}
                            alt={prop.title}
                            className="h-10 w-14 object-cover rounded-md"
                          />
                        ) : (
                          <div className="h-10 w-14 bg-muted rounded-md" />
                        )}
                      </td>
                      <td className="p-3 font-medium text-foreground max-w-[180px] truncate">
                        {prop.title}
                      </td>
                      <td className="p-3 text-muted-foreground hidden md:table-cell truncate max-w-[120px]">
                        {prop.location}
                      </td>
                      <td className="p-3 text-right tabular-nums hidden md:table-cell">
                        {Number(prop.price).toLocaleString("fr-FR")}
                      </td>
                      <td className="p-3 hidden lg:table-cell">
                        <Badge variant="outline">
                          {PROPERTY_TYPE_LABELS[prop.propertyType] ??
                            prop.propertyType}
                        </Badge>
                      </td>
                      <td className="p-3 text-center hidden lg:table-cell">
                        {prop.featured ? (
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
                            onClick={() => openEdit(prop)}
                            aria-label="Modifier"
                            data-ocid="edit-property-btn"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setDeleteConfirm(prop)}
                            className="text-destructive hover:text-destructive"
                            aria-label="Supprimer"
                            data-ocid="delete-property-btn"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
              {!isLoading && !properties?.length && (
                <tr>
                  <td
                    colSpan={7}
                    className="p-8 text-center text-muted-foreground"
                    data-ocid="empty-admin-properties"
                  >
                    Aucune propriété. Ajoutez-en une !
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
        title={editTarget ? "Modifier la propriété" : "Ajouter une propriété"}
        size="xl"
      >
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto pr-1"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <InputField
                label="Titre"
                required
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                error={errors.title}
              />
            </div>
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
              label="Localisation"
              required
              value={form.location}
              onChange={(e) => set("location", e.target.value)}
              error={errors.location}
            />
            <InputField
              label="Chambres"
              type="number"
              min="0"
              value={form.bedrooms}
              onChange={(e) => set("bedrooms", e.target.value)}
            />
            <InputField
              label="Salles de bain"
              type="number"
              min="0"
              value={form.bathrooms}
              onChange={(e) => set("bathrooms", e.target.value)}
            />
            <InputField
              label="Surface (m²)"
              type="number"
              min="0"
              value={form.areaSqm}
              onChange={(e) => set("areaSqm", e.target.value)}
            />
            <SelectField
              label="Type"
              options={TYPE_OPTIONS}
              value={form.propertyType}
              onChange={(e) => set("propertyType", e.target.value)}
            />
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
              <p className="text-sm font-medium text-foreground mb-2">
                Images (max 5)
              </p>
              <div className="grid grid-cols-2 gap-3">
                {["img0", "img1", "img2", "img3", "img4"]
                  .slice(0, Math.min(5, form.images.length + 1))
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
                id="featured-p"
                checked={form.featured}
                onCheckedChange={(v) => set("featured", !!v)}
              />
              <Label htmlFor="featured-p">Mettre en vedette</Label>
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
              data-ocid="save-property-btn"
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
