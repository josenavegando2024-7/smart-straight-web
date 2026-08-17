import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import localesData from '@/locales.json';

type Lang = 'en' | 'es';
type Route = 'home' | 'diagnostic';

type LocaleData = (typeof localesData)['en'];

interface LanguageContextValue {
  lang: Lang;
  route: Route;
  t: LocaleData;
  setLang: (lang: Lang) => void;
  navigate: (route: Route) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function parsePath(pathname: string): { lang: Lang; route: Route } {
  const clean = pathname.replace(/\/+$/, '');
  const isSpanish = clean.startsWith('/es');
  const rest = isSpanish ? clean.slice(3) : clean;
  const route: Route = rest === '/diagnostic' ? 'diagnostic' : 'home';
  return { lang: isSpanish ? 'es' : 'en', route };
}

function buildPath(lang: Lang, route: Route): string {
  const parts: string[] = [];
  if (lang === 'es') parts.push('es');
  if (route === 'diagnostic') parts.push('diagnostic');
  return '/' + parts.join('/');
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(() => parsePath(window.location.pathname));

  useEffect(() => {
    const onPop = () => setState(parsePath(window.location.pathname));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    document.documentElement.lang = state.lang;
  }, [state.lang]);

  const navigate = useCallback((route: Route) => {
    const path = buildPath(state.lang, route);
    window.history.pushState({}, '', path);
    setState((prev) => ({ ...prev, route }));
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [state.lang]);

  const setLang = useCallback((lang: Lang) => {
    const path = buildPath(lang, state.route);
    window.history.pushState({}, '', path);
    setState((prev) => ({ ...prev, lang }));
  }, [state.route]);

  const value: LanguageContextValue = {
    lang: state.lang,
    route: state.route,
    t: localesData[state.lang] as LocaleData,
    setLang,
    navigate,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
