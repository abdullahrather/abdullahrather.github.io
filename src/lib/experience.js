import { useEffect, useState } from "react";

const CAREER_START_DATE = "2021-01-01";

export const getExperienceYears = (
  startDate = CAREER_START_DATE,
  asOf = new Date()
) => {
  const start = new Date(startDate);
  const end = asOf instanceof Date ? asOf : new Date(asOf);

  let years = end.getFullYear() - start.getFullYear();

  if (
    end.getMonth() < start.getMonth() ||
    (end.getMonth() === start.getMonth() && end.getDate() < start.getDate())
  ) {
    years -= 1;
  }

  return Math.max(0, years);
};

export const getExperienceLabel = (years = getExperienceYears()) => {
  return `${years}+ Years Experience`;
};

export const getExperienceSummary = (years = getExperienceYears()) => {
  return `I design and deliver APIs and data-driven platforms that improve reliability and automation in production. Skilled in backend frameworks, relational databases, Docker containers, and CI/CD pipelines. With ${years}+ years of experience building enterprise web applications, REST APIs, internal platforms, and database-driven business systems.`;
};

const getMsUntilNextDay = (now = new Date()) => {
  const nextDay = new Date(now);
  nextDay.setHours(24, 0, 0, 0);
  return nextDay.getTime() - now.getTime();
};

export const useExperienceYears = () => {
  const [currentDate, setCurrentDate] = useState(() => new Date());

  useEffect(() => {
    let intervalId;
    let timeoutId;

    const scheduleNextUpdate = () => {
      const delay = getMsUntilNextDay(new Date());

      timeoutId = window.setTimeout(() => {
        setCurrentDate(new Date());
        intervalId = window.setInterval(() => {
          setCurrentDate(new Date());
        }, 24 * 60 * 60 * 1000);
      }, delay);
    };

    scheduleNextUpdate();

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, []);

  return getExperienceYears(CAREER_START_DATE, currentDate);
};
