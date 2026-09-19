import dictJson from '../assets/dict.json';

export type Locale = 'en' | 'ms' | 'zh';

export interface ServiceItem {
  title: string;
  desc: string;
}
export interface ProcessStep {
  title: string;
  desc: string;
  points?: string[];
}
export interface FaqItem {
  q: string;
  a: string;
}
export interface RichSegment {
  t: string;
  b?: boolean;
}
export interface SupportItem {
  title: string;
  desc: string;
}
export interface TestimonialItem {
  name: string;
  role: string;
  quote: string;
}
export interface Dict {
  meta: { title: string; description: string };
  nav: Record<string, string>;
  hero: { eyebrow: string; headline: string; sub: string; cta_primary: string; cta_secondary: string };
  trust: { heading: string; jtksm_label: string; jtksm_value: string; ssm_label: string; ssm_value: string; address_label: string };
  services_preview: { heading: string; sub: string; cta: string };
  services: { heading: string; sub: string; items: ServiceItem[] };
  process_preview: { heading: string; sub: string; cta: string; steps: ProcessStep[] };
  process: { heading: string; sub: string; steps: ProcessStep[]; note: string; cta: string };
  faq: { heading: string; sub: string; items: FaqItem[]; cta_text: string; cta: string };
  about: {
    heading: string;
    tagline: string;
    story: RichSegment[][];
    mid_heading: string;
    body: RichSegment[][];
    closing: RichSegment[];
    signoff: string;
    signoff_line: string;
    license_heading: string;
    license_view: string;
    license_alt: string;
    partners_heading: string;
    partners_sub: string;
    partners: { name: string }[];
    cta: string;
  };
  contact: { heading: string; sub: string; address_label: string; phone_label: string; email_label: string; hours_label: string; hours_value: string; map_heading: string };
  enquiry: { heading: string; sub: string; name: string; name_ph: string; topic: string; topic_ph: string; message: string; message_ph: string; send: string; preview: string };
  footer: { tagline: string; rights: string };
  whatsapp_message: string;
  ui: { filter_services: string; search_faq: string; no_results: string; showing: string; expand_all: string; collapse_all: string; back_to_top: string; clear: string };
  marquee: { heading: string; sub: string };
  support: { heading: string; sub: string; items: SupportItem[] };
  parallax: { quote: string; by: string };
  testimonials: { heading: string; sub: string; items: TestimonialItem[] };
}

export const DICT = dictJson as unknown as Record<Locale, Dict>;

export const LOCALES: Locale[] = ['en', 'ms', 'zh'];
export const LOCALE_NAMES: Record<Locale, string> = { en: 'English', ms: 'Bahasa Melayu', zh: '中文' };

export const WA_NUMBER = '60186868865';
export const WA = `https://wa.me/${WA_NUMBER}`;
export const PHONE_DISPLAY = '018-686 8865';
export const EMAIL = 'apveracare@gmail.com';
export const ADDRESS_LINES = [
  '441-2-4 Pulau Tikus Plaza,',
  'Jalan Burma, Pulau Tikus,',
  '10350 Georgetown, Pulau Pinang.',
];

export function waLink(message: string): string {
  return `${WA}?text=${encodeURIComponent(message)}`;
}
