import { ImageUploads } from "@/components/admin/ImageUploads";
import { InputField } from "@/components/ui/InputField";
import { SelectField } from "@/components/ui/SelectField";
import { TextareaField } from "@/components/ui/TextareaField";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { ExternalBlob, PropertyType } from "@/types";

export interface PropertyFormState {
  title: string;
  description: string;
  price: string;
  location: string;
  bedrooms: string;
  bathrooms: string;
  areaSqm: string;
  propertyType: PropertyType;
  featured: boolean;
  images: ExternalBlob[];
}

export const PROPERTY_TYPE_OPTIONS = [
  { value: "house", label: "Maison" },
  { value: "apartment", label: "Appartement" },
  { value: "land", label: "Terrain" },
  { value: "office", label: "Bureau" },
] as const;

interface PropertyFormProps {
  value: PropertyFormState;
  onChange: (next: PropertyFormState) => void;
  errors?: Partial<Record<keyof PropertyFormState, string>>;
}

export function PropertyForm({
  value,
  onChange,
  errors = {},
}: PropertyFormProps) {
  function set<K extends keyof PropertyFormState>(
    key: K,
    val: PropertyFormState[K],
  ) {
    onChange({ ...value, [key]: val });
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-2">
        <InputField
          label="Titre"
          required
          value={value.title}
          onChange={(e) => set("title", e.target.value)}
          error={errors.title}
        />
      </div>
      <InputField
        label="Prix (FCFA)"
        required
        type="number"
        min="0"
        value={value.price}
        onChange={(e) => set("price", e.target.value)}
        error={errors.price}
      />
      <InputField
        label="Localisation"
        required
        value={value.location}
        onChange={(e) => set("location", e.target.value)}
        error={errors.location}
      />
      <InputField
        label="Chambres"
        type="number"
        min="0"
        value={value.bedrooms}
        onChange={(e) => set("bedrooms", e.target.value)}
      />
      <InputField
        label="Salles de bain"
        type="number"
        min="0"
        value={value.bathrooms}
        onChange={(e) => set("bathrooms", e.target.value)}
      />
      <InputField
        label="Surface (m²)"
        type="number"
        min="0"
        value={value.areaSqm}
        onChange={(e) => set("areaSqm", e.target.value)}
      />
      <SelectField
        label="Type"
        options={[...PROPERTY_TYPE_OPTIONS]}
        value={value.propertyType}
        onChange={(e) => set("propertyType", e.target.value as PropertyType)}
      />
      <div className="col-span-2">
        <TextareaField
          label="Description"
          required
          value={value.description}
          onChange={(e) => set("description", e.target.value)}
          error={errors.description}
          rows={3}
        />
      </div>
      <div className="col-span-2">
        <p className="text-sm font-medium text-foreground mb-2">
          Images (max 5)
        </p>
        <ImageUploads
          values={value.images}
          onChange={(imgs) => set("images", imgs)}
        />
      </div>
      <div className="col-span-2 flex items-center gap-2">
        <Checkbox
          id="featured-p"
          checked={value.featured}
          onCheckedChange={(v) => set("featured", !!v)}
        />
        <Label htmlFor="featured-p">Mettre en vedette</Label>
      </div>
    </div>
  );
}
