import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useLeads, useLeadStats, useAnalyticsTimeline, useSourceBreakdown, useResponseTime } from "../hooks/useAdminData";
import type { LeadStats } from "../services/adminAPI";
import TopBar from "../components/layout/TopBar";
import LeadsOverTimeChart from "../components/analytics/LeadsOverTimeChart";
import PipelineChart from "../components/analytics/PipelineChart";
import SourceBreakdown from "../components/analytics/SourceBreakdown";
import RoleDistribution from "../components/analytics/RoleDistribution";
import QualityDistribution from "../components/analytics/QualityDistribution";
import ResponseTimeCard from "../components/analytics/ResponseTimeCard";
import RecentActivity from "../components/analytics/RecentActivity";
import PageTransition from "../components/shared/PageTransition";

interface LayoutContext {
  stats: LeadStats | null;
}

const AnalyticsPage: React.FC = () => {
  const { stats } = useOutletContext<LayoutContext>();
  const { leads } = useLeads();
  const { refresh: refreshStats } = useLeadStats();
  const [period, setPeriod] = useState<"7d" | "30d" | "90d">("30d");

  // Wire up real backend analytics hooks
  const { timeline, refresh: refreshTimeline } = useAnalyticsTimeline(period);
  const { sources, refresh: refreshSources } = useSourceBreakdown();
  const { responseTime, refresh: refreshResponseTime } = useResponseTime();

  const refreshAll = () => {
    refreshStats();
    refreshTimeline();
    refreshSources();
    refreshResponseTime();
  };

  return (
    <PageTransition>
      <TopBar
        title="Analytics & Insights"
        subtitle={`${leads.length} total leads analyzed`}
        onRefresh={refreshAll}
        actions={
          <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
            {(["7d", "30d", "90d"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                  period === p
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {p === "7d" ? "7 Days" : p === "30d" ? "30 Days" : "90 Days"}
              </button>
            ))}
          </div>
        }
      />

      <div className="flex-1 overflow-auto p-6 space-y-6">
        {/* Row 1: Lead velocity chart (full width) — uses backend timeline data */}
        <LeadsOverTimeChart leads={leads} period={period} timelineData={timeline.length > 0 ? timeline : undefined} />

        {/* Row 2: Pipeline + Source */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PipelineChart stats={stats} leads={leads} />
          <SourceBreakdown leads={leads} sourcesData={sources.length > 0 ? sources : undefined} />
        </div>

        {/* Row 3: Roles + Quality + Response Time */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <RoleDistribution leads={leads} stats={stats} />
          <QualityDistribution leads={leads} />
          <ResponseTimeCard
            leads={leads}
            responseTimeData={responseTime ? { avg_hours: responseTime.avg_hours, median_hours: responseTime.avg_hours } : undefined}
          />
        </div>

        {/* Row 4: Recent Activity */}
        <RecentActivity leads={leads} limit={15} />
      </div>
    </PageTransition>
  );
};

export default AnalyticsPage;
