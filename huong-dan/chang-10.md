# Hướng dẫn Codex — Chặng 10

## Mục tiêu

Giúp học viên hiểu cơ chế SEO kỹ thuật đã dựng sẵn, thay toàn bộ dữ liệu SEO của mẫu bằng của họ, dọn JSON-LD về phần truy được nguồn, rà heading/alt/bàn phím, và ghi kết quả hiệu năng trung thực. Đạt trạng thái `NỀN KỸ THUẬT SẴN SÀNG`.

## Bối cảnh bắt buộc nhớ

Nền SEO kỹ thuật đã có trong source. Chặng 10 **không xây lại** nó.

Bốn file quyết định toàn bộ SEO kỹ thuật: `lib/seo.ts` tạo metadata từ dữ liệu SEO và `siteMode`; `app/sitemap.ts` sinh danh sách URL công khai; `app/robots.ts` quyết định cho phép hay chặn crawl; `components/seo/JsonLd.tsx` là công cụ nhúng dữ liệu có cấu trúc.

**Kiểm chứng trước khi nói:** trong bản Starter V2 này, `JsonLd` **chưa được trang nào import**. Website hiện không nhúng JSON-LD nào. `npm run kiem-tra-seo` chỉ yêu cầu file tồn tại, không chứa `AggregateRating`/`Review`, và không import trực tiếp `content/` — nó **không** kiểm tra trang nào đang nhúng gì. Không nói với học viên rằng website đang có JSON-LD cần dọn.

`siteMode` là **nguồn sự thật duy nhất**. Không tạo thêm một cờ SEO riêng. Với `siteMode: demo`, toàn site mang `noindex, nofollow` và `robots.txt` chặn toàn site. Chỉ Chặng 13 mới bật `production`.

Không đổi `siteMode` sang `production` để thử SEO ở chặng này. Kiểm tra logic bằng mã và lệnh kiểm tra.

Dữ liệu SEO nằm ở hai cấp: khối `seo` trong `content/site.json` cho toàn site, và khối `seo` trong từng file nội dung cho từng trang. Với mục động trong `services.json`, khối `seo` nằm trong chính mục đó.

`npm run kiem-tra-seo` kiểm tra **bảy** trường cấp site (`siteUrl`, `defaultTitle`, `titleTemplate`, `defaultDescription`, `locale`, `ogImage`, `ogImageAlt`) và **năm** trường cho từng trang (`title`, `description`, `path`, `ogImage`, `ogImageAlt`), áp cho `home`, `about`, `services`, `projects`, `contact`, `legal` và từng mục trong `services`/`projects`. Nó cũng kiểm tra ảnh OG tồn tại thật trong `public/`, chặn schema đánh giá trong `JsonLd.tsx`, và chặn `JsonLd` import JSON trực tiếp.

Về `siteMode`: `kiem-tra-seo` chấp nhận **cả `demo` lẫn `production`** — nó chỉ chặn giá trị lạ. Đừng nói với học viên rằng lệnh này chỉ chạy được ở chế độ demo. Việc giữ `demo` ở Chặng 10 là quy định của **bài học**, không phải ràng buộc của lệnh. Ba lệnh chạy được ở cả hai chế độ là `kiem-tra-seo`, `kiem-tra-lien-he`, `kiem-tra-static`; năm lệnh chỉ chạy ở `demo` là `kiem-tra`, `kiem-tra-du-lieu`, `kiem-tra-giao-dien`, `kiem-tra-trang-web`, `kiem-tra-ban-giao`.

`kiem-tra-seo` cũng **không** phủ `/tin-tuc`, từng bài viết trong `news.json`, `showcase.json` hay `home-conversion.json`. Ma trận route phải bao hết mọi route đang mở; lệnh sạch không có nghĩa ma trận đã đủ.

Lưu ý phạm vi lệnh kiểm tra: `showcase.json`, `home-conversion.json` và `news.json` **không** nằm trong danh sách `kiem-tra-seo`. Metadata của `/tin-tuc` và bài viết vẫn phải được rà bằng tay, không dựa vào lệnh.

## Được phép đọc

