import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router";

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

export function AdminRoutes() {
  return (
    <Suspense fallback={<AdminLoader />}>
      <Routes>
        <Route path="/" element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="immobilien" element={<AdminImmobilienPage />} />
        <Route path="bewertungen" element={<AdminReviewsPage />} />
        <Route path="analytics" element={<AdminAnalyticsPage />} />
        <Route path="partner" element={<AdminPartnerPage />} />
        <Route path="settings" element={<AdminSettingsPage />} />
      </Routes>
    </Suspense>
  );
}