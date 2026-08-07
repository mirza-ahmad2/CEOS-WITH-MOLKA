import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Menu, X, Languages, Youtube, Music2, Podcast, Radio } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { LISTEN_PATH, type PlatformKey } from "@/lib/content";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";

/* ---------- platform icons (line-style, no emoji) ---------- */

const platformIcon: Record<PlatformKey, typeof Youtube> = {
  youtube: Youtube,
  spotify: Music2,
  apple: Podcast,
  anghami: Radio,
};

export function PlatformIcon({ name, className }: { name: PlatformKey; className?: string }) {
  const Icon = platformIcon[name];
  return <Icon className={className} aria-hidden="true" />;
}

/* ---------- scroll reveal ---------- */

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", visible && "is-visible", className)}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ---------- buttons ---------- */

export function AccentLink({
  to,
  href,
  children,
  variant = "solid",
  className,
  disabled,
}: {
  to?: string;
  href?: string | null;
  children: ReactNode;
  variant?: "solid" | "outline" | "ghost";
  className?: string;
  disabled?: boolean;
}) {
  const base = cn(
    "group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-medium transition-all duration-300 ease-[var(--ease-soft)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-[0.98]",
    variant === "solid" &&
      "bg-accent text-accent-foreground hover:brightness-110 hover:-translate-y-0.5 shadow-[var(--shadow-editorial)] hover:shadow-[var(--shadow-lift)]",
    variant === "outline" &&
      "border border-on-ink/45 text-on-ink hover:bg-on-ink hover:text-ink hover:-translate-y-0.5",
    variant === "ghost" &&
      "border border-border text-foreground hover:border-accent hover:text-accent hover:-translate-y-0.5",
    disabled && "pointer-events-none opacity-55",
    className,
  );

  if (to) {
    return (
      <Link to={to} className={base}>
        {children}
      </Link>
    );
  }

  if (!href || href === "#" || href === "Add here") {
    return (
      <span className={base} aria-disabled="true" role="link">
        {children}
      </span>
    );
  }

  return (
    <a
      href={href}
      className={base}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  );
}

/* ---------- brand mark ---------- */

export function BrandMark({ className }: { className?: string }) {
  const { lang } = useLang();
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <img
        src={logo}
        alt="CEOs with Molka logo"
        width={40}
        height={40}
        className="h-9 w-9 object-contain transition-transform duration-300 group-hover:scale-105 sm:h-10 sm:w-10"
        decoding="async"
      />
      <span className="flex items-baseline gap-1.5 tracking-tight text-on-ink">
        <span className="font-display text-base sm:text-lg">CEOs</span>
        <span className="text-accent" aria-hidden="true">
          /
        </span>
        <span className="font-display text-base sm:text-lg">
          {lang === "ar" ? "مُلْكَة" : "Molka"}
        </span>
      </span>
    </span>
  );
}

/* ---------- hero ---------- */

export function Hero({
  image,
  kicker,
  title,
  subtitle,
  children,
  priority = false,
  imageAlt,
}: {
  image: string;
  kicker: string;
  title: string;
  subtitle: string;
  children?: ReactNode;
  priority?: boolean;
  imageAlt?: string;
}) {
  return (
    <section className="snap-section relative flex min-h-[100svh] items-center overflow-hidden bg-ink">
      <img
        src={image}
        alt={imageAlt || ""}
        width={1920}
        height={1200}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding={priority ? "sync" : "async"}
        className="absolute inset-0 h-full w-full object-cover will-change-transform motion-safe:animate-hero-ken"
      />
      <div className="hero-overlay absolute inset-0" aria-hidden="true" />
      <div className="container-hero relative z-10 pt-24 pb-16">
        <Reveal>
          <p className="kicker">{kicker}</p>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="mx-auto mt-6 max-w-4xl text-4xl leading-[1.15] text-on-ink sm:text-5xl lg:text-7xl">
            {title}
          </h1>
        </Reveal>
        <Reveal delay={180}>
          <p className="mx-auto mt-6 max-w-2xl text-base text-on-ink-muted sm:text-lg">{subtitle}</p>
        </Reveal>
        {children ? (
          <Reveal delay={260}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">{children}</div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}

/* ---------- nav ---------- */

const links = [
  { to: "/", key: "nav.home" },
  { to: "/about", key: "nav.about" },
  { to: "/episodes", key: "nav.episodes" },
  { to: "/guests", key: "nav.guests" },
  { to: "/partner", key: "nav.partner" },
  { to: "/contact", key: "nav.contact" },
] as const;

export function Nav() {
  const { t, lang, toggle } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[var(--ease-soft)]",
        scrolled
          ? "bg-ink/94 py-2.5 shadow-[var(--shadow-editorial)] backdrop-blur-xl"
          : "bg-transparent py-4 sm:py-5",
      )}
    >
      <nav className="container-90 flex items-center justify-between gap-4" aria-label="Main">
        <Link
          to="/"
          className="group shrink-0"
          onClick={() => setOpen(false)}
          aria-label="CEOs with Molka — Home"
        >
          <BrandMark />
        </Link>

        <ul className="hidden items-center gap-6 xl:gap-7 lg:flex">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className="relative text-sm text-on-ink-muted transition-colors duration-300 hover:text-on-ink after:absolute after:-bottom-1.5 after:inset-x-0 after:h-px after:origin-center after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 hover:after:scale-x-100"
                activeProps={{ className: "text-on-ink after:scale-x-100" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {t(l.key)}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            aria-label={lang === "ar" ? "Switch to English" : "التبديل إلى العربية"}
            aria-pressed={lang === "en"}
            className="inline-flex items-center gap-1.5 rounded-full border border-on-ink/30 px-2.5 py-1.5 text-xs text-on-ink transition-all duration-300 hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <Languages className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span className="inline-flex items-center gap-1 font-medium tracking-wide" aria-hidden="true">
              <span className={cn("transition-opacity", lang === "en" ? "text-accent opacity-100" : "opacity-45")}>
                EN
              </span>
              <span className="opacity-35">|</span>
              <span className={cn("transition-opacity", lang === "ar" ? "text-accent opacity-100" : "opacity-45")}>
                AR
              </span>
            </span>
            <span className="sr-only">{lang === "ar" ? "العربية" : "English"}</span>
          </button>
          <Link
            to={LISTEN_PATH}
            className="hidden rounded-full bg-accent px-5 py-2 text-xs font-medium text-accent-foreground transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:inline-flex"
          >
            {t("cta.listen")}
          </Link>
          <button
            type="button"
            className="rounded-lg p-1.5 text-on-ink transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div id="mobile-nav" className="animate-fade-in lg:hidden">
          <ul className="container-90 mt-3 space-y-1 rounded-2xl border border-on-ink/10 bg-ink/96 p-3 shadow-[var(--shadow-lift)] backdrop-blur-xl">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 text-sm text-on-ink-muted transition-colors hover:bg-on-ink/10 hover:text-on-ink"
                  activeProps={{ className: "bg-on-ink/10 text-accent" }}
                  activeOptions={{ exact: l.to === "/" }}
                >
                  {t(l.key)}
                </Link>
              </li>
            ))}
            <li className="pt-1">
              <Link
                to={LISTEN_PATH}
                onClick={() => setOpen(false)}
                className="block rounded-xl bg-accent px-3 py-3 text-center text-sm font-medium text-accent-foreground"
              >
                {t("cta.listen")}
              </Link>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
