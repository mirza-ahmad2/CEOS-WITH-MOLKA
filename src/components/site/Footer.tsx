import { Link } from "@tanstack/react-router";
import { Linkedin, Mail, Phone, Instagram } from "lucide-react";
import { useLang } from "@/lib/i18n";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_TEL,
  LINKEDIN_URL,
  LISTEN_PATH,
  PLACEHOLDER_LINK,
  platforms,
  socials,
} from "@/lib/content";
import { BrandMark, PlatformIcon } from "./ui";

const navLinks = [
  { to: "/about", key: "nav.about" },
  { to: "/episodes", key: "nav.episodes" },
  { to: "/guests", key: "nav.guests" },
  { to: "/partner", key: "nav.partner" },
  { to: "/contact", key: "nav.contact" },
] as const;

export function Footer() {
  const { t, lang } = useLang();

  return (
    <footer className="snap-section bg-ink text-on-ink">
      <div className="container-90 grid gap-12 py-16 sm:py-20 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Link to="/" className="group inline-block" aria-label="CEOs with Molka — Home">
            <BrandMark />
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-on-ink-muted">
            {lang === "ar"
              ? "بودكاست عربي من دبي يجمع قادة علوم الحياة والرعاية الصحية في الخليج."
              : "An Arabic podcast from Dubai bringing together GCC life sciences and healthcare leaders."}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {socials.map((s) => {
              if (s.href) {
                return (
                  <a
                    key={s.key}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-on-ink/20 text-on-ink-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                  >
                    {s.key === "linkedin" ? (
                      <Linkedin className="h-4 w-4" />
                    ) : s.key === "instagram" ? (
                      <Instagram className="h-4 w-4" />
                    ) : (
                      <span className="text-[10px] font-semibold">{s.label.slice(0, 1)}</span>
                    )}
                  </a>
                );
              }
              return (
                <span
                  key={s.key}
                  title={`${s.label}: ${PLACEHOLDER_LINK}`}
                  className="inline-flex h-9 items-center gap-1.5 rounded-full border border-on-ink/15 px-3 text-[11px] text-on-ink-muted/70"
                >
                  {s.label}
                  <span className="text-accent/80">{PLACEHOLDER_LINK}</span>
                </span>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="text-xs font-semibold tracking-[0.24em] text-accent uppercase">
            {t("footer.explore")}
          </h2>
          <ul className="mt-5 space-y-2.5">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-sm text-on-ink-muted transition-colors duration-300 hover:text-accent"
                >
                  {t(l.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-semibold tracking-[0.24em] text-accent uppercase">
            {t("footer.listen")}
          </h2>
          <ul className="mt-5 space-y-2.5">
            <li>
              <Link
                to={LISTEN_PATH}
                className="text-sm text-on-ink-muted transition-colors duration-300 hover:text-accent"
              >
                {t("cta.listen")}
              </Link>
            </li>
            {platforms.map((p) => (
              <li key={p.key}>
                {p.href ? (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-on-ink-muted transition-colors duration-300 hover:text-accent"
                  >
                    <PlatformIcon name={p.key} className="h-4 w-4" />
                    {p.label}
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 text-sm text-on-ink-muted/70">
                    <PlatformIcon name={p.key} className="h-4 w-4" />
                    {p.label}
                    <span className="text-[11px] text-accent/80">{PLACEHOLDER_LINK}</span>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-semibold tracking-[0.24em] text-accent uppercase">
            {t("footer.reach")}
          </h2>
          <ul className="mt-5 space-y-2.5">
            <li>
              {CONTACT_EMAIL ? (
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-flex items-center gap-2 text-sm text-on-ink-muted transition-colors duration-300 hover:text-accent"
                >
                  <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {CONTACT_EMAIL}
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 text-sm text-on-ink-muted/70">
                  <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {PLACEHOLDER_LINK}
                </span>
              )}
            </li>
            <li>
              <a
                href={CONTACT_PHONE_TEL}
                className="inline-flex items-center gap-2 text-sm text-on-ink-muted transition-colors duration-300 hover:text-accent"
                dir="ltr"
              >
                <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                {CONTACT_PHONE}
              </a>
            </li>
            <li>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-on-ink-muted transition-colors duration-300 hover:text-accent"
              >
                <Linkedin className="h-4 w-4 shrink-0" aria-hidden="true" />
                LinkedIn
              </a>
            </li>
            <li className="text-sm text-on-ink-muted">Dubai, United Arab Emirates</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-on-ink/10">
        <div className="container-90 flex flex-col gap-2 py-6 text-xs text-on-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} CEOs with Molka. {t("footer.rights")}
          </p>
          <p>
            {lang === "ar" ? "مدعوم من" : "Powered by"}{" "}
            <a
              href="https://theinnovations.tech/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent transition-opacity hover:opacity-80"
            >
              The Innovations
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
