# Chặng 06 — Khởi tạo và hợp đồng dữ liệu

- Bắt đầu từ bản sao Starter V2, không chạy `create-next-app`.
- Dữ liệu lặp của dịch vụ và bài viết nằm tại `lib/case-data.ts`.
- Route và component chỉ nhận dữ liệu qua import/props; `InfoPage` không tự đọc file dữ liệu.
- Ảnh dự án nằm trong `public/images/an-nhien/`.
- Quyết định có chủ đích: giữ các file JSON gốc làm tài liệu đối chiếu; website case dùng adapter `case-data.ts` để tránh gắn dữ liệu mẹ và bé vào schema F&B cũ.

