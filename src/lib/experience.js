import { useNow } from "./hooks";

const CAREER_START_DATE = "2021-01-01";

export const getExperienceYears = (startDate = CAREER_START_DATE, asOf = new Date()) => {
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

export const useExperienceYears = () => getExperienceYears(CAREER_START_DATE, useNow());
