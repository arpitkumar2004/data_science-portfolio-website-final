/**
 * ProjectsContext
 *
 * Data loading priority:
 *   1. localStorage cache (if < 24h old) — instant, no network
 *   2. Static projectsData.tsx — instant, always available
 *   3. Background API sync — fetches only when DB has newer data
 *
 * The page is NEVER blank. Real project data from projectsData.tsx is
 * rendered immediately while a lightweight version-check determines
 * whether the backend has fresher data worth fetching.
 *
 * Usage:
 *   const { projects, loading, error, dataSource } = useProjects();
 */

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { buildApiUrl, API_ENDPOINTS } from '../config/api';
import { projects as staticProjects, type Project } from '../data/projectsData';
import { backendReady } from '../utils/backendWakeUp';

/* ─── localStorage cache helpers ─── */
const CACHE_KEY = 'portfolio_projects_cache';
const CACHE_VERSION_KEY = 'portfolio_projects_version';
const CACHE_MAX_AGE_MS = 24 * 60 * 60 * 1000; // 24 hours

interface CachedData {
  projects: Project[];
  lastUpdated: string | null;
  cachedAt: number; // Date.now()
}

function readCache(): CachedData | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed: CachedData = JSON.parse(raw);
    // Expire stale cache (>24h)
    if (Date.now() - parsed.cachedAt > CACHE_MAX_AGE_MS) {
      localStorage.removeItem(CACHE_KEY);
      localStorage.removeItem(CACHE_VERSION_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function writeCache(projects: Project[], lastUpdated: string | null): void {
  try {
    const data: CachedData = { projects, lastUpdated, cachedAt: Date.now() };
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    if (lastUpdated) {
      localStorage.setItem(CACHE_VERSION_KEY, lastUpdated);
    }
  } catch {
    // localStorage full or unavailable — silently ignore
  }
}

function getCachedVersion(): string | null {
  try {
    return localStorage.getItem(CACHE_VERSION_KEY);
  } catch {
    return null;
  }
}

/* ─── Determine initial data (cache > static) ─── */
function getInitialProjects(): { projects: Project[]; source: DataSource } {
  const cached = readCache();
  if (cached && cached.projects.length > 0) {
    return { projects: cached.projects, source: 'cache' };
  }
  return { projects: staticProjects, source: 'static' };
}

/* ─── Context types ─── */
export type DataSource = 'static' | 'cache' | 'api';

interface ProjectsContextValue {
  projects: Project[];
  loading: boolean;
  error: string | null;
  dataSource: DataSource;
  refetch: () => Promise<void>;
}

const initial = getInitialProjects();

const ProjectsContext = createContext<ProjectsContextValue>({
  projects: initial.projects,
  loading: false,
  error: null,
  dataSource: initial.source,
  refetch: async () => {},
});

export const ProjectsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(initial.projects);
  const [loading, setLoading] = useState(false); // false — we already have data
  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<DataSource>(initial.source);
  const isSyncing = useRef(false);

  /**
   * Full fetch — pulls all projects from the API and updates state + cache.
   */
  const fetchAllProjects = useCallback(async (): Promise<void> => {
    const url = buildApiUrl(API_ENDPOINTS.PROJECTS_PUBLIC);
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch projects: ${res.status} ${res.statusText}`);
    }
    const data: Project[] = await res.json();
    if (data.length > 0) {
      setProjects(data);
      setDataSource('api');
      // Extract the latest updated_at from the response itself
      const latestUpdated = data.reduce((latest, p) => {
        const ts = (p as Record<string, unknown>).updated_at as string | undefined;
        if (ts && (!latest || ts > latest)) return ts;
        return latest;
      }, null as string | null);
      writeCache(data, latestUpdated);
    }
  }, []);

  /**
   * Smart sync — lightweight version check, then full fetch only if needed.
   * This avoids re-downloading the entire project list on every page load.
   */
  const smartSync = useCallback(async (): Promise<void> => {
    if (isSyncing.current) return;
    isSyncing.current = true;

    // Wait for the backend to finish waking up before hitting data endpoints
    const isAlive = await backendReady;
    if (!isAlive) {
      console.warn('ProjectsContext: backend unreachable — keeping existing data');
      isSyncing.current = false;
      return;
    }

    try {
      setError(null);

      // Step 1: Lightweight version check
      const versionUrl = buildApiUrl(API_ENDPOINTS.PROJECTS_VERSION);
      const versionRes = await fetch(versionUrl);

      if (!versionRes.ok) {
        // Version endpoint failed — fall back to full fetch
        await fetchAllProjects();
        return;
      }

      const versionData: { count: number; last_updated: string | null } = await versionRes.json();

      // Step 2: Compare with our cached version
      const cachedVersion = getCachedVersion();
      const serverVersion = versionData.last_updated;

      const needsFetch =
        !cachedVersion ||                                   // no cache yet
        !serverVersion ||                                   // server can't tell → fetch to be safe
        serverVersion > cachedVersion ||                    // server has newer data
        versionData.count !== projects.length;              // count mismatch

      if (needsFetch) {
        setLoading(true);
        await fetchAllProjects();
      }
      // else: data is already up-to-date — do nothing

    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to sync projects';
      setError(message);
      console.warn('ProjectsContext: sync error — using existing data:', message);
      // Keep whatever data we already have (cache or static) — never blank
    } finally {
      setLoading(false);
      isSyncing.current = false;
    }
  }, [fetchAllProjects, projects.length]);

  /**
   * Force refetch — bypasses version check, always pulls fresh data.
   */
  const refetch = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      await fetchAllProjects();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load projects';
      setError(message);
      console.error('ProjectsContext: refetch error:', message);
      // Fall back to static if we have nothing
      if (projects.length === 0) {
        setProjects(staticProjects);
        setDataSource('static');
      }
    } finally {
      setLoading(false);
    }
  }, [fetchAllProjects, projects.length]);

  // On mount: run smart sync in background
  useEffect(() => {
    smartSync();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ProjectsContext.Provider value={{ projects, loading, error, dataSource, refetch }}>
      {children}
    </ProjectsContext.Provider>
  );
};

/**
 * Hook to access projects.
 * Returns { projects, loading, error, dataSource, refetch }.
 */
export const useProjects = (): ProjectsContextValue => {
  return useContext(ProjectsContext);
};

export default ProjectsContext;
