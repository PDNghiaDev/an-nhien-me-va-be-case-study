import type { ContentValue, SiteMode } from "@/lib/types";
export function DemoBanner({mode,content}:{mode:SiteMode;content:ContentValue}) {
  if(mode!=="demo") return null;
  return <div className="demoBanner" role="status">{content.value}</div>;
}
