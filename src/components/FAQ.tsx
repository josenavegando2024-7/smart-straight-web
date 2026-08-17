import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function FAQ() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = t.faq.items;

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-brand-blue-50 text-brand-blue-600 text-sm font-semibold px-4 py-2 rounded-full mb-4">
            {t.nav.faq}
          </div>
          <h2 className="font-display font-extrabold text-brand-navy-800 text-3xl sm:text-4xl lg:text-5xl mb-4">
            {t.faq.title}
          </h2>
          <div className="w-20 h-1 bg-brand-red-500 mx-auto rounded-full" />
        </div>

        <div className="space-y-4">
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`rounded-xl border transition-smooth overflow-hidden ${isOpen ? 'border-brand-blue-200 shadow-premium' : 'border-brand-navy-800/10'}`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group"
                >
                  <span className={`font-display font-semibold text-base sm:text-lg transition-smooth ${isOpen ? 'text-brand-blue-600' : 'text-brand-navy-800 group-hover:text-brand-blue-500'}`}>
                    {item.q}
                  </span>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-smooth ${isOpen ? 'bg-brand-blue-500 text-white' : 'bg-brand-blue-50 text-brand-blue-500'}`}>
                    <ChevronDown
                      size={18}
                      className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </div>
                </button>
                <div
                  className="grid transition-all duration-300 ease-in-out"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-brand-navy-800/80 text-sm sm:text-base leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
