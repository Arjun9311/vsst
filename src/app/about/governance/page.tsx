'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function GovernancePage() {
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
            {t('footer.link.governance')}
          </li>
        </ol>
      </nav>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            {language === 'en' ? 'Trust Governance' : 'ట్రస్ట్ పాలన'}
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            {language === 'en' ? 'Board of Trustees & Leadership' : 'ట్రస్టీల బోర్డు & నాయకత్వం'}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            {language === 'en' 
              ? 'Vishwashanthi Shrushti Seva Trust is governed by a dedicated board committed to transparency, accountability, and impactful community development.'
              : 'విశ్వశాంతి సృష్టి సేవా ట్రస్ట్ పారదర్శకత, జవాబుదారీతనం మరియు సామాజిక సేవకు కట్టుబడి ఉన్న ఒక అంకితమైన బోర్డు ద్వారా నిర్వహించబడుతుంది.'}
          </p>
        </div>

        <div className="mt-16 space-y-16">
          {/* Executive Committee */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground border-b border-border pb-3">
              {language === 'en' ? 'Executive Committee' : 'కార్యవర్గ కమిటీ'}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Founder & Chairman */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
                <h3 className="text-lg font-bold text-foreground">Baddam Raghupathi Goud</h3>
                <p className="text-sm font-semibold text-primary mt-1">
                  {language === 'en' ? 'Founder & Chairman' : 'వ్యవస్థాపకుడు & చైర్మన్'}
                </p>
              </div>

              {/* Vice Chairman */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
                <h3 className="text-lg font-bold text-foreground">Baddam Santosh Kumar Goud</h3>
                <p className="text-sm font-semibold text-primary mt-1">
                  {language === 'en' ? 'Vice Chairman' : 'వైస్ చైర్మన్'}
                </p>
              </div>

              {/* Secretary */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
                <h3 className="text-lg font-bold text-foreground">Baddam Leela Adarsh Goud</h3>
                <p className="text-sm font-semibold text-primary mt-1">
                  {language === 'en' ? 'Secretary' : 'కార్యదర్శి'}
                </p>
              </div>

              {/* Joint Secretary */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
                <h3 className="text-lg font-bold text-foreground">Baddam Chiranjeevi Goud</h3>
                <p className="text-sm font-semibold text-primary mt-1">
                  {language === 'en' ? 'Joint Secretary' : 'సంయుక్త కార్యదర్శి'}
                </p>
              </div>

              {/* Treasurer 1 */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
                <h3 className="text-lg font-bold text-foreground">Baddam Durga Prasad Goud</h3>
                <p className="text-sm font-semibold text-primary mt-1">
                  {language === 'en' ? 'Treasurer' : 'కోశాధికారి'}
                </p>
              </div>

              {/* Treasurer 2 */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
                <h3 className="text-lg font-bold text-foreground">Baddam Vishal Goud</h3>
                <p className="text-sm font-semibold text-primary mt-1">
                  {language === 'en' ? 'Treasurer' : 'కోశాధికారి'}
                </p>
              </div>
            </div>
          </div>

          {/* Board Members */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground border-b border-border pb-3">
              {language === 'en' ? 'Board Members' : 'బోర్డు సభ్యులు'}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
                <h3 className="text-lg font-bold text-foreground">Ch. Shashvitha Goud</h3>
                <p className="text-sm font-semibold text-muted-foreground mt-1">
                  {language === 'en' ? 'Board Member' : 'బోర్డు సభ్యురాలు'}
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
                <h3 className="text-lg font-bold text-foreground">Baddam Haritha Goud</h3>
                <p className="text-sm font-semibold text-muted-foreground mt-1">
                  {language === 'en' ? 'Board Member' : 'బోర్డు సభ్యురాలు'}
                </p>
              </div>
            </div>
          </div>

          {/* Members */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground border-b border-border pb-3">
              {language === 'en' ? 'Trust Members' : 'ట్రస్ట్ సభ్యులు'}
            </h2>
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {[
                { name: 'Baddam Bhupal Goud' },
                { name: 'Baddam Suresh Goud' },
                { name: 'Baddam Ganeshwar Goud' },
                { name: 'Ravi' },
                { name: 'Raju' }
              ].map((member, idx) => (
                <div key={idx} className="rounded-xl border border-border/80 bg-card/60 p-4 shadow-2xs flex flex-col justify-center">
                  <h3 className="text-sm font-bold text-foreground leading-tight">{member.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {language === 'en' ? 'Member' : 'సభ్యులు'}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Governance Principles */}
          <div className="rounded-2xl border border-primary/10 bg-primary/5 p-8">
            <h2 className="text-xl font-bold text-foreground mb-4">
              {language === 'en' ? 'Governance Principles' : 'పరిపాలన సూత్రాలు'}
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground max-w-4xl">
              {language === 'en'
                ? 'Our trust maintains clear division of responsibilities, regular board meetings, and active audits. Every major financial decision undergoes review by appointed legal and audit advisors to ensure absolute compliance with the Ministry of Home Affairs (FCRA guidelines) and Income Tax department.'
                : 'మా ట్రస్ట్ స్పష్టమైన బాధ్యతల విభజన, క్రమం తప్పకుండా బోర్డు సమావేశాలు మరియు క్రియాశీల ఆడిట్‌లను నిర్వహిస్తుంది. ప్రతి ఆర్థిక నిర్ణయం నియామక చట్టపరమైన మరియు ఆడిట్ సలహాదారులచే సమీక్షించబడుతుంది. ఇది కేంద్ర ప్రభుత్వ హోం మంత్రిత్వ శాఖ (FCRA నిబంధనలు) మరియు ఆదాయపు పన్ను శాఖ నియమాలకు లోబడి ఉంటుంది.'}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
