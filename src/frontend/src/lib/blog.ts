import type { BlogPost } from "@/types";

/** Maps a blog category to Tailwind classes for its chip / badge. */
export const CATEGORY_COLORS: Record<string, string> = {
  Transport: "bg-secondary/10 text-secondary border-secondary/30",
  Immobilier: "bg-primary/10 text-primary border-primary/30",
  Formation: "bg-accent/10 text-accent-foreground border-accent/30",
  Agrobusiness: "bg-chart-3/10 text-foreground border-chart-3/30",
};

export function categoryClass(tag: string): string {
  return CATEGORY_COLORS[tag] ?? "bg-muted text-muted-foreground border-border";
}

/** Format a backend `Timestamp` (nanoseconds bigint) to a French date. */
export function formatBlogDate(ts?: bigint): string {
  if (!ts) return "";
  const date = new Date(Number(ts) / 1_000_000);
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Truncate text to `max` chars, appending an ellipsis. */
export function truncate(text: string, max: number): string {
  return text.length > max ? `${text.slice(0, max)}…` : text;
}

/** True if the post has a usable featured image URL. */
export function hasPostImage(post: BlogPost): boolean {
  const url = post.featuredImage?.getDirectURL?.();
  return !!url && url !== "";
}
