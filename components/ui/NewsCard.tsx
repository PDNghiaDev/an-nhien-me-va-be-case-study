import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ImageData } from "@/lib/types";

// Thẻ bài viết dùng chung cho trang chủ, danh sách tin tức và khối bài liên quan.
export type NewsCardItem = {
  category: string;
  date: string;
  dateISO: string;
  title: string;
  image: ImageData;
};

export function NewsCard({item,href,sizes,readMore,readMoreLabel}:{
  item: NewsCardItem;
  href: string;
  sizes: string;
  readMore: string;
  readMoreLabel: string;
}) {
  return <li className="newsCard">
    <article>
      <div className="newsCardMedia">
        <Image src={item.image.src} alt={item.image.alt} fill sizes={sizes} loading="lazy"/>
      </div>
      <p className="newsCardMeta">
        <span className="newsCardCategory">{item.category}</span>
        <time dateTime={item.dateISO}>{item.date}</time>
      </p>
      <h3 className="newsCardTitle"><Link href={href}>{item.title}</Link></h3>
      <Link className="newsCardMore" href={href} aria-label={`${readMoreLabel}: ${item.title}`}>
        {readMore}<ArrowRight aria-hidden="true" size={16}/>
      </Link>
    </article>
  </li>;
}
