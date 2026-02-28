import React, { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { Lead } from "../../services/adminAPI";

interface LeadsOverTimeChartProps {
  leads: Lead[];
  period?: "7d" | "30d" | "90d";
  timelineData?: Array<{ date: string; count: number }>;
}

const LeadsOverTimeChart: React.FC<LeadsOverTimeChartProps> = ({ leads, period = "30d", timelineData }) => {
  const chartData = useMemo(() => {
    // If backend provides timeline data, use it directly
    if (timelineData && timelineData.length > 0) {
      return timelineData.map((d) => ({
        date: new Date(d.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        leads: d.count,
      }));
    }

    // Fallback: derive from leads array client-side
    const days = period === "7d" ? 7 : period === "30d" ? 30 : 90;
    const now = new Date();
    const buckets: Record<string, number> = {};

    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split("T")[0];
      buckets[key] = 0;
    }

    leads.forEach((lead) => {
      if (!lead.created_at) return;
      const key = lead.created_at.split("T")[0];
      if (buckets[key] !== undefined) {
        buckets[key]++;
      }
    });

    return Object.entries(buckets).map(([date, count]) => ({
      date: new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      leads: count,
    }));
  }, [leads, period, timelineData]);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <h3 className="text-lg font-bold text-slate-900 mb-1">Leads Over Time</h3>
      <p className="text-xs text-slate-500 mb-6">
        Daily lead volume — last {period === "7d" ? "7 days" : period === "30d" ? "30 days" : "90 days"}
      </p>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="leadGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              tickLine={false}
              axisLine={{ stroke: "#e2e8f0" }}
              interval="preserveStartEnd"
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "none",
                borderRadius: 8,
                fontSize: 12,
                color: "#fff",
              }}
            />
            <Area
              type="monotone"
              dataKey="leads"
              stroke="#3b82f6"
              strokeWidth={2}
              fill="url(#leadGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LeadsOverTimeChart;
