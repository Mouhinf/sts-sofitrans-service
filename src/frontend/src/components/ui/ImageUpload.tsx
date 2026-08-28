import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ImageRef } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { Image as ImageIcon, Loader2, Upload, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { request } from "@/lib/apiClient";

interface ImageUploadProps {
  value?: ImageRef | null;
  onChange: (ref: ImageRef | null) => void;
  label?: string;
  className?: string;
  accept?: string;
  ocidPrefix?: string;
}

export function ImageUpload({
  value,
  onChange,
  label,
  className,
  accept = "image/*",
  ocidPrefix = "image-upload",
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(value?.url ?? null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setPreview(value?.url ?? null);
  }, [value?.url]);

  const uploadMutation = useMutation<ImageRef, Error, File>({
    mutationFn: async (file) => {
      const form = new FormData();
      form.append("file", file);
      return request<ImageRef>(`/api/upload`, {
        method: "POST",
        body: form,
        auth: true,
      });
    },
  });

  const handleFile = async (file: File) => {
    setError(null);
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    try {
      const result = await uploadMutation.mutateAsync(file);
      onChange({ url: result.url, publicId: result.publicId ?? "" });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Échec du téléchargement de l'image",
      );
      setPreview(value?.url ?? null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) void handleFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith("image/")) void handleFile(file);
  };

  const handleRemove = () => {
    setPreview(null);
    setError(null);
    onChange(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const isUploading = uploadMutation.isPending;

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
        data-ocid={`${ocidPrefix}-target`}
      >
        {preview ? (
          <div className="flex items-center gap-3">
            <img
              src={preview}
              alt="Aperçu"
              className="h-20 w-28 object-cover rounded-md border border-border"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground">
                Image téléchargée
                {value?.publicId ? (
                  <span className="text-muted-foreground"> · {value.publicId}</span>
                ) : null}
              </p>
              {isUploading && (
                <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-1">
                  <Loader2 className="h-3 w-3 animate-spin" /> Envoi en cours...
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center gap-2">
            {isUploading ? (
              <Loader2 className="h-7 w-7 text-primary animate-spin" />
            ) : (
              <div className="p-3 rounded-full bg-primary/10">
                <Upload className="h-5 w-5 text-primary" />
              </div>
            )}
            <p className="text-sm font-medium text-foreground">
              {isUploading ? "Envoi en cours..." : "Glissez-déposez ou cliquez"}
            </p>
            <p className="text-xs text-muted-foreground">
              PNG, JPG, WebP · 10 Mo max
            </p>
          </div>
        )}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleInputChange}
        className="hidden"
        data-ocid={`${ocidPrefix}-input`}
      />
      <div className="flex items-center justify-between gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => inputRef.current?.click()}
          disabled={isUploading}
          data-ocid={`${ocidPrefix}-button`}
        >
          <ImageIcon className="h-4 w-4 mr-1.5" />
          {preview ? "Remplacer" : "Choisir une image"}
        </Button>
        {preview && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleRemove}
            disabled={isUploading}
            data-ocid={`${ocidPrefix}-remove`}
          >
            <X className="h-4 w-4 mr-1.5" /> Retirer
          </Button>
        )}
      </div>
      {error && (
        <p className="text-xs text-destructive" data-ocid={`${ocidPrefix}-error`} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
