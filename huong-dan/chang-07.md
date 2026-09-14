# Hướng dẫn Codex — Chặng 07

## Mục tiêu

Lập danh mục component thật, chứng minh sửa một chỗ thì đổi nhiều nơi, điều khiển Header và Footer hoàn toàn bằng `content/site.json`, xử lý chuỗi chữ viết cứng, rồi kiểm tra responsive và bàn phím toàn site.

## Bối cảnh bắt buộc nhớ

Website đã có bộ component hoàn chỉnh. Chặng 07 dạy học viên **dùng nó**, không dạy xây lại nó. Lỗi tốn kém nhất của chặng này là viết component mới cho một nhu cầu đã có sẵn.

Chặng 07 **không** ráp lại trang và **không** đổi nội dung từng trang. Đó là việc của Chặng 08.

`dev/ComponentLab.tsx` **không phải một trang**. Nó nằm ngoài `app/` nên không có địa chỉ để mở trong trình duyệt — đọc nó như đọc một cuốn catalogue. Không có và không được phép có route `/components`: `npm run kiem-tra-giao-dien` báo lỗi nếu ai đó tạo `app/components/page.tsx` hoặc đưa `"href":"/components"` vào `site.json`.

## Được phép đọc

- `AGENTS.md`, file này
- `tai-lieu/02-website-brief.md`, `04-design-system.md`, `04-quyet-dinh-giao-dien.md`, `06-hop-dong-du-lieu.md`
- Toàn bộ `components/`, `dev/`, `app/`, `lib/`, `content/`, `scripts/`

## Được phép sửa

- `content/site.json` — chỉ các khối `navigation`, `headerCta`, `footer.columns`, `footer.tagline`, `footer.contactTitle`, `footerLinks` và các nhãn trong `ui`
- `app/design-system.css` — chỉ **một** thuộc tính hình học nút trong thí nghiệm ở bước 4, và chỉ giá trị biến
- Các file trong `components/` — **chỉ** để sửa đúng dòng chứa chuỗi chữ hiển thị viết cứng
- `content/*.json` và `lib/types.ts` — chỉ khi học viên chọn đưa một chuỗi cứng lên dữ liệu
- `tai-lieu/07-danh-muc-component.md` — mẫu trống đã có sẵn với năm mục `Nhóm A — đang dùng`, `Nhóm B — chưa dùng`, `Nhóm C — nội bộ`, `Quy tắc dùng chung`, `Bằng chứng thay đổi`; điền vào mẫu, giữ nguyên tiêu đề
- `tai-lieu/golden-path-log.md`
- `tai-lieu/trang-thai-hoc.md`, chỉ sau xác nhận của học viên

## Không được sửa

- `content/site.json` các khối `contact`, `seo`, `floatingActions`, `routes`, `catalog`, `siteMode`
- Nội dung hiển thị của từng trang trong `content/` — Chặng 08 xử lý
- Cấu trúc component: không đổi props, không tách file, không tạo component mới
- `lib/content.ts`, `lib/seo.ts`
- `app/page.tsx` và các `page.tsx` khác — không bật/tắt section ở chặng này
- File route trong `app/` — không xoá để ẩn một trang
- `scripts/`, `next.config.ts`, `package.json`
- Tài liệu Chặng 01–06 và Chặng 08–13

## Thứ tự bắt buộc

