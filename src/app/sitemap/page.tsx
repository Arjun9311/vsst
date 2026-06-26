'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function SitemapPage() {
  const { language, t } = useLanguage();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/about/governance', label: 'Governance' },
    { href: '/about/legal', label: 'Legal & Compliance' },
    { href: '/programmes', label: 'Our Programmes' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/news', label: 'News & Media' },
    { href: '/contact', label: 'Contact Us' },
    { href: '/donate', label: 'Donate' },
    { href: '/faq', label: 'FAQ' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/accessibility', label: 'Accessibility' },
    { href: '/grievance', label: 'Grievance Redressal' },
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
            {t('footer.link.sitemap')}
          </li>
        </ol>
      </nav>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            {language === 'en' ? 'Website Directory' : 'వెబ్‌సైట్ డైరెక్టరీ'}
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            {t('footer.link.sitemap')}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            {language === 'en'
              ? 'Find all main sections and sub-pages of the Vishwashanthi Shrushti Seva Trust portal listed below.'
              : 'విశ్వశాంతి సృష్టి సేవా ట్రస్ట్ పోర్టల్ యొక్క అన్ని ప్రధాన విభాగాలు మరియు ఉప-పేజీల జాబితాను క్రింద కనుగొనండి.'}
          </p>
        </div>

        <div className="mt-12 max-w-2xl rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xs">
          <ul className="space-y-3">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm sm:text-base font-semibold text-primary hover:underline transition-all">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
