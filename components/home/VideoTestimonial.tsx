"use client";

// Slice 3A — "Học viên nói gì về chúng tôi".
// Iframe YouTube chỉ được tạo sau khi người dùng bấm phát (privacy + LCP).
import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { HomeConversionContent } from "@/lib/types";

const posterUrl = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
const embedUrl = (id: string) => `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;

function PosterImage({id,sizes}:{id:string;sizes:string}) {
  const [failed,setFailed]=useState(false);
  if(failed) return <span className="videoPosterFallback" aria-hidden="true"><Play size={26}/></span>;
  return <Image src={posterUrl(id)} alt="" aria-hidden="true" fill sizes={sizes} unoptimized onError={()=>setFailed(true)}/>;
}

export function VideoTestimonial({ data }: { data: HomeConversionContent["testimonialVideo"] }) {
  const [activeId, setActiveId] = useState(data.items[0]?.youtubeId ?? "");
  const [playing, setPlaying] = useState(false);
  const active = data.items.find(item => item.youtubeId === activeId) ?? data.items[0];
  if (!active) return null;

  const select = (id: string) => {
    setActiveId(id);
    setPlaying(false);
  };

  return <section className="videoTestimonial" aria-labelledby="videoTestimonialTitle">
    <Container>
      <SectionHeading variant="band" align="center" titleId="videoTestimonialTitle" eyebrow={data.eyebrow} title={data.title} description={data.description}/>

      {/* Desktop 60/40: cột video bên trái, quote bên phải; mobile về 1 cột. */}
      <div className="videoLayout">
        <div className="videoMain">
          <div className="videoStage">
            {playing
              ? <iframe
                  className="videoFrame"
                  src={embedUrl(active.youtubeId)}
                  title={`${data.ui.playerLabel}: ${active.title}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              : <button type="button" className="videoPoster" onClick={() => setPlaying(true)}>
                  <PosterImage key={active.youtubeId} id={active.youtubeId} sizes="(max-width: 767px) 100vw, 55vw"/>
                  <span className="videoPlayIcon" aria-hidden="true"><Play size={26} strokeWidth={2.2}/></span>
                  <span className="srOnly">{data.ui.playLabel}: {active.title}</span>
                  <span className="videoPosterTitle">{active.title}</span>
                </button>}
          </div>
          <p className="videoConsent">{data.ui.consentNote}</p>
        </div>

        <figure className="videoQuote">
          <div className="videoQuoteAvatar">
            <Image src={data.quote.avatar.src} alt={data.quote.avatar.alt} fill sizes="88px"/>
          </div>
          <div>
            <blockquote>“{data.quote.text}”</blockquote>
            <figcaption><strong>{data.quote.name}</strong><span>{data.quote.context}</span></figcaption>
          </div>
        </figure>
      </div>

      <ul className="videoThumbs" aria-label={data.ui.listLabel}>
        {data.items.map(item => {
          const isActive = item.youtubeId === activeId;
          return <li key={item.youtubeId}>
            <button
              type="button"
              className={isActive ? "videoThumb videoThumb--active" : "videoThumb"}
              aria-pressed={isActive}
              onClick={() => select(item.youtubeId)}
            >
              <span className="videoThumbMedia">
                <PosterImage id={item.youtubeId} sizes="180px"/>
              </span>
              <span className="videoThumbLabel">{item.title}</span>
              {isActive && <span className="srOnly">— {data.ui.activeLabel}</span>}
            </button>
          </li>;
        })}
      </ul>
    </Container>
  </section>;
}
