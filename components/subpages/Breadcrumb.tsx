import Link from "next/link";

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return <ol className="breadcrumb">
    {items.map((item, index) => <li key={item.label} aria-current={item.href ? undefined : "page"}>
      {item.href ? <Link href={item.href}>{item.label}</Link> : item.label}
      {index < items.length - 1 && <span aria-hidden="true"> / </span>}
    </li>)}
  </ol>;
}
