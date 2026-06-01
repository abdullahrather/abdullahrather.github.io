import React, { createContext, useContext, useMemo, useState } from "react";

const DEFAULT_LANG = "en";

const I18nContext = createContext({
  lang: DEFAULT_LANG,
  setLang: () => {},
  available: [{ code: DEFAULT_LANG, label: "EN" }],
  t: (key, vars) => key,
});

export const TranslationProvider = ({ children }) => {
  const [lang, setLangState] = useState(() => {
    try {
      return localStorage.getItem("lang") || DEFAULT_LANG;
    } catch (e) {
      return DEFAULT_LANG;
    }
  });

  const setLang = (newLang) => {
    setLangState(newLang);
    try {
      localStorage.setItem("lang", newLang);
    } catch (e) {
      // ignore
    }
  };

  // Available languages can be expanded later when locale files are added.
  const available = useMemo(() => [{ code: "en", label: "EN", name: "English" }], []);

  // Basic translator: if a global translations map is present on window, use it.
  const t = (key, vars) => {
    try {
      const map = (typeof window !== "undefined" && window.__TRANSLATIONS__) || {};
      const bucket = map[lang] || {};
      let value = key.split(".").reduce((acc, part) => (acc && acc[part] ? acc[part] : undefined), bucket);
      if (value === undefined) {
        // fallback: return the key so existing components keep showing original English
        return key;
      }

      if (vars && typeof value === "string") {
        Object.keys(vars).forEach((k) => {
          value = value.replace(new RegExp(`\\{\\s*${k}\\s*\\}`, "g"), String(vars[k]));
        });
      }

      return value;
    } catch (e) {
      return key;
    }
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, available, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useTranslation = () => useContext(I18nContext);

export default I18nContext;
