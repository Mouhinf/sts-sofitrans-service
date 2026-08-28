import { ImageUpload } from "@/components/ui/ImageUpload";
import { InputField } from "@/components/ui/InputField";
import { TextareaField } from "@/components/ui/TextareaField";
import type { ExternalBlob } from "@/types";

export interface TrainingFormState {
  title: string;
  description: string;
  durationDays: string;
  price: string;
  maxCapacity: string;
  image: ExternalBlob | null;
}

interface TrainingFormProps {
  value: TrainingFormState;
  onChange: (next: TrainingFormState) => void;
  errors?: Partial<Record<keyof TrainingFormState, string>>;
}

export function TrainingForm({
  value,
  onChange,
  errors = {},
}: TrainingFormProps) {
  function set<K extends keyof TrainingFormState>(
    key: K,
    val: TrainingFormState[K],
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
      <InputField
        label="Durée (jours)"
        required
        type="number"
        min="1"
        value={value.durationDays}
        onChange={(e) => set("durationDays", e.target.value)}
        error={errors.durationDays}
      />
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
        label="Capacité max"
        required
        type="number"
        min="1"
        value={value.maxCapacity}
        onChange={(e) => set("maxCapacity", e.target.value)}
        error={errors.maxCapacity}
      />
      <div className="col-span-2">
        <p className="text-sm font-medium text-foreground mb-2">Image</p>
        <ImageUpload
          value={value.image}
          onChange={(blob) => set("image", blob)}
        />
        {errors.image ? (
          <p className="text-xs text-destructive mt-1" role="alert">
            {errors.image}
          </p>
        ) : null}
      </div>
    </div>
  );
}
