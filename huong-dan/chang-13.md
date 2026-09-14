# Hướng dẫn Codex — Chặng 13

## Mục tiêu

Đóng hết dữ liệu chưa xác minh, xử lý dứt điểm ba form mô phỏng theo quyết định Chặng 09, gắn tên miền, vượt cổng Go-live, rồi mới chuyển `siteMode` sang `production` và bàn giao vận hành.

## Bối cảnh bắt buộc nhớ

Học viên **không dựng lại website**. Chặng 13 làm trên chính source đã nghiệm thu ở Chặng 12 và đóng bốn việc: xác minh và đóng mọi dữ liệu còn `DEMO`/`CẦN THAY`; xử lý dứt điểm ba form; tên miền, địa chỉ chuẩn và đo lường; chuyển `siteMode` ở **gần cuối** chặng.

Nếu chưa đủ dữ liệu thật, dừng an toàn ở bản demo. Giữ demo không phải thất bại — đó là trạng thái an toàn được thiết kế sẵn.

### Cổng Go-live được máy kiểm tra

Lệnh có **hai chế độ**. Dùng đúng chế độ theo giai đoạn:

| | `npm run kiem-tra-go-live -- --preflight` | `npm run kiem-tra-go-live` |
|---|---|---|
| Dùng khi | Trước chuyển chế độ và ngay sau khi bật, ở bước 10 và 11 | Lần nghiệm thu cuối ở bước 13, sau khi đã deploy và thử thật |
| Đủ năm tiêu đề | Có | Có |
| Bốn dòng đếm bằng 0 | Có | Có |
| `content/` sạch, luồng liên hệ đạt | Có | Có |
| `[CHƯA ĐIỀN]` | Chỉ soát **mục 1–3** | Soát **cả file** |
| `siteMode` | `demo` hoặc `production` | Bắt buộc `production` |
| `Trạng thái cuối` | Không yêu cầu | Bắt buộc |

Cả hai chế độ đều **chặn** nếu:

- Thiếu một trong năm mục, đúng dạng tiêu đề: `## 1. Mốc đầu vào`, `## 2. Danh sách phải thay`, `## 3. Cổng Go-live`, `## 4. Biên bản Go-live`, `## 5. Vận hành và rollback`.
- Chưa ghi đủ bốn dòng `DEMO còn lại: 0`, `CẦN THAY còn lại: 0`, `Placeholder còn lại: 0`, `P0 còn mở: 0`.
- Nội dung kinh doanh còn DEMO hoặc bất kỳ dữ liệu nào còn CẦN THAY; ngoại lệ form được nêu ở dưới.
- Bất kỳ file dữ liệu nào còn `example.com` hoặc `[CHƯA ĐIỀN]`.
- `scripts/kiem-tra-lien-he.mjs` không đạt — cổng gọi lại lệnh đó bằng subprocess.

Riêng chế độ không cờ chặn thêm: `siteMode` chưa `production`; `[CHƯA ĐIỀN]` còn ở mục 4–5; thiếu dòng `Trạng thái cuối`.

**Dạng dòng trạng thái rất chặt.** Lệnh khớp nguyên dòng `Trạng thái cuối: SẴN SÀNG KINH DOANH` — không in đậm, không gạch đầu dòng, không chữ thêm phía sau. `**Trạng thái cuối: SẴN SÀNG KINH DOANH**` sẽ **không** được nhận.

**Mục 4 và mục 5 chỉ được điền sau khi thử thật.** Preflight bỏ qua chúng chính vì lý do đó. Không hướng dẫn học viên ghi kết quả trước rồi mới đi kiểm tra.

**Preflight đạt không phải website đã sẵn sàng kinh doanh.** Nói đúng thông báo của lệnh: *"chưa xác nhận website đã triển khai hoặc sẵn sàng kinh doanh"*. Cả chế độ không cờ cũng chỉ xác nhận **cấu trúc**: *"cần đối chiếu bằng chứng triển khai, quyền dữ liệu và thử liên hệ thật"*.

