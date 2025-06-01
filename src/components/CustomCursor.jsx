import React, { useEffect, useState } from "react";
import { gsap } from "gsap";

const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [cursorType, setCursorType] = useState("default");

  useEffect(() => {
    const cursor = document.querySelector(".custom-cursor");
    const cursorDot = document.querySelector(".cursor-dot");

    if (!cursor || !cursorDot) return;

    // Mouse move handler
    const handleMouseMove = (e) => {
      // Smooth cursor movement
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });

      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.05,
        ease: "power2.out",
      });
    };

    // Mouse down/up handlers
    const handleMouseDown = () => {
      setIsClicked(true);
      gsap.to(cursor, { scale: 0.8, duration: 0.1 });
    };

    const handleMouseUp = () => {
      setIsClicked(false);
      gsap.to(cursor, { scale: 1, duration: 0.1 });
    };

    // 🔥 FIXED: Safe element checking
    const isInteractiveElement = (element) => {
      if (!element || !element.matches) return false;

      try {
        return element.matches(
          'a, button, .btn-primary, .nav-link, .project-card, .service-card, .social-icon, .scroll-to-top, .scroll-to-bottom, input, textarea, [role="button"], [onclick]'
        );
      } catch {
        // 🔥 FIXED: Removed unused 'error' parameter
        // Fallback check for elements without matches support
        const tagName = element.tagName ? element.tagName.toLowerCase() : "";
        const className = element.className || "";
        const role = element.getAttribute ? element.getAttribute("role") : "";

        return (
          tagName === "a" ||
          tagName === "button" ||
          tagName === "input" ||
          tagName === "textarea" ||
          className.includes("btn-primary") ||
          className.includes("nav-link") ||
          className.includes("project-card") ||
          className.includes("service-card") ||
          className.includes("social-icon") ||
          className.includes("scroll-to-top") ||
          className.includes("scroll-to-bottom") ||
          role === "button" ||
          element.hasAttribute("onclick")
        );
      }
    };

    const isTextElement = (element) => {
      if (!element || !element.matches) return false;

      try {
        return element.matches("input, textarea");
      } catch {
        // 🔥 FIXED: Removed unused 'error' parameter
        const tagName = element.tagName ? element.tagName.toLowerCase() : "";
        return tagName === "input" || tagName === "textarea";
      }
    };

    // Hover effect handlers
    const handleMouseEnter = (e) => {
      const target = e.target;

      if (isInteractiveElement(target)) {
        setIsHovered(true);
        setCursorType("pointer");
        gsap.to(cursor, {
          scale: 1.5,
          duration: 0.3,
          ease: "back.out(1.7)",
        });
      } else if (isTextElement(target)) {
        setIsHovered(true);
        setCursorType("text");
        gsap.to(cursor, {
          scale: 1.2,
          duration: 0.3,
        });
      }
    };

    const handleMouseLeave = (e) => {
      const target = e.target;

      if (isInteractiveElement(target) || isTextElement(target)) {
        setIsHovered(false);
        setCursorType("default");
        gsap.to(cursor, {
          scale: 1,
          duration: 0.3,
          ease: "back.out(1.7)",
        });
      }
    };

    // Add event listeners
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseenter", handleMouseEnter, true);
    document.addEventListener("mouseleave", handleMouseLeave, true);

    // Hide default cursor
    document.body.style.cursor = "none";

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseenter", handleMouseEnter, true);
      document.removeEventListener("mouseleave", handleMouseLeave, true);
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <>
      {/* Main Cursor */}
      <div
        className={`custom-cursor fixed top-0 left-0 w-8 h-8 pointer-events-none z-[10000] mix-blend-difference ${
          cursorType === "text" ? "cursor-text" : ""
        }`}
        style={{ transform: "translate(-50%, -50%)" }}
      >
        {/* Outer Ring */}
        <div
          className={`absolute inset-0 rounded-full border-2 transition-all duration-300 ${
            isHovered
              ? "border-indigo-500 bg-indigo-500/20"
              : "border-indigo-400/60 bg-indigo-400/10"
          } ${isClicked ? "scale-75" : ""}`}
        >
          {/* Animated Border */}
          <div className='absolute inset-0 rounded-full border-2 border-transparent'>
            <div
              className={`absolute inset-0 rounded-full border-2 border-indigo-500 transition-all duration-500 ${
                isHovered ? "animate-spin" : ""
              }`}
              style={{
                borderImage:
                  "linear-gradient(45deg, #4f46e5, #8b5cf6, #4f46e5) 1",
                borderImageSlice: 1,
              }}
            ></div>
          </div>

          {/* Inner Elements */}
          {cursorType === "pointer" && (
            <div className='absolute inset-0 flex items-center justify-center'>
              <div className='w-1 h-1 bg-indigo-500 rounded-full animate-pulse'></div>
            </div>
          )}

          {cursorType === "text" && (
            <div className='absolute inset-0 flex items-center justify-center'>
              <div className='w-0.5 h-4 bg-indigo-500 animate-pulse'></div>
            </div>
          )}
        </div>

        {/* Particles Effect */}
        {isHovered && (
          <>
            <div
              className='absolute w-1 h-1 bg-indigo-400 rounded-full top-0 left-1/2 transform -translate-x-1/2 animate-ping'
              style={{ animationDelay: "0ms" }}
            ></div>
            <div
              className='absolute w-1 h-1 bg-purple-400 rounded-full bottom-0 left-1/2 transform -translate-x-1/2 animate-ping'
              style={{ animationDelay: "200ms" }}
            ></div>
            <div
              className='absolute w-1 h-1 bg-indigo-400 rounded-full left-0 top-1/2 transform -translate-y-1/2 animate-ping'
              style={{ animationDelay: "400ms" }}
            ></div>
            <div
              className='absolute w-1 h-1 bg-purple-400 rounded-full right-0 top-1/2 transform -translate-y-1/2 animate-ping'
              style={{ animationDelay: "600ms" }}
            ></div>
          </>
        )}
      </div>

      {/* Cursor Dot (follows faster) */}
      <div
        className='cursor-dot fixed top-0 left-0 w-1 h-1 bg-indigo-500 rounded-full pointer-events-none z-[10001] transition-opacity duration-300'
        style={{
          transform: "translate(-50%, -50%)",
          opacity: isHovered ? 0 : 1,
        }}
      ></div>
    </>
  );
};

export default CustomCursor;
