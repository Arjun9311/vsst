'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

interface Tier {
  id: string;
  nameKey: string;
  amount: number;
  frequency: 'one_time' | 'monthly' | 'yearly';
  descriptionKey: string;
  color: string;
}

const tiers: Tier[] = [
  {
    id: 'shelter',
    nameKey: 'donate.tier.shelter.name',
    amount: 500,
    frequency: 'monthly',
    descriptionKey: 'donate.tier.shelter.desc',
    color: 'from-teal-500 to-teal-600',
  },
  {
    id: 'education',
    nameKey: 'donate.tier.education.name',
    amount: 700,
    frequency: 'monthly',
    descriptionKey: 'donate.tier.education.desc',
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 'food',
    nameKey: 'donate.tier.food.name',
    amount: 1000,
    frequency: 'monthly',
    descriptionKey: 'donate.tier.food.desc',
    color: 'from-amber-500 to-orange-500',
  },
  {
    id: 'childcare',
    nameKey: 'donate.tier.childcare.name',
    amount: 2200,
    frequency: 'monthly',
    descriptionKey: 'donate.tier.childcare.desc',
    color: 'from-teal-600 to-emerald-600',
  },
];

const countries = [
  { code: 'IN', nameKey: 'country.IN' },
  { code: 'US', nameKey: 'country.US' },
  { code: 'GB', nameKey: 'country.GB' },
  { code: 'CA', nameKey: 'country.CA' },
  { code: 'AU', nameKey: 'country.AU' },
  { code: 'SG', nameKey: 'country.SG' },
  { code: 'DE', nameKey: 'country.DE' },
  { code: 'FR', nameKey: 'country.FR' },
  { code: 'AE', nameKey: 'country.AE' },
];

