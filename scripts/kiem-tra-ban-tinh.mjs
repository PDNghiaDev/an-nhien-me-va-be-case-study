import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";

const outputRoot = path.resolve("out");
const errors = [];

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

function routeCandidates(route) {
  if (route === "/") return [path.join(outputRoot, "index.html")];
  const clean = route.replace(/^\/+|\/+$/g, "");
  return [
    path.join(outputRoot, `${clean}.html`),
    path.join(outputRoot, clean, "index.html"),
  ];
}

async function routeExists(route) {
  for (const file of routeCandidates(route)) {
    if (await exists(file)) return true;
  }
  return false;
}

for (const file of ["out/index.html", "out/404.html", "out/sitemap.xml", "out/robots.txt"]) {
  if (!await exists(file)) errors.push(`Thiếu file build: ${file}`);
}

let site;
let services;
try {
  site = JSON.parse(await readFile("content/site.json", "utf8"));
  if (!["demo", "production"].includes(site.siteMode)) errors.push('siteMode phải là demo hoặc production');
} catch {
  errors.push("content/site.json thiếu hoặc sai cú pháp");
}
try {
  services = JSON.parse(await readFile("content/services.json", "utf8"));
} catch {
  errors.push("content/services.json thiếu hoặc sai cú pháp");
}

const requiredRoutes = ["/", "/gioi-thieu", "/lien-he", "/chinh-sach-bao-mat"];
const basePath = site?.catalog?.basePath;
if (typeof basePath === "string" && basePath.startsWith("/")) {
  requiredRoutes.push(basePath);
  for (const item of services?.items ?? []) {
    if (item.slug) requiredRoutes.push(`${basePath}/${item.slug}`);
  }
} else {
  errors.push("Thiếu site.catalog.basePath để kiểm tra route danh mục");
}

for (const route of requiredRoutes) {
  if (!await routeExists(route)) errors.push(`Không tìm thấy file HTML cho route: ${route}`);
}

try {
  const homeHtml = await readFile("out/index.html", "utf8");
  if (site?.siteMode === "demo" && (!/noindex/i.test(homeHtml) || !/nofollow/i.test(homeHtml))) {
    errors.push("out/index.html chưa chứa noindex,nofollow");
  }
  if (site?.siteMode === "production" && /<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(homeHtml)) {
    errors.push("Bản production vẫn có meta robots noindex; hãy build lại sau khi đổi chế độ");
  }
} catch {
  // Lỗi thiếu file đã được ghi phía trên.
}

try {
  const robots = await readFile("out/robots.txt", "utf8");
  const blocksAll = /^Disallow:[ \t]*\/[ \t]*$/im.test(robots);
  if (site?.siteMode === "demo" && !blocksAll) errors.push("out/robots.txt chưa chặn toàn site demo");
  if (site?.siteMode === "production" && blocksAll) errors.push("out/robots.txt vẫn chặn toàn site production");
} catch {
  // Lỗi thiếu file đã được ghi phía trên.
}

try {
  const sitemap = await readFile("out/sitemap.xml", "utf8");
  if (sitemap.includes("/components")) errors.push("out/sitemap.xml không được chứa /components");
} catch {
  // Lỗi thiếu file đã được ghi phía trên.
}

if (await routeExists("/components")) errors.push("Bản static không được xuất route nội bộ /components");

if (await exists("out/.env") || await exists("out/.env.local")) {
  errors.push("Thư mục out không được chứa file .env");
}

try {
  const entries = await readdir("out");
  if (!entries.length) errors.push("Thư mục out đang rỗng");
} catch {
  errors.push("Chưa có thư mục out; hãy chạy npm run build sau khi bật static export");
}

if (errors.length) {
  console.error("BẢN STATIC CHƯA ĐẠT");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("BẢN STATIC ĐẠT KIỂM TRA CẤU TRÚC");
console.log(`- ${requiredRoutes.length} route lõi/động có file HTML`);
console.log("- Có 404, sitemap và robots");
console.log("- Không xuất bản route nội bộ /components");
console.log(`- Đã kiểm tra index theo chế độ ${site.siteMode}; vẫn cần kiểm tra canonical và từng trang trên bản triển khai`);
