import { useState } from "react";
import { AboutData, aboutFallbackData } from "../data/aboutData";

interface UseAboutDataResult {
  data: AboutData;
  loading: boolean;
  error: string | null;
  isFromApi: boolean;
}

/**
 * Returns the local About Me data immediately.
 * The page no longer waits on backend warmup or API fetches.
 */
export function useAboutData(): UseAboutDataResult {
  const [data] = useState<AboutData>(aboutFallbackData);

  return {
    data,
    loading: false,
    error: null,
    isFromApi: false,
  };
}
