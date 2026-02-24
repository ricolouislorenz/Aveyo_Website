import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import { AuthProvider } from "./context/auth-context";
import { CookieProvider } from "./context/cookie-context";
import { AdminLogin } from "./components/admin-login";
import { CookieBanner } from "./components/cookie-banner";
import { AnalyticsTracker } from "./components/analytics-tracker";
import { HomePage } from "./pages/home-page";
import { InvestmentPage } from "./pages/investment-page";
import { ImmobilienPage } from "./pages/immobilien-page";
import { VorsorgePage } from "./pages/vorsorge-page";
import { AboutPage } from "./pages/about-page";
import { TerminPage } from "./pages/termin-page";
import { FinanzcheckPage } from "./pages/finanzcheck-page";
import { KontaktPage } from "./pages/kontakt-page";
import { ImpressumPage } from "./pages/impressum-page";
import { DatenschutzPage } from "./pages/datenschutz-page";
import { ErstinformationenPage } from "./pages/erstinformationen-page";
import { EUTransparenzPage } from "./pages/eu-transparenz-page";
import { AdminDashboard } from "./pages/admin-dashboard";
import { AdminImmobilienPage } from "./pages/admin-immobilien";
import { AdminReviewsPage } from "./pages/admin-reviews";
import { AdminAnalyticsPage } from "./pages/admin-analytics";
import { AdminSettingsPage } from "./pages/admin-settings";
import "@/styles/index.css";

// Placeholder favicon - replace with your actual favicon URL
const faviconImage = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect fill='%23172545' width='100' height='100'/><text y='75' font-size='70' fill='white' font-family='Arial' x='50%' text-anchor='middle'>A</text></svg>";

function Favicon() {
  useEffect(() => {
    // Remove existing favicons
    const existingFavicons = document.querySelectorAll("link[rel*='icon']");
    existingFavicons.forEach(icon => icon.remove());

    // Add new favicon
    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/png';
    link.href = faviconImage;
    document.head.appendChild(link);

    // Also set the page title
    document.title = 'AVEYO - Ihr Makler für Immobilien & Versicherungen';
  }, []);

  return null;
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function KeyboardShortcuts() {
  const [showLogin, setShowLogin] = useState(false);
  const [keysPressed, setKeysPressed] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newKeys = new Set(keysPressed);
      newKeys.add(e.key.toLowerCase());
      setKeysPressed(newKeys);

      // Check for Shift + A + T combination
      if (e.shiftKey && newKeys.has('a') && newKeys.has('t')) {
        e.preventDefault();
        setShowLogin(true);
        setKeysPressed(new Set());
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const newKeys = new Set(keysPressed);
      newKeys.delete(e.key.toLowerCase());
      setKeysPressed(newKeys);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [keysPressed]);

  // Only render AdminLogin when it should be shown
  return showLogin ? <AdminLogin isOpen={true} onClose={() => setShowLogin(false)} /> : null;
}

export default function App() {
  return (
    <AuthProvider>
      <CookieProvider>
        <BrowserRouter>
          <Favicon />
          <ScrollToTop />
          <KeyboardShortcuts />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/investment" element={<InvestmentPage />} />
            <Route path="/immobilien" element={<ImmobilienPage />} />
            <Route path="/vorsorge" element={<VorsorgePage />} />
            <Route path="/ueber-uns" element={<AboutPage />} />
            <Route path="/termin" element={<TerminPage />} />
            <Route path="/finanzcheck" element={<FinanzcheckPage />} />
            <Route path="/kontakt" element={<KontaktPage />} />
            <Route path="/impressum" element={<ImpressumPage />} />
            <Route path="/datenschutz" element={<DatenschutzPage />} />
            <Route path="/erstinformationen" element={<ErstinformationenPage />} />
            <Route path="/eu-transparenz" element={<EUTransparenzPage />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/immobilien" element={<AdminImmobilienPage />} />
            <Route path="/admin/bewertungen" element={<AdminReviewsPage />} />
            <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
            <Route path="/admin/settings" element={<AdminSettingsPage />} />
          </Routes>
          <CookieBanner />
          <AnalyticsTracker />
        </BrowserRouter>
      </CookieProvider>
    </AuthProvider>
  );
}