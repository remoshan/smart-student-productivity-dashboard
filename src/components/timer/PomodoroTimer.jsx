import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { Input } from '../common/Input';
import { usePomodoro } from '../../hooks/usePomodoro';

/**
 * Pomodoro Timer component
 */
export const PomodoroTimer = () => {
  const {
    timeLeft,
    formattedTime,
    isRunning,
    isPaused,
    sessionType,
    completedPomodoros,
    progress,
    focusMinutes,
    shortBreakMinutes,
    longBreakMinutes,
    setFocusMinutes,
    setShortBreakMinutes,
    setLongBreakMinutes,
    start,
    pause,
    resume,
    reset,
    switchSession,
  } = usePomodoro();

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settings, setSettings] = useState({
    focus: focusMinutes,
    shortBreak: shortBreakMinutes,
    longBreak: longBreakMinutes,
  });

  const handleSaveSettings = () => {
    setFocusMinutes(settings.focus);
    setShortBreakMinutes(settings.shortBreak);
    setLongBreakMinutes(settings.longBreak);
    setIsSettingsOpen(false);
    reset();
  };

  const sessionLabels = {
    focus: 'Focus Time',
    shortBreak: 'Short Break',
    longBreak: 'Long Break',
  };

  const sessionColors = {
    focus: 'text-primary-600 dark:text-primary-400',
    shortBreak: 'text-green-600 dark:text-green-400',
    longBreak: 'text-blue-600 dark:text-blue-400',
  };

  const sessionBgColors = {
    focus: 'bg-primary-100 dark:bg-primary-900',
    shortBreak: 'bg-green-100 dark:bg-green-900',
    longBreak: 'bg-blue-100 dark:bg-blue-900',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Pomodoro Timer
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Stay focused and productive with timed work sessions
          </p>
        </div>
        <Button
          variant="secondary"
          onClick={() => setIsSettingsOpen(true)}
        >
          ⚙️ Settings
        </Button>
      </div>

      {/* Timer Display */}
      <div className="flex justify-center">
        <Card className="w-full max-w-md">
          <div className="text-center space-y-6">
            {/* Session Type */}
            <div className="flex justify-center gap-2">
              {['focus', 'shortBreak', 'longBreak'].map((type) => (
                <Button
                  key={type}
                  variant={sessionType === type ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => switchSession(type)}
                  disabled={isRunning}
                >
                  {type === 'focus' ? 'Focus' : type === 'shortBreak' ? 'Short' : 'Long'}
                </Button>
              ))}
            </div>

            {/* Timer Circle */}
            <div className="relative w-64 h-64 mx-auto">
              <svg className="transform -rotate-90 w-64 h-64">
                {/* Background Circle */}
                <circle
                  cx="128"
                  cy="128"
                  r="120"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-gray-200 dark:text-gray-700"
                />
                {/* Progress Circle */}
                <motion.circle
                  cx="128"
                  cy="128"
                  r="120"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  className={sessionColors[sessionType]}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: progress / 100 }}
                  transition={{ duration: 1, ease: 'linear' }}
                  strokeDasharray={`${2 * Math.PI * 120}`}
                  strokeDashoffset={`${2 * Math.PI * 120 * (1 - progress / 100)}`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className={`text-sm font-medium mb-2 ${sessionColors[sessionType]}`}>
                  {sessionLabels[sessionType]}
                </p>
                <p className={`text-5xl font-bold ${sessionColors[sessionType]}`}>
                  {formattedTime}
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-3">
              {!isRunning && !isPaused && (
                <Button variant="primary" size="lg" onClick={start}>
                  ▶ Start
                </Button>
              )}
              {isRunning && !isPaused && (
                <Button variant="secondary" size="lg" onClick={pause}>
                  ⏸ Pause
                </Button>
              )}
              {isPaused && (
                <>
                  <Button variant="primary" size="lg" onClick={resume}>
                    ▶ Resume
                  </Button>
                  <Button variant="secondary" size="lg" onClick={reset}>
                    ↻ Reset
                  </Button>
                </>
              )}
            </div>

            {/* Stats */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center gap-6 text-sm">
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Completed</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {completedPomodoros}
                  </p>
                </div>
                <div className="w-px h-12 bg-gray-200 dark:bg-gray-700" />
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Session</p>
                  <p className={`text-2xl font-bold ${sessionColors[sessionType]}`}>
                    {sessionType === 'focus' ? 'Focus' : sessionType === 'shortBreak' ? 'Short Break' : 'Long Break'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Info Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className={sessionBgColors.focus}>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Focus Session
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {focusMinutes} minutes of focused work
          </p>
        </Card>
        <Card className={sessionBgColors.shortBreak}>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Short Break
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {shortBreakMinutes} minutes to rest
          </p>
        </Card>
        <Card className={sessionBgColors.longBreak}>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Long Break
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {longBreakMinutes} minutes after 4 sessions
          </p>
        </Card>
      </div>

      {/* Settings Modal */}
      <Modal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        title="Timer Settings"
        size="sm"
      >
        <div className="space-y-4">
          <Input
            label="Focus Duration (minutes)"
            type="number"
            min="1"
            max="60"
            value={settings.focus}
            onChange={(e) =>
              setSettings({ ...settings, focus: parseInt(e.target.value) || 25 })
            }
          />
          <Input
            label="Short Break (minutes)"
            type="number"
            min="1"
            max="30"
            value={settings.shortBreak}
            onChange={(e) =>
              setSettings({ ...settings, shortBreak: parseInt(e.target.value) || 5 })
            }
          />
          <Input
            label="Long Break (minutes)"
            type="number"
            min="1"
            max="60"
            value={settings.longBreak}
            onChange={(e) =>
              setSettings({ ...settings, longBreak: parseInt(e.target.value) || 15 })
            }
          />
          <div className="flex gap-3 justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button variant="secondary" onClick={() => setIsSettingsOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSaveSettings}>
              Save Settings
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
