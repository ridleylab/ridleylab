type EventParams = Record<string, any>;

export function trackEvent(eventName: string, params: EventParams = {}) {
  if (typeof window === "undefined") return;

  // Push to GTM dataLayer
  const dataLayer = (window as any).dataLayer || [];
  dataLayer.push({
    event: eventName,
    ...params,
  });

  // Push to Google Analytics gtag
  const gtag = (window as any).gtag;
  if (typeof gtag === "function") {
    gtag("event", eventName, params);
  }
}
export function trackConsultationClick() {
  trackEvent("consultation_click", {
    category: "leads",
    label: "whatsapp_cta",
  });
}
