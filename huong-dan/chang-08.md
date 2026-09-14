# Hướng dẫn Codex — Chặng 08

## Mục tiêu

Đưa nội dung Chặng 05 vào JSON theo từng trang, đổi ảnh, bật hoặc tắt section theo quyết định Chặng 04, gỡ trang bị TẮT khỏi mọi nơi trỏ tới, và rà sạch liên kết chết. Đây là chặng thi công dài nhất.

## Bối cảnh bắt buộc nhớ

Ba quy tắc xuyên suốt, không được vi phạm dù học viên yêu cầu:

1. **Mỗi lần một trang.** Sửa xong → xem desktop → xem 375px → thử liên kết → lưu mốc → mới sang trang kế. Không nhận yêu cầu "cập nhật toàn bộ website theo nội dung mới".
2. **Sửa dữ liệu trước, sửa mã sau.** Phần lớn thay đổi chỉ cần sửa JSON. Chỉ đụng component khi chuỗi chữ nằm trong mã hoặc khi bật một section mới.
3. **Đẹp không đồng nghĩa bịa.** Dữ liệu pháp lý, số liệu, giá, liên hệ và lời chứng thực chưa xác minh giữ `CẦN THAY`.

Website cuối chặng này **được phép** còn `DEMO` và `CẦN THAY`. Chặng 13 mới đóng hết.

Không bật gửi dữ liệu cho form ở chặng này. Ba form là form mô phỏng; Chặng 09 dạy kiểm chứng trạng thái của chúng.

Trang chủ render section nào là do `app/page.tsx` quyết định, **không** do JSON.

## Được phép đọc

- `AGENTS.md`, file này
- `tai-lieu/02-website-brief.md`, `04-quyet-dinh-giao-dien.md`, `04-design-system.md`, `05-content-blueprint.md`, `05-demo-content/`, `07-danh-muc-component.md`
- Toàn bộ `content/`, `app/`, `components/`, `lib/`, `public/`, `scripts/`

## Được phép sửa

- Nội dung hiển thị trong `content/*.json` — giá trị, không phải tên khoá
- `app/page.tsx` — chỉ dòng render và dòng import khi bật/tắt section
- `page.tsx` của **đúng trang đang làm** — chỉ những chuỗi chữ hiển thị cho người dùng đang viết thẳng trong đó. Ví dụ ba nhãn `eyebrow`, `title`, `description` truyền vào `CommunitySection` trong `app/hoc-vien/page.tsx`. **Không** đổi routing, layout, thứ tự import, `generateStaticParams`, `metadata` hay cấu trúc JSX
- Các file trong `components/` — chỉ đúng dòng chứa chuỗi chữ hiển thị viết cứng cần đổi
- `content/site.json` — chỉ `navigation`, `footer.columns`, `footerLinks`, `routes` và các CTA khi dọn điều hướng
- `tai-lieu/05-content-blueprint.md` — cập nhật trạng thái và Sổ việc phải thay
- `tai-lieu/golden-path-log.md`
- `tai-lieu/trang-thai-hoc.md`, chỉ sau xác nhận của học viên

## Không được sửa

- `content/site.json → siteMode` — giữ `demo`
- `content/site.json → seo`, `contact`, `floatingActions` — Chặng 09 và 10 xử lý
- `content/contact.json` các khoá `submissionEnabled`, `form.demoNote`, `form.successMessage`, `form.submitLabel`, và **giá trị/href của từng kênh liên hệ** — Chặng 09 xử lý
- `content/site.json → catalog.basePath` khi học viên chưa yêu cầu
- Cấu trúc component; không tạo component mới, không xoá component khỏi source
- File route trong `app/` — không xoá để tắt một trang
- `lib/`, `scripts/`, `next.config.ts`, `package.json`
- Tài liệu Chặng 01–07 và Chặng 09–13

## Thứ tự bắt buộc

