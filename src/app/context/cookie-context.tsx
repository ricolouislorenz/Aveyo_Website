import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface CookiePreferences {
  essential: boolean; // Always true
  analytics: boolean;
  marketing: boolean;
}

interface CookieContextType {
  preferences: CookiePreferences;
  hasConsent: boolean;
  showBanner: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  savePreferences: (prefs: CookiePreferences) => void;
  openSettings: () => void;
  closeBanner: () => void;
}

const CookieContext = createContext<CookieContextType | undefined>(undefined);

const COOKIE_CONSENT_KEY = "aveyo_cookie_consent";
const COOKIE_PREFERENCES_KEY = "aveyo_cookie_preferences";

export function CookieProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false,
  });
  const [hasConsent, setHasConsent] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  // Load preferences on mount
  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    const savedPrefs = localStorage.getItem(COOKIE_PREFERENCES_KEY);

    if (consent === "true" && savedPrefs) {
      const prefs = JSON.parse(savedPrefs);
      setPreferences(prefs);
      setHasConsent(true);
      setShowBanner(false);
    } else {
      // Show banner if no consent yet
      setShowBanner(true);
    }
  }, []);

  const acceptAll = () => {
    const prefs = {
      essential: true,
      analytics: true,
      marketing: true,
    };
    savePreferences(prefs);
  };

  const rejectAll = () => {
    const prefs = {
      essential: true,
      analytics: false,
      marketing: false,
    };
    savePreferences(prefs);
  };

  const savePreferences = (prefs: CookiePreferences) => {
    // Essential cookies always enabled
    const finalPrefs = { ...prefs, essential: true };
    
    localStorage.setItem(COOKIE_CONSENT_KEY, "true");
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(finalPrefs));
    
    setPreferences(finalPrefs);
    setHasConsent(true);
    setShowBanner(false);
  };

  const openSettings = () => {
    setShowBanner(true);
  };

  const closeBanner = () => {
    setShowBanner(false);
  };

  return (
    <CookieContext.Provider
      value={{
        preferences,
        hasConsent,
        showBanner,
        acceptAll,
        rejectAll,
        savePreferences,
        openSettings,
        closeBanner,
      }}
    >
      {children}
    </CookieContext.Provider>
  );
}

export function useCookies() {
  const context = useContext(CookieContext);
  if (!context) {
    throw new Error("useCookies must be used within CookieProvider");
  }
  return context;
}