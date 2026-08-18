export type AnalyticsEventName = "slide_view" | "cta_click" | "faq_open";

export type AnalyticsPayload = Record<string, string | number | boolean>;

export type AnalyticsEvent = {
  name: AnalyticsEventName;
  payload?: AnalyticsPayload;
  ts: number;
};

declare global {
  interface Window {
    shiverAnalytics?: AnalyticsEvent[];
  }
}

export function track(name: AnalyticsEventName, payload?: AnalyticsPayload) {
  if (typeof window === "undefined") {
    return;
  }

  const event: AnalyticsEvent = {
    name,
    payload,
    ts: Date.now(),
  };

  window.shiverAnalytics = window.shiverAnalytics ?? [];
  window.shiverAnalytics.push(event);
  window.dispatchEvent(new CustomEvent("shiver:analytics", { detail: event }));
}
