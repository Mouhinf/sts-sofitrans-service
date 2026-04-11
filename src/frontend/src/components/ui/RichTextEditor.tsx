import { useMemo } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  error?: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
}

const MODULES = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote", "code-block"],
    ["link", "image"],
    [{ align: [] }],
    ["clean"],
  ],
};

const FORMATS = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "blockquote",
  "code-block",
  "link",
  "image",
  "align",
];

export function RichTextEditor({
  value,
  onChange,
  label,
  error,
  placeholder,
  className,
  required,
}: RichTextEditorProps) {
  const labelId = useMemo(
    () => label?.toLowerCase().replace(/\s+/g, "-"),
    [label],
  );

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <Label
          htmlFor={labelId}
          className="text-sm font-medium text-foreground"
        >
          {label}
          {required && (
            <span className="ml-1 text-destructive" aria-hidden="true">
              *
            </span>
          )}
        </Label>
      )}
      <div
        className={cn(
          "rounded-md border overflow-hidden",
          error ? "border-destructive" : "border-input",
          "[&_.ql-toolbar]:bg-muted [&_.ql-toolbar]:border-border",
          "[&_.ql-container]:border-border [&_.ql-container]:bg-background",
          "[&_.ql-editor]:min-h-[200px] [&_.ql-editor]:text-foreground",
          "[&_.ql-editor.ql-blank::before]:text-muted-foreground",
        )}
        data-ocid="rich-text-editor"
      >
        <ReactQuill
          theme="snow"
          value={value}
          onChange={onChange}
          modules={MODULES}
          formats={FORMATS}
          placeholder={placeholder ?? "Entrez votre contenu ici..."}
        />
      </div>
      {error && (
        <p className="text-xs text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
