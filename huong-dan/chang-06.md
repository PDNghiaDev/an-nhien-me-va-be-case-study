# Hướng dẫn Codex — Chặng 06

## Mục tiêu

Lập bảng hợp đồng dữ liệu 10 file JSON, áp bảng ánh xạ token Chặng 03 vào CSS, đổi thương hiệu ở lớp dữ liệu, và chứng minh bằng thí nghiệm rằng sửa JSON thì giao diện đổi theo. Đây là chặng đầu tiên được sửa mã nguồn.

## Bối cảnh bắt buộc nhớ

Chặng 06 **không khởi tạo** gì cả. Website đã chạy từ Chặng 01. Nếu bạn thấy mình định chạy `create-next-app` hoặc tạo thư mục `web/`, bạn đang mở sai thư mục hoặc chưa đọc `AGENTS.md`. Dừng lại.

Kiến trúc phải thuộc:

```text
content/*.json  →  lib/content.ts  →  trang trong app/  →  component nhận props
```

Component **không đọc JSON**. `npm run kiem-tra-giao-dien` và `npm run kiem-tra-trang-web` chặn việc này bằng máy: chúng báo lỗi nếu bất kỳ file trong `components/` hoặc `app/` import từ `content/`.

Source có **10** file JSON. Sáu file là bộ lõi mà `npm run kiem-tra-du-lieu` bắt buộc: `site`, `home`, `about`, `services`, `projects`, `contact`. Bốn file còn lại: `legal`, `showcase`, `home-conversion`, `news`.

## Được phép đọc

- `AGENTS.md`, `README.md`, file này
- `tai-lieu/01-ban-do-website-mau.md`, `02-website-brief.md`, `03-brand-kit.md`, `04-design-system.md`, `05-content-blueprint.md`
- Toàn bộ `content/`, `lib/`, `app/`, `components/`, `scripts/`

## Được phép sửa

- `app/design-system.css` — **chỉ giá trị biến trong `:root`**
- `app/layout.tsx` — chỉ khi Chặng 03 chốt mức C (đổi font)
- `content/site.json` — chỉ các khoá `brandName`, `tagline`, `demoBanner`, `logo`, `ui.copyright`, `ui.homeLinkLabel`
- `tai-lieu/06-hop-dong-du-lieu.md` — mẫu trống đã có sẵn; điền vào mẫu, giữ nguyên tiêu đề
- `tai-lieu/golden-path-log.md`
- `tai-lieu/trang-thai-hoc.md`, chỉ sau xác nhận của học viên

## Không được sửa

- `content/site.json` các khối `navigation`, `footer`, `footerLinks`, `headerCta`, `contact`, `seo`, `floatingActions`, `routes`, `catalog` — Chặng 07, 09 và 10 xử lý
- `content/site.json → siteMode` — phải giữ `demo`
- `lib/types.ts`, `lib/content.ts`, `lib/seo.ts`
- `components/`, `app/` ngoài `app/layout.tsx` khi đổi font
- `scripts/`, `next.config.ts`, `package.json`
- Các file JSON còn lại trong `content/`
- Tài liệu Chặng 01–05 và Chặng 07–13

## Thứ tự bắt buộc

1. `PHÂN TÍCH`: xác nhận thư mục đang mở có `app/`, `components/`, `content/`, `lib/`, `scripts/`, `tai-lieu/`, `tai-san/` và `package.json` cùng cấp. Kiểm tra có dự án Next.js lồng bên trong hoặc thư mục `web/` hay không.
2. `KIỂM TRA`: chạy `npm run kiem-tra`, `npm run kiem-tra-du-lieu`, `npm run lint`, `npm run build`; báo kết quả từng lệnh bằng tiếng Việt dễ hiểu. Lỗi cũ phải xử lý trước khi đi tiếp.
3. Hướng dẫn học viên lưu mốc `Trước Chặng 06`. Liệt kê đúng các file dự kiến được sửa ở chặng này.
4. `PHÂN TÍCH`: lập bảng hợp đồng dữ liệu — file JSON | các khối cấp cao nhất | hàm đọc trong `lib/content.ts` | route đang tiêu thụ | ghi chú. Trả lời riêng bốn câu: file nào chưa được route nào dùng; hàm nào tra cứu theo slug và phục vụ route động nào; khối dữ liệu nào xuất hiện ở nhiều trang; trường nào mang `DEMO` hoặc `CẦN THAY`, đếm theo file.
5. `THỰC THI`: ghi bảng và bốn câu trả lời vào `tai-lieu/06-hop-dong-du-lieu.md`. Không thêm nhận định mới.
6. `ĐỀ XUẤT`: nếu Chặng 03 chốt mức B hoặc C — trình bày chính xác từng dòng sẽ đổi trong `app/design-system.css`: file, tên biến, giá trị cũ, giá trị mới. Mức A thì ghi `Không áp dụng` và sang bước 8.
7. `THỰC THI`: áp đúng danh sách vừa duyệt. Chạy `npm run lint` và `npm run build`, báo file đã sửa rồi dừng lại.
8. `ĐỀ XUẤT`: bảng thay đổi cho `brandName`, `tagline`, `demoBanner`, `logo`, `ui.copyright`, `ui.homeLinkLabel` trong `content/site.json`, mỗi dòng gồm giá trị cũ và giá trị mới.
9. `THỰC THI`: áp đúng bảng vừa duyệt. Chạy `npm run kiem-tra-du-lieu` rồi dừng lại. Hướng dẫn học viên mở lại website: **header và footer** phải đổi theo. **Tiêu đề tab thì chưa** — nó đọc từ `site.seo.defaultTitle` và `titleTemplate` qua `lib/seo.ts`, thuộc Chặng 10. Không hứa đổi `brandName` là tab đổi ngay.
10. `PHÂN TÍCH`: đọc `lib/types.ts` và `lib/content.ts`; giải thích cho người không biết lập trình về `ContentStatus`, `SiteMode`, vì sao mỗi file JSON có một hàm đọc riêng, thêm một khoá mới thì phải sửa những đâu, và điều gì xảy ra nếu component import thẳng `content/home.json`. Ghi câu trả lời vào `06-hop-dong-du-lieu.md`.
11. `KIỂM TRA`: phép thử kết nối dữ liệu, thực hiện lần lượt và báo kết quả từng bước — ghi lại tiêu đề hero hiện tại; đổi tạm thành `KIỂM TRA KẾT NỐI DỮ LIỆU`; xác nhận trình duyệt hiển thị câu mới; khôi phục **chính xác** tiêu đề cũ; đọc `components/layout/DemoBanner.tsx` và nơi nó được render rồi **giải thích bằng chữ** dải nhãn demo phụ thuộc giá trị nào — **không đổi `siteMode` để thử**; rà `components/` và `app/` xác nhận không nơi nào import trực tiếp `content/*.json`.

    Phạm vi sửa dữ liệu của phép thử này là **đúng một khoá**: `content/home.json → hero.title`, và phải hoàn tác nguyên văn. Không mở rộng sang khoá khác.
