'use client';

import Link from "next/link";
import VolunteerForm from "@/components/VolunteerForm";
import { useLanguage } from "@/context/LanguageContext";

const roles = [
  {
    titleKey: "volunteer.role.teaching.title",
    descriptionKey: "volunteer.role.teaching.desc",
    commitmentKey: "volunteer.role.teaching.commitment",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
  },
  {
    titleKey: "volunteer.role.mentorship.title",
    descriptionKey: "volunteer.role.mentorship.desc",
    commitmentKey: "volunteer.role.mentorship.commitment",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>,
  },
  {
    titleKey: "volunteer.role.events.title",
    descriptionKey: "volunteer.role.events.desc",
    commitmentKey: "volunteer.role.events.commitment",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  },
  {
    titleKey: "volunteer.role.medical.title",
    descriptionKey: "volunteer.role.medical.desc",
    commitmentKey: "volunteer.role.medical.commitment",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
  },
];

export default function VolunteerClient() {
  const { t } = useLanguage();

  return (
    <>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <ol className="flex items-center gap-2 text-sm text-muted-foreground">
          <li><Link href="/" className="hover:text-foreground transition-colors">{t('nav.about').includes('మా గురించి') ? 'హోమ్' : 'Home'}</Link></li>
          <li aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg></li>
          <li className="font-medium text-foreground" aria-current="page">{t('nav.volunteer')}</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 pt-10 pb-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">{t('volunteer.hero.badge')}</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            {t('volunteer.hero.title')} <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Vishwashanthi Shrushti Seva Trust</span>
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            {t('volunteer.hero.description')}
          </p>
        </div>
      </section>

      {/* Roles */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8" aria-labelledby="roles-heading">
        <h2 id="roles-heading" className="text-2xl font-bold text-foreground mb-8">{t('volunteer.roles.title')}</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {roles.map((role) => (
            <div key={role.titleKey} className="flex gap-5 rounded-2xl border border-border bg-card p-6 transition-all hover:shadow-lg hover:-translate-y-0.5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                {role.icon}
              </div>
              <div>
                <h3 className="text-base font-semibold text-card-foreground">{t(role.titleKey)}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{t(role.descriptionKey)}</p>
                <span className="mt-2 inline-block rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                  {t(role.commitmentKey)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sign-up form */}
      <section className="border-t border-border bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <VolunteerForm />
        </div>
      </section>
    </>
  );
}
