import { createFileRoute } from "@tanstack/react-router";
import { Linkedin, MapPin, CalendarDays, Building2 } from "lucide-react";
import heroAbout from "@/assets/hero-about.jpg";
import portrait from "@/assets/molka-portrait.png";
import { useLang } from "@/lib/i18n";
import { LINKEDIN_URL } from "@/lib/content";
import { pageSeo } from "@/lib/seo";
import { AccentLink, Hero, Reveal } from "@/components/site/ui";

export const Route = createFileRoute("/about")({
  head: () =>
    pageSeo({
      title: "About Molka Hachouch — Host of CEOs with Molka",
      description:
        "Molka Hachouch is an executive search consultant in life sciences and healthcare in Dubai, and the host of the Arabic podcast CEOs with Molka.",
      path: "/about",
      keywords:
        "Molka Hachouch, about CEOs with Molka, executive search Dubai, life sciences consultant, Arabic podcast host",
    }),
  component: About,
});

function About() {
  const { t, lang } = useLang();

  const facts = [
    {
      icon: MapPin,
      ar: "دبي، الإمارات العربية المتحدة",
      en: "Dubai, United Arab Emirates",
    },
    {
      icon: Building2,
      ar: "علوم الحياة والرعاية الصحية — الخليج",
      en: "Life Sciences & Healthcare — GCC",
    },
    { icon: CalendarDays, ar: "انطلق في أكتوبر 2025", en: "Launched October 2025" },
  ];

  return (
    <>
      <Hero
        priority
        image={heroAbout}
        imageAlt={
          lang === "ar"
            ? "خلفية صفحة عن مُلْكَة حشوش"
            : "About page hero background for Molka Hachouch"
        }
        kicker={t("about.kicker")}
        title={t("about.title")}
        subtitle={t("about.sub")}
      >
        <AccentLink href={LINKEDIN_URL} variant="outline">
          <Linkedin className="h-4 w-4" aria-hidden="true" />
          LinkedIn
        </AccentLink>
      </Hero>

      <section className="snap-section screen-section bg-background" aria-labelledby="about-story">
        <div className="container-90 grid items-center gap-10 sm:gap-14 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-b from-ink to-ink-soft shadow-[var(--shadow-editorial)]">
              <img
                src={portrait}
                alt={
                  lang === "ar"
                    ? "صورة احترافية لمُلْكَة حشوش، مقدّمة بودكاست CEOs مع مُلْكَة"
                    : "Professional portrait of Molka Hachouch, host of the CEOs with Molka podcast"
                }
                width={800}
                height={800}
                loading="lazy"
                decoding="async"
                className="mx-auto aspect-square h-auto w-full max-h-[min(72vh,640px)] object-contain object-bottom transition-transform duration-700 ease-[var(--ease-soft)] group-hover:scale-[1.03]"
              />
            </div>
          </Reveal>
          <Reveal delay={140}>
            <h2 id="about-story" className="text-3xl leading-tight sm:text-4xl">
              {t("about.storyTitle")}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t("about.storyBody")}
            </p>
            <ul className="mt-9 space-y-4">
              {facts.map((f) => (
                <li key={f.en} className="flex items-center gap-3 text-sm">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-accent">
                    <f.icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  {lang === "ar" ? f.ar : f.en}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="snap-section screen-section bg-ink text-on-ink" aria-labelledby="about-access">
        <div className="container-90 max-w-4xl text-center">
          <Reveal>
            <p className="kicker" id="about-access">
              {t("about.accessTitle")}
            </p>
            <blockquote className="mt-8 text-2xl leading-relaxed sm:text-3xl lg:text-4xl">
              {t("about.accessBody")}
            </blockquote>
            <div className="mt-12 flex flex-wrap justify-center gap-3">
              <AccentLink to="/episodes">{t("cta.explore")}</AccentLink>
              <AccentLink to="/contact" variant="outline">
                {t("cta.contact")}
              </AccentLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
