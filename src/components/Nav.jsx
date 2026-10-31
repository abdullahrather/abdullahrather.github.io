import React, { useEffect, useRef, useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { Icon } from "./Icons";
import { useTranslation } from "../lib/i18n";
import { useTheme } from "../lib/theme";
import { useActiveSection } from "../lib/hooks";
import { SECTIONS } from "../lib/site";

// "top" (the hero) is tracked too so the highlight clears when scrolling back up.
const TRACKED_IDS = ["top", ...SECTIONS.map((s) => s.id)];

export const ThemeToggle = () => {
  const { t } = useTranslation();
  const { isDark, toggleTheme } = useTheme();
  return (
    <button type="button" onClick={toggleTheme} className="icon-btn" aria-label={t("ui.theme")} title={t("ui.theme")}>
      <Icon name={isDark ? "sun" : "moon"} className="size-4.5" />
    </button>
  );
};

const Nav = ({ onOpenCommand }) => {
  const { t } = useTranslation();
  const active = useActiveSection(TRACKED_IDS);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMac, setIsMac] = useState(false);
  const linksRef = useRef(null);
  const [pill, setPill] = useState({ left: 0, width: 0, visible: false });

  // Slide one shared highlight to the active link; re-measure on language or size changes.
  useEffect(() => {
    const list = linksRef.current;
    if (!list) return undefined;
    const measure = () => {
      const link = list.querySelector('[aria-current="true"]');
      setPill((prev) =>
        link ? { left: link.offsetLeft, width: link.offsetWidth, visible: true } : { ...prev, visible: false }
      );
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    return () => observer.disconnect();
  }, [active, t]);

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent));
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    document.documentElement.style.overflow = "hidden";
    const close = () => setMenuOpen(false);
    const onKey = (e) => e.key === "Escape" && close();
    // The menu is md:hidden — close it (and release the scroll lock) when the viewport widens.
    const desktop = window.matchMedia("(min-width: 768px)");
    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", close);
    return () => {
      document.documentElement.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", close);
    };
  }, [menuOpen]);

  return (
    <>
      {/* Reading progress */}
      <div aria-hidden="true" className="scroll-progress fixed inset-x-0 top-0 z-60 h-0.5 bg-linear-to-r from-accent to-accent-2" />

      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
        <nav
          aria-label="Primary"
          className={`mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 rounded-full border pl-2 pr-2 transition-all duration-500 ease-out-expo sm:pl-3 ${
            scrolled || menuOpen
              ? "border-line bg-bg/70 shadow-[0_8px_32px_-12px_rgb(0_0_0/0.25)] backdrop-blur-xl backdrop-saturate-150"
              : "border-transparent bg-transparent"
          }`}
        >
          <a href="#top" className="group flex items-center gap-2.5 rounded-full pr-2" onClick={() => setMenuOpen(false)}>
            <span className="grid size-9 place-items-center rounded-full bg-fg font-mono text-xs font-semibold tracking-tight text-bg transition-transform duration-500 ease-out-expo group-hover:rotate-[-8deg]">
              AR
            </span>
            <span className="hidden text-sm font-medium tracking-tight sm:block">Abdullah Rather</span>
          </a>

          <ul ref={linksRef} className="relative hidden items-center gap-0.5 md:flex">
            <li
              role="presentation"
              aria-hidden="true"
              className={`absolute inset-y-0 left-0 rounded-full bg-fg/7 ring-1 ring-line transition-[transform,width,opacity] duration-500 ease-out-expo ${pill.visible ? "opacity-100" : "opacity-0"}`}
              style={{ width: pill.width, transform: `translateX(${pill.left}px)` }}
            />
            {SECTIONS.map(({ id, key }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={active === id ? "true" : undefined}
                  className={`relative block rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                    active === id ? "text-fg" : "text-muted hover:text-fg"
                  }`}
                >
                  {t(key)}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={onOpenCommand}
              title={t("ui.cmd.open")}
              className="hidden h-9 items-center gap-2 rounded-full border border-line px-3 text-xs text-muted transition-colors hover:border-line-strong hover:text-fg sm:flex"
            >
              <Icon name="search" className="size-3.5" />
              <span className="sr-only">{t("ui.cmd.open")}</span>
              <span className="flex gap-0.5 pointer-coarse:hidden" aria-hidden="true">
                <kbd className="kbd">{isMac ? "⌘" : "Ctrl"}</kbd>
                <kbd className="kbd">K</kbd>
              </span>
            </button>
            <LanguageSwitcher className="hidden sm:flex" />
            <ThemeToggle />
            <button
              type="button"
              className="icon-btn md:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? t("ui.close") : t("ui.menu")}
            >
              <Icon name={menuOpen ? "x" : "menu"} className="size-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 bg-bg/95 backdrop-blur-xl transition-all duration-500 ease-out-expo md:hidden ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="flex h-full flex-col justify-between px-6 pb-10 pt-28">
          <ul className="space-y-1">
            {SECTIONS.map(({ id, key }, i) => (
              <li
                key={id}
                className={`transition-all duration-700 ease-out-expo ${menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                style={{ transitionDelay: menuOpen ? `${80 + i * 50}ms` : "0ms" }}
              >
                <a
                  href={`#${id}`}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-baseline gap-4 border-b border-line py-4 text-4xl font-semibold tracking-tight"
                >
                  <span className="font-mono text-xs text-subtle">0{i + 1}</span>
                  {t(key)}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between">
            <LanguageSwitcher />
            <button type="button" onClick={() => { setMenuOpen(false); onOpenCommand(); }} className="btn btn-ghost">
              <Icon name="command" className="size-4" />
              {t("ui.cmd.open")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
