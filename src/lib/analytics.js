export function trackEvent(eventName, params = {}) {
  try {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({ event: eventName, ...params });
    }
  } catch (error) {
    void error;
  }

  try {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", eventName, params);
    }
  } catch (error) {
    void error;
  }

  try {
    const key = `analytics_${eventName}`;
    const current = Number(localStorage.getItem(key) || "0");
    localStorage.setItem(key, String(current + 1));
  } catch (error) {
    void error;
  }
}

export function trackLink(href, label = "", category = "link") {
  trackEvent("link_click", {
    link_url: href,
    link_label: label,
    link_category: category,
  });
}
