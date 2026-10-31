import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { getConsent, startAnalytics, trackLink } from "./lib/analytics";
import { TranslationProvider, getInitialLang, loadLocale } from "./lib/i18n";

if (getConsent() === "granted") startAnalytics();

const container = document.getElementById("root");
const preferred = getInitialLang();

const app = (initialLang, preferredLang) => (
  <StrictMode>
    <TranslationProvider initialLang={initialLang} preferredLang={preferredLang}>
      <App />
    </TranslationProvider>
  </StrictMode>
);

if (container.hasChildNodes()) {
  // Production: the HTML is pre-rendered in English. Hydrate it as-is; the provider then
  // switches to the visitor's language in place (index.html hides the page meanwhile).
  hydrateRoot(container, app("en", preferred));
} else {
  // Dev server: nothing pre-rendered, so load the locale first and render directly.
  loadLocale(preferred)
    .then(
      () => preferred,
      () => "en",
    )
    .then((lang) => createRoot(container).render(app(lang)));
}

// Section ids changed in the 2026 redesign; keep old shared links (#work-experience …) working.
const LEGACY_ANCHORS = { "#hero": "#top", "#skills": "#about", "#work-experience": "#experience" };
const legacyTarget = LEGACY_ANCHORS[window.location.hash];
if (legacyTarget) {
  history.replaceState(null, "", legacyTarget);
  requestAnimationFrame(() => document.querySelector(legacyTarget)?.scrollIntoView());
}

// Delegated link-click analytics
document.addEventListener(
  "click",
  (event) => {
    const anchor = event.target.closest?.("a");
    const href = anchor?.getAttribute("href");
    if (!href) return;

    const label = (anchor.getAttribute("aria-label") || anchor.textContent || "").trim();
    const isInternal = new URL(anchor.href).origin === window.location.origin;
    trackLink(href, label, isInternal ? "internal" : "outbound");
  },
  { capture: true },
);
