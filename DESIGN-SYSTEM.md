# Quy chuẩn component Nguyên Khoa

- `app/design-system.css` sở hữu quy chuẩn giao diện; `globals.css` chỉ còn bố cục của các trang đang chạy. Không thêm biến thể UI bằng cách chồng tiếp CSS cuối globals.
- Chữ: Lora cho tiêu đề, Be Vietnam Pro cho nội dung và điều khiển. `--font-display` trỏ về Lora.
- H1 36–56px, H2 28–40px; tiêu đề tiện ích nhỏ hơn, không áp cỡ section cho sidebar.
- Thương hiệu: xanh #1d4a34, vàng #c9a24a, nền kem #faf6ee. Khóa online không có màu thương hiệu riêng.
- Dùng `Button` cho CTA: primary xanh, secondary viền xanh, cao tối thiểu 50px, icon 18px. Không gạch chân hay pseudo-element gạch chân.
- `FaqList` dùng chung cho trang chủ và hai landing page; giữ native details/summary và focus bàn phím.
- Card bo 16px, viền nhạt, một mức bóng nhẹ. Khung ảnh nội dung bo 16px; ảnh hero có thể dùng silhouette riêng theo bố cục đã duyệt.
- Icon dùng lucide; không dùng ký tự font làm icon trang trí.

## Component dùng chung

| Component | Class sở hữu | Dùng ở |
|---|---|---|
| `Button` | `.button`, `.buttonPrimary`, `.buttonSecondary` | mọi CTA của website |
| `SectionHeading` | `.sectionHeading`, `--band`, `--source`, `--dark`, `.sectionHeadingLead` | mọi cụm tiêu đề section: hero trang phụ (`page`), 4 dải trang chủ (`band`), toàn bộ section trang phụ (`source`) |
| `FaqList` | `.uiFaqList` | FAQ trang chủ và 2 landing khóa học |
| `NewsCard` | `.newsCard` | trang chủ, danh sách tin tức, bài liên quan |
| `StatBand` | `.sourceStats` | trang khóa học, trang học viên |
| `Card`, `Container`, `PageHero`, `StatusBadge` | `.card`, `.container`, `.pageHero`, `.statusBadge` | trang chính sách, phòng thử component |

## Trạng thái chuyển đổi

Toàn bộ CTA đã đi qua `Button`; các khai báo lịch sử `.ctaPill`, `.ctaGhost`, `.courseCta`, `.headerCta`, `.sourceHeroActions a`, `.sourceAboutActions a`, `.sourceProfileActions a`, `.courseLandingHeroActions a`, `.sourceProgramGrid article > a` đã bị gỡ khỏi `globals.css` và các selector tương thích tương ứng đã bị gỡ khỏi `design-system.css`. CSS trang chỉ còn quyền chỉnh vị trí/độ rộng nút.

Bốn cụm tiêu đề trùng nhau của trang chủ (`coursesHead`, `homeNewsHead`, `videoHead`, `communityHead`) gom về `SectionHeading variant="band"`. `.faqList` lịch sử đã gỡ vì `FaqList` dùng `.uiFaqList`. Ký tự trang trí `✦`, `✓`, `→` đã thay bằng icon lucide.

Toàn bộ cụm tiêu đề section của trang phụ (giới thiệu, khóa học, 2 landing khóa học, đội ngũ, 3 hồ sơ giảng viên, tin tức, liên hệ) đã chuyển sang `SectionHeading variant="source" as="header"`; các khối trên nền xanh dùng thêm `tone="dark"`. Sáu danh sách selector eyebrow theo vị trí phần tử đã được gỡ, thay bằng `.sectionHeading--source .eyebrow` với biến `--section-eyebrow` đặt theo họ trang. Hero **không** migrate — mỗi hero giữ bố cục riêng đã duyệt.

CSS của các trang thế hệ trước đã được gỡ sau khi đối chiếu toàn bộ `.tsx` (kể cả `dev/`): `globals.css` giảm từ 1583 xuống 1138 dòng. CSS của các component còn dùng lại được nhưng chưa route nào render (`AudienceStrip`, `MethodSection`, `JourneySection`, `FaqSection`, `FinalCta`, `ProgramCard`, `AdvantageSection`, `TestimonialSection`, `NewsSection`, `Card`, `ComponentLab`) được **giữ nguyên** có chủ đích. Chi tiết và phần chưa hoàn tất: `COMPONENT-MIGRATION-AUDIT.md`.
