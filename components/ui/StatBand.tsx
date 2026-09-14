import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";

// Dải số liệu nền xanh dùng chung cho trang khóa học và trang học viên.
// Biến thể có icon giữ nguyên cấu trúc <icon><strong/><small/> của trang khóa học.
export type StatItem = { value: string; label: string; icon?: LucideIcon };

export function StatBand({items,ariaLabel}:{items:StatItem[];ariaLabel?:string}) {
  return <section className="sourceStats" aria-label={ariaLabel}>
    <Container>
      {items.map(({value,label,icon:Icon})=><div key={label}>
        {Icon
          ? <><Icon aria-hidden="true" size={31}/><span><strong>{value}</strong><small>{label}</small></span></>
          : <><strong>{value}</strong><span>{label}</span></>}
      </div>)}
    </Container>
  </section>;
}
