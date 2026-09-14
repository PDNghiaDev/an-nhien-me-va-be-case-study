import { CircleHelp } from "lucide-react";
import { FaqList } from "@/components/ui/FaqList";
import type { HomeContent } from "@/lib/types";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FaqSection({ data }: { data: HomeContent["faq"] }) {
  return <section className="faqSection"><Container className="faqLayout">
    <div className="faqIntro"><span className="faqIcon"><CircleHelp aria-hidden="true" size={30}/></span><SectionHeading eyebrow={data.eyebrow} title={data.title}/><p>Những câu trả lời ngắn giúp bạn biết bước tiếp theo trước khi đăng ký.</p></div>
    <FaqList items={data.items}/>
  </Container></section>;
}
