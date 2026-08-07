import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Linkedin, Mail, MapPin, Send, Check, Phone } from "lucide-react";
import heroContact from "@/assets/hero-contact.jpg";
import { useLang } from "@/lib/i18n";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_TEL,
  LINKEDIN_URL,
  platforms,
  PLACEHOLDER_LINK,
  socials,
} from "@/lib/content";
import { pageSeo } from "@/lib/seo";
import { Hero, PlatformIcon, Reveal } from "@/components/site/ui";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageSeo({
      title: "Contact — CEOs with Molka Podcast",
      description:
        "Contact CEOs with Molka for guest suggestions, sponsorship or media enquiries. Call +971586011059.",
      path: "/contact",
      keywords: "contact CEOs with Molka, podcast sponsorship, guest enquiry, Molka Hachouch Dubai",
    }),
  component: Contact,
});

function Contact() {
  const { t, lang } = useLang();
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!CONTACT_EMAIL) {
      setSent(true);
      return;
    }
    const data = new FormData(e.currentTarget);
    const subject = encodeURIComponent(String(data.get("subject") ?? ""));
    const body = encodeURIComponent(
      `${data.get("name")} (${data.get("email")})\n\n${data.get("message")}`,
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const field =
    "w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none transition-all duration-300 placeholder:text-muted-foreground focus:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

  return (
    <>
      <Hero
        priority
        image={heroContact}
        imageAlt={lang === "ar" ? "تواصل مع بودكاست CEOs مع مُلْكَة" : "Contact CEOs with Molka podcast"}
        kicker={t("contact.kicker")}
        title={t("contact.title")}
        subtitle={t("contact.sub")}
      />

      <section className="snap-section min-h-[100svh] bg-background py-20 sm:py-28" aria-label="Contact form">
        <div className="container-90 grid gap-12 lg:gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <form onSubmit={onSubmit} className="space-y-4" noValidate={false}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm">
                    {t("contact.name")}
                  </label>
                  <input id="name" name="name" required autoComplete="name" className={field} />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm">
                    {t("contact.email")}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className={field}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="mb-2 block text-sm">
                  {t("contact.subject")}
                </label>
                <input id="subject" name="subject" required className={field} />
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block text-sm">
                  {t("contact.message")}
                </label>
                <textarea id="message" name="message" rows={6} required className={field} />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-medium text-accent-foreground transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-[0.98]"
              >
                {sent ? <Check className="h-4 w-4" aria-hidden="true" /> : <Send className="h-4 w-4" aria-hidden="true" />}
                {t("contact.send")}
              </button>
              <p aria-live="polite" className="min-h-5 text-sm text-accent">
                {sent ? t("contact.sent") : ""}
              </p>
            </form>
          </Reveal>

          <Reveal delay={140}>
            <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-[var(--shadow-editorial)]">
              <ul className="space-y-5">
                <li className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  {CONTACT_EMAIL ? (
                    <a href={`mailto:${CONTACT_EMAIL}`} className="transition-colors hover:text-accent">
                      {CONTACT_EMAIL}
                    </a>
                  ) : (
                    <span className="text-muted-foreground">{PLACEHOLDER_LINK}</span>
                  )}
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  <a href={CONTACT_PHONE_TEL} className="transition-colors hover:text-accent" dir="ltr">
                    {CONTACT_PHONE}
                  </a>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <Linkedin className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-accent"
                  >
                    {lang === "ar" ? "CEOs مع مُلْكَة على لينكدإن" : "CEOs with Molka on LinkedIn"}
                  </a>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <MapPin className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  {lang === "ar" ? "دبي، الإمارات" : "Dubai, United Arab Emirates"}
                </li>
              </ul>

              <div className="mt-8 border-t border-border pt-8">
                <p className="kicker">{lang === "ar" ? "وسائل التواصل" : "Social"}</p>
                <ul className="mt-4 space-y-2">
                  {socials.map((s) => (
                    <li key={s.key} className="flex items-center justify-between gap-3 text-sm">
                      <span>{s.label}</span>
                      {s.href ? (
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent transition-opacity hover:opacity-80"
                        >
                          {lang === "ar" ? "زيارة" : "Visit"}
                        </a>
                      ) : (
                        <span className="text-muted-foreground">{PLACEHOLDER_LINK}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 border-t border-border pt-8">
                <p className="kicker">{t("footer.listen")}</p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  {platforms.map((p) =>
                    p.href ? (
                      <a
                        key={p.key}
                        href={p.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-3 text-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                      >
                        <PlatformIcon name={p.key} className="h-4 w-4" />
                        {p.label}
                      </a>
                    ) : (
                      <div
                        key={p.key}
                        className="inline-flex flex-col items-start gap-1 rounded-xl border border-border px-4 py-3 text-sm"
                      >
                        <span className="inline-flex items-center gap-2">
                          <PlatformIcon name={p.key} className="h-4 w-4 text-accent" />
                          {p.label}
                        </span>
                        <span className="text-[11px] text-muted-foreground">{PLACEHOLDER_LINK}</span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
