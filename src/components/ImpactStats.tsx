'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

function AnimatedCounter({ target, label }: { target: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const step = target / (duration / 16);
          let current = 0;
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, 16);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-1.5 py-2">
      <span className="text-3xl font-extrabold tracking-tight text-primary-foreground sm:text-4xl">
        {count.toLocaleString('en-IN')}+
      </span>
      <span className="text-sm font-medium text-primary-foreground/75">{label}</span>
    </div>
  );
}

export default function ImpactStats() {
  const { t } = useLanguage();

  const stats = [
    { target: 120, label: t('impact.stats.children') },
    { target: 24, label: t('impact.stats.years') },
    { target: 150000, label: t('impact.stats.meals') },
    { target: 500, label: t('impact.stats.students') },
  ];

  return (
    <section className="bg-gradient-to-r from-primary to-secondary" aria-label="Impact statistics">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        {stats.map((stat) => (
          <AnimatedCounter key={stat.label} target={stat.target} label={stat.label} />
        ))}
      </div>
    </section>
  );
}