1. `KIỂM TRA`: chạy `npm run kiem-tra-giao-dien`, `npm run lint`, `npm run build`. Nếu chưa sạch, quay lại Chặng 07.
2. `PHÂN TÍCH`: lập bảng thi công, mỗi dòng là một việc — thứ tự | route | section | loại việc (đổi nội dung / đổi ảnh / bật section / tắt section / sửa chuỗi cứng) | file cần sửa | nguồn nội dung | rủi ro. Xếp thứ tự: trang chủ trước, trang nhiều lượt xem trước, việc chỉ sửa JSON trước việc phải sửa component. Không đề xuất trang hoặc section mới. Chờ học viên duyệt bảng. Hướng dẫn lưu mốc `Trước Chặng 08`.
3. `THỰC THI`: cá nhân hoá trang chủ **từng section một** theo bảng thi công. Trang chủ đọc từ `home.json`, `showcase.json` và `home-conversion.json`; không đoán section nào ở file nào. Sau mỗi section chạy `npm run kiem-tra-du-lieu`, báo file đã sửa và dừng lại để học viên xem desktop và 375px.
4. `KIỂM TRA`: rà riêng trang chủ — section nào còn nội dung mẫu gốc; ảnh nào còn trỏ ảnh mẫu; khoá nào có status không khớp bảng; ảnh nào thiếu alt hoặc alt không mô tả đúng ảnh mới; liên kết nào chưa có route đích. Chỉ báo cáo.
5. `THỰC THI`: bật hoặc tắt section theo quyết định Chặng 04. Tắt = xoá dòng render và dòng import không còn dùng trong `app/page.tsx`. Bật = trước đó phải `ĐỀ XUẤT` đủ bốn điều: component cần dữ liệu hình dạng nào và khoá nào đang cấp được; dữ liệu hiện có đủ chưa, thiếu trường nào; chuỗi chữ nào viết cứng trong component đó; cần thêm import nào. Chạy `npm run lint` và `npm run build` rồi dừng lại.
6. `THỰC THI`: cá nhân hoá trang giới thiệu, trang liên hệ và trang chính sách — **lần lượt**, không gộp ba trang vào một prompt. Trang liên hệ chỉ cập nhật `seo`, `hero`, `channels.title`, `channels.description`, `checklist`, `social.title`, `social.description`, `form.title`, `form.description`; chạy `npm run kiem-tra-lien-he` sau khi sửa.
7. `PHÂN TÍCH` rồi `THỰC THI`: danh mục và trang chi tiết. Trước khi sửa, báo: `catalog.basePath` hiện tại và thư mục route tương ứng; số mục và danh sách slug; các trường bắt buộc của một mục gồm cả khối `seo` và `faq` riêng; mục nào thiếu trường nào; trang danh sách và trang chi tiết đang render những khối nào. Sau đó cập nhật **từng mục theo slug**.
8. `THỰC THI`: blog và các trang còn lại theo quyết định Chặng 02. `/tin-tuc` đọc từ `content/news.json` — blog tĩnh, thêm bài = thêm phần tử vào JSON rồi build lại, không có màn hình quản trị; ô lọc chỉ chạy trên trình duyệt.
9. `PHÂN TÍCH` rồi `THỰC THI`: dọn điều hướng. Với route bị TẮT, rà toàn bộ `content/*.json`, `app/`, `components/` tìm mọi nơi còn trỏ tới — `navigation`, `footer.columns`, `footerLinks`, `routes`, `notFound`, các CTA trong JSON, và bất kỳ liên kết nào trong mã. Lập bảng nơi trỏ tới | file | cách xử lý đề xuất. Gỡ theo bảng đã duyệt, không xoá file route và không xoá dữ liệu JSON của trang đó.

    **Nói đúng phạm vi của việc TẮT.** Tắt route = **chỉ ẩn khỏi điều hướng**. Nó không làm route thành riêng tư và không tự loại route khỏi `/sitemap.xml`: `app/sitemap.ts` liệt kê `site.routes.*`, `catalog.basePath` cùng toàn bộ `services.items`, `showcase.faculty.items` và `news.items`, **không có cơ chế loại trừ**. Sau khi bật production, URL đó vẫn truy cập được và vẫn có thể bị crawl. Phải nói rõ điều này với học viên và ghi vào Sổ việc phải thay. Vì vậy **không đặt thông tin riêng tư trên trang bị tắt**. Muốn loại hẳn khỏi bản xuất bản thì cần hỗ trợ riêng ở lớp mã — **không** hướng dẫn học viên sửa `scripts/` hay `app/sitemap.ts` để vượt qua.
10. `KIỂM TRA`: lập danh sách mọi liên kết nội bộ render từ Header, Footer, trang chủ, danh sách, trang chi tiết, blog và 404; đối chiếu với route thật trong `app/` rồi báo: liên kết không có route đích; route có thật nhưng không có đường nào dẫn tới; CTA dùng `#` hoặc `href` rỗng; đường dẫn danh mục không khớp `site.catalog.basePath`; menu và footer không khớp bảng quyết định route. Không kiểm tra liên kết liên hệ bên ngoài — Chặng 09 xử lý.
11. Hướng dẫn học viên tự bấm hai hành trình và chụp desktop + 375px cho **từng route**, rồi chấm theo bảy tiêu chí: phong cách, nhịp trang, chiều sâu, phân cấp, hình ảnh, mobile, tính thật. Khi phát hiện lỗi, nhận từng lỗi một và mô tả đúng điều nhìn thấy.
12. `KIỂM TRA`: chạy `npm run kiem-tra-trang-web`, `npm run kiem-tra-du-lieu`, `npm run kiem-tra-giao-dien`, `npm run lint`, `npm run build`. Rà toàn bộ `app/`, `components/`, `content/` rồi báo: component import trực tiếp JSON; nội dung hoặc liên kết nội bộ viết cứng; mã HEX ngoài file CSS được phép; liên kết nội bộ chết hoặc route mồ côi; ảnh thiếu alt, thiếu `sizes` hoặc file không tồn tại; trường `DEMO` và `CẦN THAY` chia theo trang; mọi chuỗi còn sót của mẫu gốc — tên thương hiệu, tên người, số điện thoại, email, địa chỉ, đường dẫn ảnh và URL demo cũ. Xác nhận `siteMode` vẫn là `demo`.
13. `THỰC THI`: ghi `golden-path-log.md`. Chỉ sau xác nhận của học viên mới chuyển `currentStage` sang 9. Không bắt đầu Chặng 09.

