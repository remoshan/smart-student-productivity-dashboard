import { useState, useEffect, useRef, useCallback } from 'react';
import { getStorageItem, setStorageItem, STORAGE_KEYS } from '../utils/storage';
import { POMODORO_DEFAULTS } from '../data/constants';

/**
 * Custom hook for Pomodoro timer with persistence
 */
export const usePomodoro = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(() => {
    const saved = getStorageItem(STORAGE_KEYS.POMODORO);
    return saved?.timeLeft ?? POMODORO_DEFAULTS.FOCUS_MINUTES * 60;
  });
  const [sessionType, setSessionType] = useState(() => {
    const saved = getStorageItem(STORAGE_KEYS.POMODORO);
    return saved?.sessionType ?? 'focus';
  });
  const [completedPomodoros, setCompletedPomodoros] = useState(() => {
    const saved = getStorageItem(STORAGE_KEYS.POMODORO);
    return saved?.completedPomodoros ?? 0;
  });
  const [focusMinutes, setFocusMinutes] = useState(() => {
    const saved = getStorageItem(STORAGE_KEYS.POMODORO);
    return saved?.focusMinutes ?? POMODORO_DEFAULTS.FOCUS_MINUTES;
  });
  const [shortBreakMinutes, setShortBreakMinutes] = useState(() => {
    const saved = getStorageItem(STORAGE_KEYS.POMODORO);
    return saved?.shortBreakMinutes ?? POMODORO_DEFAULTS.SHORT_BREAK_MINUTES;
  });
  const [longBreakMinutes, setLongBreakMinutes] = useState(() => {
    const saved = getStorageItem(STORAGE_KEYS.POMODORO);
    return saved?.longBreakMinutes ?? POMODORO_DEFAULTS.LONG_BREAK_MINUTES;
  });

  const intervalRef = useRef(null);

  // Persist state to localStorage
  useEffect(() => {
    setStorageItem(STORAGE_KEYS.POMODORO, {
      timeLeft,
      sessionType,
      completedPomodoros,
      focusMinutes,
      shortBreakMinutes,
      longBreakMinutes,
      isRunning,
      isPaused,
    });
  }, [timeLeft, sessionType, completedPomodoros, focusMinutes, shortBreakMinutes, longBreakMinutes, isRunning, isPaused]);

  // Timer logic
  useEffect(() => {
    if (isRunning && !isPaused && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleSessionComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, isPaused, timeLeft]);

  const handleSessionComplete = useCallback(() => {
    setIsRunning(false);
    setIsPaused(false);

    if (sessionType === 'focus') {
      const newCount = completedPomodoros + 1;
      setCompletedPomodoros(newCount);

      // Determine break type
      const shouldTakeLongBreak = newCount % POMODORO_DEFAULTS.LONG_BREAK_INTERVAL === 0;
      const nextSessionType = shouldTakeLongBreak ? 'longBreak' : 'shortBreak';
      const nextTime = shouldTakeLongBreak ? longBreakMinutes * 60 : shortBreakMinutes * 60;

      setSessionType(nextSessionType);
      setTimeLeft(nextTime);
    } else {
      // Break completed, start focus session
      setSessionType('focus');
      setTimeLeft(focusMinutes * 60);
    }
  }, [sessionType, completedPomodoros, focusMinutes, shortBreakMinutes, longBreakMinutes]);

  const start = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  const pause = () => {
    setIsPaused(true);
  };

  const resume = () => {
    setIsPaused(false);
  };

  const reset = () => {
    setIsRunning(false);
    setIsPaused(false);
    if (sessionType === 'focus') {
      setTimeLeft(focusMinutes * 60);
    } else if (sessionType === 'shortBreak') {
      setTimeLeft(shortBreakMinutes * 60);
    } else {
      setTimeLeft(longBreakMinutes * 60);
    }
  };

  const switchSession = (type) => {
    setIsRunning(false);
    setIsPaused(false);
    setSessionType(type);
    if (type === 'focus') {
      setTimeLeft(focusMinutes * 60);
    } else if (type === 'shortBreak') {
      setTimeLeft(shortBreakMinutes * 60);
    } else {
      setTimeLeft(longBreakMinutes * 60);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const progress = () => {
    let total;
    if (sessionType === 'focus') {
      total = focusMinutes * 60;
    } else if (sessionType === 'shortBreak') {
      total = shortBreakMinutes * 60;
    } else {
      total = longBreakMinutes * 60;
    }
    return total > 0 ? ((total - timeLeft) / total) * 100 : 0;
  };

  return {
    timeLeft,
    formattedTime: formatTime(timeLeft),
    isRunning,
    isPaused,
    sessionType,
    completedPomodoros,
    progress: progress(),
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
  };
};
