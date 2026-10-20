import { useCallback, useSyncExternalStore } from "react";

const subscribe = (callback) => {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
};

const getSnapshot = () => document.documentElement.classList.contains("dark");

const applyTheme = (dark) => {
  document.documentElement.classList.toggle("dark", dark);
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

    const x = event?.clientX ?? window.innerWidth / 2;
    const y = event?.clientY ?? 0;
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