## Quy tắc riêng

- Chỉ sửa giá trị, giữ nguyên tên khoá và cấu trúc. Không đổi số lượng phần tử trong mảng nếu học viên chưa yêu cầu — ba thẻ thành năm thẻ sẽ đổi bố cục hàng.
- Đường dẫn ảnh chỉ đổi sang file **đã tồn tại** trong `public/images/`. Không xoá ảnh mẫu trước khi đổi đường dẫn; đổi đường dẫn trước, xoá sau hoặc để Chặng 13 dọn.
- Cập nhật status theo bảng của học viên. Dữ liệu chưa xác minh giữ `CẦN THAY`, không tự thay bằng dữ liệu mới.
- Trang chính sách: không tự viết cam kết pháp lý, tên pháp nhân, địa chỉ, ngày hiệu lực, thời hạn lưu trữ hoặc công cụ đo lường. Phần chưa có căn cứ để trống có kiểm soát, đặt status `CẦN THAY` và ghi vào Sổ việc phải thay.
- Không viết bài mới nhân danh doanh nghiệp học viên; cũng không giữ nguyên bài của mẫu gốc như thể là bài của họ.
- Nếu bật `MethodSection`: nút bên trong nó có nhãn và đường dẫn viết thẳng trong mã — sửa đúng dòng đó theo danh sách chuỗi cứng.
- Ba phép thử bắt buộc cho danh mục: số thẻ trên trang danh sách bằng số mục trong JSON; mỗi thẻ mở đúng trang chi tiết; một slug bịa trả về trang 404, không phải màn hình lỗi.
- Nếu học viên muốn đổi `catalog.basePath`, trước hết liệt kê đầy đủ mọi thứ phải đổi theo — tên thư mục route trong `app/`, các liên kết trong `site.json` và JSON khác, mọi đường dẫn viết cứng — và cảnh báo nếu việc này làm hỏng liên kết đang có.
- Không bật `submissionEnabled`. Không có nơi nhận dữ liệu.
- Không tạo component mới cho một section; kiểm tra danh sách component đang ngủ ở `07-danh-muc-component.md` trước.
- Không dùng `href="#"`. `npm run kiem-tra-trang-web` báo lỗi khi phát hiện.
- Không nhận yêu cầu "làm đẹp hơn". Chỉ nhận mô tả đúng điều nhìn thấy.
- Chỉ sửa lỗi kỹ thuật ở bước nghiệm thu. Không tắt quy tắc kiểm tra.

## Tiêu chuẩn đạt

- Mọi trang GIỮ mang nội dung từ `05-demo-content/`; không còn câu chữ của mẫu gốc ở các section đã làm.
- Ảnh của học viên đã thay ảnh mẫu ở những ô đã chuẩn bị; không ảnh nào vỡ, méo hoặc trỏ file không tồn tại.
- Số section trên trang chủ khớp bảng chấm Chặng 04; section vừa bật hiển thị đủ dữ liệu, không khối trống; không component nào bị xoá khỏi source.
- Trang được TẮT không còn trong header, footer và mọi CTA; file route vẫn còn. **Không** yêu cầu route đó biến khỏi `/sitemap.xml` — gói chưa có cơ chế loại trừ, nên nó vẫn nằm trong sitemap và vẫn truy cập được bằng URL trực tiếp. Điều kiện đạt là học viên **biết** và đã ghi cảnh báo này vào Sổ việc phải thay.
- Không còn liên kết nội bộ chết hoặc `href="#"`; mọi trang quan trọng có ít nhất một đường dẫn tới; trang 404 vẫn dẫn về trang chủ và danh mục đang tồn tại.
- Có ảnh desktop và 375px cho mọi route được GIỮ; không trang nào tràn ngang ở 375px.
- Trang liên hệ vẫn hiển thị form mô phỏng với cảnh báo nguyên vẹn; `submissionEnabled` vẫn `false`.
- Báo cáo dấu vết mẫu gốc chỉ còn những mục cố ý giữ tới Chặng 09 hoặc 13, và tất cả đã nằm trong Sổ Go-live.
- `siteMode: demo`.
- `npm run kiem-tra-trang-web`, `kiem-tra-du-lieu`, `kiem-tra-giao-dien`, `lint`, `build` sạch.
