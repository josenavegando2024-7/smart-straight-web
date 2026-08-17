import { Phone, Mail, Clock, MapPin, Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t, navigate } = useLanguage();

  return (
    <footer className="bg-brand-navy-900 text-white">
      {/* Top CTA strip */}
      <div className="bg-brand-navy-800 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display font-bold text-2xl mb-1">{t.hero.headline}</h3>
              <p className="text-white/60 text-sm">{t.footer.tagline}</p>
            </div>
            <button
              onClick={() => navigate('diagnostic')}
              className="bg-brand-red-500 hover:bg-brand-red-600 text-white font-semibold px-7 py-3.5 rounded-xl shadow-cta transition-smooth hover:scale-105 whitespace-nowrap"
            >
              {t.nav.cta}
            </button>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/logoSmart.png"
                alt="Smart & Straight Bookkeeping"
                className="h-12 w-12 rounded-lg object-cover ring-2 ring-white/10"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <div>
                <span className="block font-display font-bold text-white text-lg leading-tight">
                  Smart & Straight
                </span>
                <span className="block font-display text-white/50 text-xs leading-tight">
                  Bookkeeping
                </span>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs">
              {t.footer.tagline}
            </p>
          </div>

          {/* Contact */}
          <div className="md:col-span-2">
            <h4 className="font-display font-bold text-white text-lg mb-6">
              {t.footer.contactTitle}
            </h4>
            <div className="grid sm:grid-cols-2 gap-6">
              <a
                href="tel:+16197392367"
                className="group flex items-start gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-smooth"
              >
                <div className="w-12 h-12 bg-brand-red-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="text-brand-red-400" size={22} />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-1">{t.footer.phone}</p>
                  <p className="text-white font-semibold text-lg group-hover:text-brand-red-400 transition-smooth">
                    (619) 739-2367
                  </p>
                </div>
              </a>

              <a
                href="mailto:contact@smartstraightbooks.com"
                className="group flex items-start gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-smooth"
              >
                <div className="w-12 h-12 bg-brand-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="text-brand-blue-300" size={22} />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-1">{t.footer.email}</p>
                  <p className="text-white font-semibold text-base group-hover:text-brand-blue-300 transition-smooth break-all">
                    contact@smartstraightbooks.com
                  </p>
                </div>
              </a>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5">
                <div className="w-12 h-12 bg-success-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="text-success-400" size={22} />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Hours</p>
                  <p className="text-white font-semibold text-sm">{t.footer.hours}</p>
                </div>
              </div>

              <a
                href="http://smartstraightbooks.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-smooth"
              >
                <div className="w-12 h-12 bg-brand-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Globe className="text-brand-blue-300 group-hover:text-brand-blue-200 transition-smooth" size={22} />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Website</p>
                  <p className="text-white font-semibold text-sm group-hover:text-brand-blue-300 transition-smooth">
                    smartstraightbooks.com
                  </p>
                </div>
              </a>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5">
                <div className="w-12 h-12 bg-warning-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-warning-400" size={22} />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Location</p>
                  <p className="text-white font-semibold text-sm">Chula Vista, California 91911</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Smart & Straight Bookkeeping. {t.footer.rights}
          </p>
          <p className="text-white/30 text-xs">
            {t.foundation.text}
          </p>
        </div>
      </div>
    </footer>
  );
}
