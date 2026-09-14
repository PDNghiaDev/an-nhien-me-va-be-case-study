import type { ElementType, ReactNode } from "react";

export function Container({children,className="",as:Tag="div"}:{children:ReactNode;className?:string;as?:ElementType}) {
  return <Tag className={`container ${className}`.trim()}>{children}</Tag>;
}
