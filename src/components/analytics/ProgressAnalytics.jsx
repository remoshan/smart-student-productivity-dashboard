import { Card } from '../common/Card';
import { getLast7DaysData, getCurrentWeekData, getDailyCompletionRate, getWeeklyCompletionRate } from '../../utils/analytics';
import { getToday } from '../../utils/dateUtils';
import { useTheme } from '../../hooks/useTheme';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

/**
 * Progress Analytics component with charts
 */
export const ProgressAnalytics = () => {
  const { theme } = useTheme();
  const last7DaysData = getLast7DaysData();
  const currentWeekData = getCurrentWeekData();
  const todayRate = getDailyCompletionRate(getToday());
  const weekRate = getWeeklyCompletionRate();

  const isDark = theme === 'dark';
  const tooltipStyle = {
    backgroundColor: isDark ? 'rgb(31, 41, 55)' : 'rgb(255, 255, 255)',
    border: isDark ? '1px solid rgb(55, 65, 81)' : '1px solid rgb(229, 231, 235)',
    borderRadius: '8px',
  };
  const labelStyle = {
    color: isDark ? 'rgb(249, 250, 251)' : 'rgb(17, 24, 39)',
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Progress Analytics
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Track your productivity and completion rates
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Today's Completion Rate
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {todayRate}%
              </p>
            </div>
            <div className="text-4xl">📊</div>
          </div>
          <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${todayRate}%` }}
            />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Weekly Completion Rate
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {weekRate}%
              </p>
            </div>
            <div className="text-4xl">📈</div>
          </div>
          <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${weekRate}%` }}
            />
          </div>
        </Card>
      </div>

      {/* Last 7 Days Chart */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Last 7 Days Completion Rate
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={last7DaysData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-700" />
            <XAxis
              dataKey="label"
              className="text-gray-600 dark:text-gray-400"
              stroke="currentColor"
            />
            <YAxis
              domain={[0, 100]}
              className="text-gray-600 dark:text-gray-400"
              stroke="currentColor"
            />
            <Tooltip contentStyle={tooltipStyle} labelStyle={labelStyle} />
            <Legend />
            <Line
              type="monotone"
              dataKey="rate"
              name="Completion Rate (%)"
              stroke="#0ea5e9"
              strokeWidth={2}
              dot={{ fill: '#0ea5e9', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Current Week Tasks Chart */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Current Week Task Completion
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={currentWeekData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-700" />
            <XAxis
              dataKey="label"
              className="text-gray-600 dark:text-gray-400"
              stroke="currentColor"
            />
            <YAxis
              className="text-gray-600 dark:text-gray-400"
              stroke="currentColor"
            />
            <Tooltip contentStyle={tooltipStyle} labelStyle={labelStyle} />
            <Legend />
            <Bar
              dataKey="completed"
              name="Completed"
              fill="#10b981"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="total"
              name="Total"
              fill="#e5e7eb"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Last 7 Days Summary
          </h3>
          <div className="space-y-3">
            {last7DaysData.map((day) => (
              <div key={day.date} className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {day.label}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {day.completed} of {day.total} tasks completed
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900 dark:text-gray-100">
                    {day.rate}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Current Week Summary
          </h3>
          <div className="space-y-3">
            {currentWeekData.map((day) => (
              <div key={day.date} className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {day.label}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {day.completed} of {day.total} tasks completed
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900 dark:text-gray-100">
                    {day.rate}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
