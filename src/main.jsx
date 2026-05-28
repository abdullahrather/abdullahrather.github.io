import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { trackLink } from "./lib/analytics";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

if (typeof window !== "undefined") {
  document.addEventListener(
    "click",
    (event) => {
      const anchor = event.target.closest?.("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href") || "";
      if (!href) return;

      const label = (anchor.getAttribute("aria-label") || anchor.textContent || "").trim();
      const isExternal = href.startsWith("http") && !href.includes(window.location.hostname);
      trackLink(href, label, isExternal ? "outbound" : "internal");
    },
    { capture: true }
  );
}