- `AGENTS.md`, file này
- `tai-lieu/02-website-brief.md`, `05-content-blueprint.md`, `05-demo-content/`
- Toàn bộ `content/`, `app/`, `components/`, `lib/`, `public/`, `scripts/`
- Tài liệu Next.js cục bộ trong `node_modules/next/dist/docs/` về `generateMetadata`, `metadataBase`, `sitemap`, `robots`

## Được phép sửa

- Khối `seo` trong `content/site.json`
- Khối `seo` trong `content/home.json`, `about.json`, `services.json` (gồm từng mục theo slug), `projects.json`, `contact.json`, `legal.json`, `news.json`, `showcase.json`, `home-conversion.json`
- Nơi tạo object JSON-LD, nếu có — **chỉ để gỡ** trường không truy được nguồn. Hiện chưa có nơi nào, và **không được tự thêm**
- Sửa nhỏ cho lỗi accessibility đã được học viên duyệt: `alt`, nhãn ô nhập, cấp heading, `focus-visible`, `sizes`, `priority`
- `tai-lieu/05-content-blueprint.md` — Sổ việc phải thay
- `tai-lieu/golden-path-log.md`
- `tai-lieu/trang-thai-hoc.md`, chỉ sau xác nhận của học viên

## Không được sửa

- `content/site.json → siteMode` — giữ `demo` suốt chặng
- `lib/seo.ts`, `app/sitemap.ts`, `app/robots.ts` — logic không đổi ở chặng này
- Nội dung hiển thị của trang, route, slug, `catalog.basePath`
- `content/contact.json → submissionEnabled` và mọi khoá form
- Dữ liệu liên hệ đã chốt ở Chặng 09
- `scripts/`, `next.config.ts`, `package.json`
- Tài liệu Chặng 01–09 và Chặng 11–13

## Thứ tự bắt buộc

1. `KIỂM TRA`: chạy `npm run kiem-tra-seo`, `npm run lint`, `npm run build`.
2. `PHÂN TÍCH`: đọc `lib/seo.ts`, `app/sitemap.ts`, `app/robots.ts`, `components/seo/JsonLd.tsx` và tài liệu Next.js cục bộ. Giải thích bằng ngôn ngữ người mới: `siteMode` ảnh hưởng metadata và robots ra sao — **trích đúng dòng làm bằng chứng**; canonical được ghép từ đâu; URL nào được đưa vào sitemap và URL nào bị loại; trang tĩnh và trang `[slug]` lấy metadata khác nhau thế nào. Hướng dẫn lưu mốc `Trước Chặng 10`.
3. `PHÂN TÍCH`: lập ma trận route | công khai hay nội bộ | file dữ liệu | title | description | path | ảnh chia sẻ | trạng thái, bao gồm mọi route tĩnh và mọi slug động. Sau ma trận báo riêng: route nào thiếu dữ liệu SEO; title hoặc description nào trùng nhau; chỗ nào còn mang tên thương hiệu, câu chữ hoặc địa chỉ của mẫu gốc; ảnh chia sẻ nào trỏ tới file không tồn tại; route nào đã tắt ở Chặng 08 nhưng vẫn còn dữ liệu SEO.
4. `ĐỀ XUẤT`: thay đổi cho `content/site.json → seo` — `siteUrl`, `defaultTitle`, `titleTemplate`, `defaultDescription`, `locale`, `ogImage`, `ogImageAlt`, `title`, `description`. Nguồn: `02-website-brief.md` và `05-content-blueprint.md`. Nếu học viên chưa có tên miền, đề xuất một địa chỉ placeholder rõ ràng và ghi việc thay URL thật vào Sổ Go-live.
5. `ĐỀ XUẤT`: khối `seo` mới cho từng file nội dung, dựa trên nội dung thật của trang đó trong `05-demo-content/`. Với `services.json`, làm cả khối `seo` của từng mục theo slug.
6. `THỰC THI`: áp các khối `seo` đã duyệt. Chạy `npm run kiem-tra-seo` và `npm run build`, báo route nào còn thiếu dữ liệu.
7. `PHÂN TÍCH`: rà mọi ảnh chia sẻ — file có tồn tại trong `public/` không; kích thước và tỷ lệ có phù hợp không; alt có mô tả đúng ảnh không; route nào dùng ảnh mặc định, route nào có ảnh riêng; ảnh nào còn là ảnh của mẫu gốc. Chỉ báo cáo. Không tự tạo ảnh, không lấy ảnh từ internet.
8. `THỰC THI`: thay ảnh chia sẻ chưa phù hợp bằng ảnh học viên đã chuẩn bị ở Chặng 05. Nếu chưa có, dùng một ảnh hợp lệ đang có và ghi việc thay vào Sổ Go-live.
9. `KIỂM TRA`: sau `npm run build`, so sánh nội dung sitemap sinh ra với ma trận route và bảng quyết định route. Báo: URL có trong sitemap nhưng trang đó đã tắt; route học viên giữ nhưng không có trong sitemap; URL nào dùng sai tên miền; số lượng URL chi tiết có khớp số mục thật không. Không đổi `siteMode` để thử.
10. `PHÂN TÍCH`: rà toàn bộ `app/` và `components/` tìm mọi dòng import hoặc render `JsonLd`. **Nếu không có nơi nào dùng — kết quả đúng của bản gốc — nói rõ là không có, không suy đoán và không dựng ra một object để "dọn".** Nếu có, với từng trường chỉ ra nguồn dữ liệu cụ thể và báo riêng: trường nào lấy từ dữ liệu mẫu gốc; trường nào không truy được về dữ liệu học viên đã xác minh; có `AggregateRating`, `Review`, `priceRange`, `address`, `telephone`, `sameAs` hoặc `openingHours` nào không.
11. Tuỳ kết quả bước 10:
    - **Không nơi nào dùng** — kết quả đúng của bản gốc: ghi vào Sổ Go-live "chưa nhúng JSON-LD, lựa chọn có chủ đích của gói". **Không sửa mã, không tự thêm.** Kể cả khi học viên hỏi, không tự triển khai: đó là thay đổi lớp mã nằm ngoài phạm vi Starter — hướng học viên báo hỗ trợ khoá học.
    - **Có nơi đang dùng** — nghĩa là đã có ai đó thêm ngoài thiết kế: `THỰC THI` gỡ mọi trường không truy được về dữ liệu đã xác minh, giữ lại phần tối thiểu là thông tin tổ chức cơ bản. Không thêm trường mới, không thêm schema đánh giá. Sau đó chạy `npm run kiem-tra-seo` và `npm run build`.
