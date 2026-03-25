import { useState, useEffect } from "react";
import { AdminLayout } from "@/app/components/admin-layout";
import {
  TrendingUp, Users, Eye, Clock, Monitor, Smartphone, Tablet,
  Chrome, Calendar, MousePointerClick, Trash2, Globe, MapPin,
  Phone, Mail, FileText, Building2, UserCheck, UserPlus, ArrowUpRight,
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
  operatingSystems: Record<string, number>;
  newVsReturning: { new: number; returning: number };
  topPages: { path: string; count: number }[];
  eventsByCategory: Record<string, number>;
  dailyViews: Record<string, number>;
  hourlyViews: Record<string, number>;
  weekdayViews: Record<string, number>;
  totalEvents: number;
  topCountries: { country: string; count: number }[];
  topCities: { city: string; country: string; count: number }[];
  topReferrers: { source: string; count: number }[];
  conversions: { phoneCalls: number; emailClicks: number; formSubmits: number; propertyViews: number };
}

const WEEKDAYS = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];

function BarList({ items, colorClass = "bg-[#172545]" }: {
  items: { label: string; count: number; sublabel?: string }[];
  colorClass?: string;
}) {
  const max = items[0]?.count || 1;
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
          <span className="w-6 text-center text-sm font-semibold text-[#586477] shrink-0">{i + 1}</span>
          <div className="flex-1 min-w-0">
            <p className="text-[#172545] font-medium text-sm truncate">{item.label}</p>
            {item.sublabel && <p className="text-[#586477] text-xs">{item.sublabel}</p>}
            <div className="bg-gray-200 rounded-full h-1.5 mt-1.5">
              <div className={`${colorClass} h-1.5 rounded-full transition-all duration-500`} style={{ width: `${(item.count / max) * 100}%` }} />
            </div>
          </div>
          <span className="text-[#172545] font-semibold text-sm shrink-0">{item.count}</span>
        </div>
      ))}
    </div>
  );
}

