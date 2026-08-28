import { ImageUploads } from "@/components/admin/ImageUploads";
import { InputField } from "@/components/ui/InputField";
import { SelectField } from "@/components/ui/SelectField";
import { TextareaField } from "@/components/ui/TextareaField";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { ExternalBlob, VehicleType } from "@/types";

export interface VehicleFormState {
  title: string;
  model: string;
  description: string;
  vehicleType: VehicleType;
  capacity: string;
  pricePerDay: string;
  featured: boolean;
  images: ExternalBlob[];
}

export const VEHICLE_TYPE_OPTIONS = [
  { value: "car", label: "Voiture" },
  { value: "bus", label: "Bus" },
  { value: "truck", label: "Camion" },
  { value: "minibus", label: "Minibus" },
] as const;

interface VehicleFormProps {
  value: VehicleFormState;
  onChange: (next: VehicleFormState) => void;
  errors?: Partial<Record<keyof VehicleFormState, string>>;
}

export function VehicleForm({
  value,
  onChange,
  errors = {},
}: VehicleFormProps) {
  function set<K extends keyof VehicleFormState>(
    key: K,
    val: VehicleFormState[K],
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
        label="Modèle"
        required
        value={value.model}
        onChange={(e) => set("model", e.target.value)}
        error={errors.model}
      />
      <SelectField
        label="Type"
        options={[...VEHICLE_TYPE_OPTIONS]}
        value={value.vehicleType}
        onChange={(e) => set("vehicleType", e.target.value as VehicleType)}
      />
      <InputField
        label="Capacité (places)"
        required
        type="number"
        min="1"
        value={value.capacity}
        onChange={(e) => set("capacity", e.target.value)}
        error={errors.capacity}
      />
      <InputField
        label="Prix / jour (FCFA)"
        required
        type="number"
        min="0"
        value={value.pricePerDay}
        onChange={(e) => set("pricePerDay", e.target.value)}
        error={errors.pricePerDay}
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
          id="featured-v"
          checked={value.featured}
          onCheckedChange={(v) => set("featured", !!v)}
        />
        <Label htmlFor="featured-v">Mettre en vedette</Label>
      </div>
    </div>
  );
}
