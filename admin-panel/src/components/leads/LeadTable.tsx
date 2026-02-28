import React from "react";
import { Star, Eye, Trash2 } from "lucide-react";
import type { Lead } from "../../services/adminAPI";
import { getStatusBadgeClass } from "../shared/StatusBadge";
import { getPriorityColorClass } from "../shared/PriorityBadge";
import EmptyState from "../shared/EmptyState";

interface LeadTableProps {
  leads: Lead[];
  selectedIds: number[];
  onSelectAll: (checked: boolean) => void;
  onSelectOne: (id: number) => void;
  onViewLead: (lead: Lead) => void;
  onStatusChange: (id: number, status: string) => void;
  onPriorityChange: (id: number, priority: string) => void;
  onQualityChange: (id: number, score: number) => void;
  onToggleFlag: (lead: Lead) => void;
  onDelete: (id: number) => void;
}

const LeadTable: React.FC<LeadTableProps> = ({
  leads,
  selectedIds,
  onSelectAll,
  onSelectOne,
  onViewLead,
  onStatusChange,
  onPriorityChange,
  onQualityChange,
  onToggleFlag,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto min-h-[300px]">  
        <table className="w-full min-w-[800px] max-w-full table-auto">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-4 w-10">
                <input
                  type="checkbox"
                  checked={selectedIds.length === leads.length && leads.length > 0}
                  onChange={(e) => onSelectAll(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500/20"
                />
              </th>
              <th className="p-4 text-left text-xs font-bold text-slate-600 uppercase">Lead</th>
              <th className="p-4 text-left text-xs font-bold text-slate-600 uppercase">Subject</th>
              <th className="p-4 text-left text-xs font-bold text-slate-600 uppercase">Status</th>
              <th className="p-4 text-left text-xs font-bold text-slate-600 uppercase">Priority</th>
              <th className="p-4 text-left text-xs font-bold text-slate-600 uppercase">Role</th>
              <th className="p-4 text-center text-xs font-bold text-slate-600 uppercase">Score</th>
              <th className="p-4 text-left text-xs font-bold text-slate-600 uppercase">Date</th>
              <th className="p-4 text-right text-xs font-bold text-slate-600 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {leads.map((lead) => (
              <tr
                key={lead.id}
                className="hover:bg-slate-50 transition-colors group"
              >
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(lead.id)}
                    onChange={() => onSelectOne(lead.id)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500/20"
                  />
                </td>
                <td className="p-4">
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
                    <div className="min-w-0">
                      <div className="font-semibold text-slate-900 flex items-center gap-2 truncate">
                        {lead.name}
                        {lead.flagged && <Star size={12} className="fill-amber-500 text-amber-500 flex-shrink-0" />}
                      </div>
                      <div className="text-xs text-slate-500 truncate">{lead.email}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-slate-700 truncate max-w-[200px]" title={lead.subject}>
                    {lead.subject}
                  </div>
                </td>
                <td className="p-4">
                  <select
                    value={lead.status || "unread"}
                    onChange={(e) => onStatusChange(lead.id, e.target.value)}
                    className={`${getStatusBadgeClass(lead.status)} cursor-pointer hover:ring-2 hover:ring-blue-500/20 transition-all`}
                  >
                    <option value="unread">UNREAD</option>
                    <option value="processing">PROCESSING</option>
                    <option value="contacted">CONTACTED</option>
                    <option value="archived">ARCHIVED</option>
                  </select>
                </td>
                <td className="p-4">
                  <select
                    value={lead.priority || "medium"}
                    onChange={(e) => onPriorityChange(lead.id, e.target.value)}
                    className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${getPriorityColorClass(
                      lead.priority
                    )} cursor-pointer hover:ring-2 hover:ring-blue-500/20 transition-all`}
                  >
                    <option value="low">LOW</option>
                    <option value="medium">MEDIUM</option>
                    <option value="high">HIGH</option>
                    <option value="urgent">URGENT</option>
                  </select>
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs font-medium">
                    {lead.role || "Guest"}
                  </span>
                </td>
                <td className="p-4 text-center">
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="1"
                    value={lead.quality_score || 0}
                    onChange={(e) => onQualityChange(lead.id, parseFloat(e.target.value))}
                    className="w-16 text-center text-sm font-mono font-bold text-slate-600 bg-slate-50 border border-slate-200 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500/20 outline-none"
                  />
                </td>
                <td className="p-4">
                  <div className="text-sm text-slate-600">
                    {new Date(lead.created_at || "").toLocaleDateString()}
                  </div>
                  <div className="text-xs text-slate-400">
                    {new Date(lead.created_at || "").toLocaleTimeString()}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => onToggleFlag(lead)}
                      className={`p-2 rounded-lg transition-colors ${
                        lead.flagged
                          ? "text-amber-600 bg-amber-50 hover:bg-amber-100"
                          : "text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                      }`}
                      title={lead.flagged ? "Unflag" : "Flag"}
                    >
                      <Star size={16} />
                    </button>
                    <button
                      onClick={() => onViewLead(lead)}
                      className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(lead.id)}
                      className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {leads.length === 0 && (
        <EmptyState title="No leads found" description="Try adjusting your filters" />
      )}
    </div>
  );
};

export default LeadTable;
