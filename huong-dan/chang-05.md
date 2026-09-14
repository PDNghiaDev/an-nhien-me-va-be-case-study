# Hướng dẫn Codex — Chặng 05

## Mục tiêu

Xuất bảng mọi trường chữ đang hiển thị, viết lại nội dung theo đúng độ dài khuôn có sẵn, chuẩn hoá ảnh của học viên vào `public/images/`, và mở Sổ việc phải thay trước Go-live. Chưa sửa một file JSON nào.

## Bối cảnh bắt buộc nhớ

Học viên **không viết nội dung cho trang trắng**. Họ điền vào một khuôn đã có, với giới hạn độ dài đã biết trước.

Điểm dễ sai nhất của gói V2: source mang dữ liệu liên hệ **thật của Nguyên Khoa F&B** với nhãn `ĐÃ XÁC MINH` — ví dụ `content/site.json → contact`, `content/contact.json → channels.items`. Nhãn đó nghĩa là đã xác minh cho họ, **không** cho học viên. Với học viên, mọi giá trị đó là `CẦN THAY`.

Không phải mọi chữ nằm trong JSON. Phải rà component thật để tìm chuỗi viết cứng, không suy đoán theo tên file.

## Được phép đọc

- `AGENTS.md`, file này
- `tai-lieu/01-dinh-huong.md`, `02-website-brief.md`, `03-brand-kit.md`, `04-quyet-dinh-giao-dien.md`, `04-design-system.md`
- Toàn bộ `content/`, `app/`, `components/` — chỉ để trích trường chữ và chuỗi cứng
- Tên file và metadata cần thiết trong `tai-san/` và `public/images/`

## Được phép sửa

- `tai-lieu/05-content-blueprint.md` (tạo mới, gồm mục `Sổ việc phải thay trước Go-live`)
- `tai-lieu/05-demo-content/` (tạo mới, một file cho mỗi trang được GIỮ)
- `public/images/` — **chỉ thêm** bản sao ảnh của học viên
- `tai-lieu/golden-path-log.md`
- `tai-lieu/trang-thai-hoc.md`, chỉ sau xác nhận của học viên

## Không được sửa

- `content/` — không một dòng nào ở chặng này
- `app/`, `components/`, `lib/`, `scripts/`
- File gốc trong `tai-san/`
- Ảnh mẫu đang được JSON tham chiếu trong `public/images/` — không xoá, không đổi tên
- Tài liệu Chặng 01–04 và Chặng 06–13

## Thứ tự bắt buộc

1. `PHÂN TÍCH`: với các trang GIỮ và các section GIỮ/ĐỔI NỘI DUNG, xuất bảng mọi trường chữ đang hiển thị — route | section | file JSON | đường dẫn khoá | nội dung hiện tại | số ký tự | status hiện tại.
2. `PHÂN TÍCH`: sau bảng, liệt kê riêng những chuỗi chữ **không** nằm trong JSON mà viết thẳng trong component, kèm file và dòng.
3. `ĐỀ XUẤT`: gán `P0`/`P1`/`P2` và một trạng thái đích `ĐÃ XÁC MINH` | `DEMO` | `CẦN THAY` cho từng dòng.
4. `ĐỀ XUẤT`: viết nội dung mới **từng section một** cho trang chủ, giữ độ dài trong ±15% số ký tự hiện tại. Chờ học viên duyệt từng section.
5. `THỰC THI`: ghi nội dung đã duyệt vào `tai-lieu/05-demo-content/trang-chu.md` và cập nhật `05-content-blueprint.md`.
6. Lặp vòng `ĐỀ XUẤT` → học viên duyệt → `THỰC THI` cho **mỗi trang** còn lại. Không viết toàn bộ website trong một lượt.
7. `PHÂN TÍCH`: phản biện toàn bộ `05-demo-content/` theo 6 tiêu chí — đúng khách hàng chính, bám câu định vị, đủ khoá theo bảng, độ dài không vượt ngưỡng, không trùng ý giữa các trang, không có dữ liệu bịa. Liệt kê lỗi theo file và section kèm mức P0/P1/P2. Chưa sửa.
8. `PHÂN TÍCH`: lập bảng ảnh — ô ảnh | route | khoá JSON hoặc component | tỷ lệ yêu cầu | ảnh mẫu đang dùng | ảnh của học viên phù hợp | còn thiếu | quyền sử dụng | trạng thái. Chỉ đọc tên file; chưa sao chép.
9. `THỰC THI`: sau khi bảng được duyệt, tạo bản sao ảnh đã chọn vào `public/images/`, tên không dấu, cắt theo tỷ lệ trong `04-design-system.md`, nén cho web. Ghi đường dẫn mới và trạng thái vào `05-content-blueprint.md`.
10. `KIỂM TRA`: chạy `npm run kiem-tra-du-lieu`, `npm run lint`, `npm run build`; đối chiếu tiêu chuẩn đạt, báo ĐẠT/CHƯA ĐẠT theo từng trang.
11. Chỉ sau xác nhận của học viên mới chuyển `currentStage` sang 6. Không sửa `content/` và chưa chuyển nội dung sang JSON.

