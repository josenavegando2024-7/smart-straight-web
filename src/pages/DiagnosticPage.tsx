import { CheckCircle2, Clock, ShieldCheck, Zap } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DiagnosticForm from '@/components/DiagnosticForm';

export default function DiagnosticPage() {
  const { t } = useLanguage();

  const bullets = [t.diagnostic.bullet1, t.diagnostic.bullet2, t.diagnostic.bullet3];

  return (
    <div className="pt-20">
      {/* Hero band */}
      <section className="gradient-navy py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue-500/10 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6">
            <Clock size={16} className="text-brand-red-400" />
            <span className="text-white/90 text-sm font-medium">15 minutes</span>
          </div>
          <h1 className="font-display font-extrabold text-white text-3xl sm:text-4xl lg:text-5xl mb-4 max-w-3xl mx-auto text-balance">
            {t.diagnostic.title}
          </h1>
          <p className="text-white/60 text-lg italic">{t.diagnostic.subtitle}</p>
        </div>
      </section>

      {/* Form + benefits */}
      <section className="py-16 bg-bg-substrate">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8 items-start">
            {/* Left: benefits */}
            <div className="lg:col-span-2 space-y-6 lg:sticky lg:top-28">
              <div className="bg-white rounded-2xl shadow-premium p-8">
                <div className="flex items-center gap-2 mb-6">
                  <Zap className="text-brand-red-500" size={20} />
                  <h3 className="font-display font-bold text-brand-navy-800 text-xl">
                    {t.nav.cta}
                  </h3>
                </div>
                <div className="space-y-5">
                  {bullets.map((bullet, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-brand-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="text-brand-blue-500" size={20} />
                      </div>
                      <p className="text-brand-navy-800/80 text-sm leading-relaxed pt-2">
                        {bullet}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-brand-navy-800 rounded-2xl p-6 text-center">
                <ShieldCheck className="text-brand-blue-300 mx-auto mb-3" size={32} />
                <p className="text-white/80 text-sm">
                  {t.diagnostic.subtitle}
                </p>
              </div>
            </div>

            {/* Right: form */}
            <div className="lg:col-span-3">
              <DiagnosticForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
