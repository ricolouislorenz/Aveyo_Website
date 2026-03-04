import { Suspense, lazy, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import { AuthProvider } from "./context/auth-context";
import { CookieProvider } from "./context/cookie-context";
import { AdminLogin } from "./components/admin-login";
import { CookieBanner } from "./components/cookie-banner";
import { AnalyticsTracker } from "./components/analytics-tracker";
import "@/styles/index.css";

const HomePage = lazy(() =>
  import("./pages/home-page").then((m) => ({ default: m.HomePage })),
);
const InvestmentPage = lazy(() =>
  import("./pages/investment-page").then((m) => ({ default: m.InvestmentPage })),
);
const ImmobilienPage = lazy(() =>
  import("./pages/immobilien-page").then((m) => ({ default: m.ImmobilienPage })),
);
const VorsorgePage = lazy(() =>
  import("./pages/vorsorge-page").then((m) => ({ default: m.VorsorgePage })),
);
const AboutPage = lazy(() =>
  import("./pages/about-page").then((m) => ({ default: m.AboutPage })),
);
const TerminPage = lazy(() =>
  import("./pages/termin-page").then((m) => ({ default: m.TerminPage })),
);
const FinanzcheckPage = lazy(() =>
  import("./pages/finanzcheck-page").then((m) => ({ default: m.FinanzcheckPage })),
);
const KontaktPage = lazy(() =>
  import("./pages/kontakt-page").then((m) => ({ default: m.KontaktPage })),
);
const ImpressumPage = lazy(() =>
  import("./pages/impressum-page").then((m) => ({ default: m.ImpressumPage })),
);
const DatenschutzPage = lazy(() =>
  import("./pages/datenschutz-page").then((m) => ({ default: m.DatenschutzPage })),
);
const ErstinformationenPage = lazy(() =>
  import("./pages/erstinformationen-page").then((m) => ({
    default: m.ErstinformationenPage,
  })),
);
const EUTransparenzPage = lazy(() =>
  import("./pages/eu-transparenz-page").then((m) => ({
    default: m.EUTransparenzPage,
  })),
);
const AdminDashboard = lazy(() =>
  import("./pages/admin-dashboard").then((m) => ({ default: m.AdminDashboard })),
);
const AdminImmobilienPage = lazy(() =>
  import("./pages/admin-immobilien").then((m) => ({
    default: m.AdminImmobilienPage,
  })),
);
const AdminReviewsPage = lazy(() =>
  import("./pages/admin-reviews").then((m) => ({ default: m.AdminReviewsPage })),
);
const AdminAnalyticsPage = lazy(() =>
  import("./pages/admin-analytics").then((m) => ({
    default: m.AdminAnalyticsPage,
  })),
);
const AdminSettingsPage = lazy(() =>
  import("./pages/admin-settings").then((m) => ({
    default: m.AdminSettingsPage,
  })),
);

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

      if (e.shiftKey && newKeys.has("a") && newKeys.has("t")) {
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

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [keysPressed]);

  return showLogin ? (
    <AdminLogin isOpen={true} onClose={() => setShowLogin(false)} />
  ) : null;
}

function PageLoader() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="h-10 w-10 rounded-full border-4 border-[#172545]/20 border-t-[#172545] animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CookieProvider>
        <BrowserRouter>
          <ScrollToTop />
          <KeyboardShortcuts />
          <Suspense fallback={<PageLoader />}>
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
              <Route
                path="/erstinformationen"
                element={<ErstinformationenPage />}
              />
              <Route path="/eu-transparenz" element={<EUTransparenzPage />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route
                path="/admin/immobilien"
                element={<AdminImmobilienPage />}
              />
              <Route
                path="/admin/bewertungen"
                element={<AdminReviewsPage />}
              />
              <Route
                path="/admin/analytics"
                element={<AdminAnalyticsPage />}
              />
              <Route path="/admin/settings" element={<AdminSettingsPage />} />
            </Routes>
          </Suspense>
          <CookieBanner />
          <AnalyticsTracker />
        </BrowserRouter>
      </CookieProvider>
    </AuthProvider>
  );
}