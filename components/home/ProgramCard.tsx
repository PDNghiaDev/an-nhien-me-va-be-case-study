import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Blend, BookOpen, Gauge, Leaf } from "lucide-react";
import type { ServiceItem } from "@/lib/types";

const icons = [Blend, Gauge, Leaf, BookOpen];

export function ProgramCard({ item, priority=false }: { item: ServiceItem; priority?: boolean }) {
  return <article className="programCard">
    <div className="programMedia">
      <Image src={item.image.src} alt={item.image.alt} fill priority={priority} sizes="(max-width: 767px) 100vw, 50vw"/>
    </div>
    <div className="programBody">
      <p className="programKicker">{item.name.status}</p>
      <h3>{item.name.value}</h3>
      <p className="programDescription">{item.description.value}</p>
      <div className="programFeatures">{item.learnings.map((feature,index)=>{const Icon=icons[index] ?? BookOpen; return <div key={feature.title}>
        <Icon aria-hidden="true" size={21} strokeWidth={1.8}/><span>{feature.title}</span>
      </div>})}</div>
      <Link className="programLink" href={`/khoa-hoc/${item.slug}`}>Xem chi tiết khóa học <ArrowRight aria-hidden="true" size={18}/></Link>
    </div>
  </article>;
}
