import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "ar" | "en";

type Dict = Record<string, { ar: string; en: string }>;

export const dict: Dict = {
  "nav.home": { ar: "الرئيسية", en: "Home" },
  "nav.about": { ar: "عن مُلْكَة", en: "About" },
  "nav.episodes": { ar: "الحلقات", en: "Episodes" },
  "nav.guests": { ar: "الضيوف والمحاور", en: "Guests & Topics" },
  "nav.partner": { ar: "الشراكات", en: "Partner" },
  "nav.contact": { ar: "تواصل", en: "Contact" },
  "cta.listen": { ar: "استمع الآن", en: "Listen Now" },
  "cta.explore": { ar: "استكشف الحلقات", en: "Explore Episodes" },
  "cta.partner": { ar: "كن شريكاً", en: "Become a Partner" },
  "cta.contact": { ar: "تواصل معنا", en: "Get in Touch" },
  "cta.readStory": { ar: "اقرأ القصة", en: "Read the Story" },

  "home.kicker": { ar: "بودكاست عربي من دبي", en: "An Arabic podcast from Dubai" },
  "home.title": { ar: "CEOs مع مُلْكَة", en: "CEOs with Molka" },
  "home.sub": {
    ar: "حوارات حقيقية وغير مُعدّة مسبقاً مع قادة قطاع علوم الحياة والرعاية الصحية في الخليج.",
    en: "Real, unscripted conversations with Life Sciences and Healthcare leaders across the GCC.",
  },
  "home.missionKicker": { ar: "الرسالة", en: "The Mission" },
  "home.missionTitle": {
    ar: "بعيداً عن الكلام المُعلَّب",
    en: "Past the corporate clichés",
  },
  "home.missionBody": {
    ar: "منصة تمنح قادة الأعمال في الخليج مساحة صادقة للحديث عن القيادة، واتخاذ القرار، وبناء التأثير في قطاعات معقّدة — بدون سيناريو ولا عبارات جاهزة.",
    en: "A platform where GCC business leaders speak honestly about leadership, decision-making, and building influence in complex industries — no script, no talking points.",
  },
  "home.pillars": { ar: "محاور البودكاست", en: "Content Pillars" },
  "home.latestKicker": { ar: "أحدث حلقة", en: "Latest Episode" },
  "home.platformsTitle": { ar: "استمع أينما كنت", en: "Listen anywhere" },
  "home.platformsSub": {
    ar: "حلقة جديدة كل أول أحد من الشهر.",
    en: "A new episode every first Sunday of the month.",
  },
  "home.closing": {
    ar: "قصص قيادية حقيقية من قلب المنطقة.",
    en: "Real leadership stories from the heart of the region.",
  },

  "about.kicker": { ar: "المُقدِّمة", en: "The Host" },
  "about.title": { ar: "مُلْكَة حشوش", en: "Molka Hachouch" },
  "about.sub": {
    ar: "مستشارة توظيف تنفيذي في علوم الحياة والرعاية الصحية — دبي، الإمارات.",
    en: "Executive Search Consultant, Life Sciences & Healthcare — Dubai, UAE.",
  },
  "about.storyTitle": { ar: "لماذا بدأت البودكاست", en: "Why I started the podcast" },
  "about.storyBody": {
    ar: "عملي اليومي يضعني في حوار مباشر مع كبار القادة في الأدوية والتقنيات الحيوية والأجهزة الطبية والرعاية الصحية في الخليج. سمعت قصصاً لا تصل إلى المؤتمرات ولا إلى البيانات الصحفية — قرارات صعبة، إخفاقات، وتحوّلات مهنية. أطلقت البودكاست في أكتوبر 2025 لأنقل هذه الحوارات كما هي، بالعربية، إلى جمهور يستحق سماعها.",
    en: "My work puts me in direct conversation with senior leaders across pharma, biotech, medtech, and healthcare in the Gulf. I kept hearing stories that never reach a conference stage or a press release — hard calls, failures, and career turning points. I launched the podcast in October 2025 to bring those conversations, in Arabic, to an audience that deserves to hear them.",
  },
  "about.accessTitle": { ar: "وصول نادر", en: "Rare access" },
  "about.accessBody": {
    ar: "الشبكة التي بنيتها عبر سنوات في التوظيف التنفيذي هي ما يجعل هذه الحوارات ممكنة. ليس بودكاست أعمال عام — بل حوارات مع من يقودون القطاع فعلاً.",
    en: "The network I built over years in executive search is what makes these conversations possible. This is not a generic business podcast — these are the people actually running the sector.",
  },

  "episodes.kicker": { ar: "المكتبة", en: "The Library" },
  "episodes.title": { ar: "الحلقات", en: "Episodes" },
  "episodes.sub": {
    ar: "حوارات مع قادة من قطاع الرعاية الصحية وعلوم الحياة في الخليج.",
    en: "Conversations with healthcare and life sciences leaders across the GCC.",
  },
  "episodes.watch": { ar: "شاهد الحلقة", en: "Watch episode" },

  "guests.kicker": { ar: "التصنيف", en: "By theme" },
  "guests.title": { ar: "الضيوف والمحاور", en: "Guests & Topics" },
  "guests.sub": {
    ar: "تصفّح الحوارات حسب الموضوع للوصول إلى ما يهمّك.",
    en: "Browse the conversations by theme to find what matters to you.",
  },

  "partner.kicker": { ar: "الشراكات والرعاية", en: "Partnerships & Sponsorship" },
  "partner.title": { ar: "شارِكنا الحوار", en: "Partner with the podcast" },
  "partner.sub": {
    ar: "تواصل مع جمهور من صنّاع القرار في قطاع الرعاية الصحية بالخليج.",
    en: "Reach a decision-maker audience in GCC healthcare and life sciences.",
  },
  "partner.whyTitle": { ar: "لماذا الشراكة معنا", en: "Why partner with us" },
  "partner.formatsTitle": { ar: "صيغ التعاون", en: "Ways to work together" },

  "contact.kicker": { ar: "تواصل", en: "Contact" },
  "contact.title": { ar: "لنبدأ الحديث", en: "Let's start a conversation" },
  "contact.sub": {
    ar: "للضيافة، الرعاية، أو الاستفسارات الإعلامية.",
    en: "For guest suggestions, sponsorship, or media enquiries.",
  },
  "contact.name": { ar: "الاسم", en: "Name" },
  "contact.email": { ar: "البريد الإلكتروني", en: "Email" },
  "contact.subject": { ar: "الموضوع", en: "Subject" },
  "contact.message": { ar: "الرسالة", en: "Message" },
  "contact.send": { ar: "إرسال", en: "Send message" },
  "contact.sent": { ar: "شكراً لك، وصلتنا رسالتك.", en: "Thank you — your message is on its way." },

  "footer.explore": { ar: "تصفّح", en: "Explore" },
  "footer.listen": { ar: "استمع", en: "Listen" },
  "footer.reach": { ar: "تواصل", en: "Reach us" },
  "footer.rights": { ar: "جميع الحقوق محفوظة.", en: "All rights reserved." },
  "footer.powered": {
    ar: "This website is powered by The Innovations",
    en: "This website is powered by The Innovations",
  },
};

type Ctx = { lang: Lang; dir: "rtl" | "ltr"; t: (k: string) => string; toggle: () => void };

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ar");

  useEffect(() => {
    const stored = window.localStorage.getItem("cwm-lang");
    if (stored === "en" || stored === "ar") setLang(stored);
  }, []);

  const dir: "rtl" | "ltr" = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    window.localStorage.setItem("cwm-lang", lang);
  }, [lang, dir]);

  const toggle = useCallback(() => {
    setLang((prev) => (prev === "ar" ? "en" : "ar"));
  }, []);

  const t = useCallback((k: string) => dict[k]?.[lang] ?? k, [lang]);

  const value = useMemo(() => ({ lang, dir, t, toggle }), [lang, dir, t, toggle]);

  return (
    <LanguageContext.Provider value={value}>
      <div dir={dir} lang={lang} className={lang === "ar" ? "font-arabic" : undefined}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
