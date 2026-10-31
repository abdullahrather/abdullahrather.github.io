import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import en from "../languages/en.json";

const DEFAULT_LANG = "en";
// English ships in the main bundle; other locales are fetched on demand.
const TRANSLATIONS = { en };
const LOADERS = { de: () => import("../languages/de.json") };
const AVAILABLE = [
  { code: "en", label: "EN", name: "English" },
  { code: "de", label: "DE", name: "Deutsch" },
];

/** Fetches a lazily loaded locale; resolves immediately when already available. */
export const loadLocale = async (lang) => {
  if (!TRANSLATIONS[lang] && LOADERS[lang]) TRANSLATIONS[lang] = (await LOADERS[lang]()).default;
};

const I18nContext = createContext({
  lang: DEFAULT_LANG,
  setLang: () => {},
  available: AVAILABLE,
  t: (key) => key,
});

export const getInitialLang = () => {
  try {
    const saved = localStorage.getItem("lang");
    if (saved && AVAILABLE.some((l) => l.code === saved)) return saved;
  } catch {
    // storage unavailable
  }
  if (typeof navigator !== "undefined" && navigator.language?.toLowerCase().startsWith("de")) {
    return "de";
  }
  return DEFAULT_LANG;
};

/**
 * `initialLang` must already be loaded (English, or a locale main.jsx preloaded).
 * `preferredLang`, when different, is switched to in place after mount — used when
 * hydrating the English pre-render for a visitor who prefers another language.
 */
export const TranslationProvider = ({ children, initialLang = DEFAULT_LANG, preferredLang }) => {
  const [lang, setLangState] = useState(initialLang);

  // Only switch once the locale has loaded, so the UI never claims a language it can't show.
  const latestRequest = useRef(null);
  const activate = useCallback(
    (next) => {
      latestRequest.current = next;
      return loadLocale(next)
        .then(() => {
          // A slower, earlier request must not override the visitor's latest choice.
          if (latestRequest.current !== next) return false;
          setLangState(next);
          return true;
        })
        .catch((error) => {
          console.warn(`Could not load "${next}" translations`, error);
          return false;
        });
    },
    []
  );

  const setLang = useCallback(
    (next) =>
      activate(next).then((ok) => {
        if (!ok) return;
        try {
          localStorage.setItem("lang", next);
        } catch {
          // ignore
        }
      }),
    [activate]
  );

  useEffect(() => {
    const reveal = () => delete document.documentElement.dataset.langPending;
    if (preferredLang && preferredLang !== initialLang) activate(preferredLang).finally(reveal);
    else reveal();
    // Mount-only: the preferred language is resolved once at startup.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // Resolve a dotted key from the active locale (falling back to English) and substitute {vars}.
  const t = useCallback(
    (key, vars) => {
      const resolve = (bucket) =>
        key.split(".").reduce((acc, part) => (acc != null ? acc[part] : undefined), bucket);

      let value = resolve(TRANSLATIONS[lang]);
      if (value === undefined) value = resolve(TRANSLATIONS.en);
      if (value === undefined) return key;

      if (vars && typeof value === "string") {
        Object.entries(vars).forEach(([k, v]) => {
          value = value.replace(new RegExp(`\\{\\s*${k}\\s*\\}`, "g"), String(v));
        });
      }
      return value;
    },
    [lang]
  );

  const value = useMemo(() => ({ lang, setLang, available: AVAILABLE, t }), [lang, setLang, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useTranslation = () => useContext(I18nContext);

