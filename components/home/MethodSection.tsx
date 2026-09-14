import Image from "next/image";
import { BadgeCheck, FlaskConical, Hand } from "lucide-react";
import type { HomeContent } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons = [Hand, FlaskConical, BadgeCheck];

export function MethodSection({ data }: { data: HomeContent["method"] }) {
  return <section className="methodSection">
    <div className="methodContent">
      <SectionHeading eyebrow={data.eyebrow} title={data.title} description={data.description}/>
      <div className="methodFeatures">{data.items.map((item,index)=>{const Icon=icons[index] ?? BadgeCheck; return <article key={item.title}>
        <span><Icon aria-hidden="true" size={24} strokeWidth={1.8}/></span>
        <div><h3>{item.title}</h3><p>{item.description}</p></div>
      </article>})}</div>
      <Button href="/gioi-thieu">Tìm hiểu phương pháp</Button>
    </div>
    <div className="methodMedia"><Image src={data.image.src} alt={data.image.alt} fill sizes="(max-width: 767px) 100vw, 54vw"/></div>
  </section>;
}
