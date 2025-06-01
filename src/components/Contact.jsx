import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("");

    try {
      // Replace with your actual Formspree endpoint
      const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      title: "Email",
      value: "abdullahrather19@gmail.com",
      link: "mailto:abdullahrather19@gmail.com",
    },
    {
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      title: "Location",
      value: "Berlin, Germany",
      link: "#",
    },
    {
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2z"
          />
        </svg>
      ),
      title: "Current Role",
      value: "Full-Stack Software Engineer",
      link: "#",
    },
    {
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "Availability",
      value: "Open for Freelance Projects",
      link: "#",
    },
  ];

  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/abdullahrather",
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      name: "Xing",
      url: "https://www.xing.com/profile/Abdullah_Rather",
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 90 90">
          <path d="M 13.677 17.774 c -0.782 0 -1.44 0.274 -1.77 0.811 c -0.342 0.555 -0.289 1.269 0.074 1.991 l 8.776 15.193 c 0.015 0.029 0.015 0.047 0 0.074 L 6.966 60.181 c -0.36 0.717 -0.342 1.437 0 1.991 c 0.33 0.534 0.915 0.885 1.696 0.885 h 12.98 c 1.941 0 2.876 -1.31 3.54 -2.508 c 0 0 13.488 -23.854 14.013 -24.78 c -0.053 -0.086 -8.924 -15.561 -8.924 -15.561 c -0.646 -1.151 -1.623 -2.434 -3.614 -2.434 H 13.677 z" />
          <path d="M 68.208 0 c -1.938 0 -2.779 1.221 -3.475 2.472 c 0 0 -27.963 49.59 -28.884 51.219 c 0.047 0.089 18.444 33.837 18.444 33.837 C 54.936 88.678 55.93 90 57.919 90 h 12.966 c 0.782 0 1.392 -0.295 1.723 -0.829 c 0.345 -0.555 0.336 -1.286 -0.027 -2.006 L 54.281 53.732 c -0.018 -0.027 -0.018 -0.059 0 -0.085 L 83.02 2.832 c 0.36 -0.717 0.369 -1.449 0.027 -2.003 C 82.717 0.295 82.103 0 81.321 0 H 68.208 z" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      url: "https://github.com/abdullahrather",
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
    {
      name: "Email",
      url: "mailto:abdullahrather19@gmail.com",
      icon: (
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Mobile detection
    const isMobile = window.innerWidth <= 768;

    if (!isMobile) {
      // Desktop: animated loading
      gsap.to("#contactTitle", {
        scrollTrigger: {
          trigger: "#contactTitle",
          start: "top 95%",
        },
        opacity: 1,
        y: 0,
        duration: 0.3,
      });

      gsap.utils.toArray(".contact-card").forEach((card, i) => {
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 95%",
          },
          opacity: 1,
          y: 0,
          duration: 0.3,
          delay: i * 0.05,
        });
      });
    } else {
      // Mobile: show everything immediately
      gsap.set("#contactTitle", { opacity: 1, y: 0 });
      gsap.set(".contact-card", { opacity: 1, y: 0 });
    }
  }, []);

  return (
    <section id="contact" className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2
            id="contactTitle"
            className="text-4xl font-bold mb-4 transform opacity-0 translate-y-6"
          >
            Get In Touch
          </h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Ready to collaborate on your next project? Let's discuss how I can
            help build scalable solutions for your business needs.
          </p>
        </div>

        {/* 🔥 TEMPORARY: Test Success Animation */}
        {/* <div className="text-center mb-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <p className="text-yellow-700 dark:text-yellow-300 text-sm mb-2">
            🧪 <strong>Testing Mode:</strong> Click buttons below to preview
            animations
          </p>
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => setSubmitStatus("success")}
              className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition-colors"
            >
              Test Success
            </button>
            <button
              onClick={() => setSubmitStatus("error")}
              className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
            >
              Test Error
            </button>
            <button
              onClick={() => setSubmitStatus("")}
              className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors"
            >
              Clear
            </button>
          </div>
        </div> */}

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="contact-card opacity-0 transform translate-y-12">
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>

            <div className="space-y-4 mb-8">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.link}
                  className="flex items-center p-4 bg-slate-100/80 dark:bg-slate-800/60 rounded-lg hover:bg-slate-200/80 dark:hover:bg-slate-700/60 transition-colors backdrop-blur ring-1 ring-slate-200/50 dark:ring-white/20"
                >
                  <div className="text-indigo-600 dark:text-indigo-400 mr-4">
                    {info.icon}
                  </div>
                  <div>
                    <div className="font-semibold">{info.title}</div>
                    <div className="text-slate-600 dark:text-slate-300">
                      {info.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Enhanced Social Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect with me:</h4>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`social-icon social-${social.name.toLowerCase()} flex items-center px-4 py-2 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300 rounded-full hover:bg-indigo-200 dark:hover:bg-indigo-800/50 transition-all duration-300`}
                  >
                    <span className="mr-2">{social.icon}</span>
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-card opacity-0 transform translate-y-12">
            <h3 className="text-2xl font-bold mb-6">Send Message</h3>

            {/* Enhanced Status Messages */}
            {submitStatus === "success" && (
              <div className="success-message success-pulse mb-6 p-4 bg-green-100 dark:bg-green-900/50 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-300 rounded-lg">
                <div className="flex items-center">
                  <svg
                    className="h-5 w-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="font-semibold">Success!</span>
                </div>
                <p className="mt-1">
                  Message sent successfully! I'll get back to you soon.
                </p>
              </div>
            )}
            {submitStatus === "error" && (
              <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/50 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 rounded-lg">
                ❌ Error sending message. Please try again or contact me
                directly.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="form-field">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    placeholder=" "
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-900 dark:text-slate-100 disabled:bg-slate-100 dark:disabled:bg-slate-700"
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-4 top-3 text-slate-600 dark:text-slate-400 pointer-events-none"
                  >
                    Your Name
                  </label>
                </div>

                <div className="form-field">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    placeholder=" "
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-900 dark:text-slate-100 disabled:bg-slate-100 dark:disabled:bg-slate-700"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-4 top-3 text-slate-600 dark:text-slate-400 pointer-events-none"
                  >
                    Email Address
                  </label>
                </div>
              </div>

              <div className="form-field">
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  placeholder=" "
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-900 dark:text-slate-100 disabled:bg-slate-100 dark:disabled:bg-slate-700"
                />
                <label
                  htmlFor="subject"
                  className="absolute left-4 top-3 text-slate-600 dark:text-slate-400 pointer-events-none"
                >
                  Subject
                </label>
              </div>

              <div className="form-field">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  rows={6}
                  placeholder=" "
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none text-slate-900 dark:text-slate-100 disabled:bg-slate-100 dark:disabled:bg-slate-700"
                />
                <label
                  htmlFor="message"
                  className="absolute left-4 top-3 text-slate-600 dark:text-slate-400 pointer-events-none"
                >
                  Message
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`submit-btn w-full py-3 px-6 rounded-lg font-semibold shadow-lg transition-all duration-300 ${isSubmitting
                  ? "bg-slate-400 dark:bg-slate-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-600 to-indigo-700 hover:shadow-xl hover:shadow-indigo-500/20"
                  } text-white`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Send Message"
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
