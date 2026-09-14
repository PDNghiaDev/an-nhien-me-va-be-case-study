# Hướng dẫn Codex — Chặng 09

## Mục tiêu

Thay toàn bộ kênh liên hệ của mẫu bằng kênh của học viên hoặc khoá an toàn nếu chưa có, giúp học viên tự kiểm chứng ba form mô phỏng bằng bằng chứng, và ghi trung thực trạng thái luồng liên hệ.

## Bối cảnh bắt buộc nhớ

Đây là chặng có rủi ro thật cao nhất của khoá học. Source đang mang **số điện thoại, email, địa chỉ và tài khoản Zalo có thật của Nguyên Khoa F&B**, với status `ĐÃ XÁC MINH`. Nếu học viên gửi link demo cho khách mà chưa thay, họ đang dẫn khách của mình sang doanh nghiệp khác.

Hai kết quả **đều hợp lệ**:

| Trạng thái | Khi nào đạt |
|---|---|
| `KHUNG LIÊN HỆ SẴN SÀNG` | Đã gỡ hết dữ liệu mẫu, chưa có kênh nào của học viên được xác minh |
| `LUỒNG LIÊN HỆ ĐÃ KÍCH HOẠT` | Có ít nhất một kênh của học viên, đã thử trên thiết bị thật |

Điều **không** hợp lệ ở cả hai trạng thái: để nguyên dữ liệu Nguyên Khoa.

Ba form trong source — khối tư vấn cuối trang chủ, form trang liên hệ, ô nhận bản tin ở footer và trang tin tức — đều là **mô phỏng**. `npm run kiem-tra-lien-he` kiểm tra bằng máy: `contact.submissionEnabled === false`, `siteMode === "demo"`, form và newsletter mang status `DEMO`, nhãn nút và ghi chú có chữ "demo", thông báo nói rõ không gửi/lưu, và `ConsultForm.tsx`/`FooterNewsletter.tsx` không có `fetch`, `axios`, `action=`, `formAction=` đồng thời có `preventDefault()`.

Starter không có form thật vì một form nhận khách cần nơi lưu dữ liệu, người trực xử lý, chống spam, nội dung đồng ý và chính sách lưu giữ, cùng thông báo thành công/thất bại đáng tin. Đó là một hệ thống, không phải một nút bật thêm. Phần đó thuộc khoá Advanced.

## Được phép đọc

- `AGENTS.md`, file này
- `tai-lieu/01-dinh-huong.md`, `02-website-brief.md`, `05-content-blueprint.md`
- Toàn bộ `content/`, `app/`, `components/`, `scripts/`

## Được phép sửa

- `content/site.json` — khối `contact` (`phone`, `email`, `address`, `phoneLinks`, `emailLink`), `floatingActions.zalo`, `headerCta`, `ui.copyright`
- `content/contact.json` — `channels.items`, `social.items`
- `tai-lieu/05-content-blueprint.md` — mục `Sổ việc phải thay trước Go-live`, tiêu đề `Quyết định form`
- `tai-lieu/golden-path-log.md`
- `tai-lieu/trang-thai-hoc.md`, chỉ sau xác nhận của học viên

## Không được sửa

- `content/contact.json → submissionEnabled` — phải giữ `false`
- `content/contact.json → form` và `content/home-conversion.json → consult.form`: không đổi `status`, `submitLabel`, `demoNote`, `successMessage`
- `content/site.json → footer.newsletter` và `content/news.json → newsletter`: không đổi `status`, `buttonLabel`, `note`, `successMessage`
- `components/home/ConsultForm.tsx`, `components/layout/FooterNewsletter.tsx`, `components/home/ConsultSection.tsx`
- `content/site.json → siteMode`, `seo` — Chặng 10 xử lý `seo`
- `lib/`, `scripts/`, `next.config.ts`, `package.json`
- Tài liệu Chặng 01–08 và Chặng 10–13

## Thứ tự bắt buộc

