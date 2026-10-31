import { Icon } from "./Icons";
import { useTranslation } from "../lib/i18n";
import { useClock, useNow } from "../lib/hooks";
import { EMAIL, SECTIONS, SOCIALS, TIMEZONE } from "../lib/site";

const Footer = () => {
  const { t, lang } = useTranslation();
  const time = useClock(TIMEZONE, lang === "de" ? "de-DE" : "en-GB");
  const year = useNow().getUTCFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div className="container-x py-16">
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          <div className="max-w-sm">
            <p className="text-lg font-semibold tracking-tight">Abdullah Rather</p>
            <p className="mt-2 text-sm text-muted">{t("hero.role")}</p>
            <a href={`mailto:${EMAIL}`} className="mt-6 inline-block text-sm text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent">
              {EMAIL}
            </a>
          </div>

          <div className="grid grid-cols-2 gap-12 text-sm sm:grid-cols-3">
            <ul className="space-y-3">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-muted transition-colors hover:text-fg">{t(s.key)}</a>
                </li>
              ))}
            </ul>
            <ul className="space-y-3">
              {SOCIALS.map((s) => (
                <li key={s.id}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-muted transition-colors hover:text-fg">
                    {s.name}
                    <Icon name="arrowUpRight" className="size-3" />
                  </a>
                </li>
              ))}
            </ul>
            <div className="col-span-2 space-y-1 sm:col-span-1">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-subtle">{t("ui.footer.local")}</p>
              <p className="font-mono text-2xl tabular-nums">{time}</p>
              <p className="text-xs text-subtle">CET / CEST</p>
            </div>
          </div>
        </div>

        {/* Oversized wordmark */}
        <p
          aria-hidden="true"
          className="pointer-events-none mt-16 select-none bg-linear-to-b from-fg/15 to-transparent bg-clip-text text-center text-[17vw] font-semibold leading-[0.8] tracking-[-0.06em] text-transparent lg:text-[12.5rem]"
        >
          Abdullah
        </p>

        <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 text-xs text-subtle sm:flex-row">
          <p>© {year} Abdullah Rather. {t("ui.footer.rights")}</p>
          <p className="hidden md:block">{t("ui.footer.built")}</p>
          <a href="#top" className="inline-flex items-center gap-1.5 transition-colors hover:text-fg">
            {t("ui.footer.top")}
            <Icon name="arrowUp" className="size-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
