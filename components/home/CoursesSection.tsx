import Image from "next/image";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { HomeConversionContent } from "@/lib/types";

// Slice 3A — "Khóa học nổi bật": nền kem, heading center, 2 thẻ có ảnh/giá/CTA.
export function CoursesSection({ data }: { data: HomeConversionContent["courses"] }) {
  return <section className="coursesSection" aria-labelledby="coursesTitle">
    <Container>
      <SectionHeading variant="band" align="center" titleId="coursesTitle" eyebrow={data.eyebrow} title={data.title} description={data.description}/>
      <ul className="coursesGrid">
        {data.items.map((item) => <li key={item.slug} className="courseCard">
          <div className="courseMedia">
            <Image src={item.image.src} alt={item.image.alt} fill sizes="(max-width: 767px) 100vw, 50vw" loading="lazy"/>
            <span className="courseBadge">{item.badge}</span>
          </div>
          <div className="courseBody">
            <h3>{item.title}</h3>
            <p className="coursePrice">
              <strong>{item.price.value}</strong>
              <span>{item.priceNote}</span>
            </p>
            <p className="courseDescription">{item.description}</p>
            <ul className="courseHighlights">
              {item.highlights.map(highlight => <li key={highlight}>
                <Check aria-hidden="true" size={15} strokeWidth={2.4}/>{highlight}
              </li>)}
            </ul>
            <Button className="courseCardCta" href={item.cta.href}>{item.cta.label}</Button>
          </div>
        </li>)}
      </ul>
    </Container>
  </section>;
}
