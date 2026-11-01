import test from "node:test";
import assert from "node:assert/strict";
import { once } from "node:events";
import { plants, filterPlants } from "../public/catalog.js";
import { parseFavorites, toggleFavorite } from "../public/favorites.js";
import { createStaticServer } from "../serve.mjs";
const base = {
  query: "",
  light: "",
  water: "",
  onlyFavorites: false,
  favorites: new Set(),
};
test("catálogo pequeño, identificadores únicos y fuentes primarias HTTPS", () => {
  assert.equal(plants.length, 4);
  assert.equal(new Set(plants.map((p) => p.id)).size, 4);
  for (const p of plants) {
    assert.equal(new URL(p.careSource).hostname, "www.rhs.org.uk");
    assert.equal(new URL(p.petSource).hostname, "www.aspca.org");
    assert.ok(p.reviewedAt);
  }
});
test("búsqueda encuentra nombre común, botánico y acentos", () => {
  assert.equal(
    filterPlants({ ...base, query: "costilla de adan" })[0]?.id,
    "monstera",
  );
  assert.equal(
    filterPlants({ ...base, query: "EPIPREMNUM AUREUM" })[0]?.id,
    "pothos",
  );
  assert.equal(
    filterPlants({ ...base, query: "planta inexistente" }).length,
    0,
  );
});
test("filtros combinados y favoritos funcionan sin algoritmo", () => {
  assert.deepEqual(
    filterPlants({ ...base, light: "adaptable", water: "espaciado" }).map(
      (p) => p.id,
    ),
    ["sansevieria"],
  );
  assert.deepEqual(
    filterPlants({
      ...base,
      onlyFavorites: true,
      favorites: new Set(["cinta"]),
    }).map((p) => p.id),
    ["cinta"],
  );
});
test("almacenamiento corrupto o ajeno no rompe favoritos", () => {
  assert.equal(parseFavorites("{bad").size, 0);
  assert.equal(parseFavorites("null").size, 0);
  assert.deepEqual(
    [...parseFavorites('["cinta","cinta","unknown",12]')],
    ["cinta"],
  );
});
test("marcar y desmarcar favoritos es idempotente por identificador", () => {
  const first = toggleFavorite(new Set(), "cinta");
  assert.deepEqual([...first], ["cinta"]);
  assert.equal(toggleFavorite(first, "cinta").size, 0);
  assert.deepEqual([...toggleFavorite(first, "unknown")], ["cinta"]);
});
test("sitio estático sirve el contenido y limita rutas y métodos", async (t) => {
  const server = createStaticServer();
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  t.after(async () => {
    server.closeAllConnections();
    await new Promise((resolve) => server.close(resolve));
  });
  const address = server.address();
  const url = `http://127.0.0.1:${address.port}`;
  const home = await fetch(url);
  assert.equal(home.status, 200);
  assert.match(await home.text(), /Fifty Plantas|fifty/);
  assert.match(
    home.headers.get("content-security-policy"),
    /connect-src 'none'/,
  );
  assert.equal((await fetch(url + "/package.json")).status, 404);
  assert.equal((await fetch(url + "/catalog.js")).status, 200);
  assert.equal(
    (await fetch(url + "/", { method: "POST", body: "x" })).status,
    404,
  );
});