Đã có mẫu `tai-lieu/13-go-live.md`. Cập nhật mẫu bằng bằng chứng thật; không điền kết quả để vượt kiểm tra.

### Kiểm tra theo chế độ

Mười lệnh của gói chia làm ba nhóm theo `siteMode` mà chúng chấp nhận. Đọc trực tiếp trong `scripts/` để kiểm chứng, đừng nhớ theo tên lệnh:

| Nhóm | Lệnh | `siteMode` chấp nhận |
|---|---|---|
| Chỉ demo | `kiem-tra`, `kiem-tra-du-lieu`, `kiem-tra-giao-dien`, `kiem-tra-trang-web`, `kiem-tra-ban-giao` | `demo` |
| Cả hai chế độ | `kiem-tra-lien-he`, `kiem-tra-seo`, `kiem-tra-static` | `demo` hoặc `production` |
| Chỉ production | `kiem-tra-go-live` | `production` |

Vì vậy bước 9 chạy **trọn bộ 10 lệnh khi còn `demo`** làm lần nghiệm thu kỹ thuật cuối; bước 11 chỉ chạy **sáu lệnh** sau khi bật: `lint` → `build` → `kiem-tra-static` → `kiem-tra-seo` → `kiem-tra-lien-he` → `kiem-tra-go-live -- --preflight`. Phải build lại trước kiểm tra static để không nghiệm thu bản xuất cũ. Lần chạy `kiem-tra-go-live` **không cờ** để dành cho bước 15, sau khi đã deploy và thử thật.

Năm lệnh nhóm "chỉ demo" báo lỗi sau khi bật production là **đúng thiết kế**, không phải lỗi website. Ghi vào Sổ Go-live là `KHÔNG ÁP DỤNG SAU CHUYỂN CHẾ ĐỘ`. Không chạy lại chúng, không sửa `scripts/` cho chúng chạy qua.

`DEMO còn lại: 0` trong biên bản là số mục **nội dung kinh doanh** còn dùng dữ liệu demo. Chỉ bốn nhãn DEMO của cấu hình form — `contact.json:form`, `home-conversion.json:consult.form`, `site.json:footer.newsletter`, `news.json:newsletter` — được miễn trừ, và chỉ khi ghi chú có chữ "demo"/"mô phỏng" **và** nói rõ dữ liệu không được gửi/lưu. Ghi riêng bốn cấu hình này thành một dòng trong Sổ Go-live. Không miễn trừ nhãn DEMO bên trong dữ liệu con hoặc ở nội dung kinh doanh. Không đổi nhãn của chúng thành `ĐÃ XÁC MINH` để vượt cổng. Bộ kiểm tra liên hệ vẫn bắt `submissionEnabled=false` và quét mã form. Không đổi status hàng loạt.

**Phương án A đã được triển khai — hợp đồng `mode`.** Mỗi cấu hình trong bốn cấu hình nhận thêm `mode` và `directContact`:

- Không có `mode`, hoặc `mode: "demo"` → giữ form mô phỏng. Đây là mặc định và vẫn hợp lệ.
- `mode: "direct"` → không render vùng nhập liệu; render `components/ui/DirectContact.tsx`.
- Nhánh `direct` yêu cầu cấu hình có `status: "ĐÃ XÁC MINH"` **và** `directContact` đủ `title`, `description`, `label`, `href`, `status: "ĐÃ XÁC MINH"`. `href` chỉ chấp nhận `https://`, `tel:`, `mailto:`.
- **Không xoá file, không xoá cấu hình.** Giữ nguyên trường demo cũ tại chỗ để tương thích kiểu dữ liệu và để quay lại chế độ demo.
- `contact.submissionEnabled` vẫn `false` ở cả hai nhánh. Không thêm backend.
- Chỉ đổi `status` sang `ĐÃ XÁC MINH` sau khi học viên đã chọn `direct` **và** đã kiểm tra kênh thật ở bước 7. Không chuyển status hàng loạt ở nội dung kinh doanh.
- Được phép trộn: vị trí nào chưa có kênh xác minh thì giữ `demo`.
- Khi chuyển sang `direct`, phải rà **lời mời xung quanh** cho khỏi mâu thuẫn: `home-conversion.json → consult.eyebrow/title/description` cùng hai CTA — dùng chung cho trang chủ và `/lien-he`; `site.json → footer.tagline`; các tiêu đề sidebar trong `app/tin-tuc/page.tsx`.
- Sau khi đổi: `lint` → `build` → `kiem-tra-lien-he` → **kiểm tra trực quan đủ bốn vị trí** ở desktop và mobile. Lệnh không nhìn được bố cục.

