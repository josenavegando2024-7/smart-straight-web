import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Header() {
  const { t, lang, setLang, navigate } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const navItems = [
    { label: t.nav.services, href: '#services' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.process, href: '#process' },
    { label: t.nav.faq, href: '#faq' },
  ];

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (window.location.pathname.includes('/diagnostic')) {
      navigate('home');
      setTimeout(() => {
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCTA = () => {
    setMobileOpen(false);
    navigate('diagnostic');
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 bg-brand-blue-500 transition-smooth ${scrolled ? 'shadow-premium-lg' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <button
              onClick={() => navigate('home')}
              className="flex items-center gap-3 group flex-shrink-0"
            >
              <div className="flex items-center space-x-3">
                <img
                  src="/logoSmart copy.png"
                  alt="Smart & Straight Bookkeeping Logo"
                  className="h-12 w-auto object-contain block opacity-100"
                  onError={(e) => { (e.target as HTMLImageElement).style.borderColor = 'red'; }}
                />
                <span className="hidden sm:block font-bold text-lg tracking-tight text-white">
                  Smart & Straight <span className="text-brand-red-500">Bookkeeping</span>
                </span>
              </div>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="text-white/80 hover:text-white text-sm font-medium transition-smooth relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-red-500 group-hover:w-full transition-all duration-300" />
                </button>
              ))}
            </nav>

            {/* Right side: language switcher + CTA */}
            <div className="flex items-center gap-4 flex-shrink-0">
              <div className="hidden sm:flex items-center gap-1.5 text-sm font-semibold">
                <button
                  onClick={() => setLang('en')}
                  className={`px-2 py-1 rounded transition-smooth ${lang === 'en' ? 'text-white bg-white/15' : 'text-white/60 hover:text-white/80'}`}
                >
                  EN
                </button>
                <span className="text-white/40">|</span>
                <button
                  onClick={() => setLang('es')}
                  className={`px-2 py-1 rounded transition-smooth ${lang === 'es' ? 'text-white bg-white/15' : 'text-white/60 hover:text-white/80'}`}
                >
                  ES
                </button>
              </div>

              <button
                onClick={handleCTA}
                className="hidden sm:inline-flex items-center gap-2 bg-brand-red-500 hover:bg-brand-red-600 text-white font-semibold text-sm px-5 py-2.5 rounded-lg shadow-cta transition-smooth hover:scale-105"
              >
                {t.nav.cta}
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden text-white p-2 -mr-2"
                aria-label="Open menu"
              >
                <Menu size={26} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-brand-navy-900/50 backdrop-blur-sm animate-fade-in"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer */}
          <div className="absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-brand-blue-500 shadow-premium-lg animate-slide-in flex flex-col">
            {/* Drawer header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 flex-shrink-0">
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-white text-base">Menu</span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="text-white/80 hover:text-white p-2 -mr-2"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Nav items */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="block w-full text-left text-white/80 hover:text-white hover:bg-white/10 font-medium py-3 px-4 rounded-lg transition-smooth"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Bottom section: language + CTA */}
            <div className="px-6 py-6 border-t border-white/10 space-y-4 flex-shrink-0">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setLang('en')}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-smooth ${lang === 'en' ? 'text-white bg-white/15' : 'text-white/60 hover:text-white/80'}`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLang('es')}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-smooth ${lang === 'es' ? 'text-white bg-white/15' : 'text-white/60 hover:text-white/80'}`}
                >
                  ES
                </button>
              </div>
              <button
                onClick={handleCTA}
                className="w-full bg-brand-red-500 hover:bg-brand-red-600 text-white font-semibold py-3.5 rounded-lg shadow-cta transition-smooth"
              >
                {t.nav.cta}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
