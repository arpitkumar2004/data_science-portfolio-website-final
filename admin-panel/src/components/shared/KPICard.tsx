import React from "react";

interface KPICardProps {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
  subtitle?: string;
}

const KPICard: React.FC<KPICardProps> = ({ label, value, icon, trend, trendUp, subtitle }) => (
  <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-lg transition-all">
    <div className="flex items-start justify-between mb-4">
      <div className="p-3 bg-slate-50 rounded-lg">{icon}</div>
      {trend && (
        <div
          className={`text-xs font-bold px-2 py-1 rounded ${
            trendUp ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
          }`}
        >
          {trend}
        </div>
      )}
    </div>
    <div className="text-3xl font-black text-slate-900 mb-1">{value}</div>
    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</div>
    {subtitle && <div className="text-[10px] text-slate-400 mt-1">{subtitle}</div>}
  </div>
);

export default KPICard;
