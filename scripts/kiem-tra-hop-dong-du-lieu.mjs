import { access, readFile } from "node:fs/promises";

const requiredDataFiles = [
  "content/site.json",
  "content/home.json",
  "content/about.json",
  "content/services.json",
  "content/projects.json",
  "content/contact.json",
];

const errors = [];

for (const file of requiredDataFiles) {
  try {
    await access(file);
    JSON.parse(await readFile(file, "utf8"));
  } catch {
    errors.push(`Thiếu hoặc sai cú pháp JSON: ${file}`);
  }
}

for (const file of ["lib/types.ts", "lib/content.ts"]) {
  try {
    await access(file);
  } catch {
    errors.push(`Thiếu lớp dữ liệu: ${file}`);
  }
}

try {
  const site = JSON.parse(await readFile("content/site.json", "utf8"));
  if (site.siteMode !== "demo") {
    errors.push('content/site.json phải có siteMode là "demo" khi kết thúc Chặng 06');
  }
} catch {
  // Lỗi file đã được ghi ở vòng kiểm tra phía trên.
}

if (errors.length) {
  console.error("HỢP ĐỒNG DỮ LIỆU CHƯA ĐẠT");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("HỢP ĐỒNG DỮ LIỆU HỢP LỆ");
console.log(`- Đủ ${requiredDataFiles.length} file JSON và đều đọc được`);
console.log("- Có lớp kiểu dữ liệu và lớp đọc dữ liệu");
console.log("- siteMode đang là demo");
