import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { Lead, LeadStats } from "../../services/adminAPI";

interface RoleDistributionProps {
  leads: Lead[];
  stats: LeadStats | null;
}

const COLORS = ["#8b5cf6", "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#06b6d4"];

const INTENT_ICONS: Record<string, string> = {
  Recruiter: "👔",
  Researcher: "🔬",
  Developer: "💻",
  SDE: "💻",
  Guest: "👤",
  Founder: "🚀",
  Student: "📚",
};

const RoleDistribution: React.FC<RoleDistributionProps> = ({ leads, stats: _stats }) => {
  const data = useMemo(() => {
    // Derive from leads for accuracy
    const counts: Record<string, number> = {};
    leads.forEach((l) => {
      const role = l.role || "Guest";
      counts[role] = (counts[role] || 0) + 1;
    });

    return Object.entries(counts)
      .map(([role, count]) => ({
        role,
        count,
        icon: INTENT_ICONS[role] || "👤",
      }))
      .sort((a, b) => b.count - a.count);
  }, [leads]);

  const total = data.reduce((s, d) => s + d.count, 0);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <h3 className="text-lg font-bold text-slate-900 mb-1">Intent Analytics</h3>
      <p className="text-xs text-slate-500 mb-6">Visitor roles — who's reaching out</p>

      <div className="flex gap-6">
        {/* Pie Chart */}
        <div className="w-[180px] h-[180px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data.map((d) => ({ name: d.role, value: d.count }))}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={75}
                paddingAngle={2}
                dataKey="value"
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
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Role list */}
        <div className="flex-1 space-y-3">
          {data.map((d, i) => {
            const pct = total > 0 ? ((d.count / total) * 100).toFixed(0) : "0";
            return (
              <div key={d.role}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    <span>{d.icon}</span>
                    {d.role}
                  </span>
                  <span className="text-sm font-bold text-slate-900">
                    {d.count} ({pct}%)
                  </span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${pct}%`, backgroundColor: COLORS[i % COLORS.length] }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RoleDistribution;
