'use client';

import Link from "next/link";
import ImpactStats from "@/components/ImpactStats";
import { useLanguage } from "@/context/LanguageContext";

const programmes = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
    ),
    titleKey: "home.programmes.children.title",
    descriptionKey: "home.programmes.children.desc",
    href: "/programmes/children",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
    ),
    titleKey: "home.programmes.education.title",
    descriptionKey: "home.programmes.education.desc",
    href: "/programmes/education",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    ),
    titleKey: "home.programmes.women.title",
    descriptionKey: "home.programmes.women.desc",
    href: "/programmes/women",
  },
];

const helpCards = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
    ),
    titleKey: "home.help.donate.title",
    descriptionKey: "home.help.donate.desc",
    href: "/contact",
    ctaKey: "home.help.donate.cta",
    primary: true,
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
    ),
    titleKey: "home.help.share.title",
    descriptionKey: "home.help.share.desc",
    href: "/contact",
    ctaKey: "home.help.share.cta",
    primary: false,
  },
];

const donationTiers = [
  { label: "₹500", value: 500 },
  { label: "₹1,000", value: 1000 },
  { label: "₹2,200", value: 2200 },
];

export default function Home() {
  const { t } = useLanguage();

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/50">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-secondary/5 blur-3xl" aria-hidden="true" />

        <div className="relative mx-auto flex max-w-7xl flex-col-reverse items-center gap-10 px-4 py-16 sm:px-6 md:py-24 lg:flex-row lg:gap-16 lg:px-8 lg:py-28">
          {/* Text column */}
          <div className="flex-1 text-center lg:text-left">
            <p className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
              {t('home.hero.badge')}
            </p>
            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {t('home.hero.title')}{" "}
              <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t('home.hero.titleAccent')}
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground lg:mx-0">
              {t('home.hero.description')}
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
              <Link
                href="/programmes"
                className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-[0.97]"
              >
                {t('home.hero.ctaWork')}
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border-2 border-border px-8 py-3.5 text-base font-semibold text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                {t('nav.contact')}
              </Link>
            </div>
          </div>

          {/* Image column */}
          <div className="relative flex-1">
            <div className="relative mx-auto aspect-[4/3] w-full max-w-lg overflow-hidden rounded-2xl bg-muted shadow-2xl ring-1 ring-border/50">
              {/* Placeholder – replace with real Trust photo */}
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                <div className="text-center space-y-3 px-8">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Trust photograph — children in classroom
                  </p>
                </div>
              </div>
            </div>
            {/* Floating accent card */}
            <div className="absolute -bottom-4 -left-4 rounded-xl border border-border bg-card p-4 shadow-lg sm:-bottom-6 sm:-left-6">
              <p className="text-2xl font-bold text-primary">24+</p>
              <p className="text-xs text-muted-foreground">{t('home.hero.years')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── IMPACT STATS BAR ─── */}
      <ImpactStats />

      {/* ─── PROGRAMMES OVERVIEW ─── */}
      <section className="py-20 lg:py-24" aria-labelledby="programmes-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">{t('home.hero.ctaWork')}</p>
            <h2 id="programmes-heading" className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t('home.programmes.title')}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground">
              {t('home.programmes.subtitle')}
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {programmes.map((prog) => (
              <Link
                key={prog.href}
                href={prog.href}
                className="group flex flex-col rounded-2xl border border-border bg-card p-7 transition-all hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  {prog.icon}
                </div>
                <h3 className="text-lg font-semibold text-card-foreground">{t(prog.titleKey)}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{t(prog.descriptionKey)}</p>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-primary group-hover:underline">
                  {t('home.programmes.learnMore')}
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 transition-transform group-hover:translate-x-1"><polyline points="9 18 15 12 9 6"/></svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW YOU CAN HELP ─── */}
      <section className="border-y border-border bg-muted/30 py-20 lg:py-24" aria-labelledby="help-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">{t('home.help.subtitle')}</p>
            <h2 id="help-heading" className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t('home.help.title')}
            </h2>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 max-w-4xl mx-auto">
            {helpCards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group relative flex flex-col items-center rounded-2xl border border-border bg-card p-8 text-center transition-all hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl transition-colors ${card.primary ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground"}`}>
                  {card.icon}
                </div>
                <h3 className="text-lg font-semibold text-card-foreground">{t(card.titleKey)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(card.descriptionKey)}</p>
                <span className={`mt-5 inline-flex items-center rounded-full px-5 py-2 text-sm font-semibold transition-all ${card.primary ? "bg-primary text-primary-foreground shadow-md shadow-primary/25 group-hover:shadow-lg" : "border border-border text-foreground group-hover:bg-muted"}`}>
                  {t(card.ctaKey)}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>


    </>
  );
}
