'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import logoImg from '../../public/logo.png';

const navLinks = [
  { href: '/about', labelKey: 'nav.about' },
  { href: '/programmes', labelKey: 'nav.programmes' },
  { href: '/gallery', labelKey: 'nav.gallery' },
  { href: '/news', labelKey: 'nav.news' },
  { href: '/contact', labelKey: 'nav.contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'te' : 'en');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#121212]/95 backdrop-blur-xl">
      {/* Skip to content – first focusable element for a11y */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:outline-none"
      >
        Skip to content
      </a>

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group" aria-label="Vishwashanthi Shrushti Seva Trust – Home">
          <img
            src={logoImg.src}
            alt="Vishwashanthi Shrushti Seva Trust Logo"
            className="h-10 w-10 object-contain transition-transform group-hover:scale-105 rounded-full bg-white p-0.5"
          />
          <span className="block">
            <span className="text-[10px] min-[400px]:text-[11px] sm:text-sm font-bold tracking-tight shadow-dance-text whitespace-nowrap block">
              Vishwashanthi Shrushti Seva Trust
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3.5 py-2 text-sm font-medium text-slate-300 transition-colors hover:text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {t(link.labelKey)}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA + lang toggle */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="rounded-full px-3 py-1.5 text-xs font-medium border border-white/10 transition-colors hover:bg-white/10 flex items-center gap-1 text-slate-300"
            aria-label="Toggle language / భాషను మార్చండి"
          >
            <span className={language === 'en' ? 'text-primary font-semibold' : 'text-slate-400'}>EN</span>
            <span className="text-white/20">|</span>
            <span className={language === 'te' ? 'text-primary font-semibold' : 'text-slate-400'}>తెలుగు</span>
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden flex h-10 w-10 items-center justify-center rounded-md text-slate-200 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#121212] animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-3 text-base font-medium text-slate-200 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                {t(link.labelKey)}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-3 border-t border-white/10 pt-4">
              <div className="flex items-center justify-between px-3 py-1">
                <span className="text-sm font-medium text-slate-400">Language / భాష</span>
                <button
                  onClick={toggleLanguage}
                  className="rounded-full px-3 py-1.5 text-xs font-medium border border-white/10 transition-colors hover:bg-white/10 flex items-center gap-1 text-slate-200"
                  aria-label="Toggle language / భాషను మార్చండి"
                >
                  <span className={language === 'en' ? 'text-primary font-semibold' : 'text-slate-400'}>EN</span>
                  <span className="text-white/20">|</span>
                  <span className={language === 'te' ? 'text-primary font-semibold' : 'text-slate-400'}>తెలుగు</span>
                </button>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
