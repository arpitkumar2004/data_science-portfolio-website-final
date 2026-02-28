import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { LeadStats, Lead } from "../../services/adminAPI";

interface PipelineChartProps {
  stats: LeadStats | null;
  leads: Lead[];
}

const COLORS: Record<string, string> = {
  unread: "#3b82f6",
  processing: "#f59e0b",
  contacted: "#10b981",
  archived: "#94a3b8",
};

const PipelineChart: React.FC<PipelineChartProps> = ({ stats, leads }) => {
  const data = useMemo(() => {
    const counters = { unread: 0, processing: 0, contacted: 0, archived: 0 };
    leads.forEach((l) => {
      const key = (l.status || "unread") as keyof typeof counters;
      if (counters[key] !== undefined) counters[key]++;
    });

    return ["unread", "processing", "contacted", "archived"].map((status) => {
      const statsKey = `${status}_count` as keyof LeadStats;
      const count = (stats?.[statsKey] as number) ?? counters[status as keyof typeof counters];
      return { status: status.charAt(0).toUpperCase() + status.slice(1), count, key: status };
    });
  }, [stats, leads]);

  const total = data.reduce((s, d) => s + d.count, 0);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <h3 className="text-lg font-bold text-slate-900 mb-1">Pipeline Distribution</h3>
      <p className="text-xs text-slate-500 mb-6">Lead lifecycle funnel — {total} total leads</p>
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis
              dataKey="status"
              tick={{ fontSize: 12, fill: "#64748b", fontWeight: 600 }}
              tickLine={false}
              axisLine={{ stroke: "#e2e8f0" }}
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
              formatter={(value: number | undefined) => [`${value ?? 0} leads`, "Count"]}
            />
            <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={50}>
              {data.map((entry) => (
                <Cell key={entry.key} fill={COLORS[entry.key]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Percentage labels */}
      <div className="grid grid-cols-4 gap-2 mt-4">
        {data.map((d) => (
          <div key={d.key} className="text-center">
            <div className="text-sm font-bold text-slate-900">{d.count}</div>
            <div className="text-[10px] text-slate-500">
              {total > 0 ? ((d.count / total) * 100).toFixed(0) : 0}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PipelineChart;
