// src/hooks/useLocalStorage.js
import { useState, useEffect } from 'react';

/**
 * useState backed by localStorage for persistence across sessions.
 */
export function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Silently fail if storage is unavailable
    }
  }, [key, value]);

  return [value, setValue];
}
