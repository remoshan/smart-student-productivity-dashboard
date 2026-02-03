import { Card } from '../common/Card';
import { useTasks } from '../../hooks/useTasks';
import { usePomodoro } from '../../hooks/usePomodoro';
import { getToday, isToday, isPast } from '../../utils/dateUtils';
import { TASK_STATUS } from '../../data/constants';
import { getLast7DaysData } from '../../utils/analytics';

/**
 * Dashboard overview component
 */
export const Dashboard = () => {
  const { tasks } = useTasks();
  const { completedPomodoros } = usePomodoro();
  const today = getToday();
  const analytics = getLast7DaysData();

  const stats = {
    totalTasks: tasks.length,
    completedTasks: tasks.filter((t) => t.status === TASK_STATUS.COMPLETED).length,
    todayTasks: tasks.filter((t) => isToday(t.dueDate)).length,
    overdueTasks: tasks.filter((t) => isPast(t.dueDate) && t.status !== TASK_STATUS.COMPLETED).length,
    inProgressTasks: tasks.filter((t) => t.status === TASK_STATUS.IN_PROGRESS).length,
  };

  const completionRate = stats.totalTasks > 0 
    ? Math.round((stats.completedTasks / stats.totalTasks) * 100) 
    : 0;

  const todayCompletionRate = analytics[analytics.length - 1]?.rate || 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Dashboard Overview
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back! Here's your productivity summary.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Tasks</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                {stats.totalTasks}
              </p>
            </div>
            <div className="text-4xl">📋</div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-1">
                {stats.completedTasks}
              </p>
            </div>
            <div className="text-4xl">✅</div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Today's Tasks</p>
              <p className="text-3xl font-bold text-primary-600 dark:text-primary-400 mt-1">
                {stats.todayTasks}
              </p>
            </div>
            <div className="text-4xl">📅</div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Pomodoros</p>
              <p className="text-3xl font-bold text-orange-600 dark:text-orange-400 mt-1">
                {completedPomodoros}
              </p>
            </div>
            <div className="text-4xl">🍅</div>
          </div>
        </Card>
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Overall Completion Rate
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {stats.completedTasks} of {stats.totalTasks} tasks completed
              </span>
              <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                {completionRate}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div
                className="bg-primary-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Today's Progress
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Daily completion rate
              </span>
              <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                {todayCompletionRate}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div
                className="bg-green-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${todayCompletionRate}%` }}
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Alerts */}
      {(stats.overdueTasks > 0 || stats.inProgressTasks > 0) && (
        <Card className="border-l-4 border-l-yellow-500">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Quick Actions
          </h3>
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            {stats.overdueTasks > 0 && (
              <p>⚠️ {stats.overdueTasks} task{stats.overdueTasks > 1 ? 's' : ''} overdue</p>
            )}
            {stats.inProgressTasks > 0 && (
              <p>🔄 {stats.inProgressTasks} task{stats.inProgressTasks > 1 ? 's' : ''} in progress</p>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};
