import { API_BASE_URL } from "../config";

const cache = {};

export function getCachedData(endpoint) {
  return cache[endpoint] || null;
}

export async function fetchWithCache(endpoint) {
  if (cache[endpoint]) {
    return cache[endpoint];
  }
  const res = await fetch(`${API_BASE_URL}${endpoint}`);
  if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
  const data = await res.json();
  cache[endpoint] = data;
  return data;
}
