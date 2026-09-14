import { CalendarDays, ClipboardCheck, Lightbulb } from "lucide-react";
import type { HomeContent } from "@/lib/types";

const icons = [Lightbulb, ClipboardCheck, CalendarDays];

export function AudienceStrip({ data }: { data: HomeContent["audiences"] }) {
  return <section className="audienceSection" aria-labelledby="audience-title">
    <div className="audienceIntro">
      <p className="eyebrow">{data.eyebrow}</p>
      <h2 id="audience-title">{data.title}</h2>
      <p>{data.description}</p>
    </div>
    <div className="audienceGrid">{data.items.map((item,index)=>{const Icon=icons[index] ?? Lightbulb; return <article key={item.title}>
      <span className="audienceIndex">0{index+1}</span>
      <span className="audienceIcon"><Icon aria-hidden="true" size={31} strokeWidth={1.65}/></span>
      <div><h3>{item.title}</h3><p>{item.description}</p></div>
    </article>})}</div>
  </section>;
}
