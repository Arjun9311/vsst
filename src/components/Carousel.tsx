'use client';

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

import imgEducation from "../../public/images/carousel_education.png";
import imgNutrition from "../../public/images/carousel_nutrition.png";
import imgShelter from "../../public/images/carousel_shelter.png";
import imgWomen from "../../public/images/carousel_women.png";
import imgEnvironment from "../../public/images/carousel_environment.png";

interface Slide {
  id: number;
  image: string;
  titleKey: string;
  subtitleKey: string;
  ctaKey: string;
  ctaLink: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: imgEducation.src,
    titleKey: "home.carousel.slide1.title",
    subtitleKey: "home.carousel.slide1.subtitle",
    ctaKey: "home.carousel.slide1.cta",
    ctaLink: "/programmes",
  },
  {
    id: 2,
    image: imgNutrition.src,
    titleKey: "home.carousel.slide2.title",
    subtitleKey: "home.carousel.slide2.subtitle",
    ctaKey: "home.carousel.slide2.cta",
    ctaLink: "/contact",
  },
  {
    id: 3,
    image: imgShelter.src,
    titleKey: "home.carousel.slide3.title",
    subtitleKey: "home.carousel.slide3.subtitle",
    ctaKey: "home.carousel.slide3.cta",
    ctaLink: "/programmes",
  },
  {
    id: 4,
    image: imgWomen.src,
    titleKey: "home.carousel.slide4.title",
    subtitleKey: "home.carousel.slide4.subtitle",
    ctaKey: "home.carousel.slide4.cta",
    ctaLink: "/programmes",
  },
  {
    id: 5,
    image: imgEnvironment.src,
    titleKey: "home.carousel.slide5.title",
    subtitleKey: "home.carousel.slide5.subtitle",
    ctaKey: "home.carousel.slide5.cta",
    ctaLink: "/programmes",
  },
];

export default function Carousel() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoplayTimer = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  }, []);

  const selectSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isPaused) {
      autoplayTimer.current = setInterval(nextSlide, 5000);
    }
    return () => {
      if (autoplayTimer.current) {
        clearInterval(autoplayTimer.current);
      }
    };
  }, [nextSlide, isPaused]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  return (
    <section 
      className="relative overflow-hidden w-full h-[500px] md:h-[600px] lg:h-[700px] bg-slate-900 select-none"
      aria-label="Highlights Carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {/* Slides wrapper */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
              aria-hidden={!isActive}
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] ease-out scale-105"
                style={{ 
                  backgroundImage: `url('${slide.image}')`,
                  transform: isActive ? "scale(1)" : "scale(1.05)"
                }}
              />
              {/* Dark Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

              {/* Content container */}
              <div className="relative mx-auto max-w-7xl h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
                <div className={`max-w-2xl text-left space-y-6 transition-all duration-700 delay-300 transform ${
                  isActive ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}>
                  <span className="inline-block rounded-full bg-primary/20 border border-primary/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground">
                    Vishwashanthi Shrushti Seva Trust
                  </span>
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-white tracking-tight">
                    {t(slide.titleKey)}
                  </h2>
                  <p className="text-lg sm:text-xl text-slate-200 leading-relaxed max-w-lg">
                    {t(slide.subtitleKey)}
                  </p>
                  <div className="flex flex-wrap gap-4 pt-2">
                    <Link
                      href={slide.ctaLink}
                      className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.97]"
                    >
                      {t(slide.ctaKey)}
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center rounded-full border-2 border-white/60 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-8 py-3.5 text-base font-semibold text-white transition-all active:scale-[0.97]"
                    >
                      {t("nav.donate")}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/30 text-white backdrop-blur-sm transition-all hover:bg-black/50 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
        aria-label="Previous Slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/30 text-white backdrop-blur-sm transition-all hover:bg-black/50 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
        aria-label="Next Slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      </button>

      {/* Slide Indicators / Dot Pagination */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
        {slides.map((_, index) => {
          const isActive = index === currentIndex;
          return (
            <button
              key={index}
              onClick={() => selectSlide(index)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                isActive ? "w-8 bg-primary" : "w-2.5 bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={isActive ? "true" : undefined}
            />
          );
        })}
      </div>
    </section>
  );
}
