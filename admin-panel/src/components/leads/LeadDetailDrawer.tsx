import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Trash2, Activity, Calendar } from "lucide-react";
import type { Lead } from "../../services/adminAPI";
import adminAPI from "../../services/adminAPI";
import { getStatusBadgeClass } from "../shared/StatusBadge";
import { getPriorityColorClass } from "../shared/PriorityBadge";
import LeadTimeline from "./LeadTimeline";
import LeadTagManager from "./LeadTagManager";

interface LeadDetailDrawerProps {
  lead: Lead | null;
  onClose: () => void;
  onUpdate: (id: number, field: string, value: unknown) => void;
  onDelete: (id: number) => void;
  onTagsUpdate: (id: number, tags: string[]) => void;
}

const LeadDetailDrawer: React.FC<LeadDetailDrawerProps> = ({
  lead,
  onClose,
  onUpdate,
  onDelete,
  onTagsUpdate,
}) => {
  const [followUpDate, setFollowUpDate] = useState(lead?.follow_up_date?.split("T")[0] || "");

  if (!lead) return null;

  const handleEmailLead = () => {
    const subject = encodeURIComponent(`Re: ${lead.subject}`);
    const body = encodeURIComponent(
      `Hi ${lead.name},\n\nI hope this email finds you well. I wanted to follow up with you about your query.\n\n[Your message here]\n\nBest regards,\nArpit Kumar`
    );
    window.location.href = `mailto:${lead.email}?subject=${subject}&body=${body}`;
  };

  const handleFollowUpChange = (date: string) => {
    setFollowUpDate(date);
    onUpdate(lead.id, "follow_up_date", date ? new Date(date).toISOString() : null);
  };

  return (
    <AnimatePresence>
      {lead && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 z-40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-screen w-full max-w-2xl bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
                  {lead.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{lead.name}</h2>
                  <p className="text-sm text-slate-500">{lead.email}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-200 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Quick Stats Grid */}
              <div className="grid grid-cols-4 gap-3">
                <div className="p-3 bg-slate-50 rounded-lg text-center">
                  <div className="text-xs text-slate-500 mb-1">Status</div>
                  <select
                    value={lead.status || "unread"}
                    onChange={(e) => onUpdate(lead.id, "status", e.target.value)}
                    className={`${getStatusBadgeClass(lead.status)} cursor-pointer text-center`}
                  >
                    <option value="unread">UNREAD</option>
                    <option value="processing">PROCESSING</option>
                    <option value="contacted">CONTACTED</option>
                    <option value="archived">ARCHIVED</option>
                  </select>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg text-center">
                  <div className="text-xs text-slate-500 mb-1">Priority</div>
                  <select
                    value={lead.priority || "medium"}
                    onChange={(e) => onUpdate(lead.id, "priority", e.target.value)}
                    className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${getPriorityColorClass(lead.priority)} cursor-pointer`}
                  >
                    <option value="low">LOW</option>
                    <option value="medium">MEDIUM</option>
                    <option value="high">HIGH</option>
                    <option value="urgent">URGENT</option>
                  </select>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg text-center">
                  <div className="text-xs text-slate-500 mb-1">Score</div>
                  <div className="text-lg font-black text-slate-900">{(lead.quality_score || 0).toFixed(2)}</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg text-center">
                  <div className="text-xs text-slate-500 mb-1">Role</div>
                  <div className="text-sm font-semibold text-slate-700">{lead.role || "Guest"}</div>
                </div>
              </div>

              {/* Subject & Message */}
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Mail size={16} className="text-slate-400" /> Inquiry Details
                </h4>
                <div className="space-y-3">
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Subject</div>
                    <div className="font-semibold text-slate-900">{lead.subject}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Message</div>
                    <div className="p-4 bg-slate-50 rounded-lg text-sm text-slate-700 leading-relaxed border border-slate-200">
                      {lead.message}
                    </div>
                  </div>
                  {lead.company && (
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Company</div>
                      <div className="text-sm text-slate-700">{lead.company}</div>
                    </div>
                  )}
                  {lead.source && lead.source !== "contact_form" && (
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Source</div>
                      <div className="text-sm text-slate-700 capitalize">{lead.source.replace(/_/g, " ")}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Follow-up Date */}
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Calendar size={16} className="text-slate-400" /> Follow-up
                </h4>
                <input
                  type="date"
                  value={followUpDate}
                  onChange={(e) => handleFollowUpChange(e.target.value)}
                  className="px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
                {followUpDate && new Date(followUpDate) < new Date() && (
                  <span className="ml-3 text-xs text-red-600 font-bold">OVERDUE</span>
                )}
              </div>

              {/* Timeline */}
              <LeadTimeline lead={lead} />

              {/* Tags */}
              <LeadTagManager
                tags={lead.tags || []}
                onTagsChange={(tags) => onTagsUpdate(lead.id, tags)}
              />

              {/* Internal Notes */}
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Activity size={16} className="text-slate-400" /> Internal Notes
                </h4>
                <textarea
                  className="w-full p-4 bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-sm min-h-[120px] focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                  placeholder="Add private notes about this lead..."
                  defaultValue={lead.internal_notes}
                  onBlur={(e) => onUpdate(lead.id, "internal_notes", e.target.value)}
                />
              </div>

              {/* Metadata */}
              {lead.metadata && Object.keys(lead.metadata).length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-3">Technical Info</h4>
                  <div className="bg-slate-900 rounded-lg p-4 text-xs font-mono text-slate-300 overflow-x-auto">
                    <pre>{JSON.stringify(lead.metadata, null, 2)}</pre>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-slate-200 bg-slate-50 flex flex-col gap-3">
              <div className="flex gap-3">
                <button
                  onClick={handleEmailLead}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
                >
                  <Mail size={18} />
                  Email Lead
                </button>
                <button
                  onClick={() => onDelete(lead.id)}
                  className="flex items-center justify-center gap-2 bg-red-50 text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-100 transition-all border border-red-200"
                >
                  <Trash2 size={18} />
                  Delete
                </button>
              </div>

              {/* Intelligence Actions */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-200">
                <a
                  href={adminAPI.generateLinkedInSearchUrl(lead)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-blue-50 text-blue-600 py-2 rounded-lg font-semibold hover:bg-blue-100 transition-all border border-blue-200 text-sm"
                >
                  <span>🔗</span> LinkedIn
                </a>
                <a
                  href={adminAPI.generateGoogleSearchUrl(lead)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-amber-50 text-amber-600 py-2 rounded-lg font-semibold hover:bg-amber-100 transition-all border border-amber-200 text-sm"
                >
                  <span>🔍</span> Google
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LeadDetailDrawer;