## Được phép đọc

- `AGENTS.md`, `README.md`, file này
- `tai-lieu/12-nghiem-thu.md`, `handoff.md`, `12-van-hanh-rollback.md`, `05-content-blueprint.md`, `golden-path-log.md`
- Toàn bộ `content/`, `app/`, `components/`, `lib/`, `public/`, `scripts/`, `out/`

## Được phép sửa

- `content/*.json` — giá trị dữ liệu đã xác minh, đường dẫn ảnh, nội dung alt, và `status` chuyển sang `ĐÃ XÁC MINH`
- `content/site.json → siteMode` — **chỉ ở bước 8**, chỉ sau khi học viên xác nhận cổng Go-live đã đạt
- `content/site.json → seo.siteUrl` — sang tên miền chuẩn, ở cùng bước 8
- `public/images/` — thêm ảnh thật; xoá ảnh không còn được tham chiếu **chỉ sau khi học viên xác nhận**
- `components/` và `app/` — **không sửa ở Chặng 13**. Phương án A được thực hiện hoàn toàn bằng **dữ liệu** (`mode`, `directContact`), không cần đụng mã. Nếu thấy cần sửa component để nhánh direct chạy được, đó là dấu hiệu dữ liệu đang sai — sửa dữ liệu. Ngoại lệ duy nhất: chuỗi chữ hiển thị của lời mời xung quanh nếu nó nằm thẳng trong `page.tsx` của trang đang xử lý, và chỉ đúng chuỗi đó
- `tai-lieu/13-go-live.md` — mẫu trống đã có sẵn với đúng năm tiêu đề; điền vào mẫu — và `tai-lieu/handoff.md`
- `tai-lieu/golden-path-log.md`
- `tai-lieu/trang-thai-hoc.md`, chỉ sau xác nhận của học viên

## Không được sửa

- `scripts/` — không một dòng nào, kể cả khi lệnh kiểm tra báo lỗi
- `next.config.ts`, `package.json`, `lib/`
- `content/contact.json → submissionEnabled` — giữ `false` trừ khi học viên đã có backend được kiểm thử, điều nằm ngoài phạm vi Starter
- Cơ chế `DemoBanner` — giữ nguyên để rollback về demo trong một bước
- Bố cục, số section, Design System, và mọi component — kể cả khi chuyển sang liên hệ trực tiếp
- Tài liệu Chặng 01–12

Không được: đăng nhập nhà cung cấp tên miền thay học viên; yêu cầu hoặc lưu token, mật khẩu, mã xác minh; tạo form gửi thật, database, đăng nhập hoặc gửi mail tự động; kết luận về tuân thủ pháp luật.

## Thứ tự bắt buộc

