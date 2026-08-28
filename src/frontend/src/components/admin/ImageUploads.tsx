import { ImageUpload } from "@/components/ui/ImageUpload";
import type { ExternalBlob } from "@/types";

interface ImageUploadsProps {
  /** Current image blobs. */
  values: ExternalBlob[];
  /** Max slots rendered. */
  max?: number;
  /** Called when the slot at `index` is set or cleared. */
  onChange: (next: ExternalBlob[]) => void;
}

/**
 * Grid of `<ImageUpload>` slots. Always renders `max` slots; empty slots
 * are placeholder uploaders. New uploads append; clearing a slot removes
 * that index from the array.
 */
export function ImageUploads({ values, max = 5, onChange }: ImageUploadsProps) {
  const slotsToRender = Math.min(max, values.length + 1);
  return (
    <div className="grid grid-cols-2 gap-3">
      {Array.from({ length: slotsToRender }).map((_, i) => (
        <ImageUpload
          key={i}
          value={values[i] ?? null}
          onChange={(blob) => {
            const next = [...values];
            if (blob) {
              next[i] = blob;
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
