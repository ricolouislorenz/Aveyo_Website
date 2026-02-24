import { projectId, publicAnonKey } from "/utils/supabase/info";

const apiUrl = `https://${projectId}.supabase.co/functions/v1/make-server-78b4cf15`;

// Session ID stored in sessionStorage (expires when browser closes)
const SESSION_ID_KEY = "aveyo_session_id";

// Visitor ID stored in localStorage (persistent)
const VISITOR_ID_KEY = "aveyo_visitor_id";

// Get or create session ID
function getSessionId(): string {
  let sessionId = sessionStorage.getItem(SESSION_ID_KEY);
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem(SESSION_ID_KEY, sessionId);
  }
  return sessionId;
}

// Get or create visitor ID
function getVisitorId(): string {
  let visitorId = localStorage.getItem(VISITOR_ID_KEY);
  if (!visitorId) {
    visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(VISITOR_ID_KEY, visitorId);
  }
  return visitorId;
}

// Check if user has consented to analytics
function hasAnalyticsConsent(): boolean {
  const preferences = localStorage.getItem("aveyo_cookie_preferences");
  if (!preferences) return false;
  
  try {
    const prefs = JSON.parse(preferences);
    return prefs.analytics === true;
  } catch {
    return false;
  }
}

// Get device type
function getDeviceType(): string {
  const width = window.innerWidth;
  if (width < 768) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
}

// Get browser info
function getBrowserInfo(): string {
  const ua = navigator.userAgent;
  if (ua.includes("Chrome")) return "Chrome";
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Safari")) return "Safari";
  if (ua.includes("Edge")) return "Edge";
  return "Other";
}

// Get OS info
function getOSInfo(): string {
  const ua = navigator.userAgent;
  if (ua.includes("Win")) return "Windows";
  if (ua.includes("Mac")) return "macOS";
  if (ua.includes("Linux")) return "Linux";
  if (ua.includes("Android")) return "Android";
  if (ua.includes("iOS")) return "iOS";
  return "Other";
}

export interface PageViewData {
  path: string;
  title: string;
  referrer: string;
}

export interface EventData {
  category: string;
  action: string;
  label?: string;
  value?: number;
}

// Track page view
export async function trackPageView(data: PageViewData) {
  // Don't track admin pages
  if (data.path.startsWith('/admin')) {
    return;
  }

  if (!hasAnalyticsConsent()) {
    console.log("📊 Analytics tracking disabled (no consent)");
    return;
  }

  try {
    const payload = {
      type: "pageview",
      sessionId: getSessionId(),
      visitorId: getVisitorId(),
      path: data.path,
      title: data.title,
      referrer: data.referrer || document.referrer,
      deviceType: getDeviceType(),
      browser: getBrowserInfo(),
      os: getOSInfo(),
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      language: navigator.language,
      timestamp: new Date().toISOString(),
    };

    const response = await fetch(`${apiUrl}/analytics/track`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error("Failed to track page view:", response.status);
    } else {
      console.log("✅ Page view tracked:", data.path);
    }
  } catch (error) {
    console.error("Error tracking page view:", error);
  }
}

// Track custom event
export async function trackEvent(data: EventData) {
  if (!hasAnalyticsConsent()) {
    console.log("📊 Analytics tracking disabled (no consent)");
    return;
  }

  try {
    const payload = {
      type: "event",
      sessionId: getSessionId(),
      visitorId: getVisitorId(),
      category: data.category,
      action: data.action,
      label: data.label,
      value: data.value,
      timestamp: new Date().toISOString(),
    };

    const response = await fetch(`${apiUrl}/analytics/track`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error("Failed to track event:", response.status);
    } else {
      console.log("✅ Event tracked:", data.action);
    }
  } catch (error) {
    console.error("Error tracking event:", error);
  }
}

// Track session start
export async function trackSessionStart() {
  if (!hasAnalyticsConsent()) return;

  try {
    const payload = {
      type: "session_start",
      sessionId: getSessionId(),
      visitorId: getVisitorId(),
      isReturning: !!localStorage.getItem(VISITOR_ID_KEY + "_has_visited"),
      timestamp: new Date().toISOString(),
    };

    // Mark visitor as having visited before
    localStorage.setItem(VISITOR_ID_KEY + "_has_visited", "true");

    await fetch(`${apiUrl}/analytics/track`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify(payload),
    });

    console.log("✅ Session started");
  } catch (error) {
    console.error("Error tracking session start:", error);
  }
}

// Convenience functions for common events
export const Analytics = {
  pageView: trackPageView,
  event: trackEvent,
  sessionStart: trackSessionStart,
  
  // Predefined events
  clickButton: (label: string) =>
    trackEvent({ category: "Button", action: "Click", label }),
  
  clickLink: (label: string) =>
    trackEvent({ category: "Link", action: "Click", label }),
  
  submitForm: (formName: string) =>
    trackEvent({ category: "Form", action: "Submit", label: formName }),
  
  viewProperty: (propertyId: string) =>
    trackEvent({ category: "Property", action: "View", label: propertyId }),
  
  callPhone: () =>
    trackEvent({ category: "Contact", action: "Phone Call" }),
  
  openEmail: () =>
    trackEvent({ category: "Contact", action: "Email" }),
};