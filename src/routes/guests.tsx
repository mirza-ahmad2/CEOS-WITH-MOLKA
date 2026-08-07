import { createFileRoute } from "@tanstack/react-router";
import heroGuests from "@/assets/hero-guests.jpg";
import { useLang } from "@/lib/i18n";
import { episodes, pick, themes } from "@/lib/content";
import { pageSeo } from "@/lib/seo";
import { AccentLink, Hero, Reveal } from "@/components/site/ui";

export const Route = createFileRoute("/guests")({
  head: () =>
    pageSeo({
      title: "Guests & Topics — CEOs with Molka",
      description:
        "Explore CEOs with Molka by theme: leadership, healthcare and pharma, career and layoffs, and women in leadership across the GCC.",
      path: "/guests",
      keywords:
        "CEOs with Molka guests, leadership themes, women in leadership GCC, healthcare podcast topics",
    }),
  component: Guests,
});

function Guests() {
  const { t, lang } = useLang();

  return (
    <>
      <Hero
        priority
        image={heroGuests}
        imageAlt={
          lang === "ar" ? "ضيوف ومحاور بودكاست CEOs مع مُلْكَة" : "Guests and topics of CEOs with Molka"
        }
        kicker={t("guests.kicker")}
        title={t("guests.title")}
        subtitle={t("guests.sub")}
      >
        <AccentLink to="/episodes" variant="outline">
          {t("cta.explore")}
        </AccentLink>
      </Hero>

      {themes.map((theme, index) => {
        const list = episodes.filter((e) => e.theme === theme.key);
        const dark = index % 2 === 1;
        return (
          <section
            key={theme.key}
            className={`snap-section screen-section ${dark ? "bg-ink text-on-ink" : "bg-background"}`}
            aria-labelledby={`theme-${theme.key}`}
          >
            <div className="container-90 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <Reveal>
                <p className="kicker">{`0${index + 1}`}</p>
                <h2
                  id={`theme-${theme.key}`}
                  className="mt-5 text-3xl leading-tight sm:text-4xl lg:text-5xl"
                >
                  {pick(theme.label, lang)}
                </h2>
                <p
                  className={`mt-5 max-w-md text-base leading-relaxed sm:text-lg ${dark ? "text-on-ink-muted" : "text-muted-foreground"}`}
                >
                  {pick(theme.blurb, lang)}
                </p>
              </Reveal>

              <div className="space-y-4">
                {list.length === 0 ? (
                  <Reveal>
                    <p className={dark ? "text-on-ink-muted" : "text-muted-foreground"}>
                      {lang === "ar" ? "حلقات قادمة قريباً." : "Episodes coming soon."}
                    </p>
                  </Reveal>
                ) : (
                  list.map((ep, i) => (
                    <Reveal key={ep.no} delay={i * 80}>
                      <article
                        className={`group rounded-2xl border p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 ${
                          dark
                            ? "border-on-ink/15 hover:border-accent"
                            : "border-border bg-card hover:border-accent hover:shadow-[var(--shadow-editorial)]"
                        }`}
                      >
                        <p className="text-xs text-accent">
                          {lang === "ar" ? `الحلقة ${ep.no}` : `Episode ${ep.no}`}
                        </p>
                        <h3 className="mt-2 text-xl">{pick(ep.guest, lang)}</h3>
                        <p
                          className={`mt-1 text-sm ${dark ? "text-on-ink-muted" : "text-muted-foreground"}`}
                        >
                          {pick(ep.topic, lang)}
                        </p>
                        <p className="mt-4 border-s-2 border-accent ps-4 text-base leading-relaxed">
                          {pick(ep.quote, lang)}
                        </p>
                      </article>
                    </Reveal>
                  ))
                )}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