function DistributionBars({ data, colorClass = "bg-blue-500" }: {
  data: Record<string, number>;
  colorClass?: string;
}) {
  const total = Object.values(data).reduce((s, c) => s + c, 0) || 1;
  const sorted = Object.entries(data).sort((a, b) => b[1] - a[1]);
  return (
    <div className="space-y-3">
      {sorted.map(([label, count]) => {
        const pct = ((count / total) * 100).toFixed(1);
        return (
          <div key={label} className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="text-[#172545] font-medium capitalize">{label}</span>
              <span className="text-[#586477]">{count} <span className="text-xs">({pct}%)</span></span>
            </div>
            <div className="bg-gray-200 rounded-full h-2">
              <div className={`${colorClass} h-2 rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function AdminAnalyticsPage() {
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("30d");
  const [cleanupLoading, setCleanupLoading] = useState(false);

  const apiUrl = `https://${projectId}.supabase.co/functions/v1/make-server-78b4cf15`;

  useEffect(() => { fetchStats(); }, [timeRange]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/analytics/stats?range=${timeRange}`, {
        headers: { Authorization: `Bearer ${publicAnonKey}` },
      });
      const result = await response.json();
      if (result.success) setStats(result.data);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCleanup = async () => {
    if (!confirm("Möchten Sie wirklich alle Analytics-Daten älter als 90 Tage löschen?")) return;
    try {
      setCleanupLoading(true);
      const response = await fetch(`${apiUrl}/analytics/cleanup?days=90`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${publicAnonKey}` },
      });
      const result = await response.json();
      if (result.success) { alert(`${result.deleted} alte Einträge wurden gelöscht.`); fetchStats(); }
    } catch { alert("Fehler beim Löschen der Daten"); }
    finally { setCleanupLoading(false); }
  };

  // Tagesverlauf: letzte N Tage auffüllen
  const buildDailyChart = (dailyViews: Record<string, number>, days: number) => {
    const result: { date: string; label: string; count: number }[] = [];
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split("T")[0];
      const label = d.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" });
      result.push({ date: key, label, count: dailyViews[key] || 0 });
    }
    return result;
  };

  const rangeDays = timeRange === "24h" ? 1 : timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90;

  return (
    <AdminLayout>
      <div className="space-y-8">

        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-[#172545] mb-2">Analytics & Tracking</h1>
            <p className="text-[#586477]">Besucherstatistiken und Nutzerverhalten im Überblick</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-3 border border-[#586477]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#172545] bg-white"
            >
              <option value="24h">Letzte 24 Stunden</option>
              <option value="7d">Letzte 7 Tage</option>
              <option value="30d">Letzte 30 Tage</option>
              <option value="90d">Letzte 90 Tage</option>
            </select>
            <button
              onClick={handleCleanup}
              disabled={cleanupLoading}
              className="flex items-center gap-2 px-4 py-3 border border-red-200 text-red-600 rounded-xl hover:bg-red-50 transition-all duration-300 disabled:opacity-50"
              title="Alte Daten löschen (DSGVO)"
            >
              <Trash2 className="w-5 h-5" />
              <span>Bereinigen</span>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="h-10 w-10 rounded-full border-4 border-[#172545]/20 border-t-[#172545] animate-spin" />
          </div>
        ) : !stats || stats.totalPageViews === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-200">
            <Eye className="w-16 h-16 mx-auto mb-4 text-[#586477]/40" />
            <h3 className="text-xl font-semibold text-[#172545] mb-2">Noch keine Tracking-Daten</h3>
            <p className="text-[#586477] mb-2">Sobald Besucher die Website nutzen und Cookies akzeptieren, werden hier Statistiken angezeigt.</p>
            <p className="text-sm text-[#586477]/70">Tipp: Besuchen Sie die Website selbst und akzeptieren Sie die Analytics-Cookies</p>
          </div>
        ) : (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Seitenaufrufe", value: stats.totalPageViews, icon: Eye, color: "bg-blue-100 text-blue-600" },
                { label: "Unique Visitors", value: stats.uniqueVisitors, icon: Users, color: "bg-green-100 text-green-600" },
                { label: "Sessions", value: stats.totalSessions, icon: Clock, color: "bg-purple-100 text-purple-600" },
                { label: "Events", value: stats.totalEvents, icon: MousePointerClick, color: "bg-orange-100 text-orange-600" },
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[#586477] text-sm">{label}</span>
                  </div>
                  <p className="text-[#172545] text-3xl font-bold">{value.toLocaleString("de-DE")}</p>
                </div>
              ))}
            </div>

            {/* Konversionen */}
            {stats.conversions && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h2 className="text-2xl font-bold text-[#172545] mb-6">Konversionen</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: "Telefon-Klicks", value: stats.conversions.phoneCalls, icon: Phone, color: "bg-green-100 text-green-600" },
                    { label: "E-Mail-Klicks", value: stats.conversions.emailClicks, icon: Mail, color: "bg-blue-100 text-blue-600" },
                    { label: "Formular-Abgaben", value: stats.conversions.formSubmits, icon: FileText, color: "bg-purple-100 text-purple-600" },
                    { label: "Immobilien-Aufrufe", value: stats.conversions.propertyViews, icon: Building2, color: "bg-orange-100 text-orange-600" },
                  ].map(({ label, value, icon: Icon, color }) => (
                    <div key={label} className={`rounded-xl p-5 border ${value > 0 ? "border-gray-200 bg-gray-50" : "border-gray-100 bg-gray-50/50"}`}>
                      <div className={`w-9 h-9 ${color} rounded-lg flex items-center justify-center mb-3`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <p className="text-[#172545] text-2xl font-bold">{value}</p>
                      <p className="text-[#586477] text-xs mt-1">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tagesverlauf */}
            {stats.dailyViews && rangeDays > 1 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <div className="mb-5">
                  <h2 className="text-2xl font-bold text-[#172545]">Tagesverlauf</h2>
                  <p className="text-sm text-[#586477] mt-1">Seitenaufrufe pro Tag</p>
                </div>
                {(() => {
                  const days = buildDailyChart(stats.dailyViews, Math.min(rangeDays, 30));
                  const maxVal = Math.max(...days.map((d) => d.count), 1);
                  const ySteps = [maxVal, Math.round(maxVal * 0.66), Math.round(maxVal * 0.33), 0];
                  const labelEvery = days.length <= 7 ? 1 : days.length <= 14 ? 2 : days.length <= 30 ? 5 : 10;
                  const CHART_H = 160;
                  return (
                    <div className="flex gap-2">
                      {/* Y-Achse Beschriftung */}
                      <div className="flex flex-col justify-between items-end shrink-0 pb-7" style={{ height: CHART_H + 28 }}>
                        {ySteps.map((v) => (
                          <span key={v} className="text-[11px] text-[#586477] leading-none tabular-nums">{v}</span>
                        ))}
                      </div>
                      {/* Trennlinie Y-Achse */}
                      <div className="w-px bg-gray-200 shrink-0 mb-7" style={{ height: CHART_H + 4 }} />

                      {/* Chart-Bereich */}
                      <div className="flex-1 min-w-0">
                        <div className="relative" style={{ height: CHART_H }}>
                          {/* Horizontale Hilfslinien bei 0 %, 33 %, 66 %, 100 % */}
                          {[0, 33, 66, 100].map((pct) => (
                            <div
                              key={pct}
                              className="absolute w-full border-t border-gray-100"
                              style={{ bottom: `${pct}%` }}
                            />
                          ))}
                          {/* Balken */}
                          <div className="absolute inset-0 flex items-end gap-0.5">
                            {days.map((d) => (
                              <div key={d.date} className="flex-1 flex items-end group relative h-full">
                                <div
                                  className="w-full bg-[#172545] rounded-t-sm transition-all duration-300 group-hover:bg-[#586477]"
                                  style={{ height: `${Math.max((d.count / maxVal) * 100, d.count > 0 ? 2 : 0.5)}%` }}
                                />
                                {d.count > 0 && (
                                  <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-[#172545] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                                    {d.label}: <strong>{d.count}</strong> Aufrufe
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* X-Achse Trennlinie */}
                        <div className="w-full h-px bg-gray-200 mt-0" />

                        {/* X-Achse Datumslabels */}
                        <div className="flex gap-0.5 mt-1">
                          {days.map((d, i) => (
                            <div key={d.date} className="flex-1 text-center overflow-hidden">
                              {i % labelEvery === 0 && (
                                <span className="text-[10px] text-[#586477] leading-none">{d.label}</span>
                              )}
                            </div>
                          ))}
                        </div>
                        <p className="text-center text-[11px] text-[#586477] mt-2 tracking-wide">Datum</p>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* Neue vs. Wiederkehrende + Durchschnitt */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {stats.newVsReturning && (stats.newVsReturning.new + stats.newVsReturning.returning) > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                  <h2 className="text-2xl font-bold text-[#172545] mb-6">Neue vs. Wiederkehrende</h2>
                  {(() => {
                    const total = stats.newVsReturning.new + stats.newVsReturning.returning;
                    const newPct = ((stats.newVsReturning.new / total) * 100).toFixed(1);
                    const retPct = ((stats.newVsReturning.returning / total) * 100).toFixed(1);
                    return (
                      <div className="space-y-4">
                        <div className="flex rounded-xl overflow-hidden h-8">
                          <div className="bg-[#172545] flex items-center justify-center text-white text-xs font-medium transition-all" style={{ width: `${newPct}%` }}>
                            {Number(newPct) > 15 ? `${newPct}%` : ""}
                          </div>
                          <div className="bg-[#586477] flex items-center justify-center text-white text-xs font-medium transition-all" style={{ width: `${retPct}%` }}>
                            {Number(retPct) > 15 ? `${retPct}%` : ""}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#172545]/10 rounded-xl flex items-center justify-center">
                              <UserPlus className="w-5 h-5 text-[#172545]" />
                            </div>
                            <div>
                              <p className="text-[#172545] text-xl font-bold">{stats.newVsReturning.new}</p>
                              <p className="text-[#586477] text-xs">Neue ({newPct}%)</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#586477]/10 rounded-xl flex items-center justify-center">
                              <UserCheck className="w-5 h-5 text-[#586477]" />
                            </div>
                            <div>
                              <p className="text-[#172545] text-xl font-bold">{stats.newVsReturning.returning}</p>
                              <p className="text-[#586477] text-xs">Wiederkehrend ({retPct}%)</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              <div className="bg-gradient-to-br from-[#172545] to-[#2a3b5f] rounded-2xl p-6 text-white shadow-lg flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm mb-1">Ø Seiten pro Session</p>
                  <p className="text-5xl font-bold mb-1">{stats.avgPageViewsPerSession}</p>
                  <p className="text-white/60 text-xs">Basierend auf {stats.totalSessions} Sessions</p>
                </div>
                <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-8 h-8" />
                </div>
              </div>
            </div>

            {/* Wochentag + Tageszeit */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Wochentage */}
              {stats.weekdayViews && Object.keys(stats.weekdayViews).length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                  <h2 className="text-2xl font-bold text-[#172545] mb-6">Wochentage</h2>
                  {(() => {
                    const data = WEEKDAYS.map((label, i) => ({ label, count: stats.weekdayViews[String(i)] || 0 }));
                    const maxVal = Math.max(...data.map((d) => d.count), 1);
                    return (
                      <div className="flex items-end gap-2 h-32">
                        {data.map((d) => (
                          <div key={d.label} className="flex-1 flex flex-col items-center gap-1.5 group">
                            <div className="relative w-full flex items-end justify-center" style={{ height: "96px" }}>
                              <div
                                className="w-full bg-[#172545] rounded-t transition-all duration-300 group-hover:bg-[#586477] min-h-[2px]"
                                style={{ height: `${Math.max((d.count / maxVal) * 100, d.count > 0 ? 4 : 1)}%` }}
                              />
                              {d.count > 0 && (
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#172545] text-white text-xs px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                  {d.count}
                                </div>
                              )}
                            </div>
                            <span className="text-xs text-[#586477]">{d.label}</span>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* Tageszeit */}
              {stats.hourlyViews && Object.keys(stats.hourlyViews).length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                  <h2 className="text-2xl font-bold text-[#172545] mb-6">Tageszeit</h2>
                  {(() => {
                    const data = Array.from({ length: 24 }, (_, i) => ({
                      label: `${String(i).padStart(2, "0")}`,
                      count: stats.hourlyViews[String(i)] || 0,
                    }));
                    const maxVal = Math.max(...data.map((d) => d.count), 1);
                    return (
                      <div className="flex items-end gap-0.5 h-32">
                        {data.map((d) => (
                          <div key={d.label} className="flex-1 flex flex-col items-center gap-1 group">
                            <div className="relative w-full flex items-end justify-center" style={{ height: "96px" }}>
                              <div
                                className="w-full bg-[#586477] rounded-t-sm transition-all duration-300 group-hover:bg-[#172545] min-h-[1px]"
                                style={{ height: `${Math.max((d.count / maxVal) * 100, d.count > 0 ? 3 : 1)}%` }}
                              />
                              {d.count > 0 && (
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#172545] text-white text-xs px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                  {d.label}:00 · {d.count}
                                </div>
                              )}
                            </div>
                            {(d.label === "00" || d.label === "06" || d.label === "12" || d.label === "18") && (
                              <span className="text-[9px] text-[#586477]">{d.label}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>

            {/* Geräte + Browser */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h2 className="text-2xl font-bold text-[#172545] mb-6">Gerätetypen</h2>
                <DistributionBars data={stats.devices} colorClass="bg-blue-500" />
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h2 className="text-2xl font-bold text-[#172545] mb-6">Browser</h2>
                <DistributionBars data={stats.browsers} colorClass="bg-orange-500" />
              </div>
            </div>

            {/* OS */}
            {stats.operatingSystems && Object.keys(stats.operatingSystems).length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h2 className="text-2xl font-bold text-[#172545] mb-6">Betriebssysteme</h2>
                <DistributionBars data={stats.operatingSystems} colorClass="bg-purple-500" />
              </div>
            )}

            {/* Meistbesuchte Seiten */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold text-[#172545] mb-6">Meistbesuchte Seiten</h2>
              {stats.topPages.length === 0 ? (
                <p className="text-[#586477] text-center py-6">Noch keine Seitenaufrufe erfasst</p>
              ) : (
                <BarList
                  items={stats.topPages.map((p) => ({
                    label: p.path === "/" ? "Startseite" : p.path,
                    count: p.count,
                  }))}
                />
              )}
            </div>

            {/* Referrer */}
            {stats.topReferrers && stats.topReferrers.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center gap-2 mb-6">
                  <ArrowUpRight className="w-5 h-5 text-[#172545]" />
                  <h2 className="text-2xl font-bold text-[#172545]">Besucher-Quellen</h2>
                </div>
                <BarList
                  items={stats.topReferrers.map((r) => ({ label: r.source, count: r.count }))}
                  colorClass="bg-[#586477]"
                />
              </div>
            )}

            {/* Länder + Städte */}
            {(stats.topCountries?.length > 0 || stats.topCities?.length > 0) && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {stats.topCountries?.length > 0 && (
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center gap-2 mb-6">
                      <Globe className="w-5 h-5 text-[#172545]" />
                      <h2 className="text-2xl font-bold text-[#172545]">Top Länder</h2>
                    </div>
                    <BarList items={stats.topCountries.map((c) => ({ label: c.country, count: c.count }))} />
                  </div>
                )}
                {stats.topCities?.length > 0 && (
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center gap-2 mb-6">
                      <MapPin className="w-5 h-5 text-[#172545]" />
                      <h2 className="text-2xl font-bold text-[#172545]">Top Städte</h2>
                    </div>
                    <BarList items={stats.topCities.map((c) => ({ label: c.city, count: c.count, sublabel: c.country }))} />
                  </div>
                )}
              </div>
            )}

            {/* Events nach Kategorie */}
            {Object.keys(stats.eventsByCategory).length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h2 className="text-2xl font-bold text-[#172545] mb-6">Interaktionen nach Kategorie</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {Object.entries(stats.eventsByCategory)
                    .sort((a, b) => b[1] - a[1])
                    .map(([cat, count]) => (
                      <div key={cat} className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-100">
                        <p className="text-[#586477] text-xs mb-1">{cat}</p>
                        <p className="text-[#172545] text-2xl font-bold">{count}</p>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* DSGVO */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-[#172545] font-semibold mb-1">Datenschutz & DSGVO</h3>
                  <ul className="text-sm text-[#586477] space-y-0.5">
                    <li>✓ Alle Daten werden anonymisiert gespeichert (keine IP-Adressen)</li>
                    <li>✓ Tracking nur nach Zustimmung (Cookie-Banner)</li>
                    <li>✓ Automatische Löschung nach 90 Tagen</li>
                    <li>✓ Keine Weitergabe an Dritte</li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