1. `KIỂM TRA`: chạy `npm run kiem-tra-lien-he`, `npm run lint`, `npm run build`.
2. `PHÂN TÍCH`: rà toàn bộ `content/*.json`, `app/`, `components/` tìm mọi thông tin liên hệ — số điện thoại, email, địa chỉ, liên kết Zalo, Facebook, YouTube và bất kỳ tài khoản mạng xã hội nào. Lập bảng file | đường dẫn khoá hoặc dòng | loại | giá trị hiện tại | status hiện tại. Chỉ ra riêng chỗ nào là dữ liệu của mẫu gốc Nguyên Khoa, và mọi CTA đang trỏ tới trang liên hệ hoặc kênh bên ngoài. Không tự thay giá trị nào.
3. `KIỂM TRA`: bảng phải nêu được ít nhất — `content/site.json → contact` (`phone`, `email`, `address`, `phoneLinks`, `emailLink`); `content/site.json → floatingActions.zalo.href` và `ariaLabel`; `content/contact.json → channels.items` (bốn kênh trực tiếp); `content/contact.json → social.items`; `content/site.json → headerCta` và `ui.copyright`. Nếu thiếu, rà lại từng file. Hướng dẫn lưu mốc `Trước Chặng 09`.
4. Yêu cầu học viên **tự** lập bảng kênh của họ bằng tay: loại kênh | giá trị | đã có người trực | dùng làm kênh chính. Không điền thay học viên. Ô nào chưa có ghi `chưa có` — đây là câu trả lời hợp lệ.
5. `ĐỀ XUẤT`: thay đổi chính xác cho `content/site.json → contact` và `content/contact.json → channels.items` theo bảng của học viên.
6. `THỰC THI`: áp bảng vừa duyệt. Chạy `npm run kiem-tra-lien-he` và `npm run build`, rồi báo bảng kênh | status | có href hay không | còn chờ gì.
7. `ĐỀ XUẤT`: thay đổi cho `content/contact.json → social.items` và `content/site.json → floatingActions.zalo`. Với kênh mạng xã hội học viên chưa có, đề xuất bỏ mục đó hay giữ ở trạng thái chờ và nêu ảnh hưởng tới lệnh kiểm tra. Với nút Zalo: nếu học viên chưa có Zalo, đề xuất cách tắt hoặc đổi sang kênh khác, nêu rõ cần đổi khoá nào.
8. `THỰC THI`: áp thay đổi social và nút nổi sau khi học viên duyệt. Chạy `npm run kiem-tra-lien-he`.
9. `PHÂN TÍCH`: giúp học viên kiểm chứng form bằng cách đọc mã. Đọc `components/home/ConsultForm.tsx` và `components/layout/FooterNewsletter.tsx`; với mỗi file, **trích đúng dòng làm bằng chứng** và trả lời bằng ngôn ngữ người mới: khi bấm nút gửi điều gì xảy ra; có dòng nào gửi dữ liệu ra khỏi trình duyệt không (tìm `fetch`, `axios`, `action`, `formAction`); dữ liệu nhập được lưu ở đâu sau khi đóng tab; điều gì phải thêm nếu muốn form gửi thật.
10. Hướng dẫn học viên chạy `npm run kiem-tra-lien-he` và tự quan sát trên trình duyệt: bấm gửi khi để trống ô bắt buộc; điền đúng rồi bấm gửi; tải lại trang; đọc dòng cảnh báo phía trên vùng nhập liệu. Làm lại hai việc cuối với ô nhận bản tin ở footer.
11. `PHÂN TÍCH`: ba lựa chọn số phận form khi vận hành thật — A thay vùng nhập liệu bằng liên hệ trực tiếp, B giữ mô phỏng, C chuyển Advanced. Với mỗi lựa chọn: việc phải làm ở Chặng 13, rủi ro nếu chọn sai, dấu hiệu nhận biết lựa chọn đó không còn phù hợp. Nếu học viên nghiêng về C, liệt kê đầy đủ điều kiện trước khi mở: nơi nhận dữ liệu, người chịu trách nhiệm, nội dung đồng ý, chính sách lưu giữ, chống spam, thông báo thành công/thất bại, cách xoá dữ liệu theo yêu cầu. Không chọn thay học viên.

    **Phương án A đã được triển khai trong source** dưới dạng hợp đồng `mode`. Trình bày đúng như sau, không nói nhánh này chưa hỗ trợ:

    - Mỗi cấu hình trong bốn cấu hình form nhận thêm `mode` và `directContact`. Không có `mode` hoặc `mode: "demo"` → giữ form mô phỏng, đây là mặc định. `mode: "direct"` → không render vùng nhập liệu, thay bằng component dùng chung `components/ui/DirectContact.tsx`.
    - Nhánh `direct` yêu cầu cấu hình đó có `status: "ĐÃ XÁC MINH"` **và** `directContact` đủ năm trường `title`, `description`, `label`, `href`, `status: "ĐÃ XÁC MINH"`. `href` chỉ chấp nhận `https://`, `tel:` hoặc `mailto:`.
    - **Không xoá file, không xoá cấu hình.** Giữ nguyên các trường demo cũ để tương thích kiểu dữ liệu và để quay lại chế độ demo. Không xoá `ConsultForm.tsx` hoặc `FooterNewsletter.tsx`.
    - `contact.submissionEnabled` vẫn `false` ở cả hai nhánh. Không thêm backend.
    - Chỉ đổi `status` sang `ĐÃ XÁC MINH` **sau khi** học viên đã chọn `direct` và đã kiểm tra kênh thật. Không chuyển status hàng loạt ở nội dung kinh doanh.
    - `scripts/kiem-tra-lien-he.mjs` kiểm tra cả hai nhánh; cấu hình `direct` thiếu trường hoặc `href` sai giao thức thì lệnh chặn.
    - Luồng demo cũ vẫn hợp lệ. Không ép học viên chọn A.
