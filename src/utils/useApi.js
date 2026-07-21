import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';

export function useApi(endpoint, defaultData = null) {
  const cacheKey = `cache_${endpoint}`;
  
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem(cacheKey);
    return saved ? JSON.parse(saved) : defaultData;
  });
  
  const [loading, setLoading] = useState(() => {
    const saved = localStorage.getItem(cacheKey);
    return !saved; // Only show loading spinner if we have absolutely nothing to show yet
  });

  useEffect(() => {
    fetch(`${API_BASE_URL}${endpoint}`)
      .then(res => {
        if (!res.ok) throw new Error('API Error');
        return res.json();
      })
      .then(json => {
        setData(json);
        setLoading(false);
        localStorage.setItem(cacheKey, JSON.stringify(json));
      })
      .catch(err => {
        console.error(`Failed to load ${endpoint}:`, err);
        setLoading(false);
      });
  }, [endpoint]);

  return { data, loading };
}
