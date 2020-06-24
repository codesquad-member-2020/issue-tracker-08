export const configureDate = (dateValue, monthType, sortType) => {
  const date = new Date(dateValue);
  const year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(date);
  const month = new Intl.DateTimeFormat("en", { month: monthType }).format(date);
  const day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);
  if (sortType === "Milestone") return `${month} ${day}, ${year}`;
  return `${year}-${month}-${day}`;
};
