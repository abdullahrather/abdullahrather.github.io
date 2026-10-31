import { Component, Suspense, lazy, useEffect, useRef, useState } from "react";
import SectionHeader from "./SectionHeader";
import { ContentIcon, Icon } from "./Icons";
import { trackEvent } from "../lib/analytics";
import { useTranslation } from "../lib/i18n";
import { spotlight, useCopy, useReveal } from "../lib/hooks";
import { useTheme } from "../lib/theme";
import { EMAIL, SOCIALS, TIMEZONE } from "../lib/site";

const USER_ID = import.meta.env.VITE_EMAILJS_USER_ID || "";
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "";
const NOTIFY_TO_EMAIL = import.meta.env.VITE_EMAILJS_NOTIFY_TO || "";
const TEMPLATE_NOTIFY_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_NOTIFY || "";
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || "";
const IS_FORM_ENABLED = Boolean(USER_ID && SERVICE_ID && NOTIFY_TO_EMAIL && TEMPLATE_NOTIFY_ID && RECAPTCHA_SITE_KEY);

// reCAPTCHA (and its Google script) only loads once the visitor starts filling in the form.
const ReCAPTCHA = lazy(() => import("react-google-recaptcha"));

// A failed chunk download must not take the whole page down with it.
class RecaptchaBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

const formatTime = (date, timeZone, locale = "en-US") =>
  date.toLocaleString(locale, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
    ...(timeZone && { timeZone }),
  });

// Locale-aware strings that drive the {{variables}} in the AutoReply template.
const buildEmailStrings = (isDE, name) => ({
  email_subject: isDE ? `Vielen Dank für Ihre Nachricht, ${name}!` : `Thanks for reaching out, ${name}!`,
  email_subtitle: isDE ? "KI-Entwickler · PHP Backend / Full-Stack" : "AI Software Engineer · PHP Backend / Full-Stack",
  email_badge: isDE ? "Nachricht erfolgreich erhalten" : "Message received",
  email_heading: isDE ? "Vielen Dank für Ihre Nachricht!" : "Thank you for reaching out!",
  email_greeting: isDE
    ? `Hallo ${name}, ich habe Ihre Nachricht erhalten und werde mich in Kürze bei Ihnen melden.`
    : `Hi ${name}, I've received your message and will respond soon.`,
  email_summary_title: isDE ? "Nachrichtenübersicht" : "Message summary",
  email_label_subject: isDE ? "Betreff" : "Subject",
  email_label_message: isDE ? "Ihre Nachricht" : "Your Message",
  email_label_submitted: isDE ? "Eingereicht am" : "Submitted",
  email_next_title: isDE ? "Wie es weitergeht" : "What happens next",
  email_step1: isDE
    ? "Ich werde Ihre Nachricht innerhalb von 24 Stunden prüfen"
    : "I'll review your message within 24 hours",
  email_step2: isDE
    ? "Sie erhalten eine ausführliche Antwort auf Ihre Anfrage"
    : "You'll receive a detailed response to your inquiry",
  email_step3: isDE
    ? "Bei dringenden Angelegenheiten können Sie mich gerne direkt kontaktieren"
    : "For urgent matters, feel free to reach out directly",
  email_immediate_title: isDE ? "Sofortige Unterstützung benötigt?" : "Need immediate assistance?",
  email_label_email: isDE ? "E-Mail" : "Email",
  email_label_location: isDE ? "Standort" : "Location",
  email_label_spec: isDE ? "Spezialisierung" : "Specialization",
  email_social_title: isDE ? "Verbinden Sie sich mit mir in sozialen Netzwerken:" : "Connect with me on social media:",
  email_signoff: isDE ? "Mit freundlichen Grüßen," : "Best regards,",
  email_tagline: isDE
    ? "Skalierbare Lösungen mit modernen Technologien"
    : "Building scalable solutions with modern technologies",
});

const EMPTY_FORM = { name: "", email: "", subject: "", message: "" };

const Field = ({ label, name, as = "input", ...props }) => {
  const Tag = as;
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-medium text-muted">{label}</span>
      <Tag name={name} className="field" {...props} />
    </label>
  );
};