1. `PHÂN TÍCH`: đọc `AGENTS.md`, file này, `12-nghiem-thu.md`, `handoff.md`, `05-content-blueprint.md` và mọi `content/*.json`. Xác nhận đúng phiên bản đã nghiệm thu ở Chặng 12. Liệt kê mọi giá trị có status `DEMO` hoặc `CẦN THAY` theo file và khoá. Tìm placeholder, `example.com`, liên hệ chưa xác minh và ảnh còn mang tên mẫu gốc. Liệt kê quyết định form đã chốt ở Chặng 09 và việc phải làm tương ứng. Chia danh sách thành: học viên tự làm / cần người khác xác nhận / cần tài sản mới.
2. `THỰC THI`: mở mẫu có sẵn `tai-lieu/13-go-live.md` — đã đúng năm tiêu đề bắt buộc — và điền mục 1–2 từ kết quả bước 1. Không tạo file mới, không đổi cách viết tiêu đề. Mỗi dòng phải có nguồn, người phụ trách và hạn. Không tự suy đoán dữ liệu và không đổi `siteMode`.
3. `PHÂN TÍCH`: với từng dòng trong Sổ Go-live, phân loại `ĐỦ ĐỂ THAY` / `THIẾU NGUỒN XÁC MINH` / `THIẾU QUYỀN SỬ DỤNG` / `NÊN BỎ KHỎI WEBSITE`. Không đánh giá giấy tờ và không kết luận về tuân thủ pháp luật; chỉ chỉ ra mục nào chưa đủ điều kiện công khai.
4. `THỰC THI`: đóng ảnh trước. Theo bảng file đã xác minh học viên cung cấp — đưa file vào `public/images/` với tên không dấu; cập nhật đúng đường dẫn trong `content/*.json` và trong dữ liệu SEO; viết lại alt theo nội dung thật của ảnh mới; giữ nguyên component, tỷ lệ khung và bố cục đã duyệt; báo ảnh nào méo, thiếu hoặc quá nặng; liệt kê ảnh không còn được tham chiếu để học viên quyết định xoá. Không xoá file khi học viên chưa xác nhận.
5. `THỰC THI`: đóng nội dung theo **từng nhóm**. Chỉ sửa `content/*.json`. Giữ nguyên số section và bố cục. Trường đã có nguồn: đổi status thành `ĐÃ XÁC MINH`. Trường không có nguồn: báo cho học viên để bỏ khối đó, không tự giữ lại nhãn cũ. Nếu chữ quá dài so với khuôn, báo giới hạn và đề xuất bản rút gọn; chưa sửa component. Chạy `npm run kiem-tra-du-lieu` sau mỗi nhóm.
6. Xử lý dứt điểm ba form theo quyết định A/B/C đã chốt ở Chặng 09:
   - **A — liên hệ trực tiếp:** làm **từng vị trí một**, không đổi cả bốn trong một lượt. `ĐỀ XUẤT` trước cho mỗi vị trí: hai khoá `mode: "direct"` và `directContact` với đủ năm trường; `href` dùng giao thức nào và vì sao; những khoá demo cũ nào giữ nguyên tại chỗ; lời mời xung quanh nào sẽ mâu thuẫn và câu thay thế; cấu hình này ảnh hưởng trang nào khác. Chỉ `THỰC THI` sau khi học viên duyệt, và chỉ khi kênh đứng sau đã được xác minh ở bước 7. Sau đó chạy `lint`, `build`, `kiem-tra-lien-he` và hướng dẫn học viên **xem bằng mắt đủ bốn vị trí** ở desktop và 375px. Nếu vị trí nào hiện dòng "Kênh liên hệ chưa được cấu hình", sửa **dữ liệu**, không sửa component.
   - **B — giữ mô phỏng:** `KIỂM TRA` và **trích dòng làm bằng chứng** cho từng form: cảnh báo mô phỏng hiển thị trước vùng nhập liệu và đủ rõ; nhãn nút không khiến người xem tin rằng đã gửi; thông báo sau khi hợp lệ nói rõ không có gì được gửi hoặc lưu; mã nguồn không có đích truyền dữ liệu; kênh liên hệ thật nằm ngay cạnh form; `submissionEnabled` vẫn `false`. Đề xuất cách làm cảnh báo rõ hơn nếu người thử ở Chặng 12 từng hiểu nhầm.
   - **C — chuyển Advanced:** không thực hiện trong khoá này. Ghi vào Sổ Go-live và giữ form ở trạng thái mô phỏng hoặc gỡ tạm cho tới khi backend được dựng và kiểm thử.
