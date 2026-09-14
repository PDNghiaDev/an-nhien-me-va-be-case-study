import { BookOpen, Blend, Store } from "lucide-react";
import type { HomeContent } from "@/lib/types";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons = [BookOpen, Blend, Store];

export function JourneySection({ data }: { data: HomeContent["path"] }) {
  return <section className="journeySection">
    <Container>
      <SectionHeading eyebrow={data.eyebrow} title={data.title} align="center"/>
      <div className="journeyGrid">{data.items.map((item,index)=>{const Icon=icons[index] ?? BookOpen; return <article key={item.title}>
        <div className="journeyIcon"><Icon aria-hidden="true" size={30} strokeWidth={1.7}/></div>
        <p className="journeyNumber">0{index+1}</p>
        <h3>{item.title}</h3><p>{item.description}</p>
      </article>})}</div>
    </Container>
  </section>;
}
