import type { Lang } from "./i18n";

export type Bi = { ar: string; en: string };

/** Canonical site origin for SEO */
export const SITE_URL = "https://withmolkapodcast.com";

/** Real email when available; null shows "Add here" */
export const CONTACT_EMAIL: string | null = null;
export const CONTACT_PHONE = "+971586011059";
export const CONTACT_PHONE_TEL = "tel:+971586011059";

export const LINKEDIN_URL =
  "https://www.linkedin.com/company/ceos-with-molka-ceos-%D9%85%D8%B9-%D9%85%D9%84%D9%83%D8%A9/home/";

export type SocialKey = "linkedin" | "instagram" | "x" | "youtube" | "tiktok";

export type SocialLink = {
  key: SocialKey;
  label: string;
  /** Real URL, or null when not yet published ("Add here") */
  href: string | null;
};

export const socials: SocialLink[] = [
  { key: "linkedin", label: "LinkedIn", href: LINKEDIN_URL },
  { key: "instagram", label: "Instagram", href: null },
  { key: "x", label: "X (Twitter)", href: null },
  { key: "youtube", label: "YouTube", href: null },
  { key: "tiktok", label: "TikTok", href: null },
];

export type PlatformKey = "youtube" | "spotify" | "apple" | "anghami";

export type Platform = {
  key: PlatformKey;
  label: string;
  /** Real listen URL, or null when not yet published ("Add here") */
  href: string | null;
};

export const platforms: Platform[] = [
  { key: "youtube", label: "YouTube", href: null },
  { key: "spotify", label: "Spotify", href: null },
  { key: "apple", label: "Apple Podcasts", href: null },
  { key: "anghami", label: "Anghami", href: null },
];

/** Primary listen CTA — episodes library until platform URLs are live */
export const LISTEN_PATH = "/episodes";

export const PLACEHOLDER_LINK = "Add here";

export type ThemeKey = "leadership" | "healthcare" | "career" | "women";

export const themes: { key: ThemeKey; label: Bi; blurb: Bi }[] = [
  {
    key: "leadership",
    label: { ar: "القيادة", en: "Leadership" },
    blurb: {
      ar: "كيف يفكّر الرؤساء التنفيذيون، وكيف تُتخذ القرارات الصعبة.",
      en: "How CEOs think, and how the hard calls actually get made.",
    },
  },
  {
    key: "healthcare",
    label: { ar: "الصحة والأدوية", en: "Healthcare & Pharma" },
    blurb: {
      ar: "من توطين الأنسولين في الخليج إلى العلامة التجارية وولاء المرضى.",
      en: "From insulin localization in the Gulf to branding and patient loyalty.",
    },
  },
  {
    key: "career",
    label: { ar: "المسار المهني", en: "Career & Layoffs" },
    blurb: {
      ar: "النمو المهني، الصمود بعد التسريح، وقرارات المسار الكبرى.",
      en: "Career growth, resilience after layoffs, and the big pivots.",
    },
  },
  {
    key: "women",
    label: { ar: "المرأة في القيادة", en: "Women in Leadership" },
    blurb: {
      ar: "أصوات نسائية تقود التغيير في قطاعات الخليج.",
      en: "Women leading change across GCC industries.",
    },
  },
];

export type Episode = {
  no: number;
  guest: Bi;
  role: Bi;
  topic: Bi;
  quote: Bi;
  theme: ThemeKey;
};

export const episodes: Episode[] = [
  {
    no: 1,
    guest: { ar: "رباب خضري", en: "Rabab Khodary" },
    role: { ar: "قيادية في قطاع الرعاية الصحية", en: "Healthcare sector leader" },
    topic: { ar: "المرأة والقيادة في الخليج", en: "Women and leadership in the GCC" },
    quote: {
      ar: "المقعد على الطاولة لا يُمنح، بل يُبنى.",
      en: "A seat at the table isn't given. It's built.",
    },
    theme: "women",
  },
  {
    no: 2,
    guest: { ar: "د. إسلام شلبي", en: "Dr. Eslam Shalaby" },
    role: { ar: "قيادي في قطاع الأدوية", en: "Pharmaceutical industry leader" },
    topic: { ar: "توطين صناعة الأنسولين في الخليج", en: "Insulin localization in the Gulf" },
    quote: {
      ar: "التصنيع المحلي قرار سيادي قبل أن يكون قراراً تجارياً.",
      en: "Local manufacturing is a sovereign decision before it is a commercial one.",
    },
    theme: "healthcare",
  },
  {
    no: 3,
    guest: { ar: "باسل بكار", en: "Bassel Bakkar" },
    role: { ar: "قيادي تنفيذي", en: "Executive leader" },
    topic: { ar: "بناء العلامة وولاء المرضى", en: "Branding and patient loyalty" },
    quote: {
      ar: "الثقة هي المنتج الحقيقي في الرعاية الصحية.",
      en: "In healthcare, trust is the real product.",
    },
    theme: "healthcare",
  },
  {
    no: 4,
    guest: { ar: "يامن عبد العزيز", en: "Yamen Abdel Aziz" },
    role: { ar: "قيادي في قطاع الأعمال", en: "Business leader" },
    topic: { ar: "النمو المهني واتخاذ القرار", en: "Career growth and decision-making" },
    quote: {
      ar: "أصعب القرارات هي التي لا يوجد فيها خيار مريح.",
      en: "The hardest decisions are the ones with no comfortable option.",
    },
    theme: "career",
  },
  {
    no: 5,
    guest: { ar: "إيهاب فكري", en: "Ihab Fikry" },
    role: { ar: "قيادي تنفيذي", en: "Executive leader" },
    topic: { ar: "الصمود بعد التسريح وإعادة البناء", en: "Layoff resilience and rebuilding" },
    quote: {
      ar: "فقدان المنصب ليس فقداناً للقيمة.",
      en: "Losing the title is not losing your value.",
    },
    theme: "career",
  },
];

export const pick = (b: Bi, lang: Lang) => b[lang];