12. `THỰC THI`: ghi quyết định của học viên vào `tai-lieu/05-content-blueprint.md`, mục Sổ việc phải thay, tiêu đề `Quyết định form` — lựa chọn A/B/C, lý do, việc phải làm ở Chặng 13, người chịu trách nhiệm. Nếu chọn A, ghi thêm: bốn cấu hình nào sẽ chuyển `mode: "direct"`, kênh thật đứng sau từng cấu hình, người trực kênh đó, và các khoá lời mời xung quanh phải viết lại — `home-conversion.json → consult.eyebrow/title/description` cùng hai CTA (dùng chung cho trang chủ và `/lien-he`), `site.json → footer.tagline`, và các tiêu đề sidebar trong `app/tin-tuc/page.tsx`. Kênh chưa xác minh thì **chưa** chọn `direct` cho vị trí đó. Không sửa mã nguồn hoặc dữ liệu form ở Chặng 09; việc đổi `mode` diễn ra ở Chặng 13.
13. Hướng dẫn học viên thử trên **điện thoại thật** với các kênh đã bật. Nếu chưa có kênh nào, ghi đúng `CHƯA THỬ THIẾT BỊ — chưa có kênh được xác minh`.
14. `KIỂM TRA`: chạy `npm run kiem-tra-lien-he`, `npm run kiem-tra-trang-web`, `npm run lint`, `npm run build`. Rà toàn bộ `content/`, `app/`, `components/` rồi báo: số điện thoại, email, địa chỉ hoặc tài khoản nào của mẫu gốc còn sót; `href` liên hệ viết cứng ngoài dữ liệu JSON; kênh status `CẦN THAY` nhưng vẫn có `href`; kênh `ĐÃ XÁC MINH` nhưng `href` sai giao thức; form có bất kỳ dấu hiệu gửi dữ liệu nào; `submissionEnabled` khác `false`. Xác nhận `siteMode` vẫn là `demo`. Báo kết quả cuối `KHUNG LIÊN HỆ SẴN SÀNG` hoặc `LUỒNG LIÊN HỆ ĐÃ KÍCH HOẠT` kèm bằng chứng thật.
15. `THỰC THI`: ghi `golden-path-log.md`. Chỉ sau xác nhận của học viên mới chuyển `currentStage` sang 10. Không bắt đầu Chặng 10.

