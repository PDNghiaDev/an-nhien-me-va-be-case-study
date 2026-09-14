"use client";

import { useId, useMemo, useState } from "react";
import { NewsCard } from "@/components/ui/NewsCard";
import type { NewsContent } from "@/lib/types";

// Bản demo: lọc theo từ khóa và chuyên mục chỉ chạy trên trình duyệt, không có API.
export function NewsExplorer({ data }: { data: NewsContent }) {
  const fieldId = useId();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  const items = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return data.items.filter(item => {
      const matchesCategory = !category || item.category === category;
      const matchesQuery = !needle || `${item.title} ${item.excerpt}`.toLowerCase().includes(needle);
      return matchesCategory && matchesQuery;
    });
  }, [data.items, query, category]);

  return <div>
    <div className="newsFilterBar">
      <div className="newsSearchField">
        <label htmlFor={`${fieldId}-search`}>{data.ui.searchLabel}</label>
        <input
          id={`${fieldId}-search`}
          type="search"
          placeholder={data.ui.searchPlaceholder}
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
      </div>
      <ul className="newsCategoryList">
        <li>
          <button type="button" className="newsCategoryButton" aria-pressed={category === null} onClick={() => setCategory(null)}>
            {data.ui.allCategoryLabel}
          </button>
        </li>
        {data.categories.map(item => <li key={item}>
          <button type="button" className="newsCategoryButton" aria-pressed={category === item} onClick={() => setCategory(item)}>
            {item}
          </button>
        </li>)}
      </ul>
    </div>

    {items.length === 0
      ? <p className="newsEmptyState">{data.ui.emptyResult}</p>
      : <ul className="homeNewsGrid newsResultsGrid" aria-label={data.ui.sidebarFeaturedTitle}>
          {items.map(item => <NewsCard
            key={item.slug}
            item={item}
            href={`/tin-tuc/${item.slug}`}
            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 25vw"
            readMore={data.ui.readMore}
            readMoreLabel={data.ui.readMoreLabel}
          />)}
        </ul>}
  </div>;
}
