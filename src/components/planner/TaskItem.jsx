import { motion } from 'framer-motion';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { PRIORITY_COLORS, PRIORITY_LABELS, TASK_STATUS_LABELS } from '../../data/constants';
import { formatDisplayDate, isToday, isPast } from '../../utils/dateUtils';

/**
 * Individual task item component
 */
export const TaskItem = ({ task, onToggle, onEdit, onDelete }) => {
  const isOverdue = isPast(task.dueDate) && task.status !== 'completed';
  const isDueToday = isToday(task.dueDate);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className={`card p-4 hover:shadow-md transition-shadow duration-200 ${
        task.status === 'completed' ? 'opacity-75' : ''
      } ${isOverdue ? 'border-l-4 border-l-red-500' : ''}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          {/* Checkbox */}
          <input
            type="checkbox"
            checked={task.status === 'completed'}
            onChange={() => onToggle(task.id)}
            className="mt-1 w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
          />

          {/* Task Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <h3
                className={`font-medium text-gray-900 dark:text-gray-100 ${
                  task.status === 'completed' ? 'line-through' : ''
                }`}
              >
                {task.title}
              </h3>
              <Badge
                variant="default"
                className={PRIORITY_COLORS[task.priority]}
              >
                {PRIORITY_LABELS[task.priority]}
              </Badge>
              <Badge variant="default">
                {TASK_STATUS_LABELS[task.status]}
              </Badge>
            </div>

            {task.description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                {task.description}
              </p>
            )}

            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <span>📚</span>
                {task.subject}
              </span>
              <span
                className={`flex items-center gap-1 ${
                  isOverdue
                    ? 'text-red-600 dark:text-red-400 font-medium'
                    : isDueToday
                    ? 'text-primary-600 dark:text-primary-400 font-medium'
                    : ''
                }`}
              >
                <span>📅</span>
                {formatDisplayDate(task.dueDate)}
                {isOverdue && ' (Overdue)'}
                {isDueToday && ' (Today)'}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(task)}
            className="!p-2"
            aria-label="Edit task"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(task.id)}
            className="!p-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
            aria-label="Delete task"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
