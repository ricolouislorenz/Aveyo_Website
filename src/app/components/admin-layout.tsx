import { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { LayoutDashboard, Building2, BarChart3, Star, LogOut, Settings } from "lucide-react";
import { useAuth } from "../context/auth-context";

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navItems = [
    {
      to: "/admin/dashboard",
      icon: LayoutDashboard,
      label: "Dashboard",
    },
    {
      to: "/admin/immobilien",
      icon: Building2,
      label: "Immobilien",
    },
    {
      to: "/admin/bewertungen",
      icon: Star,
      label: "Bewertungen",
    },
    {
      to: "/admin/analytics",
      icon: BarChart3,
      label: "Analytics",
    },
    {
      to: "/admin/settings",
      icon: Settings,
      label: "Einstellungen",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-[#172545] text-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-[#172545] font-bold text-xl">A</span>
              </div>
              <div>
                <h1 className="text-xl font-bold">AVEYO Admin</h1>
                <p className="text-xs text-white/70">Verwaltungsbereich</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex items-center gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                      isActive
                        ? "bg-white text-[#172545]"
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 ml-4 border border-white/30 rounded-lg text-white hover:bg-white/10 transition-all duration-300"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Abmelden</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">{children}</main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-[#586477]">
            © {new Date().getFullYear()} AVEYO Admin-Bereich. Alle Rechte vorbehalten.
          </p>
        </div>
      </footer>
    </div>
  );
}