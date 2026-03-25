import { useState, useEffect } from "react";
import { AdminLayout } from "@/app/components/admin-layout";
import { Link } from "react-router";
import {
  Building2, TrendingUp, Users, Eye, Calendar,
  MousePointerClick, ArrowRight, CheckCircle, Clock, XCircle,
} from "lucide-react";
import { projectId, publicAnonKey } from "/utils/supabase/info";

interface Property {
  id: string;
  title: string;
  type: string;
  status: "available" | "reserved" | "sold";
  price: number;
  createdAt: string;
}

interface AnalyticsStats {
  totalPageViews: number;
  uniqueVisitors: number;
  totalSessions: number;
  dailyViews: Record<string, number>;
  conversions: { phoneCalls: number; emailClicks: number; formSubmits: number; propertyViews: number };
}

const apiUrl = `https://${projectId}.supabase.co/functions/v1/make-server-78b4cf15`;

function todayKey() {
  return new Date().toISOString().split("T")[0];
}

function buildSparkline(dailyViews: Record<string, number>, days = 7) {
  return Array.from({ length: days }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (days - 1 - i));
    return { key: d.toISOString().split("T")[0], count: dailyViews[d.toISOString().split("T")[0]] || 0 };
  });
}

export function AdminDashboard() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchProperties(), fetchAnalytics()]).finally(() => setLoading(false));
  }, []);

  const fetchProperties = async () => {
    try {
      const res = await fetch(`${apiUrl}/properties`, {
        headers: { Authorization: `Bearer ${publicAnonKey}` },
      });
      const result = await res.json();
      if (result.success) setProperties(result.data);
    } catch (e) {
      console.error("Properties fetch error:", e);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const res = await fetch(`${apiUrl}/analytics/stats?range=7d`, {
        headers: { Authorization: `Bearer ${publicAnonKey}` },
      });
      const result = await res.json();
      if (result.success) setAnalytics(result.data);
    } catch (e) {
      console.error("Analytics fetch error:", e);
    }
  };

  // Immobilien-Kennzahlen
  const available = properties.filter((p) => p.status === "available").length;
  const reserved  = properties.filter((p) => p.status === "reserved").length;
  const sold      = properties.filter((p) => p.status === "sold").length;
  const totalValue = properties.reduce((s, p) => s + p.price, 0);
  const recentProperties = [...properties]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  // Besucher-Kennzahlen
  const todayViews = analytics?.dailyViews?.[todayKey()] ?? 0;
  const sparkline  = analytics ? buildSparkline(analytics.dailyViews) : [];
  const sparkMax   = Math.max(...sparkline.map((d) => d.count), 1);

  const statusLabel: Record<string, string> = { available: "Verfügbar", reserved: "Reserviert", sold: "Verkauft" };
  const statusClass: Record<string, string> = {
    available: "bg-green-100 text-green-700",
    reserved:  "bg-yellow-100 text-yellow-700",
    sold:      "bg-red-100 text-red-700",
  };

  return (
    <AdminLayout>
      <div className="space-y-8">

        {/* Header */}
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-4xl font-bold text-[#172545] mb-2">Dashboard</h1>
            <p className="text-[#586477]">
              Willkommen im AVEYO Verwaltungsbereich ·{" "}
              {new Date().toLocaleDateString("de-DE", { weekday: "long", day: "2-digit", month: "long", year: "numeric" })}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="h-10 w-10 rounded-full border-4 border-[#172545]/20 border-t-[#172545] animate-spin" />
          </div>
        ) : (
          <>
            {/* ── BESUCHER ── */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-[#172545]">Besucher (letzte 7 Tage)</h2>
                <Link
                  to="/admin/analytics"
                  className="flex items-center gap-1 text-sm text-[#586477] hover:text-[#172545] transition-colors"
                >
                  Alle Analytics <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                {[
                  { label: "Heute", value: todayViews, icon: Eye, color: "bg-blue-100 text-blue-600" },
                  { label: "7-Tage Aufrufe", value: analytics?.totalPageViews ?? 0, icon: TrendingUp, color: "bg-indigo-100 text-indigo-600" },
                  { label: "Unique Visitors", value: analytics?.uniqueVisitors ?? 0, icon: Users, color: "bg-green-100 text-green-600" },
                  { label: "Events", value: analytics?.conversions
                      ? analytics.conversions.phoneCalls + analytics.conversions.emailClicks + analytics.conversions.formSubmits
                      : 0,
                    icon: MousePointerClick, color: "bg-orange-100 text-orange-600" },
                ].map(({ label, value, icon: Icon, color }) => (
                  <div key={label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200">
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`w-9 h-9 ${color} rounded-xl flex items-center justify-center`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[#586477] text-sm">{label}</span>
                    </div>
                    <p className="text-[#172545] text-3xl font-bold">{value.toLocaleString("de-DE")}</p>
                  </div>
                ))}
              </div>

              {/* Sparkline letzte 7 Tage */}
              {analytics && (
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200">
                  <p className="text-sm text-[#586477] mb-3">Seitenaufrufe pro Tag</p>
                  <div className="flex items-end gap-1.5 h-16">
                    {sparkline.map((d) => {
                      const isToday = d.key === todayKey();
                      return (
                        <div key={d.key} className="flex-1 flex flex-col items-center gap-1 group">
                          <div className="relative w-full flex items-end justify-center h-12">
                            <div
                              className={`w-full rounded-t-sm transition-all duration-300 ${isToday ? "bg-[#586477]" : "bg-[#172545]"} group-hover:opacity-70`}
                              style={{ height: `${Math.max((d.count / sparkMax) * 100, d.count > 0 ? 8 : 2)}%` }}
                            />
                            {d.count > 0 && (
                              <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-[#172545] text-white text-xs px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                                {d.count}
                              </div>
                            )}
                          </div>
                          <span className="text-[10px] text-[#586477]">
                            {new Date(d.key).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" })}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </section>

            {/* ── IMMOBILIEN ── */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-[#172545]">Immobilien</h2>
                <Link
                  to="/admin/immobilien"
                  className="flex items-center gap-1 text-sm text-[#586477] hover:text-[#172545] transition-colors"
                >
                  Alle Immobilien <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Status-Kacheln */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                {[
                  { label: "Gesamt", value: properties.length, icon: Building2, color: "bg-blue-100 text-blue-600" },
                  { label: "Verfügbar",  value: available, icon: CheckCircle, color: "bg-green-100 text-green-600" },
                  { label: "Reserviert", value: reserved,  icon: Clock,        color: "bg-yellow-100 text-yellow-600" },
                  { label: "Verkauft",   value: sold,      icon: XCircle,      color: "bg-red-100 text-red-600" },
                ].map(({ label, value, icon: Icon, color }) => (
                  <div key={label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200">
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`w-9 h-9 ${color} rounded-xl flex items-center justify-center`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[#586477] text-sm">{label}</span>
                    </div>
                    <p className="text-[#172545] text-3xl font-bold">{value}</p>
                  </div>
                ))}
              </div>

              {/* Portfolio-Wert */}
              <div className="bg-gradient-to-br from-[#172545] to-[#2a3b5f] rounded-2xl p-6 text-white shadow-lg flex items-center justify-between mb-4">
                <div>
                  <p className="text-white/70 text-sm mb-1">Gesamtwert Portfolio</p>
                  <p className="text-4xl font-bold">{totalValue.toLocaleString("de-DE")} €</p>
                </div>
                <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-7 h-7" />
                </div>
              </div>

              {/* Neueste Immobilien */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-[#172545] mb-4">Zuletzt hinzugefügt</h3>
                {recentProperties.length === 0 ? (
                  <div className="text-center py-8">
                    <Building2 className="w-10 h-10 mx-auto mb-2 text-[#586477]/30" />
                    <p className="text-[#586477] text-sm">Noch keine Immobilien vorhanden</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {recentProperties.map((p) => (
                      <div key={p.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <div className="flex-1 min-w-0">
                          <p className="text-[#172545] font-semibold truncate">{p.title}</p>
                          <p className="text-[#586477] text-xs mt-0.5">
                            {p.type} · {new Date(p.createdAt).toLocaleDateString("de-DE")}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 ml-4 shrink-0">
                          <span className="text-[#172545] font-semibold text-sm">
                            {p.price.toLocaleString("de-DE")} €
                          </span>
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusClass[p.status]}`}>
                            {statusLabel[p.status]}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
