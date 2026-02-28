/**
 * Custom hooks for Admin Dashboard data fetching with SWR
 * Provides auto-revalidation, caching, and real-time updates
 */

import useSWR from "swr";
import { adminAPI, Lead, LeadStats, TimelinePoint, SourceData, ResponseTimeData } from "../services/adminAPI";

// SWR configuration for admin dashboard
const swrConfig = {
  refreshInterval: 60000*5, // Auto-refresh every 10 minutes
  revalidateOnFocus: true, // Refresh when tab gains focus
  revalidateOnReconnect: true, // Refresh on network reconnect
  dedupingInterval: 2000, // Dedupe requests within 2 seconds
};

/**
 * Hook for fetching all leads with auto-revalidation
 * Updates UI instantly when new leads arrive
 */
export function useLeads() {
  const { data, error, isLoading, mutate } = useSWR<Lead[]>(
    "admin/leads",
    () => adminAPI.getLeads() as Promise<Lead[]>,
    swrConfig
  );

  return {
    leads: data || [],
    isLoading,
    isError: error,
    refresh: mutate, // Manual refresh trigger
  };
}

/**
 * Hook for fetching lead statistics and KPIs
 * Provides real-time velocity analytics
 */
export function useLeadStats() {
  const { data, error, isLoading, mutate } = useSWR<LeadStats>(
    "admin/leads/stats",
    () => adminAPI.getStats(),
    swrConfig
  );

  return {
    stats: data,
    isLoading,
    isError: error,
    refresh: mutate,
  };
}

/**
 * Hook for fetching a single lead by ID
 */
export function useLead(id: number | null) {
  const { data, error, isLoading, mutate } = useSWR<Lead>(
    id ? `admin/leads/${id}` : null,
    id ? () => adminAPI.getLead(id) : null,
    {
      ...swrConfig,
      refreshInterval: 0, // Don't auto-refresh single lead
      revalidateOnFocus: false,
    }
  );

  return {
    lead: data,
    isLoading,
    isError: error,
    refresh: mutate,
  };
}

/**
 * Hook for optimistic UI updates
 * Updates UI immediately, then syncs with server
 */
export function useOptimisticLeadUpdate() {
  const { mutate: mutateLeads } = useSWR("admin/leads");
  const { mutate: mutateStats } = useSWR("admin/leads/stats");

  const updateLead = async (
    id: number,
    updateFn: (lead: Lead) => Lead,
    serverUpdate: () => Promise<any>
  ) => {
    // Optimistic update
    mutateLeads(
      (currentLeads: Lead[] | undefined) => {
        if (!currentLeads) return currentLeads;
        return currentLeads.map((lead) =>
          lead.id === id ? updateFn(lead) : lead
        );
      },
      false // Don't revalidate yet
    );

    try {
      // Perform server update
      await serverUpdate();
      // Revalidate to sync with server
      mutateLeads();
      mutateStats();
    } catch (error) {
      // Rollback on error
      mutateLeads();
      throw error;
    }
  };

  return { updateLead };
}

/**
 * Hook for fetching analytics timeline data
 */
export function useAnalyticsTimeline(period: string = "30d") {
  const { data, error, isLoading, mutate } = useSWR<TimelinePoint[]>(
    `admin/analytics/timeline/${period}`,
    () => adminAPI.getTimeline(period),
    { ...swrConfig, refreshInterval: 0 }
  );

  return {
    timeline: data || [],
    isLoading,
    isError: error,
    refresh: mutate,
  };
}

/**
 * Hook for fetching source breakdown data
 */
export function useSourceBreakdown() {
  const { data, error, isLoading, mutate } = useSWR<SourceData[]>(
    "admin/analytics/sources",
    () => adminAPI.getSourceBreakdown(),
    { ...swrConfig, refreshInterval: 0 }
  );

  return {
    sources: data || [],
    isLoading,
    isError: error,
    refresh: mutate,
  };
}

/**
 * Hook for fetching response time stats
 */
export function useResponseTime() {
  const { data, error, isLoading, mutate } = useSWR<ResponseTimeData>(
    "admin/analytics/response-time",
    () => adminAPI.getResponseTime(),
    { ...swrConfig, refreshInterval: 0 }
  );

  return {
    responseTime: data,
    isLoading,
    isError: error,
    refresh: mutate,
  };
}

export default { useLeads, useLeadStats, useLead, useOptimisticLeadUpdate, useAnalyticsTimeline, useSourceBreakdown, useResponseTime };
