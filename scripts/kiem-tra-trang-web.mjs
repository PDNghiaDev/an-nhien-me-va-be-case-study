import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";

const errors = [];

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

for (const file of [
  "app/page.tsx",
  "app/gioi-thieu/page.tsx",
  "app/lien-he/page.tsx",
  "app/chinh-sach-bao-mat/page.tsx",
  "app/not-found.tsx",
  "content/legal.json",
  "lib/types.ts",
  "lib/content.ts",
]) {
  if (!await exists(file)) errors.push(`Thiếu file bắt buộc: ${file}`);
}

let site;
try {
  site = JSON.parse(await readFile("content/site.json", "utf8"));
  if (site.siteMode !== "demo") errors.push('siteMode phải là "demo"');
} catch {
  errors.push("content/site.json thiếu hoặc sai cú pháp");
}

const basePath = site?.catalog?.basePath;
if (typeof basePath !== "string" || !/^\/[a-z0-9-]+(?:\/[a-z0-9-]+)*$/.test(basePath)) {
  errors.push("site.catalog.basePath thiếu hoặc không hợp lệ");
} else {
  const routeFolder = path.join("app", ...basePath.slice(1).split("/"));
  if (!await exists(path.join(routeFolder, "page.tsx"))) {
    errors.push(`Thiếu trang danh mục theo basePath: ${routeFolder}/page.tsx`);
  }
  if (!await exists(path.join(routeFolder, "[slug]", "page.tsx"))) {
    errors.push(`Thiếu trang chi tiết động: ${routeFolder}/[slug]/page.tsx`);
  }
}

async function collectSourceFiles(folder) {
  const files = [];
  try {
    for (const entry of await readdir(folder, { withFileTypes: true })) {
      const item = path.join(folder, entry.name);
      if (entry.isDirectory()) files.push(...await collectSourceFiles(item));
      if (entry.isFile() && /\.(tsx|ts)$/.test(entry.name)) files.push(item);
    }
  } catch {
    return files;
  }
  return files;
}

for (const file of [
  ...await collectSourceFiles("app"),
  ...await collectSourceFiles("components"),
]) {
  const source = await readFile(file, "utf8");
  if (/from\s+["'][^"']*content\//.test(source)) {
    errors.push(`Đọc JSON trực tiếp thay vì qua lib/content.ts: ${file}`);
  }
  if (/href\s*=\s*["']#["']/.test(source)) {
    errors.push(`Liên kết giữ chỗ href="#": ${file}`);
  }
  if (/#[0-9a-fA-F]{3}(?:[0-9a-fA-F]{3})?\b/.test(source) && file !== path.join("app", "globals.css")) {
    errors.push(`Mã màu HEX nằm ngoài globals.css: ${file}`);
  }
}

for (const file of [
  "content/site.json",
  "content/home.json",
  "content/about.json",
  "content/services.json",
  "content/projects.json",
  "content/contact.json",
  "content/legal.json",
]) {
  try {
    JSON.parse(await readFile(file, "utf8"));
  } catch {
    errors.push(`Thiếu hoặc sai cú pháp JSON: ${file}`);
  }
}

if (errors.length) {
  console.error("GOLDEN WEBSITE DEMO CHƯA ĐẠT");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("GOLDEN WEBSITE DEMO ĐẠT KIỂM TRA CẤU TRÚC");
console.log("- Đủ route lõi, danh mục và trang chi tiết động");
console.log("- Đủ 7 file dữ liệu và đều là JSON hợp lệ");
console.log("- Không đọc JSON trực tiếp, không có href giữ chỗ hoặc HEX rải trong mã");
console.log("- siteMode đang là demo");
