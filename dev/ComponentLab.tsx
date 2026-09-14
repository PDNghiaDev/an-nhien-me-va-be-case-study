import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Phòng thử component chỉ dùng trong quá trình học/phát triển.
 * Nếu cần xem trên trình duyệt, tạm import component này vào một route local rồi xóa route trước RC.
 */
export function ComponentLab() {
  return <Container className="componentLab">
    <SectionHeading eyebrow="DEMO · UI SYSTEM" title="Phòng thử component" description="Kiểm tra biến thể, trạng thái và dữ liệu không hoàn hảo trước khi ráp trang thật."/>
    <section className="labSection"><h2>Button</h2><div className="labRow">
      <Button>Primary</Button><Button variant="secondary">Secondary</Button><Button disabled>Disabled</Button><Button loading loadingLabel="Đang xử lý">Loading</Button>
    </div></section>
    <section className="labSection"><SectionHeading eyebrow="DEMO" title="Section Heading" description="Eyebrow, tiêu đề và mô tả đều có thể dùng độc lập."/></section>
    <section className="labSection"><h2>Card</h2><div className="cardGrid">
      <Card label="DEMO" title="Học pha chế trực tiếp" description="Card đủ dữ liệu và hình ảnh tỷ lệ ổn định." image={{src:"/images/khoa-hoc/hoc-truc-tiep-demo.webp",alt:"Hai người thực hành pha chế"}} priority/>
      <Card label="DEMO" title="Một tiêu đề dài ba dòng để kiểm tra chiều cao đồng đều giữa các thẻ" description="Mô tả ngắn được phép co giãn theo dữ liệu." image={{src:"/images/khoa-hoc/hoc-online-demo.webp",alt:"Thực hành pha chế theo hướng dẫn online"}}/>
      <Card title="Card không có ảnh và không có nhãn" description="Khung thay thế giữ nguyên tỷ lệ, không hiển thị ảnh vỡ."/>
      <Card label="DEMO" title="Card không có mô tả"/>
    </div></section>
    <section className="labSection"><h2>Layout components</h2><p>DemoBanner, Header, Hero và Footer được kiểm tra tại các trang thật để tránh tạo route nội bộ trong bản public.</p></section>
    <section className="labSection"><h2>Token đang dùng</h2><div className="tokenGrid"><span>Primary</span><span>Accent</span><span>Background</span><span>Surface</span><span>Spacing 8–96</span><span>Radius 12/20</span></div></section>
  </Container>;
}
