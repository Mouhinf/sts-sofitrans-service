import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import type { ReactNode } from "react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: ReactNode;
  action?: ReactNode;
  /** Custom data-ocid for analytics hooks. */
  ocid?: string;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  ocid,
  className,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn(
        "flex flex-col items-center gap-4 py-20 text-center",
        className,
      )}
      data-ocid={ocid}
    >
      <Icon className="w-16 h-16 text-muted-foreground/40" aria-hidden="true" />
      <h3 className="text-xl font-display font-semibold text-foreground">
        {title}
      </h3>
      {description ? (
        <p className="text-muted-foreground max-w-sm">{description}</p>
      ) : null}
      {action ? <div className="mt-2">{action}</div> : null}
    </motion.div>
  );
}
