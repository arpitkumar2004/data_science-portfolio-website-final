/**
 * Backend Wake-Up Utility
 *
 * On Render's free tier the backend sleeps after 15 min of inactivity.
 * Cold-starting takes ~30-50 s in the worst case.
 *
 * This module fires a lightweight ping to `/api/hello` **immediately on
 * import** (i.e. before React even renders) and exposes a shared promise
 * that resolves once the backend is confirmed alive.
 *
 * Data-fetching hooks/contexts should `await backendReady` before making
 * their real API calls so they don't race against the cold start and fall
 * back to static data unnecessarily.
 *
 * If the backend never responds after MAX_RETRIES the promise resolves
 * `false` so consumers can fall back gracefully — the UI is never blocked.
 */

import { buildApiUrl, API_ENDPOINTS } from '../config/api';

/* ─── Configuration ─── */
const MAX_RETRIES = 8;           // total attempts
const INITIAL_DELAY_MS = 2_000;  // first retry waits 2 s
const MAX_DELAY_MS = 10_000;     // cap between retries
const REQUEST_TIMEOUT_MS = 8_000; // per-request timeout

/* ─── State ─── */
let resolved = false;

/**
 * Single ping with a timeout.
 * Returns true if the backend responded with an OK status.
 */
async function ping(): Promise<boolean> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const res = await fetch(buildApiUrl(API_ENDPOINTS.HEALTH), {
      signal: controller.signal,
      // Use no-cache so the CDN/browser doesn't serve stale responses
      cache: 'no-store',
    });
    return res.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Retry loop with exponential back-off.
 */
async function wakeBackend(): Promise<boolean> {
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    const ok = await ping();
    if (ok) {
      resolved = true;
      console.log(`⚡ Backend awake after ${attempt + 1} ping(s)`);
      return true;
    }

    // Exponential backoff: 2s → 4s → 8s → 10s (capped)
    const delay = Math.min(INITIAL_DELAY_MS * 2 ** attempt, MAX_DELAY_MS);
    console.log(
      `⏳ Backend not ready (attempt ${attempt + 1}/${MAX_RETRIES}). ` +
      `Retrying in ${(delay / 1000).toFixed(1)}s…`
    );
    await new Promise((r) => setTimeout(r, delay));
  }

  console.warn('⚠️ Backend did not respond after maximum retries — using fallback data');
  return false;
}

/**
 * Shared promise — kicks off on import.
 * `await backendReady` anywhere in the app to wait for the backend.
 */
export const backendReady: Promise<boolean> = wakeBackend();

/**
 * Synchronous check — returns true if the backend has already responded.
 * Useful when you want a quick non-blocking check.
 */
export function isBackendReady(): boolean {
  return resolved;
}
