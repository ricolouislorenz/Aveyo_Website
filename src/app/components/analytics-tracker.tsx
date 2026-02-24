import { useEffect } from "react";
import { useLocation } from "react-router";
import { Analytics } from "../utils/analytics";

export function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    // Don't track admin pages
    if (location.pathname.startsWith('/admin')) {
      return;
    }

    // Track session start on mount
    Analytics.sessionStart();
  }, []);

  useEffect(() => {
    // Don't track admin pages
    if (location.pathname.startsWith('/admin')) {
      return;
    }

    // Track page view on route change
    Analytics.pageView({
      path: location.pathname,
      title: document.title,
      referrer: document.referrer,
    });
  }, [location.pathname]);

  return null;
}