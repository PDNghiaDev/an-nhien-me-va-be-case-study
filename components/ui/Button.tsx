import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";

type Props = {
  children: ReactNode;
  variant?: "primary" | "secondary";
  href?: string;
  /** Liên kết ra ngoài site: render <a> thường, mở tab mới. */
  external?: boolean;
  /** Icon đứng trước nhãn (lucide). Dùng cho CTA có ký hiệu dẫn nghĩa. */
  icon?: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  loadingLabel?: string;
  className?: string;
  showArrow?: boolean;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "disabled">;

export function Button({children,variant="primary",href,external=false,icon,disabled=false,loading=false,loadingLabel,className="",showArrow=true,onClick,...buttonProps}:Props) {
  const classes = `button button${variant === "primary" ? "Primary" : "Secondary"} ${className}`.trim();
  const label = <>{icon}{loading && loadingLabel ? loadingLabel : children}{showArrow && !loading ? <ArrowRight aria-hidden="true" size={18} strokeWidth={1.65} /> : null}</>;
  if (href && !disabled && !loading) {
    // onClick vẫn được giữ trên biến thể liên kết (ví dụ đóng menu mobile sau khi điều hướng).
    const linkHandler = onClick as unknown as MouseEventHandler<HTMLAnchorElement> | undefined;
    return external
      ? <a className={classes} href={href} target="_blank" rel="noreferrer" onClick={linkHandler}>{label}</a>
      : <Link className={classes} href={href} onClick={linkHandler}>{label}</Link>;
  }
  return <button className={classes} disabled={disabled || loading} aria-busy={loading} onClick={onClick} {...buttonProps}>{label}</button>;
}
