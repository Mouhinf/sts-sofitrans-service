import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import type { ReactNode } from "react";

interface CTABarProps {
  title: ReactNode;
  description?: ReactNode;
  actions: ReactNode;
  /** Tailwind classes or inline style. Defaults to brand green→blue. */
  backgroundClassName?: string;
  style?: React.CSSProperties;
  id?: string;
  className?: string;
}

const DEFAULT_BG =
  "linear-gradient(135deg, oklch(0.22 0.1 145) 0%, oklch(0.18 0.12 249) 100%)";

/**
 * Full-bleed gradient banner used to push users toward a primary action
 * (call, WhatsApp, contact form). Decorative only — semantic content lives
 * inside the props.
 */
export function CTABar({
  title,
  description,
  actions,
  backgroundClassName,
  style,
  id,
  className,
}: CTABarProps) {
  return (
    <section
      id={id}
      className={cn("py-14 text-white", backgroundClassName, className)}
      style={style ?? { background: DEFAULT_BG }}
    >
      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-6 text-center"
        >
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            {title}
          </h2>
          {description ? (
            <p className="max-w-xl text-base opacity-90">{description}</p>
          ) : null}
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            {actions}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
