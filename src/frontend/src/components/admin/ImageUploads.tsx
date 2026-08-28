import { ImageUpload } from "@/components/ui/ImageUpload";
import type { ImageRef } from "@/types";

interface ImageUploadsProps {
  /** Current image refs. */
  values: ImageRef[];
  /** Max slots rendered. */
  max?: number;
  /** Called when the slot at `index` is set or cleared. */
  onChange: (next: ImageRef[]) => void;
  /** Prefix used for `data-ocid` attributes on each slot. */
  ocidPrefix?: string;
}

/**
 * Grid of `<ImageUpload>` slots. Always renders `max` slots; empty slots
 * are placeholder uploaders. New uploads append; clearing a slot removes
 * that index from the array.
 */
export function ImageUploads({
  values,
  max = 5,
  onChange,
  ocidPrefix = "property-image",
}: ImageUploadsProps) {
  const slotsToRender = Math.min(max, values.length + 1);
  return (
    <div className="grid grid-cols-2 gap-3">
      {Array.from({ length: slotsToRender }).map((_, i) => (
        <ImageUpload
          key={i}
          value={values[i] ?? null}
          ocidPrefix={`${ocidPrefix}-${i + 1}`}
          onChange={(ref) => {
            const next = [...values];
            if (ref) {
              next[i] = ref;
            } else {
              next.splice(i, 1);
            }
            onChange(next);
          }}
        />
      ))}
    </div>
  );
}
