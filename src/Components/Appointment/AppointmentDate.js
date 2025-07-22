// dateUtils.js

const getFormattedDate = (date, includeDay) => {
  const options = { day: "2-digit", month: "short" };
  if (includeDay) {
    options.weekday = "short";
  }
  return date.toLocaleDateString("en-GB", options);
};

const formatDateComponents = (date) => {
  const day = date.getDate(); // Day of the month
  const month = date.toLocaleString("en-GB", { month: "short" }); // Month in abbreviated form (e.g., "Aug")
  const weekday = date.toLocaleString("en-GB", { weekday: "short" }); // Weekday in abbreviated form (e.g., "Fri")

  return `${day} ${month} ${weekday}`;
};

const getDateLabel = (index) => {
  switch (index) {
    case 0:
      return "Today";
    case 1:
      return "Tomorrow";
    default:
      return "";
  }
};

export const generatedNext7Dates = () => {
  const dates = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    // Determine if we should include the day of the week in the formatting
    const includeDay = i > 1; // Include day of the week only for dates after today and tomorrow

    const formattedDate = getFormattedDate(date, includeDay);
    const label = getDateLabel(i);

    dates.push(`${label ? label + ", " : ""}${formattedDate}`);
  }

  return dates;
};

export const generateNext4Days = () => {
  const dates = [];
  const today = new Date();

  for (let i = 1; i <= 4; i++) {
    // Generate 4 days
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    // Include day of the week for all 4 days
    const includeDay = true;

    const formattedDate = formatDateComponents(date);

    // Format date to be "day month dayOfWeek"
    dates.push(formattedDate);
  }

  return dates;
};
