import { useCallback, useSyncExternalStore } from "react";

const subscribe = (callback) => {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
};

const getSnapshot = () => document.documentElement.classList.contains("dark");

const applyTheme = (dark) => {
  document.documentElement.classList.toggle("dark", dark);
  // Keep the mobile browser bar in step with a manually chosen theme.
  document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
    meta.content = dark ? "#09090b" : "#fafafa";
  });
  try {
    localStorage.setItem("theme", dark ? "dark" : "light");
  } catch {
    // ignore
  }
};

/**
 * Theme state lives on <html class="dark"> (set pre-paint in index.html).
 * Toggling uses the View Transitions API to reveal the new theme as a circle
 * growing from the click point, falling back to an instant switch.
 */
export const useTheme = () => {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, () => true);

  const toggleTheme = useCallback((event) => {
    const next = !document.documentElement.classList.contains("dark");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!document.startViewTransition || reduceMotion) {
      applyTheme(next);
      return;
    }

    // detail is 0 for keyboard clicks, which report no useful pointer position.
    const fromPointer = event?.detail > 0;
    const x = fromPointer ? event.clientX : window.innerWidth / 2;
    const y = fromPointer ? event.clientY : 0;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    const transition = document.startViewTransition(() => applyTheme(next));
    transition.ready
      .then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 550, easing: "cubic-bezier(0.16, 1, 0.3, 1)", pseudoElement: "::view-transition-new(root)" }
        );
      })
      // A newer transition (another click) skips this one; the theme is still applied.
      .catch(() => {});
  }, []);

  return { isDark, toggleTheme };
};
