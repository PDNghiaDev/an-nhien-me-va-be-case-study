# Hướng dẫn Codex — Chặng 12

## Mục tiêu

Nghiệm thu website qua năm vòng **có bằng chứng**, xác nhận không còn dấu vết định danh của mẫu gốc, viết bốn tài liệu bàn giao, và diễn tập rollback ba lớp. Đây là mốc hoàn thành sản phẩm cốt lõi của khoá học.

## Bối cảnh bắt buộc nhớ

Website chưa phải bản kinh doanh chính thức: `siteMode` vẫn là `demo`, Google vẫn bị chặn, dữ liệu còn `DEMO`/`CẦN THAY`. Chặng 13 làm trên **chính source này**.

`CẦN THAY` có chủ đích **không phải lỗi** ở Chặng 12. Thiếu ghi nhận mới là lỗi.

Hai mốc bàn giao đều hợp lệ: `BẢN Ở MÁY` (Chặng 11 mới hoàn tất `out/` và static server — phép thử online ghi `CHƯA THỬ — chưa có URL`) và `ĐÃ CÓ URL XEM THỬ` (Cloudflare Pages hoạt động — có thêm bằng chứng qua mạng khác và người ngoài dự án).

Blog trong source vẫn là blog tĩnh. Ba form vẫn là mô phỏng. Hệ quản trị nội dung và form thật thuộc khoá Advanced.

### Bốn tài liệu mà `npm run kiem-tra-ban-giao` yêu cầu

Lệnh kiểm tra đọc **bốn** file, không phải ba, và đối chiếu **đúng tên mục**. Thiếu một mục là lệnh chặn.

Cả bốn file **đã có sẵn trong `tai-lieu/`** dưới dạng mẫu trống, đúng các tiêu đề mà lệnh yêu cầu và có sẵn dấu `[CHƯA ĐIỀN]`. Việc cần làm là **điền vào mẫu**: giữ nguyên tiêu đề, thay từng dấu `[CHƯA ĐIỀN]` bằng bằng chứng thật. Không tạo file mới, không đổi cách viết tiêu đề, không xoá dấu chưa điền chỉ để vượt kiểm tra.

| File | Mục bắt buộc |
|---|---|
| `tai-lieu/12-nghiem-thu.md` | `Vòng 1`, `Vòng 2`, `Vòng 3`, `Vòng 4`, `Vòng 5`, `Danh sách lỗi`, `Kết luận` |
| `tai-lieu/handoff.md` | `Trạng thái bản bàn giao`, `Website đang chạy ở đâu`, `Tài khoản và quyền sở hữu`, `Sửa gì thì vào đâu`, `Trạng thái dữ liệu`, `Build và deploy`, `Khi hỏng và rollback`, `Việc còn mở và Chặng 13`, `Cầu nối WordPress Advanced` |
| `tai-lieu/12-van-hanh-rollback.md` | `Bài tập thay đổi đảo ngược được`, `Lớp 1`, `Lớp 2`, `Lớp 3`, `Nhịp vận hành tối thiểu`, `Nhịp theo sự kiện` |
| `tai-lieu/21-beta-user-test-kit.md` | `Chọn người thử`, `Bốn nhiệm vụ bắt buộc`, `Phiếu ghi cho từng người`, `Cách tổng hợp`, `Cổng kết luận` |

Ngoài ra lệnh yêu cầu: không file nào còn chuỗi `[CHƯA ĐIỀN]`; `12-nghiem-thu.md` phải chứa `P0 còn mở: 0` và dùng ít nhất một trạng thái hợp lệ trong `ĐẠT` / `CHƯA THỬ` / `BỊ CHẶN` / `KHÔNG ÁP DỤNG`; `content/site.json → siteMode` phải là `demo`.

## Được phép đọc

- `AGENTS.md`, `README.md`, file này
- Toàn bộ `tai-lieu/`
- Toàn bộ `content/`, `app/`, `components/`, `lib/`, `public/`, `scripts/`, `out/`
- Trạng thái Git và lịch sử deployment

## Được phép sửa

- `tai-lieu/12-nghiem-thu.md`, `tai-lieu/handoff.md`, `tai-lieu/12-van-hanh-rollback.md`, `tai-lieu/21-beta-user-test-kit.md` — điền vào mẫu có sẵn, giữ nguyên tiêu đề
- Sửa lỗi P0 và P1 đã được học viên duyệt trong `content/`, `app/`, `components/`
- Một giá trị dữ liệu không nhạy cảm cho bài diễn tập rollback ở bước 9, và phải được khôi phục
- `tai-lieu/05-content-blueprint.md` — cập nhật Sổ việc phải thay
- `tai-lieu/golden-path-log.md`
- `tai-lieu/trang-thai-hoc.md`, chỉ sau xác nhận của học viên

