/**
 * Analytics utility functions for task completion tracking
 */

import { getStorageItem, setStorageItem, STORAGE_KEYS } from './storage';
import { getToday, getWeekDates } from './dateUtils';

/**
 * Get analytics data
 */
export const getAnalytics = () => {
  return getStorageItem(STORAGE_KEYS.ANALYTICS, {
    daily: {},
    weekly: {},
  });
};

/**
 * Record task completion
 */
export const recordTaskCompletion = (taskId, completed = true) => {
  const analytics = getAnalytics();
  const today = getToday();

  if (!analytics.daily[today]) {
    analytics.daily[today] = { completed: 0, total: 0 };
  }

  if (completed) {
    analytics.daily[today].completed += 1;
  }

  analytics.daily[today].total += 1;

  // Update weekly stats
  const weekDates = getWeekDates();
  const weekKey = weekDates[0] + '_' + weekDates[6];
  if (!analytics.weekly[weekKey]) {
    analytics.weekly[weekKey] = { completed: 0, total: 0 };
  }

  if (completed) {
    analytics.weekly[weekKey].completed += 1;
  }
  analytics.weekly[weekKey].total += 1;

  setStorageItem(STORAGE_KEYS.ANALYTICS, analytics);
  return analytics;
};

/**
 * Get daily completion rate for a specific date
 */
export const getDailyCompletionRate = (date) => {
  const analytics = getAnalytics();
  const dayData = analytics.daily[date] || { completed: 0, total: 0 };
  if (dayData.total === 0) return 0;
  return Math.round((dayData.completed / dayData.total) * 100);
};

/**
 * Get weekly completion rate
 */
export const getWeeklyCompletionRate = () => {
  const analytics = getAnalytics();
  const weekDates = getWeekDates();
  const weekKey = weekDates[0] + '_' + weekDates[6];
  const weekData = analytics.weekly[weekKey] || { completed: 0, total: 0 };
  if (weekData.total === 0) return 0;
  return Math.round((weekData.completed / weekData.total) * 100);
};

/**
 * Get last 7 days completion data for chart
 */
export const getLast7DaysData = () => {
  const analytics = getAnalytics();
  const today = new Date();
  const data = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    const dayData = analytics.daily[dateStr] || { completed: 0, total: 0 };
    const rate = dayData.total === 0 ? 0 : Math.round((dayData.completed / dayData.total) * 100);

    data.push({
      date: dateStr,
      label: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      completed: dayData.completed,
      total: dayData.total,
      rate,
    });
  }

  return data;
};

/**
 * Get current week completion data
 */
export const getCurrentWeekData = () => {
  const analytics = getAnalytics();
  const weekDates = getWeekDates();
  const data = [];

  weekDates.forEach((dateStr) => {
    const dayData = analytics.daily[dateStr] || { completed: 0, total: 0 };
    const rate = dayData.total === 0 ? 0 : Math.round((dayData.completed / dayData.total) * 100);
    const date = new Date(dateStr);

    data.push({
      date: dateStr,
      label: date.toLocaleDateString('en-US', { weekday: 'short' }),
      completed: dayData.completed,
      total: dayData.total,
      rate,
    });
  });

  return data;
};