12. `KIỂM TRA`: rà mọi route và lập báo cáo tám mục — số H1 trên từng trang (mục tiêu đúng một); heading bị nhảy cấp; ảnh thiếu alt và alt rỗng nào là ảnh trang trí hợp lệ; liên kết hoặc nút không có tên truy cập rõ ràng; ô nhập trong ba form có nhãn đầy đủ không; `focus-visible`, liên kết bỏ qua điều hướng, thứ tự Tab, menu và `Escape`; tương phản chữ/nền có dấu hiệu không đạt; icon trang trí bị đọc thừa bởi trình đọc màn hình. Báo theo route và mức độ ảnh hưởng. Chờ học viên duyệt trước khi sửa.
13. `THỰC THI`: sửa từng nhóm lỗi accessibility đã duyệt. Hướng dẫn học viên tự kiểm tra bàn phím trên trang chủ, trang danh mục, một trang chi tiết và trang liên hệ.
14. `PHÂN TÍCH`: rà dự án và báo — 10 ảnh dung lượng lớn nhất kèm nơi dùng và kích thước hiển thị; ảnh trên màn hình đầu đang `priority` và ảnh dưới màn hình đầu có tải lười không; ảnh thiếu `sizes` hoặc thiếu kích thước ổn định; Client Component nào có thể giữ ở Server Component; thành phần có nguy cơ làm nhảy bố cục khi tải. Đề xuất theo mức tác động. Không đổi thiết kế và không cài thư viện.
15. Hướng dẫn học viên chạy build production và đo Lighthouse cho trang chủ cùng một trang chi tiết, ghi lại ngày giờ đo, URL, chế độ desktop hay mobile, bốn điểm số, và ba vấn đề lớn nhất kèm việc đã sửa. Nếu môi trường chưa đo được, ghi đúng `CHƯA ĐO — [LÝ DO]`.
16. `KIỂM TRA`: chạy `npm run kiem-tra-seo`, `npm run kiem-tra-trang-web`, `npm run lint`, `npm run build`. Đối chiếu ma trận route với metadata, canonical và sitemap; xác nhận `siteMode=demo` tạo `noindex,nofollow` và robots chặn toàn site; rà JSON-LD tìm dữ liệu không nguồn; báo route thiếu H1, thiếu alt, lỗi bàn phím và cảnh báo console còn lại; rà toàn bộ dữ liệu SEO tìm mọi chuỗi còn sót của mẫu gốc gồm cả `siteUrl` và ảnh chia sẻ; ghi kết quả Lighthouse thật hoặc `CHƯA ĐO`.
17. `THỰC THI`: ghi `golden-path-log.md` và Sổ việc phải thay. Chỉ sau xác nhận của học viên mới chuyển `currentStage` sang 11. Không bắt đầu Chặng 11.

