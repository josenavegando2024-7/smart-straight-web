import { BookHeart } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Foundation() {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-brand-navy-800 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-brand-blue-400 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-brand-red-500 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-blue-500/20 rounded-2xl mb-6">
          <BookHeart className="text-brand-blue-300" size={32} />
        </div>
        <p className="font-display text-white/90 text-xl sm:text-2xl leading-relaxed italic">
          {t.foundation.text}
        </p>
      </div>
    </section>
  );
}
