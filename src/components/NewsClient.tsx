'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

// Import images directly for automatic Next.js basePath routing
import img1 from "../../public/news/news_clipping_1.jpg";
import img2 from "../../public/news/news_clipping_2.jpg";
import img3 from "../../public/news/news_clipping_3.jpg";
import img4 from "../../public/news/news_clipping_4.jpg";
import img5 from "../../public/news/news_clipping_5.jpg";

interface NewsItem {
  id: number;
  image: string;
  titleKey: string;
  descKey: string;
  dateKey: string;
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    image: img1.src,
    titleKey: "news.item1.title",
    descKey: "news.item1.desc",
    dateKey: "news.item1.date",
  },
  {
    id: 2,
    image: img2.src,
    titleKey: "news.item2.title",
    descKey: "news.item2.desc",
    dateKey: "news.item2.date",
  },
  {
    id: 3,
    image: img3.src,
    titleKey: "news.item3.title",
    descKey: "news.item3.desc",
    dateKey: "news.item3.date",
  },
  {
    id: 4,
    image: img4.src,
    titleKey: "news.item4.title",
    descKey: "news.item4.desc",
    dateKey: "news.item4.date",
  },
  {
    id: 5,
    image: img5.src,
    titleKey: "news.item5.title",
    descKey: "news.item5.desc",
    dateKey: "news.item5.date",
  },
];

export default function NewsClient() {
  const { t } = useLanguage();
  const [selectedNewsIndex, setSelectedNewsIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedNewsIndex(index);
  };

  const closeLightbox = () => {
    setSelectedNewsIndex(null);
  };

  const nextItem = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedNewsIndex !== null) {
      setSelectedNewsIndex((prev) => (prev !== null ? (prev + 1) % newsItems.length : 0));
    }
  };

  const prevItem = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedNewsIndex !== null) {
      setSelectedNewsIndex((prev) => (prev !== null ? (prev - 1 + newsItems.length) % newsItems.length : 0));
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedNewsIndex === null) return;
      if (e.key === 'ArrowRight') {
        nextItem();
      } else if (e.key === 'ArrowLeft') {
        prevItem();
      } else if (e.key === 'Escape') {
        closeLightbox();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedNewsIndex]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Breadcrumbs */}
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
            {t('nav.news')}
          </li>
        </ol>
      </nav>

      {/* Hero Header */}
      <section className="mx-auto w-full max-w-7xl px-4 pt-10 pb-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Vishwashanthi Shrushti Seva Trust
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            {t('news.hero.title')}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            {t('news.hero.desc')}
          </p>
        </div>
      </section>

      {/* News Grid */}
      <section className="mx-auto w-full max-w-7xl px-4 pb-24 sm:px-6 lg:px-8" aria-label="News articles and press clippings">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <article 
              key={item.id} 
              className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              {/* Image Frame */}
              <div 
                onClick={() => openLightbox(index)}
                className="group relative aspect-[4/5] w-full overflow-hidden bg-muted cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={t(item.titleKey)}
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-102"
                />
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-primary shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    Click to View Clip
                  </span>
                </div>
              </div>

              {/* Text Block */}
              <div className="flex flex-1 flex-col p-6">
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                  {t(item.dateKey)}
                </span>
                <h2 className="mt-3 text-xl font-bold leading-tight text-foreground line-clamp-2">
                  {t(item.titleKey)}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-4">
                  {t(item.descKey)}
                </p>
                <button
                  onClick={() => openLightbox(index)}
                  className="mt-6 inline-flex items-center text-sm font-semibold text-primary hover:underline cursor-pointer"
                >
                  View Press Clipping
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedNewsIndex !== null && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md transition-opacity duration-300 p-4"
          role="dialog"
          aria-modal="true"
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Close News View"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          {/* Navigation Controls */}
          <button
            onClick={prevItem}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all cursor-pointer"
            aria-label="Previous clipping"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <button
            onClick={nextItem}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all cursor-pointer"
            aria-label="Next clipping"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>

          {/* Image Display */}
          <div className="relative max-h-[90vh] max-w-[90vw] flex flex-col items-center justify-center">
            <img
              src={newsItems[selectedNewsIndex].image}
              alt={t(newsItems[selectedNewsIndex].titleKey)}
              className="max-h-[80vh] max-w-[90vw] object-contain rounded-lg shadow-2xl border border-white/10 animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            />
            {/* Localized Caption overlay below image */}
            <div 
              className="mt-4 max-w-2xl bg-black/60 backdrop-blur-md text-white p-4 rounded-xl text-center shadow-lg border border-white/5"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-bold">{t(newsItems[selectedNewsIndex].titleKey)}</h3>
              <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">{t(newsItems[selectedNewsIndex].descKey)}</p>
            </div>
            {/* Status Indicator */}
            <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md">
              {selectedNewsIndex + 1} / {newsItems.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
