# Hướng dẫn Codex — Chặng 04

## Mục tiêu

Trích cấu trúc section thật của website mẫu, chấm quyết định cho từng section, và khoá Design System đọc ngược từ CSS đang chạy. Chỉ tạo mockup cho section được chấm ĐỔI BỐ CỤC. Chưa sửa một dòng mã giao diện nào.

## Bối cảnh bắt buộc nhớ

Website đã có phong cách chạy thật. Chặng này **không** hỏi "phong cách này có phải thứ bạn muốn không?" mà hỏi "từng section đang có phục vụ khách hàng của học viên tới đâu?".

Trang chủ render đúng **10 section** theo `app/page.tsx`, theo thứ tự: `Hero`, `BenefitStrip`, `StorySection`, `FacultySection`, `ProofSection`, `CoursesSection`, `VideoTestimonial`, `CommunityGallery`, `HomeNewsSection`, `ConsultSection`. Ba section `StorySection`, `FacultySection`, `ProofSection` là **named export của cùng một file** `components/home/ShowcaseSections.tsx`, không phải ba file riêng. Phải nói rõ điều này khi lập bảng.

Không mockup là kết quả hợp lệ và là kết quả phổ biến nhất.

## Được phép đọc

- `AGENTS.md`, file này
- `tai-lieu/01-dinh-huong.md`, `01-ban-do-website-mau.md`, `02-website-brief.md`, `03-brand-kit.md`
- `app/page.tsx` và các trang trong `app/` thuộc danh sách GIỮ
- `components/` — để đối chiếu component thật với tên section
- `content/home.json`, `showcase.json`, `home-conversion.json`
- `app/design-system.css`, `app/globals.css`, `app/layout.tsx` — chỉ để trích giá trị
- `DESIGN-SYSTEM.md` — tài liệu tham chiếu của gói, không phải nguồn sự thật
- Tên file trong `tai-san/` và `public/images/`

## Được phép sửa

- `tai-lieu/04-quyet-dinh-giao-dien.md` — mẫu trống đã có sẵn; điền vào mẫu, giữ nguyên tiêu đề
- `tai-lieu/04-design-system.md` — mẫu trống đã có sẵn; điền vào mẫu, giữ nguyên tiêu đề
- `tai-san/mockup/` (tạo mới, chỉ khi có section ĐỔI BỐ CỤC)
- `tai-lieu/golden-path-log.md`
- `tai-lieu/trang-thai-hoc.md`, chỉ sau xác nhận của học viên

## Không được sửa

- `app/`, `components/`, `lib/`, `content/`, `public/`, `scripts/`
- `app/design-system.css`, `app/globals.css`, `app/layout.tsx`
- `DESIGN-SYSTEM.md`
- Tài liệu Chặng 01–03 và Chặng 05–13
- File gốc trong `tai-san/` ngoài thư mục `mockup/`

## Thứ tự bắt buộc