export default function DonateForm() {
  const { t, language } = useLanguage();
  const searchParams = useSearchParams();
  
  // State variables
  const [frequency, setFrequency] = useState<'one_time' | 'monthly' | 'yearly'>('monthly');
  const [selectedTier, setSelectedTier] = useState<string>('childcare');
  const [customAmount, setCustomAmount] = useState<string>('');
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pan, setPan] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('IN');
  const [consent, setConsent] = useState(false);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successDetails, setSuccessDetails] = useState<{
    amount: number;
    receiptUrl: string;
    receiptNo: string;
  } | null>(null);
  
  // Handle query params on mount
  useEffect(() => {
    const tierParam = searchParams.get('tier');
    const amountParam = searchParams.get('amount');
    
    if (tierParam && tiers.some(t => t.id === tierParam)) {
      setSelectedTier(tierParam);
      setCustomAmount('');
    } else if (amountParam) {
      setSelectedTier('custom');
      setCustomAmount(amountParam);
    }
  }, [searchParams]);

  // Load Razorpay SDK
  const loadRazorpaySDK = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if ((window as any).Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Compute final amount to pay
  const getAmount = () => {
    if (selectedTier === 'custom') {
      return parseFloat(customAmount) || 0;
    }
    const tier = tiers.find(t => t.id === selectedTier);
    return tier ? tier.amount : 0;
  };

  const handleTierSelect = (tierId: string) => {
    setSelectedTier(tierId);
    if (tierId !== 'custom') {
      setCustomAmount('');
    }
  };

  const handleCustomAmountChange = (val: string) => {
    setSelectedTier('custom');
    setCustomAmount(val);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);
    
    const amount = getAmount();
    if (amount < 100) {
      setErrorMsg(t('donate.form.validation.amount'));
      setIsSubmitting(false);
      return;
    }
    
    if (!consent) {
      setErrorMsg(t('donate.form.validation.consent'));
      setIsSubmitting(false);
      return;
    }
    
    if (country === 'IN' && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan.toUpperCase())) {
      setErrorMsg(t('donate.form.validation.pan'));
      setIsSubmitting(false);
      return;
    }

    try {
      const scriptLoaded = await loadRazorpaySDK();
      if (!scriptLoaded) {
        throw new Error('Razorpay SDK failed to load. Please check your internet connection.');
      }

      // Create Order on Backend
      const orderPayload = {
        amount,
        currency: country === 'IN' ? 'INR' : 'USD', // compliance routing
        programme: selectedTier === 'custom' ? 'general' : selectedTier,
        frequency,
        donorDetails: {
          name,
          email,
          phone: phone || undefined,
          pan: country === 'IN' ? pan.toUpperCase() : undefined,
          address: address || undefined,
          country,
          consent: true,
        },
      };

      const res = await fetch('/api/donation/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || data.message || 'Failed to initialize donation order');
      }

      const paymentDescription = language === 'te'
        ? `బాలల సంరక్షణ మరియు విద్యా సహాయం - ${t('donate.frequency.' + frequency)}`
        : `Support Child Care & Education - ${t('donate.frequency.' + frequency)}`;

      // Configure Razorpay Standard Checkout
      const options = {
        key: data.keyId,
        amount: data.amount * 100, // paise
        currency: data.currency,
        name: 'Vishwashanthi Shrushti Seva Trust',
        description: paymentDescription,
        image: 'https://images.unsplash.com/photo-1594708767771-a7502209ff51?w=100&h=100&fit=crop&q=80',
        order_id: data.gatewayOrderId,
        handler: async function (response: any) {
          try {
            setIsSubmitting(true);
            
            // Verify Payment on Backend
            const verifyRes = await fetch('/api/donation/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
                dbOrderId: data.orderId,
              }),
            });

            const verifyData = await verifyRes.json();
            if (!verifyRes.ok) {
              throw new Error(verifyData.error || 'Payment signature verification failed');
            }

            // Success state!
            setSuccessDetails({
              amount: data.amount,
              receiptUrl: verifyData.receiptUrl,
              receiptNo: `REC-${new Date().getFullYear()}-${data.orderId.slice(0, 8).toUpperCase()}`,
            });
          } catch (err: any) {
            setErrorMsg(err.message || 'Verification failed. Please contact support.');
          } finally {
            setIsSubmitting(false);
          }
        },
        prefill: {
          name,
          email,
          contact: phone || '',
        },
        theme: {
          color: '#0d9488', // Teal Accent matching primary CSS token
        },
        modal: {
          ondismiss: function() {
            setIsSubmitting(false);
          }
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  };

  const isTelugu = language === 'te';

  if (successDetails) {
    return (
      <div className="mx-auto max-w-2xl rounded-3xl border border-primary/20 bg-card p-8 text-center shadow-xl shadow-primary/5 transition-all duration-500 animate-in fade-in zoom-in-95">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        </div>
        <h2 className="text-3xl font-extrabold text-foreground">{t('donate.success.title')}</h2>
        <p className="mt-3 text-muted-foreground">
          {t('donate.success.desc').replace('{amount}', '₹' + successDetails.amount.toLocaleString('en-IN'))}
        </p>

        <div className="my-8 rounded-2xl bg-muted/50 p-6 text-left border border-border">
          <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">{t('donate.success.receiptTitle')}</h3>
          <div className="grid gap-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">{t('donate.success.receiptNo')}</span><span className="font-mono font-medium text-foreground">{successDetails.receiptNo}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">{t('donate.success.exemption')}</span><span className="font-medium text-foreground">{t('donate.success.exemptionVal')}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">{t('donate.success.name')}</span><span className="font-medium text-foreground">{name}</span></div>
            {country === 'IN' && (
              <div className="flex justify-between"><span className="text-muted-foreground">{t('donate.success.pan')}</span><span className="font-mono text-foreground">{pan.toUpperCase()}</span></div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            href={successDetails.receiptUrl}
            download
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-lg active:scale-[0.97]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            {t('donate.success.download')}
          </a>
          <button
            onClick={() => setSuccessDetails(null)}
            className="inline-flex items-center justify-center rounded-full border border-border px-8 py-3 text-sm font-semibold text-foreground hover:bg-muted transition-colors active:scale-[0.97]"
          >
            {t('donate.success.again')}
          </button>
        </div>
      </div>
    );
  }

  const commitmentAbbreviation = frequency === 'one_time'
    ? t('donate.frequency.once.abbr')
    : frequency === 'monthly' ? t('donate.frequency.monthly.abbr') : t('donate.frequency.yearly.abbr');

  return (
    <div className="grid gap-12 lg:grid-cols-12">
      {/* Selection & Form Grid Column (Left) */}
      <div className="lg:col-span-7 space-y-8">
        
        {/* Step 1: Frequency & Tiers */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
            <h3 className="text-lg font-bold text-foreground">{t('donate.step1')}</h3>
            
            {/* Frequency Toggle */}
            <div className="inline-flex rounded-full bg-muted p-1">
              {(['one_time', 'monthly', 'yearly'] as const).map((freq) => (
                <button
                  key={freq}
                  type="button"
                  onClick={() => setFrequency(freq)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                    frequency === freq
                      ? 'bg-card text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {t('donate.frequency.' + freq)}
                </button>
              ))}
            </div>
          </div>

          {/* Tiers List */}
          <div className="grid gap-4 sm:grid-cols-2">
            {tiers.map((tier) => (
              <button
                key={tier.id}
                type="button"
                onClick={() => handleTierSelect(tier.id)}
                className={`relative flex flex-col text-left rounded-xl border p-4 transition-all ${
                  selectedTier === tier.id
                    ? 'border-primary ring-2 ring-primary/20 bg-primary/5'
                    : 'border-border hover:border-muted-foreground/30 hover:bg-muted/10'
                }`}
              >
                <span className="text-sm font-bold text-foreground">{t(tier.nameKey)}</span>
                <span className="text-xs text-muted-foreground mt-1 line-clamp-2">{t(tier.descriptionKey)}</span>
                <span className="text-lg font-extrabold text-foreground mt-3">
                  ₹{tier.amount.toLocaleString('en-IN')}
                  <span className="text-xs font-normal text-muted-foreground">/{commitmentAbbreviation}</span>
                </span>
              </button>
            ))}

            {/* Custom Tier */}
            <button
              type="button"
              onClick={() => handleTierSelect('custom')}
              className={`relative flex flex-col text-left rounded-xl border p-4 transition-all ${
                selectedTier === 'custom'
                  ? 'border-primary ring-2 ring-primary/20 bg-primary/5'
                  : 'border-border hover:border-muted-foreground/30 hover:bg-muted/10'
              }`}
            >
              <span className="text-sm font-bold text-foreground">{t('donate.tier.custom.name')}</span>
              <span className="text-xs text-muted-foreground mt-1">{t('donate.tier.custom.desc')}</span>
              
              <div className="relative mt-2 w-full">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-muted-foreground">₹</span>
                <input
                  type="number"
                  placeholder={t('donate.form.placeholder.amount')}
                  value={customAmount}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => handleCustomAmountChange(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background pl-7 pr-3 py-1 text-sm font-semibold focus:border-primary focus:outline-none"
                />
              </div>
            </button>
          </div>
        </div>

        {/* Step 2: Form Details */}
        <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-foreground border-b border-border pb-4 mb-4">{t('donate.step2')}</h3>
          
          {errorMsg && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 animate-shake dark:bg-red-950/20 dark:border-red-900/30 dark:text-red-400">
              {errorMsg}
            </div>
          )}

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="donor-name" className="block text-sm font-medium text-foreground mb-1.5">{t('donate.form.name')} <span className="text-red-500">*</span></label>
              <input
                type="text"
                id="donor-name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder={t('donate.form.placeholder.name')}
              />
            </div>
            
            <div>
              <label htmlFor="donor-email" className="block text-sm font-medium text-foreground mb-1.5">{t('donate.form.email')} <span className="text-red-500">*</span></label>
              <input
                type="email"
                id="donor-email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder={t('donate.form.placeholder.email')}
              />
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="donor-phone" className="block text-sm font-medium text-foreground mb-1.5">{t('donate.form.phone')} <span className="text-muted-foreground text-xs">({isTelugu ? 'ఐచ్ఛికం' : 'optional'})</span></label>
              <input
                type="tel"
                id="donor-phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder={t('donate.form.placeholder.phone')}
              />
            </div>

            <div>
              <label htmlFor="donor-country" className="block text-sm font-medium text-foreground mb-1.5">{t('donate.form.country')} <span className="text-red-500">*</span></label>
              <select
                id="donor-country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {countries.map(c => (
                  <option key={c.code} value={c.code}>{t(c.nameKey)}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Conditional Compliance Fields */}
          {country === 'IN' ? (
            <div className="rounded-xl border border-primary/10 bg-primary/5 p-5 space-y-3">
              <label htmlFor="donor-pan" className="block text-sm font-bold text-foreground">
                {t('donate.form.pan')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="donor-pan"
                required
                maxLength={10}
                value={pan}
                onChange={(e) => setPan(e.target.value.toUpperCase())}
                className="w-full max-w-xs rounded-xl border border-input bg-background px-4 py-2.5 text-sm font-mono tracking-widest text-foreground transition-colors focus:border-primary focus:outline-none"
                placeholder="ABCDE1234F"
              />
              <p className="text-xs text-muted-foreground leading-normal">
                {t('donate.form.panHelp')}
              </p>
            </div>
          ) : (
            <div className="rounded-xl border border-amber-200 bg-amber-500/5 p-5 dark:border-amber-900/30">
              <h4 className="text-sm font-bold text-amber-800 dark:text-amber-400">{t('donate.form.fcra')}</h4>
              <p className="text-xs text-amber-700/80 dark:text-amber-400/80 leading-normal mt-1">
                {t('donate.form.fcraDesc')}
              </p>
            </div>
          )}

          <div>
            <label htmlFor="donor-address" className="block text-sm font-medium text-foreground mb-1.5">{t('donate.form.address')} <span className="text-muted-foreground text-xs">({isTelugu ? 'ఐచ్ఛికం' : 'optional'})</span></label>
            <textarea
              id="donor-address"
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-y"
              placeholder={t('donate.form.placeholder.address')}
            />
          </div>

          <div className="flex items-start gap-3 border-t border-border pt-6">
            <input
              type="checkbox"
              id="donor-consent"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-input text-primary focus:ring-primary"
            />
            <label htmlFor="donor-consent" className="text-sm text-muted-foreground leading-normal">
              {t('donate.form.consent')} <span className="text-red-500">*</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                {t('donate.form.processing')}
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                {t('donate.form.submitPay').replace('{amount}', '₹' + getAmount().toLocaleString('en-IN'))}
              </>
            )}
          </button>
        </form>
      </div>

      {/* Trust & FAQ Column (Right) */}
      <div className="lg:col-span-5 space-y-6">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h4 className="text-base font-bold text-foreground mb-4">{t('donate.sidebar.title')}</h4>
          <ul className="space-y-4">
            {[
              {
                title: t('donate.sidebar.benefit.1.title'),
                desc: t('donate.sidebar.benefit.1.desc'),
              },
              {
                title: t('donate.sidebar.benefit.2.title'),
                desc: t('donate.sidebar.benefit.2.desc'),
              },
              {
                title: t('donate.sidebar.benefit.3.title'),
                desc: t('donate.sidebar.benefit.3.desc'),
              },
            ].map(item => (
              <li key={item.title} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </span>
                <div>
                  <h5 className="text-sm font-bold text-foreground">{item.title}</h5>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-normal">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Dynamic Payment Gateways badges */}
        <div className="rounded-2xl border border-border bg-card p-6 text-center space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t('donate.sidebar.secure')}</h4>
          <div className="flex flex-col gap-2 justify-center items-center text-xs font-medium text-muted-foreground/75 sm:flex-row sm:gap-4">
            <span>{isTelugu ? 'UPI & నెట్‌బ్యాంకింగ్ (రేజర్‌పే)' : 'UPI & Netbanking (Razorpay)'}</span>
            <span className="hidden h-4 w-px bg-border sm:inline"></span>
            <span>{isTelugu ? 'PCI-DSS వర్తింపు' : 'PCI-DSS Compliant'}</span>
            <span className="hidden h-4 w-px bg-border sm:inline"></span>
            <span>{isTelugu ? 'SSL సురక్షితం' : 'SSL Secured'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
