import fs from "node:fs";
import path from "node:path";
import { auditContentStatus } from './go-live-content-policy.mjs';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const bookPath = path.join(root, "tai-lieu", "13-go-live.md");
const sitePath = path.join(root, "content", "site.json");
const errors = [];
const preflight = process.argv.includes('--preflight');

if (!fs.existsSync(bookPath)) errors.push("Thiếu tai-lieu/13-go-live.md");
if (!fs.existsSync(sitePath)) errors.push("Thiếu content/site.json");

const book = fs.existsSync(bookPath) ? fs.readFileSync(bookPath, "utf8") : "";
const contentDir = path.join(root, "content");
const allContent = fs.existsSync(contentDir)
  ? fs.readdirSync(contentDir, { recursive: true })
      .filter((name) => String(name).endsWith(".json"))
      .map((name) => fs.readFileSync(path.join(contentDir, String(name)), "utf8"))
      .join("\n")
  : "";

for (const heading of [
  "## 1. Mốc đầu vào",
  "## 2. Danh sách phải thay",
  "## 3. Cổng Go-live",
  "## 4. Biên bản Go-live",
  "## 5. Vận hành và rollback",
]) {
  if (!book.includes(heading)) errors.push("Thiếu mục: " + heading);
}

const preflightBook = book.split('## 4. Biên bản Go-live')[0];
if ((preflight ? preflightBook : book).includes("[CHƯA ĐIỀN]")) errors.push("Sổ Go-live còn [CHƯA ĐIỀN]");
if (!/DEMO còn lại:\s*0\b/i.test(book)) errors.push("DEMO còn lại phải bằng 0");
if (!/CẦN THAY còn lại:\s*0\b/i.test(book)) errors.push("CẦN THAY còn lại phải bằng 0");
if (!/Placeholder còn lại:\s*0\b/i.test(book)) errors.push("Placeholder còn lại phải bằng 0");
if (!/P0 còn mở:\s*0\b/i.test(book)) errors.push("P0 còn mở phải bằng 0");
if (!preflight && !/^Trạng thái cuối:[ \t]*SẴN SÀNG KINH DOANH[ \t]*$/im.test(book)) {
  errors.push("Trạng thái cuối chưa phải SẴN SÀNG KINH DOANH");
}

try {
  const site = JSON.parse(fs.readFileSync(sitePath, "utf8"));
  if (preflight ? !['demo', 'production'].includes(site.siteMode) : site.siteMode !== "production") errors.push("siteMode chưa là production hoặc không hợp lệ cho preflight");
} catch {
  errors.push("content/site.json không phải JSON hợp lệ");
}

if (fs.existsSync(contentDir)) {
  for (const name of fs.readdirSync(contentDir, { recursive: true }).filter(name => String(name).endsWith('.json'))) {
    try {
      const relative = String(name).replaceAll('\\', '/');
      const data = JSON.parse(fs.readFileSync(path.join(contentDir, String(name)), 'utf8'));
      errors.push(...auditContentStatus(relative, data));
    } catch {
      errors.push(`JSON không hợp lệ: ${name}`);
    }
  }
}
// Cho phép mô phỏng không đồng nghĩa cho phép truyền dữ liệu hoặc bỏ cảnh báo.
const contactCheck = spawnSync(process.execPath, ['scripts/kiem-tra-lien-he.mjs'], { encoding: 'utf8' });
if (contactCheck.status !== 0) errors.push('Luồng liên hệ chưa đạt: ' + (contactCheck.stderr || contactCheck.error?.message || 'không chạy được kiểm tra'));
if (/example\.com|\[CHƯA ĐIỀN\]/i.test(allContent)) {
  errors.push("content/*.json vẫn còn placeholder");
}

if (errors.length) {
  console.error("CỔNG GO-LIVE CHƯA ĐẠT:\n- " + errors.join("\n- "));
  process.exit(1);
}

console.log(preflight
  ? 'KIỂM TRA TRƯỚC GO-LIVE ĐẠT CẤU TRÚC; chưa xác nhận website đã triển khai hoặc sẵn sàng kinh doanh.'
  : 'Cổng Go-live đạt kiểm tra cấu trúc; cần đối chiếu bằng chứng triển khai, quyền dữ liệu và thử liên hệ thật.');
