import { access, readFile } from "node:fs/promises";
import path from "node:path";

const errors = [];
const seoImages = [];

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

for (const file of [
  "lib/seo.ts",
  "app/sitemap.ts",
  "app/robots.ts",
  "components/seo/JsonLd.tsx",
]) {
  if (!await exists(file)) errors.push(`Thiếu file SEO: ${file}`);
}

let site;
try {
  site = JSON.parse(await readFile("content/site.json", "utf8"));
  if (!["demo", "production"].includes(site.siteMode)) errors.push('siteMode phải là demo hoặc production');
  const seo = site.seo ?? {};
  for (const key of ["siteUrl", "defaultTitle", "titleTemplate", "defaultDescription", "locale", "ogImage", "ogImageAlt"]) {
    if (typeof seo[key] !== "string" || !seo[key].trim()) errors.push(`Thiếu site.seo.${key}`);
  }
  if (seo.siteUrl && !/^https:\/\/[^/]+(?:\/[^/]+)*$/.test(seo.siteUrl)) {
    errors.push("site.seo.siteUrl phải bắt đầu bằng https:// và không có dấu / cuối");
  }
} catch {
  errors.push("content/site.json thiếu hoặc sai cú pháp");
}

function validateSeo(seo, label) {
  if (!seo || typeof seo !== "object") {
    errors.push(`Thiếu khối seo: ${label}`);
    return;
  }
  for (const key of ["title", "description", "path", "ogImage", "ogImageAlt"]) {
    if (typeof seo[key] !== "string" || !seo[key].trim()) errors.push(`${label}.seo.${key} đang thiếu`);
  }
  if (seo.path && !seo.path.startsWith("/")) errors.push(`${label}.seo.path phải bắt đầu bằng /`);
  if (typeof seo.ogImage === "string" && seo.ogImage.trim()) seoImages.push(seo.ogImage);
}

for (const name of ["home", "about", "services", "projects", "contact", "legal"]) {
  try {
    const data = JSON.parse(await readFile(`content/${name}.json`, "utf8"));
    validateSeo(data.seo, `content/${name}.json`);
    if (["services", "projects"].includes(name) && Array.isArray(data.items)) {
      for (const item of data.items) validateSeo(item.seo, `content/${name}.json#${item.slug ?? "không-slug"}`);
    }
  } catch {
    errors.push(`content/${name}.json thiếu hoặc sai cú pháp`);
  }
}

if (site?.seo?.ogImage) seoImages.push(site.seo.ogImage);
for (const imagePath of new Set(seoImages)) {
  if (imagePath.startsWith("/")) {
    const publicFile = path.join("public", ...imagePath.slice(1).split("/"));
    if (!await exists(publicFile)) errors.push(`Ảnh OG không tồn tại: ${imagePath}`);
  }
}

try {
  const seoSource = await readFile("lib/seo.ts", "utf8");
  if (!/index\s*:\s*false/.test(seoSource) || !/follow\s*:\s*false/.test(seoSource)) {
    errors.push("lib/seo.ts chưa thể hiện noindex,nofollow cho bản demo");
  }
} catch {
  // Lỗi thiếu file đã được ghi phía trên.
}

try {
  const sitemapSource = await readFile("app/sitemap.ts", "utf8");
  if (sitemapSource.includes("/components")) errors.push("Sitemap không được chứa /components");
} catch {
  // Lỗi thiếu file đã được ghi phía trên.
}

try {
  const robotsSource = await readFile("app/robots.ts", "utf8");
  if (!robotsSource.includes("siteMode") || !robotsSource.includes("Disallow")) {
    errors.push("robots.ts chưa nối với siteMode hoặc chưa có quy tắc chặn demo");
  }
} catch {
  // Lỗi thiếu file đã được ghi phía trên.
}

try {
  const jsonLdSource = await readFile("components/seo/JsonLd.tsx", "utf8");
  if (/AggregateRating|aggregateRating|Review|reviewCount/.test(jsonLdSource)) {
    errors.push("JsonLd chứa schema đánh giá; Starter không được thêm khi chưa có nguồn xác minh");
  }
  if (/from\s+["'][^"']*content\//.test(jsonLdSource)) {
    errors.push("JsonLd component không được import JSON trực tiếp");
  }
} catch {
  // Lỗi thiếu file đã được ghi phía trên.
}

if (errors.length) {
  console.error("NỀN SEO CHƯA ĐẠT");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("NỀN SEO ĐẠT KIỂM TRA CẤU TRÚC");
console.log("- Đủ helper metadata, sitemap, robots và JsonLd");
console.log("- Đủ dữ liệu SEO cho trang tĩnh và item động");
console.log(`- siteMode: ${site.siteMode}; đã kiểm tra logic demo, cần kiểm tra bản build với kiem-tra-static`);
console.log("- Không có schema đánh giá không được phép");