## Quy tắc riêng

- Title nói rõ trang này là gì, không nhồi từ khoá. Description khoảng 120–155 ký tự, viết cho người đọc trước.
- `path` bắt đầu bằng `/` và khớp route thật. `siteUrl` bắt đầu bằng `https://` và **không** có dấu `/` ở cuối — lệnh kiểm tra chặn dấu `/` cuối.
- Không dùng `localhost` làm canonical.
- `site.seo.siteUrl` hiện là địa chỉ demo của mẫu gốc và cũng mang cờ `isTemporaryUrl`. Đây là chỗ dễ sót nhất; nếu giữ nguyên, canonical và sitemap của học viên sẽ trỏ về địa chỉ của mẫu.
- Trường chưa có nguồn: để chuỗi rỗng và ghi vào Sổ Go-live. Không bịa nội dung để lệnh chạy qua.
- Không có hai trang trùng title. Route động dùng đúng mục theo slug.
- Chuẩn ảnh chia sẻ: tỷ lệ 1.91:1, khuyến nghị 1200 × 630px, có logo hoặc tên thương hiệu, một thông điệp ngắn, đủ khoảng an toàn.
- Alt mô tả mục đích hình trong ngữ cảnh; ảnh trang trí dùng alt rỗng có chủ đích. Không nhồi từ khoá vào alt.
- Không thêm `AggregateRating`, `Review` hoặc bất kỳ schema đánh giá nào. Lệnh kiểm tra chặn.
- Ô nhập trong form phải có nhãn, **kể cả** form mô phỏng.
- Chỉ ảnh quan trọng nhất trong màn hình đầu được `priority`.
- Chỉ ghi số Lighthouse do công cụ đo trả về, kèm URL và chế độ đo. Không ghi điểm dự kiến.
- Không đổi `siteMode`, không tắt quy tắc kiểm tra, không bịa dữ liệu để qua bài.

## Tiêu chuẩn đạt

- Mọi route có `title`, `description` và canonical riêng, mang nội dung của học viên; không hai trang trùng title.
- `site.seo.siteUrl` không còn là địa chỉ demo của mẫu gốc và không có dấu `/` cuối.
- Trang chi tiết sinh metadata từ đúng mục trong dữ liệu.
- Mọi đường dẫn ảnh chia sẻ trỏ tới file tồn tại thật; ảnh chia sẻ là ảnh của học viên hoặc đã ghi vào Sổ Go-live.
- `/sitemap.xml` chứa đúng các route được GIỮ, không chứa route đã tắt; sitemap và canonical dùng cùng một `siteUrl`.
- `/robots.txt` của bản demo chặn toàn site; toàn site mang `noindex, nofollow`.
- Trạng thái JSON-LD được ghi rõ vào Sổ Go-live: website **không** nhúng, lựa chọn có chủ đích. Không dòng mã nào được thêm ở chặng này.
- Mỗi trang đúng một H1, thứ bậc heading hợp lý; ảnh nội dung có alt; focus rõ; liên kết bỏ qua điều hướng hoạt động; menu không bẫy bàn phím.
- Có kết quả Lighthouse thật kèm ngày và chế độ đo, hoặc `CHƯA ĐO — [LÝ DO]` trung thực.
- Dữ liệu SEO mẫu gốc còn sót bằng 0.
- `siteMode: demo`.
- `npm run kiem-tra-seo`, `kiem-tra-trang-web`, `lint`, `build` sạch.
