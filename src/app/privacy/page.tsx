'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function PrivacyPage() {
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
            {t('footer.link.privacy')}
          </li>
        </ol>
      </nav>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            {language === 'en' ? 'Data Protection' : 'డేటా రక్షణ'}
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            {t('footer.link.privacy')}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            {language === 'en'
              ? 'Your privacy is paramount to us. This Privacy Policy details how we store, handle, and secure donor personal data in complete compliance with the India Digital Personal Data Protection (DPDP) Act 2023.'
              : 'మీ గోప్యత మాకు అత్యంత ప్రాముఖ్యమైనది. ఈ గోప్యతా విధానం భారతదేశ డిజిటల్ వ్యక్తిగత డేటా రక్షణ (DPDP) చట్టం 2023 కి లోబడి దాతల వ్యక్తిగత డేటాను మేము ఎలా నిల్వ చేస్తాము, నిర్వహిస్తాము మరియు భద్రపరుస్తాము అనే వివరాలను తెలియజేస్తుంది.'}
          </p>
        </div>

        <div className="mt-12 max-w-4xl space-y-8 text-sm sm:text-base leading-relaxed text-muted-foreground">
          <div>
            <h2 className="text-lg font-bold text-foreground mb-3">
              {language === 'en' ? '1. Collection of Personal Data' : '1. వ్యక్తిగత డేటా సేకరణ'}
            </h2>
            <p>
              {language === 'en'
                ? 'We collect only necessary information during donations or contact inquiries, including name, email, billing address, phone number, and PAN card details (which is legally required for issuing tax exemption receipts under Section 80G of the Indian Income Tax Act).'
                : 'విరాళాలు లేదా సంప్రదింపు విచారణల సమయంలో మేము అవసరమైన సమాచారాన్ని మాత్రమే సేకరిస్తాము. ఇందులో పేరు, ఇమెయిల్, బిల్లింగ్ చిరునామా, ఫోన్ నంబర్ మరియు పాన్ (PAN) కార్డ్ వివరాలు (ఆదాయపు పన్ను చట్టం కింద పన్ను మినహాయింపు రసీదులు జారీ చేయడానికి చట్టబద్ధంగా అవసరం) ఉంటాయి.'}
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-foreground mb-3">
              {language === 'en' ? '2. Data Security & Encryption' : '2. డేటా భద్రత & ఎన్క్రిప్షన్'}
            </h2>
            <p>
              {language === 'en'
                ? 'All collected personal data is encrypted at rest using AES-256 bit encryption and securely processed. We do not sell or lease donor data to third parties under any circumstances.'
                : 'సేకరించిన అన్ని వ్యక్తిగత డేటా AES-256 బిట్ ఎన్క్రిప్షన్ ఉపయోగించి సురక్షితంగా గుప్తీకరించబడుతుంది మరియు ప్రాసెస్ చేయబడుతుంది. మేము దాతల డేటాను ఏ పరిస్థితుల్లోనూ మూడవ పక్షాలకు విక్రయించము లేదా లీజుకు ఇవ్వము.'}
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-foreground mb-3">
              {language === 'en' ? '3. Data Principal Rights' : '3. డేటా ప్రిన్సిపాల్ హక్కులు'}
            </h2>
            <p>
              {language === 'en'
                ? 'As a data principal under the India DPDP Act 2023, you have the right to request correction of your data, update consent, or request erasure when the purpose of storage is met (except where data retention is legally mandated for tax and accounting audits).'
                : 'భారతదేశం DPDP చట్టం 2023 కింద డేటా ప్రిన్సిపాల్‌గా, మీరు మీ డేటాను సరిదిద్దాలని అభ్యర్థించే హక్కు, సమ్మతిని నవీకరించే హక్కు లేదా డేటా నిల్వ ప్రయోజనం నెరవేరినప్పుడు తొలగించాలని అభ్యర్థించే హక్కు కలిగి ఉంటారు (పన్ను మరియు ఆడిట్ నిబంధనల కింద చట్టబద్ధంగా అవసరమైన చోట తప్ప).'}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
