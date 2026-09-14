import Image from "next/image";
import { ConsultForm } from "@/components/home/ConsultForm";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { HomeConversionContent } from "@/lib/types";

// Slice 3B — Final CTA + form tư vấn: nền ảnh + foreground ly nước, cột trái nội dung, cột phải form demo.
export function ConsultSection({ data }: { data: HomeConversionContent["consult"] }) {
  return <section className="consultSection" aria-labelledby="consultTitle">
    <div className="consultBackdrop" aria-hidden="true">
      <Image src={data.background.src} alt="" fill sizes="100vw" loading="lazy"/>
    </div>
    <Container className="consultContainer">
      <div className="consultIntro">
        <p className="consultEyebrow">{data.eyebrow}</p>
        <h2 id="consultTitle">{data.title}</h2>
        <p className="consultLead">{data.description}</p>
        <div className="consultActions">
          <Button href={data.primaryCta.href} showArrow={false}>{data.primaryCta.label}</Button>
          <Button href={data.secondaryCta.href} variant="secondary">{data.secondaryCta.label}</Button>
        </div>
        <div className="consultForeground">
          <Image src={data.foreground.src} alt={data.foreground.alt} fill sizes="(max-width: 767px) 90vw, 46vw" loading="lazy"/>
        </div>
      </div>
      <ConsultForm form={data.form}/>
    </Container>
  </section>;
}
