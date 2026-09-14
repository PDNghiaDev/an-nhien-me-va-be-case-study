import { Container } from "@/components/ui/Container";
import { NewsCard } from "@/components/ui/NewsCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { NewsArticle, NewsContent } from "@/lib/types";

export function RelatedArticles({ data, current }: { data: NewsContent; current: NewsArticle }) {
  const related = data.items.filter(item => item.category === current.category && item.slug !== current.slug).slice(0, 3);
  if (related.length === 0) return null;
  return <section className="relatedSection"><Container>
    <SectionHeading title={data.ui.relatedTitle}/>
    <ul className="homeNewsGrid newsResultsGrid">
      {related.map(item => <NewsCard
        key={item.slug}
        item={item}
        href={`/tin-tuc/${item.slug}`}
        sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
        readMore={data.ui.readMore}
        readMoreLabel={data.ui.readMoreLabel}
      />)}
    </ul>
  </Container></section>;
}
