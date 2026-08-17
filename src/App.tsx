import { LanguageProvider, useLanguage } from '@/context/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import DiagnosticPage from '@/pages/DiagnosticPage';

function AppContent() {
  const { route } = useLanguage();

  return (
    <div className="min-h-screen bg-bg-substrate flex flex-col">
      <Header />
      <main className="flex-1">
        {route === 'diagnostic' ? <DiagnosticPage /> : <HomePage />}
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
