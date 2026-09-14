import { readFile } from "node:fs/promises";

const errors = [];

const documents = [
  {
    file: "tai-lieu/12-nghiem-thu.md",
    headings: ["Vòng 1", "Vòng 2", "Vòng 3", "Vòng 4", "Vòng 5", "Danh sách lỗi", "Kết luận"],
  },
  {
    file: "tai-lieu/handoff.md",
    headings: ["Trạng thái bản bàn giao", "Website đang chạy ở đâu", "Tài khoản và quyền sở hữu", "Sửa gì thì vào đâu", "Trạng thái dữ liệu", "Build và deploy", "Khi hỏng và rollback", "Việc còn mở và Chặng 13", "Cầu nối WordPress Advanced"],
  },
  {
    file: "tai-lieu/12-van-hanh-rollback.md",
    headings: ["Bài tập thay đổi đảo ngược được", "Lớp 1", "Lớp 2", "Lớp 3", "Nhịp vận hành tối thiểu", "Nhịp theo sự kiện"],
  },
  {
    file: "tai-lieu/21-beta-user-test-kit.md",
    headings: ["Chọn người thử", "Bốn nhiệm vụ bắt buộc", "Phiếu ghi cho từng người", "Cách tổng hợp", "Cổng kết luận"],
  },
];

for (const document of documents) {
  try {
    const content = await readFile(document.file, "utf8");
    for (const heading of document.headings) {
      if (!content.includes(heading)) errors.push(`${document.file} thiếu mục: ${heading}`);
    }
    if (content.includes("[CHƯA ĐIỀN]")) errors.push(`${document.file} vẫn còn [CHƯA ĐIỀN]`);
  } catch {
    errors.push(`Thiếu tài liệu bàn giao: ${document.file}`);
  }
}

try {
  const site = JSON.parse(await readFile("content/site.json", "utf8"));
  if (site.siteMode !== "demo") errors.push('siteMode phải giữ là "demo" ở cuối Chặng 12');
} catch {
  errors.push("content/site.json thiếu hoặc sai cú pháp");
}

try {
  const acceptance = await readFile("tai-lieu/12-nghiem-thu.md", "utf8");
  if (!/P0 còn mở:\s*0\b/.test(acceptance)) errors.push("Biên bản phải ghi P0 còn mở: 0");
  if (!/(ĐẠT|CHƯA THỬ|BỊ CHẶN|KHÔNG ÁP DỤNG)/.test(acceptance)) {
    errors.push("Biên bản chưa dùng trạng thái nghiệm thu hợp lệ");
  }
} catch {
  // Lỗi thiếu file đã được ghi phía trên.
}

if (errors.length) {
  console.error("BÀN GIAO CHƯA ĐẠT");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("BÀN GIAO GOLDEN WEBSITE ĐẠT CẤU TRÚC");
console.log("- Đủ biên bản 5 vòng, handoff, rollback drill và Beta User Test Kit");
console.log("- Không còn placeholder [CHƯA ĐIỀN]");
console.log("- P0 còn mở bằng 0");
console.log("- siteMode vẫn là demo");
