'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function AccessibilityPage() {
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
            {t('footer.link.accessibility')}
          </li>
        </ol>
      </nav>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            {language === 'en' ? 'Inclusion & Design' : 'కలుపుగోలుతనం & డిజైన్'}
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            {t('footer.link.accessibility')}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            {language === 'en'
              ? 'We are committed to ensuring digital accessibility for people of all abilities. We strive to continually improve the user experience for everyone, adhering to the relevant accessibility standards.'
              : 'మేము అన్ని సామర్థ్యాలు ఉన్న వారికి డిజిటల్ ప్రాప్యతను నిర్ధారించడానికి కట్టుబడి ఉన్నాము. ప్రాప్యత ప్రమాణాలకు కట్టుబడి, ప్రతి ఒక్కరికీ వినియోగదారు అనుభవాన్ని మెరుగుపరచడానికి మేము నిరంతరం ప్రయత్నిస్తాము.'}
          </p>
        </div>

        <div className="mt-12 max-w-4xl space-y-6 text-sm sm:text-base leading-relaxed text-muted-foreground">
          <p>
            {language === 'en'
              ? 'Our website utilizes semantic HTML structure, proper ARIA labeling, keyboard-navigable dialog modal forms, and high contrast colors conforming to WCAG 2.1 Level AA requirements.'
              : 'మా వెబ్‌సైట్ సెమాంటిక్ HTML నిర్మాణం, సరైన ARIA లేబులింగ్, కీబోర్డ్ ద్వారా నావిగేట్ చేయగల డైలాగ్ మోడల్ ఫారమ్‌లు మరియు WCAG 2.1 లెవల్ AA అవసరాలకు అనుగుణంగా అధిక కాంట్రాస్ట్ రంగులను ఉపయోగిస్తుంది.'}
          </p>
          <p>
            {language === 'en'
              ? 'If you experience any accessibility issues or have feedback on how we can improve access, please contact us directly.'
              : 'మీరు ఏదైనా ప్రాప్యత సమస్యలను ఎదుర్కొంటే లేదా మేము ప్రాప్యతను ఎలా మెరుగుపరచవచ్చనే దానిపై అభిప్రాయాన్ని కలిగి ఉంటే, దయచేసి మమ్మల్ని సంప్రదించండి.'}
          </p>
        </div>
      </section>
    </>
  );
}
