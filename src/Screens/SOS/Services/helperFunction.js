export const formatDate = (isoString) => {
  if (!isoString) return "";
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, "0"); // dd
  const month = String(date.getMonth() + 1).padStart(2, "0"); // mm
  const year = date.getFullYear(); // yyyy
  return `${day}-${month}-${year}`;
};

export const formatDateTime = (timestamp) => {
  const date = new Date(timestamp);

  // Format time (e.g., "08:14 AM")
  const time = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  // Format date (e.g., "06-07-2025" for DD-MM-YYYY)
  const formattedDate = date
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "-"); // Replace slashes with dashes if preferred

  return { time, date: formattedDate };
};
