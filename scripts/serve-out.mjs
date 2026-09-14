import { createReadStream } from "node:fs";
import { access, stat } from "node:fs/promises";
import http from "node:http";
import path from "node:path";

const root = path.resolve("out");
const port = 4173;
const host = "127.0.0.1";

const mime = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".xml": "application/xml; charset=utf-8",
  ".woff2": "font/woff2",
};

async function firstExisting(files) {
  for (const file of files) {
    try {
      await access(file);
      if ((await stat(file)).isFile()) return file;
    } catch {
      // Thử ứng viên tiếp theo.
    }
  }
  return undefined;
}

const server = http.createServer(async (request, response) => {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url ?? "/", `http://${host}`).pathname);
  } catch {
    response.writeHead(400).end("Bad Request");
    return;
  }

  const clean = pathname.replace(/^\/+/, "");
  const resolved = path.resolve(root, clean);
  if (resolved !== root && !resolved.startsWith(`${root}${path.sep}`)) {
    response.writeHead(403).end("Forbidden");
    return;
  }

  const hasExtension = Boolean(path.extname(clean));
  const candidates = pathname === "/"
    ? [path.join(root, "index.html")]
    : hasExtension
      ? [resolved]
      : [resolved, `${resolved}.html`, path.join(resolved, "index.html")];

  const file = await firstExisting(candidates);
  if (!file) {
    const notFound = path.join(root, "404.html");
    response.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    createReadStream(notFound).pipe(response);
    return;
  }

  response.writeHead(200, {
    "Content-Type": mime[path.extname(file).toLowerCase()] ?? "application/octet-stream",
    "Cache-Control": "no-store",
  });
  createReadStream(file).pipe(response);
});

server.listen(port, host, () => {
  console.log(`Bản static đang chạy tại http://${host}:${port}`);
  console.log("Nhấn Ctrl+C để dừng.");
});
