'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

const availableSkills = [
  { key: 'volunteer.skill.teaching', label: 'Teaching & Tutoring' },
  { key: 'volunteer.skill.mentorship', label: 'Mentorship' },
  { key: 'volunteer.skill.events', label: 'Event Coordination' },
  { key: 'volunteer.skill.medical', label: 'Medical & Health Support' },
  { key: 'volunteer.skill.content', label: 'Content Writing & Social Media' },
  { key: 'volunteer.skill.it', label: 'IT & Graphic Design' },
  { key: 'volunteer.skill.admin', label: 'Administrative Support' },
];

const weekDays = [
  { code: 'mon', label: 'Mon' },
  { code: 'tue', label: 'Tue' },
  { code: 'wed', label: 'Wed' },
  { code: 'thu', label: 'Thu' },
  { code: 'fri', label: 'Fri' },
  { code: 'sat', label: 'Sat' },
  { code: 'sun', label: 'Sun' },
];

export default function VolunteerForm() {
  const { t } = useLanguage();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [hoursPerWeek, setHoursPerWeek] = useState(4);
  const [consent, setConsent] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSkillToggle = (skillLabel: string) => {
    setSelectedSkills(prev =>
      prev.includes(skillLabel) ? prev.filter(s => s !== skillLabel) : [...prev, skillLabel]
    );
  };

  const handleDayToggle = (day: string) => {
    setSelectedDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccess(null);
    setIsSubmitting(true);

    if (name.trim().length < 2) {
      setErrorMsg(t('volunteer.form.validation.name'));
      setIsSubmitting(false);
      return;
    }

    if (city.trim().length < 2) {
      setErrorMsg(t('volunteer.form.validation.city'));
      setIsSubmitting(false);
      return;
    }

    if (selectedSkills.length === 0) {
      setErrorMsg(t('volunteer.form.validation.skills'));
      setIsSubmitting(false);
      return;
    }

    if (selectedDays.length === 0) {
      setErrorMsg(t('volunteer.form.validation.days'));
      setIsSubmitting(false);
      return;
    }

    if (hoursPerWeek < 1) {
      setErrorMsg(t('volunteer.form.validation.hours'));
      setIsSubmitting(false);
      return;
    }

    if (!consent) {
      setErrorMsg(t('volunteer.form.validation.consent'));
      setIsSubmitting(false);
      return;
    }

    // Phone format validation if provided
    if (phone && !/^\+?[1-9]\d{1,14}$/.test(phone.replace(/\s+/g, ''))) {
      setErrorMsg(t('volunteer.form.validation.phone'));
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch('/api/contact/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone: phone || undefined,
          city,
          skills: selectedSkills,
          availability: {
            days: selectedDays,
            hours_per_week: hoursPerWeek,
          },
          consent: true,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || data.message || 'Failed to submit registration.');
      }

      setSuccess(t('volunteer.form.success.desc'));
      // Reset form
      setName('');
      setEmail('');
      setPhone('');
      setCity('');
      setSelectedSkills([]);
      setSelectedDays([]);
      setHoursPerWeek(4);
      setConsent(false);
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isTelugu = t('volunteer.form.phone').includes('ఫోన్');

  if (success) {
    return (
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center space-y-4 max-w-2xl mx-auto animate-in fade-in zoom-in-95 duration-300">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h3 className="text-xl font-bold text-foreground">{t('volunteer.form.success.title')}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {success}
        </p>
        <button
          type="button"
          onClick={() => setSuccess(null)}
          className="mt-2 inline-flex items-center justify-center rounded-full bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.97]"
        >
          {t('volunteer.form.success.button')}
        </button>
      </div>
    );
  }

  return (
    <form className="max-w-3xl mx-auto border border-border bg-card rounded-2xl p-6 sm:p-8 shadow-sm space-y-6" onSubmit={handleSubmit}>
      <h3 className="text-xl font-extrabold text-foreground border-b border-border pb-4 mb-4">{t('volunteer.form.title')}</h3>

      {errorMsg && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 animate-shake">
          {errorMsg}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="vol-name" className="block text-sm font-medium text-foreground mb-1.5">{t('volunteer.form.name')} <span className="text-red-500">*</span></label>
          <input
            type="text"
            id="vol-name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder={t('volunteer.form.placeholder.name')}
          />
        </div>
        <div>
          <label htmlFor="vol-email" className="block text-sm font-medium text-foreground mb-1.5">{t('volunteer.form.email')} <span className="text-red-500">*</span></label>
          <input
            type="email"
            id="vol-email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="vol-phone" className="block text-sm font-medium text-foreground mb-1.5">{t('volunteer.form.phone')} <span className="text-muted-foreground text-xs">({isTelugu ? 'ఐచ్ఛికం' : 'optional'})</span></label>
          <input
            type="tel"
            id="vol-phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="+91 98765 43210"
          />
        </div>
        <div>
          <label htmlFor="vol-city" className="block text-sm font-medium text-foreground mb-1.5">{t('volunteer.form.city')} <span className="text-red-500">*</span></label>
          <input
            type="text"
            id="vol-city"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder={t('volunteer.form.placeholder.city')}
          />
        </div>
      </div>

      {/* Skills Multi-select */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">{t('volunteer.form.skills')} <span className="text-red-500">*</span></label>
        <div className="flex flex-wrap gap-2">
          {availableSkills.map(skill => {
            const isSelected = selectedSkills.includes(skill.label);
            return (
              <button
                key={skill.label}
                type="button"
                onClick={() => handleSkillToggle(skill.label)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold border transition-all ${
                  isSelected
                    ? 'bg-primary text-primary-foreground border-primary shadow-sm shadow-primary/10'
                    : 'bg-background text-muted-foreground border-input hover:border-muted-foreground/30 hover:text-foreground'
                }`}
              >
                {t(skill.key)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Availability section */}
      <div className="grid gap-6 sm:grid-cols-2 border-t border-border pt-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">{t('volunteer.form.days')} <span className="text-red-500">*</span></label>
          <div className="flex flex-wrap gap-1.5">
            {weekDays.map(day => {
              const isSelected = selectedDays.includes(day.code);
              return (
                <button
                  key={day.code}
                  type="button"
                  onClick={() => handleDayToggle(day.code)}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg border text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background text-muted-foreground border-input hover:border-muted-foreground/30'
                  }`}
                >
                  {t('day.' + day.code)}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label htmlFor="vol-hours" className="block text-sm font-medium text-foreground mb-1.5">{t('volunteer.form.hours')} <span className="text-red-500">*</span></label>
          <input
            type="number"
            id="vol-hours"
            min={1}
            max={40}
            required
            value={hoursPerWeek}
            onChange={(e) => setHoursPerWeek(parseInt(e.target.value) || 0)}
            className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      <div className="flex items-start gap-3 border-t border-border pt-6">
        <input
          type="checkbox"
          id="vol-consent"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 h-4 w-4 rounded border-input text-primary focus:ring-primary"
        />
        <label htmlFor="vol-consent" className="text-sm text-muted-foreground leading-normal">
          {t('volunteer.form.consent')} <span className="text-red-500"> *</span>
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            {t('volunteer.form.submitting')}
          </>
        ) : (
          t('volunteer.form.submit')
        )}
      </button>
    </form>
  );
}
