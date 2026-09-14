export type ContentStatus = "DEMO" | "CẦN THAY" | "ĐÃ XÁC MINH";
export type DirectContactContent = { title: string; description: string; label: string; href: string; status: ContentStatus };
export type SiteMode = "demo" | "production";
export type ContentValue = { value: string; status: ContentStatus };
export type LinkItem = { label: string; href: string };
export type NavItem = LinkItem & { children?: LinkItem[] };
export type Cta = LinkItem & { status: ContentStatus };
export type ImageData = { src: string; alt: string; status: ContentStatus };
export type LogoData = ImageData & { width: number; height: number };
export type FloatingActions = {
  zalo: { enabled: boolean; label: string; ariaLabel: string; href: string; badge: string; status: ContentStatus };
  backToTop: { enabled: boolean; label: string; showAfter: number };
};
export type SeoData = { title: string; description: string; path: string; ogImage: string; ogImageAlt: string };
export type ContactLink = { value: string; href: string };
export type TextCard = { title: string; description: string };
export type PageHero = {
  eyebrow: string;
  title: string;
  description: string;
  status: ContentStatus;
  image?: ImageData;
  variant?: "landscape" | "portrait" | "editorial" | "contact";
};
// Form demo: mọi ô nhập chỉ chạy validation phía client, không gửi dữ liệu ra ngoài.
export type DemoFieldContent = {
  label: string;
  placeholder: string;
  required: boolean;
  requiredError: string;
  invalidError: string;
};
export type NewsletterContent = {
  mode?: "demo" | "direct";
  directContact?: DirectContactContent;
  title: string;
  description: string;
  field: DemoFieldContent;
  buttonLabel: string;
  note: string;
  successMessage: string;
  status: ContentStatus;
};
export interface FooterContent {
  status: ContentStatus;
  tagline: string;
  columns: { title: string; links: LinkItem[] }[];
  contactTitle: string;
  newsletter: NewsletterContent;
}
export interface SiteContent {
  workspaceName: string;
  siteMode: SiteMode;
  currentStage: number;
  seo: SeoData & { siteUrl: string; defaultTitle: string; titleTemplate: string; defaultDescription: string; locale: string; isTemporaryUrl: boolean };
  brandName: ContentValue;
  tagline: ContentValue;
  demoBanner: ContentValue;
  logo: LogoData;
  navigation: NavItem[];
  footerLinks: LinkItem[];
  floatingActions: FloatingActions;
  catalog: { basePath: string; singular: string; plural: string };
  routes: { home: string; about: string; faculty: string; students: string; news: string; contact: string; legal: string };
  headerCta: Cta;
  contact: {
    phone: ContentValue;
    email: ContentValue;
    address: ContentValue;
    phoneLinks: ContactLink[];
    emailLink: ContactLink;
  };
  footer: FooterContent;
  notFound: {
    eyebrow: string;
    title: string;
    description: string;
    homeLabel: string;
    catalogLabel: string;
  };
  ui: {
    openMenu: string;
    closeMenu: string;
    primaryNavigation: string;
    footerNavigation: string;
    skipToContent: string;
    copyright: string;
    expandSubmenu: string;
    homeLinkLabel: string;
  };
}
export type HeroTrustIcon = "practice" | "mentor" | "roadmap" | "community";
export type BenefitIcon = "practice" | "recipe" | "tools" | "mentor" | "roadmap" | "community";
export interface HomeContent {
  seo: SeoData;
  hero: {
    eyebrow: ContentValue;
    title: ContentValue;
    description: ContentValue;
    primaryCta: Cta;
    secondaryCta: Cta;
    background: ImageData;
    foreground: ImageData;
    trustPoints: { icon: HeroTrustIcon; label: string }[];
  };
  benefits: {
    status: ContentStatus;
    items: { icon: BenefitIcon; title: string; description: string }[];
  };
  audiences: {
    eyebrow: string;
    title: string;
    description: string;
    status: ContentStatus;
    items: TextCard[];
  };
  programs: {
    eyebrow: string;
    title: string;
    description: string;
    status: ContentStatus;
  };
  method: {
    eyebrow: string;
    title: string;
    description: string;
    image: ImageData;
    items: TextCard[];
    status: ContentStatus;
  };
  path: {
    eyebrow: string;
    title: string;
    status: ContentStatus;
    items: TextCard[];
  };
  faq: {
    eyebrow: string;
    title: string;
    status: ContentStatus;
    items: { question: string; answer: string }[];
  };
  finalCta: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: Cta;
    secondaryCta: Cta;
    status: ContentStatus;
  };
}
export interface AboutContent {
  seo: SeoData;
  hero: PageHero;
  positioning: { title: string; description: string; status: ContentStatus };
  principles: {
    eyebrow: string;
    title: string;
    status: ContentStatus;
    items: TextCard[];
  };
  verification: { title: string; description: string; status: ContentStatus };
  image: ImageData;
}
export type FaqItem = { question: string; answer: string };
export interface ServiceItem {
  seo: SeoData;
  slug: string;
  name: ContentValue;
  description: ContentValue;
  image: ImageData;
  audience: string[];
  outcomes: TextCard[];
  learnings: TextCard[];
  process: TextCard[];
  faq: FaqItem[];
  verification: string[];
  schedule: ContentValue;
  price: ContentValue;
}
export interface ServicesContent {
  seo: SeoData;
  hero: PageHero;
  steps: {
    eyebrow: string;
    title: string;
    description: string;
    status: ContentStatus;
    items: TextCard[];
  };
  commitment: {
    eyebrow: string;
    title: string;
    description: string;
    status: ContentStatus;
    items: TextCard[];
  };
  comparison: {
    eyebrow: string;
    title: string;
    description: string;
    status: ContentStatus;
  };
  finalCta: {
    eyebrow: string;
    title: string;
    description: string;
    status: ContentStatus;
    primaryCta: Cta;
    secondaryCta: Cta;
  };
  detailUi: {
    audienceEyebrow: string;
    audienceTitle: string;
    outcomesEyebrow: string;
    outcomesTitle: string;
    contentEyebrow: string;
    contentTitle: string;
    processEyebrow: string;
    processTitle: string;
    faqEyebrow: string;
    faqTitle: string;
    verifyEyebrow: string;
    verifyTitle: string;
    contactLabel: string;
    catalogLabel: string;
    contactSecondaryLabel: string;
  };
  items: ServiceItem[];
}
export interface ProjectsContent {
  seo: SeoData;
  status: ContentStatus;
  items: string[];
  reason: string;
}
export type ConsultFormContent = {
  mode?: "demo" | "direct";
  directContact?: DirectContactContent;
  title: string;
  description: string;
  status: ContentStatus;
  name: DemoFieldContent;
  phone: DemoFieldContent;
  topic: DemoFieldContent & { options: string[] };
  message: DemoFieldContent;
  submitLabel: string;
  successMessage: string;
  errorSummary: string;
  demoNote: string;
};
export interface ContactContent {
  seo: SeoData;
  hero: PageHero;
  channels: {
    title: string;
    description: string;
    status: ContentStatus;
    items: { label: string; value: string; href: string; status: ContentStatus }[];
  };
  checklist: {
    eyebrow: string;
    title: string;
    status: ContentStatus;
    items: string[];
  };
  social: {
    eyebrow: string;
    title: string;
    description: string;
    status: ContentStatus;
    items: { label: string; description: string; href: string; status: ContentStatus }[];
  };
  form: ConsultFormContent;
  fallbackCta: Cta;
  submissionEnabled: boolean;
}
export interface LegalContent {
  seo: SeoData;
  hero: PageHero;
  sections: { title: string; paragraphs: string[]; status: ContentStatus }[];
  contact: { title: string; description: string; status: ContentStatus };
}
export interface HomeConversionContent {
  courses: {
    eyebrow: string;
    title: string;
    description: string;
    status: ContentStatus;
    items: {
      slug: string;
      badge: string;
      title: string;
      price: ContentValue;
      priceNote: string;
      description: string;
      highlights: string[];
      image: ImageData;
      cta: Cta;
    }[];
  };
  testimonialVideo: {
    eyebrow: string;
    title: string;
    description: string;
    status: ContentStatus;
    items: { youtubeId: string; title: string }[];
    quote: { text: string; name: string; context: string; status: ContentStatus; avatar: ImageData };
    ui: { playLabel: string; playerLabel: string; listLabel: string; activeLabel: string; consentNote: string };
  };
  community: {
    eyebrow: string;
    title: string;
    description: string;
    status: ContentStatus;
    ui: { galleryLabel: string; motionNote: string };
    items: ImageData[];
  };
  news: {
    eyebrow: string;
    title: string;
    description: string;
    status: ContentStatus;
    ui: { readMore: string; readMoreLabel: string; listLabel: string };
    cta: Cta;
    items: {
      slug: string;
      category: string;
      date: string;
      dateISO: string;
      title: string;
      href: string;
      image: ImageData;
    }[];
  };
  consult: {
    status: ContentStatus;
    background: ImageData;
    foreground: ImageData;
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: Cta;
    secondaryCta: Cta;
    form: ConsultFormContent;
  };
}
export type ProofIcon = "students" | "shops" | "recipes" | "years" | "satisfaction";
export interface ShowcaseContent {
  advantages:{eyebrow:string;title:string;description:string;items:TextCard[]};
  story:{eyebrow:string;label:string;title:string;description:string;status:ContentStatus;items:{year:string;title:string}[]};
  faculty:{eyebrow:string;title:string;description:string;items:{slug:string;name:string;role:string;bullets:string[];image:ImageData;seo:SeoData;bio:string;verification:string[]}[]};
  proof:{eyebrow:string;title:string;description:string;status:ContentStatus;items:{icon:ProofIcon;value:string;label:string}[]};
  testimonial:{eyebrow:string;title:string;quote:string;name:string;context:string;image:ImageData};
  community:{eyebrow:string;title:string;description:string;items:ImageData[]};
  news:{eyebrow:string;title:string;description:string;items:{category:string;date:string;title:string;image:ImageData}[]};
}
export interface NewsArticleSection { heading: string; paragraphs: string[]; }
export interface NewsArticle {
  slug: string;
  category: string;
  date: string;
  dateISO: string;
  title: string;
  excerpt: string;
  image: ImageData;
  readTime: string;
  author: string;
  featured: boolean;
  seo: SeoData;
  sections: NewsArticleSection[];
}
export interface NewsContent {
  seo: SeoData;
  hero: PageHero;
  categories: string[];
  ui: {
    searchLabel: string;
    searchPlaceholder: string;
    allCategoryLabel: string;
    emptyResult: string;
    readMore: string;
    readMoreLabel: string;
    relatedTitle: string;
    sidebarCategoriesTitle: string;
    sidebarFeaturedTitle: string;
    breadcrumbHome: string;
    breadcrumbNews: string;
  };
  newsletter: NewsletterContent;
  items: NewsArticle[];
}
