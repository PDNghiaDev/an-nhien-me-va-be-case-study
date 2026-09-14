# Hướng dẫn Codex — Chặng 11

## Mục tiêu

Kiểm chứng cấu hình xuất tĩnh có sẵn, dựng `out/` và đối chiếu từng route với file HTML, chạy bản tĩnh tại máy, vượt cổng an toàn năm câu, rồi đưa source lên GitHub private và Cloudflare Pages.

## Bối cảnh bắt buộc nhớ

Chặng này có hai mốc, **cả hai đều hợp lệ**:

| Mốc | Kết quả |
|---|---|
| `BẢN STATIC SẴN SÀNG Ở MÁY` | `out/` chứa HTML/CSS/JS của mọi route, chạy qua static server cục bộ và vẫn `noindex` |
| `ĐỊA CHỈ XEM THỬ ĐÃ CHẠY` | Source nằm trong GitHub private repository, Cloudflare Pages tự build, URL `.pages.dev` hoạt động |

Chặng này **không** gắn tên miền riêng, **không** mở Google index, **không** tạo Search Console và **không** đổi `siteUrl` sang địa chỉ production. Ba việc đó thuộc Chặng 13.

Điều đã có sẵn trong source — việc của học viên là kiểm chứng và dùng, không phải dựng lại:

- `next.config.ts` có `output: "export"` và `images: { unoptimized: true }`.
- `.gitignore` đã loại `node_modules/`, `.next/`, `out/`, `.env*`, `*.log`.
- `scripts/serve-out.mjs` phục vụ thư mục `out/` — chạy bằng `npm run xem-ban-tinh`.
- `scripts/kiem-tra-ban-tinh.mjs` đối chiếu route với file HTML — chạy bằng `npm run kiem-tra-static`.
- `public/_headers` chứa cấu hình header cho Cloudflare Pages.

`npm run kiem-tra-static` kiểm tra: có `out/index.html`, `out/404.html`, `out/sitemap.xml`, `out/robots.txt`; các route lõi `/`, `/gioi-thieu`, `/lien-he`, `/chinh-sach-bao-mat`, `catalog.basePath` và mỗi slug trong `services.json` đều có file HTML; sitemap không chứa `/components`; không tồn tại route `/components`; không có `.env` trong `out/`.

**Lệnh đổi tiêu chí theo `siteMode`, không phải chỉ chạy ở `demo`.** Nó chấp nhận cả `demo` lẫn `production`:

| `siteMode` | `out/index.html` | `out/robots.txt` |
|---|---|---|
| `demo` | **phải** chứa `noindex` và `nofollow` | **phải** có `Disallow: /` |
| `production` | **không được** còn `noindex` | **không được** còn `Disallow: /` |

Ở Chặng 11 bản gói đang là `demo`, nên cột đầu áp dụng. Nhưng đừng nói với học viên rằng lệnh này chỉ chạy được ở chế độ demo — Chặng 13 sẽ chạy lại chính nó ở `production`.

Lệnh đọc thư mục `out/`, nên **phải `npm run build` trước** khi chạy; nếu không là đang nghiệm thu một bản xuất cũ.

## Được phép đọc

- `AGENTS.md`, file này
- `tai-lieu/02-website-brief.md`, `05-content-blueprint.md`, `golden-path-log.md`
- Toàn bộ `content/`, `app/`, `components/`, `lib/`, `public/`, `scripts/`, `next.config.ts`, `.gitignore`
- Tài liệu Static Exports của Next.js đang cài trong `node_modules/next/dist/docs/`
- Trạng thái Git: `git status`, `git log`, danh sách file đang được track

## Được phép sửa

- Chỉ những sửa nhỏ nhất đã được học viên duyệt để bản tĩnh chạy đúng
- `.gitignore` — chỉ để bổ sung mục còn thiếu
- Một giá trị mô tả không nhạy cảm trong `content/*.json` cho phép thử auto deploy ở bước 8, và phải được khôi phục
- `tai-lieu/golden-path-log.md`
- `tai-lieu/trang-thai-hoc.md`, chỉ sau xác nhận của học viên

## Không được sửa

- `content/site.json → siteMode` và `seo.siteUrl`
- Dữ liệu liên hệ, dữ liệu pháp lý
- `next.config.ts` — không bỏ `output: "export"`, không chuyển sang Workers hoặc full-stack
- `scripts/`, `public/_headers`
- Logic route, component, Design System
- Tài liệu Chặng 01–10 và Chặng 12–13

Không được thực hiện các hành động sau khi học viên chưa xác nhận: `git push`, tạo repository, kết nối Cloudflare, force push, viết lại lịch sử `main`.

## Thứ tự bắt buộc

