// Project pictures. Every project is shown as a window on the same backdrop: a real
// screenshot where the project can be shown, a schematic of its main screen where the
// code is private. The schematics use the theme colours, so they follow light and dark.

const soft = "fill-fg/6";
const bar = "fill-fg/12";
const strong = "fill-fg/25";
const hi = "fill-accent/75";
const hi2 = "fill-accent-2/65";

const times = (n, render) => Array.from({ length: n }, (_, i) => render(i));

const MOTIFS = {
  // Admin platform: sidebar, tiles, a chart and a table
  platform: (
    <>
      <rect width="74" height="240" className={soft} />
      <rect x="12" y="14" width="30" height="9" rx="4.5" className={strong} />
      {times(6, (i) => (
        <rect
          key={i}
          x="12"
          y={40 + i * 17}
          width={i === 1 ? 50 : 38 + (i % 3) * 5}
          height="7"
          rx="3.5"
          className={i === 1 ? hi : bar}
        />
      ))}
      {times(3, (i) => (
        <g key={i}>
          <rect x={90 + i * 100} y="14" width="88" height="46" rx="8" className={soft} />
          <rect x={100 + i * 100} y="24" width="34" height="6" rx="3" className={bar} />
          <rect x={100 + i * 100} y="38" width={50 - i * 8} height="11" rx="4" className={i === 0 ? hi : strong} />
        </g>
      ))}
      <rect x="90" y="72" width="188" height="88" rx="8" className={soft} />
      <path
        d="M102 138 132 120 160 128 190 100 220 110 264 86"
        fill="none"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-accent/80"
      />
      <rect x="290" y="72" width="88" height="88" rx="8" className={soft} />
      {times(4, (i) => (
        <rect
          key={i}
          x="300"
          y={84 + i * 17}
          width={68 - (i % 2) * 18}
          height="7"
          rx="3.5"
          className={i === 0 ? hi2 : bar}
        />
      ))}
      {times(4, (i) => (
        <g key={i}>
          <rect x="90" y={172 + i * 17} width="288" height="11" rx="5.5" className={soft} />
          <rect x="98" y={175 + i * 17} width={60 + (i % 3) * 16} height="5" rx="2.5" className={bar} />
          <rect x="336" y={175 + i * 17} width="30" height="5" rx="2.5" className={i === 1 ? hi : bar} />
        </g>
      ))}
    </>
  ),

  // Records: a searchable list of people
  records: (
    <>
      <rect x="20" y="16" width="150" height="16" rx="8" className={soft} />
      <rect x="310" y="16" width="70" height="16" rx="8" className={hi} />
      {times(7, (i) => (
        <g key={i}>
          <rect x="20" y={46 + i * 28} width="360" height="22" rx="8" className={soft} />
          <circle cx="36" cy={57 + i * 28} r="6" className={i % 3 === 0 ? hi2 : strong} />
          <rect x="52" y={54 + i * 28} width={70 + (i % 3) * 18} height="6" rx="3" className={bar} />
          <rect x="190" y={54 + i * 28} width={50 + (i % 2) * 24} height="6" rx="3" className={bar} />
          <rect x="324" y={52 + i * 28} width="44" height="10" rx="5" className={i % 4 === 1 ? hi : bar} />
        </g>
      ))}
    </>
  ),

  // Form: steps on the left, labelled fields and a submit button
  form: (
    <>
      {times(4, (i) => (
        <g key={i}>
          <circle cx="34" cy={34 + i * 34} r="8" className={i === 1 ? hi : soft} />
          <rect x="50" y={31 + i * 34} width={48 + (i % 2) * 14} height="6" rx="3" className={i === 1 ? strong : bar} />
        </g>
      ))}
      <rect x="130" y="16" width="250" height="240" rx="10" className={soft} />
      <rect x="146" y="32" width="90" height="9" rx="4.5" className={strong} />
      {times(4, (i) => (
        <g key={i}>
          <rect
            x={146 + (i % 2) * 114}
            y={58 + Math.floor(i / 2) * 44}
            width="50"
            height="5"
            rx="2.5"
            className={bar}
          />
          <rect
            x={146 + (i % 2) * 114}
            y={68 + Math.floor(i / 2) * 44}
            width="104"
            height="20"
            rx="6"
            fill="none"
            className="stroke-fg/20"
          />
        </g>
      ))}
      <rect x="146" y="146" width="60" height="5" rx="2.5" className={bar} />
      <rect x="146" y="156" width="218" height="34" rx="6" fill="none" className="stroke-fg/20" />
      <rect x="294" y="204" width="70" height="20" rx="10" className={hi} />
    </>
  ),

  // Kanban: three columns of cards
  kanban: (
    <>
      {times(3, (c) => (
        <g key={c}>
          <rect x={20 + c * 124} y="16" width="112" height="240" rx="10" className={soft} />
          <rect x={32 + c * 124} y="28" width={46 + c * 8} height="7" rx="3.5" className={strong} />
          {times(c === 1 ? 2 : 3, (i) => (
            <g key={i}>
              <rect x={30 + c * 124} y={46 + i * 56} width="92" height="46" rx="7" className="fill-bg stroke-fg/12" />
              <rect
                x={38 + c * 124}
                y={55 + i * 56}
                width={56 + ((i + c) % 2) * 16}
                height="6"
                rx="3"
                className={bar}
              />
              <rect x={38 + c * 124} y={67 + i * 56} width="40" height="5" rx="2.5" className={soft} />
              <rect
                x={38 + c * 124}
                y={78 + i * 56}
                width="26"
                height="8"
                rx="4"
                className={(i + c) % 3 === 0 ? hi : (i + c) % 3 === 1 ? hi2 : bar}
              />
            </g>
          ))}
        </g>
      ))}
    </>
  ),

  // Charts: two numbers, a bar chart and a line
  chart: (
    <>
      {times(2, (i) => (
        <g key={i}>
          <rect x={20 + i * 124} y="16" width="112" height="46" rx="8" className={soft} />
          <rect x={32 + i * 124} y="26" width="40" height="6" rx="3" className={bar} />
          <rect x={32 + i * 124} y="40" width={58 - i * 12} height="11" rx="4" className={i === 0 ? hi : strong} />
        </g>
      ))}
      <rect x="268" y="16" width="112" height="46" rx="8" className={soft} />
      <rect x="280" y="26" width="40" height="6" rx="3" className={bar} />
      <rect x="280" y="40" width="64" height="11" rx="4" className={hi2} />
      <rect x="20" y="74" width="360" height="182" rx="10" className={soft} />
      {times(12, (i) => {
        const h = [44, 62, 50, 78, 70, 96, 84, 110, 92, 124, 108, 136][i];
        return (
          <rect key={i} x={36 + i * 28} y={236 - h} width="16" height={h} rx="4" className={i % 3 === 2 ? hi : bar} />
        );
      })}
      <path
        d="M44 176 72 160 100 168 128 140 156 146 184 120 212 128 240 104 268 116 296 90 324 100 352 82"
        fill="none"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-accent-2/80"
      />
    </>
  ),

  // Sign-in: a card with two fields and a button
  auth: (
    <>
      <rect x="20" y="16" width="60" height="9" rx="4.5" className={strong} />
      <rect x="330" y="16" width="50" height="9" rx="4.5" className={bar} />
      <rect x="110" y="44" width="180" height="212" rx="12" className={soft} />
      <circle cx="200" cy="78" r="16" className={hi} />
      <path
        d="M194 78v-4a6 6 0 0 1 12 0v4m-14 0h16v10h-16z"
        fill="none"
        strokeWidth="2"
        strokeLinejoin="round"
        className="stroke-bg"
      />
      {times(2, (i) => (
        <g key={i}>
          <rect x="130" y={110 + i * 40} width="46" height="5" rx="2.5" className={bar} />
          <rect x="130" y={120 + i * 40} width="140" height="20" rx="6" fill="none" className="stroke-fg/20" />
        </g>
      ))}
      <rect x="130" y="196" width="140" height="22" rx="11" className={hi} />
      <rect x="166" y="230" width="68" height="5" rx="2.5" className={bar} />
    </>
  ),

  // Website: navigation, a hero and three cards
  site: (
    <>
      <rect x="20" y="16" width="44" height="9" rx="4.5" className={strong} />
      {times(4, (i) => (
        <rect key={i} x={232 + i * 38} y="17" width="28" height="7" rx="3.5" className={i === 3 ? hi : bar} />
      ))}
      <rect x="20" y="52" width="150" height="13" rx="6" className={strong} />
      <rect x="20" y="72" width="112" height="13" rx="6" className={strong} />
      <rect x="20" y="98" width="140" height="6" rx="3" className={bar} />
      <rect x="20" y="110" width="118" height="6" rx="3" className={bar} />
      <rect x="20" y="130" width="62" height="18" rx="9" className={hi} />
      <rect x="210" y="46" width="170" height="108" rx="10" className={soft} />
      <circle cx="252" cy="82" r="13" className={hi2} />
      <path d="M210 144 262 108 300 132 336 100 380 136v8a10 10 0 0 1-10 10H220a10 10 0 0 1-10-10z" className={bar} />
      {times(3, (i) => (
        <g key={i}>
          <rect x={20 + i * 124} y="174" width="112" height="82" rx="10" className={soft} />
          <rect x={32 + i * 124} y="186" width="20" height="20" rx="6" className={i === 1 ? hi : bar} />
          <rect x={32 + i * 124} y="216" width="70" height="6" rx="3" className={bar} />
          <rect x={32 + i * 124} y="228" width="52" height="6" rx="3" className={soft} />
        </g>
      ))}
    </>
  ),

  // Converter: two amounts, a swap button and a rate line
  convert: (
    <>
      <rect x="80" y="20" width="240" height="236" rx="12" className={soft} />
      <rect x="100" y="38" width="80" height="9" rx="4.5" className={strong} />
      {times(2, (i) => (
        <g key={i}>
          <rect x="100" y={62 + i * 62} width="200" height="40" rx="10" className="fill-bg stroke-fg/12" />
          <circle cx="122" cy={82 + i * 62} r="10" className={i === 0 ? hi : hi2} />
          <rect x="140" y={78 + i * 62} width="34" height="8" rx="4" className={bar} />
          <rect x={236 - i * 10} y={76 + i * 62} width={52 + i * 10} height="12" rx="4" className={strong} />
        </g>
      ))}
      <circle cx="200" cy="113" r="13" className="fill-bg stroke-fg/20" />
      <path
        d="m195 110 5-5 5 5m-10 6 5 5 5-5"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-accent"
      />
      <path
        d="M100 222 126 212 150 218 178 198 204 204 232 186 260 192 300 176"
        fill="none"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-accent/80"
      />
    </>
  ),
};