## Quy tắc riêng

- Cột số ký tự phải có số thật, không để trống.
- Thông tin liên hệ, giá, số liệu, lời chứng thực, chứng nhận và nội dung pháp lý chưa có nguồn của học viên **bắt buộc** là `CẦN THAY`. Không được gán `DEMO` cho dữ liệu mà người lạ tin vào có thể bị thiệt hại.
- Mọi dữ liệu của Nguyên Khoa còn sót đều là `CẦN THAY`, kể cả khi source đang mang nhãn `ĐÃ XÁC MINH`.
- Ô chưa có dữ liệu thật: giữ chỗ an toàn và ghi `CẦN THAY`. Không bịa.
- Trang chính sách bảo mật: không tự viết cam kết pháp lý, tên pháp nhân, ngày hiệu lực hoặc thời hạn lưu trữ. Phần chưa có căn cứ để trống có kiểm soát và ghi vào Sổ Go-live.
- Trang tin tức là blog tĩnh đọc từ `content/news.json`. Không chép bài của Nguyên Khoa làm bài của học viên.
- Không sửa hoặc xoá file gốc trong `tai-san/`; chỉ xử lý bản sao trong `public/images/`.
- Không xoá ảnh mẫu đang được JSON tham chiếu — Chặng 08 mới đổi đường dẫn.
- Ảnh minh hoạ tạo bằng AI phải có hậu tố `-demo` trong tên. Không tạo người thật, khách hàng, lớp học hoặc bằng chứng giả.
- Nội dung alt được ghi trong bảng, **chưa** đưa vào JSON.
- Nếu nội dung viết ra dài gấp khuôn, rút gọn chữ. Không đề xuất sửa component cho vừa chữ.

## Tiêu chuẩn đạt

- Mỗi section GIỮ có ít nhất một dòng trong bảng; bảng không chứa trường của trang đã TẮT.
- Danh sách chuỗi cứng nêu được ít nhất một trường hợp **đang thật sự render**: ba nhãn `eyebrow`/`title`/`description` truyền thẳng trong `app/hoc-vien/page.tsx`, hoặc nhãn "Xem cấu trúc bài viết" trong `NewsSection` của `components/home/ShowcaseSections.tsx`. Chuỗi trong `components/ui/Card.tsx` và `components/home/ProgramCard.tsx` có thật nhưng thuộc component chưa được trang nào dùng — ghi riêng, không trình bày như thể đang hiển thị.
- Không ô trạng thái nào trống; không ô `P0` nào trống.
- Số điện thoại, email, địa chỉ và tài khoản mạng xã hội trong source đều được đánh `CẦN THAY`.
- Mỗi trang GIỮ có một file trong `05-demo-content/`; trang con không chỉ lặp lại trang chủ.
- Ảnh mới có tên không dấu, đúng tỷ lệ; ảnh DEMO có hậu tố `-demo`; bản gốc trong `tai-san/` không bị sửa.
- Website vẫn chạy y như cuối Chặng 04 vì chưa đường dẫn nào bị đổi.
- `content/` chưa bị sửa dòng nào.
- `npm run kiem-tra-du-lieu`, `npm run lint`, `npm run build` sạch.
