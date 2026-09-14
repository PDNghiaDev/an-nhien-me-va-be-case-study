# Hướng dẫn Codex — Chặng 01

## Mục tiêu

Học viên mở được website mẫu đang chạy, đọc hiểu bản đồ source, ghi hồ sơ dự án và kiểm kê tài sản của chính họ. Chưa đổi giao diện, dữ liệu hay nội dung.

## Bối cảnh bắt buộc nhớ

Đây là **website hoàn chỉnh có sẵn**, không phải workspace trống. Không đề nghị khởi tạo dự án mới, không chạy `create-next-app`, không dựng lại cấu trúc.

Dữ liệu trong source thuộc về website mẫu Nguyên Khoa F&B, được chủ dự án khoá học cho phép phân phối làm vật liệu học tập. Nó **không phải** dữ liệu của học viên.

## Được phép đọc

- `README.md`, `AGENTS.md`
- `tai-lieu/trang-thai-hoc.md`, `tai-lieu/01-dinh-huong.md`
- Toàn bộ `app/`, `components/`, `lib/`, `content/` — chỉ để đọc và lập bản đồ
- Tên file trong `tai-san/` và `public/images/`

## Được phép sửa

- `tai-lieu/01-dinh-huong.md`
- `tai-lieu/01-ban-do-website-mau.md` — mẫu trống đã có sẵn với ba mục `Route đang có`, `Component đang dùng`, `Chuỗi cứng cần lưu ý`; điền vào mẫu, giữ nguyên tiêu đề
- `tai-lieu/golden-path-log.md`
- `tai-lieu/trang-thai-hoc.md`, chỉ sau xác nhận của học viên

## Không được sửa

- `app/`, `components/`, `lib/`, `content/`, `public/`
- `next.config.ts`, `package.json`, `app/globals.css`, `app/design-system.css`
- Tài liệu Chặng 02–13
- File gốc trong `tai-san/`

## Thứ tự bắt buộc

1. `PHÂN TÍCH`: đọc `AGENTS.md`, `README.md`, `trang-thai-hoc.md` và file này; xác nhận chặng hiện tại và phạm vi được sửa.
2. Hướng dẫn học viên chạy `npm ci`, `npm run dev` và đi hết các route công khai.
3. `PHÂN TÍCH`: lập ba bảng — route/dữ liệu/hàm đọc, danh mục component kèm nơi dùng, và danh sách chuỗi chữ viết thẳng trong component.
4. `THỰC THI`: ghi ba bảng vào đúng ba mục có sẵn của mẫu `tai-lieu/01-ban-do-website-mau.md`; thay dấu `[CHƯA ĐIỀN]`, không tạo file mới.
5. Hỏi học viên từng nhóm thông tin còn thiếu cho Hồ sơ dự án, tối đa năm câu một lượt.
6. `ĐỀ XUẤT`: trình bày nội dung sẽ ghi; chờ học viên xác nhận.
7. `THỰC THI`: cập nhật `01-dinh-huong.md` và `golden-path-log.md`.
8. Hướng dẫn học viên sao chép tài sản của họ vào `tai-san/`; chỉ đọc tên file, không mở nội dung riêng tư.
9. `KIỂM TRA`: chạy `npm run kiem-tra`, `npm run lint`, `npm run build` và đối chiếu tiêu chuẩn đạt.
10. Chỉ khi học viên xác nhận hoàn thành mới chuyển `currentStage` sang 2 trong `tai-lieu/trang-thai-hoc.md`. Không sửa `content/site.json`.

## Quy tắc riêng

- Khi lập bản đồ, phải mở đúng file để kiểm chứng; không suy đoán theo tên file.
- Phải nêu rõ những component tồn tại nhưng chưa trang nào dùng.
- Phải nêu rõ những chuỗi chữ không nằm trong JSON.
- Không tự điền thông tin doanh nghiệp của học viên.
- Tài sản chưa rõ quyền sử dụng ghi `CẦN THAY`.

## Tiêu chuẩn đạt

- `npm run kiem-tra`, `npm run lint`, `npm run build` chạy sạch.
- Website mở được ở localhost; mọi route công khai truy cập được.
- `tai-lieu/01-ban-do-website-mau.md` có đủ ba bảng, kiểm chứng được với file thật.
- `tai-lieu/01-dinh-huong.md` không còn ô bắt buộc trống.
- Mỗi nhóm tài sản có trạng thái `ĐÃ XÁC MINH` hoặc `CẦN THAY`.
- Không file nào trong `app/`, `components/`, `lib/`, `content/` bị sửa.
