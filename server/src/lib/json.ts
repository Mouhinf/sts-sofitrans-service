/**
 * Helpers to convert between the stringified JSON columns stored in SQLite
 * (Property.images, Vehicle.images, BlogPost.categoryTags) and the JS values
 * the API contract promises.
 */
export function parseJsonArray<T>(value: string | null | undefined, fallback: T[] = []): T[] {
  if (!value) return fallback;
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? (parsed as T[]) : fallback;
  } catch {
    return fallback;
  }
}

export function stringifyJsonArray<T>(value: T[]): string {
  return JSON.stringify(value ?? []);
}
