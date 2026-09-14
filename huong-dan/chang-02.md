# Hướng dẫn Codex — Chặng 02

## Mục tiêu

Hoàn thành Website Brief và bảng quyết định route dựa trên sitemap có sẵn của website mẫu. Chưa đổi màu, font, nội dung hay điều hướng.

## Bối cảnh bắt buộc nhớ

Website đã có sẵn các route đang chạy. Học viên **không vẽ sitemap trên giấy trắng**; họ quyết định mỗi route hiện có là GIỮ, ĐỔI TÊN hay TẮT.

Không có lựa chọn "xoá route". Tắt nghĩa là gỡ khỏi điều hướng ở Chặng 08, giữ nguyên file.

## Được phép đọc

- `AGENTS.md`, file này
- `tai-lieu/01-dinh-huong.md`, `tai-lieu/01-ban-do-website-mau.md`, `tai-lieu/02-website-brief.md`
- `content/site.json` và `app/` — chỉ để liệt kê route và nhãn điều hướng

## Được phép sửa

- `tai-lieu/02-website-brief.md`
- `tai-lieu/golden-path-log.md`
- `tai-lieu/trang-thai-hoc.md`, chỉ sau xác nhận của học viên

## Không được sửa

- `app/`, `components/`, `lib/`, `content/`, `public/`
- Tài liệu Chặng 01 và Chặng 03–13

## Thứ tự bắt buộc

1. `PHÂN TÍCH`: đọc kết quả Chặng 01; tóm tắt dữ liệu đã có, còn thiếu và không được suy đoán; liệt kê route thật kèm nhãn điều hướng hiện tại.
2. `PHÂN TÍCH`: hỏi học viên tối đa năm câu một lượt về phần còn thiếu. Không hỏi lại dữ liệu Chặng 01, không hỏi về màu sắc hay phong cách.
3. `ĐỀ XUẤT`: tối đa ba phương án Brief, mỗi phương án gồm khách hàng chính, tình huống, câu định vị, một CTA chính và tối đa hai CTA phụ. Chưa bàn sitemap.
4. Chờ học viên chọn phương án hoặc ghép có chủ đích.
5. `ĐỀ XUẤT`: bảng quyết định route theo đúng route đang có — đường dẫn | nhãn hiện tại | vai trò | GIỮ/ĐỔI TÊN/TẮT | lý do. Với mục TẮT, nêu mọi nơi đang trỏ tới.
6. Nếu học viên muốn thêm trang mới: trước hết chỉ ra route hoặc component đang có gần nhất có thể dùng lại; chỉ đề xuất tạo mới khi không có lựa chọn phù hợp.
7. `THỰC THI`: cập nhật `02-website-brief.md` và ghi `golden-path-log.md`.
8. `KIỂM TRA`: đối chiếu tiêu chuẩn đạt.
9. Chỉ sau xác nhận mới chuyển `currentStage` sang 3.

## Quy tắc riêng

- Không tự chọn khách hàng chính, CTA hoặc số phận của route.
- Mỗi route xuất hiện đúng một lần với đúng một quyết định.
- Khi học viên giữ `/tin-tuc`, phải nói rõ đây là blog tĩnh đọc từ `content/news.json`, không có màn hình quản trị.
- Không sinh thêm `sitemap.md`; bảng route nằm trong Brief.
- Mục thiếu ghi `CẦN BỔ SUNG`, không bịa cho đầy.

## Tiêu chuẩn đạt

- Brief nêu rõ khách hàng chính, tình huống, câu định vị và đúng một CTA chính.
- Bảng quyết định route phủ hết route đang có, mỗi dòng có lý do.
- Route bị TẮT đã liệt kê được các nơi đang trỏ tới.
- Không file mã nguồn hoặc dữ liệu nào bị sửa; website chạy y như cuối Chặng 01.
- `npm run lint` và `npm run build` vẫn sạch.
