import { useState } from "react";
import { AdminLayout } from "@/app/components/admin-layout";
import { Shield, Eye, EyeOff, AlertTriangle, CheckCircle, Key } from "lucide-react";
import { projectId, publicAnonKey } from "/utils/supabase/info";

export function AdminSettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    // Validierung
    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage({ type: "error", text: "Bitte alle Felder ausfüllen" });
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "Neue Passwörter stimmen nicht überein" });
      return;
    }

    if (newPassword.length < 8) {
      setMessage({ type: "error", text: "Neues Passwort muss mindestens 8 Zeichen lang sein" });
      return;
    }

    // Passwort-Stärke prüfen
    const hasUpperCase = /[A-Z]/.test(newPassword);
    const hasLowerCase = /[a-z]/.test(newPassword);
    const hasNumbers = /\d/.test(newPassword);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);

    if (!hasUpperCase || !hasLowerCase || !hasNumbers) {
      setMessage({ 
        type: "error", 
        text: "Passwort muss Groß- und Kleinbuchstaben sowie Zahlen enthalten" 
      });
      return;
    }

    setIsLoading(true);

    try {
      // Aktuelles Passwort verifizieren
      const loginResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-78b4cf15/admin/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            username: "admin",
            password: currentPassword,
          }),
        }
      );

      const loginData = await loginResponse.json();

      if (!loginData.success) {
        setMessage({ type: "error", text: "Aktuelles Passwort ist falsch" });
        setIsLoading(false);
        return;
      }

      // Neues Passwort setzen
      const updateResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-78b4cf15/admin/change-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
          }),
        }
      );

      const updateData = await updateResponse.json();

      if (updateData.success) {
        setMessage({ 
          type: "success", 
          text: "Passwort erfolgreich geändert! Bitte merken Sie sich Ihr neues Passwort." 
        });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setMessage({ 
          type: "error", 
          text: updateData.message || "Fehler beim Ändern des Passworts" 
        });
      }
    } catch (error) {
      console.error("Error changing password:", error);
      setMessage({ 
        type: "error", 
        text: "Verbindungsfehler. Bitte prüfen Sie die Browser-Konsole." 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: "", color: "" };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

    if (strength <= 2) return { strength, label: "Schwach", color: "bg-red-500" };
    if (strength <= 4) return { strength, label: "Mittel", color: "bg-yellow-500" };
    return { strength, label: "Stark", color: "bg-green-500" };
  };

  const passwordStrength = getPasswordStrength(newPassword);

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-[#172545] rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#172545]">Admin-Einstellungen</h1>
              <p className="text-[#586477]">Sicherheitseinstellungen verwalten</p>
            </div>
          </div>
        </div>

        {/* Change Password Form */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-[#172545] to-[#2a3f6f] px-8 py-6">
            <div className="flex items-center gap-3 text-white">
              <Key className="w-6 h-6" />
              <h2 className="text-2xl font-semibold">Passwort ändern</h2>
            </div>
          </div>

          <form onSubmit={handleChangePassword} className="p-8 space-y-6">
            {/* Current Password */}
            <div>
              <label className="block text-sm font-semibold text-[#172545] mb-2">
                Aktuelles Passwort
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#172545] focus:border-transparent"
                  placeholder="Aktuelles Passwort eingeben"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#172545]"
                >
                  {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm font-semibold text-[#172545] mb-2">
                Neues Passwort
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#172545] focus:border-transparent"
                  placeholder="Neues Passwort eingeben (min. 8 Zeichen)"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#172545]"
                >
                  {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {newPassword && (
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600">Passwortstärke:</span>
                    <span className={`text-xs font-semibold ${
                      passwordStrength.label === "Stark" ? "text-green-600" :
                      passwordStrength.label === "Mittel" ? "text-yellow-600" :
                      "text-red-600"
                    }`}>
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                      style={{ width: `${(passwordStrength.strength / 6) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Password Requirements */}
              <div className="mt-3 space-y-1">
                <p className="text-xs text-gray-600 font-semibold">Anforderungen:</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className={newPassword.length >= 8 ? "text-green-600" : "text-gray-500"}>
                    ✓ Mindestens 8 Zeichen
                  </div>
                  <div className={/[A-Z]/.test(newPassword) ? "text-green-600" : "text-gray-500"}>
                    ✓ Großbuchstaben
                  </div>
                  <div className={/[a-z]/.test(newPassword) ? "text-green-600" : "text-gray-500"}>
                    ✓ Kleinbuchstaben
                  </div>
                  <div className={/\d/.test(newPassword) ? "text-green-600" : "text-gray-500"}>
                    ✓ Zahlen
                  </div>
                  <div className={/[!@#$%^&*(),.?":{}|<>]/.test(newPassword) ? "text-green-600" : "text-gray-500"}>
                    ✓ Sonderzeichen (empfohlen)
                  </div>
                </div>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-[#172545] mb-2">
                Neues Passwort bestätigen
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#172545] focus:border-transparent"
                  placeholder="Neues Passwort wiederholen"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#172545]"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {confirmPassword && newPassword !== confirmPassword && (
                <p className="text-xs text-red-600 mt-2">Passwörter stimmen nicht überein</p>
              )}
            </div>

            {/* Message */}
            {message && (
              <div
                className={`p-4 rounded-xl flex items-start gap-3 ${
                  message.type === "success"
                    ? "bg-green-50 border border-green-200"
                    : "bg-red-50 border border-red-200"
                }`}
              >
                {message.type === "success" ? (
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                )}
                <p
                  className={`text-sm ${
                    message.type === "success" ? "text-green-800" : "text-red-800"
                  }`}
                >
                  {message.text}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex gap-4 pt-4 border-t border-gray-200">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-[#172545] text-white px-6 py-3 rounded-xl hover:bg-[#0d1a30] transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
              >
                {isLoading ? "Wird gespeichert..." : "Passwort ändern"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setCurrentPassword("");
                  setNewPassword("");
                  setConfirmPassword("");
                  setMessage(null);
                }}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-semibold"
              >
                Abbrechen
              </button>
            </div>
          </form>
        </div>

        {/* Additional Info */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">💡 Tipps für ein sicheres Passwort</h3>
          <ul className="text-sm text-blue-800 space-y-2 ml-5 list-disc">
            <li>Verwenden Sie eine Passphrase aus mehreren zufälligen Wörtern</li>
            <li>Mischen Sie Groß-/Kleinbuchstaben, Zahlen und Sonderzeichen</li>
            <li>Vermeiden Sie persönliche Informationen (Name, Geburtsdatum, etc.)</li>
            <li>Verwenden Sie einen Passwort-Manager (z.B. 1Password, Bitwarden)</li>
            <li>Ändern Sie das Passwort regelmäßig (alle 3-6 Monate)</li>
            <li>Verwenden Sie für jeden Dienst ein einzigartiges Passwort</li>
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
}
