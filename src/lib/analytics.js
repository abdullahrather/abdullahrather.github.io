import { useEffect } from "react";

const GA_ID = "G-RSXZVL7MRQ";
const CONSENT_KEY = "analytics-consent";
export const CONSENT_OPEN_EVENT = "app:open-consent";

let started = false;

export const getConsent = () => {
  try {
    return localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
};

const hasConsent = () => getConsent() === "granted";

/** Loads Google Analytics. Nothing is requested from Google until this runs. */
export const startAnalytics = () => {
  window[`ga-disable-${GA_ID}`] = false;
  if (started) return;
  started = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("consent", "default", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, { allow_google_signals: false, allow_ad_personalization_signals: false });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
};

const stopAnalytics = () => {
  window[`ga-disable-${GA_ID}`] = true;
  const domain = window.location.hostname.replace(/^www\./, "");
  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0].trim();
    if (!name.startsWith("_ga")) return;
    const expired = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    document.cookie = expired;
    document.cookie = `${expired}; domain=.${domain}`;
  });
};

export const setConsent = (value) => {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // Without storage the choice lasts for this page view only.
  }
  if (value === "granted") startAnalytics();
  else stopAnalytics();
};

export const openConsentSettings = () => window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));

export function trackEvent(eventName, params = {}) {
  if (!hasConsent() || typeof window.gtag !== "function") return;
  window.gtag("event", eventName, { site_language: document.documentElement.lang, ...params });
}

export function trackLink(href, label = "", category = "link") {
  trackEvent("link_click", {
    link_url: href,
    link_label: label,
    link_category: category,
  });
}

/** Sends section_view the first time each section reaches the middle of the screen. */
export const useSectionTracking = (ids) => {
  const key = ids.join(",");

  useEffect(() => {
    const seen = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ isIntersecting, target }) => {
          if (!isIntersecting || seen.has(target.id) || !hasConsent()) return;
          seen.add(target.id);
          trackEvent("section_view", { section: target.id });
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    key.split(",").forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, [key]);
};
