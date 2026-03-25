import { createContext, useContext, useState, useEffect, useRef, ReactNode, useCallback } from "react";
import { projectId, publicAnonKey } from "/utils/supabase/info";

const INACTIVITY_TIMEOUT_MS = 5 * 60 * 1000; // 5 Minuten
const SESSION_POLL_INTERVAL_MS = 30 * 1000;   // alle 30 Sekunden prüfen

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const apiBase = `https://${projectId}.supabase.co/functions/v1/make-server-78b4cf15`;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const inactivityTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pollInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("adminSessionToken");
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    if (pollInterval.current) clearInterval(pollInterval.current);
  }, []);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(logout, INACTIVITY_TIMEOUT_MS);
  }, [logout]);

  // Inaktivitäts-Timer: logout nach 5 Minuten ohne Aktion
  useEffect(() => {
    if (!isAuthenticated) return;

    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];
    const handler = () => resetInactivityTimer();

    resetInactivityTimer();
    events.forEach((e) => window.addEventListener(e, handler, { passive: true }));

    return () => {
      events.forEach((e) => window.removeEventListener(e, handler));
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, [isAuthenticated, resetInactivityTimer]);

  // Session-Polling: erkennt wenn sich jemand anderes einloggt
  useEffect(() => {
    if (!isAuthenticated) return;

    const validateSession = async () => {
      const token = localStorage.getItem("adminSessionToken");
      if (!token) { logout(); return; }

      try {
        const res = await fetch(`${apiBase}/admin/session/validate`, {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
            "X-Session-Token": token,
          },
        });
        const result = await res.json();
        if (!result.valid) logout();
      } catch {
        // Netzwerkfehler → nicht ausloggen, könnte temporär sein
      }
    };

    pollInterval.current = setInterval(validateSession, SESSION_POLL_INTERVAL_MS);
    return () => { if (pollInterval.current) clearInterval(pollInterval.current); };
  }, [isAuthenticated, logout]);

  // Beim Laden: bestehende Session wiederherstellen
  useEffect(() => {
    const adminLoggedIn = localStorage.getItem("adminLoggedIn");
    const sessionToken = localStorage.getItem("adminSessionToken");
    if (adminLoggedIn === "true" && sessionToken) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(`${apiBase}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) return false;

      const result = await response.json();

      if (result.success) {
        setIsAuthenticated(true);
        localStorage.setItem("adminLoggedIn", "true");
        localStorage.setItem("adminSessionToken", result.sessionToken);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
