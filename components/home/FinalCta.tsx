import { Coffee } from "lucide-react";
import type { HomeContent } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function FinalCta({ data }: { data: HomeContent["finalCta"] }) {
  return <Container className="finalCtaWrap"><section className="finalCta">
    <span className="finalCtaIcon"><Coffee aria-hidden="true" size={36} strokeWidth={1.7}/></span>
    <div><p className="eyebrow">{data.eyebrow}</p><h2>{data.title}</h2><p>{data.description}</p></div>
    <div className="finalCtaActions"><Button href={data.primaryCta.href}>{data.primaryCta.label}</Button><Button href={data.secondaryCta.href} variant="secondary">{data.secondaryCta.label}</Button></div>
  </section></Container>;
}
