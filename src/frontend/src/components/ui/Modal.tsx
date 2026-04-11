import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeMap = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-2xl",
};

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  className,
  size = "md",
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <dialog
      open
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-transparent"
      aria-labelledby={title ? "modal-title" : undefined}
      data-ocid="modal-overlay"
    >
      <div
        className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        aria-label="Fermer la modale"
      />
      <div
        className={cn(
          "relative z-10 w-full bg-card rounded-lg shadow-elevated border border-border",
          "animate-in fade-in zoom-in-95 duration-200",
          sizeMap[size],
          className,
        )}
      >
        {title && (
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2
              id="modal-title"
              className="text-lg font-semibold font-display text-foreground"
            >
              {title}
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              aria-label="Fermer"
              data-ocid="modal-close"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
        {!title && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-3 right-3 z-10"
            aria-label="Fermer"
            data-ocid="modal-close"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        <div className="p-6">{children}</div>
      </div>
    </dialog>
  );
}
