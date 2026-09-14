import Link from "next/link";
import type { NewsArticle, NewsContent } from "@/lib/types";

export function NewsSidebar({ data, current }: { data: NewsContent; current: NewsArticle }) {
  const featured = data.items.filter(item => item.featured && item.slug !== current.slug).slice(0, 4);
  return <aside className="articleSidebar">
    <div className="articleSidebarBlock">
      <h2>{data.ui.sidebarCategoriesTitle}</h2>
      <ul className="articleCategoryList">
        {data.categories.map(category => <li key={category}><Link href="/tin-tuc">{category}</Link></li>)}
      </ul>
    </div>
    {featured.length > 0 && <div className="articleSidebarBlock">
      <h2>{data.ui.sidebarFeaturedTitle}</h2>
      <ul className="articleFeaturedList">
        {featured.map(item => <li key={item.slug}><Link href={`/tin-tuc/${item.slug}`}>{item.title}</Link></li>)}
      </ul>
    </div>}
  </aside>;
}
