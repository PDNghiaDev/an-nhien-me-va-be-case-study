# Hướng dẫn Codex — Chặng 03

## Mục tiêu

Hoàn thành Brand Kit và **bảng ánh xạ token**: mỗi biến màu, font, hình khối đang chạy trong source được quyết định giữ nguyên hay đổi sang giá trị nào. Chưa sửa CSS.

## Bối cảnh bắt buộc nhớ

Website đã có một hệ màu và hai font đang chạy. Học viên không chọn màu trên giấy trắng; họ quyết định đổi những biến nào.

Bảng ánh xạ là đầu ra quan trọng nhất — Chặng 06 sẽ áp đúng bảng này vào CSS.

## Được phép đọc

- `AGENTS.md`, file này
- `tai-lieu/01-dinh-huong.md`, `tai-lieu/02-website-brief.md`, `tai-lieu/03-brand-kit.md`
- `app/design-system.css`, `app/globals.css`, `app/layout.tsx` — chỉ để trích token
- Tên file trong `tai-san/` và `public/images/`

## Được phép sửa

- `tai-lieu/03-brand-kit.md`
- `tai-lieu/golden-path-log.md`
- `tai-lieu/trang-thai-hoc.md`, chỉ sau xác nhận của học viên

## Không được sửa

- `app/globals.css`, `app/design-system.css`, `app/layout.tsx`
- `app/`, `components/`, `lib/`, `content/`, `public/`
- Tài liệu Chặng 01–02 và Chặng 04–13

## Thứ tự bắt buộc

1. `PHÂN TÍCH`: trích bảng token đang chạy — tên biến, giá trị, vai trò, nơi dùng. Tách ba nhóm: màu, hình khối, typography. Với font, ghi rõ nơi khai báo và tên biến CSS.
2. `ĐỀ XUẤT`: ba bộ tính cách thương hiệu, mỗi bộ ba thuộc tính và ba cảm giác cần tránh, kèm biểu hiện nhìn thấy được.
3. `PHÂN TÍCH`: nêu mức can thiệp A (giữ nguyên), B (đổi màu), C (đổi màu và font); phân tích rủi ro từng mức. Không tự chọn.
4. `ĐỀ XUẤT`: bảng ánh xạ màu — tên biến | giá trị hiện tại | giá trị mới | lý do.
5. `KIỂM TRA`: tính tỷ lệ tương phản cho các cặp chữ/nền chính theo WCAG AA; đề xuất sửa nếu chưa đạt.
6. `ĐỀ XUẤT`: quyết định font. Mức A và B thì ghi giữ nguyên.
7. `ĐỀ XUẤT`: nguyên tắc hình ảnh, đối chiếu với các ô ảnh thật của website.
8. `THỰC THI`: cập nhật `03-brand-kit.md` và ghi `golden-path-log.md`.
9. `KIỂM TRA`: đối chiếu tiêu chuẩn đạt.
10. Chỉ sau xác nhận mới chuyển `currentStage` sang 4.

## Quy tắc riêng

- Bảng ánh xạ **chỉ được đổi giá trị**. Không thêm biến, không đổi tên biến, không xoá biến.
- Nếu đổi màu nhấn sáng, bắt buộc đề xuất kèm một bản đậm hơn dùng cho chữ, theo cách source đang tách màu vàng nền và màu vàng chữ.
- Nếu đổi font, phải giữ `subsets` có `vietnamese` và giữ nguyên tên biến CSS.
- Không sửa CSS ở chặng này, kể cả khi học viên yêu cầu — nhắc lại rằng Chặng 06 mới áp.
- Không dùng từ rỗng như "đẹp", "hiện đại" nếu không giải thích bằng biểu hiện cụ thể.

## Tiêu chuẩn đạt

- Bảng token trích được nêu đủ nhóm màu, hình khối và typography, kiểm chứng được với file thật.
- Bảng ánh xạ có bốn cột và chỉ dùng biến đã có.
- Mọi cặp chữ/nền quan trọng đạt WCAG AA cho chữ thường.
- Có ba thuộc tính, ba điều cần tránh, và nguyên tắc hình ảnh khả thi với tài sản hiện có.
- Không dòng mã nào bị sửa; `npm run lint` và `npm run build` vẫn sạch.
