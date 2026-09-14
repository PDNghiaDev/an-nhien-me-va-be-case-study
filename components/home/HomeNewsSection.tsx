import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { NewsCard } from "@/components/ui/NewsCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { HomeConversionContent } from "@/lib/types";

// Slice 3B — "Tin tức": nền kem, heading center, 4 card ảnh + category/date/title + CTA xem tất cả.
export function HomeNewsSection({ data }: { data: HomeConversionContent["news"] }) {
  return <section className="homeNews" aria-labelledby="homeNewsTitle">
    <Container>
      <SectionHeading variant="band" align="center" titleId="homeNewsTitle" eyebrow={data.eyebrow} title={data.title} description={data.description}/>
      <ul className="homeNewsGrid" aria-label={data.ui.listLabel}>
        {data.items.map(item => <NewsCard
          key={item.slug}
          item={item}
          href={item.href}
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 25vw"
          readMore={data.ui.readMore}
          readMoreLabel={data.ui.readMoreLabel}
        />)}
      </ul>
      <p className="homeNewsAction">
        <Button href={data.cta.href} showArrow={false}>{data.cta.label}</Button>
      </p>
    </Container>
  </section>;
}
