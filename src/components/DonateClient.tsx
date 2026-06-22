'use client';

import Link from "next/link";
import { Suspense } from "react";
import DonateForm from "@/components/DonateForm";
import { useLanguage } from "@/context/LanguageContext";

const faqs = [
  { qKey: "donate.faq.q1", aKey: "donate.faq.a1" },
  { qKey: "donate.faq.q2", aKey: "donate.faq.a2" },
  { qKey: "donate.faq.q3", aKey: "donate.faq.a3" },
  { qKey: "donate.faq.q4", aKey: "donate.faq.a4" },
  { qKey: "donate.faq.q5", aKey: "donate.faq.a5" },
];

const trustSignals = [
  { badge: "80G", labelKey: "donate.trust.exempt" },
  { badge: "12A", labelKey: "home.trust.registeredNgo" },
  { badge: "SSL", labelKey: "donate.trust.secure" },
  { badge: "FCRA", labelKey: "home.trust.foreignDonations" },
  { badge: "100%", labelKey: "donate.trust.funds" },
];

export default function DonateClient() {
  const { t } = useLanguage();

  return (
    <>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <ol className="flex items-center gap-2 text-sm text-muted-foreground">
          <li><Link href="/" className="hover:text-foreground transition-colors">{t('nav.about').includes('మా గురించి') ? 'హోమ్' : 'Home'}</Link></li>
          <li aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg></li>
          <li className="font-medium text-foreground" aria-current="page">{t('nav.donate')}</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 pt-10 pb-8 text-center sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          {t('donate.hero.title')} <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{t('donate.hero.titleAccent')}</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          {t('donate.hero.desc')}
        </p>
      </section>

      {/* Giving Tiers & Form */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8" aria-labelledby="tiers-heading">
        <h2 id="tiers-heading" className="sr-only">Choose a giving tier</h2>
        <Suspense fallback={<div className="text-center py-12 text-muted-foreground font-medium">Loading form...</div>}>
          <DonateForm />
        </Suspense>
      </section>

      {/* Trust Signals */}
      <section className="border-y border-border bg-muted/30 py-10" aria-label="Trust credentials">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-8 px-4 text-center sm:gap-12">
          {trustSignals.map((item) => (
            <div key={item.badge} className="flex items-center gap-2.5">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-xs font-extrabold text-primary">
                {item.badge}
              </span>
              <span className="text-sm font-medium text-muted-foreground">{t(item.labelKey)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-20" aria-labelledby="faq-heading">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 id="faq-heading" className="text-center text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {t('donate.faq.title')}
          </h2>
          <div className="mt-10 space-y-4">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group rounded-xl border border-border bg-card transition-all open:shadow-sm"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-4 text-base font-medium text-card-foreground hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring [&::-webkit-details-marker]:hidden list-none">
                  {t(faq.qKey)}
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-muted-foreground transition-transform group-open:rotate-180"><polyline points="6 9 12 15 18 9"/></svg>
                </summary>
                <div className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">
                  {t(faq.aKey)}
                </div>
              </details>
            ))}
          </div>
          <div className="mt-10 text-center">
            <p className="text-sm text-muted-foreground">
              {t('donate.faq.more').includes('Have more questions') ? (
                <>
                  Have more questions?{" "}
                  <Link href="/contact" className="font-medium text-primary hover:underline">{t('donate.faq.contactUs')}</Link>
                  {" "}{t('donate.faq.or')}{" "}call <a href="tel:+918074589091" className="font-medium text-primary hover:underline">+91 80745 89091</a>
                </>
              ) : (
                <>
                  మరిన్ని ప్రశ్నలు ఉన్నాయా?{" "}
                  <Link href="/contact" className="font-medium text-primary hover:underline">{t('donate.faq.contactUs')}</Link>
                  {" "}{t('donate.faq.or')}{" "}కాల్ చేయండి <a href="tel:+918074589091" className="font-medium text-primary hover:underline">+91 80745 89091</a>
                </>
              )}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
