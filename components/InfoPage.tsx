import Link from "next/link";
export function InfoPage({eyebrow,title,intro,children}:{eyebrow:string,title:string,intro:string,children:React.ReactNode}){return <><section className="page-hero"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{intro}</p></section><section className="section copy">{children}</section><section className="cta"><p className="eyebrow">Cần hỏi thêm?</p><h2>Trao đổi rõ trước khi chọn dịch vụ.</h2><Link className="button light" href="/lien-he">Xem kênh liên hệ demo</Link></section></>}

