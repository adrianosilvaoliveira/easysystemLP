export type CtaVariant = "brand" | "outline" | "ghost-dark" | "text";

export interface Cta {
  label: string;
  href: string;
  variant: CtaVariant;
  external?: boolean;
}

export interface NavItem {
  href: string;
  label: string;
}

export interface SiteConfig {
  name: string;
  product: string;
  company: string;
  tagline: string;
  description: string;
  url: string;
  locale: string;
  demoUrl: string;
  whatsappUrl: string;
  whatsappDisplay: string;
  email: string;
  websiteUrl: string;
  websiteDisplay: string;
  instagramUrl: string;
  instagramHandle: string;
  startingPrice: string;
}

export interface PainPoint {
  id: string;
  number: string;
  title: string;
  body: string;
}

export interface CompareItem {
  label: string;
}

export interface Benefit {
  id: string;
  number: string;
  title: string;
  body: string;
}

export interface CapabilityGroup {
  title: string;
  subtitle: string;
  items: string[];
}

export interface Step {
  id: string;
  number: string;
  title: string;
  body: string;
  visual: "fields" | "sale" | "chart" | "modules";
}

export interface Metric {
  value: number;
  suffix?: string;
  body: string;
}

export type PlanId = "basico" | "intermediario" | "avancado" | "premium";

export interface Plan {
  id: PlanId;
  name: string;
  price: string;
  cents: string;
  period: string;
  description: string;
  featured?: boolean;
  badge?: string;
  features: string[];
  cta: Cta;
}

export interface PlanFeatureRow {
  label: string;
  included: [boolean, boolean, boolean, boolean];
}

export interface Addon {
  name: string;
  price: string;
  license: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface StoryBeat {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  caption: string;
  annotations: string[];
  visual: "finance" | "pdv" | "delivery";
}

export interface HeroContent {
  pills: string[];
  headline: string;
  headlineAccent: string;
  lede: string;
  primaryCta: Cta;
  secondaryCta: Cta;
  microcopy: string;
  trust: string[];
}
