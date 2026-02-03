/**
 * Application constants
 */

export const PRIORITIES = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
};

export const PRIORITY_LABELS = {
  [PRIORITIES.LOW]: 'Low',
  [PRIORITIES.MEDIUM]: 'Medium',
  [PRIORITIES.HIGH]: 'High',
  [PRIORITIES.URGENT]: 'Urgent',
};

export const PRIORITY_COLORS = {
  [PRIORITIES.LOW]: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  [PRIORITIES.MEDIUM]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  [PRIORITIES.HIGH]: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  [PRIORITIES.URGENT]: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

export const TASK_STATUS = {
  TODO: 'todo',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
};

export const TASK_STATUS_LABELS = {
  [TASK_STATUS.TODO]: 'To Do',
  [TASK_STATUS.IN_PROGRESS]: 'In Progress',
  [TASK_STATUS.COMPLETED]: 'Completed',
};

export const POMODORO_DEFAULTS = {
  FOCUS_MINUTES: 25,
  SHORT_BREAK_MINUTES: 5,
  LONG_BREAK_MINUTES: 15,
  LONG_BREAK_INTERVAL: 4,
};

export const SUBJECTS = [
  'Mathematics',
  'Science',
  'English',
  'History',
  'Computer Science',
  'Physics',
  'Chemistry',
  'Biology',
  'Literature',
  'Other',
];
