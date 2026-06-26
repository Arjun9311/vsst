'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import logoImg from '../../public/logo.png';

const quickLinks = [
  { href: '/about', labelKey: 'footer.link.about' },
  { href: '/about/governance', labelKey: 'footer.link.governance' },
  { href: '/about/legal', labelKey: 'footer.link.legal' },
  { href: '/impact/reports', labelKey: 'footer.link.reports' },
  { href: '/faq', labelKey: 'footer.link.faq' },
];

const programmeLinks = [
  { href: '/programmes#children', labelKey: 'footer.link.children' },
  { href: '/programmes#education', labelKey: 'footer.link.education' },
  { href: '/programmes#women', labelKey: 'footer.link.women' },
  { href: '/programmes#hiv', labelKey: 'footer.link.hiv' },
  { href: '/programmes#environment', labelKey: 'footer.link.environment' },
];

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border bg-muted/40" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5" aria-label="Vishwashanthi Shrushti Seva Trust – Home">
              <img
                src={logoImg.src}
                alt="Vishwashanthi Shrushti Seva Trust Logo"
                className="h-10 w-10 object-contain"
              />
              <span>
                <span className="text-base font-bold text-foreground">Vishwashanthi Shrushti Seva Trust</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground max-w-xs">
              {t('footer.description')}
            </p>
            {/* Social icons */}
            <div className="flex gap-3 pt-1">
              {['facebook', 'twitter', 'instagram', 'youtube'].map((social) => (
                <a
                  key={social}
                  href={`https://${social}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${social}`}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground hover:border-primary"
                >
                  <span className="text-xs font-bold uppercase">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programmes */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">{t('footer.programmes')}</h3>
            <ul className="space-y-2.5">
              {programmeLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">{t('footer.contact')}</h3>
            <address className="not-italic space-y-3 text-sm text-muted-foreground">
              <p>
                H.No. 2-6-410, Jaipuri Colony,<br />
                Nagole, Uppal Mandal,<br />
                Medchal Malkajgiri District,<br />
                Telangana, India
              </p>
              <div className="flex flex-col space-y-1.5 pt-1">
                <a href="tel:+918074589091" className="transition-colors hover:text-foreground">+91 80745 89091</a>
                <a href="tel:+919848244088" className="transition-colors hover:text-foreground">+91 98482 44088</a>
                <a href="tel:+917702528018" className="transition-colors hover:text-foreground">+91 77025 28018</a>
              </div>
              <p>
                <a href="mailto:contact@vssevatrust.com" className="transition-colors hover:text-foreground">contact@vssevatrust.com</a>
              </p>
            </address>
          </div>
        </div>
      </div>

      {/* Sub-footer */}
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <p>{t('footer.copyright').replace('{year}', new Date().getFullYear().toString())}</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/privacy" className="transition-colors hover:text-foreground">{t('footer.link.privacy')}</Link>
            <Link href="/accessibility" className="transition-colors hover:text-foreground">{t('footer.link.accessibility')}</Link>
            <Link href="/grievance" className="transition-colors hover:text-foreground">{t('footer.link.grievance')}</Link>
            <Link href="/sitemap" className="transition-colors hover:text-foreground">{t('footer.link.sitemap')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
