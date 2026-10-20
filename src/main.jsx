import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { trackLink } from "./lib/analytics";
import { TranslationProvider, getInitialLang, loadLocale } from "./lib/i18n";

const container = document.getElementById("root");
const lang = getInitialLang();

const app = (
  <StrictMode>
    <TranslationProvider initialLang={lang}>
      <App />
    </TranslationProvider>
  </StrictMode>
);

// The HTML is pre-rendered in English. Hydrate it when it matches the visitor's language;
// otherwise fetch their locale first and render fresh.
if (container.hasChildNodes() && lang === "en") {
  hydrateRoot(container, app);
} else {
  loadLocale(lang).finally(() => createRoot(container).render(app));
}

// Delegated link-click analytics
document.addEventListener(
  "click",
  (event) => {
    const anchor = event.target.closest?.("a");
    const href = anchor?.getAttribute("href");
    if (!href) return;

    const label = (anchor.getAttribute("aria-label") || anchor.textContent || "").trim();
    const isExternal = href.startsWith("http") && !href.includes(window.location.hostname);
    trackLink(href, label, isExternal ? "outbound" : "internal");
  },
  { capture: true }
);
