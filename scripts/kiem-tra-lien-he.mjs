import { access, readFile } from "node:fs/promises";

const errors = [];
const requiredFiles = ["content/contact.json", "content/home-conversion.json", "content/news.json", "content/site.json", "components/home/ConsultForm.tsx", "components/layout/FooterNewsletter.tsx", "app/lien-he/page.tsx"];

for (const file of requiredFiles) {
  try { await access(file); } catch { errors.push(`Thiếu file: ${file}`); }
}

async function readJson(file) {
  try { return JSON.parse(await readFile(file, "utf8")); }
  catch { errors.push(`${file} thiếu hoặc sai cú pháp`); return {}; }
}

const contact = await readJson("content/contact.json");
const home = await readJson("content/home-conversion.json");
const news = await readJson("content/news.json");
const site = await readJson("content/site.json");

const channels = contact?.channels?.items;
if (!Array.isArray(channels) || channels.length < 3) {
  errors.push("contact.channels.items phải có ít nhất ba kênh liên hệ");
} else {
  for (const [index, channel] of channels.entries()) {
    const label = `contact.channels.items[${index}]`;
    for (const key of ["label", "value", "href", "status"]) if (typeof channel[key] !== "string") errors.push(`${label}.${key} phải là chuỗi`);
    if (channel.status === "ĐÃ XÁC MINH" && channel.href && !/^(https:\/\/|tel:|mailto:)/.test(channel.href)) errors.push(`${label}.href không đúng giao thức`);
  }
}

const social = contact?.social?.items;
if (!Array.isArray(social) || social.some(item => item.status !== "ĐÃ XÁC MINH" || !item.href?.startsWith("https://"))) errors.push("Các kênh social phải được xác minh và dùng HTTPS");
if (contact.submissionEnabled !== false) errors.push("RC-DEMO yêu cầu contact.submissionEnabled=false");

const consultForms = [contact?.form, home?.consult?.form];
function isDirect(config, label) {
  if (config.mode !== undefined && !['demo', 'direct'].includes(config.mode)) errors.push(`${label}: mode không hợp lệ`);
  if (config.mode !== 'direct') return false;
  const data = config.directContact;
  if (config.status !== 'ĐÃ XÁC MINH' || data?.status !== 'ĐÃ XÁC MINH') errors.push(`${label}: liên hệ trực tiếp chưa xác minh`);
  for (const key of ['title', 'description', 'label', 'href']) {
    if (typeof data?.[key] !== 'string' || !data[key].trim()) errors.push(`${label}: thiếu directContact.${key}`);
  }
  if (!/^(https:\/\/[^\s]+|tel:\+?[\d ()-]+|mailto:[^\s@]+@[^\s@]+)$/.test(data?.href ?? '')) errors.push(`${label}: href trực tiếp không an toàn/hợp lệ`);
  return true;
}
for (const [index, form] of consultForms.entries()) {
  if (!form) {
    errors.push(`Thiếu cấu hình form tư vấn ${index + 1}; nhánh gỡ form cần được kiểm thử riêng, không tự coi là đạt`);
    continue;
  }
  if (isDirect(form, `Form ${index + 1}`)) continue;
  if (form.status !== "DEMO") errors.push(`Form tư vấn ${index + 1} phải giữ trạng thái DEMO`);
  if (!/demo/i.test(`${form.submitLabel} ${form.demoNote}`)) errors.push(`Form tư vấn ${index + 1} chưa báo rõ chế độ demo trước thao tác`);
  if (!/không.+(gửi|lưu)/i.test(`${form.demoNote} ${form.successMessage}`)) errors.push(`Form tư vấn ${index + 1} chưa nói rõ dữ liệu không được gửi/lưu`);
}

for (const [label, newsletter] of [["footer", site?.footer?.newsletter], ["tin tức", news?.newsletter]]) {
  if (!newsletter) { errors.push(`Thiếu newsletter ${label}`); continue; }
  if (isDirect(newsletter, `Newsletter ${label}`)) continue;
  if (newsletter.status !== "DEMO") errors.push(`Newsletter ${label} phải là DEMO`);
  if (!/demo/i.test(`${newsletter.buttonLabel} ${newsletter.note}`)) errors.push(`Newsletter ${label} chưa báo rõ chế độ demo`);
  if (!/không.+(gửi|lưu)/i.test(`${newsletter.note} ${newsletter.successMessage}`)) errors.push(`Newsletter ${label} chưa nói rõ dữ liệu không được gửi/lưu`);
}

for (const file of ["components/home/ConsultForm.tsx", "components/layout/FooterNewsletter.tsx"]) {
  try {
    const source = await readFile(file, "utf8");
    if (/\bfetch\s*\(|\baxios\b|action\s*=|formAction\s*=/.test(source)) errors.push(`Form demo không được truyền dữ liệu ra ngoài: ${file}`);
    if (!/preventDefault\s*\(/.test(source)) errors.push(`Form demo phải chặn submit mặc định: ${file}`);
  } catch { /* Lỗi thiếu file đã ghi ở trên. */ }
}

if (!["demo", "production"].includes(site.siteMode)) errors.push('siteMode phải là demo hoặc production');

if (errors.length) {
  console.error("LUỒNG LIÊN HỆ STARTER CHƯA ĐẠT");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("LUỒNG LIÊN HỆ STARTER ĐẠT KIỂM TRA CẤU TRÚC");
console.log(`- ${channels.length} kênh trực tiếp và ${social.length} kênh social hợp lệ`);
console.log("- Các vùng liên hệ dùng mô phỏng có cảnh báo hoặc liên hệ trực tiếp; không bật backend");
console.log("- Mã form không có fetch, action hoặc thư viện truyền dữ liệu ra ngoài");
