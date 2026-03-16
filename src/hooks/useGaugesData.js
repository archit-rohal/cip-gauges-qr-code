import { useState, useEffect } from 'react';

// Module-level cache to ensure we only load the JSON once
let cachedData = null;

/**
 * useGaugesData Hook
 * 
 * Dynamically loads the gauges.json file using code splitting.
 * Avoids blocking the main bundle rendering path and caches the result.
 */
export function useGaugesData() {
  const [data, setData] = useState(cachedData);
  const [loading, setLoading] = useState(!cachedData);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (cachedData) return;

    // Dynamically import data to allow Vite to code-split it
    import('../data/gauges.json')
      .then((module) => {
        cachedData = module.default;
        setData(cachedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load gauges data", err);
        setError(err);
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
}
