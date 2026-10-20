import { useNow } from "./hooks";

const CAREER_START_DATE = "2021-01-01";

export const getExperienceYears = (startDate = CAREER_START_DATE, asOf = new Date()) => {
  const start = new Date(startDate);
  const end = asOf instanceof Date ? asOf : new Date(asOf);

  // UTC fields: "YYYY-MM-DD" strings parse as UTC midnight, so local getters would
  // shift by a day/month for visitors west of UTC.
  let years = end.getUTCFullYear() - start.getUTCFullYear();
  if (
    end.getUTCMonth() < start.getUTCMonth() ||
    (end.getUTCMonth() === start.getUTCMonth() && end.getUTCDate() < start.getUTCDate())
  ) {
    years -= 1;
  }

  return Math.max(0, years);
};

export const useExperienceYears = () => getExperienceYears(CAREER_START_DATE, useNow());
