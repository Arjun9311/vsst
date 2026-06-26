'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function LegalPage() {
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
          <li>
            <Link href="/about" className="hover:text-foreground transition-colors">
              About Us
            </Link>
          </li>
          <li aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground/60"><polyline points="9 18 15 12 9 6"/></svg>
          </li>
          <li className="font-medium text-foreground" aria-current="page">
            {t('footer.link.legal')}
          </li>
        </ol>
      </nav>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            {language === 'en' ? 'Regulatory Compliance' : 'నియంత్రణ వర్తింపు'}
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            {language === 'en' ? 'Legal & Tax Exemptions' : 'చట్టపరమైన & పన్ను మినహాయింపులు'}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            {language === 'en'
              ? 'Vishwashanthi Shrushti Seva Trust is fully registered and compliant with all state and national regulations in India, holding valid certifications for tax exemption and foreign contributions.'
              : 'విశ్వశాంతి సృష్టి సేవా ట్రస్ట్ భారతదేశంలో అన్ని రాష్ట్ర మరియు జాతీయ నిబంధనలకు అనుగుణంగా నమోదు చేయబడింది, పన్ను మినహాయింపు మరియు విదేశీ విరాళాల కొరకు చెల్లుబాటు అయ్యే ధృవీకరణలను కలిగి ఉంది.'}
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
            <h3 className="text-lg font-bold text-foreground">{language === 'en' ? 'Trust Registration' : 'ట్రస్ట్ రిజిస్ట్రేషన్'}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {language === 'en'
                ? 'Reg. No. 768K IV/2024 (Re-registered under Government of Telangana). Originally registered under Reg. No. 2091/2001.'
                : 'రిజిస్ట్రేషన్ నెం. 768K IV/2024 (తెలంగాణ ప్రభుత్వం కింద తిరిగి నమోదు చేయబడింది). మొదట రిజిస్ట్రేషన్ నెం. 2091/2001 కింద నమోదు చేయబడింది.'}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
            <h3 className="text-lg font-bold text-foreground">{language === 'en' ? 'Section 80G Status' : 'సెక్షన్ 80G హోదా'}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {language === 'en'
                ? 'Donations are 50% tax-deductible under Section 80G of the Indian Income Tax Act. Tax receipts are issued automatically.'
                : 'భారతీయ ఆదాయపు పన్ను చట్టంలోని సెక్షన్ 80G కింద విరాళాలు 50% పన్ను మినహాయింపునకు అర్హమైనవి. పన్ను రసీదులు స్వయంచాలకంగా జారీ చేయబడతాయి.'}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
            <h3 className="text-lg font-bold text-foreground">{language === 'en' ? 'FCRA Registration' : 'FCRA రిజిస్ట్రేషన్'}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {language === 'en'
                ? 'FCRA Registered and approved by the Ministry of Home Affairs to accept foreign currency contributions directly to our SBI FCRA main account.'
                : 'విదేశీ విరాళాలను మా SBI FCRA ప్రధాన ఖాతాకు నేరుగా స్వీకరించడానికి కేంద్ర హోం మంత్రిత్వ శాఖచే FCRA నమోదు మరియు అనుమతి ఆమోదించబడింది.'}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
