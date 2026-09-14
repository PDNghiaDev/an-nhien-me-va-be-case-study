import type { ReactNode } from "react";

type Props = {
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  level?: 1 | 2;
  /**
   * "page"   = tiêu đề editorial (hero trang phụ, bài liên quan).
   * "band"   = cụm tiêu đề dải trang chủ (eyebrow nhỏ + h2 Lora + ghi chú).
   * "source" = cụm tiêu đề section của các trang dựng lại từ bản gốc.
   */
  variant?: "page" | "band" | "source";
  /** "dark" = đặt trên nền xanh đậm; chỉnh màu tiêu đề và mô tả cho đủ tương phản. */
  tone?: "light" | "dark";
  /** Thẻ bao. Dùng "header" khi cụm tiêu đề mở đầu một section. */
  as?: "div" | "header";
  /** id của thẻ tiêu đề, dùng cho aria-labelledby của section. */
  titleId?: string;
  className?: string;
  /** Phần phụ đi kèm tiêu đề (ví dụ badge), render sau mô tả. */
  children?: ReactNode;
};

export function SectionHeading({eyebrow,title,description,align="left",level=2,variant="page",tone="light",as:Tag="div",titleId,className="",children}:Props) {
  if (!eyebrow && !title && !description && !children) return null;
  const HeadingTag=level===1?"h1":"h2";
  const classes=[
    "sectionHeading",
    `sectionHeading--${align}`,
    variant==="page" ? "" : `sectionHeading--${variant}`,
    tone==="dark" ? "sectionHeading--dark" : "",
    className,
  ].filter(Boolean).join(" ");
  return <Tag className={classes}>
    {eyebrow && <p className="eyebrow">{eyebrow}</p>}
    {title && <HeadingTag id={titleId}>{title}</HeadingTag>}
    {description && <p className="sectionHeadingLead">{description}</p>}
    {children}
  </Tag>;
}
