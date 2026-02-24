import { useState, useEffect } from "react";
import { AdminLayout } from "@/app/components/admin-layout";
import {
  TrendingUp,
  Users,
  Eye,
  Clock,
  Monitor,
  Smartphone,
  Tablet,
  Chrome,
  Calendar,
  MousePointerClick,
  Trash2,
  Globe,
  MapPin,
} from "lucide-react";
import { projectId, publicAnonKey } from "/utils/supabase/info";

interface AnalyticsStats {
  range: string;
  totalPageViews: number;
  uniqueVisitors: number;
  totalSessions: number;
  avgPageViewsPerSession: string;
  devices: Record<string, number>;
  browsers: Record<string, number>;
  topPages: { path: string; count: number }[];
  eventsByCategory: Record<string, number>;
  dailyViews: Record<string, number>;
  totalEvents: number;
  topCountries: { country: string; count: number }[];
  topCities: { city: string; country: string; count: number }[];
}

export function AdminAnalyticsPage() {
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("30d");
  const [cleanupLoading, setCleanupLoading] = useState(false);

  const apiUrl = `https://${projectId}.supabase.co/functions/v1/make-server-78b4cf15`;

  useEffect(() => {
    fetchStats();
  }, [timeRange]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/analytics/stats?range=${timeRange}`, {
        headers:{ Authorization: `Bearer ${publicAnonKey}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const result = await response.json();
      if (result.success) {
        setStats(result.data);
      }
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCleanup = async () => {
    if (!confirm("Möchten Sie wirklich alle Analytics-Daten älter als 90 Tage löschen?"))
      return;

    try {
      setCleanupLoading(true);
      const response = await fetch(`${apiUrl}/analytics/cleanup?days=90`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${publicAnonKey}`,
        },
      });

      const result = await response.json();
      if (result.success) {
        alert(`${result.deleted} alte Einträge wurden gelöscht.`);
        fetchStats();
      }
    } catch (error) {
      console.error("Error cleaning up analytics:", error);
      alert("Fehler beim Löschen der Daten");
    } finally {
      setCleanupLoading(false);
    }
  };

  const timeRangeOptions = [
    { value: "24h", label: "Letzte 24 Stunden" },
    { value: "7d", label: "Letzte 7 Tage" },
    { value: "30d", label: "Letzte 30 Tage" },
    { value: "90d", label: "Letzte 90 Tage" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-[#172545] mb-2">
              Analytics & Tracking
            </h1>
            <p className="text-[#586477]">
              Besucherstatistiken und Nutzerverhalten im Überblick
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Time Range Selector */}
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-3 border border-[#586477]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#172545] bg-white"
            >
              {timeRangeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* Cleanup Button */}
            <button
              onClick={handleCleanup}
              disabled={cleanupLoading}
              className="flex items-center gap-2 px-4 py-3 border border-red-200 text-red-600 rounded-xl hover:bg-red-50 transition-all duration-300 disabled:opacity-50"
              title="Alte Daten löschen (DSGVO)"
            >
              <Trash2 className="w-5 h-5" />
              <span>Bereinigen (90+ Tage)</span>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <p className="text-[#586477]">Lade Analytics...</p>
          </div>
        ) : !stats || stats.totalPageViews === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-200">
            <Eye className="w-16 h-16 mx-auto mb-4 text-[#586477]/40" />
            <h3 className="text-xl font-semibold text-[#172545] mb-2">
              Noch keine Tracking-Daten
            </h3>
            <p className="text-[#586477] mb-4">
              Sobald Besucher die Website nutzen und Cookies akzeptieren, werden hier
              Statistiken angezeigt.
            </p>
            <p className="text-sm text-[#586477]/70">
              Tipp: Besuchen Sie die Website selbst und akzeptieren Sie die
              Analytics-Cookies
            </p>
          </div>
        ) : (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Eye className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-[#586477] text-sm">Seitenaufrufe</h3>
                </div>
                <p className="text-[#172545] text-3xl font-bold">
                  {stats.totalPageViews.toLocaleString("de-DE")}
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-[#586477] text-sm">Unique Visitors</h3>
                </div>
                <p className="text-[#172545] text-3xl font-bold">
                  {stats.uniqueVisitors.toLocaleString("de-DE")}
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-[#586477] text-sm">Sessions</h3>
                </div>
                <p className="text-[#172545] text-3xl font-bold">
                  {stats.totalSessions.toLocaleString("de-DE")}
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <MousePointerClick className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="text-[#586477] text-sm">Events</h3>
                </div>
                <p className="text-[#172545] text-3xl font-bold">
                  {stats.totalEvents.toLocaleString("de-DE")}
                </p>
              </div>
            </div>

            {/* Device & Browser Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Devices */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h2 className="text-2xl font-bold text-[#172545] mb-6">
                  Gerätetypen
                </h2>
                <div className="space-y-4">
                  {Object.entries(stats.devices).map(([device, count]) => {
                    const total = Object.values(stats.devices).reduce(
                      (sum, c) => sum + c,
                      0
                    );
                    const percentage = ((count / total) * 100).toFixed(1);

                    const getIcon = () => {
                      switch (device) {
                        case "desktop":
                          return <Monitor className="w-5 h-5 text-blue-600" />;
                        case "mobile":
                          return <Smartphone className="w-5 h-5 text-green-600" />;
                        case "tablet":
                          return <Tablet className="w-5 h-5 text-purple-600" />;
                        default:
                          return <Monitor className="w-5 h-5 text-gray-600" />;
                      }
                    };

                    return (
                      <div key={device} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {getIcon()}
                            <span className="text-[#172545] font-medium capitalize">
                              {device}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-[#172545] font-semibold">
                              {count}
                            </span>
                            <span className="text-[#586477] text-sm ml-2">
                              ({percentage}%)
                            </span>
                          </div>
                        </div>
                        <div className="bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Browsers */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h2 className="text-2xl font-bold text-[#172545] mb-6">Browser</h2>
                <div className="space-y-4">
                  {Object.entries(stats.browsers).map(([browser, count]) => {
                    const total = Object.values(stats.browsers).reduce(
                      (sum, c) => sum + c,
                      0
                    );
                    const percentage = ((count / total) * 100).toFixed(1);

                    return (
                      <div key={browser} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Chrome className="w-5 h-5 text-orange-600" />
                            <span className="text-[#172545] font-medium">
                              {browser}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-[#172545] font-semibold">
                              {count}
                            </span>
                            <span className="text-[#586477] text-sm ml-2">
                              ({percentage}%)
                            </span>
                          </div>
                        </div>
                        <div className="bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-orange-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Top Pages */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold text-[#172545] mb-6">
                Meistbesuchte Seiten
              </h2>
              {stats.topPages.length === 0 ? (
                <p className="text-[#586477] text-center py-6">
                  Noch keine Seitenaufrufe erfasst
                </p>
              ) : (
                <div className="space-y-3">
                  {stats.topPages.map((page, index) => {
                    const maxCount = stats.topPages[0]?.count || 1;
                    const percentage = ((page.count / maxCount) * 100).toFixed(0);

                    return (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex-shrink-0 w-8 text-center">
                          <span className="text-[#586477] font-semibold">
                            {index + 1}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="text-[#172545] font-medium mb-1">
                            {page.path === "/" ? "Startseite" : page.path}
                          </p>
                          <div className="bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-[#172545] h-2 rounded-full transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                        <div className="flex-shrink-0 text-right">
                          <p className="text-[#172545] font-semibold text-lg">
                            {page.count}
                          </p>
                          <p className="text-[#586477] text-xs">Aufrufe</p>
                        </div>
                      </div>
                    );
                  })}</div>
              )}
            </div>

            {/* Events by Category */}
            {Object.keys(stats.eventsByCategory).length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h2 className="text-2xl font-bold text-[#172545] mb-6">
                  Benutzer-Interaktionen
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(stats.eventsByCategory).map(([category, count]) => (
                    <div
                      key={category}
                      className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-100"
                    >
                      <p className="text-[#586477] text-sm mb-1">{category}</p>
                      <p className="text-[#172545] text-2xl font-bold">{count}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Session Info */}
            <div className="bg-gradient-to-br from-[#172545] to-[#2a3b5f] rounded-2xl p-8 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white/80 text-sm mb-2">
                    Durchschnitt Seiten pro Session
                  </h3>
                  <p className="text-5xl font-bold mb-2">
                    {stats.avgPageViewsPerSession}
                  </p>
                  <p className="text-white/70 text-sm">
                    Basierend auf {stats.totalSessions} Sessions
                  </p>
                </div>
                <div className="w-20 h-20 bg-white/10 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-10 h-10" />
                </div>
              </div>
            </div>

            {/* Data Privacy Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <Calendar className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-[#172545] font-semibold mb-2">
                    Datenschutz & DSGVO
                  </h3>
                  <ul className="text-sm text-[#586477] space-y-1">
                    <li>
                      ✓ Alle Daten werden anonymisiert gespeichert (keine IP-Adressen)
                    </li>
                    <li>
                      ✓ Tracking nur nach Zustimmung (Cookie-Banner)
                    </li>
                    <li>✓ Automatische Löschung nach 90 Tagen</li>
                    <li>✓ Keine Weitergabe an Dritte</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Top Countries */}
            {stats.topCountries && stats.topCountries.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <Globe className="w-6 h-6 text-[#172545]" />
                  <h2 className="text-2xl font-bold text-[#172545]">
                    Top Länder
                  </h2>
                </div>
                <div className="space-y-4">
                  {stats.topCountries.map((country, index) => {
                    const maxCount = stats.topCountries[0]?.count || 1;
                    const percentage = ((country.count / maxCount) * 100).toFixed(0);

                    return (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex-shrink-0 w-8 text-center">
                          <span className="text-[#586477] font-semibold">
                            {index + 1}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="text-[#172545] font-medium mb-1">
                            {country.country}
                          </p>
                          <div className="bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-[#172545] h-2 rounded-full transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                        <div className="flex-shrink-0 text-right">
                          <p className="text-[#172545] font-semibold text-lg">
                            {country.count}
                          </p>
                          <p className="text-[#586477] text-xs">Aufrufe</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Top Cities */}
            {stats.topCities && stats.topCities.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="w-6 h-6 text-[#172545]" />
                  <h2 className="text-2xl font-bold text-[#172545]">
                    Top Städte
                  </h2>
                </div>
                <div className="space-y-4">
                  {stats.topCities.map((city, index) => {
                    const maxCount = stats.topCities[0]?.count || 1;
                    const percentage = ((city.count / maxCount) * 100).toFixed(0);

                    return (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex-shrink-0 w-8 text-center">
                          <span className="text-[#586477] font-semibold">
                            {index + 1}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="text-[#172545] font-medium mb-1">
                            {city.city}, {city.country}
                          </p>
                          <div className="bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-[#172545] h-2 rounded-full transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                        <div className="flex-shrink-0 text-right">
                          <p className="text-[#172545] font-semibold text-lg">
                            {city.count}
                          </p>
                          <p className="text-[#586477] text-xs">Aufrufe</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </AdminLayout>
  );
}