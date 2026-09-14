import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { PageHero as PageHeroData } from "@/lib/types";
export function PageHero({data}:{data:PageHeroData}) {
  const variant=data.variant ?? "landscape";
  return <section className={`pageHeroShell${data.image ? " pageHeroShell--media" : ""}`}>
    <Container className={`pageHero${data.image ? ` pageHero--media pageHero--${variant}` : ""}`}>
      <SectionHeading eyebrow={data.eyebrow} title={data.title} description={data.description} level={1}/>
      {data.image ? <div className="pageHeroMedia"><Image src={data.image.src} alt={data.image.alt} fill priority sizes="(max-width: 767px) 100vw, 48vw"/></div> : <div className="pageHeroMark" aria-hidden="true"/>}
    </Container>
  </section>;
}
