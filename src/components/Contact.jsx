import React, { useState, useEffect, useRef } from "react";
import { trackEvent } from "../lib/analytics";
import { useTranslation } from "../lib/i18n";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";

const USER_ID = import.meta.env.VITE_EMAILJS_USER_ID || "";
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "";
const NOTIFY_TO_EMAIL = import.meta.env.VITE_EMAILJS_NOTIFY_TO || "";
const TEMPLATE_NOTIFY_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_NOTIFY || "";
const TEMPLATE_REPLY_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_REPLY || "";
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || "";
const IS_EMAIL_CONFIGURED = Boolean(
  USER_ID && SERVICE_ID && NOTIFY_TO_EMAIL && TEMPLATE_NOTIFY_ID && TEMPLATE_REPLY_ID
);
const IS_RECAPTCHA_CONFIGURED = Boolean(RECAPTCHA_SITE_KEY);
const IS_FORM_ENABLED = IS_EMAIL_CONFIGURED && IS_RECAPTCHA_CONFIGURED;
const MISSING_ENV_VARS = [
  !USER_ID && "VITE_EMAILJS_USER_ID",
  !SERVICE_ID && "VITE_EMAILJS_SERVICE_ID",
  !NOTIFY_TO_EMAIL && "VITE_EMAILJS_NOTIFY_TO",
  !TEMPLATE_NOTIFY_ID && "VITE_EMAILJS_TEMPLATE_NOTIFY",
  !TEMPLATE_REPLY_ID && "VITE_EMAILJS_TEMPLATE_REPLY",
  !RECAPTCHA_SITE_KEY && "VITE_RECAPTCHA_SITE_KEY",
].filter(Boolean);

// Renders an SVG icon from a single path string or an array of path strings.
const ContactIcon = ({ item, className = "h-6 w-6" }) => {
  const paths = item.iconPaths ?? (item.iconPath ? [item.iconPath] : []);
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {paths.map((d, i) => (
        <path key={i} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={d} />
      ))}
    </svg>
  );
};

// SVG icons for social links — keyed by lowercase name.
const SOCIAL_ICONS = {
  linkedin: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  xing: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 90 90">
      <path d="M 13.677 17.774 c -0.782 0 -1.44 0.274 -1.77 0.811 c -0.342 0.555 -0.289 1.269 0.074 1.991 l 8.776 15.193 c 0.015 0.029 0.015 0.047 0 0.074 L 6.966 60.181 c -0.36 0.717 -0.342 1.437 0 1.991 c 0.33 0.534 0.915 0.885 1.696 0.885 h 12.98 c 1.941 0 2.876 -1.31 3.54 -2.508 c 0 0 13.488 -23.854 14.013 -24.78 c -0.053 -0.086 -8.924 -15.561 -8.924 -15.561 c -0.646 -1.151 -1.623 -2.434 -3.614 -2.434 H 13.677 z" />
      <path d="M 68.208 0 c -1.938 0 -2.779 1.221 -3.475 2.472 c 0 0 -27.963 49.59 -28.884 51.219 c 0.047 0.089 18.444 33.837 18.444 33.837 C 54.936 88.678 55.93 90 57.919 90 h 12.966 c 0.782 0 1.392 -0.295 1.723 -0.829 c 0.345 -0.555 0.336 -1.286 -0.027 -2.006 L 54.281 53.732 c -0.018 -0.027 -0.018 -0.059 0 -0.085 L 83.02 2.832 c 0.36 -0.717 0.369 -1.449 0.027 -2.003 C 82.717 0.295 82.103 0 81.321 0 H 68.208 z" />
    </svg>
  ),
  github: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  email: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
};

