import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import type { Lead } from "../../services/adminAPI";

interface SourceBreakdownProps {
  leads: Lead[];
  sourcesData?: Array<{ source: string; count: number }>;
}

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ef4444", "#06b6d4"];

const SourceBreakdown: React.FC<SourceBreakdownProps> = ({ leads, sourcesData }) => {
  const data = useMemo(() => {
    if (sourcesData && sourcesData.length > 0) {
      return sourcesData.map((s) => ({
        name: s.source.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        value: s.count,
      }));
    }

    // Derive from leads
    const counts: Record<string, number> = {};
    leads.forEach((l) => {
      const src = l.source || l.lead_type || "contact_form";
      counts[src] = (counts[src] || 0) + 1;
    });

    return Object.entries(counts)
      .map(([key, value]) => ({
        name: key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        value,
      }))
      .sort((a, b) => b.value - a.value);
  }, [leads, sourcesData]);

  if (data.length === 0) return null;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <h3 className="text-lg font-bold text-slate-900 mb-1">Source Attribution</h3>
      <p className="text-xs text-slate-500 mb-6">Where your leads are coming from</p>
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
              label={({ name, percent }: { name?: string; percent?: number }) => `${name ?? ''} ${((percent ?? 0) * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "none",
                borderRadius: 8,
                fontSize: 12,
                color: "#fff",
              }}
            />
            <Legend
              verticalAlign="bottom"
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: 11 }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SourceBreakdown;
