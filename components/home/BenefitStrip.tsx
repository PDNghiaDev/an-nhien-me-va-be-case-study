import { CalendarRange, Hand, NotebookPen, UserRoundCheck, Users, Wrench } from "lucide-react";
import { Container } from "@/components/ui/Container";
import type { BenefitIcon, HomeContent } from "@/lib/types";

const benefitIcons: Record<BenefitIcon, typeof Hand> = {
  practice: Hand,
  recipe: NotebookPen,
  tools: Wrench,
  mentor: UserRoundCheck,
  roadmap: CalendarRange,
  community: Users,
};

export function BenefitStrip({data}:{data:HomeContent["benefits"]}) {
  return <section className="benefitStrip">
    <Container>
      <ul className="benefitPanel">
        {data.items.map(item=>{
          const Icon=benefitIcons[item.icon];
          return <li key={item.title}>
            <span className="benefitIcon"><Icon aria-hidden="true" size={24} strokeWidth={1.5}/></span>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </li>;
        })}
      </ul>
    </Container>
  </section>;
}
