import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "../lib/i18n";

// Inline SVG flags — no downloads or external files needed
const FLAGS = {
  en: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" className="h-4 w-6 rounded-sm shadow-sm flex-shrink-0">
      <clipPath id="en-t"><path d="M30,15 h30 v15 z"/></clipPath>
      <rect width="60" height="30" fill="#012169"/>
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" clipPath="url(#en-t)"/>
      <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10"/>
      <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6"/>
    </svg>
  ),
  de: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3" className="h-4 w-6 rounded-sm shadow-sm flex-shrink-0">
      <rect width="5" height="1" y="0" fill="#000"/>
      <rect width="5" height="1" y="1" fill="#D00"/>
      <rect width="5" height="1" y="2" fill="#FFCE00"/>
    </svg>
  ),
};

const LanguageSwitcher = () => {
  const { lang, setLang, available } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onDocClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const current = available.find((a) => a.code === lang) || available[0];

  return (
    <div className="relative" ref={ref}>
      {/* Trigger — flag + caret, matches nav icon-button size/style */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-sm font-medium transition-colors hover:bg-slate-200/60 dark:hover:bg-slate-700/60"
        aria-haspopup="menu"
        aria-expanded={open}
        title={current.name}
      >
        {FLAGS[current.code] ?? (
          <span className="uppercase text-xs">{current.label}</span>
        )}
        <svg
          className={`h-3.5 w-3.5 text-slate-500 dark:text-slate-400 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-44 origin-top-right rounded-xl border border-slate-200/60 bg-white/90 shadow-xl shadow-slate-900/10 ring-1 ring-black/5 backdrop-blur-md dark:border-slate-700/50 dark:bg-slate-800/90 z-50 overflow-hidden">
          <ul className="py-1.5">
            {available.map((l) => (
              <li key={l.code}>
                <button
                  onClick={() => {
                    setLang(l.code);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                    l.code === lang
                      ? "bg-indigo-50 font-semibold text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300"
                      : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700/60"
                  }`}
                >
                  {FLAGS[l.code] ?? null}
                  <span>{l.name || l.label}</span>
                  {l.code === lang && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-indigo-500" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
