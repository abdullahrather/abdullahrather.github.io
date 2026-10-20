import React, { useEffect, useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { Icon } from "./Icons";
import { useTranslation } from "../lib/i18n";
import { useTheme } from "../lib/theme";
import { useActiveSection } from "../lib/hooks";
import { SECTIONS } from "../lib/site";

const SECTION_IDS = SECTIONS.map((s) => s.id);

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
  const active = useActiveSection(SECTION_IDS);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent));
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    if (!menuOpen) return undefined;
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
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

          <ul className="hidden items-center gap-0.5 md:flex">
            {SECTIONS.map(({ id, key }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={active === id ? "true" : undefined}
                  className={`relative isolate rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                    active === id ? "text-fg" : "text-muted hover:text-fg"
                  }`}
                >
                  {active === id && (
                    <span aria-hidden="true" className="absolute inset-0 -z-10 rounded-full bg-fg/7 ring-1 ring-line" />
                  )}
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
              <span className="flex gap-0.5" aria-hidden="true">
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
