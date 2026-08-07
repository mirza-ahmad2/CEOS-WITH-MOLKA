import { createFileRoute, Link } from "@tanstack/react-router";
import { Play } from "lucide-react";
import heroEpisodes from "@/assets/hero-episodes.jpg";
import { useLang } from "@/lib/i18n";
import { episodes, LISTEN_PATH, pick, platforms, PLACEHOLDER_LINK, themes } from "@/lib/content";
import { pageSeo } from "@/lib/seo";
import { AccentLink, Hero, PlatformIcon, Reveal } from "@/components/site/ui";

export const Route = createFileRoute("/episodes")({
  head: () =>
    pageSeo({
      title: "Episodes — CEOs with Molka Podcast",
      description:
        "Browse every episode of CEOs with Molka: Arabic conversations with GCC healthcare, pharma and life sciences leaders.",
      path: "/episodes",
      keywords:
        "CEOs with Molka episodes, Arabic podcast episodes, GCC healthcare leaders, pharma podcast",
    }),
  component: Episodes,
});

function Episodes() {
  const { t, lang } = useLang();

  return (
    <>
      <Hero
        priority
        image={heroEpisodes}
        imageAlt={
          lang === "ar" ? "مكتبة حلقات بودكاست CEOs مع مُلْكَة" : "CEOs with Molka podcast episode library"
        }
        kicker={t("episodes.kicker")}
        title={t("episodes.title")}
        subtitle={t("episodes.sub")}
      >
        <AccentLink to={LISTEN_PATH}>{t("cta.listen")}</AccentLink>
      </Hero>

      <section className="snap-section min-h-[100svh] bg-background py-20 sm:py-28" aria-label="Episode list">
        <div className="container-90">
          <ul className="divide-y divide-border border-y border-border">
            {episodes.map((ep, i) => {
              const theme = themes.find((th) => th.key === ep.theme)!;
              return (
                <Reveal key={ep.no} delay={i * 60}>
                  <li className="group grid gap-4 py-8 sm:py-9 md:grid-cols-[auto_1.2fr_1fr_auto] md:items-center md:gap-8">
                    <span className="font-display text-sm text-accent">
                      {String(ep.no).padStart(2, "0")}
                    </span>
                    <div>
                      <h2 className="text-xl transition-colors duration-300 group-hover:text-accent sm:text-2xl">
                        {pick(ep.guest, lang)}
                      </h2>
                      <p className="mt-1 text-sm text-muted-foreground">{pick(ep.role, lang)}</p>
                    </div>
                    <div>
                      <p className="text-base">{pick(ep.topic, lang)}</p>
                      <p className="mt-2 inline-flex rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                        {pick(theme.label, lang)}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {platforms.map((p) =>
                        p.href ? (
                          <a
                            key={p.key}
                            href={p.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${pick(ep.guest, lang)} — ${p.label}`}
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                          >
                            <PlatformIcon name={p.key} className="h-4 w-4" />
                          </a>
                        ) : (
                          <span
                            key={p.key}
                            title={`${p.label}: ${PLACEHOLDER_LINK}`}
                            aria-label={`${p.label} — ${PLACEHOLDER_LINK}`}
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground/60"
                          >
                            <PlatformIcon name={p.key} className="h-4 w-4" />
                          </span>
                        ),
                      )}
                      <Link
                        to={LISTEN_PATH}
                        className="ms-1 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs font-medium text-accent-foreground transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
                      >
                        <Play className="h-3.5 w-3.5" aria-hidden="true" />
                        {t("episodes.watch")}
                      </Link>
                    </div>
                  </li>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="snap-section screen-section bg-ink text-on-ink" aria-labelledby="ep-platforms">
        <div className="container-90 max-w-3xl text-center">
          <Reveal>
            <p className="kicker" id="ep-platforms">
              {t("home.platformsTitle")}
            </p>
            <h2 className="mt-6 text-3xl leading-tight sm:text-4xl">{t("home.platformsSub")}</h2>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {platforms.map((p) =>
                p.href ? (
                  <AccentLink key={p.key} href={p.href} variant="outline">
                    <PlatformIcon name={p.key} className="h-4 w-4" />
                    {p.label}
                  </AccentLink>
                ) : (
                  <span
                    key={p.key}
                    className="inline-flex items-center gap-2 rounded-full border border-on-ink/30 px-6 py-3 text-sm text-on-ink-muted"
                  >
                    <PlatformIcon name={p.key} className="h-4 w-4" />
                    {p.label}
                    <span className="text-[11px] text-accent">{PLACEHOLDER_LINK}</span>
                  </span>
                ),
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
