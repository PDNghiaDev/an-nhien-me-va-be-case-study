import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { HomeConversionContent, ImageData } from "@/lib/types";

// Slice 3A — gallery cộng đồng: 2 dải ảnh chạy ngược chiều.
// Chuyển động thuần CSS: tạm dừng khi hover/focus, và về grid tĩnh khi prefers-reduced-motion.
function Row({ items, reverse, label }: { items: ImageData[]; reverse: boolean; label: string }) {
  return <div className={reverse ? "communityRow communityRow--reverse" : "communityRow"}>
    <ul className="communityTrack" aria-label={label}>
      {items.map(item => <li key={item.src}>
        <Image src={item.src} alt={item.alt} fill sizes="(max-width: 767px) 62vw, 320px"/>
      </li>)}
      {items.map(item => <li key={`${item.src}-loop`} aria-hidden="true" className="communityTrackClone">
        <Image src={item.src} alt="" fill sizes="(max-width: 767px) 62vw, 320px"/>
      </li>)}
    </ul>
  </div>;
}

export function CommunityGallery({ data }: { data: HomeConversionContent["community"] }) {
  const half = Math.ceil(data.items.length / 2);
  const rows = [data.items.slice(0, half), data.items.slice(half)];
  return <section className="communityGallery" aria-labelledby="communityGalleryTitle">
    <Container>
      <SectionHeading variant="band" align="center" titleId="communityGalleryTitle" eyebrow={data.eyebrow} title={data.title} description={data.description}/>
    </Container>
    <div className="communityMarquee" role="group" aria-label={data.ui.galleryLabel} tabIndex={0}>
      {rows.map((items, index) => <Row key={index} items={items} reverse={index === 1} label={`${data.ui.galleryLabel} — dải ${index + 1}`}/>)}
    </div>
    <Container><p className="communityMotionNote">{data.ui.motionNote}</p></Container>
  </section>;
}