## Không được sửa

- `content/site.json → siteMode` — giữ `demo`; `kiem-tra-ban-giao` chặn nếu khác
- `content/site.json → seo.siteUrl` — chưa đổi sang tên miền production
- Dữ liệu mang status `CẦN THAY` — không tự thay, không tự đổi nhãn
- `content/contact.json → submissionEnabled` và mọi khoá form
- `scripts/`, `next.config.ts`, `package.json`, `lib/`
- Tài liệu Chặng 01–11 và Chặng 13
- Tên miền, DNS, quyền truy cập bên ngoài

Không thêm tính năng, không thiết kế lại, không gắn tên miền, không bật production, không bắt đầu Chặng 13.

## Thứ tự bắt buộc

1. `PHÂN TÍCH`: đọc `golden-path-log.md` của Chặng 11 và xác định mốc `BẢN Ở MÁY` hay `ĐÃ CÓ URL XEM THỬ`. Chạy theo đúng thứ tự `npm run lint`, `npm run build`, rồi `npm run kiem-tra-static`, `npm run kiem-tra-seo`, `npm run kiem-tra-lien-he` — phải build trước `kiem-tra-static` vì lệnh đó đọc thư mục `out/`. Ghi URL nghiệm thu, commit, `siteMode` và thời điểm. Liệt kê mọi ý tưởng tính năng đang được đề xuất nhưng không thuộc Website Brief hoặc bảng quyết định; đánh dấu `HOÃN`. Mở mẫu `tai-lieu/12-nghiem-thu.md` đã có sẵn trong gói — đủ bảy tiêu đề — và chỉ điền phần thông tin đầu vào và mốc bàn giao. Hướng dẫn lưu mốc `Bắt đầu nghiệm thu Chặng 12`.
2. `KIỂM TRA` — Vòng 1, dữ liệu và dấu vết mẫu gốc. Rà `content/*.json`, `public/images/`, `app/`, `components/` và `05-content-blueprint.md`:
   - A. Đếm `ĐÃ XÁC MINH`, `DEMO`, `CẦN THAY` theo trang.
   - B. Tìm placeholder vô nghĩa: `Lorem ipsum`, `TODO`, `test`, `abc`, `example.com`, `KIỂM TRA KẾT NỐI DỮ LIỆU`.
   - C. Tìm giá, số liệu, lời chứng thực, khách hàng, liên hệ và pháp lý không có nguồn hoặc không có trạng thái.
   - D. Tìm nội dung viết cứng trong `app/` hoặc `components/` thay vì dữ liệu.
   - E. Đối chiếu Sổ việc phải thay: mục nào thiếu, trùng hoặc đã xử lý nhưng chưa cập nhật.
   - F. **QUAN TRỌNG** — rà toàn bộ dự án tìm mọi dấu vết định danh của website mẫu gốc: tên thương hiệu, tên người, số điện thoại, email, địa chỉ, liên kết mạng xã hội, đường dẫn ảnh còn mang tên mẫu, và URL demo cũ. Lập bảng file | dòng hoặc khoá | giá trị | đã thay hay chưa | lý do nếu cố ý giữ.

   Ghi vào Vòng 1. Không tự thay dữ liệu `CẦN THAY`.
