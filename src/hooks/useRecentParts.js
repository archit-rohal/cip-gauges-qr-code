import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'gauge_recent_parts';
const MAX_RECENT = 5;

/**
 * Custom hook to track and manage recently viewed parts
 * 
 * Uses localStorage to persist across sessions
 * Automatically removes duplicates (moves recent to front)
 */
export function useRecentParts() {
  const [recentParts, setRecentParts] = useState([]);

  // Load recent parts from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setRecentParts(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse recent parts:', e);
      }
    }
  }, []);

  // Add a part to recent (moves to front if already exists)
  const addRecentPart = useCallback((partCode) => {
    setRecentParts((prev) => {
      // Remove if already exists
      const filtered = prev.filter((code) => code !== partCode);
      // Add to front
      const updated = [partCode, ...filtered].slice(0, MAX_RECENT);
      // Save to localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Clear all recent parts
  const clearRecentParts = useCallback(() => {
    setRecentParts([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    recentParts,
    addRecentPart,
    clearRecentParts,
  };
}
