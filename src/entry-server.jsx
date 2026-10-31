import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App.jsx";
import { TranslationProvider } from "./lib/i18n";

/** Renders the English page to static HTML at build time (see scripts/build.mjs). */
export const render = () =>
  renderToString(
    <StrictMode>
      <TranslationProvider initialLang="en">
        <App />
      </TranslationProvider>
    </StrictMode>,
  );
