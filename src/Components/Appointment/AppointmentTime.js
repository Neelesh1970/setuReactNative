//This will give our Appointment times according to period

const formatTime = (date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();

  // Determine the period (AM or PM)
  let period = hours >= 12 ? "PM" : "AM";

  // Convert to 12-hour format
  hours = hours % 12 || 12; // Convert 0 hours to 12

  // Pad single digit minutes with leading zero
  minutes = minutes.toString().padStart(2, "0");

  // Format hours to two digits (e.g., "04" instead of "4")
  hours = hours.toString().padStart(2, "0");

  return `${hours}:${minutes} ${period}`;
};
export const generateTimes = (period) => {
  const times = [];
  const startTimes = {
    morning: "10:00",
    afternoon: "12:00",
    evening: "16:00",
    all: "10:00",
  };
  const endTimes = {
    morning: "11:45",
    afternoon: "15:45",
    evening: "20:45",
    all: "20:45",
  };

  let startTime = startTimes[period] || startTimes.all;
  let endTime = endTimes[period] || endTimes.all;

  const start = new Date(`1970-01-01T${startTime}:00`);
  const end = new Date(`1970-01-01T${endTime}:00`);

  while (start <= end) {
    times.push(formatTime(start));
    start.setMinutes(start.getMinutes() + 15); // Increment by 15 minutes
  }

  return times;
};
