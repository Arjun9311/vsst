'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import ProgrammeModal from "@/components/ProgrammeModal";

const programmes = [
  {
    slug: "children",
    titleKey: "programmes.card.children.title",
    descriptionKey: "programmes.card.children.desc",
    statsKey: "programmes.card.children.stats",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    gradient: "from-teal-500 to-emerald-600",
  },
  {
    slug: "education",
    titleKey: "programmes.card.education.title",
    descriptionKey: "programmes.card.education.desc",
    statsKey: "programmes.card.education.stats",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    slug: "women",
    titleKey: "programmes.card.women.title",
    descriptionKey: "programmes.card.women.desc",
    statsKey: "programmes.card.women.stats",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    gradient: "from-pink-500 to-rose-600",
  },
  {
    slug: "hiv",
    titleKey: "programmes.card.hiv.title",
    descriptionKey: "programmes.card.hiv.desc",
    statsKey: "programmes.card.hiv.stats",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
    gradient: "from-red-500 to-orange-500",
  },
  {
    slug: "environment",
    titleKey: "programmes.card.environment.title",
    descriptionKey: "programmes.card.environment.desc",
    statsKey: "programmes.card.environment.stats",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c-4.97 0-9-2.24-9-5v-4c0-2.76 4.03-5 9-5s9 2.24 9 5v4c0 2.76-4.03 5-9 5z"/><path d="M12 8V2"/><path d="M8 4l4-2 4 2"/></svg>,
    gradient: "from-green-500 to-lime-600",
  },
  {
    slug: "aged",
    titleKey: "programmes.card.aged.title",
    descriptionKey: "programmes.card.aged.desc",
    statsKey: "programmes.card.aged.stats",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    gradient: "from-violet-500 to-purple-600",
  },
];

export default function ProgrammesClient() {
  const { t } = useLanguage();
  const [activeProgramme, setActiveProgramme] = useState<string | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && ['children', 'education', 'women', 'hiv', 'environment', 'aged'].includes(hash)) {
        setActiveProgramme(hash);
      }
    };

    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <ol className="flex items-center gap-2 text-sm text-muted-foreground">
          <li><Link href="/" className="hover:text-foreground transition-colors">{t('nav.about')}</Link></li>
          <li aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg></li>
          <li className="font-medium text-foreground" aria-current="page">{t('nav.programmes')}</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 pt-10 pb-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">{t('programmes.hero.badge')}</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            {t('programmes.hero.title')} <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{t('programmes.hero.titleAccent')}</span>
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            {t('programmes.hero.desc')}
          </p>
        </div>
      </section>

      {/* Programme Grid */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programmes.map((prog) => (
            <button
              key={prog.slug}
              onClick={() => setActiveProgramme(prog.slug)}
              type="button"
              className="group flex flex-col rounded-2xl border border-border bg-card p-7 text-left transition-all hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring cursor-pointer"
            >
              <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${prog.gradient} text-white transition-transform group-hover:scale-110`}>
                {prog.icon}
              </div>
              <h2 className="text-lg font-semibold text-card-foreground">{t(prog.titleKey)}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{t(prog.descriptionKey)}</p>
              <div className="mt-4 flex items-center justify-between w-full">
                <span className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                  {t(prog.statsKey)}
                </span>
                <span className="text-sm font-medium text-primary group-hover:underline flex items-center gap-1">
                  {t('programmes.card.learnMore')}
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5"><polyline points="9 18 15 12 9 6"/></svg>
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {activeProgramme && (
        <ProgrammeModal 
          slug={activeProgramme} 
          onClose={() => setActiveProgramme(null)} 
        />
      )}
    </>
  );
}
