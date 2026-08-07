import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Mic, HeartPulse, TrendingUp, Users } from "lucide-react";
import heroHome from "@/assets/hero-home.jpg";
import episodeStill from "@/assets/hero-episodes.jpg";
import { useLang } from "@/lib/i18n";
import { episodes, LISTEN_PATH, pick, platforms, PLACEHOLDER_LINK } from "@/lib/content";
import { pageSeo } from "@/lib/seo";
import { AccentLink, Hero, PlatformIcon, Reveal } from "@/components/site/ui";

export const Route = createFileRoute("/")({
  head: () =>
    pageSeo({
      title: "CEOs with Molka — Arabic Podcast with GCC Healthcare Leaders",
      description:
        "Real, unscripted Arabic conversations with life sciences and healthcare CEOs in the GCC. Hosted by Molka Hachouch in Dubai. New episode every first Sunday.",
      path: "/",
    }),
  component: Index,
});

const pillars = [
  { icon: Mic, ar: "حوارات مع الرؤساء التنفيذيين", en: "C-suite conversations" },
  { icon: HeartPulse, ar: "الرعاية الصحية والأدوية", en: "Healthcare & pharma insight" },
  { icon: TrendingUp, ar: "المسار المهني واتخاذ القرار", en: "Career & decision-making" },
  { icon: Users, ar: "المرأة في القيادة", en: "Women in leadership" },
];

function Index() {
  const { t, lang, dir } = useLang();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;
  const latest = episodes[episodes.length - 1];

  return (
    <>
      <Hero
        priority
        image={heroHome}
        imageAlt={
          lang === "ar"
            ? "بودكاست CEOs مع مُلْكَة — حوارات قيادية من دبي"
            : "CEOs with Molka podcast — leadership conversations from Dubai"
        }
        kicker={t("home.kicker")}
        title={t("home.title")}
        subtitle={t("home.sub")}
      >
        <AccentLink to="/episodes">
          {t("cta.explore")}
          <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
        </AccentLink>
        <AccentLink to={LISTEN_PATH} variant="outline">
          {t("cta.listen")}
        </AccentLink>
      </Hero>

      <section className="snap-section screen-section bg-background" aria-labelledby="mission-title">
        <div className="container-90 grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <p className="kicker">{t("home.missionKicker")}</p>
            <h2 id="mission-title" className="mt-5 text-3xl leading-tight sm:text-4xl lg:text-5xl">
              {t("home.missionTitle")}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t("home.missionBody")}
            </p>
            <div className="mt-8">
              <AccentLink to="/about" variant="ghost">
                {t("cta.readStory")}
                <Arrow className="h-4 w-4" />
              </AccentLink>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="kicker">{t("home.pillars")}</p>
            </Reveal>
            <ul className="mt-6 divide-y divide-border border-y border-border">
              {pillars.map((p, i) => (
                <Reveal key={p.en} delay={i * 80}>
                  <li className="group flex items-center gap-5 py-6 transition-colors">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border text-accent transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground group-hover:shadow-[var(--shadow-editorial)]">
                      <p.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="text-lg">{lang === "ar" ? p.ar : p.en}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="snap-section screen-section bg-ink text-on-ink" aria-labelledby="latest-title">
        <div className="container-90 grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <div className="overflow-hidden rounded-3xl">
              <img
                src={episodeStill}
                alt={
                  lang === "ar"
                    ? "لقطة من تسجيل حلقة البودكاست"
                    : "A still from a podcast recording session"
                }
                width={1920}
                height={1200}
                loading="lazy"
                decoding="async"
                className="h-[42vh] w-full object-cover transition-transform duration-[1200ms] ease-[var(--ease-soft)] hover:scale-105 sm:h-[46vh]"
              />
            </div>
          </Reveal>
          <Reveal delay={140}>
            <p className="kicker">{t("home.latestKicker")}</p>
            <p className="mt-5 text-sm text-on-ink-muted">
              {lang === "ar" ? `الحلقة ${latest.no}` : `Episode ${latest.no}`}
            </p>
            <h2 id="latest-title" className="mt-3 text-3xl leading-tight sm:text-4xl">
              {pick(latest.guest, lang)}
            </h2>
            <p className="mt-3 text-lg text-accent">{pick(latest.topic, lang)}</p>
            <blockquote className="mt-7 border-s-2 border-accent ps-5 text-xl leading-relaxed text-on-ink-muted">
              {pick(latest.quote, lang)}
            </blockquote>
            <div className="mt-9 flex flex-wrap gap-3">
              <AccentLink to={LISTEN_PATH}>{t("episodes.watch")}</AccentLink>
              <AccentLink to="/episodes" variant="outline">
                {t("cta.explore")}
              </AccentLink>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        id="listen"
        className="snap-section screen-section bg-background"
        aria-labelledby="platforms-title"
      >
        <div className="container-90 text-center">
          <Reveal>
            <p className="kicker">{t("home.platformsTitle")}</p>
            <h2
              id="platforms-title"
              className="mx-auto mt-5 max-w-3xl text-3xl leading-tight sm:text-4xl lg:text-5xl"
            >
              {t("home.closing")}
            </h2>
            <p className="mt-5 text-muted-foreground">{t("home.platformsSub")}</p>
          </Reveal>

          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-4">
            {platforms.map((p, i) => (
              <Reveal key={p.key} delay={i * 70}>
                {p.href ? (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-full flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-card px-4 py-8 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-[var(--shadow-editorial)]"
                  >
                    <PlatformIcon name={p.key} className="h-6 w-6 text-accent" />
                    <span className="text-sm">{p.label}</span>
                  </a>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-2 rounded-2xl border border-border bg-card px-4 py-8 transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[var(--shadow-editorial)]">
                    <PlatformIcon name={p.key} className="h-6 w-6 text-accent" />
                    <span className="text-sm">{p.label}</span>
                    <span className="text-[11px] text-muted-foreground">{PLACEHOLDER_LINK}</span>
                  </div>
                )}
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div className="mt-12 flex flex-wrap justify-center gap-3">
              <AccentLink to="/guests" variant="ghost">
                {t("nav.guests")}
              </AccentLink>
              <AccentLink to="/partner">{t("cta.partner")}</AccentLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