1. `KIỂM TRA`: chạy `npm run kiem-tra-giao-dien`, `npm run lint`, `npm run build`. Hướng dẫn học viên chụp trang chủ desktop và 375px, lưu mốc `Trước Chặng 07`.
2. `PHÂN TÍCH`: đọc toàn bộ `components/` và `dev/`. Lập bảng — file | nhóm (ui/layout/home/subpages/seo) | props nhận vào | trang hoặc component đang dùng | dữ liệu lấy từ đâu. Đánh dấu ba nhóm: A component đang được trang thật dùng; B component tồn tại nhưng chưa trang nào dùng; C component chỉ dùng trong `dev/ComponentLab.tsx`. Cuối bảng liệt kê mọi cặp component có chức năng gần giống nhau.
3. `THỰC THI`: ghi bảng vào `tai-lieu/07-danh-muc-component.md`.
4. `PHÂN TÍCH` rồi `THỰC THI`: thí nghiệm sửa một chỗ đổi nhiều nơi. Đọc `components/ui/Button.tsx` và phần `.button` trong `app/design-system.css`; cho biết hình học nút được quyết định ở đâu, biến nào điều khiển bo góc, những nơi nào đang dùng `Button`. Sau đó đổi **đúng một** thuộc tính, **đúng một chỗ** trong `app/design-system.css`. Không sửa `Button.tsx`, không đổi màu. Hướng dẫn học viên mở trang chủ, trang khoá học và trang liên hệ để xác nhận nút đổi ở cả ba nơi, rồi quyết định giữ hoặc khôi phục.
5. `PHÂN TÍCH`: đọc `content/site.json`, `components/layout/Header.tsx`, `Footer.tsx` và đối chiếu bảng quyết định route Chặng 02. Lập bảng thay đổi cho `navigation`, `headerCta`, `footer.columns`, `footerLinks` — mục hiện tại | quyết định GIỮ/ĐỔI TÊN/TẮT | nhãn mới | đường dẫn mới. Với mục TẮT nêu rõ nó đang xuất hiện ở những khối nào. Cảnh báo nếu một route bị gỡ khỏi menu nhưng vẫn còn liên kết trỏ tới từ nơi khác trong `site.json`.
6. `THỰC THI`: áp bảng vừa duyệt vào `content/site.json`. Chạy `npm run kiem-tra-giao-dien` rồi dừng lại.
7. `PHÂN TÍCH`: rà toàn bộ `components/` và `app/`, liệt kê mọi chuỗi chữ tiếng Việt hiển thị cho người dùng đang viết thẳng trong mã — file, dòng, nội dung, nơi component đó đang dùng, và khuyến nghị sửa thẳng hay đưa lên JSON kèm lý do. Bỏ qua chú thích trong mã.
8. `THỰC THI`: xử lý **từng chuỗi một** theo lựa chọn của học viên. Nếu đưa lên JSON, trước đó phải `ĐỀ XUẤT` chính xác ba thay đổi: khoá mới trong file JSON nào, kiểu cần thêm trong `lib/types.ts`, cách component nhận nó qua props.
9. Hướng dẫn học viên kiểm tra responsive từng trang GIỮ tại 375px, 768px và desktop theo bảng hạng mục: cuộn ngang, chữ tràn, nút, menu mobile, ảnh hero, thẻ và dải ảnh, nút nổi Zalo. Khi phát hiện lỗi, `PHÂN TÍCH` từng lỗi một: tìm đúng phần tử và nguyên nhân, đề xuất sửa nhỏ nhất, chờ học viên đồng ý.
10. Hướng dẫn học viên kiểm tra bàn phím từ đầu trang chủ: liên kết đầu tiên phải là bỏ qua điều hướng; focus nhìn thấy rõ; thứ tự Tab hợp lý; menu con mở được bằng bàn phím và đóng bằng `Escape`; menu mobile ở 375px không tạo bẫy; nút nổi và các nút trong form đều tới được.
11. `KIỂM TRA`: chạy `npm run kiem-tra-giao-dien`, `npm run kiem-tra-du-lieu`, `npm run lint`, `npm run build`. Rà mọi file trong `components/` và `app/` rồi báo: component import trực tiếp `content/*.json`; mã HEX ngoài `app/globals.css` và `app/design-system.css`; chuỗi chữ hiển thị còn viết cứng; hai component trùng chức năng; ảnh thiếu alt, thiếu kích thước hoặc thiếu `sizes`; route công khai `/components` — phải không tồn tại. Xác nhận `siteMode` vẫn là `demo`.
12. `THỰC THI`: ghi `golden-path-log.md`. Chỉ sau xác nhận của học viên mới chuyển `currentStage` sang 8. Không thực hiện Chặng 08.