1. `PHÂN TÍCH`: đọc `app/page.tsx` và các trang GIỮ. Với mỗi trang lập bảng theo đúng thứ tự render — số thứ tự | tên section | component | khoá dữ liệu cấp vào | vai trò với người xem.
2. `KIỂM TRA`: đối chiếu bảng trang chủ với 10 section nêu trên. Nếu lệch, mở lại `app/page.tsx` chứ không suy đoán.
3. Hướng dẫn học viên tự chấm từng section: GIỮ | ĐỔI NỘI DUNG | ĐỔI BỐ CỤC | TẮT. Không chấm thay học viên.
4. `PHÂN TÍCH`: phản biện bảng chấm của học viên theo Brief và Brand Kit — section giữ nhưng không phục vụ khách hàng chính, section tắt nhưng đang gánh vai trò không ai thay được, chỗ nào làm gãy mạch đọc.
5. `ĐỀ XUẤT`: thứ tự section cuối cùng của trang chủ, mỗi section kèm vai trò trong mạch đọc. Nếu thứ tự hiện tại đã phục vụ mạch đó, phải nói rõ là không cần đổi.
6. `PHÂN TÍCH`: các component đang ngủ. Đọc thật `AudienceStrip.tsx`, `MethodSection.tsx`, `JourneySection.tsx`, `FaqSection.tsx`, `FinalCta.tsx`, `ProgramCard.tsx` và `AdvantageSection` trong `ShowcaseSections.tsx`; báo mỗi component hiển thị gì, cần dữ liệu hình dạng nào, `home.json` đã đủ chưa, chuỗi chữ nào viết cứng. Không bật component nào ở chặng này.
7. `ĐỀ XUẤT`: chỉ khi có section ĐỔI BỐ CỤC — prompt tạo mockup desktop 1440×900 kèm biến thể mobile 375px, bắt buộc nhắc đúng tên biến màu và font. Học viên tự tạo ảnh, lưu vào `tai-san/mockup/`.
8. `THỰC THI`: điền mẫu có sẵn `tai-lieu/04-design-system.md` bằng cách đọc ngược từ `app/design-system.css`, `app/globals.css`, `app/layout.tsx`. Giữ nguyên tiêu đề của mẫu.
9. `THỰC THI`: điền mẫu có sẵn `tai-lieu/04-quyet-dinh-giao-dien.md` và ghi `golden-path-log.md`.
10. `KIỂM TRA`: chạy `npm run lint`, `npm run build`; đối chiếu tiêu chuẩn đạt.
11. Chỉ sau xác nhận của học viên mới chuyển `currentStage` sang 5 trong `tai-lieu/trang-thai-hoc.md`. Không sửa `content/site.json`.

## Quy tắc riêng

- Mọi con số trong `04-design-system.md` phải lấy từ file thật. Mục nào không đọc được ghi `CẦN ĐO`, tuyệt đối không ước lượng.
- CSS là sự thật. Nếu `DESIGN-SYSTEM.md` của gói lệch với CSS đang chạy, ghi theo CSS và ghi chú chỗ lệch.
- Mỗi section đúng một quyết định. Số section ĐỔI BỐ CỤC không quá hai; nhiều hơn là thiết kế lại, vượt phạm vi.
- Trang chủ sau khi trừ phần TẮT phải còn ít nhất 5 section.
- Mỗi quyết định TẮT phải trả lời được: vai trò đó ai gánh thay?
- Không đề xuất viết component mới. Kiểm tra danh sách component đang ngủ trước.
- `MethodSection` có một nút với nhãn và đường dẫn viết thẳng trong component; nếu học viên chọn bật, phải ghi vào danh sách chuỗi cứng để Chặng 08 sửa.
- Không sửa `app/page.tsx` ở chặng này, kể cả khi học viên yêu cầu — nhắc lại rằng Chặng 08 mới thi công.
- Không dùng từ rỗng như "đẹp", "hiện đại" nếu không giải thích bằng biểu hiện cụ thể.

## Tiêu chuẩn đạt

- Bảng cấu trúc section phủ hết mọi trang được GIỮ, kiểm chứng được với file thật; trang chủ ra đúng 10 section.
- Bảng quyết định có đúng một quyết định cho mỗi section, mỗi dòng có lý do.
- `04-design-system.md` không chứa giá trị nào mà CSS thật không có; ba giá trị lấy ngẫu nhiên phải khớp `app/design-system.css`.
- Danh sách component đang ngủ và quyết định bật/không bật được ghi rõ.
- Danh sách chuỗi chữ cứng sẽ phải sửa ở Chặng 08 đã có.
- Mockup, nếu có, không quá hai và có bản mobile; nhìn ra vẫn thuộc cùng website.
- Không file nào trong `app/`, `components/`, `lib/`, `content/`, `public/`, `scripts/` bị sửa.
- `npm run lint` và `npm run build` vẫn sạch.
