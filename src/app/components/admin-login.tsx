import { useState, useEffect } from "react";
import { useAuth } from "../context/auth-context";
import { useNavigate } from "react-router";
import { Lock, User, X, AlertCircle } from "lucide-react";

interface AdminLoginProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminLogin({ isOpen, onClose }: AdminLoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setUsername("");
      setPassword("");
      setError("");
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const success = await login(username, password);

      if (success) {
        onClose();
        navigate("/admin/dashboard");
      } else {
        setError("Ungültige Anmeldedaten oder Server nicht erreichbar. Bitte prüfen Sie die Browser-Konsole für Details.");
      }
    } catch (err) {
      console.error("Login submission error:", err);
      setError("Verbindungsfehler. Bitte prüfen Sie die Browser-Konsole für Details.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#586477] hover:text-[#172545] transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#172545] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl text-[#172545] font-semibold mb-2">
            Admin Login
          </h2>
          <p className="text-[#586477]">
            Melden Sie sich an, um den Admin-Bereich zu öffnen
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#172545] mb-2">
              Benutzername
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#586477]" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-[#586477]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#172545]"
                placeholder="Benutzername eingeben"
                required
                autoFocus
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#172545] mb-2">
              Passwort
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#586477]" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-[#586477]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#172545]"
                placeholder="Passwort eingeben"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#172545] text-white rounded-xl hover:bg-[#0d1a30] transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Anmeldung läuft..." : "Anmelden"}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-[#586477]/20">
          <p className="text-sm text-[#586477] text-center">
            Hinweis: Drücken Sie <kbd className="px-2 py-1 bg-gray-100 rounded border border-gray-300 text-xs font-mono">Shift + A + T</kbd> für Admin-Login
          </p>
        </div>
      </div>
    </div>
  );
}