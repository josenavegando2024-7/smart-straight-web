import { BookOpen, Sparkles, Settings, RefreshCw, Layers, ClipboardCheck, FolderTree, Users, type LucideIcon } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Services() {
  const { t } = useLanguage();

  const services: { icon: LucideIcon; key: string; gradient: string }[] = [
    { icon: BookOpen, key: 's1', gradient: 'from-brand-blue-400 to-brand-blue-600' },
    { icon: Sparkles, key: 's2', gradient: 'from-brand-red-400 to-brand-red-600' },
    { icon: Settings, key: 's3', gradient: 'from-brand-navy-400 to-brand-navy-600' },
    { icon: RefreshCw, key: 's4', gradient: 'from-brand-blue-400 to-brand-navy-500' },
    { icon: Layers, key: 's5', gradient: 'from-brand-red-400 to-brand-red-600' },
    { icon: ClipboardCheck, key: 's6', gradient: 'from-brand-navy-400 to-brand-blue-500' },
    { icon: FolderTree, key: 's7', gradient: 'from-brand-blue-400 to-brand-blue-600' },
    { icon: Users, key: 's8', gradient: 'from-brand-red-400 to-brand-red-600' },
  ];

  return (
    <section id="services" className="py-24 bg-bg-substrate">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-brand-blue-50 text-brand-blue-600 text-sm font-semibold px-4 py-2 rounded-full mb-4">
            <Layers size={16} />
            {t.nav.services}
          </div>
          <h2 className="font-display font-extrabold text-brand-navy-800 text-3xl sm:text-4xl lg:text-5xl mb-4">
            {t.services.title}
          </h2>
          <div className="w-20 h-1 bg-brand-red-500 mx-auto rounded-full" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map(({ icon: Icon, key, gradient }, i) => (
            <div
              key={key}
              className="group bg-white rounded-2xl p-6 shadow-premium hover:shadow-premium-lg transition-smooth hover:-translate-y-1 border border-brand-navy-800/5"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-5 transition-smooth group-hover:scale-110 group-hover:rotate-3 shadow-premium`}>
                <Icon
                  className="text-white transition-smooth"
                  size={28}
                />
                <div className="absolute inset-0 rounded-2xl bg-white/0 group-hover:bg-white/10 transition-smooth" />
              </div>
              <h3 className="font-display font-bold text-brand-navy-800 text-lg mb-2 leading-snug">
                {t.services[key as keyof typeof t.services]}
              </h3>
              <p className="text-brand-navy-800/80 text-sm leading-relaxed">
                {t.services[`${key}_d` as keyof typeof t.services]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
