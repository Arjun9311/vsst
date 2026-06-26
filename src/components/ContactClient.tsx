'use client';

import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

export default function ContactClient() {
  const { t } = useLanguage();

  return (
    <>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <ol className="flex items-center gap-2 text-sm text-muted-foreground">
          <li><Link href="/" className="hover:text-foreground transition-colors">{t('nav.about').includes('మా గురించి') ? 'హోమ్' : 'Home'}</Link></li>
          <li aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg></li>
          <li className="font-medium text-foreground" aria-current="page">{t('nav.contact')}</li>
        </ol>
      </nav>

      <section className="mx-auto max-w-7xl px-4 pt-10 pb-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">{t('contact.hero.badge')}</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            {t('contact.hero.title')}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            {t('contact.hero.description')}
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card 1: Reach Us Directly */}
          <div className="rounded-2xl border border-border bg-card p-8 flex flex-col h-full">
            <h2 className="text-lg font-bold text-card-foreground mb-4">{t('contact.sidebar.title')}</h2>
            <address className="not-italic space-y-4 text-sm text-muted-foreground flex-1">
              <div className="flex gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-primary"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <p className="leading-relaxed">{t('contact.sidebar.address')}</p>
              </div>
              <div className="flex gap-3 items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-primary mt-1"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <div className="flex flex-col space-y-1.5">
                  <a href="tel:+918074589091" className="hover:text-foreground font-semibold transition-colors">+91 80745 89091</a>
                  <a href="tel:+919848244088" className="hover:text-foreground font-semibold transition-colors">+91 98482 44088</a>
                  <a href="tel:+917702528018" className="hover:text-foreground font-semibold transition-colors">+91 77025 28018</a>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-primary"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <a href="mailto:contact@vssevatrust.com" className="hover:text-foreground font-semibold transition-colors">contact@vssevatrust.com</a>
              </div>
            </address>
          </div>

          {/* Card 2: Operating Hours */}
          <div className="rounded-2xl border border-border bg-card p-8 flex flex-col h-full">
            <h2 className="text-lg font-bold text-card-foreground mb-4">{t('contact.sidebar.hours.title')}</h2>
            <div className="space-y-3 text-sm text-muted-foreground flex-1">
              <div className="flex gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-primary"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <div>
                  <p className="font-semibold text-foreground">{t('contact.sidebar.hours.days')}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Office timings for general visits & support</p>
                </div>
              </div>
              <div className="flex gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-red-500"><circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
                <p className="font-semibold text-red-500/80">{t('contact.sidebar.hours.sunday')}</p>
              </div>
            </div>
          </div>

          {/* Card 3: Emergency / Admissions */}
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8 flex flex-col h-full">
            <h2 className="text-lg font-bold text-foreground mb-3">{t('contact.sidebar.emergency.title')}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed flex-1">
              {t('contact.sidebar.emergency.desc')}
            </p>
            <div className="mt-4">
              <a href="tel:+918074589091" className="inline-flex items-center gap-2 text-xl font-extrabold text-primary hover:underline">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                +91 80745 89091
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Google Map Section */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl border border-border bg-card overflow-hidden shadow-sm h-[450px]">
          {/* Custom Info Card Overlay (Large screens) */}
          <div className="hidden md:block absolute top-6 left-6 z-10 max-w-xs lg:max-w-sm rounded-xl border border-border bg-card/95 backdrop-blur-md p-5 shadow-lg">
            <h3 className="font-bold text-foreground text-base">
              {t('nav.about').includes('మా గురించి') ? 'విశ్వశాంతి సృష్టి సేవ ట్రస్ట్' : 'Vishwashanthi Shrushti Seva Trust'}
            </h3>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              {t('contact.sidebar.address')}
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href="https://maps.app.goo.gl/jKainuA2nFkR4Y6WA"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
                {t('nav.about').includes('మా గురించి') ? 'దిశలు' : 'Directions'}
              </a>
              <a
                href="https://maps.app.goo.gl/jKainuA2nFkR4Y6WA"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3.5 py-2 text-xs font-semibold text-foreground hover:bg-muted transition-colors"
              >
                {t('nav.about').includes('మా గురించి') ? 'మ్యాప్‌లో చూడండి' : 'View on Map'}
              </a>
            </div>
          </div>

          {/* Iframe Google Map */}
          <iframe
            src="https://maps.google.com/maps?q=17.377385,78.569423&z=17&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
            title="Vishwashanthi Shrushti Seva Trust Location Map"
          ></iframe>
        </div>
        
        {/* Info Card (Mobile view, below the map) */}
        <div className="block md:hidden mt-4 rounded-xl border border-border bg-card p-5 shadow-sm">
          <h3 className="font-bold text-foreground text-base">
            {t('nav.about').includes('మా గురించి') ? 'విశ్వశాంతి సృష్టి సేవ ట్రస్ట్' : 'Vishwashanthi Shrushti Seva Trust'}
          </h3>
          <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
            {t('contact.sidebar.address')}
          </p>
          <div className="mt-4 flex gap-3">
            <a
              href="https://maps.app.goo.gl/jKainuA2nFkR4Y6WA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
              {t('nav.about').includes('మా గురించి') ? 'దిశలు' : 'Directions'}
            </a>
            <a
              href="https://maps.app.goo.gl/jKainuA2nFkR4Y6WA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3.5 py-2 text-xs font-semibold text-foreground hover:bg-muted transition-colors"
            >
              {t('nav.about').includes('మా గురించి') ? 'మ్యాప్‌లో చూడండి' : 'View on Map'}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
