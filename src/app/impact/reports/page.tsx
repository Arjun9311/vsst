'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function ReportsPage() {
  const { language, t } = useLanguage();

  const reports = [
    { year: '2023–2024', name: 'Annual Report & Audited Accounts', size: '2.4 MB' },
    { year: '2022–2023', name: 'Annual Report & Audited Accounts', size: '1.8 MB' },
    { year: '2021–2022', name: 'Annual Report & Audited Accounts', size: '2.1 MB' },
  ];

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
            {t('footer.link.reports')}
          </li>
        </ol>
      </nav>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            {language === 'en' ? 'Transparency & Audits' : 'పారదర్శకత & ఆడిట్‌లు'}
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            {language === 'en' ? 'Annual Reports & Audits' : 'వార్షిక నివేదికలు & ఆడిట్‌లు'}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            {language === 'en'
              ? 'We believe in complete accountability. Our annual reports and financial audit statements are published here every year for public download.'
              : 'మేము పరిపూర్ణ జవాబుదారీతనాన్ని విశ్వసిస్తాము. మా వార్షిక నివేదికలు మరియు ఆర్థిక ఆడిట్ ప్రకటనలు ప్రతి సంవత్సరం ప్రజల డౌన్‌లోడ్ కోసం ఇక్కడ ప్రచురించబడతాయి.'}
          </p>
        </div>

        <div className="mt-12 max-w-4xl space-y-4">
          {reports.map((report) => (
            <div key={report.year} className="flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-border bg-card p-6 shadow-xs gap-4">
              <div>
                <span className="text-sm font-semibold text-primary">{report.year}</span>
                <h3 className="text-lg font-bold text-foreground mt-0.5">{report.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">PDF Document • {report.size}</p>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => alert(language === 'en' ? 'Downloading Report...' : 'నివేదికను డౌన్‌లోడ్ చేస్తోంది...')}
                  className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-xs hover:bg-primary/90 transition-all cursor-pointer"
                >
                  {language === 'en' ? 'Download PDF' : 'PDF డౌన్‌లోడ్'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
