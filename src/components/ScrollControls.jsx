import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const ScrollControls = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [showBottomBtn, setShowBottomBtn] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollDirection, setScrollDirection] = useState(null); // "up" or "down" or null

  // Keep a ref of the last scrollTop so we can detect direction
  const lastScrollTopRef = useRef(window.pageYOffset);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;

      setScrollProgress(progress);
      setShowTopBtn(scrollTop > 300);
      setShowBottomBtn(progress < 90);

      // Detect scroll direction
      const last = lastScrollTopRef.current;
      if (scrollTop > last + 5) {
        // scrolling down
        setScrollDirection("down");
      } else if (scrollTop < last - 5) {
        // scrolling up
        setScrollDirection("up");
      }
      lastScrollTopRef.current = scrollTop;
    };

    const handleScroll = () => {
      requestAnimationFrame(updateScrollProgress);
    };

    window.addEventListener("scroll", handleScroll);
    updateScrollProgress(); // initial call
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    if (isScrolling) return;
    setIsScrolling(true);

    gsap.to(window, {
      duration: 0.8,
      scrollTo: { y: 0, autoKill: false },
      ease: "power2.inOut",
      onComplete: () => {
        setIsScrolling(false);
        setScrollDirection(null); // reset after complete
      },
    });

    // Button press “blink”
    gsap.to(".scroll-to-top", {
      scale: 0.9,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
    });
  };

  const scrollToBottom = () => {
    if (isScrolling) return;
    setIsScrolling(true);

    gsap.to(window, {
      duration: 0.8,
      scrollTo: {
        y: document.documentElement.scrollHeight,
        autoKill: false,
      },
      ease: "power2.inOut",
      onComplete: () => {
        setIsScrolling(false);
        setScrollDirection(null);
      },
    });

    gsap.to(".scroll-to-bottom", {
      scale: 0.9,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
    });
  };

  return (
    <>
      {/* Scroll ↟ Top Button */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          disabled={isScrolling}
          className={`
            scroll-to-top fixed right-6 bottom-20 z-50 group transition-all duration-500
            ${
              showTopBtn
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 translate-y-10 pointer-events-none"
            }
            ${isScrolling ? "opacity-50 cursor-not-allowed" : ""}
          `}
          aria-label='Scroll to top'
        >
          <div className='relative w-14 h-14'>
            {/* Background Ring */}
            <svg className='w-14 h-14 transform -rotate-90' viewBox='0 0 56 56'>
              <circle
                cx='28'
                cy='28'
                r='24'
                fill='none'
                stroke='rgba(148, 163, 184, 0.2)'
                strokeWidth='3'
                className='dark:stroke-slate-600/30'
              />
              {/* Progress Ring */}
              <circle
                cx='28'
                cy='28'
                r='24'
                fill='none'
                stroke='url(#scrollGradient)'
                strokeWidth='3'
                strokeLinecap='round'
                strokeDasharray={150.8}
                strokeDashoffset={150.8 - (scrollProgress / 100) * 150.8}
                className='transition-all duration-300 ease-out'
              />
            </svg>

            {/* Gradient Definition */}
            <svg className='absolute inset-0 w-0 h-0'>
              <defs>
                <linearGradient
                  id='scrollGradient'
                  x1='0%'
                  y1='0%'
                  x2='100%'
                  y2='100%'
                >
                  <stop offset='0%' stopColor='#4f46e5' />
                  <stop offset='100%' stopColor='#8b5cf6' />
                </linearGradient>
              </defs>
            </svg>

            {/* Arrow Icon */}
            <div className='absolute inset-0 flex items-center justify-center bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full border border-white/20 dark:border-slate-700/50 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110'>
              <svg
                className='w-5 h-5 text-indigo-600 dark:text-indigo-400 transition-transform duration-300 group-hover:-translate-y-0.5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2.5'
                  d='M5 10l7-7m0 0l7 7m-7-7v18'
                />
              </svg>
            </div>

            {/* Conditionally show a small pulse ONLY when user has scrolled up */}
            {scrollDirection === "up" && !isScrolling && (
              <>
                {/* Inner ping */}
                <div className='absolute inset-0 rounded-full border-2 border-indigo-500/30 animate-ping'></div>
                {/* Outer ping with half‐second delay */}
                <div
                  className='absolute inset-0 rounded-full border border-purple-500/20 animate-ping'
                  style={{ animationDelay: "0.5s" }}
                ></div>
              </>
            )}
          </div>

          {/* Tooltip */}
          <div className='absolute right-full mr-3 top-1/2 transform -translate-y-1/2 px-3 py-1.5 bg-slate-900 dark:bg-slate-700 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none'>
            {isScrolling ? "Scrolling..." : "Back to top"}
            <div className='absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-slate-900 dark:border-l-slate-700'></div>
          </div>
        </button>
      )}

      {/* Scroll ↡ Bottom Button */}
      {showBottomBtn && (
        <button
          onClick={scrollToBottom}
          disabled={isScrolling}
          className={`
            scroll-to-bottom fixed right-6 bottom-4 z-50 group transition-all duration-500
            ${
              showBottomBtn
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 translate-y-10 pointer-events-none"
            }
            ${isScrolling ? "opacity-50 cursor-not-allowed" : ""}
          `}
          aria-label='Scroll to bottom'
        >
          <div className='relative w-14 h-14'>
            {/* Arrow Icon */}
            <div className='absolute inset-0 flex items-center justify-center bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full border border-white/20 dark:border-slate-700/50 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110'>
              <svg
                className='w-5 h-5 text-indigo-600 dark:text-indigo-400 transition-transform duration-300 group-hover:translate-y-0.5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2.5'
                  d='M19 14l-7 7m0 0l-7-7m7 7V3'
                />
              </svg>
            </div>

            {/* Conditionally show a small pulse ONLY when user has scrolled down */}
            {scrollDirection === "down" && !isScrolling && (
              <>
                {/* Inner ping */}
                <div className='absolute inset-0 rounded-full border-2 border-indigo-500/30 animate-ping'></div>
                {/* Outer ping with half‐second delay */}
                <div
                  className='absolute inset-0 rounded-full border border-purple-500/20 animate-ping'
                  style={{ animationDelay: "0.5s" }}
                ></div>
              </>
            )}
          </div>

          {/* Tooltip */}
          <div className='absolute right-full mr-3 top-1/2 transform -translate-y-1/2 px-3 py-1.5 bg-slate-900 dark:bg-slate-700 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none'>
            {isScrolling ? "Scrolling..." : "Go to bottom"}
            <div className='absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-slate-900 dark:border-l-slate-700'></div>
          </div>
        </button>
      )}
    </>
  );
};

export default ScrollControls;