const Contact = () => {
  const { t, lang } = useTranslation();
  const { isDark } = useTheme();
  const reveal = useReveal();
  const revealForm = useReveal();
  const [copied, copy] = useCopy();

  const [formData, setFormData] = useState(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [engaged, setEngaged] = useState(false);
  const [recaptchaFailed, setRecaptchaFailed] = useState(false);
  const recaptchaRef = useRef(null);

  const contactInfo = (t("contact.contact_info") || []).filter((i) => i.link === "#");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (status) setStatus("");
  };

  // Changing theme or language remounts the widget, so an earlier solve no longer applies.
  useEffect(() => setRecaptchaToken(null), [isDark, lang]);

  const onRecaptcha = (token) => {
    setRecaptchaToken(token);
    if (status === "recaptcha") setStatus("");
  };

  const resetRecaptcha = () => {
    recaptchaRef.current?.reset();
    setRecaptchaToken(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = formData.name.trim();
    const subject = formData.subject.trim();
    const message = formData.message.trim();
    if (!name || !subject || !message) {
      setStatus("incomplete");
      return;
    }
    if (!recaptchaToken) {
      setStatus("recaptcha");
      return;
    }

    setIsSubmitting(true);
    setStatus("");
    trackEvent("contact_submit_attempt");

    const now = new Date();
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const isDE = lang === "de";

    const templateParams = {
      from_name: name,
      from_email: formData.email.trim(),
      to_email: NOTIFY_TO_EMAIL,
      subject,
      subject_encoded: encodeURIComponent(subject),
      message,
      time: formatTime(now, undefined, isDE ? "de-DE" : "en-US"),
      time_recipient: formatTime(now, TIMEZONE),
      time_utc: formatTime(now, "UTC"),
      user_timezone: timezone,
      recipient_timezone: TIMEZONE,
      recipient_location: "Heilbronn, Germany",
      "g-recaptcha-response": recaptchaToken,
      ...buildEmailStrings(isDE, name),
    };

    try {
      const { default: emailjs } = await import("@emailjs/browser");
      const options = { publicKey: USER_ID };
      // The auto-reply is linked to this template in EmailJS, which sends it after this one.
      await emailjs.send(SERVICE_ID, TEMPLATE_NOTIFY_ID, templateParams, options);
      setStatus("success");
      setFormData(EMPTY_FORM);
      trackEvent("contact_submit_success", { method: "emailjs" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      trackEvent("contact_submit_error", { error: error?.text || String(error?.status) });
      setStatus("error");
    } finally {
      resetRecaptcha();
      setIsSubmitting(false);
    }
  };

  const copyEmail = async () => {
    if (await copy(EMAIL)) trackEvent("contact_copy_email");
  };

  return (
    <section id="contact" className="section pb-16" aria-labelledby="contact-title">
      <div className="container-x">
        <SectionHeader
          id="contact-title"
          eyebrow={t("ui.contact.eyebrow")}
          before={t("ui.contact.heading_a")}
          em={t("ui.contact.heading_em")}
          after={t("ui.contact.heading_b")}
          lead={t("contact.subheading")}
        />

        <div className="grid gap-4 lg:grid-cols-5">
          {/* Direct channels */}
          <div ref={reveal} className="flex flex-col gap-4 lg:col-span-2">
            <div onPointerMove={spotlight} className="card spotlight p-6 sm:p-8">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-subtle">
                {t("hero.modal.profiles.email.name")}
              </p>
              <a
                href={`mailto:${EMAIL}`}
                className="mt-3 block break-all text-xl font-semibold tracking-tight transition-colors hover:text-accent sm:text-2xl"
                onClick={() => trackEvent("contact_link_email", { link: `mailto:${EMAIL}` })}
              >
                {EMAIL}
              </a>
              <div className="mt-6 flex flex-wrap gap-2">
                <button type="button" onClick={copyEmail} className="btn btn-ghost" aria-live="polite">
                  <Icon name={copied ? "check" : "copy"} className={copied ? "size-4 text-ok" : "size-4"} />
                  {copied ? t("ui.contact.copied") : t("ui.contact.copy")}
                </button>
                <a href={`mailto:${EMAIL}`} className="btn btn-primary">
                  <Icon name="mail" />
                  {t("hero.modal.profiles.email.name")}
                </a>
              </div>
              <p className="mt-5 text-sm text-muted">{t("ui.contact.response")}</p>
            </div>

            <ul className="card divide-y divide-line">
              {SOCIALS.map((s) => (
                <li key={s.id}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 px-6 py-4 transition-colors hover:bg-fg/3"
                  >
                    <Icon name={s.id} className="size-5 text-muted transition-colors group-hover:text-fg" />
                    <span className="flex-1">
                      <span className="block text-sm font-medium">{s.name}</span>
                      <span className="block font-mono text-xs text-subtle">{s.handle}</span>
                    </span>
                    <Icon
                      name="arrowUpRight"
                      className="size-4 text-subtle transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
                    />
                  </a>
                </li>
              ))}
            </ul>

            <dl className="card grid gap-4 p-6 text-sm">
              {contactInfo.map((info) => (
                <div key={info.title} className="flex gap-3">
                  <dt className="sr-only">{info.title}</dt>
                  <dd className="flex items-start gap-3 text-muted">
                    <span className="mt-0.5 text-accent">
                      <ContentIcon item={info} className="size-4" />
                    </span>
                    {info.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Form */}
          <form
            ref={revealForm}
            action={`mailto:${EMAIL}`}
            method="post"
            encType="text/plain"
            onSubmit={handleSubmit}
            onFocus={() => setEngaged(true)}
            style={{ "--delay": "80ms" }}
            className="card flex flex-col gap-5 p-6 sm:p-8 lg:col-span-3"
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-subtle">{t("contact.form_heading")}</p>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label={t("contact.form.name")}
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                autoComplete="name"
                maxLength={100}
              />
              <Field
                label={t("contact.form.email")}
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
                maxLength={150}
              />
            </div>
            <Field
              label={t("contact.form.subject")}
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              maxLength={150}
            />
            <Field
              label={t("contact.form.message")}
              name="message"
              as="textarea"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              required
              maxLength={5000}
              className="field resize-y"
            />

            {IS_FORM_ENABLED && (
              <div className="min-h-19.5">
                {recaptchaFailed ? (
                  <p className="pt-2 text-xs text-subtle">{t("contact.recaptcha_unavailable")}</p>
                ) : engaged ? (
                  <RecaptchaBoundary
                    fallback={<p className="pt-2 text-xs text-subtle">{t("contact.recaptcha_unavailable")}</p>}
                  >
                    <Suspense fallback={null}>
                      <ReCAPTCHA
                        key={`${isDark ? "dark" : "light"}-${lang}`}
                        ref={recaptchaRef}
                        sitekey={RECAPTCHA_SITE_KEY}
                        onChange={onRecaptcha}
                        onExpired={() => setRecaptchaToken(null)}
                        onErrored={() => setRecaptchaFailed(true)}
                        asyncScriptOnLoad={({ errored }) => errored && setRecaptchaFailed(true)}
                        theme={isDark ? "dark" : "light"}
                        hl={lang}
                      />
                    </Suspense>
                  </RecaptchaBoundary>
                ) : (
                  <p className="pt-2 text-xs text-subtle">{t("ui.contact.recaptcha_hint")}</p>
                )}
              </div>
            )}

            <div aria-live="polite">
              {status === "success" && (
                <p className="flex items-start gap-2 rounded-xl border border-ok/30 bg-ok/10 px-4 py-3 text-sm">
                  <Icon name="check" className="mt-0.5 size-4 shrink-0 text-ok" />
                  <span>
                    <strong>{t("contact.status.success_title")}</strong> {t("contact.status.success_body")}
                  </span>
                </p>
              )}
              {status === "error" && (
                <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm">
                  {t("contact.status.error")}
                </p>
              )}
              {status === "recaptcha" && (
                <p className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm">
                  {t("contact.alert_recaptcha")}
                </p>
              )}
              {status === "incomplete" && (
                <p className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm">
                  {t("ui.contact.incomplete")}
                </p>
              )}
              {!IS_FORM_ENABLED && (
                <p className="rounded-xl border border-line bg-fg/3 px-4 py-3 text-sm text-muted">
                  {t("contact.status.not_configured")}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !IS_FORM_ENABLED}
              className="btn btn-primary mt-auto w-full py-3.5 sm:w-auto sm:self-start"
            >
              {isSubmitting ? (
                <>
                  <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  {t("contact.form.submitting")}
                </>
              ) : (
                <>
                  {t("contact.form.submit")}
                  <Icon name="send" className="size-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
