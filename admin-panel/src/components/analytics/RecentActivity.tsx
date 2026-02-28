import React from "react";
import { Activity } from "lucide-react";
import type { Lead } from "../../services/adminAPI";

interface RecentActivityProps {
  leads: Lead[];
  limit?: number;
}

const RecentActivity: React.FC<RecentActivityProps> = ({ leads, limit = 10 }) => {
  const recentLeads = leads.slice(0, limit);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
        <Activity size={20} className="text-emerald-600" />
        Recent Activity
      </h3>
      <div className="space-y-3">
        {recentLeads.map((lead) => (
          <div key={lead.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
                {lead.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="text-sm font-medium text-slate-900">{lead.name}</div>
                <div className="text-xs text-slate-500">{lead.email}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-400">
                {new Date(lead.created_at || "").toLocaleDateString()}
              </div>
              <div className="text-[10px] text-slate-400">
                {lead.role || "Guest"} • {lead.source || "contact_form"}
              </div>
            </div>
          </div>
        ))}
        {recentLeads.length === 0 && (
          <div className="text-center py-8 text-slate-400 text-sm">No recent activity</div>
        )}
      </div>
    </div>
  );
};

export default RecentActivity;
