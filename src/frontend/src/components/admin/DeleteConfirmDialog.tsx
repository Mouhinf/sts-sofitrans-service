import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";

interface DeleteConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName?: string;
  /** What is being deleted (e.g. "cette propriété"). */
  entityLabel?: string;
  isPending?: boolean;
  ocid?: string;
}

/**
 * Standard "are you sure you want to delete X?" dialog used across the
 * admin CRUD pages. Keeps copy consistent and centralises the destructive
 * action styling.
 */
export function DeleteConfirmDialog({
  open,
  onClose,
  onConfirm,
  itemName,
  entityLabel = "cet élément",
  isPending,
  ocid = "confirm-delete-btn",
}: DeleteConfirmDialogProps) {
  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      title="Confirmer la suppression"
      size="sm"
    >
      <p className="text-sm text-muted-foreground mb-4">
        Supprimer <strong>{itemName ?? entityLabel}</strong> ? Cette action est
        irréversible.
      </p>
      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={onClose}
          className="flex-1"
          disabled={isPending}
        >
          Annuler
        </Button>
        <Button
          variant="destructive"
          onClick={onConfirm}
          disabled={isPending}
          className="flex-1"
          data-ocid={ocid}
        >
          {isPending ? "Suppression…" : "Supprimer"}
        </Button>
      </div>
    </Modal>
  );
}
