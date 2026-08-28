import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Pencil, Plus, Trash2 } from "lucide-react";
import type { ReactNode } from "react";

export interface AdminColumn<T> {
  /** Column key — also used as React key. */
  key: string;
  /** Header label. */
  label: ReactNode;
  /** Cell renderer. */
  render: (item: T) => ReactNode;
  /** Tailwind classes for the `<td>`. */
  className?: string;
  /** Tailwind classes for the `<th>`. */
  thClassName?: string;
  /** Whether to show the column at this breakpoint. Default: always. */
  showOn?: "always" | "md" | "lg";
}

interface AdminDataTableProps<T> {
  items: readonly T[] | null | undefined;
  isLoading: boolean;
  columns: AdminColumn<T>[];
  /** Stable key extractor. */
  getRowKey: (item: T) => string;
  /** Loading placeholder rows. */
  skeletonRows?: number;
  skeletonCols?: number;
  /** A11y/analytics hook applied to each row. */
  rowOcid?: (item: T) => string;
  /** Actions column renderer (typically Edit + Delete buttons). */
  renderActions?: (item: T) => ReactNode;
  /** Empty state message. */
  emptyMessage: ReactNode;
  /** A11y/analytics hook for the empty state. */
  emptyOcid?: string;
  /** Top-of-card toolbar (e.g. status chips). */
  toolbar?: ReactNode;
}

const SHOW_CLASS: Record<
  NonNullable<AdminColumn<unknown>["showOn"]>,
  string
> = {
  always: "",
  md: "hidden md:table-cell",
  lg: "hidden lg:table-cell",
};

export function AdminDataTable<T>({
  items,
  isLoading,
  columns,
  getRowKey,
  skeletonRows = 4,
  skeletonCols = 5,
  rowOcid,
  renderActions,
  emptyMessage,
  emptyOcid,
  toolbar,
}: AdminDataTableProps<T>) {
  const totalCols = columns.length + (renderActions ? 1 : 0);

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      {toolbar ? (
        <div className="border-b border-border p-4">{toolbar}</div>
      ) : null}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`text-left p-3 font-medium text-muted-foreground ${col.thClassName ?? ""} ${SHOW_CLASS[col.showOn ?? "always"]}`}
                >
                  {col.label}
                </th>
              ))}
              {renderActions ? (
                <th className="text-right p-3 font-medium text-muted-foreground">
                  Actions
                </th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: skeletonRows }).map((_, ri) => (
                <tr key={`skel-${ri}`} className="border-b border-border">
                  {Array.from({ length: skeletonCols }).map((_, ci) => (
                    <td key={ci} className="p-3">
                      <Skeleton className="h-4 w-full" />
                    </td>
                  ))}
                </tr>
              ))
            ) : items && items.length > 0 ? (
              items.map((item) => (
                <tr
                  key={getRowKey(item)}
                  className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                  data-ocid={rowOcid?.(item)}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={`p-3 ${col.className ?? ""} ${SHOW_CLASS[col.showOn ?? "always"]}`}
                    >
                      {col.render(item)}
                    </td>
                  ))}
                  {renderActions ? (
                    <td className="p-3">
                      <div className="flex items-center justify-end gap-2">
                        {renderActions(item)}
                      </div>
                    </td>
                  ) : null}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={totalCols}
                  className="p-8 text-center text-muted-foreground"
                  data-ocid={emptyOcid}
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/** Pre-styled "Edit" icon button for use inside `renderActions`. */
export function AdminEditButton({
  onClick,
  label = "Modifier",
  ocid,
}: {
  onClick: () => void;
  label?: string;
  ocid?: string;
}) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      aria-label={label}
      data-ocid={ocid}
    >
      <Pencil className="h-4 w-4" />
    </Button>
  );
}

/** Pre-styled "Delete" icon button for use inside `renderActions`. */
export function AdminDeleteButton({
  onClick,
  label = "Supprimer",
  ocid,
}: {
  onClick: () => void;
  label?: string;
  ocid?: string;
}) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className="text-destructive hover:text-destructive"
      aria-label={label}
      data-ocid={ocid}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}

/** Pre-styled "Add" CTA for the page header. */
export function AdminAddButton({
  onClick,
  children,
  ocid,
}: {
  onClick: () => void;
  children: ReactNode;
  ocid?: string;
}) {
  return (
    <Button onClick={onClick} data-ocid={ocid}>
      <Plus className="h-4 w-4 mr-2" />
      {children}
    </Button>
  );
}
