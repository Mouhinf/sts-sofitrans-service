import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import type { ReactNode } from "react";

interface InfoCardProps {
  icon: LucideIcon;
  title: ReactNode;
  value: ReactNode;
  /** When provided, value becomes a clickable link. */
  href?: string;
  /** Open href in a new tab. */
  external?: boolean;
  /** Custom color theme for the icon chip (Tailwind classes). */
  iconClassName?: string;
  /** Custom inline style for the icon chip (e.g. WhatsApp green). */
  iconStyle?: React.CSSProperties;
  /** Animation delay (used for staggered grids). */
  delay?: number;
  /** A11y / analytics hook. */
  ocid?: string;
  className?: string;
}

/**
 * Compact icon + title + value card. Used in contact pages, footers, and
 * "trust" grids. When `href` is provided, the value renders as a link.
 */
export function InfoCard({
  icon: Icon,
  title,
  value,
  href,
  external,
  iconClassName = "bg-emerald-50 text-emerald-700",
  iconStyle,
  delay = 0,
  ocid,
  className,
}: InfoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className={cn(
        "flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 text-center shadow-corporate transition-smooth hover-lift",
        className,
      )}
    >
      <div
        className={cn(
          "flex h-14 w-14 items-center justify-center rounded-full",
          iconClassName,
        )}
        style={iconStyle}
      >
        <Icon className="h-7 w-7" aria-hidden="true" />
      </div>
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {title}
      </p>
      {href ? (
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="text-sm font-medium text-foreground transition-colors hover:text-primary"
          data-ocid={ocid}
        >
          {value}
        </a>
      ) : (
        <p className="text-sm font-medium text-foreground" data-ocid={ocid}>
          {value}
        </p>
      )}
    </motion.div>
  );
}
