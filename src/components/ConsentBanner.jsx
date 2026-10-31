import React, { useEffect, useState } from "react";
import { CONSENT_OPEN_EVENT, getConsent, setConsent } from "../lib/analytics";
import { useTranslation } from "../lib/i18n";

/** Asks before analytics load. Shown once, and again from "Cookie settings" in the footer. */
const ConsentBanner = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!getConsent()) setOpen(true);
    const onOpen = () => setOpen(true);
    window.addEventListener(CONSENT_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, onOpen);
  }, []);

  if (!open) return null;

  const choose = (value) => {
    setConsent(value);
    setOpen(false);
  };

  return (
    <section
      aria-label={t("ui.consent.title")}
      className="enter fixed inset-x-3 bottom-3 z-70 rounded-2xl border border-line-strong bg-card-solid p-5 shadow-2xl sm:bottom-5 sm:left-auto sm:right-5 sm:max-w-md"
    >
      <h2 className="text-sm font-semibold">{t("ui.consent.title")}</h2>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">
        {t("ui.consent.text")}{" "}
        <a href="/privacy/" className="text-fg underline underline-offset-4">
          {t("ui.consent.privacy")}
        </a>
      </p>
      <div className="mt-4 flex flex-wrap justify-end gap-2">
        <button type="button" onClick={() => choose("denied")} className="btn btn-ghost">
          {t("ui.consent.decline")}
        </button>
        <button type="button" onClick={() => choose("granted")} className="btn btn-primary">
          {t("ui.consent.accept")}
        </button>
      </div>
    </section>
  );
};

export default ConsentBanner;
