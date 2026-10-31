import { useTranslation } from "../lib/i18n";

/** Segmented EN / DE toggle. */
const LanguageSwitcher = ({ className = "" }) => {
  const { t, lang, setLang, available } = useTranslation();

  return (
    <div
      role="group"
      aria-label={t("ui.a11y.language")}
      className={`relative flex rounded-full border border-line p-0.5 ${className}`}
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-0.5 left-0.5 w-[calc(50%-2px)] rounded-full bg-fg/10 transition-transform duration-300 ease-out-expo"
        style={{ transform: `translateX(${available.findIndex((l) => l.code === lang) * 100}%)` }}
      />
      {available.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => setLang(l.code)}
          aria-pressed={l.code === lang}
          title={l.name}
          className={`relative z-10 w-9 rounded-full py-1 font-mono text-[11px] font-medium transition-colors ${
            l.code === lang ? "text-fg" : "text-subtle hover:text-fg"
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
