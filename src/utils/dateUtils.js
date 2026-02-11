export const getTodayDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Parse YYYY-MM-DD string to local Date
export const parseLocalDate = (dateStr) => {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
};

// Convert Date to YYYY-MM-DD string (local timezone)
export const toLocalDateString = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Get week start (Monday)
export const getWeekStart = (dateStr) => {
  const d = parseLocalDate(dateStr);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  return toLocalDateString(d);
};

// Get week end (Sunday)
export const getWeekEnd = (dateStr) => {
  const d = parseLocalDate(dateStr);
  const day = d.getDay();
  const diff = d.getDate() + (day === 0 ? 0 : 7 - day);
  d.setDate(diff);
  return toLocalDateString(d);
};

// Get month end
export const getMonthEnd = (dateStr) => {
  const d = parseLocalDate(dateStr);
  d.setMonth(d.getMonth() + 1);
  d.setDate(0);
  return toLocalDateString(d);
};

// Get date X days ago
export const getDateDaysAgo = (days) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return toLocalDateString(date);
};
