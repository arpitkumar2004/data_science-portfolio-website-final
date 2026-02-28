import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { Lead } from "../../services/adminAPI";

interface QualityDistributionProps {
  leads: Lead[];
}

const BUCKETS = [
  { label: "0 – 0.2", min: 0, max: 0.2, color: "#ef4444" },
  { label: "0.2 – 0.4", min: 0.2, max: 0.4, color: "#f59e0b" },
  { label: "0.4 – 0.6", min: 0.4, max: 0.6, color: "#eab308" },
  { label: "0.6 – 0.8", min: 0.6, max: 0.8, color: "#22c55e" },
  { label: "0.8 – 1.0", min: 0.8, max: 1.01, color: "#10b981" },
];

const QualityDistribution: React.FC<QualityDistributionProps> = ({ leads }) => {
  const data = useMemo(() => {
    return BUCKETS.map((b) => ({
      range: b.label,
      count: leads.filter(
        (l) => (l.quality_score ?? 0) >= b.min && (l.quality_score ?? 0) < b.max
      ).length,
      fill: b.color,
    }));
  }, [leads]);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <h3 className="text-lg font-bold text-slate-900 mb-1">Lead Quality Distribution</h3>
      <p className="text-xs text-slate-500 mb-6">Quality score breakdown across all leads</p>
      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis
              dataKey="range"
              tick={{ fontSize: 11, fill: "#64748b" }}
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
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]} maxBarSize={40}>
              {data.map((entry, i) => (
                <Bar key={i} dataKey="count" fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default QualityDistribution;
