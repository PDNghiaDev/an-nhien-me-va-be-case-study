import type { Metadata } from "next";
import type { SeoData, SiteContent } from "@/lib/types";

export function buildMetadata(seo: SeoData, site: SiteContent): Metadata {
  const isDemo = site.siteMode === "demo";
  const robots = isDemo ? { index: false, follow: false } : { index: true, follow: true };
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: seo.path },
    robots,
    openGraph: {
      type: "website",
      locale: site.seo.locale,
      url: seo.path,
      siteName: site.brandName.value,
      title: seo.title,
      description: seo.description,
      images: [{ url: seo.ogImage, alt: seo.ogImageAlt }],
    },
  };
}

export function buildRootMetadata(site: SiteContent): Metadata {
  const isDemo = site.siteMode === "demo";
  const robots = isDemo ? { index: false, follow: false } : { index: true, follow: true };
  return {
    metadataBase: new URL(site.seo.siteUrl),
    title: { default: site.seo.defaultTitle, template: site.seo.titleTemplate },
    description: site.seo.defaultDescription,
    robots,
    openGraph: {
      type: "website",
      locale: site.seo.locale,
      siteName: site.brandName.value,
      images: [{ url: site.seo.ogImage, alt: site.seo.ogImageAlt }],
    },
  };
}
