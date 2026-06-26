'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

// Import curated selection of images directly to let Next.js resolve basePaths automatically
import img1 from "../../public/gallery/IMG-20260622-WA0006.jpg";
import img2 from "../../public/gallery/IMG-20260622-WA0007.jpg";
import img3 from "../../public/gallery/IMG-20260622-WA0008.jpg";
import img4 from "../../public/gallery/IMG-20260622-WA0009.jpg";
import img5 from "../../public/gallery/IMG-20260622-WA0010.jpg";
import img6 from "../../public/gallery/IMG-20260622-WA0011.jpg";
import img7 from "../../public/gallery/IMG-20260622-WA0012.jpg";
import img8 from "../../public/gallery/IMG-20260622-WA0013.jpg";
import img9 from "../../public/gallery/IMG-20260622-WA0014.jpg";
import img10 from "../../public/gallery/IMG-20260622-WA0015.jpg";
import img11 from "../../public/gallery/IMG-20260622-WA0016.jpg";
import img12 from "../../public/gallery/IMG-20260622-WA0017.jpg";
import img13 from "../../public/gallery/IMG-20260622-WA0018.jpg";
import img14 from "../../public/gallery/IMG-20260622-WA0019.jpg";
import img15 from "../../public/gallery/IMG-20260622-WA0020.jpg";
import img16 from "../../public/gallery/IMG-20260622-WA0021.jpg";

const galleryImages = [
  { src: img1.src, alt: "Trust Activity 1" },
  { src: img2.src, alt: "Trust Activity 2" },
  { src: img3.src, alt: "Trust Activity 3" },
  { src: img4.src, alt: "Trust Activity 4" },
  { src: img5.src, alt: "Trust Activity 5" },
  { src: img6.src, alt: "Trust Activity 6" },
  { src: img7.src, alt: "Trust Activity 7" },
  { src: img8.src, alt: "Trust Activity 8" },
  { src: img9.src, alt: "Trust Activity 9" },
  { src: img10.src, alt: "Trust Activity 10" },
  { src: img11.src, alt: "Trust Activity 11" },
  { src: img12.src, alt: "Trust Activity 12" },
  { src: img13.src, alt: "Trust Activity 13" },
  { src: img14.src, alt: "Trust Activity 14" },
  { src: img15.src, alt: "Trust Activity 15" },
  { src: img16.src, alt: "Trust Activity 16" },
];

export default function Gallery() {
  const { t } = useLanguage();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prev) => (prev !== null ? (prev + 1) % galleryImages.length : 0));
    }
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prev) => (prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : 0));
    }
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'Escape') {
        closeLightbox();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex]);

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
            {t('nav.gallery')}
          </li>
        </ol>
      </nav>

      <section id="gallery" className="py-12 bg-transparent" aria-labelledby="gallery-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 id="gallery-heading" className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              {t('home.gallery.title')}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
              {t('home.gallery.subtitle')}
            </p>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                onClick={() => openLightbox(index)}
                className="group relative aspect-square overflow-hidden rounded-2xl bg-muted shadow-md ring-1 ring-border/50 cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay with magnifying glass */}
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="h-12 w-12 rounded-full bg-white/90 shadow-md flex items-center justify-center text-primary transform scale-90 group-hover:scale-100 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lightbox Modal */}
        {selectedImageIndex !== null && (
          <div
            onClick={closeLightbox}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md transition-opacity duration-300 p-4"
            role="dialog"
            aria-modal="true"
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
              aria-label="Close Gallery View"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            {/* Navigation Controls */}
            <button
              onClick={prevImage}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all cursor-pointer"
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all cursor-pointer"
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>

            {/* Image Display */}
            <div className="relative max-h-[85vh] max-w-[90vw] flex items-center justify-center">
              <img
                src={galleryImages[selectedImageIndex].src}
                alt={galleryImages[selectedImageIndex].alt}
                className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-2xl border border-white/10 animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
              />
              {/* Status Indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md">
                {selectedImageIndex + 1} / {galleryImages.length}
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