7. `THỰC THI`: kích hoạt liên hệ bằng dữ liệu `ĐÃ XÁC MINH` trong `13-go-live.md`. Chỉ bật kênh có người chịu trách nhiệm trực. Điện thoại dùng `tel:` và đúng số; email dùng `mailto:` và đúng hộp thư; Zalo hoặc mạng xã hội mở đúng tài khoản chính thức; nút nổi trỏ tới kênh đang hoạt động; CTA mọi trang trỏ tới kênh hoặc trang đang hoạt động; footer và trang chính sách ghi đúng thông tin học viên cung cấp. Đánh dấu phần cần chuyên gia duyệt. Hướng dẫn học viên dùng điện thoại thật gọi và nhắn, cần người trực xác nhận đã nhận.
8. Tên miền: hướng dẫn học viên chọn một địa chỉ chuẩn có hoặc không có `www`, dạng còn lại chuyển hướng về dạng chuẩn. Học viên tự đăng nhập nhà cung cấp và thao tác DNS. Tạo checklist thao tác nhưng **chưa** đổi `siteMode` và **chưa** đổi `siteUrl`. Sau khi học viên làm xong, kiểm tra HTTPS hoạt động không cảnh báo; chuyển hướng `www` và không-`www`; canonical, sitemap và metadata sẽ dùng đúng tên miền sau khi đổi `siteUrl`.
9. `KIỂM TRA` — lần nghiệm thu kỹ thuật cuối cùng **khi còn `siteMode: demo`**. Chạy `npm run kiem-tra`, `kiem-tra-du-lieu`, `kiem-tra-giao-dien`, `kiem-tra-trang-web`, `kiem-tra-lien-he`, `kiem-tra-seo`, `kiem-tra-static`, `kiem-tra-ban-giao`, `lint`, `build`. Tất cả phải sạch. Ghi kết quả và thời điểm vào `13-go-live.md` mục 4.
10. `KIỂM TRA`: chạy `npm run kiem-tra-go-live -- --preflight` khi còn `demo` để liệt kê phần còn thiếu. Chế độ này chấp nhận `siteMode: demo`, chỉ soát `[CHƯA ĐIỀN]` ở mục 1–3 và không đòi dòng `Trạng thái cuối` — nên **mục 4 và 5 vẫn để trống ở giai đoạn này**. Không ghi `Trạng thái cuối` và không điền trước mục 4–5; chúng chỉ được hoàn tất ở bước 14 sau khi đã thử thật. Preflight đạt **không** phải website đã sẵn sàng kinh doanh. Chỉ chuyển chế độ khi học viên duyệt. Form mô phỏng hợp lệ không phải lỗi cần đổi nhãn.
11. `THỰC THI` — chỉ sau khi học viên xác nhận cổng Go-live đã đạt:
    1. Đổi `siteMode` thành `production` trong `content/site.json`.
    2. Đổi `site.seo.siteUrl` sang tên miền chuẩn, không có dấu `/` cuối.
    3. Giữ nguyên cơ chế `DemoBanner`.
    4. Build lại và đưa bằng chứng: không còn dải nhãn demo và không còn `noindex`; robots cho phép index nhưng vẫn chặn phần nội bộ; sitemap chỉ chứa URL công khai trên tên miền chuẩn; canonical dùng đúng tên miền.
    5. Chạy `npm run lint`, `npm run build`, rồi `npm run kiem-tra-static`, `npm run kiem-tra-seo`, `npm run kiem-tra-lien-he`, `npm run kiem-tra-go-live -- --preflight` và báo kết quả. Vẫn dùng `--preflight`: mục 4–5 chưa điền và chưa có `Trạng thái cuối`, nên chế độ không cờ sẽ chặn — đó là dự kiến, không phải lỗi.

    Không thay giao diện hoặc nội dung khác. Không sửa `scripts/`.
