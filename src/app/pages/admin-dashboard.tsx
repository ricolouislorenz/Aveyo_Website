import { useState, useEffect } from "react";
import { AdminLayout } from "@/app/components/admin-layout";
import { Building2, TrendingUp, Users, Eye, Calendar } from "lucide-react";
import { projectId, publicAnonKey } from "/utils/supabase/info";

interface Property {
  id: string;
  title: string;
  type: string;
  status: "available" | "reserved" | "sold";
  price: number;
  createdAt: string;
}

interface DashboardStats {
  totalProperties: number;
  availableProperties: number;
  reservedProperties: number;
  soldProperties: number;
  totalValue: number;
  recentProperties: Property[];
}

export function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProperties: 0,
    availableProperties: 0,
    reservedProperties: 0,
    soldProperties: 0,
    totalValue: 0,
    recentProperties: [],
  });
  const [loading, setLoading] = useState(true);

  const apiUrl = `https://${projectId}.supabase.co/functions/v1/make-server-78b4cf15`;

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch(`${apiUrl}/properties`, {
        headers: {
          Authorization: `Bearer ${publicAnonKey}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        const properties = result.data as Property[];

        // Calculate stats
        const available = properties.filter((p) => p.status === "available").length;
        const reserved = properties.filter((p) => p.status === "reserved").length;
        const sold = properties.filter((p) => p.status === "sold").length;
        const totalValue = properties.reduce((sum, p) => sum + p.price, 0);

        // Get 5 most recent properties
        const recent = properties
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 5);

        setStats({
          totalProperties: properties.length,
          availableProperties: available,
          reservedProperties: reserved,
          soldProperties: sold,
          totalValue,
          recentProperties: recent,
        });
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Gesamt Immobilien",
      value: stats.totalProperties,
      icon: Building2,
      color: "bg-blue-500",
    },
    {
      title: "Verfügbar",
      value: stats.availableProperties,
      icon: Eye,
      color: "bg-green-500",
    },
    {
      title: "Reserviert",
      value: stats.reservedProperties,
      icon: Calendar,
      color: "bg-yellow-500",
    },
    {
      title: "Verkauft",
      value: stats.soldProperties,
      icon: TrendingUp,
      color: "bg-red-500",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-4xl font-bold text-[#172545] mb-2">Dashboard</h1>
          <p className="text-[#586477]">Willkommen im AVEYO Verwaltungsbereich</p>
        </div>

        {/* Stats Grid */}
        {loading ? (
          <div className="text-center py-20">
            <p className="text-[#586477]">Lade Dashboard...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {statCards.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <h3 className="text-[#586477] text-sm mb-1">{stat.title}</h3>
                    <p className="text-[#172545] text-3xl font-bold">{stat.value}</p>
                  </div>
                );
              })}
            </div>

            {/* Total Value Card */}
            <div className="bg-gradient-to-br from-[#172545] to-[#2a3b5f] rounded-2xl p-8 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white/80 text-sm mb-2">Gesamtwert Portfolio</h3>
                  <p className="text-4xl font-bold">
                    {stats.totalValue.toLocaleString("de-DE")} €
                  </p>
                </div>
                <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-8 h-8" />
                </div>
              </div>
            </div>

            {/* Recent Properties */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold text-[#172545] mb-6">
                Neueste Immobilien
              </h2>

              {stats.recentProperties.length === 0 ? (
                <div className="text-center py-10">
                  <Building2 className="w-12 h-12 mx-auto mb-3 text-[#586477]/40" />
                  <p className="text-[#586477]">Noch keine Immobilien vorhanden</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {stats.recentProperties.map((property) => (
                    <div
                      key={property.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-1">
                        <h3 className="text-[#172545] font-semibold mb-1">
                          {property.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-[#586477]">
                          <span>{property.type}</span>
                          <span>•</span>
                          <span>
                            {new Date(property.createdAt).toLocaleDateString("de-DE")}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-[#172545] font-semibold">
                          {property.price.toLocaleString("de-DE")} €
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            property.status === "available"
                              ? "bg-green-100 text-green-700"
                              : property.status === "reserved"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {property.status === "available"
                            ? "Verfügbar"
                            : property.status === "reserved"
                            ? "Reserviert"
                            : "Verkauft"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
