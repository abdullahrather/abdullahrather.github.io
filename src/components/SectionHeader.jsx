import { useReveal } from "../lib/hooks";

/** Eyebrow + display heading (with an optional serif-italic accent) + lead paragraph. */
const SectionHeader = ({ eyebrow, before, em, after, lead, id }) => {
  const reveal = useReveal();
  return (
    <div ref={reveal} className="mb-14 flex flex-col gap-6 sm:mb-20 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl">
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={id} className="h-display mt-5">
          {before} {em && <span className="serif-em">{em}</span>} {after}
        </h2>
        {lead && <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{lead}</p>}
      </div>
    </div>
  );
};

export default SectionHeader;
