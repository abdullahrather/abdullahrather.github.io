import React, { useEffect, useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import ScrollControls from "./ScrollControls";
import CustomCursor from "./CustomCursor";

const Layout = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Check for saved preference or system preference
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark);

    setIsDarkMode(shouldBeDark);
    document.documentElement.classList.toggle("dark", shouldBeDark);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    document.documentElement.classList.toggle("dark", newDarkMode);
    localStorage.setItem("theme", newDarkMode ? "dark" : "light");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    // Scroll progress tracking
    const updateScrollProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };

    // Active section tracking
    const updateActiveSection = () => {
      const sections = ["hero", "about", "services", "projects", "contact"];
      const scrollPosition = window.scrollY + 100; // Offset for better detection

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    const handleScroll = () => {
      updateScrollProgress();
      updateActiveSection();
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔥 NEW: Smooth section transitions
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "-50px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      section.classList.add("section-transition");
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className='min-h-screen flex flex-col'>
      {/* Background blobs */}
      <div className='fixed inset-0 -z-10 pointer-events-none overflow-hidden'>
        <div className='blob absolute top-20 -left-20 w-96 h-96 bg-indigo-300/30 dark:bg-indigo-600/20'></div>
        <div className='blob absolute bottom-20 right-20 w-80 h-80 bg-blue-300/20 dark:bg-blue-600/10'></div>
        <div className='blob absolute top-[40%] right-[30%] w-64 h-64 bg-purple-300/20 dark:bg-purple-600/10'></div>
      </div>

      {/* Header */}
      <header id='navbar' className='fixed inset-x-0 top-0 z-50'>
        {/* 🔥 ENHANCED: Prominent Scroll Progress Bar */}
        <div
          className={`scroll-progress-container ${
            scrollProgress > 0 ? "visible" : ""
          }`}
          data-progress={Math.round(scrollProgress)}
        >
          <div
            className='scroll-progress-bar'
            style={{ transform: `scaleX(${scrollProgress / 100})` }}
          />
        </div>

        <div className='nav-container bg-white/70 dark:bg-slate-900/70 backdrop-blur-md py-4 px-4 sm:px-6 transition-all duration-500'>
          <div className='mx-auto flex max-w-7xl items-center justify-between px-6'>
            {/* 🔥 ENHANCED: Brand with Active State */}
            <ScrollLink
              to='hero'
              smooth
              duration={500}
              className={`brand-container group flex items-center space-x-2 cursor-pointer ${
                activeSection === "hero" ? "active" : ""
              }`}
            >
              <div
                className={`logo-image relative h-9 w-9 overflow-hidden rounded-lg shadow-md transition-all duration-300 group-hover:scale-110 ${
                  activeSection === "hero" ? "active" : ""
                }`}
              >
                <img
                  src='/images/favicons/favicon-512x512.png'
                  alt='Abdullah Rather Logo'
                  className='w-full h-full object-cover'
                />
                {/* 🔥 NEW: Active indicator ring for logo */}
                {activeSection === "hero" && (
                  <div className='absolute inset-0 rounded-lg border-2 border-indigo-500 animate-pulse'></div>
                )}
              </div>
              <span
                className={`logo-text text-2xl font-extrabold tracking-tight transition-all duration-300 group-hover:tracking-wider ${
                  activeSection === "hero" ? "active" : ""
                }`}
              >
                Abdullah Rather
              </span>

              {/* 🔥 NEW: Active badge for hero section */}
              {activeSection === "hero" && (
                <div className='absolute -top-1 -right-1 w-2 h-2 bg-indigo-500 rounded-full animate-ping'></div>
              )}
            </ScrollLink>

            {/* 🔥 ENHANCED: Desktop Navigation with Active Indicator */}
            <nav className='hidden lg:flex items-center nav-desktop'>
              <div className='relative flex items-center'>
                {[
                  { to: "about", label: "About" },
                  { to: "services", label: "Services" },
                  { to: "projects", label: "Projects" },
                ].map((item) => (
                  <ScrollLink
                    key={item.to}
                    to={item.to}
                    smooth
                    duration={500}
                    className={`nav-link text-slate-800 dark:text-slate-200 cursor-pointer ${
                      activeSection === item.to ? "active" : ""
                    }`}
                  >
                    {item.label}
                  </ScrollLink>
                ))}

                {/* 🔥 NEW: Sliding Active Indicator */}
                <div
                  className={`nav-active-indicator ${
                    activeSection !== "hero" && activeSection !== "contact"
                      ? "active"
                      : ""
                  }`}
                  style={{
                    left:
                      activeSection === "about"
                        ? "0%"
                        : activeSection === "services"
                        ? "33.33%"
                        : activeSection === "projects"
                        ? "66.66%"
                        : "0%",
                    width: "33.33%",
                  }}
                />
              </div>

              <div className='ml-8 flex items-center gap-4'>
                <button
                  onClick={toggleDarkMode}
                  className='p-2 rounded-full hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors'
                >
                  {isDarkMode ? (
                    <svg
                      className='h-5 w-5 stroke-slate-200'
                      fill='none'
                      strokeWidth='2'
                      viewBox='0 0 24 24'
                    >
                      <circle cx='12' cy='12' r='5' />
                      <path d='M12 1v2m0 18v2m11-11h-2M3 12H1m16.95-7.05l-1.4 1.4M6.45 17.55l-1.4 1.4m13.9 0l-1.4-1.4M6.45 6.45l-1.4-1.4' />
                    </svg>
                  ) : (
                    <svg
                      className='h-5 w-5 stroke-slate-800'
                      fill='none'
                      strokeWidth='2'
                      viewBox='0 0 24 24'
                    >
                      <path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z' />
                    </svg>
                  )}
                </button>

                <ScrollLink
                  to='contact'
                  smooth
                  duration={500}
                  className={`btn-primary rounded-full bg-gradient-to-r from-indigo-600 to-indigo-700 px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20 active:scale-95 hover:translate-y-[-2px] cursor-pointer ${
                    activeSection === "contact" ? "ring-2 ring-indigo-300" : ""
                  }`}
                >
                  Get In Touch
                </ScrollLink>
              </div>
            </nav>

            {/* Mobile Controls */}
            <div className='flex items-center lg:hidden gap-2'>
              <button
                onClick={toggleDarkMode}
                className='p-2 rounded-full hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors'
              >
                {isDarkMode ? (
                  <svg
                    className='h-5 w-5 stroke-slate-200'
                    fill='none'
                    strokeWidth='2'
                    viewBox='0 0 24 24'
                  >
                    <circle cx='12' cy='12' r='5' />
                    <path d='M12 1v2m0 18v2m11-11h-2M3 12H1m16.95-7.05l-1.4 1.4M6.45 17.55l-1.4 1.4m13.9 0l-1.4-1.4M6.45 6.45l-1.4-1.4' />
                  </svg>
                ) : (
                  <svg
                    className='h-5 w-5 stroke-slate-800'
                    fill='none'
                    strokeWidth='2'
                    viewBox='0 0 24 24'
                  >
                    <path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z' />
                  </svg>
                )}
              </button>
              <button
                onClick={toggleMobileMenu}
                className='p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none transition-colors'
              >
                <svg
                  className='h-6 w-6 stroke-slate-800 dark:stroke-slate-200'
                  fill='none'
                  strokeWidth='2'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className='fixed inset-0 z-40 flex flex-col bg-white dark:bg-slate-900 transition-colors duration-300'
            style={{
              minHeight: "100vh",
              maxHeight: "100vh",
              overflowY: "auto",
              isolation: "isolate",
            }}
          >
            {/* Mobile menu content with active states */}
            <div className='absolute inset-0 bg-white dark:bg-slate-900 backdrop-blur-xl -z-10 transition-colors duration-300'></div>

            {/* Header */}
            <div className='flex items-center justify-between p-6 border-b border-white/10 dark:border-slate-700/30'>
              <div
                className={`brand-container group flex items-center space-x-2 ${
                  activeSection === "hero" ? "active" : ""
                }`}
              >
                <div
                  className={`logo-image relative h-9 w-9 overflow-hidden rounded-lg shadow-md ${
                    activeSection === "hero" ? "active" : ""
                  }`}
                >
                  <img
                    src='/images/favicons/favicon-512x512.png'
                    alt='Abdullah Rather Logo'
                    className='w-full h-full object-cover'
                  />
                  {/* Active indicator for mobile */}
                  {activeSection === "hero" && (
                    <div className='absolute inset-0 rounded-lg border-2 border-indigo-500 animate-pulse'></div>
                  )}
                </div>
                <span
                  className={`logo-text text-2xl font-extrabold tracking-tight ${
                    activeSection === "hero" ? "active" : ""
                  }`}
                >
                  Abdullah Rather
                </span>
              </div>
              <button
                onClick={closeMobileMenu}
                className='p-3 rounded-full bg-slate-200/50 dark:bg-white/10 hover:bg-slate-300/70 dark:hover:bg-white/20 transition-colors backdrop-blur-md'
              >
                <svg
                  className='h-6 w-6 stroke-slate-800 dark:stroke-white'
                  fill='none'
                  strokeWidth='2'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>

            {/* Menu Items with active indicators */}
            <div className='flex flex-col p-6 space-y-4 mt-4'>
              {[
                {
                  to: "about",
                  icon: (
                    <svg
                      className='h-6 w-6'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                      />
                    </svg>
                  ),
                  label: "About",
                },
                {
                  to: "services",
                  icon: (
                    <svg
                      className='h-6 w-6'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2z'
                      />
                    </svg>
                  ),
                  label: "Services",
                },
                {
                  to: "projects",
                  icon: (
                    <svg
                      className='h-6 w-6'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
                      />
                    </svg>
                  ),
                  label: "Projects",
                },
              ].map((item) => (
                <ScrollLink
                  key={item.to}
                  to={item.to}
                  smooth
                  duration={500}
                  onClick={closeMobileMenu}
                  className={`nav-mobile-item cursor-pointer ${
                    activeSection === item.to
                      ? "bg-indigo-100 dark:bg-indigo-900/50 border-indigo-300 dark:border-indigo-700"
                      : ""
                  }`}
                >
                  <div
                    className={`nav-mobile-icon ${
                      activeSection === item.to
                        ? "bg-indigo-200 dark:bg-indigo-800"
                        : ""
                    }`}
                  >
                    {item.icon}
                  </div>
                  <span
                    className={
                      activeSection === item.to
                        ? "text-indigo-700 dark:text-indigo-300 font-semibold"
                        : ""
                    }
                  >
                    {item.label}
                  </span>
                  {activeSection === item.to && (
                    <div className='ml-auto w-2 h-2 bg-indigo-500 rounded-full'></div>
                  )}
                </ScrollLink>
              ))}
            </div>

            {/* Bottom Action */}
            <div className='mt-auto p-6 border-t border-white/10'>
              <ScrollLink
                to='contact'
                smooth
                duration={500}
                onClick={closeMobileMenu}
                className={`flex items-center justify-center w-full py-3 px-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold shadow-lg cursor-pointer ${
                  activeSection === "contact" ? "ring-2 ring-indigo-300" : ""
                }`}
              >
                Get Started
              </ScrollLink>
            </div>
          </div>
        )}
      </header>

      {/* Spacer for fixed nav */}
      <div className='h-20'></div>

      {/* Main Content */}
      <main className='flex-grow'>{children}</main>

      {/* Footer */}
      <footer className='border-t border-slate-200 bg-white/70 dark:bg-slate-900/70 dark:border-slate-700 px-6 py-12 text-center text-sm backdrop-blur-md'>
        <div className='mx-auto max-w-7xl'>
          <p className='opacity-75'>
            © {new Date().getFullYear()} Abdullah Rather. All rights reserved.
          </p>
          <p className='opacity-60 mt-2'>
            Built with ❤️ and passion for innovation
          </p>
        </div>
      </footer>

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Scroll Controls */}
      <ScrollControls />
    </div>
  );
};

export default Layout;