1. `KIỂM TRA`: chạy `npm run kiem-tra-seo`, `npm run lint`, `npm run build`.
2. `PHÂN TÍCH`: đọc `next.config.ts` và tài liệu Static Exports cục bộ. Giải thích cho người mới: `output: "export"` nghĩa là gì và website chạy khác thế nào; `images: { unoptimized: true }` đánh đổi điều gì và vì sao Starter chấp nhận đánh đổi đó khi ảnh đã được nén sẵn ở Chặng 05. Rà `app/`, `components/`, `lib/` tìm bất cứ thứ gì cần server runtime — Server Actions, `"use server"`, `cookies()`, `headers()`, route handler động, route `[slug]` thiếu danh sách slug lúc build, dữ liệu phụ thuộc thời điểm truy cập. Lập bảng vị trí | lý do không tương thích | cách sửa nhỏ nhất. Nếu không tìm thấy gì, nói rõ là không tìm thấy. Hướng dẫn lưu mốc `Trước Chặng 11`.
3. `KIỂM TRA`: chạy `npm run build` rồi `npm run kiem-tra-static`. Nếu thiếu, với từng dòng lỗi chỉ ra nguyên nhân theo route hoặc dữ liệu; chưa sửa cho tới khi học viên đồng ý.
4. `KIỂM TRA`: lập bảng đối chiếu URL trong sitemap | file tương ứng trong `out/` | tồn tại hay thiếu. Kiểm tra riêng `404.html`, `sitemap.xml`, `robots.txt` và các file ảnh chia sẻ. Chỉ báo cáo.
5. Hướng dẫn học viên chạy `npm run xem-ban-tinh` và thử đủ danh sách: trang chủ và trang giới thiệu; trang danh mục và ít nhất hai trang chi tiết; trang liên hệ và trang chính sách; blog và một bài viết nếu giữ; `/sitemap.xml` và `/robots.txt`; một đường dẫn bịa phải trả 404; bấm F5 ngay tại một route con. Sau đó kiểm tra ở 375px, thử ba form mô phỏng, mở console tìm lỗi đỏ. Hướng dẫn lưu mốc `Chặng 11: bản static đã kiểm tra tại máy`.
6. `KIỂM TRA`: cổng an toàn. Chưa push hoặc upload gì. Rà toàn bộ source, lịch sử Git hiện có và `public/` để tìm: API key, token, mật khẩu, cookie, khoá riêng, file `.env`; thông tin cá nhân không cần công khai; ảnh hoặc tài liệu chưa rõ quyền chia sẻ online; dữ liệu liên hệ hoặc tên riêng còn sót của website mẫu gốc; kênh liên hệ status `CẦN THAY` nhưng vẫn có `href` hoạt động; file tạm, log, bản sao lưu, tài liệu nội bộ; `node_modules`, `.next`, `out` có nguy cơ bị Git theo dõi. Lập bảng file | rủi ro | được phép đưa lên hay không | việc cần làm. Không xoá hoặc sửa trước khi học viên duyệt.
7. Cổng chỉ mở khi học viên trả lời **Có** cho cả năm câu: không có bí mật hoặc `.env` bị Git theo dõi; không có dữ liệu cá nhân không được phép công khai; mọi ảnh và tài sản trong bản demo có quyền chia sẻ online; mọi kênh chưa xác minh đều bị khoá an toàn; **không còn dữ liệu liên hệ, tên người hoặc thông tin định danh của website mẫu gốc**.
8. `PHÂN TÍCH`: chưa push. Kiểm tra trạng thái Git, nhánh hiện tại, file đang được track và `.gitignore`. Đề xuất chuỗi lệnh an toàn để khởi tạo Git nếu chưa có, lưu commit hiện tại, dùng nhánh `main`, thêm đúng remote GitHub học viên cung cấp, và push `main`. Không chạy cho tới khi học viên xác nhận URL repository và quyền riêng tư.
9. Sau khi học viên xác nhận, thực hiện **từng lệnh một**. Nếu GitHub yêu cầu đăng nhập, học viên tự hoàn tất luồng xác thực chính thức.
10. Hướng dẫn học viên cấu hình Cloudflare Pages: Workers & Pages → tạo ứng dụng Pages → **Import an existing Git repository** → kết nối GitHub và chỉ cấp quyền cho repository cần dùng nếu giao diện cho phép → chọn repository → preset **Static HTML Export** cho Next.js → Production branch `main` → Build command `npm run build` → Build output directory `out` → không thêm biến môi trường bí mật → bắt đầu deploy và đọc log tới khi thành công. Chọn Git Integration ngay từ đầu; theo tài liệu Cloudflare hiện tại, một Pages project dùng Git Integration không chuyển trực tiếp sang Direct Upload về sau.
11. Khi build lỗi, nhận log từ **lỗi đầu tiên** và giải thích bằng tiếng Việt: lỗi ở dependency, phiên bản Node, cấu hình build, xuất tĩnh hay dữ liệu. Đề xuất sửa nhỏ nhất; chưa sửa cho tới khi học viên đồng ý.
12. Hướng dẫn học viên audit bản online trên URL `.pages.dev`: mọi route công khai mở được và tải lại trực tiếp được; route bịa hiển thị 404; ảnh, font, CSS, JavaScript tải không lỗi; kênh liên hệ mở đúng đích và kênh chờ không bấm được; ba form vẫn báo rõ không gửi hoặc lưu dữ liệu; `/sitemap.xml` và `/robots.txt` mở được; xem mã nguồn trang có `noindex,nofollow`; `robots.txt` chặn toàn site; mở trên điện thoại qua mạng di động. Đo Lighthouse trên URL online nếu Chặng 10 chưa đo được.
13. `THỰC THI`: phép thử auto deploy. Sửa **đúng một câu** học viên chỉ định, chạy `npm run lint` và `npm run build`, lưu commit `Kiểm tra auto deploy Cloudflare` và push lên `main`. Không sửa file khác. Sau khi bản online cập nhật, khôi phục câu cũ bằng một commit thứ hai và xác nhận auto deploy lần nữa.
14. `KIỂM TRA`: chạy theo đúng thứ tự `npm run lint`, `npm run build`, rồi `npm run kiem-tra-static`, `npm run kiem-tra-seo`, `npm run kiem-tra-lien-he` — build phải chạy trước `kiem-tra-static`. Xác nhận `git status` sạch và `main` đồng bộ remote; `siteMode=demo`, `noindex` và robots chặn trên URL online; không còn dữ liệu định danh của mẫu gốc trên bản online. Tổng hợp commit, deployment URL, thời điểm và vấn đề còn mở.
15. `THỰC THI`: ghi `golden-path-log.md`, gồm URL demo. Chỉ sau xác nhận của học viên mới chuyển `currentStage` sang 12. Không bắt đầu Chặng 12.

