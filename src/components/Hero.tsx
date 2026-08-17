import { ArrowRight, CheckCircle2, BadgeCheck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Hero() {
  const { t, navigate } = useLanguage();

  const bullets = [
    t.diagnostic.bullet1,
    t.diagnostic.bullet2,
    t.diagnostic.bullet3,
  ];

  return (
    <section className="relative gradient-blue-radial pt-32 pb-20 overflow-hidden">
      {/* Decorative grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Glow orbs */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-brand-blue-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-brand-red-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: headline + CTA */}
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-brand-red-500 rounded-full animate-pulse" />
              <span className="text-white/90 text-sm font-medium">{t.diagnostic.subtitle}</span>
            </div>

            <h1 className="font-display font-extrabold text-white text-4xl sm:text-5xl lg:text-6xl leading-[1.1] mb-4 text-balance">
              {t.hero.headline}
            </h1>

            {/* QuickBooks certification badge */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5">
                <BadgeCheck className="text-brand-blue-300" size={18} />
                <span className="text-white/90 text-xs font-semibold uppercase tracking-wide">QuickBooks Certified Focus</span>
              </div>
              <div className="flex items-center gap-2 bg-white rounded-full pl-2 pr-3 py-1.5 shadow-premium">
                <img
                  src="/logo-quickbooks.png"
                  alt="QuickBooks Certified"
                  className="h-6 w-auto"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
                <span className="text-brand-navy-800 text-xs font-bold uppercase tracking-wide">Certified</span>
              </div>
            </div>

            <p className="text-white/70 text-lg sm:text-xl mb-8 max-w-xl">
              {t.hero.slogan}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate('diagnostic')}
                className="inline-flex items-center justify-center gap-2 bg-brand-red-500 hover:bg-brand-red-600 text-white font-semibold px-7 py-4 rounded-xl shadow-cta transition-smooth hover:scale-105 text-lg"
              >
                {t.hero.cta}
                <ArrowRight size={20} />
              </button>
            </div>

            {/* Diagnostic bullets */}
            <div className="mt-10 space-y-3">
              {bullets.map((bullet, i) => (
                <div key={i} className="flex items-start gap-3 animate-fade-in" style={{ animationDelay: `${0.2 + i * 0.1}s` }}>
                  <CheckCircle2 className="text-brand-red-400 flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-white/80 text-sm sm:text-base">{bullet}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: premium card */}
          <div className="relative animate-scale-in">
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-premium-lg p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-brand-blue-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-display font-bold text-xl">15</span>
                </div>
                <div>
                  <p className="text-brand-navy-800 font-display font-bold text-lg">Free Review</p>
                  <p className="text-brand-navy-800/70 text-sm">15-minute call</p>
                </div>
              </div>

              <h3 className="font-display font-bold text-brand-navy-800 text-2xl mb-4 leading-snug">
                {t.diagnostic.title}
              </h3>
              <p className="text-brand-navy-800/70 text-base mb-6 italic">
                {t.diagnostic.subtitle}
              </p>

              <div className="space-y-4 mb-8">
                {bullets.map((bullet, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-brand-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-brand-blue-500 text-xs font-bold">{i + 1}</span>
                    </div>
                    <span className="text-brand-navy-800/90 text-sm">{bullet}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate('diagnostic')}
                className="w-full bg-brand-blue-500 hover:bg-brand-blue-600 text-white font-semibold py-4 rounded-xl transition-smooth hover:scale-[1.02] shadow-premium"
              >
                {t.hero.cta}
              </button>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 bg-brand-red-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-cta animate-fade-in">
              100% Free
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