3. `KIỂM TRA` — Vòng 2, kỹ thuật và hành trình. Trên bản bàn giao đã chốt: mọi route trong sitemap và mọi slug động; tải lại trực tiếp một route con; 404 với URL bịa; hai hành trình (trang chủ → danh mục → chi tiết → liên hệ; header → giới thiệu → footer → chính sách → trang chủ); kênh liên hệ đã bật và kênh đang chờ; ba form mô phỏng gồm cảnh báo hiển thị, kiểm tra dữ liệu chạy, thông báo nói rõ không gửi hoặc lưu, `submissionEnabled` vẫn `false`; desktop, 768px, 375px không cuộn ngang; console, ảnh/font/CSS lỗi, liên kết chết; file tĩnh tương ứng trong `out/`. Ghi mỗi phép thử với `ĐẠT` / `CHƯA THỬ` / `BỊ CHẶN` / `KHÔNG ÁP DỤNG`, kèm URL, thiết bị, thời điểm và bằng chứng.
4. `KIỂM TRA` — Vòng 3, SEO, accessibility và hiệu năng. Đối chiếu từng route: title, description, canonical, dữ liệu chia sẻ; `noindex,nofollow` vì `siteMode=demo`; `sitemap.xml` đủ URL và không chứa route đã tắt; `robots.txt` chặn toàn site demo; JSON-LD không chứa dữ liệu chưa xác minh; một H1, heading đúng cấp, alt phù hợp; liên kết bỏ qua điều hướng, `focus-visible`, Tab và `Escape`; nhãn ô nhập trong ba form; Lighthouse online hoặc tại production build. Nếu chưa có URL online, phần online ghi `CHƯA THỬ`.
5. `PHÂN TÍCH` — Vòng 4, thẩm mỹ và độ đầy đặn. Đặt cạnh nhau `04-design-system.md`, `04-quyet-dinh-giao-dien.md`, `05-content-blueprint.md` và ảnh chụp từng route ở desktop lẫn 375px. Lập bảng sai khác theo route, mức độ P0/P1/P2 và đề xuất sửa nhỏ nhất. Không đề xuất thiết kế lại hoặc thêm tính năng.
6. `THỰC THI`: sửa toàn bộ P0 và các P1 ảnh hưởng trực tiếp tới cảm giác hoàn chỉnh; P2 ghi backlog. Chụp ảnh trước/sau cho lỗi thị giác đã sửa.
7. `THỰC THI`: điền `tai-lieu/21-beta-user-test-kit.md` — mẫu đã có sẵn với đủ năm tiêu đề — **trước khi** học viên chạy phiên thử. Bốn nhiệm vụ dưới đây được ghi vào đúng mục `Bốn nhiệm vụ bắt buộc`. Sau đó hướng dẫn học viên đưa URL hoặc bản chạy tại máy cho một người chưa tham gia, không hướng dẫn đường đi, và giao nhiệm vụ: nói trong một câu website này dành cho ai và cung cấp gì; tìm một dịch vụ hoặc sản phẩm phù hợp và mở trang chi tiết; tìm cách liên hệ; thử điền form và nói họ nghĩ điều gì xảy ra sau khi bấm nút. Ghi lại thiết bị, thời gian, chỗ họ dừng, câu nói nguyên văn ngắn, vấn đề quan sát được và mức P0/P1/P2. Ghi vào Vòng 5.
8. `THỰC THI`: hoàn thiện `tai-lieu/handoff.md` — mẫu đã có sẵn với đủ chín tiêu đề — dùng bằng chứng Chặng 12. Ghi rõ giới hạn: blog là trang tĩnh, ba form là mô phỏng và không nhận dữ liệu. Ở mục `Sửa gì thì vào đâu`, nêu đúng tên file và kèm ghi chú những chuỗi chữ nằm trong component. Ở mục `Cầu nối WordPress Advanced`, ghi: giữ hợp đồng kiểu dữ liệu và component, thay adapter `lib/content.ts` từ JSON sang CMS, rồi kiểm thử lại.
9. Hướng dẫn học viên diễn tập vận hành theo đúng `handoff.md`: lưu mốc an toàn → sửa đúng một giá trị trong dữ liệu → xem lại thay đổi → chạy các lệnh kiểm tra liên quan, lint và build → xem bản tĩnh hoặc bản preview → khôi phục giá trị cũ bằng một thay đổi mới → xác nhận website trở về trạng thái ban đầu. Sau đó `THỰC THI` điền `tai-lieu/12-van-hanh-rollback.md` — mẫu đã có sẵn với đủ sáu tiêu đề: Lớp 1 mã nguồn dùng commit và revert, không force push; Lớp 2 deployment chọn deployment tốt gần nhất; Lớp 3 cấu hình ngoài gồm tên miền, DNS, quyền truy cập, ghi lại trước khi đổi vì không phải lúc nào cũng có nút hoàn tác.
10. `KIỂM TRA`: chạy theo đúng thứ tự `npm run lint`, `npm run build`, rồi `npm run kiem-tra-ban-giao`, `npm run kiem-tra-static`, `npm run kiem-tra-seo`, `npm run kiem-tra-lien-he`. Build phải chạy trước `kiem-tra-static`. Xác nhận biên bản có đủ 5 vòng, mỗi mục có trạng thái hợp lệ và bằng chứng; không còn P0 và P1 còn lại có người xử lý và hạn; handoff và rollback không chứa bí mật; `siteMode=demo`, `noindex` và robots vẫn chặn. Liệt kê tài sản giữ nguyên khi sang Chặng 13 (component, layout, route, Design System, lớp dữ liệu, quy trình deploy) và phần Chặng 13 phải xử lý (dữ liệu còn `CẦN THAY`, ảnh chưa có, kênh liên hệ chưa xác minh, quyết định form, `siteUrl`, tên miền, `siteMode`).
11. `THỰC THI`: ghi `golden-path-log.md`. Chỉ sau xác nhận của học viên mới chuyển `currentStage` sang 13. Không thực hiện Chặng 13.