12. `KIỂM TRA`: chạy `npm run kiem-tra-giao-dien`, `npm run kiem-tra-du-lieu`, `npm run lint`, `npm run build`. Rà và liệt kê: mã HEX trong `app/` hoặc `components/` (bỏ qua `app/globals.css` và `app/design-system.css`); component import trực tiếp JSON; thư viện mới không được yêu cầu; trường còn `CẦN THAY` chia theo file.
13. `THỰC THI`: ghi `golden-path-log.md`. Chỉ sau xác nhận của học viên mới chuyển `currentStage` sang 7. Không bắt đầu Chặng 07.

## Quy tắc riêng

- Không khởi tạo Next.js, không cài thư viện, không nâng phiên bản package.
- Chỉ sửa **giá trị** biến trong `:root`. Không thêm biến, không đổi tên biến, không xoá biến, không đụng selector hoặc layout.
- Không rải mã màu vào component; mọi màu phải đi qua biến CSS. `kiem-tra-giao-dien` báo lỗi khi phát hiện HEX trong `components/`.
- Nếu đổi font: giữ nguyên tên biến CSS và giữ `subsets` có `vietnamese`. Mất `vietnamese` là hỏng dấu trên một phần chữ.
- Mọi màu mới phải truy ngược được về bảng ánh xạ Chặng 03. Không tự chọn thêm màu.
- Sửa **một khối JSON, một lần xem kết quả**. Không sửa nhiều khối rồi mới mở website.
- Với `logo`: nếu học viên đã có file trong `public/images/`, dùng đúng đường dẫn đó và cập nhật `width`/`height` theo kích thước thật. Nếu chưa có, giữ nguyên đường dẫn hiện tại và đặt status `CẦN THAY`.
- `siteMode` **không được đổi** ở chặng này, kể cả để thử rồi trả lại. Muốn giải thích cơ chế thì đọc `DemoBanner.tsx`, `lib/seo.ts` và `app/robots.ts`. Chặng 13 là nơi duy nhất được đổi giá trị đó.
- Không giữ lại nội dung thử nghiệm; không còn chuỗi `KIỂM TRA KẾT NỐI DỮ LIỆU` trong dự án.
- Không tắt quy tắc kiểm tra để làm lệnh chạy qua.
- Không nhận yêu cầu kiểu "làm trang chủ đẹp hơn". Chặng 06 chỉ đổi lớp dữ liệu và token.

## Tiêu chuẩn đạt

- Không có dự án Next.js thứ hai; không thư viện mới được cài.
- Bảng hợp đồng dữ liệu phủ đủ 10 file JSON, kiểm chứng được với `lib/content.ts`. Bảng phải nêu đúng: `lib/content.ts` có một hàm đọc cho từng file cộng ba hàm tra cứu theo slug (khoá học, thành viên đội ngũ, bài viết); `projects.json` hiện không phục vụ route công khai nào; trang chủ tiêu thụ ba file.
- Website mang màu, font và tên thương hiệu của học viên; bố cục không đổi so với cuối Chặng 05.
- Dấu tiếng Việt hiển thị đúng; chữ đọc rõ trên mọi nền.
- Sửa một dòng JSON thì giao diện đổi theo, và đã được khôi phục nguyên văn.
- Học viên giải thích được dải nhãn demo phụ thuộc giá trị nào, **không** cần bật thử; `siteMode` chưa từng bị đổi và vẫn là `demo`.
- `npm run kiem-tra-giao-dien`, `npm run kiem-tra-du-lieu`, `npm run lint`, `npm run build` sạch.
