/**
 * Date utility functions
 */

/**
 * Format date to YYYY-MM-DD
 */
export const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Get today's date in YYYY-MM-DD format
 */
export const getToday = () => {
  return formatDate(new Date());
};

/**
 * Check if date is today
 */
export const isToday = (date) => {
  if (!date) return false;
  return formatDate(new Date(date)) === getToday();
};

/**
 * Check if date is in the past
 */
export const isPast = (date) => {
  if (!date) return false;
  return new Date(date) < new Date(getToday());
};

/**
 * Get start of week (Monday)
 */
export const getWeekStart = () => {
  const today = new Date();
  const day = today.getDay();
  const diff = today.getDate() - day + (day === 0 ? -6 : 1); // Adjust to Monday
  const monday = new Date(today.setDate(diff));
  return formatDate(monday);
};

/**
 * Get end of week (Sunday)
 */
export const getWeekEnd = () => {
  const weekStart = new Date(getWeekStart());
  const sunday = new Date(weekStart);
  sunday.setDate(weekStart.getDate() + 6);
  return formatDate(sunday);
};

/**
 * Get all dates in current week
 */
export const getWeekDates = () => {
  const start = new Date(getWeekStart());
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    dates.push(formatDate(date));
  }
  return dates;
};

/**
 * Format date for display (e.g., "Jan 15, 2024")
 */
export const formatDisplayDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};
