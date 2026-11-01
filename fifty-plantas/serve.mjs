import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
const root = fileURLToPath(new URL("./public/", import.meta.url));
const files = {
  "/": ["index.html", "text/html; charset=utf-8"],
  "/index.html": ["index.html", "text/html; charset=utf-8"],
  "/app.js": ["app.js", "text/javascript; charset=utf-8"],
  "/catalog.js": ["catalog.js", "text/javascript; charset=utf-8"],
  "/favorites.js": ["favorites.js", "text/javascript; charset=utf-8"],
  "/style.css": ["style.css", "text/css; charset=utf-8"],
  "/leaf.svg": ["leaf.svg", "image/svg+xml"],
};
export function createStaticServer() {
  return createServer((req, res) => {
    let url;
    try {
      url = new URL(req.url ?? "/", "http://local");
    } catch {
      res.writeHead(400);
      res.end("Solicitud inválida.");
      return;
    }
    const file = files[url.pathname];
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Referrer-Policy", "no-referrer");
    res.setHeader(
      "Permissions-Policy",
      "geolocation=(),camera=(),microphone=()",
    );
    res.setHeader(
      "Content-Security-Policy",
      "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'none'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'",
    );
    if (!file || !["GET", "HEAD"].includes(req.method ?? "")) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Página no encontrada.");
      return;
    }
    try {
      res.writeHead(200, {
        "Content-Type": file[1],
        "Cache-Control": "no-cache",
      });
      res.end(
        req.method === "HEAD" ? undefined : readFileSync(join(root, file[0])),
      );
    } catch {
      res.writeHead(500);
      res.end("No se pudo abrir el archivo.");
    }
  });
}
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const value = (name) => {
    const i = args.indexOf(name);
    return i < 0 ? undefined : args[i + 1];
  };
  const port = Number(value("--port") ?? process.env.FIFTY_PORT ?? 8005);
  const host = value("--host") ?? "127.0.0.1";
  if (!Number.isSafeInteger(port) || port < 1 || port > 65535)
    throw new Error("Puerto inválido");
  createStaticServer().listen(port, host, () =>
    console.log(`Fifty Plantas · http://${host}:${port}`),
  );
}
