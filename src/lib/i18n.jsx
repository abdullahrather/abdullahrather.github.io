import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
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

export const TranslationProvider = ({ children, initialLang }) => {
  const [lang, setLangState] = useState(() => initialLang ?? getInitialLang());
  const [, setLoaded] = useState(0);

  const setLang = useCallback((newLang) => {
    setLangState(newLang);
    try {
      localStorage.setItem("lang", newLang);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    if (TRANSLATIONS[lang] || !LOADERS[lang]) return;
    loadLocale(lang).then(() => setLoaded((n) => n + 1));
  }, [lang]);

  const ready = Boolean(TRANSLATIONS[lang]);

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
    // `ready` re-creates t once a lazily loaded locale arrives
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lang, ready]
  );

  const value = useMemo(() => ({ lang, setLang, available: AVAILABLE, t }), [lang, setLang, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useTranslation = () => useContext(I18nContext);

export default I18nContext;
