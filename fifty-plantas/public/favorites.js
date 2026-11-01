import { plants } from "./catalog.js";
const ids = new Set(plants.map((p) => p.id));
export function parseFavorites(raw) {
    try {
        const data = JSON.parse(raw ?? "[]");
        return new Set(Array.isArray(data)
            ? data.filter((x) => typeof x === "string" && ids.has(x))
            : []);
    }
    catch {
        return new Set();
    }
}
export function toggleFavorite(current, id) {
    const next = new Set(current);
    if (!ids.has(id))
        return next;
    if (next.has(id))
        next.delete(id);
    else
        next.add(id);
    return next;
}
