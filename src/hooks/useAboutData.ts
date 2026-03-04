import { useState, useEffect } from "react";
import { AboutData, aboutFallbackData } from "../data/aboutData";
import { API_BASE_URL, API_ENDPOINTS } from "../config/api";

interface UseAboutDataResult {
  data: AboutData;
  loading: boolean;
  error: string | null;
  isFromApi: boolean;
}

/**
 * Fetches About Me data from the backend API.
 * Falls back to local data on failure for zero-downtime rendering.
 */
export function useAboutData(): UseAboutDataResult {
  const [data, setData] = useState<AboutData>(aboutFallbackData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFromApi, setIsFromApi] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.ABOUT}`, {
          signal: controller.signal,
          headers: { Accept: "application/json" },
        });

        if (!response.ok) {
          throw new Error(`API returned ${response.status}`);
        }

        const apiData: AboutData = await response.json();
        setData(apiData);
        setIsFromApi(true);
        setError(null);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.warn("About API unavailable, using fallback data:", err);
          setError((err as Error).message);
          // Keep the fallback data already set in initial state
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, []);

  return { data, loading, error, isFromApi };
}
