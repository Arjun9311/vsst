'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function GrievancePage() {
  const { language, t } = useLanguage();

  return (
    <>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mx-auto w-full max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <ol className="flex items-center gap-2 text-sm text-muted-foreground">
          <li>
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
          </li>
          <li aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground/60"><polyline points="9 18 15 12 9 6"/></svg>
          </li>
          <li className="font-medium text-foreground" aria-current="page">
            {t('footer.link.grievance')}
          </li>
        </ol>
      </nav>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            {language === 'en' ? 'Support & Redressal' : 'మద్దతు & పరిష్కారం'}
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            {t('footer.link.grievance')}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            {language === 'en'
              ? 'We are committed to addressing any concerns or grievances you may have regarding our operations, donor relations, or beneficiary care.'
              : 'మా కార్యకలాపాలు, దాతల సంబంధాలు లేదా లబ్ధిదారుల సంరక్షణకు సంబంధించి మీకు ఏవైనా ఆందోళనలు లేదా ఫిర్యాదులను పరిష్కరించడానికి మేము కట్టుబడి ఉన్నాము.'}
          </p>
        </div>

        <div className="mt-12 max-w-3xl rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xs">
          <h2 className="text-xl font-bold text-foreground mb-4">
            {language === 'en' ? 'Grievance Officer Contact' : 'ఫిర్యాదుల అధికారి సంప్రదించండి'}
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
            <p>
              <strong>{language === 'en' ? 'Officer Name:' : 'అధికారి పేరు:'}</strong> Baddam Raghupathi Goud
            </p>
            <p>
              <strong>{language === 'en' ? 'Address:' : 'చిరునామా:'}</strong> H.No. 2-6-410, Jaipuri Colony, Nagole, Uppal Mandal, Telangana, India.
            </p>
            <p>
              <strong>{language === 'en' ? 'Email:' : 'ఇమెయిల్:'}</strong> <a href="mailto:contact@vssevatrust.com" className="text-primary hover:underline">contact@vssevatrust.com</a>
            </p>
            <p>
              <strong>{language === 'en' ? 'Phone:' : 'ఫోన్:'}</strong> <a href="tel:+918074589091" className="text-primary hover:underline">+91 80745 89091</a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
