import SectionHeader from "./SectionHeader";
import { ContentIcon } from "./Icons";
import { useTranslation } from "../lib/i18n";
import { spotlight, useReveal } from "../lib/hooks";

const FocusCard = ({ item, index }) => {
  const reveal = useReveal();
  return (
    <article
      ref={reveal}
      onPointerMove={spotlight}
      style={{ "--delay": `${(index % 3) * 70}ms` }}
      className="card spotlight group flex flex-col p-7 transition-colors duration-300 hover:border-line-strong"
    >
      <div className="flex items-center justify-between">
        <span className="grid size-11 place-items-center rounded-2xl border border-line bg-fg/3 text-accent transition-transform duration-500 ease-out-expo group-hover:-rotate-6 group-hover:scale-110">
          <ContentIcon item={item} />
        </span>
        <span className="font-mono text-xs text-subtle">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <h3 className="mt-8 text-lg font-semibold tracking-tight">{item.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
      <ul className="mt-auto flex flex-wrap gap-1.5 pt-6">
        {item.features.map((f) => (
          <li key={f} className="chip">
            {f}
          </li>
        ))}
      </ul>
    </article>
  );
};

const Expertise = () => {
  const { t } = useTranslation();
  const items = t("expertise.items") || [];

  return (
    <section id="expertise" className="section" aria-labelledby="expertise-title">
      <div className="container-x">
        <SectionHeader
          id="expertise-title"
          eyebrow={t("ui.expertise.eyebrow")}
          before={t("ui.expertise.heading_a")}
          em={t("ui.expertise.heading_em")}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <FocusCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Expertise;
