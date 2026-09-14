import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";

const requiredFiles = [
  "components/ui/Button.tsx",
  "components/ui/Container.tsx",
  "components/ui/SectionHeading.tsx",
  "components/ui/Card.tsx",
  "components/layout/DemoBanner.tsx",
  "components/layout/Header.tsx",
  "components/layout/Hero.tsx",
  "components/layout/Footer.tsx",
  "dev/ComponentLab.tsx",
];

const errors = [];

for (const file of requiredFiles) {
  try {
    await access(file);
  } catch {
    errors.push(`Thiếu file giao diện: ${file}`);
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

for (const file of await collectSourceFiles("components")) {
  const source = await readFile(file, "utf8");
  if (/from\s+["'][^"']*content\//.test(source)) {
    errors.push(`Component đọc JSON trực tiếp: ${file}`);
  }
  if (/#[0-9a-fA-F]{3}(?:[0-9a-fA-F]{3})?\b/.test(source)) {
    errors.push(`Component chứa mã màu HEX: ${file}`);
  }
}

try {
  await access("app/components/page.tsx");
  errors.push("Route nội bộ /components không được tồn tại trong bản RC");
} catch {
  // Đúng yêu cầu: phòng thử nằm ngoài cây app và không tạo route public.
}

try {
  const site = JSON.parse(await readFile("content/site.json", "utf8"));
  if (site.siteMode !== "demo") errors.push('siteMode phải là "demo"');
  for (const key of ["openMenu", "closeMenu", "skipToContent", "copyright"]) {
    if (!site.ui?.[key]) errors.push(`Thiếu site.ui.${key}`);
  }
  const menuText = JSON.stringify(site);
  if (menuText.includes('"href":"/components"') || menuText.includes('"href": "/components"')) {
    errors.push("Trang /components không được xuất hiện trong menu site.json");
  }
} catch {
  errors.push("content/site.json thiếu hoặc sai cú pháp");
}

if (errors.length) {
  console.error("HỆ THỐNG GIAO DIỆN CHƯA ĐẠT");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("HỆ THỐNG GIAO DIỆN HỢP LỆ");
console.log("- Đủ 4 UI component và 4 layout component");
console.log("- Component không đọc JSON trực tiếp và không chứa mã HEX");
console.log("- Phòng thử được giữ trong dev/ và /components không còn là route public");
console.log("- siteMode đang là demo");
