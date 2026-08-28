import { motion } from "motion/react";
import type { ReactNode } from "react";

interface ServiceHeroProps {
  /** Small uppercase label above the title (e.g. "STS SOFITRANS SERVICE"). */
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  /** Tailwind layout/utility classes for inner actions. */
  actions?: ReactNode;
  /** Gradient pair as Tailwind classes or inline style. Defaults to primary green→blue. */
  gradient?: string;
  /** Top-level id for skip-links. */
  id?: string;
  children?: ReactNode;
}

const DEFAULT_GRADIENT = `
  linear-gradient(135deg, oklch(0.22 0.1 145) 0%, oklch(0.18 0.12 249) 60%, oklch(0.12 0.08 249) 100%)
`;

export function ServiceHero({
  eyebrow,
  title,
  subtitle,
  actions,
  gradient = DEFAULT_GRADIENT,
  id = "service-hero",
  children,
}: ServiceHeroProps) {
  return (
    <section
      className="relative py-20 px-4 text-primary-foreground overflow-hidden"
      style={{ background: gradient }}
      id={id}
    >
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary-foreground translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-primary-foreground -translate-x-1/2 translate-y-1/2" />
      </div>
      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {eyebrow ? (
            <p className="text-sm font-semibold uppercase tracking-widest mb-3 opacity-80">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-5 leading-tight">
            {title}
          </h1>
          {subtitle ? (
            <p className="text-lg md:text-xl opacity-90 max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          ) : null}
          {actions ? (
            <div className="flex flex-wrap gap-3 mt-8">{actions}</div>
          ) : null}
        </motion.div>
        {children}
      </div>
    </section>
  );
}
