import { GraduationCap, Quote } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Portrait */}
          <div className="lg:col-span-2 flex justify-center">
            <div className="relative">
              {/* Decorative frame */}
              <div className="absolute -inset-4 bg-gradient-to-br from-brand-blue-200 to-brand-blue-50 rounded-3xl rotate-3" />
              <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-premium-lg border border-slate-100">
                <img
                  src="/raquel-portrait.png"
                  alt={t.about.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-brand-blue-500 to-brand-navy-800 flex items-center justify-center"><span class="text-white font-display font-bold text-6xl">RQ</span></div>';
                  }}
                />
              </div>
              {/* Credential badge */}
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-premium-lg p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-blue-50 rounded-lg flex items-center justify-center">
                  <GraduationCap className="text-brand-blue-500" size={22} />
                </div>
                <div>
                  <p className="text-brand-navy-800 font-display font-bold text-sm">{t.about.credential}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="lg:col-span-3">
            <div className="inline-flex items-center gap-2 bg-brand-blue-50 text-brand-blue-600 text-sm font-semibold px-4 py-2 rounded-full mb-4">
              {t.nav.about}
            </div>
            <h2 className="font-display font-extrabold text-brand-navy-800 text-3xl sm:text-4xl lg:text-5xl mb-6">
              {t.about.title}
            </h2>

            <div className="relative">
              <Quote className="absolute -top-2 -left-2 text-brand-blue-100" size={40} />
              <p className="relative text-brand-navy-800/85 text-lg leading-relaxed pl-8">
                {t.about.text}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 bg-brand-blue-50 text-brand-blue-600 px-4 py-2 rounded-lg text-sm font-medium">
                <span className="w-2 h-2 bg-brand-blue-500 rounded-full" />
                QuickBooks ProAdvisor
              </span>
              <span className="inline-flex items-center gap-2 bg-brand-red-50 text-brand-red-600 px-4 py-2 rounded-lg text-sm font-medium">
                <span className="w-2 h-2 bg-brand-red-500 rounded-full" />
                Bilingual: English & Spanish
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
