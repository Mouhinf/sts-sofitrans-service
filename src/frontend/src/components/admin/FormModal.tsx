import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";
import type { FormEvent, ReactNode } from "react";

interface FormModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  /** Form content (children). */
  children: ReactNode;
  /** Submit handler — wraps an HTML form. */
  onSubmit: (e: FormEvent) => void;
  isSubmitting?: boolean;
  /** Label of the submit button. Default: "Enregistrer". */
  submitLabel?: string;
  /** Label of the submit button while pending. Default: "Enregistrement…". */
  submittingLabel?: string;
  /** Modal size. */
  size?: "sm" | "md" | "lg" | "xl";
  /** A11y/analytics hook for the submit button. */
  submitOcid?: string;
  /** When true, the form body scrolls vertically. Default: true. */
  scrollBody?: boolean;
}

/**
 * Standard CRUD form modal. Wraps the children in a `<form>` and renders
 * a Cancel/Save footer. Use with `<DeleteConfirmDialog>` for the
 * confirmation step.
 */
export function FormModal({
  open,
  onClose,
  title,
  children,
  onSubmit,
  isSubmitting,
  submitLabel = "Enregistrer",
  submittingLabel = "Enregistrement…",
  size = "xl",
  submitOcid = "save-btn",
  scrollBody = true,
}: FormModalProps) {
  return (
    <Modal isOpen={open} onClose={onClose} title={title} size={size}>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div
          className={
            scrollBody
              ? "flex flex-col gap-4 max-h-[70vh] overflow-y-auto pr-1"
              : "flex flex-col gap-4"
          }
        >
          {children}
        </div>
        <div className="flex gap-3 pt-2 border-t border-border">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1"
            disabled={isSubmitting}
          >
            Annuler
          </Button>
          <Button
            type="submit"
            className="flex-1"
            disabled={isSubmitting}
            data-ocid={submitOcid}
          >
            {isSubmitting ? submittingLabel : submitLabel}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
