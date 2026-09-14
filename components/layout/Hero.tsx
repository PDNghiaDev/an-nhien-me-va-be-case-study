import Image from "next/image";
import { CalendarRange, Hand, UserRoundCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { HeroTrustIcon, HomeContent } from "@/lib/types";

const trustIcons: Record<HeroTrustIcon, typeof Hand> = { practice: Hand, mentor: UserRoundCheck, roadmap: CalendarRange, community: Users };

export function Hero({data}:{data:HomeContent["hero"]}) {
  return <section className="homeHero" aria-labelledby="hero-title">
    <div className="homeHeroBackdrop" aria-hidden={data.background.alt === "" ? "true" : undefined}>
      <Image src={data.background.src} alt={data.background.alt} fill priority fetchPriority="high" sizes="100vw"/>
    </div>
    <div className="homeHeroForeground">
      <Image src={data.foreground.src} alt={data.foreground.alt} fill priority fetchPriority="high" sizes="(max-width: 767px) 92vw, 48vw"/>
    </div>
    <Container className="homeHeroContainer">
      <div className="homeHeroContent">
        <p className="homeHeroEyebrow">{data.eyebrow.value}</p>
        <h1 id="hero-title">{data.title.value}</h1>
        <p className="homeHeroLead">{data.description.value}</p>
        <div className="homeHeroActions">
          <Button href={data.primaryCta.href} showArrow={false}>{data.primaryCta.label}</Button>
          <Button href={data.secondaryCta.href} variant="secondary">{data.secondaryCta.label}</Button>
        </div>
        <ul className="homeHeroTrust">
          {data.trustPoints.map(point=>{
            const Icon=trustIcons[point.icon];
            return <li key={point.label}><span><Icon aria-hidden="true" size={19} strokeWidth={1.7}/></span>{point.label}</li>;
          })}
        </ul>
      </div>
    </Container>
  </section>;
}