## Quy tắc riêng

- Kết quả bảng danh mục phải nêu đúng bốn điều sau, kiểm chứng bằng file thật:
  - Nhóm B gồm các component đang ngủ: sáu file riêng `AudienceStrip`, `MethodSection`, `JourneySection`, `FaqSection`, `FinalCta`, `ProgramCard`; và ba **named export trong `components/home/ShowcaseSections.tsx`** chưa được dùng là `AdvantageSection`, `TestimonialSection`, `NewsSection` — chúng không phải file riêng. Trong cùng file đó, `StorySection`, `FacultySection`, `ProofSection` đang được `app/page.tsx` dùng và `CommunitySection` đang được `app/hoc-vien/page.tsx` dùng.
  - `components/seo/JsonLd.tsx` cũng chưa được trang nào import; `npm run kiem-tra-seo` chỉ yêu cầu file tồn tại và không chứa schema đánh giá. Không nói website đang nhúng JSON-LD.
  - `components/ui/Card.tsx` thuộc nhóm C — hiện chỉ xuất hiện trong `dev/ComponentLab.tsx`.
  - `dev/ComponentLab.tsx` không phải một trang và không có địa chỉ để mở.
  - Các trang thật dùng `NewsCard` và component chuyên biệt của từng section, không dùng `Card`.
- Nếu học viên hỏi "trang nào đang dùng `ProgramCard`", trả lời đúng: **chưa trang nào**. Nó là component đang ngủ.
- Không viết nhãn hoặc đường dẫn thẳng vào `Header.tsx` hoặc `Footer.tsx`. Cách kiểm tra nhanh: đổi nhãn trong `site.json`; nếu giao diện không đổi thì đang có chỗ viết cứng.
- Giữ nguyên cấu trúc khoá trong `site.json`; menu con vẫn dùng mảng `children`. Mất mảng này thì mục trở thành liên kết đơn.
- Tắt một trang = gỡ khỏi `navigation` và `footer.columns`. Không xoá file route.
- Không dùng `overflow-hidden` để che lỗi mobile; phải tìm đúng phần tử gây tràn.
- Không đặt `priority` cho mọi ảnh; chỉ ảnh quan trọng nhất trong màn hình đầu.
- Không dùng `outline: none` mà thiếu dấu hiệu focus thay thế.
- Không cài thư viện component hoặc bộ icon mới. Source đã có bộ component và `lucide-react`.
- Không sửa CSS riêng cho một nút thay vì dùng `Button`.
- Mỗi lỗi responsive hoặc bàn phím được sửa riêng, có kiểm tra lại cả ba chiều rộng.

## Tiêu chuẩn đạt

- `tai-lieu/07-danh-muc-component.md` phủ hết `components/` và `dev/`, có phân nhóm A/B/C đúng và kiểm chứng được.
- Nút đổi đồng loạt trên ít nhất ba trang từ một chỗ sửa duy nhất; nếu khôi phục, giá trị trở về đúng như `04-design-system.md`.
- Menu và footer phản ánh đúng bảng quyết định route; trang TẮT không còn trong header, footer và mọi CTA trong `site.json`.
- Đổi tạm một nhãn menu trong JSON thì giao diện đổi, và đã khôi phục.
- Không còn nhãn giao diện hoặc chuỗi mang tên thương hiệu mẫu gốc viết cứng trong component.
- Không trang nào cuộn ngang ở 375px; console không có lỗi đỏ.
- Liên kết bỏ qua điều hướng hoạt động; không mất dấu focus; không có bẫy bàn phím; menu con đóng được bằng `Escape`.
- Bố cục các trang chưa đổi so với hai ảnh mốc ở bước 1 — chỉ những chỗ cố ý đổi mới khác.
- `siteMode: demo`.
- `npm run kiem-tra-giao-dien`, `npm run kiem-tra-du-lieu`, `npm run lint`, `npm run build` sạch.