12. Hướng dẫn học viên deploy và kiểm tra trên tên miền thật, rồi cấu hình đo lường: mở `/sitemap.xml` trên tên miền thật và kiểm tra danh sách URL; thêm tên miền vào Google Search Console, ưu tiên xác minh bằng DNS; gửi sitemap và lưu bằng chứng đã nhận; bật một công cụ đo lường tối thiểu, ví dụ Cloudflare Web Analytics; cập nhật trang chính sách theo đúng công cụ thực tế đang dùng.
13. `KIỂM TRA`: nghiệm thu production trên tên miền thật theo đúng năm vòng của Chặng 12 — dữ liệu, kỹ thuật, SEO và accessibility, thẩm mỹ, người dùng. Hướng dẫn học viên mở mọi trang chính trên điện thoại thật qua mạng di động, thử CTA và một URL sai.
14. `THỰC THI` — **chỉ sau khi bước 13 đã thử thật xong**: hoàn tất mục 4 và mục 5 của `tai-lieu/13-go-live.md`, và cập nhật `tai-lieu/handoff.md` với tên miền chuẩn, ngày Go-live, phiên bản bàn giao; người sở hữu tên miền, deploy và nội dung; bốn dòng `DEMO còn lại: 0`, `CẦN THAY còn lại: 0`, `Placeholder còn lại: 0`, `P0 còn mở: 0`; kết quả thử liên hệ khép kín kèm tên người trực đã xác nhận; Search Console, sitemap, đo lường; quyết định form đã thực hiện — bao nhiêu cấu hình `direct`, bao nhiêu mô phỏng; lịch gia hạn tên miền và quy trình rollback. Cuối cùng ghi trên **một dòng riêng, không in đậm, không thêm ký tự nào**: `Trạng thái cuối: SẴN SÀNG KINH DOANH` — và chỉ ghi khi mọi hạng mục trên đã có bằng chứng thật. Ghi `golden-path-log.md` và hướng dẫn lưu mốc `Go-live: website chính thức, Chặng 13`.
15. `KIỂM TRA` — cổng cuối cùng: chạy `npm run build` rồi `npm run kiem-tra-go-live` **không có cờ**. Đây là lần duy nhất chạy chế độ đầy đủ. Đọc đúng thông báo khi đạt: lệnh xác nhận **cấu trúc**, *"cần đối chiếu bằng chứng triển khai, quyền dữ liệu và thử liên hệ thật"* — không tự tuyên bố hơn thế.

## Quy tắc riêng

- Không dùng thông tin AI tự đoán làm dữ liệu thật. Không đưa mật khẩu, token, mã xác minh hay giấy tờ riêng tư vào source.
- Không bật production để xem thử. Bản demo đã là nơi xem thử.
- Không đổi hàng loạt status thành `ĐÃ XÁC MINH` cho lệnh chạy qua. Dữ liệu không có nguồn thì bỏ khối đó, không đổi nhãn.
- Không dùng ảnh hoặc lời chứng thực chưa được đồng ý; không dùng số liệu, chứng nhận hoặc thông tin pháp nhân không có nguồn; không chép tài liệu nhạy cảm vào source.
- Không để AI viết nội dung pháp lý cho đủ để vượt cổng. Phần chưa có căn cứ thì bỏ.
- "Link mở được" **không** đồng nghĩa liên hệ đã hoạt động. Phải có người thật xác nhận đã nhận.
- **Ba việc tuyệt đối không làm:** bật `submissionEnabled` mà không có nơi nhận; đổi nhãn nút thành "Gửi ngay" khi form không gửi; xoá cảnh báo mô phỏng trong khi vẫn giữ form.
- Không xoá `DemoBanner` sau khi bật production. Giữ cơ chế đó để rollback được về demo trong một bước.
- Không quên `site.seo.siteUrl`. Bật production mà canonical vẫn trỏ địa chỉ cũ sẽ khiến Google đọc sai trang chuẩn.
- Không sửa `scripts/` để vượt xung đột giữa các lệnh kiểm tra. Ghi nhận và báo cho chủ khoá học.
- Nếu có sự cố: đổi `siteMode` về `demo` và deploy lại trước; hoàn tác đúng thay đổi gây lỗi, không xoá lịch sử; khi cần rollback deployment trên Cloudflare về bản đã nghiệm thu; ghi sự cố, phạm vi và người xác nhận vào Sổ Go-live; chỉ mở lại production sau khi chạy lại cổng ở bước 10.

