import React, { useEffect, useMemo, useState } from "react";

const EXPERIENCE_DATE_FORMAT = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
});

const formatDuration = (startDate, endDate = new Date()) => {
  const start = new Date(startDate);
  const end = endDate instanceof Date ? endDate : new Date(endDate);

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const parts = [];
  if (years > 0) {
    parts.push(`${years} year${years > 1 ? "s" : ""}`);
  }
  if (months > 0) {
    parts.push(`${months} month${months > 1 ? "s" : ""}`);
  }

  if (!parts.length) {
    parts.push("Less than 1 month");
  }

  return parts.join(" ");
};

const formatPeriodLabel = (startDate, endDate) => {
  const startLabel = EXPERIENCE_DATE_FORMAT.format(new Date(startDate));
  const endLabel = endDate ? EXPERIENCE_DATE_FORMAT.format(new Date(endDate)) : "Present";
  return `${startLabel} - ${endLabel}`;
};

const WorkExperience = () => {
  const [currentDate, setCurrentDate] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentDate(new Date());
    }, 60 * 60 * 1000);

    return () => window.clearInterval(timer);
  }, []);

  const experiences = useMemo(
    () => [
      {
        company: "APS Services GmbH",
        website: "https://www.apsservices.de/",
        location: "Neckarsulm, Germany",
        role: "Software Developer",
        summary:
          "Further developed and maintained a comprehensive enterprise management system supporting customers, tickets, offers, orders, invoicing, project workflows, employee time tracking, and reporting.",
        highlights: [
          "Built REST integrations, including DATEV-related workflows, and contributed to secure authentication, role-based access control, and business-critical internal process automation.",
          "Developed reporting, export, and dashboard functionality while improving maintainability, usability, and performance through code optimization and database query refinement.",
          "Contributed to modernization of legacy application areas through structured backend logic, refactoring, testing, and continuous integration practices.",
          "Built responsive internal interfaces and AJAX-based workflows to support efficient day-to-day operations across multiple modules.",
        ],
        accent: "from-indigo-500 to-cyan-500",
        startDate: "2024-07-01",
        endDate: null,
        tag: "Part-Time",
      },
      {
        company: "Qualven Pvt Ltd",
        website: "https://qualven.com/qv-web/",
        location: "Islamabad, Pakistan",
        role: "Technical Team Lead",
        summary:
          "Led a team of five while remaining deeply hands-on in the design, development, testing, deployment, and maintenance of PHP-based business applications.",
        highlights: [
          "Built backend logic, integrated APIs, implemented frontend-backend workflows, and contributed directly to new features across multiple web applications.",
          "Worked on database design, schema changes, optimization, and data handling to support evolving backend requirements and newly introduced business features.",
          "Managed deployments and application updates across hosting environments and Linux-based local network systems, including SSH-based workflows and production support.",
          "Maintained coding standards, code reviews, documentation, and secure, maintainable implementation practices while resolving technical blockers and supporting reliable software delivery.",
        ],
        accent: "from-emerald-500 to-teal-500",
        startDate: "2021-11-01",
        endDate: "2024-04-01",
        tag: "Full-Time Onsite",
      },
      {
        company: "The Science School",
        website: "https://thescienceschool.edu.pk/tss-web/index.php",
        location: "Islamabad, Pakistan",
        role: "Software Engineer",
        summary:
          "Led the development and maintenance of a centralized Education Management Information System supporting student, staff, finance, and user administration workflows.",
        highlights: [
          "Managed relational database structures, backend logic, and secure access flows with a strong focus on data integrity, reliability, and maintainability.",
          "Implemented authentication, authorization, and role-based access control for administrators and staff across multiple modules.",
          "Improved system performance, security, and compatibility through structured upgrades, infrastructure improvements, and ongoing application refinement.",
        ],
        accent: "from-purple-500 to-fuchsia-500",
        startDate: "2022-04-01",
        endDate: "2024-04-01",
        tag: "Full-Time Remote",
      },
      {
        company: "Qualven Pvt Ltd",
        website: "https://qualven.com/qv-web/",
        location: "Islamabad, Pakistan",
        role: "Technical Intern",
        period: "01.2021 - 07.2021",
        summary:
          "Contributed to full-stack feature development across PHP backend and HTML/CSS, JavaScript, and Bootstrap frontend components.",
        highlights: ["Supported deployments, documentation, maintenance, user training, and internal/client presentations."],
        accent: "from-amber-500 to-orange-500",
        startDate: "2021-01-01",
        endDate: "2021-07-01",
        tag: "Internship",
      },
    ],
    []
  );

  return (
    <section id="work-experience" className="mx-auto max-w-7xl px-6 py-28">
      <div className="mb-14 text-center">
        <span className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700 dark:border-indigo-800/60 dark:bg-indigo-950/50 dark:text-indigo-200">
          Career Timeline
        </span>
        <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
          Work Experience
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
          A concise view of the roles behind the resume, focused on backend ownership, systems thinking, and delivery in production environments.
        </p>
      </div>

      <div className="grid gap-6 lg:gap-8">
        {experiences.map((experience, index) => (
          <article
            key={`${experience.company}-${experience.role}-${index}`}
            className="group relative overflow-hidden rounded-3xl border border-white/40 bg-white/70 p-6 shadow-lg shadow-indigo-500/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/10 dark:border-slate-700/40 dark:bg-slate-900/70 sm:p-8"
          >
            <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${experience.accent}`} />

            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
              <div className="flex-1">
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white dark:bg-white dark:text-slate-900">
                    {experience.tag || "Experience"}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200">
                    {formatPeriodLabel(experience.startDate, experience.endDate)}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200">
                    Duration: {formatDuration(experience.startDate, experience.endDate || currentDate)}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">{experience.role}</h3>
                <div className="mt-2 flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-300 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4">
                  <a
                    href={experience.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 font-semibold text-slate-800 transition-colors hover:text-indigo-600 dark:text-slate-100 dark:hover:text-indigo-300"
                  >
                    <span>{experience.company}</span>
                    <svg
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                  <span>{experience.location}</span>
                </div>

                <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">{experience.summary}</p>
              </div>

              <div className="lg:w-80 lg:shrink-0">
                <div className="rounded-2xl border border-slate-200/70 bg-slate-50/90 p-4 dark:border-slate-700/70 dark:bg-slate-800/70">
                  <div className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    <span className={`h-2.5 w-2.5 rounded-full bg-gradient-to-r ${experience.accent}`} />
                    Key Impact
                  </div>
                  <ul className="space-y-3">
                    {experience.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-indigo-500" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default WorkExperience;