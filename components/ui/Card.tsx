import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Props = { title:string; label?:string; description?:string; href?:string; image?:{src:string;alt:string}; priority?:boolean };
export function Card({title,label,description,href,image,priority=false}:Props) {
  const body = <><div className="cardMedia">{image ? <Image src={image.src} alt={image.alt} fill sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw" priority={priority}/> : <span className="cardPlaceholder" aria-hidden="true"/>}</div>
    <div className="cardBody">{label && <p className="cardLabel">{label}</p>}<h3>{title}</h3>{description && <p className="cardDescription">{description}</p>}{href && <span className="cardAction">Xem chi tiết <ArrowRight aria-hidden="true" size={18} strokeWidth={1.65}/></span>}</div></>;
  return href ? <Link className="card" href={href}>{body}</Link> : <article className="card">{body}</article>;
}
