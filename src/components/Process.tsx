import { CalendarClock, Search, ClipboardList } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Process() {
  const { t } = useLanguage();

  const steps = [
    { icon: CalendarClock, title: t.process.p1_t, desc: t.process.p1_d, num: '01' },
    { icon: Search, title: t.process.p2_t, desc: t.process.p2_d, num: '02' },
    { icon: ClipboardList, title: t.process.p3_t, desc: t.process.p3_d, num: '03' },
  ];

  return (
    <section id="process" className="py-24 bg-bg-substrate">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-brand-blue-50 text-brand-blue-600 text-sm font-semibold px-4 py-2 rounded-full mb-4">
            {t.nav.process}
          </div>
          <h2 className="font-display font-extrabold text-brand-navy-800 text-3xl sm:text-4xl lg:text-5xl mb-4">
            {t.process.title}
          </h2>
          <div className="w-20 h-1 bg-brand-red-500 mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-20 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-brand-blue-200 via-brand-blue-300 to-brand-blue-200" />

          {steps.map(({ icon: Icon, title, desc, num }, i) => (
            <div
              key={i}
              className="relative bg-white rounded-2xl p-8 shadow-premium hover:shadow-premium-lg transition-smooth hover:-translate-y-1 text-center"
            >
              {/* Step number watermark */}
              <span className="absolute top-4 right-5 font-display font-extrabold text-brand-blue-50 text-5xl select-none">
                {num}
              </span>

              <div className="relative w-16 h-16 bg-brand-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-premium">
                <Icon className="text-white" size={28} />
                {/* Pulse ring */}
                <span className="absolute inset-0 rounded-2xl bg-brand-blue-500 animate-ping opacity-20" />
              </div>

              <h3 className="font-display font-bold text-brand-navy-800 text-xl mb-3">
                {title}
              </h3>
              <p className="text-brand-navy-800/80 text-sm leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
