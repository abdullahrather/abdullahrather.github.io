import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "../lib/i18n";

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

  return (
    <div className='relative' ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className='p-2 rounded-full hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors flex items-center gap-2 text-sm font-medium'
        aria-haspopup='menu'
        aria-expanded={open}
      >
        <span className='uppercase'>{(available.find((a) => a.code === lang) || {}).label || lang}</span>
        <svg className='h-4 w-4' viewBox='0 0 20 20' fill='currentColor'>
          <path d='M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z' />
        </svg>
      </button>

      {open && (
        <div className='absolute right-0 mt-2 w-40 rounded-md bg-white dark:bg-slate-800 shadow-lg ring-1 ring-black/5 z-50'>
          <ul className='py-1'>
            {available.map((l) => (
              <li key={l.code}>
                <button
                  onClick={() => {
                    setLang(l.code);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 ${l.code === lang ? "font-semibold" : ""}`}
                >
                  {l.name || l.label}
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
