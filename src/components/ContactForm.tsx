'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function ContactForm() {
  const { language, t } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [formType, setFormType] = useState('general');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccess(null);
    setIsSubmitting(true);

    if (name.trim().length < 2) {
      setErrorMsg(t('contact.form.validation.name'));
      setIsSubmitting(false);
      return;
    }

    if (message.trim().length < 10) {
      setErrorMsg(t('contact.form.validation.message'));
      setIsSubmitting(false);
      return;
    }

    if (!consent) {
      setErrorMsg(t('contact.form.validation.consent'));
      setIsSubmitting(false);
      return;
    }

    // Phone format validation if provided
    if (phone && !/^\+?[1-9]\d{1,14}$/.test(phone.replace(/\s+/g, ''))) {
      setErrorMsg(t('contact.form.validation.phone'));
      setIsSubmitting(false);
      return;
    }

    const basePath = typeof window !== 'undefined' && window.location.pathname.startsWith('/vsst') ? '/vsst' : '';
    try {
      const res = await fetch(`${basePath}/api/contact/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone: phone || undefined,
          formType,
          message,
          consent: true,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || data.message || 'Failed to submit inquiry.');
      }

      setSuccess(t('contact.form.success'));
      // Reset form
      setName('');
      setEmail('');
      setPhone('');
      setFormType('general');
      setMessage('');
      setConsent(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setErrorMsg(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h3 className="text-xl font-bold text-foreground">{t('contact.form.success.title')}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {success}
        </p>
        <button
          type="button"
          onClick={() => setSuccess(null)}
          className="mt-2 inline-flex items-center justify-center rounded-full bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.97]"
        >
          {t('contact.form.success.button')}
        </button>
      </div>
    );
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {errorMsg && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 animate-shake">
          {errorMsg}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium text-foreground mb-1.5">{t('contact.form.name')} <span className="text-red-500">*</span></label>
          <input
            type="text"
            id="contact-name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder={t('contact.form.placeholder.name')}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium text-foreground mb-1.5">{t('contact.form.email')} <span className="text-red-500">*</span></label>
          <input
            type="email"
            id="contact-email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder={t('contact.form.placeholder.email')}
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-phone" className="block text-sm font-medium text-foreground mb-1.5">{t('contact.form.phone')} <span className="text-muted-foreground text-xs">({language === 'te' ? 'ఐచ్ఛికం' : 'optional'})</span></label>
          <input
            type="tel"
            id="contact-phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder={t('contact.form.placeholder.phone')}
          />
        </div>
        <div>
          <label htmlFor="contact-subject" className="block text-sm font-medium text-foreground mb-1.5">{t('contact.form.subject')} <span className="text-red-500">*</span></label>
          <select
            id="contact-subject"
            value={formType}
            onChange={(e) => setFormType(e.target.value)}
            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="general">{t('contact.form.subject.general')}</option>
            <option value="admission">{t('contact.form.subject.admission')}</option>
            <option value="partnership">{t('contact.form.subject.partnership')}</option>
            <option value="media">{t('contact.form.subject.media')}</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-foreground mb-1.5">{t('contact.form.message')} <span className="text-red-500">*</span></label>
        <textarea
          id="contact-message"
          rows={5}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-y"
          placeholder={t('contact.form.placeholder.message')}
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="contact-consent"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 h-4 w-4 rounded border-input text-primary focus:ring-primary"
        />
        <label htmlFor="contact-consent" className="text-sm text-muted-foreground leading-normal">
          {t('contact.form.consent').includes('processing my personal data') ? (
            <>
              I consent to Vishwashanthi Shrushti Seva Trust processing my personal data as described in the{" "}
              <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
            </>
          ) : (
            <>
              గోప్యతా విధానంలో వివరించిన విధంగా విశ్వశాంతి సృష్టి సేవ ట్రస్ట్ నా వ్యక్తిగత డేటాను ప్రాసెస్ చేయడానికి నేను సమ్మతిస్తున్నాను.
            </>
          )}
          <span className="text-red-500"> *</span>
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-lg active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            {t('contact.form.sending')}
          </>
        ) : (
          t('contact.form.submit')
        )}
      </button>
    </form>
  );
}
