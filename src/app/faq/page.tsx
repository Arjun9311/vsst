'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function FAQPage() {
  const { language, t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { qKey: 'donate.faq.q1', aKey: 'donate.faq.a1' },
    { qKey: 'donate.faq.q2', aKey: 'donate.faq.a2' },
    { qKey: 'donate.faq.q3', aKey: 'donate.faq.a3' },
    { qKey: 'donate.faq.q4', aKey: 'donate.faq.a4' },
    { qKey: 'donate.faq.q5', aKey: 'donate.faq.a5' },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
            {t('footer.link.faq')}
          </li>
        </ol>
      </nav>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            {language === 'en' ? 'Support & Questions' : 'మద్దతు & ప్రశ్నలు'}
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            {t('donate.faq.title')}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            {t('donate.faq.more')}
          </p>
        </div>

        <div className="mt-12 max-w-4xl space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="rounded-2xl border border-border bg-card overflow-hidden shadow-xs">
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full items-center justify-between p-6 text-left font-bold text-foreground hover:bg-muted/30 transition-colors cursor-pointer"
                >
                  <span>{t(faq.qKey)}</span>
                  <span className="ml-4 shrink-0 text-muted-foreground">
                    {isOpen ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    )}
                  </span>
                </button>
                {isOpen && (
                  <div className="border-t border-border p-6 text-sm sm:text-base leading-relaxed text-muted-foreground bg-muted/10">
                    <p>{t(faq.aKey)}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
