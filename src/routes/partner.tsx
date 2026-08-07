import { createFileRoute } from "@tanstack/react-router";
import { Target, Handshake, Megaphone, BarChart3 } from "lucide-react";
import heroPartner from "@/assets/hero-partner.jpg";
import { useLang } from "@/lib/i18n";
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_TEL, PLACEHOLDER_LINK } from "@/lib/content";
import { pageSeo } from "@/lib/seo";
import { AccentLink, Hero, Reveal } from "@/components/site/ui";

export const Route = createFileRoute("/partner")({
  head: () =>
    pageSeo({
      title: "Partner & Sponsor — CEOs with Molka",
      description:
        "Sponsor or partner with CEOs with Molka to reach senior healthcare, pharma and life sciences decision-makers across the GCC.",
      path: "/partner",
      keywords:
        "podcast sponsorship GCC, healthcare marketing Dubai, CEOs with Molka partner, life sciences sponsorship",
    }),
  component: Partner,
});

function Partner() {
  const { t, lang } = useLang();

  const reasons = [
    {
      icon: Target,
      ar: "جمهور مُركّز من صنّاع القرار في الرعاية الصحية وعلوم الحياة في الخليج.",
      en: "A focused audience of GCC healthcare and life sciences decision-makers.",
    },
    {
      icon: BarChart3,
      ar: "حلقة جديدة كل أول أحد من الشهر عبر يوتيوب وسبوتيفاي وآبل وأنغامي.",
      en: "A new episode every first Sunday across YouTube, Spotify, Apple Podcasts and Anghami.",
    },
    {
      icon: Handshake,
      ar: "علامة شخصية موثوقة مبنية على شبكة توظيف تنفيذي حقيقية في القطاع.",
      en: "A credible personal brand built on a real executive search network in the sector.",
    },
  ];

  const formats = [
    { ar: "رعاية سلسلة أو حلقة", en: "Series or episode sponsorship" },
    { ar: "حلقات موضوعية بالتعاون", en: "Co-produced thematic episodes" },
    { ar: "تغطية للفعاليات والمؤتمرات", en: "Event and conference coverage" },
    { ar: "محتوى مختصر للمنصات الاجتماعية", en: "Short-form social content" },
  ];

  return (
    <>
      <Hero
        priority
        image={heroPartner}
        imageAlt={
          lang === "ar" ? "شراكات ورعاية بودكاست CEOs مع مُلْكَة" : "Partner and sponsor with CEOs with Molka"
        }
        kicker={t("partner.kicker")}
        title={t("partner.title")}
        subtitle={t("partner.sub")}
      >
        <AccentLink to="/contact">{t("cta.partner")}</AccentLink>
      </Hero>

      <section className="snap-section screen-section bg-background" aria-labelledby="partner-why">
        <div className="container-90">
          <Reveal>
            <h2 id="partner-why" className="max-w-2xl text-3xl leading-tight sm:text-4xl lg:text-5xl">
              {t("partner.whyTitle")}
            </h2>
          </Reveal>
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {reasons.map((r, i) => (
              <Reveal key={r.en} delay={i * 90}>
                <li className="h-full rounded-2xl border border-border bg-card p-7 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-[var(--shadow-editorial)]">
                  <r.icon className="h-6 w-6 text-accent" aria-hidden="true" />
                  <p className="mt-6 text-base leading-relaxed">{lang === "ar" ? r.ar : r.en}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="snap-section screen-section bg-ink text-on-ink" aria-labelledby="partner-formats">
        <div className="container-90 grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="kicker">{t("partner.formatsTitle")}</p>
            <h2 id="partner-formats" className="mt-5 text-3xl leading-tight sm:text-4xl">
              {lang === "ar" ? "تعاون مُصمَّم على قياسك" : "Collaboration shaped around you"}
            </h2>
            <p className="mt-5 max-w-md text-on-ink-muted">
              {lang === "ar"
                ? "راسلنا لمناقشة الفكرة وحزم الرعاية المتاحة."
                : "Write to us to discuss the idea and available sponsorship packages."}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              {CONTACT_EMAIL ? (
                <AccentLink href={`mailto:${CONTACT_EMAIL}`}>
                  <Megaphone className="h-4 w-4" aria-hidden="true" />
                  {CONTACT_EMAIL}
                </AccentLink>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-full border border-on-ink/45 px-7 py-3 text-sm text-on-ink-muted">
                  <Megaphone className="h-4 w-4" aria-hidden="true" />
                  {PLACEHOLDER_LINK}
                </span>
              )}
              <AccentLink href={CONTACT_PHONE_TEL} variant="outline">
                <span dir="ltr">{CONTACT_PHONE}</span>
              </AccentLink>
              <AccentLink to="/contact" variant="outline">
                {t("cta.contact")}
              </AccentLink>
            </div>
          </Reveal>

          <ul className="divide-y divide-on-ink/10 border-y border-on-ink/10">
            {formats.map((f, i) => (
              <Reveal key={f.en} delay={i * 70}>
                <li className="flex items-baseline gap-5 py-6">
                  <span className="font-display text-xs text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-lg">{lang === "ar" ? f.ar : f.en}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
