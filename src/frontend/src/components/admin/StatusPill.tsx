import { cn } from "@/lib/utils";

export type StatusTone =
  | "amber"
  | "primary"
  | "secondary"
  | "destructive"
  | "muted";

const TONE_CLASS: Record<StatusTone, string> = {
  amber: "bg-amber-50 text-amber-700 border-amber-200",
  primary: "bg-primary/10 text-primary border-primary/20",
  secondary: "bg-secondary/10 text-secondary border-secondary/20",
  destructive: "bg-destructive/10 text-destructive border-destructive/20",
  muted: "bg-muted text-muted-foreground border-border",
};

interface StatusPillProps {
  label: string;
  tone?: StatusTone;
  className?: string;
}

/**
 * Inline status chip used in admin tables and filter bars. Smaller and
 * less prominent than `<Badge>` — meant for repeated status counts.
 */
export function StatusPill({
  label,
  tone = "muted",
  className,
}: StatusPillProps) {
  return (
    <span
      className={cn(
        "px-2 py-0.5 rounded-full border text-xs whitespace-nowrap",
        TONE_CLASS[tone],
        className,
      )}
    >
      {label}
    </span>
  );
}
