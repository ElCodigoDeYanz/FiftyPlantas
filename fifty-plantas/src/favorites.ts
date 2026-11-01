import { plants } from "./catalog.js";
const ids = new Set(plants.map((p) => p.id));
export function parseFavorites(raw: string | null): Set<string> {
  try {
    const data: unknown = JSON.parse(raw ?? "[]");
    return new Set(
      Array.isArray(data)
        ? data.filter((x): x is string => typeof x === "string" && ids.has(x))
        : [],
    );
  } catch {
    return new Set();
  }
}
export function toggleFavorite(
  current: ReadonlySet<string>,
  id: string,
): Set<string> {
  const next = new Set(current);
  if (!ids.has(id)) return next;
  if (next.has(id)) next.delete(id);
  else next.add(id);
  return next;
}
