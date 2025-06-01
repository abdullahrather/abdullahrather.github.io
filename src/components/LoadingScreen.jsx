import React, { useEffect, useState } from "react";
import { gsap } from "gsap";

const LoadingScreen = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadingPhase, setLoadingPhase] = useState(0);

  // Dynamic loading messages based on progress and visit count
  const getLoadingMessages = () => {
    const visitCount = parseInt(localStorage.getItem("visitCount") || "1");
    const isReturningVisitor = visitCount > 1;

    const messagePhases = [
      {
        // Phase 1: 0-33%
        primary: isReturningVisitor
          ? "Welcome Back!"
          : "Crafting Digital Excellence",
        secondary: isReturningVisitor
          ? "Preparing your personalized experience..."
          : "Loading amazing experiences...",
      },
      {
        // Phase 2: 34-66%
        primary: isReturningVisitor
          ? "Optimizing Performance"
          : "Building Connections",
        secondary: isReturningVisitor
          ? "Enhancing interface based on your preferences..."
          : "Establishing secure protocols...",
      },
      {
        // Phase 3: 67-100%
        primary: isReturningVisitor ? "Almost Ready" : "Finalizing Setup",
        secondary: isReturningVisitor
          ? "Last touches for optimal experience..."
          : "Preparing your digital workspace...",
      },
    ];

    // Determine phase based on progress
    let currentPhase = 0;
    if (progress >= 67) currentPhase = 2;
    else if (progress >= 34) currentPhase = 1;

    return messagePhases[currentPhase];
  };

  const currentMessages = getLoadingMessages();

  useEffect(() => {
    // Track visit count
    const visitCount = parseInt(localStorage.getItem("visitCount") || "0", 10) + 1;
    localStorage.setItem("visitCount", visitCount.toString());

    const tl = gsap.timeline();

    // Animate progress bar with phase updates
    gsap.to(
      {},
      {
        duration: 2.5,
        ease: "power2.out",
        onUpdate: function () {
          const currentProgress = Math.round(this.progress() * 100);
          setProgress(currentProgress);

          // Compute phase directly from currentProgress:
          let newPhase = 0;
          if (currentProgress >= 67) {
            newPhase = 2;
          } else if (currentProgress >= 34) {
            newPhase = 1;
          }
          setLoadingPhase(newPhase);
        },
        onComplete: () => {
          // Hold for a moment then fade out
          setTimeout(() => {
            tl.to(".loading-screen", {
              opacity: 0,
              duration: 0.8,
              ease: "power2.inOut",
              onComplete: () => {
                onLoadComplete();
              },
            });
          }, 300);
        },
      }
    );

    // Animate logo entrance
    gsap.fromTo(
      ".loading-logo",
      { scale: 0.5, opacity: 0, rotation: -10 },
      {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        delay: 0.2,
      }
    );

    // Animate text
    gsap.fromTo(
      ".loading-text",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, delay: 0.5 }
    );

    // Floating particles
    gsap.utils.toArray(".loading-particle").forEach((particle, i) => {
      gsap.to(particle, {
        y: -20,
        duration: 2 + i * 0.2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: i * 0.3,
      });
    });
  }, [onLoadComplete]);

  // Animate message transitions when phase changes
  useEffect(() => {
    if (loadingPhase > 0) {
      gsap.fromTo(
        ".loading-text",
        { y: 10, opacity: 0.7 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [loadingPhase]);

  return (
    <div className="loading-screen fixed inset-0 z-[9999] bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-900 flex items-center justify-center">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="loading-particle absolute w-2 h-2 bg-indigo-300/60 dark:bg-indigo-300/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="text-center relative z-10">
        {/* Logo */}
        <div className="loading-logo mb-8">
          <div className="relative w-20 h-20 mx-auto mb-4">
            <img
              src="/images/favicons/favicon-512x512.png"
              alt="Abdullah Rather"
              className="w-full h-full object-cover rounded-2xl shadow-xl"
            />
            <div className="absolute inset-0 rounded-2xl border-2 border-indigo-400/70 animate-pulse"></div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
            Abdullah Rather
          </h1>
        </div>

        {/* Dynamic Loading text */}
        <div className="loading-text mb-8">
          <p className="text-indigo-100 text-lg mb-2 transition-all duration-300">
            {currentMessages.primary}
          </p>
          <p className="text-indigo-200/80 text-sm transition-all duration-300">
            {currentMessages.secondary}
          </p>
        </div>

        {/* Progress bar with enhanced visual feedback */}
        <div className="w-64 mx-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-indigo-200">
              {progress < 34
                ? "Initializing"
                : progress < 67
                  ? "Processing"
                  : "Completing"}
            </span>
            <span className="text-sm font-semibold text-white">
              {progress}%
            </span>
          </div>
          <div className="w-full bg-indigo-800/50 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-white to-indigo-200 rounded-full transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/40 animate-pulse rounded-full"></div>
            </div>
          </div>

          {/* Progress milestone indicators */}
          <div className="flex justify-between mt-2 text-xs text-indigo-300/60">
            <span className={progress >= 0 ? "text-indigo-200" : ""}>•</span>
            <span className={progress >= 34 ? "text-indigo-200" : ""}>•</span>
            <span className={progress >= 67 ? "text-indigo-200" : ""}>•</span>
            <span className={progress >= 100 ? "text-indigo-200" : ""}>•</span>
          </div>
        </div>

        {/* Enhanced pulse animations */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-indigo-400/30 rounded-full animate-ping"></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 border border-indigo-300/20 rounded-full animate-ping"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
