import { useCallback, useEffect, useRef, useState } from "react";

// One shared observer for every .reveal element on the page.
let revealObserver;
const getRevealObserver = () => {
  if (revealObserver || typeof IntersectionObserver === "undefined") return revealObserver;
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );
  return revealObserver;
};

/** Ref callback: fades/blurs the element in the first time it enters the viewport. */
export const useReveal = () =>
  useCallback((node) => {
    if (!node) return;
    node.classList.add("reveal");
    const observer = getRevealObserver();
    if (observer) observer.observe(node);
    else node.classList.add("is-in");
  }, []);

/** Pointer handler that feeds the .spotlight radial gradient. */
export const spotlight = (event) => {
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
  el.style.setProperty("--my", `${event.clientY - rect.top}px`);
};

/** Returns the id of the section currently nearest the top of the viewport. */
export const useActiveSection = (ids) => {
  const [active, setActive] = useState("");
  const key = ids.join(",");

  useEffect(() => {
    const sections = key
      .split(",")
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [key]);

  return active;
};

/**
 * Animates a number from 0 to `target` once the element is visible.
 * Renders the final value first (pre-rendered HTML / no-JS), and only resets to 0
 * on the client when the element is still off-screen.
 */
export const useCountUp = (target, duration = 1400) => {
  const ref = useRef(null);
  const [value, setValue] = useState(target);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    setValue(target);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    if (node.getBoundingClientRect().top < window.innerHeight) return undefined;
    setValue(0);

    let frame;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min(1, (now - start) / duration);
          setValue(Math.round(target * (1 - Math.pow(1 - p, 4))));
          if (p < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target, duration]);

  return [ref, value];
};

// The page is pre-rendered at build time. Date-dependent output starts from the build
// timestamp so the first client render matches the static HTML, then moves to "now".
const BUILD_DATE = new Date(import.meta.env.VITE_BUILD_TIME || Date.now());

/** Current date, starting at build time and refreshed hourly after hydration. */
export const useNow = () => {
  const [now, setNow] = useState(BUILD_DATE);

  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 60 * 60 * 1000);
    return () => window.clearInterval(id);
  }, []);

  return now;
};

/** Current time in a given IANA timezone, refreshed every 30 s. Empty until mounted. */
export const useClock = (timeZone, locale) => {
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit", timeZone }).format(new Date());
    setTime(format());
    const id = window.setInterval(() => setTime(format()), 30_000);
    return () => window.clearInterval(id);
  }, [timeZone, locale]);

  return time;
};

/** Copies text to the clipboard and exposes a short-lived "copied" flag. */
export const useCopy = (timeout = 1800) => {
  const [copied, setCopied] = useState(false);
  const timer = useRef();

  const copy = useCallback(
    async (text) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => setCopied(false), timeout);
        return true;
      } catch {
        return false;
      }
    },
    [timeout]
  );

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return [copied, copy];
};
