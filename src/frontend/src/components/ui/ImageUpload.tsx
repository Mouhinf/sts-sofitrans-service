import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Image as ImageIcon, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { ExternalBlob } from "../../backend";

interface ImageUploadProps {
  value?: ExternalBlob | null;
  onChange: (blob: ExternalBlob | null) => void;
  label?: string;
  className?: string;
  accept?: string;
}

export function ImageUpload({
  value,
  onChange,
  label,
  className,
  accept = "image/*",
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(
    value ? value.getDirectURL() : null,
  );
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const arrayBuffer = e.target?.result as ArrayBuffer;
      const bytes = new Uint8Array(arrayBuffer);
      const blob = ExternalBlob.fromBytes(bytes);
      setPreview(URL.createObjectURL(file));
      onChange(blob);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith("image/")) handleFile(file);
  };

  const handleRemove = () => {
    setPreview(null);
    onChange(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <span className="text-sm font-medium text-foreground">{label}</span>
      )}
      <button
        type="button"
        className={cn(
          "relative border-2 border-dashed rounded-lg transition-colors duration-200 cursor-pointer text-left w-full",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50",
          preview ? "p-2" : "p-8",
        )}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        aria-label={label ?? "Télécharger une image"}
        data-ocid="image-upload"
      >
        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Aperçu"
              className="w-full max-h-48 object-contain rounded-md"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-1 right-1 h-6 w-6"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
              aria-label="Supprimer l'image"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="p-3 rounded-full bg-muted">
              <ImageIcon className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                <span className="text-primary">Cliquer</span> ou glisser-déposer
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                PNG, JPG, WEBP jusqu'à 10 Mo
              </p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 text-sm border border-border rounded-md bg-muted pointer-events-none">
              <Upload className="h-4 w-4" />
              Choisir un fichier
            </div>
          </div>
        )}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="sr-only"
        onChange={handleInputChange}
        tabIndex={-1}
      />
    </div>
  );
}
