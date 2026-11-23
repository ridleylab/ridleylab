type EventParams = Record<string, unknown>;

type AnalyticsWindow = Window & {
  dataLayer?: Record<string, unknown>[];
  gtag?: (...args: unknown[]) => void;
};

export function trackEvent(eventName: string, params: EventParams = {}) {
  if (typeof window === "undefined") return;

  const win = window as AnalyticsWindow;

  // Push to GTM dataLayer
  const dataLayer = win.dataLayer || [];
  dataLayer.push({
    event: eventName,
    ...params,
  });

  // Push to Google Analytics gtag
  if (typeof win.gtag === "function") {
    win.gtag("event", eventName, params);
  }
}

export function trackConsultationClick() {
  trackEvent("consultation_click", {
    category: "leads",
    label: "whatsapp_cta",
  });
}
