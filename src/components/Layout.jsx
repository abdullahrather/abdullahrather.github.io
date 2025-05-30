import React, { useEffect, useState } from "react";
import { Link as ScrollLink } from "react-scroll";

const Layout = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  return (
    <div className="min-h-screen flex flex-col">
      {/* Background blobs */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="blob absolute top-20 -left-20 w-96 h-96 bg-indigo-300/30 dark:bg-indigo-600/20"></div>
        <div className="blob absolute bottom-20 right-20 w-80 h-80 bg-blue-300/20 dark:bg-blue-600/10"></div>
        <div className="blob absolute top-[40%] right-[30%] w-64 h-64 bg-purple-300/20 dark:bg-purple-600/10"></div>
      </div>

      {/* Header */}
      <header id="navbar" className="fixed inset-x-0 top-0 z-50">
        <div className="nav-container bg-white/70 dark:bg-slate-900/70 backdrop-blur-md py-4 px-4 sm:px-6 transition-all duration-500">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
            {/* Brand */}
            <ScrollLink
              to="hero"
              smooth
              duration={500}
              className="group flex items-center space-x-2 cursor-pointer"
            >
              <div className="relative h-9 w-9 overflow-hidden rounded-lg shadow-md transition-all duration-300 group-hover:scale-110">
                <img
                  src="/images/favicons/favicon-512x512.png"
                  alt="Abdullah Rather Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="logo-text text-2xl font-extrabold tracking-tight transition-all duration-300 group-hover:tracking-wider">
                Abdullah Rather
              </span>
            </ScrollLink>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center">
              <ScrollLink
                to="about"
                smooth
                duration={500}
                className="nav-link text-slate-800 dark:text-slate-200 cursor-pointer"
              >
                About
              </ScrollLink>
              <ScrollLink
                to="services"
                smooth
                duration={500}
                className="nav-link text-slate-800 dark:text-slate-200 cursor-pointer"
              >
                Services
              </ScrollLink>
              <ScrollLink
                to="projects"
                smooth
                duration={500}
                className="nav-link text-slate-800 dark:text-slate-200 cursor-pointer"
              >
                Projects
              </ScrollLink>
              <div className="ml-8 flex items-center gap-4">
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors"
                >
                  {isDarkMode ? (
                    <svg
                      className="h-5 w-5 stroke-slate-200"
                      fill="none"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5 stroke-slate-800"
                      fill="none"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="12" r="5" />
                      <path d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95-7.05l-1.4 1.4M6.45 17.55l-1.4 1.4m13.9 0l-1.4-1.4M6.45 6.45l-1.4-1.4" />
                    </svg>
                  )}
                </button>
                <ScrollLink
                  to="contact"
                  smooth
                  duration={500}
                  className="btn-primary rounded-full bg-gradient-to-r from-indigo-600 to-indigo-700 px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20 active:scale-95 hover:translate-y-[-2px] cursor-pointer"
                >
                  Get In Touch
                </ScrollLink>
              </div>
            </nav>

            {/* Mobile Controls */}
            <div className="flex items-center lg:hidden gap-2">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors"
              >
                {isDarkMode ? (
                  <svg
                    className="h-5 w-5 stroke-slate-200"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                ) : (
                  <svg
                    className="h-5 w-5 stroke-slate-800"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="5" />
                    <path d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95-7.05l-1.4 1.4M6.45 17.55l-1.4 1.4m13.9 0l-1.4-1.4M6.45 6.45l-1.4-1.4" />
                  </svg>
                )}
              </button>

              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none transition-colors"
              >
                <svg
                  className="h-6 w-6 stroke-slate-800 dark:stroke-slate-200"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 z-40 flex flex-col bg-white dark:bg-slate-900 transition-colors duration-300"
            style={{
              minHeight: "100vh",
              maxHeight: "100vh",
              overflowY: "auto",
              isolation: "isolate",
            }}
          >
            {/* Backdrop overlay */}
            <div className="absolute inset-0 bg-white dark:bg-slate-900 backdrop-blur-xl -z-10 transition-colors duration-300"></div>

            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 dark:border-slate-700/30">
              <div className="group flex items-center space-x-2">
                <div className="relative h-9 w-9 overflow-hidden rounded-lg shadow-md">
                  <img
                    src="/images/favicons/favicon-512x512.png"
                    alt="Abdullah Rather Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="logo-text text-2xl font-extrabold tracking-tight">
                  Abdullah Rather
                </span>
              </div>
              <button
                onClick={closeMobileMenu}
                className="p-3 rounded-full bg-slate-200/50 dark:bg-white/10 hover:bg-slate-300/70 dark:hover:bg-white/20 transition-colors backdrop-blur-md"
              >
                <svg
                  className="h-6 w-6 stroke-slate-800 dark:stroke-white"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Menu Items with proper spacing and gaps */}
            <div className="flex flex-col p-6 space-y-4 mt-4">
              {[
                {
                  to: "about",
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
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  ),
                  label: "About Me",
                },
                {
                  to: "services",
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
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  ),
                  label: "Services",
                },
                {
                  to: "projects",
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
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
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
                  className="nav-mobile-item cursor-pointer"
                >
                  <div className="nav-mobile-icon">{item.icon}</div>
                  <span>{item.label}</span>
                </ScrollLink>
              ))}
            </div>

            {/* Bottom Action */}
            <div className="mt-auto p-6 border-t border-white/10">
              <ScrollLink
                to="contact"
                smooth
                duration={500}
                onClick={closeMobileMenu}
                className="flex items-center justify-center w-full py-3 px-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold shadow-lg cursor-pointer"
              >
                Get Started
              </ScrollLink>
            </div>
          </div>
        )}
      </header>

      {/* Spacer for fixed nav */}
      <div className="h-20"></div>

      {/* Main Content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white/70 dark:bg-slate-900/70 dark:border-slate-700 px-6 py-12 text-center text-sm backdrop-blur-md">
        <div className="mx-auto max-w-7xl">
          <p className="opacity-75">
            © {new Date().getFullYear()} Abdullah Rather. All rights reserved.
          </p>
          <p className="opacity-60 mt-2">
            Built with ❤️ and passion for innovation
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
