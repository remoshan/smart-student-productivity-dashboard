import { useEffect, useState } from 'react';
import { getStorageItem, setStorageItem, STORAGE_KEYS } from '../utils/storage';

/**
 * Custom hook for theme management with system preference detection
 */
export const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = getStorageItem(STORAGE_KEYS.THEME);
    if (savedTheme) return savedTheme;

    // Detect system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    setStorageItem(STORAGE_KEYS.THEME, theme);
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      const savedTheme = getStorageItem(STORAGE_KEYS.THEME);
      if (!savedTheme) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return { theme, toggleTheme, setTheme };
};
