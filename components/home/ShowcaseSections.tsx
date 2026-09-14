import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BookOpen, CalendarClock, Coffee, GraduationCap, Handshake, Medal, Smile, Store, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { CountUpValue } from "@/components/home/CountUpValue";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ProofIcon, ShowcaseContent } from "@/lib/types";

const advantageIcons=[Coffee,BookOpen,Store,Handshake,GraduationCap,Medal];

export function AdvantageSection({data}:{data:ShowcaseContent["advantages"]}){
  return <section className="sourceAdvantages"><Container><SectionHeading eyebrow={data.eyebrow} title={data.title} description={data.description}/><div className="sourceAdvantageGrid">{data.items.map((item,index)=>{const Icon=advantageIcons[index%advantageIcons.length];return <article key={item.title}><span><Icon aria-hidden="true" size={26}/></span><p>{String(index+1).padStart(2,"0")}</p><h3>{item.title}</h3><div>{item.description}</div></article>})}</div></Container></section>
}

export function StorySection({data}:{data:ShowcaseContent["story"]}){
  return <section className="storyBand" aria-labelledby="storyTitle"><Container>
    <div className="storyHead">
      <h2 id="storyTitle">{data.eyebrow}</h2>
      <p className="storyPill">{data.label}</p>
      <p className="srOnly">{data.title}. {data.description}. Trạng thái: {data.status}.</p>
    </div>
    <ol className="storyTimeline">{data.items.map(item=><li key={item.year} className="storyItem">
      <div className="storyCard"><p className="storyYear">{item.year}</p><p className="storyLabel">{item.title}</p></div>
      <span className="storyDot" aria-hidden="true"/>
    </li>)}</ol>
  </Container></section>
}

export function FacultySection({data,prioritizeFirst=false}:{data:ShowcaseContent["faculty"];prioritizeFirst?:boolean}){
  return <section className="facultyBand" aria-labelledby="facultyTitle"><Container>
    <div className="facultyHead">
      <h2 id="facultyTitle">{data.eyebrow}</h2>
      <p className="srOnly">{data.title}. {data.description}</p>
    </div>
    <div className="facultyGrid">{data.items.map((item,index)=><article key={item.slug} id={item.slug} className="facultyCardShell">
      <Link href={`/doi-ngu/${item.slug}`} className="facultyCard">
        <div className="facultyAvatar"><Image src={item.image.src} alt={item.image.alt} fill sizes="96px" loading={prioritizeFirst&&index===0?"eager":"lazy"}/></div>
        <div className="facultyBody">
          <h3>{item.name}</h3>
          <p className="facultyRole">{item.role}</p>
          <ul className="facultyBullets">{item.bullets.map(bullet=><li key={bullet}>{bullet}</li>)}</ul>
        </div>
      </Link>
    </article>)}</div>
  </Container></section>
}

const proofIcons:Record<ProofIcon,LucideIcon>={students:Users,shops:Store,recipes:BookOpen,years:CalendarClock,satisfaction:Smile};

export function ProofSection({data}:{data:ShowcaseContent["proof"]}){
  return <section className="proofSection" aria-labelledby="proofTitle"><Container>
    <div className="proofPanel">
      <h2 id="proofTitle" className="srOnly">{data.title}</h2>
      <ul className="proofGrid">{data.items.map(item=>{const Icon=proofIcons[item.icon];return <li key={item.label}>
        <span className="proofIcon"><Icon aria-hidden="true" size={30} strokeWidth={1.5}/></span>
        <strong className="proofValue"><CountUpValue value={item.value}/></strong>
        <span className="proofLabel">{item.label}</span>
      </li>})}</ul>
      <p className="srOnly">{data.eyebrow} · {data.status} — {data.description}</p>
    </div>
  </Container></section>
}

export function TestimonialSection({data}:{data:ShowcaseContent["testimonial"]}){
  return <section className="sourceTestimonial"><Container className="sourceTestimonialLayout"><div className="sourceTestimonialImage"><Image src={data.image.src} alt={data.image.alt} fill sizes="(max-width: 767px) 100vw, 42vw"/></div><div><p className="eyebrow">{data.eyebrow}</p><h2>{data.title}</h2><blockquote>“{data.quote}”</blockquote><strong>{data.name}</strong><p>{data.context}</p></div></Container></section>
}

export function CommunitySection({data}:{data:ShowcaseContent["community"]}){
  return <section className="sourceCommunity"><Container><SectionHeading eyebrow={data.eyebrow} title={data.title} description={data.description}/><div className="sourceCommunityGrid">{data.items.map((item,index)=><div key={item.src} className={index===1?"isTall":""}><Image src={item.src} alt={item.alt} fill sizes="(max-width: 767px) 100vw, 33vw"/></div>)}</div></Container></section>
}

export function NewsSection({data}:{data:ShowcaseContent["news"]}){
  return <section className="sourceNews"><Container><SectionHeading eyebrow={data.eyebrow} title={data.title} description={data.description}/><div className="sourceNewsGrid">{data.items.map(item=><article key={item.title}><div className="sourceNewsImage"><Image src={item.image.src} alt={item.image.alt} fill sizes="(max-width: 767px) 100vw, 25vw"/></div><p>{item.category} · {item.date}</p><h3>{item.title}</h3><span>Xem cấu trúc bài viết <ArrowUpRight aria-hidden="true" size={17}/></span></article>)}</div></Container></section>
}
