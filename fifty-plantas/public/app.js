import { plants, filterPlants } from "./catalog.js";
import { parseFavorites, toggleFavorite } from "./favorites.js";
const get = (id) => {
    const node = document.getElementById(id);
    if (!node)
        throw new Error(id);
    return node;
};
const esc = (v) => String(v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] ?? c);
let favorites = new Set();
try {
    favorites = parseFavorites(localStorage.getItem("fifty-favorites-v1"));
}
catch {
    /* The catalog remains usable without storage access. */
}
function art(id) {
    const drawings = {
        cinta: '<path d="M71 119h59l-9 35H80z" fill="#c4a185"/><path d="M99 120c-26-58-40-52-56-17m56 17c-4-79-24-93-43-73m43 73c19-73 43-75 58-50m-58 50c28-37 51-29 59 6m-59-6c-12-62 6-83 19-99m-19 99c-40-18-61 4-65 27m65-27c11-49 8-70-1-91" stroke="#78936c" stroke-width="9" stroke-linecap="round"/>',
        sansevieria: '<path d="M70 118h62l-9 36H80z" fill="#c5a183"/><path d="m89 124-9-95c-19 25-21 52-11 95m28 0 7-111c18 35 20 72 10 111m-1 0 26-83c9 31 4 62-10 83" fill="#7c986c" stroke="#53774f" stroke-width="3"/><path d="m82 115-7-64m30 69 4-71m13 68 13-49" stroke="#b9c99d" stroke-width="3"/>',
        monstera: '<path d="M76 120h55l-9 34H84z" fill="#c9a88c"/><path d="M102 124V63m0 28C59 91 48 69 55 44c22-16 42-1 47 19 7-25 30-29 49-14 6 31-11 46-49 42z" fill="#79966b" stroke="#54754d" stroke-width="3"/><path d="m103 68-25-15m25 24 28-14M69 67l8 7m58 0-8 7" stroke="#d1dec2" stroke-width="6" stroke-linecap="round"/><path d="M103 65v29" stroke="#52734d" stroke-width="3"/>',
        pothos: '<path d="M69 65h58l-8 35H78z" fill="#c5a181"/><path d="M98 69c-8-37 7-47 17-30m-6 39c42 12 36 66 15 63m-41-52c-29 15-23 55-39 61" stroke="#678b59" stroke-width="4"/><path d="M99 63C67 57 70 32 87 29c13 0 21 15 12 34m26 57c-25-1-34-19-24-28 13-9 30 4 24 28m-57 12c-25 5-35-11-28-24 12-13 35-2 28 24m68-29c21-7 29 7 22 19-14 7-24-5-22-19" fill="#8da574" stroke="#668958" stroke-width="2"/>',
    };
    return `<svg viewBox="0 0 200 170" xmlns="http://www.w3.org/2000/svg" fill="none" aria-hidden="true">${drawings[id] ?? ""}</svg>`;
}
function notify(text) {
    get("notice").textContent = text;
    get("notice").hidden = false;
}
function save() {
    try {
        localStorage.setItem("fifty-favorites-v1", JSON.stringify([...favorites]));
    }
    catch {
        notify("El navegador no permite guardar favoritos. Puedes seguir explorando durante esta visita.");
    }
}
function toggle(id) {
    favorites = toggleFavorite(favorites, id);
    save();
    render();
}
function showPlant(p) {
    get("detail-content").innerHTML =
        `<div class="detail-art ${p.art}">${art(p.art)}</div><div class="detail-copy"><h2 id="detail-title">${esc(p.name)}</h2><p class="botanical">${esc(p.scientific)}</p><p>${esc(p.summary)}</p><dl><dt>Luz</dt><dd>${esc(p.lightText)}</dd><dt>Riego</dt><dd>${esc(p.waterText)}</dd><dt>Un detalle para observar</dt><dd>${esc(p.tip)}</dd><dt>Convivencia con mascotas · fuente ASPCA</dt><dd>${esc(p.petText)}</dd></dl><p class="detail-limits">La identificación correcta de la especie importa. Esta ficha no diagnostica problemas ni sustituye atención veterinaria. Si sospechas una ingestión, consulta a un veterinario.</p><div class="source-links"><a href="${p.careSource}" target="_blank" rel="noopener noreferrer">Leer guía de cuidados · RHS ↗</a><a href="${p.petSource}" target="_blank" rel="noopener noreferrer">Consultar ficha de toxicidad · ASPCA ↗</a></div><p class="review-date">Fuentes revisadas: ${p.reviewedAt}. Síntesis editorial; ilustración orientativa.</p></div>`;
    get("detail").showModal();
}
function render() {
    const list = filterPlants({
        query: get("query").value,
        light: get("light").value,
        water: get("water").value,
        onlyFavorites: get("only-favorites").checked,
        favorites,
    });
    get("favorite-count").textContent = String(favorites.size);
    get("result-count").textContent =
        `${list.length} ${list.length === 1 ? "planta para conocer" : "plantas para conocer"}`;
    get("plants").innerHTML =
        list
            .map((p) => `<article class="plant-card"><div class="plant-art ${p.art}"><span class="art-number">0${plants.indexOf(p) + 1}</span>${art(p.art)}<button class="favorite" data-favorite="${p.id}" aria-label="${favorites.has(p.id) ? "Quitar" : "Guardar"} ${esc(p.name)} ${favorites.has(p.id) ? "de" : "en"} favoritas" aria-pressed="${favorites.has(p.id)}">${favorites.has(p.id) ? "♥" : "♡"}</button></div><div class="plant-copy"><p class="botanical">${esc(p.scientific)}</p><h3>${esc(p.name)}</h3><p class="summary">${esc(p.summary)}</p><div class="plant-tags"><span>☀ ${p.light === "adaptable" ? "Luz adaptable" : "Luz indirecta"}</span><span>◌ ${p.water === "espaciado" ? "Dejar secar" : "Revisar sustrato"}</span></div><button class="detail-button" data-detail="${p.id}">Conocer sus cuidados <span>↗</span></button></div></article>`)
            .join("") ||
            '<div class="empty"><h3>Aún no hay hojas por aquí.</h3><p>Prueba otros filtros o guarda una planta entre tus favoritas.</p></div>';
    document
        .querySelectorAll("[data-favorite]")
        .forEach((b) => b.addEventListener("click", () => toggle(b.dataset.favorite ?? "")));
    document.querySelectorAll("[data-detail]").forEach((b) => b.addEventListener("click", () => {
        const plant = plants.find((p) => p.id === b.dataset.detail);
        if (plant)
            showPlant(plant);
    }));
}
get("filters").addEventListener("submit", (e) => e.preventDefault());
for (const id of ["query", "light", "water", "only-favorites"])
    get(id).addEventListener(id === "query" ? "input" : "change", render);
get("reset").addEventListener("click", () => {
    get("filters").reset();
    render();
});
get("favorites-nav").addEventListener("click", () => {
    get("only-favorites").checked = true;
    render();
    get("catalogo").scrollIntoView({ block: "start" });
});
get("close-detail").addEventListener("click", () => get("detail").close());
render();
