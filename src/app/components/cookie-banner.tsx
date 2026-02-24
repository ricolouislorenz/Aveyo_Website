import { useState } from "react";
import { useCookies } from "../context/cookie-context";
import { Cookie, X, Settings, Shield, BarChart3, Megaphone } from "lucide-react";
import { DatenschutzModal } from "./datenschutz-modal";

export function CookieBanner() {
  const {
    preferences,
    showBanner,
    acceptAll,
    rejectAll,
    savePreferences,
    closeBanner,
  } = useCookies();

  const [showSettings, setShowSettings] = useState(false);
  const [tempPreferences, setTempPreferences] = useState(preferences);
  const [showDatenschutzModal, setShowDatenschutzModal] = useState(false);

  if (!showBanner) return null;

  const handleSaveSettings = () => {
    savePreferences(tempPreferences);
    setShowSettings(false);
  };

  const handleAcceptAll = () => {
    acceptAll();
    setShowSettings(false);
  };

  const handleRejectAll = () => {
    rejectAll();
    setShowSettings(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end md:items-center justify-center z-[9999] p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-[#172545] text-white p-6 rounded-t-2xl">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Cookie className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">Cookie-Einstellungen</h2>
                <p className="text-white/80 text-sm mt-1">
                  Wir respektieren Ihre Privatsphäre
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {!showSettings ? (
            // Simple View
            <div className="space-y-6">
              <div>
                <p className="text-[#172545] leading-relaxed">
                  Wir verwenden Cookies, um Ihre Erfahrung auf unserer Website zu
                  verbessern. Essenzielle Cookies sind für die Grundfunktionen
                  erforderlich. Analytics-Cookies helfen uns, unsere Website zu
                  optimieren.
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-[#172545]">
                      <strong>Datenschutz:</strong> Wir anonymisieren alle Daten
                      und geben diese nicht an Dritte weiter. Sie können Ihre
                      Einstellungen jederzeit ändern.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAcceptAll}
                  className="flex-1 px-6 py-3 bg-[#172545] text-white rounded-xl hover:bg-[#0d1a30] transition-all duration-300 font-semibold"
                >
                  Alle akzeptieren
                </button>
                <button
                  onClick={handleRejectAll}
                  className="flex-1 px-6 py-3 border-2 border-[#586477]/30 text-[#172545] rounded-xl hover:bg-gray-50 transition-all duration-300 font-semibold"
                >
                  Nur essenzielle
                </button>
                <button
                  onClick={() => setShowSettings(true)}
                  className="flex-1 px-6 py-3 border-2 border-[#172545] text-[#172545] rounded-xl hover:bg-[#172545] hover:text-white transition-all duration-300 font-semibold flex items-center justify-center gap-2"
                >
                  <Settings className="w-5 h-5" />
                  Einstellungen
                </button>
              </div>

              <div className="text-center">
                <button
                  onClick={() => setShowDatenschutzModal(true)}
                  className="text-sm text-[#586477] hover:text-[#172545] underline"
                >
                  Datenschutzerklärung
                </button>
              </div>
            </div>
          ) : (
            // Detailed Settings View
            <div className="space-y-6">
              <div className="space-y-4">
                {/* Essential Cookies */}
                <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <Shield className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <h3 className="text-[#172545] font-semibold text-lg mb-1">
                          Essenzielle Cookies
                        </h3>
                        <p className="text-[#586477] text-sm mb-2">
                          Diese Cookies sind für die Grundfunktionen der Website
                          erforderlich und können nicht deaktiviert werden.
                        </p>
                        <ul className="text-sm text-[#586477] space-y-1 list-disc list-inside">
                          <li>Session-Management</li>
                          <li>Sicherheitsfunktionen</li>
                          <li>Cookie-Einstellungen speichern</li>
                        </ul>
                      </div>
                    </div>
                    <div className="flex items-center ml-4">
                      <span className="text-sm text-green-600 font-semibold">
                        Immer aktiv
                      </span>
                    </div>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="border border-gray-200 rounded-xl p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <BarChart3 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <h3 className="text-[#172545] font-semibold text-lg mb-1">
                          Analytics Cookies
                        </h3>
                        <p className="text-[#586477] text-sm mb-2">
                          Helfen uns zu verstehen, wie Besucher unsere Website
                          nutzen, damit wir sie verbessern können.
                        </p>
                        <ul className="text-sm text-[#586477] space-y-1 list-disc list-inside">
                          <li>Seitenaufrufe und Verweildauer</li>
                          <li>Gerätetyp und Browser</li>
                          <li>Anonymisierte Standortdaten</li>
                          <li>Besucherfluss und Interaktionen</li>
                        </ul>
                      </div>
                    </div>
                    <div className="flex items-center ml-4">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={tempPreferences.analytics}
                          onChange={(e) =>
                            setTempPreferences({
                              ...tempPreferences,
                              analytics: e.target.checked,
                            })
                          }
                          className="sr-only peer"
                        />
                        <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Marketing Cookies */}
                <div className="border border-gray-200 rounded-xl p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <Megaphone className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <h3 className="text-[#172545] font-semibold text-lg mb-1">
                          Marketing Cookies
                        </h3>
                        <p className="text-[#586477] text-sm mb-2">
                          Werden verwendet, um Ihnen relevante Werbung zu zeigen
                          und die Effektivität unserer Kampagnen zu messen.
                        </p>
                        <ul className="text-sm text-[#586477] space-y-1 list-disc list-inside">
                          <li>Personalisierte Werbung</li>
                          <li>Remarketing</li>
                          <li>Social Media Integration</li>
                        </ul>
                      </div>
                    </div>
                    <div className="flex items-center ml-4">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={tempPreferences.marketing}
                          onChange={(e) =>
                            setTempPreferences({
                              ...tempPreferences,
                              marketing: e.target.checked,
                            })
                          }
                          className="sr-only peer"
                        />
                        <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={handleAcceptAll}
                  className="flex-1 px-6 py-3 bg-[#172545] text-white rounded-xl hover:bg-[#0d1a30] transition-all duration-300 font-semibold"
                >
                  Alle akzeptieren
                </button>
                <button
                  onClick={handleSaveSettings}
                  className="flex-1 px-6 py-3 border-2 border-[#172545] text-[#172545] rounded-xl hover:bg-[#172545] hover:text-white transition-all duration-300 font-semibold"
                >
                  Auswahl speichern
                </button>
                <button
                  onClick={handleRejectAll}
                  className="flex-1 px-6 py-3 border-2 border-[#586477]/30 text-[#172545] rounded-xl hover:bg-gray-50 transition-all duration-300 font-semibold"
                >
                  Alle ablehnen
                </button>
              </div>

              <div className="text-center">
                <button
                  onClick={() => setShowDatenschutzModal(true)}
                  className="text-sm text-[#586477] hover:text-[#172545] underline"
                >
                  Datenschutzerklärung
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <DatenschutzModal
        isOpen={showDatenschutzModal}
        onClose={() => setShowDatenschutzModal(false)}
      />
    </div>
  );
}