## Quy tắc riêng

- Phải giải thích được vì sao ba form mô phỏng **không** cản trở xuất tĩnh: chúng chạy hoàn toàn trên trình duyệt và không gửi dữ liệu đi đâu. Ô lọc trên trang tin tức cũng chạy trên trình duyệt, không gọi API.
- Không tắt TypeScript, ESLint, metadata, sitemap hoặc robots để build qua.
- Không dùng `next start` để thử bản tĩnh. Phải phục vụ trực tiếp `out/` bằng `npm run xem-ban-tinh`. Mở file HTML bằng `file://` không mô phỏng đúng route, asset và 404.
- Không chỉ nhìn kết quả build. Phải đối chiếu **từng slug** với file HTML.
- Không đẩy `out/` lên GitHub. Cloudflare tự build từ source; `out/` là sản phẩm build và đã nằm trong `.gitignore`.
- Repository mặc định **Private**. Không khởi tạo thêm README, `.gitignore` hoặc license vì source đã có.
- Không dùng force push, không ghi token vào remote URL, không dán token vào tài liệu hoặc chat.
- Không chọn preset Workers hoặc full-stack. Starter là static export với output `out`.
- Không gửi link demo khi chưa qua cổng an toàn — đặc biệt nguy hiểm nếu còn dữ liệu liên hệ của mẫu gốc.
- Nếu bản online mất `noindex`: dừng gửi link rộng rãi, kiểm tra `siteMode`, metadata và robots trước khi tiếp tục.
- Nếu vô tình lộ bí mật: thu hồi hoặc đổi bí mật **trước**; xoá file khỏi commit hiện tại là chưa đủ nếu nó còn trong lịch sử. Dừng deploy cho tới khi xử lý xong.
- Nếu deployment mới hỏng: dùng Cloudflare rollback về deployment gần nhất đang tốt, rồi sửa source bằng commit mới. Không force push hoặc viết lại lịch sử `main`.
- Nếu bị chặn bởi tài khoản hoặc quyền ngoài dự án, ghi đúng `CHƯA CÓ URL ONLINE — [LÝ DO]`. **Không tuyên bố đã deploy.**

## Tiêu chuẩn đạt

- `npm run kiem-tra-static` đạt; số trang chi tiết bằng số mục trong `services.json`; sitemap và bảng URL khớp nhau.
- Không có `.env` hoặc dữ liệu bí mật trong `out/`.
- Mọi URL nội dung trả đúng trang; URL bịa trả 404; CSS, font, ảnh và liên kết hoạt động sau khi tải lại.
- Bản tĩnh vẫn hiện dải nhãn demo; ba form vẫn báo rõ không gửi hoặc lưu dữ liệu.
- Cổng an toàn đạt **5/5**, kèm báo cáo bằng chứng; `.gitignore` đầy đủ; `git status` không liệt kê file bị cấm.
- Repository là Private; nhánh `main` có commit mới nhất; trên GitHub không có `.env`, `node_modules`, `.next` hoặc `out`; lịch sử commit không chứa bí mật.
- Deployment thành công và có URL `.pages.dev`; build đọc đúng nhánh `main` và output `out`; không có biến môi trường bí mật thừa.
- Bản online và bản tĩnh ở máy hiển thị cùng nội dung; demo vẫn chặn Google.
- Hai deployment auto deploy thành công liên tiếp; bản online trở về đúng nội dung ban đầu; `git status` sạch và `main` đồng bộ remote.
- Có ảnh bằng chứng: desktop, mobile, `robots.txt` và màn hình deployment thành công.
- `siteMode: demo`; `siteUrl` **chưa** đổi sang địa chỉ production.
- `npm run kiem-tra-static`, `kiem-tra-seo`, `kiem-tra-lien-he`, `lint`, `build` sạch.
