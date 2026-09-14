import { access, readFile, readdir } from "node:fs/promises";

const errors = [];
const requiredFiles = ["AGENTS.md", "README.md", "content/site.json", "tai-lieu/trang-thai-hoc.md", "tai-lieu/01-dinh-huong.md", "app/page.tsx"];

const [nodeMajor, nodeMinor] = process.versions.node.split(".").map(Number);
if (nodeMajor < 20 || (nodeMajor === 20 && nodeMinor < 9)) errors.push(`Node.js hiện tại là ${process.versions.node}; cần từ 20.9.0 trở lên`);

for (const file of requiredFiles) {
  try { await access(file); } catch { errors.push(`Thiếu file: ${file}`); }
}

for (let stage = 1; stage <= 13; stage += 1) {
  const file = `huong-dan/chang-${String(stage).padStart(2, "0")}.md`;
  try { await access(file); } catch { errors.push(`Thiếu hướng dẫn: ${file}`); }
}

let site;
let learningStage;
try {
  site = JSON.parse(await readFile("content/site.json", "utf8"));
  if (site.siteMode !== "demo") errors.push('RC-DEMO yêu cầu siteMode là "demo"');
  if (!Number.isInteger(site.currentStage) || site.currentStage < 1 || site.currentStage > 13) errors.push("currentStage phải là số nguyên từ 1 đến 13");
} catch {
  errors.push("content/site.json không phải JSON hợp lệ");
}

try {
  const progress = await readFile("tai-lieu/trang-thai-hoc.md", "utf8");
  learningStage = Number(progress.match(/^currentStage:\s*(\d+)/m)?.[1]);
  if (!Number.isInteger(learningStage) || learningStage < 1 || learningStage > 13) errors.push("trang-thai-hoc.md thiếu currentStage hợp lệ (1–13)");
  // V2: tiến độ học chỉ thuộc tài liệu học viên; site.json là dữ liệu website mẫu.
} catch {
  errors.push("Không đọc được tai-lieu/trang-thai-hoc.md");
}

for (const folder of ["tai-san/logo", "tai-san/hinh-anh", "tai-san/noi-dung-goc", "tai-san/thong-tin"]) {
  try { await readdir(folder); } catch { errors.push(`Thiếu thư mục: ${folder}`); }
}

if (errors.length) {
  console.error("WORKSPACE HỌC VIÊN V2 CHƯA ĐẠT");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("WORKSPACE HỌC VIÊN V2 HỢP LỆ");
console.log("- Đủ hướng dẫn 13 chặng và các thư mục tài sản");
console.log(`- Chặng học hiện tại: ${learningStage}/13; siteMode: demo`);
console.log(`- Node.js ${process.versions.node} đáp ứng yêu cầu từ 20.9.0`);