/** A browser-style window: three dots, then whatever is shown inside. */
export const Window = ({ className = "", children }) => (
  <div className={`overflow-hidden rounded-xl border border-line-strong bg-card-solid shadow-2xl ${className}`}>
    <div className="flex h-6 items-center gap-1.5 border-b border-line px-3" aria-hidden="true">
      {times(3, (i) => (
        <span key={i} className="size-1.5 rounded-full bg-fg/20" />
      ))}
    </div>
    {children}
  </div>
);

/** What a project's window shows: its screenshot, or its schematic. `sizes` is for screenshots. */
export const Screen = ({ project, sizes, eager = false }) =>
  project.shot ? (
    <img
      src={project.shot}
      srcSet={`${project.shot.replace(/\.webp$/, "-640.webp")} 640w, ${project.shot} 1200w`}
      sizes={sizes}
      alt=""
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      width="1200"
      height="750"
      className="w-full"
    />
  ) : (
    <svg viewBox="0 0 400 240" className="w-full" aria-hidden="true">
      {MOTIFS[project.cover]}
    </svg>
  );

/**
 * The picture for one project: its window on the shared backdrop.
 * Decorative: the project's title is always next to it.
 */
const Cover = ({ project, sizes, eager = false, className = "", style }) => (
  <div className={`cover relative overflow-hidden ${className}`} style={style} aria-hidden="true">
    <Window className="cover-window absolute inset-x-[7%] top-[11%] h-full rounded-b-none">
      <Screen project={project} sizes={sizes} eager={eager} />
    </Window>
  </div>
);

export default Cover;