## Chưa được Go-live khi

Tiếp tục giữ demo nếu: chưa xác minh được liên hệ, pháp nhân hoặc số liệu; thiếu quyền sử dụng ảnh; còn placeholder, `DEMO`, `CẦN THAY` hoặc `P0`; tên miền hoặc HTTPS chưa ổn; chưa có người nhận CTA; chưa quyết định xong số phận form; hoặc chưa biết ai chịu trách nhiệm gia hạn tên miền.

## Tiêu chuẩn đạt

- `tai-lieu/13-go-live.md` có đủ năm mục đúng dạng tiêu đề, không còn `[CHƯA ĐIỀN]`, đủ bốn dòng đếm bằng 0, và dòng `Trạng thái cuối: SẴN SÀNG KINH DOANH` đứng riêng một dòng không in đậm — được ghi **sau** khi thử thật ở bước 13, không phải trước.
- Không còn ảnh hoặc nội dung demo đang hiển thị; mọi số liệu và bằng chứng truy ngược được nguồn; mỗi trang vẫn đủ section, CTA rõ và không vỡ bố cục.
- Không form nào ở trạng thái "trông như gửi thật nhưng không gửi"; `submissionEnabled` vẫn `false`. Nếu học viên chọn phương án A, tiêu chuẩn đạt của chặng là: phương án đã được ghi vào Sổ Go-live và đã báo hỗ trợ — **không** phải là form đã gỡ xong.
- Có ít nhất một vòng khép kín: bấm → gửi → người thật nhận. Không còn CTA chết hoặc kênh demo.
- Tên miền do doanh nghiệp kiểm soát và đã đặt nhắc gia hạn; HTTPS không cảnh báo; chỉ có một URL chuẩn.
- Mười lệnh kiểm tra ở bước 9 đã chạy sạch **khi còn `demo`**, có ghi thời điểm.
- Sau khi bật: `lint`, `build`, `kiem-tra-static`, `kiem-tra-seo`, `kiem-tra-lien-he`, `kiem-tra-go-live -- --preflight` chạy sạch **theo đúng thứ tự đó**, trên bản build mới chứ không phải `out/` cũ; `siteMode` là `production`; cơ chế quay về `demo` vẫn còn; robots, canonical và sitemap đúng tên miền.
- Cuối cùng, sau khi deploy và thử thật: `npm run build` rồi `npm run kiem-tra-go-live` **không cờ** chạy sạch.
- Mục 4 của Sổ Go-live ghi kết quả demo trước chuyển và kết quả production sau build lại; không bỏ qua kiểm tra liên hệ/SEO/static.
- Sitemap đúng tên miền và đúng số trang công khai; Search Console đã xác minh và nhận sitemap; đo lường ghi nhận ít nhất một lượt truy cập thử; trang chính sách mô tả đúng thực tế.
- Website giữ chất lượng như bản demo nhưng mang dữ liệu thật; kiểm tra được trên điện thoại thật qua mạng di động.
- `handoff.md` có người phụ trách, lịch gia hạn và rollback, không chứa bí mật.
- `P0` bằng 0; đã lưu mốc `Go-live: website chính thức, Chặng 13`.

## Sau khoá học

Khi học viên cần màn hình quản trị để đăng bài không phải sửa file, form lưu thông tin khách, phân quyền hoặc WordPress Headless — khoá Advanced mở lại **chính source này**. Giao diện, Design System, component, route và hợp đồng kiểu dữ liệu được giữ. Lớp đọc dữ liệu `lib/content.ts` được thay bằng adapter đọc từ CMS. Đó là lý do khoá học bắt tuân thủ một quy tắc suốt 13 chặng: component không bao giờ đọc dữ liệu trực tiếp.