## Quy tắc riêng

- **Không ghi `ĐẠT` nếu chưa thực hiện.** Mỗi kết quả cần URL, thiết bị, thời điểm, ảnh hoặc log. Checkbox toàn "Đạt" không có bằng chứng là không hợp lệ.
- Không tuyên bố có URL online khi chưa deploy.
- Vòng 1 mục F là cửa riêng của gói V2. Bỏ qua nghĩa là có thể công bố website mang thông tin doanh nghiệp khác. Dữ liệu liên hệ, tên người và URL demo cũ phải bằng **0**; dấu vết định danh còn lại phải là cố ý và có lý do ghi rõ.
- Không biến Chặng 12 thành vòng thiết kế lại. Chỉ sửa sai khác và lỗi; ý tưởng mới đưa vào backlog.
- Không coi `CẦN THAY` là lỗi sản phẩm. Nó hợp lệ trong demo khi được ghi nhận và không giả làm dữ liệu thật.
- `handoff.md` không chứa mật khẩu, token hoặc thông tin đăng nhập. Chỉ ghi vai trò chủ sở hữu và nơi quản lý quyền.
- Không hướng dẫn rollback bằng force push. Dùng revert và rollback deployment; giữ lịch sử rõ ràng.
- Không hứa rằng nâng cấp WordPress sẽ không phải sửa component nào. Mục tiêu là giữ hợp đồng giao diện; thực tế vẫn phải kiểm thử và có thể chỉnh adapter hoặc kiểu dữ liệu.
- Nếu người thử ở Vòng 5 tin rằng thông tin đã được gửi đi, đó là lỗi **P0**: cảnh báo mô phỏng chưa đủ rõ. Sửa cảnh báo, không sửa bằng cách đổi nhãn nút hay bật gửi dữ liệu.
- Nếu `npm run kiem-tra-ban-giao` báo thiếu mục: đọc nguyên văn lỗi, chỉ ra tài liệu nào thiếu mục nào, bổ sung đúng mục còn thiếu bằng nội dung thật đã có trong biên bản. Không xoá mục khác và không điền nội dung bịa để lệnh chạy qua.
- Không để lại chuỗi `[CHƯA ĐIỀN]` trong bất kỳ tài liệu nào.

## Tiêu chuẩn đạt

- Bốn tài liệu bàn giao tồn tại với **đúng** tên mục mà `kiem-tra-ban-giao` yêu cầu; không còn `[CHƯA ĐIỀN]`.
- Biên bản có đủ 5 vòng; mỗi mục dùng trạng thái hợp lệ và có bằng chứng; ghi `P0 còn mở: 0`.
- Không còn P0. Không còn P1 làm website trông thô hoặc lệch Design System; P1 còn lại có người xử lý và hạn.
- Vòng 1 mục F: dữ liệu liên hệ, tên người và URL demo cũ của mẫu gốc bằng 0.
- Route công khai và slug thật đều hoạt động; route bịa ra 404; không liên kết chết hoặc CTA giả; không tràn ở 375px; console không lỗi.
- Ba form giữ nguyên trạng thái mô phỏng; `submissionEnabled` vẫn `false`.
- Demo vẫn bị chặn Google; `siteUrl` không còn là địa chỉ của mẫu gốc; Lighthouse có bằng chứng thật hoặc `CHƯA ĐO`.
- Có ít nhất một phiên thử người dùng thật hoặc `CHƯA THỬ — [LÝ DO]`; người thử hiểu đúng bản chất form mô phỏng.
- Người mới đọc `handoff.md` xác định được file cần sửa và quy trình đưa thay đổi lên mạng; tài liệu không chứa bí mật và phân biệt rõ demo với production.
- Bài diễn tập thay đổi và khôi phục đạt, có bằng chứng; ba lớp rollback được phân biệt rõ; quy trình vận hành có người chịu trách nhiệm và thời điểm kiểm tra.
- `siteMode: demo`.
- `npm run kiem-tra-ban-giao`, `kiem-tra-static`, `kiem-tra-seo`, `kiem-tra-lien-he`, `lint`, `build` sạch.
