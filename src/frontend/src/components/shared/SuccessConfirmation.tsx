import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import type { ReactNode } from "react";

interface SuccessConfirmationProps {
  title: string;
  description?: ReactNode;
  icon?: typeof CheckCircle2;
  iconClassName?: string;
  ocid?: string;
}

export function SuccessConfirmation({
  title,
  description,
  icon: Icon = CheckCircle2,
  iconClassName,
  ocid = "form-success",
}: SuccessConfirmationProps) {
  return (
    <motion.output
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn("flex flex-col items-center gap-4 py-6 text-center")}
      data-ocid={ocid}
      aria-live="polite"
    >
      <Icon
        className={cn("w-12 h-12 text-primary", iconClassName)}
        aria-hidden="true"
      />
      <h3 className="text-xl font-display font-bold text-foreground">
        {title}
      </h3>
      {description ? (
        <p className="text-muted-foreground max-w-sm">{description}</p>
      ) : null}
    </motion.output>
  );
}