const getCountryFromTimezone = (timezone) => {
  const timezoneToCountry = {
    // Europe
    "Europe/Berlin": "Germany",
    "Europe/London": "United Kingdom",
    "Europe/Paris": "France",
    "Europe/Madrid": "Spain",
    "Europe/Rome": "Italy",
    "Europe/Amsterdam": "Netherlands",
    "Europe/Vienna": "Austria",
    "Europe/Zurich": "Switzerland",
    // North America
    "America/New_York": "United States",
    "America/Los_Angeles": "United States",
    "America/Chicago": "United States",
    "America/Denver": "United States",
    "America/Toronto": "Canada",
    "America/Vancouver": "Canada",
    "America/Mexico_City": "Mexico",
    // Asia
    "Asia/Tokyo": "Japan",
    "Asia/Shanghai": "China",
    "Asia/Dubai": "UAE",
    "Asia/Singapore": "Singapore",
    "Asia/Kolkata": "India",
    "Asia/Seoul": "South Korea",
    // Australia
    "Australia/Sydney": "Australia",
    "Australia/Melbourne": "Australia",
    "Australia/Perth": "Australia",
    // Default
    UTC: "UTC",
  };
  return timezoneToCountry[timezone] || timezone.split("/")[0] || "Unknown";
};

const Contact = () => {
  const { t, lang } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState(null);

  const recaptchaRef = useRef(null);

  const contactInfo = t("contact.contact_info");
  const socialLinks = t("contact.social_links");

  useEffect(() => {
    if (USER_ID) {
      emailjs.init(USER_ID);
    }
    if (MISSING_ENV_VARS.length > 0) {
      console.warn(`Contact form disabled: missing env vars: ${MISSING_ENV_VARS.join(", ")}`);
    }
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const isMobile = window.innerWidth <= 768;

    if (!isMobile) {
      gsap.to("#contactTitle", {
        scrollTrigger: { trigger: "#contactTitle", start: "top 95%" },
        opacity: 1,
        y: 0,
        duration: 0.3,
      });
      gsap.utils.toArray(".contact-card").forEach((card, i) => {
        gsap.to(card, {
          scrollTrigger: { trigger: card, start: "top 95%" },
          opacity: 1,
          y: 0,
          duration: 0.3,
          delay: i * 0.05,
        });
      });
    } else {
      gsap.set("#contactTitle", { opacity: 1, y: 0 });
      gsap.set(".contact-card", { opacity: 1, y: 0 });
    }
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!IS_FORM_ENABLED) {
      setSubmitStatus("config-missing");
      return;
    }

    if (!recaptchaToken) {
      alert(t("contact.alert_recaptcha"));
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("");

    try {
      trackEvent("contact_submit_attempt", { configured: IS_FORM_ENABLED });
    } catch (error) {
      void error;
    }

    const now = new Date();
    const currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const userLocalTime = now.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    });

    const yourCurrentTime = now.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: currentTimezone,
      timeZoneName: "short",
    });

    const utcTime = now.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
      timeZoneName: "short",
    });

    const locationContext = {
      timezone: currentTimezone,
      timezoneAbbr: now.toLocaleString("en-US", { timeZoneName: "short" }).split(", ")[1],
      city: currentTimezone.split("/")[1]?.replace("_", " ") || "Unknown",
      country: getCountryFromTimezone(currentTimezone),
    };

    // Locale-aware email strings — drive the {{variables}} in the AutoReply template
    const isDE = lang === "de";
    const emailStrings = {
      email_subject: isDE
        ? `Vielen Dank für Ihre Nachricht, ${formData.name.trim()}!`
        : `Thanks for reaching out, ${formData.name.trim()}!`,
      email_subtitle: isDE ? "Full-Stack Software-Entwickler" : "Full-Stack Software Engineer",
      email_badge: isDE ? "✅ Nachricht erfolgreich erhalten" : "✅ Message Received Successfully",
      email_heading: isDE ? "Vielen Dank für Ihre Nachricht!" : "Thank you for reaching out!",
      email_greeting: isDE
        ? `Hallo ${formData.name.trim()}, ich habe Ihre Nachricht erhalten und werde mich in Kürze bei Ihnen melden.`
        : `Hi ${formData.name.trim()}, I've received your message and will respond soon.`,
      email_summary_title: isDE ? "📋 Ihre Nachrichtenübersicht" : "📋 Your Message Summary",
      email_label_subject: isDE ? "Betreff" : "Subject",
      email_label_message: isDE ? "Ihre Nachricht" : "Your Message",
      email_label_submitted: isDE ? "Eingereicht am" : "Submitted",
      email_next_title: isDE ? "⏱️ Was passiert als Nächstes?" : "⏱️ What happens next?",
      email_step1: isDE ? "Ich werde Ihre Nachricht innerhalb von 24 Stunden prüfen" : "I'll review your message within 24 hours",
      email_step2: isDE ? "Sie erhalten eine ausführliche Antwort auf Ihre Anfrage" : "You'll receive a detailed response to your inquiry",
      email_step3: isDE ? "Bei dringenden Angelegenheiten können Sie mich gerne direkt kontaktieren" : "For urgent matters, feel free to reach out directly",
      email_immediate_title: isDE ? "Sofortige Unterstützung benötigt?" : "Need immediate assistance?",
      email_label_email: isDE ? "E-Mail:" : "Email:",
      email_label_location: isDE ? "Standort:" : "Location:",
      email_label_spec: isDE ? "Spezialisierung:" : "Specialization:",
      email_social_title: isDE ? "Verbinden Sie sich mit mir in sozialen Netzwerken:" : "Connect with me on social media:",
      email_signoff: isDE ? "Mit freundlichen Grüßen," : "Best regards,",
      email_tagline: isDE ? "Skalierbare Lösungen mit modernen Technologien" : "Building scalable solutions with modern technologies",
    };

    const templateParams = {
      from_name: formData.name.trim(),
      from_email: formData.email.trim(),
      to_email: NOTIFY_TO_EMAIL,
      subject: formData.subject.trim(),
      message: formData.message.trim(),
      time: userLocalTime,
      time_recipient: yourCurrentTime,
      time_utc: utcTime,
      user_timezone: currentTimezone,
      recipient_timezone: currentTimezone,
      recipient_location: `${locationContext.city}, ${locationContext.country}`,
      "g-recaptcha-response": recaptchaToken,
      ...emailStrings,
    };

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_NOTIFY_ID, templateParams);
      await emailjs.send(SERVICE_ID, TEMPLATE_REPLY_ID, templateParams);

      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });

      try {
        trackEvent("contact_submit_success", { method: "emailjs" });
      } catch (error) {
        void error;
      }

      if (recaptchaRef.current) recaptchaRef.current.reset();
      setRecaptchaToken(null);
    } catch (error) {
      console.error("EmailJS Error:", error);
      try {
        trackEvent("contact_submit_error", { error: error?.message || String(error) });
      } catch (trackError) {
        void trackError;
      }
      setSubmitStatus("error");
      if (recaptchaRef.current) recaptchaRef.current.reset();
      setRecaptchaToken(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2
            id="contactTitle"
            className="text-4xl font-bold mb-4 transform opacity-0 translate-y-6"
          >
            {t("contact.heading")}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            {t("contact.subheading")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column: Contact Info */}
          <div className="contact-card opacity-0 transform translate-y-12">
            <h3 className="text-2xl font-bold mb-6">{t("contact.info_heading")}</h3>
            <div className="space-y-4 mb-8">
              {contactInfo.map((info, idx) => (
                <a
                  key={idx}
                  href={info.link}
                  onClick={() =>
                    trackEvent(`contact_link_${String(info.title).toLowerCase().replace(/\s+/g, "_")}`, {
                      link: info.link,
                    })
                  }
                  className="flex items-center p-4 bg-slate-100/80 dark:bg-slate-800/60 rounded-lg hover:bg-slate-200/80 dark:hover:bg-slate-700/60 transition-colors backdrop-blur ring-1 ring-slate-200/50 dark:ring-white/20"
                >
                  <div className="text-indigo-600 dark:text-indigo-400 mr-4">
                    <ContactIcon item={info} />
                  </div>
                  <div>
                    <div className="font-semibold">{info.title}</div>
                    <div className="text-slate-600 dark:text-slate-300">{info.value}</div>
                  </div>
                </a>
              ))}
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">{t("contact.connect_heading")}</h4>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackEvent(`social_click_${String(social.name).toLowerCase()}`, {
                        link: social.url,
                      })
                    }
                    className={`social-icon social-${social.name.toLowerCase()} flex items-center px-4 py-2 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300 rounded-full hover:bg-indigo-200 dark:hover:bg-indigo-800/50 transition-all duration-300`}
                  >
                    <span className="mr-2">{SOCIAL_ICONS[social.name.toLowerCase()]}</span>
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="contact-card opacity-0 transform translate-y-12">
            <h3 className="text-2xl font-bold mb-6">{t("contact.form_heading")}</h3>

            {submitStatus === "success" && (
              <div className="success-message success-pulse mb-6 p-4 bg-green-100 dark:bg-green-900/50 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-300 rounded-lg">
                <div className="flex items-center">
                  <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-semibold">{t("contact.status.success_title")}</span>
                </div>
                <p className="mt-1">{t("contact.status.success_body")}</p>
              </div>
            )}
            {submitStatus === "error" && (
              <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/50 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 rounded-lg">
                {t("contact.status.error")}
              </div>
            )}
            {submitStatus === "config-missing" && (
              <div className="mb-6 p-4 bg-amber-100 dark:bg-amber-900/40 border border-amber-400 dark:border-amber-700 text-amber-800 dark:text-amber-200 rounded-lg">
                {t("contact.status.config_missing")}
              </div>
            )}
            {!IS_FORM_ENABLED && submitStatus !== "config-missing" && (
              <div className="mb-6 p-4 bg-amber-100 dark:bg-amber-900/40 border border-amber-400 dark:border-amber-700 text-amber-800 dark:text-amber-200 rounded-lg">
                {t("contact.status.not_configured")}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative form-field">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting || !IS_FORM_ENABLED}
                    placeholder=" "
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-900 dark:text-slate-100 disabled:bg-slate-100 dark:disabled:bg-slate-700"
                  />
                  <label htmlFor="name" className="absolute left-4 top-3 text-slate-600 dark:text-slate-400 pointer-events-none">
                    {t("contact.form.name")}
                  </label>
                </div>
                <div className="relative form-field">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting || !IS_FORM_ENABLED}
                    placeholder=" "
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-900 dark:text-slate-100 disabled:bg-slate-100 dark:disabled:bg-slate-700"
                  />
                  <label htmlFor="email" className="absolute left-4 top-3 text-slate-600 dark:text-slate-400 pointer-events-none">
                    {t("contact.form.email")}
                  </label>
                </div>
              </div>

              <div className="relative form-field">
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting || !IS_FORM_ENABLED}
                  placeholder=" "
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-900 dark:text-slate-100 disabled:bg-slate-100 dark:disabled:bg-slate-700"
                />
                <label htmlFor="subject" className="absolute left-4 top-3 text-slate-600 dark:text-slate-400 pointer-events-none">
                  {t("contact.form.subject")}
                </label>
              </div>

              <div className="relative form-field">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting || !IS_FORM_ENABLED}
                  rows={6}
                  placeholder=" "
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none text-slate-900 dark:text-slate-100 disabled:bg-slate-100 dark:disabled:bg-slate-700"
                />
                <label htmlFor="message" className="absolute left-4 top-3 text-slate-600 dark:text-slate-400 pointer-events-none">
                  {t("contact.form.message")}
                </label>
              </div>

              <div className="pt-2">
                {IS_FORM_ENABLED ? (
                  <ReCAPTCHA sitekey={RECAPTCHA_SITE_KEY} onChange={onRecaptchaChange} ref={recaptchaRef} />
                ) : (
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {t("contact.recaptcha_unavailable")}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !IS_FORM_ENABLED}
                className={`submit-btn w-full py-3 px-6 rounded-lg font-semibold shadow-lg transition-all duration-300 ${isSubmitting || !IS_FORM_ENABLED
                  ? "bg-slate-400 dark:bg-slate-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-600 to-indigo-700 hover:shadow-xl hover:shadow-indigo-500/20"
                  } text-white`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t("contact.form.submitting")}
                  </span>
                ) : (
                  t("contact.form.submit")
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
