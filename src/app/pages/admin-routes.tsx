import { Suspense, lazy, ReactNode } from "react";
import { Routes, Route, Navigate } from "react-router";
import { useAuth } from "../context/auth-context";

const AdminDashboard = lazy(() =>
  import("./admin-dashboard").then((m) => ({ default: m.AdminDashboard })),
);
const AdminImmobilienPage = lazy(() =>
  import("./admin-immobilien").then((m) => ({
    default: m.AdminImmobilienPage,
  })),
);
const AdminReviewsPage = lazy(() =>
  import("./admin-reviews").then((m) => ({ default: m.AdminReviewsPage })),
);
const AdminAnalyticsPage = lazy(() =>
  import("./admin-analytics").then((m) => ({
    default: m.AdminAnalyticsPage,
  })),
);
const AdminSettingsPage = lazy(() =>
  import("./admin-settings").then((m) => ({
    default: m.AdminSettingsPage,
  })),
);
const AdminPartnerPage = lazy(() =>
  import("./admin-partner").then((m) => ({
    default: m.AdminPartnerPage,
  })),
);

function AdminLoader() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="h-10 w-10 rounded-full border-4 border-[#172545]/20 border-t-[#172545] animate-spin" />
    </div>
  );
}

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/" replace />;
  return <>{children}</>;
}

export function AdminRoutes() {
  return (
    <Suspense fallback={<AdminLoader />}>
      <Routes>
        <Route path="/" element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="immobilien" element={<ProtectedRoute><AdminImmobilienPage /></ProtectedRoute>} />
        <Route path="bewertungen" element={<ProtectedRoute><AdminReviewsPage /></ProtectedRoute>} />
        <Route path="analytics" element={<ProtectedRoute><AdminAnalyticsPage /></ProtectedRoute>} />
        <Route path="partner" element={<ProtectedRoute><AdminPartnerPage /></ProtectedRoute>} />
        <Route path="settings" element={<ProtectedRoute><AdminSettingsPage /></ProtectedRoute>} />
      </Routes>
    </Suspense>
  );
}