## Quy tắc riêng

- Giao thức liên kết: điện thoại dùng `tel:` kèm mã quốc gia; email dùng `mailto:`; Zalo, đặt lịch, bản đồ, mạng xã hội dùng `https://`. Không dùng `javascript:`, link rút gọn không rõ đích, hoặc chuỗi số chưa xác minh.
- Kênh học viên đã cung cấp: điền đúng giá trị, `href` đúng giao thức, status `ĐÃ XÁC MINH`. Kênh ghi `chưa có`: giữ mục đó nhưng `href` là chuỗi rỗng, giá trị là chuỗi mô tả trung tính, status `CẦN THAY`.
- Không giữ lại **bất kỳ** giá trị nào của Nguyên Khoa. Không tự chuẩn hoá cách viết số của học viên nếu họ chưa xác nhận.
- `channels.items` phải có **ít nhất ba** kênh — lệnh kiểm tra yêu cầu. Nếu học viên chỉ có một kênh thật, vẫn giữ đủ ba mục và để hai mục còn lại ở trạng thái chờ.
- `social.items`: lệnh kiểm tra yêu cầu **mọi** mục có status `ĐÃ XÁC MINH` và `href` bắt đầu bằng `https://`. Ở đây chỉ giữ kênh thật, còn lại thì bỏ mục — không có trạng thái chờ.
- `ariaLabel` của nút nổi không được còn nhắc tên mẫu gốc. Nút nổi hiện trên **mọi trang**; bỏ sót nó nghĩa là mọi trang đều dẫn sai.
- **Ba việc bị cấm:** đổi `submissionEnabled` thành `true`; đổi nhãn nút thành "Gửi ngay" hoặc tương đương; xoá dòng cảnh báo mô phỏng. Cả ba đều tạo kỳ vọng giả cho người thật.
- Không ghi "đã thử thiết bị thật" khi mới bấm trên máy tính. Desktop không kiểm chứng được hành vi gọi điện hoặc mở ứng dụng di động.
- Không tự đổi status và không tạo dữ liệu mẫu để vượt lệnh kiểm tra.
- Nếu `npm run kiem-tra-lien-he` báo lỗi: đọc nguyên văn, chỉ ra khoá dữ liệu hoặc dòng mã gây lỗi. Không sửa bằng cách đổi `submissionEnabled` hoặc xoá cảnh báo demo.

## Tiêu chuẩn đạt

- Báo cáo dữ liệu liên hệ mẫu gốc còn sót bằng **0** — gồm cả nút nổi, `headerCta`, `ui.copyright`, `social.items`.
- Kênh `CẦN THAY` không có `href` hoạt động; kênh `ĐÃ XÁC MINH` dùng đúng giao thức.
- `channels.items` có ít nhất ba mục; `social.items` chỉ còn kênh thật với `https://` và `ĐÃ XÁC MINH`.
- Không `href` liên hệ nào viết cứng ngoài dữ liệu JSON.
- Ba form vẫn ở trạng thái mô phỏng, cảnh báo hiển thị **trước** vùng nhập liệu, `submissionEnabled` vẫn `false`.
- Học viên trả lời được bằng lời của mình rằng form kiểm tra dữ liệu trên trình duyệt rồi dừng, không gửi đi đâu.
- Kênh liên hệ thật nằm ngay cạnh form.
- Quyết định form A/B/C đã ghi thành văn vào Sổ Go-live.
- Kết quả thiết bị thật được ghi trung thực, gồm cả `CHƯA THỬ THIẾT BỊ`.
- `siteMode: demo`.
- `npm run kiem-tra-lien-he`, `kiem-tra-trang-web`, `lint`, `build` sạch.
