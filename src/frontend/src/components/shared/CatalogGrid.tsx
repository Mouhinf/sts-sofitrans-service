import { EmptyState } from "@/components/shared/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";
import type { LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import type { ReactNode } from "react";

interface CatalogGridProps<T> {
  items: readonly T[] | null | undefined;
  /** Render function for each card. The container handles staggered motion. */
  renderItem: (item: T, index: number) => ReactNode;
  /** Stable key extractor. */
  getKey: (item: T, index: number) => string;
  /** Loading state — show skeleton grid. */
  isLoading: boolean;
  /** Number of skeleton placeholders to display while loading. */
  skeletonCount?: number;
  /** Skeleton card height in rem units. */
  skeletonHeight?: number;
  /** Empty state — shown when items is empty or null after loading. */
  emptyIcon: LucideIcon;
  emptyTitle: string;
  emptyDescription?: string;
  emptyAction?: ReactNode;
  emptyOcid?: string;
  /** CSS grid classes (override default responsive). */
  className?: string;
  /** Aria label for the grid wrapper. */
  ariaLabel?: string;
}

export function CatalogGrid<T>({
  items,
  renderItem,
  getKey,
  isLoading,
  skeletonCount = 6,
  skeletonHeight = 16,
  emptyIcon,
  emptyTitle,
  emptyDescription,
  emptyAction,
  emptyOcid,
  className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
  ariaLabel,
}: CatalogGridProps<T>) {
  if (isLoading) {
    return (
      <ul className={className} aria-busy="true" aria-label={ariaLabel}>
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <li key={`skel-${i}`}>
            <Skeleton
              className="rounded-xl w-full"
              style={{ height: `${skeletonHeight * 0.25}rem` }}
            />
          </li>
        ))}
      </ul>
    );
  }

  if (!items || items.length === 0) {
    return (
      <EmptyState
        icon={emptyIcon}
        title={emptyTitle}
        description={emptyDescription}
        action={emptyAction}
        ocid={emptyOcid}
      />
    );
  }

  return (
    <ul className={className} aria-label={ariaLabel}>
      {items.map((item, i) => (
        <motion.li
          key={getKey(item, i)}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
        >
          {renderItem(item, i)}
        </motion.li>
      ))}
    </ul>
  );
}
