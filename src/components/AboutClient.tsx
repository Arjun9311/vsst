'use client';

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const milestones = [
  { year: "2001", eventKey: "about.milestones.2001" },
  { year: "2004", eventKey: "about.milestones.2004" },
  { year: "2008", eventKey: "about.milestones.2008" },
  { year: "2012", eventKey: "about.milestones.2012" },
  { year: "2016", eventKey: "about.milestones.2016" },
  { year: "2020", eventKey: "about.milestones.2020" },
  { year: "2024", eventKey: "about.milestones.2024" },
];

const values = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
    ),
    titleKey: "about.values.compassion.title",
    descriptionKey: "about.values.compassion.desc",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
    ),
    titleKey: "about.values.transparency.title",
    descriptionKey: "about.values.transparency.desc",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    ),
    titleKey: "about.values.community.title",
    descriptionKey: "about.values.community.desc",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
    ),
    titleKey: "about.values.accountability.title",
    descriptionKey: "about.values.accountability.desc",
  },
];

export default function AboutClient() {
  const { t } = useLanguage();

  return (
    <>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <ol className="flex items-center gap-2 text-sm text-muted-foreground">
          <li><Link href="/" className="hover:text-foreground transition-colors">{t('nav.about')}</Link></li>
          <li aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg></li>
          <li className="font-medium text-foreground" aria-current="page">{t('nav.about')}</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 pt-10 pb-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">{t('about.hero.badge')}</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            {t('about.hero.title')} <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{t('about.hero.titleAccent')}</span>
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            {t('about.hero.description')}
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="border-y border-border bg-muted/30 py-16 lg:py-20" aria-labelledby="mission-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 id="mission-heading" className="text-2xl font-bold text-foreground">{t('about.mission')}</h2>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                {t('about.mission.desc')}
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">{t('about.vision')}</h2>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                {t('about.vision.desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-20" aria-labelledby="values-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="values-heading" className="text-center text-2xl font-bold text-foreground sm:text-3xl">{t('about.values.title')}</h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.titleKey} className="flex flex-col items-center text-center rounded-2xl border border-border bg-card p-7 transition-all hover:shadow-lg hover:-translate-y-0.5">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">{v.icon}</div>
                <h3 className="text-base font-semibold text-card-foreground">{t(v.titleKey)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(v.descriptionKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="border-t border-border bg-muted/30 py-16 lg:py-20" aria-labelledby="timeline-heading">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 id="timeline-heading" className="text-center text-2xl font-bold text-foreground sm:text-3xl">{t('about.journey.title')}</h2>
          <div className="mt-12 space-y-0">
            {milestones.map((m, i) => (
              <div key={m.year} className="relative flex gap-6 pb-8 last:pb-0">
                {/* Vertical line */}
                {i < milestones.length - 1 && (
                  <div className="absolute left-[19px] top-10 bottom-0 w-px bg-border" aria-hidden="true" />
                )}
                {/* Dot */}
                <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background text-xs font-bold text-primary">
                  {m.year.slice(2)}
                </div>
                <div className="pt-1.5">
                  <span className="text-sm font-semibold text-primary">{m.year}</span>
                  <p className="mt-0.5 text-sm text-muted-foreground">{t(m.eventKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="text-2xl font-bold text-foreground">{t('about.cta.title')}</h2>
          <p className="mt-3 text-muted-foreground">{t('about.cta.desc')}</p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/volunteer" className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/25 transition-all hover:bg-primary/90 active:scale-[0.97]">{t('nav.volunteer')}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
