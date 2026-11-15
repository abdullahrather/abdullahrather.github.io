import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App.jsx";
import { TranslationProvider } from "./lib/i18n";
import { getRoute } from "./lib/route";

/** Renders one English page to static HTML at build time (see scripts/build.mjs). */
export const render = (pathname = "/") =>
  renderToString(
    <StrictMode>
      <TranslationProvider initialLang="en">
        <App route={getRoute(pathname)} />
      </TranslationProvider>
    </StrictMode>,
  );
