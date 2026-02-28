import React from "react";
import { motion } from "framer-motion";
import { Star, Activity } from "lucide-react";
import type { Lead } from "../../services/adminAPI";
import { getStatusBadgeClass } from "../shared/StatusBadge";
import { getPriorityColorClass } from "../shared/PriorityBadge";
import EmptyState from "../shared/EmptyState";

interface LeadGridProps {
  leads: Lead[];
  onViewLead: (lead: Lead) => void;
}

const LeadGrid: React.FC<LeadGridProps> = ({ leads, onViewLead }) => {
  if (leads.length === 0) {
    return (
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border-2 border-dashed border-slate-200 py-20">
        <EmptyState
          icon={<Activity size={64} className="text-slate-300" />}
          title="System Idle"
          description="No pending inquiries. New visitor inquiries will appear here in real-time."
        />
        <div className="flex items-center justify-center gap-2 text-slate-500 text-sm mt-4">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span>System Online - Auto-refresh enabled</span>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {leads.map((lead) => (
        <motion.div
          key={lead.id}
          layout
          className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-lg transition-all cursor-pointer"
          onClick={() => onViewLead(lead)}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                  lead.flagged
                    ? "bg-amber-100 text-amber-700 ring-2 ring-amber-400"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {lead.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="font-semibold text-slate-900">{lead.name}</div>
                <div className="text-xs text-slate-500">{lead.email}</div>
              </div>
            </div>
            {lead.flagged && <Star size={14} className="fill-amber-500 text-amber-500" />}
          </div>

          <div className="space-y-2 mb-3">
            <div className="text-sm font-medium text-slate-700 line-clamp-1">{lead.subject}</div>
            <div className="text-xs text-slate-500 line-clamp-2">{lead.message}</div>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <span className={getStatusBadgeClass(lead.status)}>{lead.status}</span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${getPriorityColorClass(lead.priority)}`}>
              {lead.priority}
            </span>
            {lead.company && (
              <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-medium truncate max-w-[100px]">
                {lead.company}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>{new Date(lead.created_at || "").toLocaleDateString()}</span>
            <span>Score: {(lead.quality_score || 0).toFixed(1)}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default LeadGrid;
