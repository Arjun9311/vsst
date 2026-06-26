'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { programmesData } from '@/lib/programmesData';

interface ProgrammeModalProps {
  slug: string;
  onClose: () => void;
}

const gradientMap: Record<string, string> = {
  children: "from-teal-500 to-emerald-600",
  education: "from-blue-500 to-indigo-600",
  women: "from-pink-500 to-rose-600",
  hiv: "from-red-500 to-orange-500",
  environment: "from-green-500 to-lime-600",
  aged: "from-violet-500 to-purple-600",
};

const iconMap: Record<string, React.ReactNode> = {
  children: (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
  ),
  education: (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
  ),
  women: (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  ),
  hiv: (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
  ),
  environment: (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c-4.97 0-9-2.24-9-5v-4c0-2.76 4.03-5 9-5s9 2.24 9 5v4c0 2.76-4.03 5-9 5z"/><path d="M12 8V2"/><path d="M8 4l4-2 4 2"/></svg>
  ),
  aged: (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  ),
};

export default function ProgrammeModal({ slug, onClose }: ProgrammeModalProps) {
  const { language, t } = useLanguage();
  const detail = programmesData[slug]?.[language];
  const gradient = gradientMap[slug] || "from-primary to-primary/80";
  const icon = iconMap[slug];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!detail) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="relative w-full max-w-3xl max-h-[85vh] md:max-h-[80vh] overflow-y-auto rounded-3xl border border-border bg-card shadow-2xl transition-transform animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header decoration */}
        <div className={`h-4 md:h-6 bg-gradient-to-r ${gradient}`} />

        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-8 right-6 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>

        {/* Content */}
        <div className="p-6 sm:p-8 md:p-10">
          <div className="flex flex-col gap-6">
            
            {/* Title Section */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-white`}>
                {icon}
              </div>
              <div>
                <h2 id="modal-title" className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                  {detail.title}
                </h2>
                <div className="mt-1 flex items-center gap-2">
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide text-primary">
                    {detail.stats}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <p className="text-base sm:text-lg leading-relaxed text-foreground font-medium">
                {detail.description}
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                {detail.longDescription}
              </p>
            </div>

            <hr className="border-border" />

            {/* Objectives & Impact Grid */}
            <div className="grid gap-8 md:grid-cols-2">
              {/* Objectives */}
              <div className="space-y-3">
                <h3 className="text-base font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
                  <svg className="text-primary" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  {language === 'en' ? 'Core Objectives' : 'ప్రధాన లక్ష్యాలు'}
                </h3>
                <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                  {detail.objectives.map((obj, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-primary font-semibold select-none">•</span>
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Impact */}
              <div className="space-y-3">
                <h3 className="text-base font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
                  <svg className="text-secondary" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  {language === 'en' ? 'Key Outcomes & Impact' : 'కీలక ఫలితాలు & ప్రభావం'}
                </h3>
                <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                  {detail.impact.map((imp, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-secondary font-semibold select-none">✓</span>
                      <span>{imp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <hr className="border-border" />

            {/* Footer Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">
              <button
                onClick={onClose}
                type="button"
                className="inline-flex items-center justify-center rounded-full border border-border px-6 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted focus:outline-hidden"
              >
                {language === 'en' ? 'Close' : 'మూసివేయండి'}
              </button>
              <Link
                href="/contact"
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-2.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/25 transition-all hover:bg-primary/90 active:scale-[0.97]"
              >
                {language === 'en' ? 'Support This Programme' : 'ఈ కార్యక్రమానికి మద్దతు ఇవ్వండి'}
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
