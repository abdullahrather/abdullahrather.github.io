// Stroke icons (Lucide-style, 24×24). Each entry is a list of path `d` strings.
const STROKE = {
  arrowRight: ["M5 12h14", "m12 5 7 7-7 7"],
  arrowUpRight: ["M7 7h10v10", "M7 17 17 7"],
  arrowUp: ["m5 12 7-7 7 7", "M12 19V5"],
  download: ["M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", "m7 10 5 5 5-5", "M12 15V3"],
  file: [
    "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
    "M14 2v4a2 2 0 0 0 2 2h4",
    "M10 13h4",
    "M10 17h4",
  ],
  sun: [
    "M12 3v1",
    "M12 20v1",
    "m4.93 4.93.7.7",
    "m18.37 18.37.7.7",
    "M3 12h1",
    "M20 12h1",
    "m4.93 19.07.7-.7",
    "m18.37 5.63.7-.7",
    "M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z",
  ],
  moon: ["M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"],
  command: ["M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"],
  menu: ["M4 8h16", "M4 16h16"],
  x: ["M18 6 6 18", "m6 6 12 12"],
  check: ["M20 6 9 17l-5-5"],
  copy: [
    "M10 8h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2Z",
    "M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2",
  ],
  search: ["M21 21l-4.35-4.35", "M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"],
  globe: [
    "M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z",
    "M2 12h20",
    "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
  ],
  lock: ["M5 11h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z", "M7 11V7a5 5 0 0 1 10 0v4"],
  chevronDown: ["m6 9 6 6 6-6"],
  send: ["M22 2 11 13", "M22 2 15 22l-4-9-9-4Z"],
  briefcase: [
    "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",
    "M4 6h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z",
  ],
  layers: ["m12 2 10 5-10 5L2 7Z", "m2 17 10 5 10-5", "m2 12 10 5 10-5"],
  mail: ["M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2Z", "m22 6-10 7L2 6"],
  sparkle: ["M12 3l1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2Z"],
};

// Filled brand marks.
const BRAND = {
  github: {
    viewBox: "0 0 24 24",
    d: "M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.8-.26.8-.58v-2.23c-3.34.73-4.03-1.42-4.03-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.19.69.8.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z",
  },
  linkedin: {
    viewBox: "0 0 24 24",
    d: "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z",
  },
  xing: {
    viewBox: "0 0 90 90",
    d: "M13.68 17.77c-.78 0-1.44.27-1.77.81-.34.56-.29 1.27.07 1.99l8.78 15.2c.02.03.02.05 0 .07L6.97 60.18c-.36.72-.34 1.44 0 1.99.33.53.92.89 1.7.89h12.98c1.94 0 2.88-1.31 3.54-2.51l14.01-24.78-8.92-15.56c-.65-1.15-1.62-2.43-3.61-2.43H13.68zM68.21 0c-1.94 0-2.78 1.22-3.48 2.47L35.85 53.69l18.44 33.84C54.94 88.68 55.93 90 57.92 90h12.97c.78 0 1.39-.3 1.72-.83.35-.56.34-1.29-.03-2.01L54.28 53.73a.08.08 0 0 1 0-.08L83.02 2.83c.36-.72.37-1.45.03-2C82.72.3 82.1 0 81.32 0H68.21z",
  },
};

export const Icon = ({ name, className = "size-4", strokeWidth = 1.75, ...props }) => {
  const brand = BRAND[name];
  if (brand) {
    return (
      <svg viewBox={brand.viewBox} fill="currentColor" aria-hidden="true" className={className} {...props}>
        <path d={brand.d} />
      </svg>
    );
  }
  const paths = STROKE[name] ?? [];
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
};

/** Renders the icon path(s) carried by a content item from the language files. */
export const ContentIcon = ({ item, className = "size-5" }) => {
  const paths = item.iconPaths ?? (item.iconPath ? [item.iconPath] : []);
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
};
