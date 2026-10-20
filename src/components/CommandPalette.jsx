import React, { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "./Icons";
import { trackEvent } from "../lib/analytics";
import { useTranslation } from "../lib/i18n";
import { useTheme } from "../lib/theme";
import { useCopy } from "../lib/hooks";
import { toast } from "../lib/toast";
import { EMAIL, SECTIONS, SOCIALS, getResume } from "../lib/site";

const SECTION_ICONS = { about: "sparkle", experience: "briefcase", expertise: "layers", projects: "file", contact: "mail" };

/** ⌘K / Ctrl+K command menu built on the native <dialog> element. */
const CommandPalette = ({ open, onOpenChange }) => {
  const { t, lang, setLang } = useTranslation();
  const { toggleTheme } = useTheme();
  const [, copy] = useCopy();
  const dialogRef = useRef(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);

  // Global shortcut
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      setQuery("");
      setIndex(0);
      dialog.showModal();
      inputRef.current?.focus();
      trackEvent("command_palette_open");
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  const groups = useMemo(() => {
    const resume = getResume(lang);
    const go = (id) => () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    const visit = (url) => () => window.open(url, "_blank", "noopener,noreferrer");
    return [
      {
        label: t("ui.cmd.nav"),
        items: SECTIONS.map((s) => ({ id: s.id, label: t(s.key), keywords: s.id, icon: SECTION_ICONS[s.id], run: go(s.id) })),
      },
      {
        label: t("ui.cmd.actions"),
        items: [
          { id: "theme", label: t("ui.cmd.theme"), icon: "sun", run: () => toggleTheme() },
          { id: "lang", label: t("ui.cmd.lang"), icon: "globe", run: () => setLang(lang === "de" ? "en" : "de") },
          { id: "copy", label: t("ui.cmd.copy"), icon: "copy", hint: EMAIL, run: async () => { if (await copy(EMAIL)) toast(t("ui.contact.copied")); } },
          { id: "view-resume", label: t("ui.cmd.view_resume"), icon: "file", run: () => { trackEvent("resume_view"); visit(resume.href)(); } },
          {
            id: "resume",
            label: t("ui.cmd.resume"),
            icon: "download",
            run: () => {
              trackEvent("resume_download");
              const a = Object.assign(document.createElement("a"), { href: resume.href, download: resume.fileName });
              a.click();
            },
          },
        ],
      },
      {
        label: t("ui.cmd.links"),
        items: SOCIALS.map((s) => ({ id: s.id, label: s.name, icon: s.id, hint: s.handle, run: visit(s.url) })),
      },
    ];
  }, [t, lang, setLang, toggleTheme, copy]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return groups;
    return groups
      .map((g) => ({ ...g, items: g.items.filter((i) => `${i.label} ${i.hint ?? ""} ${i.keywords ?? ""}`.toLowerCase().includes(q)) }))
      .filter((g) => g.items.length);
  }, [groups, query]);

  const flat = filtered.flatMap((g) => g.items);

  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: "nearest" });
  }, [index]);

  const runItem = (item) => {
    onOpenChange(false);
    // Let the dialog close (and release the scroll lock) before acting.
    requestAnimationFrame(() => item.run());
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => (i + 1) % Math.max(flat.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => (i - 1 + flat.length) % Math.max(flat.length, 1));
    } else if (e.key === "Enter" && flat[index]) {
      e.preventDefault();
      runItem(flat[index]);
    }
  };

  let position = -1;

  return (
    <dialog
      ref={dialogRef}
      onClose={() => onOpenChange(false)}
      onClick={(e) => e.target === dialogRef.current && onOpenChange(false)}
      aria-label={t("ui.cmd.open")}
      className="mx-auto mt-[12vh] w-[min(100%-1.5rem,36rem)] overflow-hidden rounded-2xl border border-line bg-card-solid p-0 text-fg shadow-2xl backdrop:bg-transparent"
    >
      <div className="flex items-center gap-3 border-b border-line px-4">
        <Icon name="search" className="size-4 text-subtle" />
        <input
          ref={inputRef}
          autoFocus
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIndex(0);
          }}
          onKeyDown={onKeyDown}
          placeholder={t("ui.cmd.placeholder")}
          className="h-14 flex-1 bg-transparent text-sm outline-none placeholder:text-subtle"
          role="combobox"
          aria-expanded="true"
          aria-controls="cmd-list"
          aria-activedescendant={flat[index] ? `cmd-${flat[index].id}` : undefined}
        />
        <kbd className="kbd">Esc</kbd>
      </div>

      <div ref={listRef} id="cmd-list" role="listbox" className="max-h-[min(60dvh,24rem)] overflow-y-auto p-2">
        {flat.length === 0 && <p className="px-3 py-10 text-center text-sm text-muted">{t("ui.cmd.empty")}</p>}
        {filtered.map((group) => (
          <div key={group.label} role="group" aria-label={group.label} className="mb-1">
            <p className="px-3 pb-1.5 pt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-subtle">{group.label}</p>
            {group.items.map((item) => {
              position += 1;
              const i = position;
              const selected = i === index;
              return (
                <div
                  key={item.id}
                  id={`cmd-${item.id}`}
                  role="option"
                  aria-selected={selected}
                  onMouseMove={() => setIndex(i)}
                  onClick={() => runItem(item)}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                    selected ? "bg-fg/7 text-fg" : "text-muted"
                  }`}
                >
                  <Icon name={item.icon} className="size-4" />
                  <span className="flex-1">{item.label}</span>
                  {item.hint && <span className="hidden font-mono text-xs text-subtle sm:block">{item.hint}</span>}
                  {selected && <Icon name="arrowRight" className="size-3.5 text-subtle" />}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 border-t border-line px-4 py-2.5 font-mono text-[10px] text-subtle">
        <span className="flex items-center gap-1.5"><kbd className="kbd">↵</kbd>{t("ui.cmd.hint_select")}</span>
        <span className="flex items-center gap-1.5"><kbd className="kbd">↑</kbd><kbd className="kbd">↓</kbd>{t("ui.cmd.hint_nav")}</span>
        <span className="ml-auto flex items-center gap-1.5"><kbd className="kbd">Esc</kbd>{t("ui.cmd.hint_close")}</span>
      </div>
    </dialog>
  );
};

export default CommandPalette;
