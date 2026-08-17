import { useState, type FormEvent } from 'react';
import {
  Building2,
  Briefcase,
  CreditCard,
  DollarSign,
  User,
  Mail,
  Phone,
  Globe,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  AlertCircle,
  type LucideIcon,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { supabase } from '@/lib/supabase';

type FormData = {
  businessName: string;
  industry: string;
  qbStatus: string;
  monthlyRevenue: string;
  fullName: string;
  email: string;
  phone: string;
  preferredLang: string;
};

const initialData: FormData = {
  businessName: '',
  industry: '',
  qbStatus: '',
  monthlyRevenue: '',
  fullName: '',
  email: '',
  phone: '',
  preferredLang: 'en',
};

export default function DiagnosticForm() {
  const { t, lang } = useLanguage();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>({ ...initialData, preferredLang: lang });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  const update = (field: keyof FormData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const step1Valid = data.businessName.trim() !== '' && data.industry.trim() !== '';
  const step2Valid = data.qbStatus !== '' && data.monthlyRevenue !== '';
  const step3Valid =
    data.fullName.trim() !== '' &&
    data.email.trim() !== '' &&
    data.phone.trim() !== '';

  const handleNext = () => {
    if (step === 1 && step1Valid) setStep(2);
    else if (step === 2 && step2Valid) setStep(3);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!step3Valid) return;

    setSubmitting(true);
    setError(false);

    try {
      const { error: insertError } = await supabase.from('leads').insert({
        business_name: data.businessName,
        industry: data.industry,
        qb_status: data.qbStatus,
        monthly_revenue: data.monthlyRevenue,
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        preferred_lang: data.preferredLang,
      });

      if (insertError) throw insertError;

      setSuccess(true);
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setData({ ...initialData, preferredLang: lang });
    setStep(1);
    setSuccess(false);
    setError(false);
  };

  if (success) {
    return (
      <div className="bg-white rounded-2xl shadow-premium-lg p-8 sm:p-12 text-center animate-scale-in">
        <div className="w-20 h-20 bg-success-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="text-success-500" size={48} />
        </div>
        <h3 className="font-display font-bold text-brand-navy-800 text-2xl sm:text-3xl mb-4">
          {t.form.successTitle}
        </h3>
        <p className="text-brand-navy-800/80 text-base sm:text-lg mb-8 max-w-md mx-auto">
          {t.form.successMsg}
        </p>
        <button
          onClick={handleReset}
          className="bg-brand-blue-500 hover:bg-brand-blue-600 text-white font-semibold px-6 py-3 rounded-xl transition-smooth"
        >
          {t.form.submitAnother}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-premium-lg overflow-hidden">
      {/* Progress bar */}
      <div className="h-2 bg-brand-blue-50 relative">
        <div
          className="absolute top-0 left-0 h-full bg-brand-blue-500 rounded-r-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step indicator */}
      <div className="px-6 sm:px-10 pt-8 pb-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-brand-blue-600">
            {t.form.step} {step} {t.form.of} {totalSteps}
          </span>
          <div className="flex gap-1.5">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-smooth ${s <= step ? 'w-8 bg-brand-blue-500' : 'w-4 bg-brand-blue-100'}`}
              />
            ))}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="px-6 sm:px-10 pb-10">
        {/* Step 1: Business Info */}
        {step === 1 && (
          <div className="animate-fade-in-up">
            <h3 className="font-display font-bold text-brand-navy-800 text-2xl mb-2">
              {t.form.step1Title}
            </h3>
            <p className="text-brand-navy-800/70 text-sm mb-8">{t.form.step1Sub}</p>

            <div className="space-y-5">
              <Field icon={Building2} label={t.form.businessName}>
                <input
                  type="text"
                  value={data.businessName}
                  onChange={(e) => update('businessName', e.target.value)}
                  placeholder={t.form.businessNamePh}
                  className="w-full bg-transparent outline-none text-brand-navy-800 placeholder:text-brand-navy-800/30 text-base"
                />
              </Field>

              <Field icon={Briefcase} label={t.form.industry}>
                <input
                  type="text"
                  value={data.industry}
                  onChange={(e) => update('industry', e.target.value)}
                  placeholder={t.form.industryPh}
                  className="w-full bg-transparent outline-none text-brand-navy-800 placeholder:text-brand-navy-800/30 text-base"
                />
              </Field>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={handleNext}
                disabled={!step1Valid}
                className="inline-flex items-center gap-2 bg-brand-red-500 hover:bg-brand-red-600 disabled:bg-brand-red-200 disabled:cursor-not-allowed text-white font-semibold px-7 py-3.5 rounded-xl shadow-cta transition-smooth hover:scale-105 disabled:hover:scale-100"
              >
                {t.form.next}
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: QuickBooks Status */}
        {step === 2 && (
          <div className="animate-fade-in-up">
            <h3 className="font-display font-bold text-brand-navy-800 text-2xl mb-2">
              {t.form.step2Title}
            </h3>
            <p className="text-brand-navy-800/70 text-sm mb-8">{t.form.step2Sub}</p>

            <div className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-brand-navy-800 mb-3">
                  <CreditCard size={16} className="text-brand-blue-500" />
                  {t.form.qbStatus}
                </label>
                <div className="grid gap-3">
                  {[
                    { val: 'setup', label: t.form.qbSetup },
                    { val: 'needs_cleanup', label: t.form.qbNeeds },
                    { val: 'none', label: t.form.qbNone },
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      type="button"
                      onClick={() => update('qbStatus', opt.val)}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-smooth text-left ${data.qbStatus === opt.val ? 'border-brand-blue-500 bg-brand-blue-50' : 'border-brand-navy-800/10 hover:border-brand-blue-200'}`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-smooth ${data.qbStatus === opt.val ? 'border-brand-blue-500 bg-brand-blue-500' : 'border-brand-navy-800/20'}`}>
                        {data.qbStatus === opt.val && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                      <span className={`text-sm font-medium ${data.qbStatus === opt.val ? 'text-brand-blue-600' : 'text-brand-navy-800/70'}`}>
                        {opt.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-brand-navy-800 mb-3">
                  <DollarSign size={16} className="text-brand-blue-500" />
                  {t.form.monthlyRevenue}
                </label>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[t.form.revenue1, t.form.revenue2, t.form.revenue3, t.form.revenue4].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => update('monthlyRevenue', opt)}
                      className={`p-3.5 rounded-xl border-2 transition-smooth text-sm font-medium ${data.monthlyRevenue === opt ? 'border-brand-blue-500 bg-brand-blue-50 text-brand-blue-600' : 'border-brand-navy-800/10 text-brand-navy-800/70 hover:border-brand-blue-200'}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-2 text-brand-navy-800/60 hover:text-brand-navy-800 font-semibold px-5 py-3.5 rounded-xl transition-smooth"
              >
                <ArrowLeft size={18} />
                {t.form.back}
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={!step2Valid}
                className="inline-flex items-center gap-2 bg-brand-red-500 hover:bg-brand-red-600 disabled:bg-brand-red-200 disabled:cursor-not-allowed text-white font-semibold px-7 py-3.5 rounded-xl shadow-cta transition-smooth hover:scale-105 disabled:hover:scale-100"
              >
                {t.form.next}
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Contact Info */}
        {step === 3 && (
          <div className="animate-fade-in-up">
            <h3 className="font-display font-bold text-brand-navy-800 text-2xl mb-2">
              {t.form.step3Title}
            </h3>
            <p className="text-brand-navy-800/70 text-sm mb-8">{t.form.step3Sub}</p>

            <div className="space-y-5">
              <Field icon={User} label={t.form.fullName}>
                <input
                  type="text"
                  value={data.fullName}
                  onChange={(e) => update('fullName', e.target.value)}
                  placeholder={t.form.fullNamePh}
                  className="w-full bg-transparent outline-none text-brand-navy-800 placeholder:text-brand-navy-800/30 text-base"
                />
              </Field>

              <Field icon={Mail} label={t.form.email}>
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => update('email', e.target.value)}
                  placeholder={t.form.emailPh}
                  className="w-full bg-transparent outline-none text-brand-navy-800 placeholder:text-brand-navy-800/30 text-base"
                />
              </Field>

              <Field icon={Phone} label={t.form.phone}>
                <input
                  type="tel"
                  value={data.phone}
                  onChange={(e) => update('phone', e.target.value)}
                  placeholder={t.form.phonePh}
                  className="w-full bg-transparent outline-none text-brand-navy-800 placeholder:text-brand-navy-800/30 text-base"
                />
              </Field>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-brand-navy-800 mb-3">
                  <Globe size={16} className="text-brand-blue-500" />
                  {t.form.preferredLang}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { val: 'en', label: 'English' },
                    { val: 'es', label: 'Español' },
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      type="button"
                      onClick={() => update('preferredLang', opt.val)}
                      className={`p-3.5 rounded-xl border-2 transition-smooth text-sm font-medium ${data.preferredLang === opt.val ? 'border-brand-blue-500 bg-brand-blue-50 text-brand-blue-600' : 'border-brand-navy-800/10 text-brand-navy-800/70 hover:border-brand-blue-200'}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {error && (
              <div className="mt-5 flex items-center gap-2 bg-error-50 text-error-600 text-sm px-4 py-3 rounded-lg">
                <AlertCircle size={18} />
                {t.form.errorMsg}
              </div>
            )}

            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-2 text-brand-navy-800/60 hover:text-brand-navy-800 font-semibold px-5 py-3.5 rounded-xl transition-smooth"
              >
                <ArrowLeft size={18} />
                {t.form.back}
              </button>
              <button
                type="submit"
                disabled={!step3Valid || submitting}
                className="inline-flex items-center gap-2 bg-brand-red-500 hover:bg-brand-red-600 disabled:bg-brand-red-200 disabled:cursor-not-allowed text-white font-semibold px-7 py-3.5 rounded-xl shadow-cta transition-smooth hover:scale-105 disabled:hover:scale-100"
              >
                {submitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    {t.form.submitting}
                  </>
                ) : (
                  <>
                    {t.form.submit}
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

function Field({
  icon: Icon,
  label,
  children,
}: {
  icon: LucideIcon;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-brand-navy-800 mb-2">
        {label}
      </label>
      <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 border-brand-navy-800/10 focus-within:border-brand-blue-500 transition-smooth">
        <Icon size={18} className="text-brand-blue-500 flex-shrink-0" />
        {children}
      </div>
    </div>
  );
}
