import React, { useState } from "react";
import { Send, X, FileText, CheckCircle2 } from "lucide-react";
import type { Lead } from "../../services/adminAPI";
import adminAPI from "../../services/adminAPI";
import { useToast } from "../../hooks/useToast";

interface LeadQuickReplyModalProps {
  lead: Lead | null;
  onClose: () => void;
  onSuccess: () => void;
}

const LeadQuickReplyModal: React.FC<LeadQuickReplyModalProps> = ({ lead, onClose, onSuccess }) => {
  const { showToast } = useToast();
  const [subject, setSubject] = useState(lead ? `Re: ${lead.subject}` : "");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  if (!lead) return null;

  const templates = [
    {
      label: "General Acknowledgment",
      subject: `Re: ${lead.subject} | Arpit Kumar`,
      text: `Hi ${lead.name},\n\nThank you for reaching out regarding "${lead.subject}". I have received your message and would love to connect further.\n\nPlease let me know your availability for a quick call this week.\n\nBest regards,\nArpit Kumar`
    },
    {
      label: "Resume & Portfolio Included",
      subject: `Arpit Kumar — Resume & Candidate Details for ${lead.company || "Your Team"}`,
      text: `Hi ${lead.name},\n\nThanks for your interest in my profile! As requested, my resume and portfolio details are available for review.\n\nYou can also check out my live project demos at https://arpitkumar.dev/projects.\n\nLooking forward to discussing potential alignment.\n\nBest regards,\nArpit Kumar`
    },
    {
      label: "Schedule Interview Call",
      subject: `Invitation to Connect — Arpit Kumar`,
      text: `Hi ${lead.name},\n\nThank you for getting in touch! I'd be happy to schedule a 30-minute introductory call.\n\nYou can pick a time directly on my Calendly calendar: https://calendly.com/kumararpit17773/30min\n\nBest regards,\nArpit Kumar`
    }
  ];

  const handleSend = async () => {
    if (!message.trim()) {
      showToast("Please enter a reply message.", "error");
      return;
    }

    setIsSending(true);
    try {
      await adminAPI.replyToLead(lead.id, subject, message);
      showToast(`Reply email successfully sent to ${lead.email}!`, "success");
      onSuccess();
      onClose();
    } catch {
      showToast("Failed to send reply email.", "error");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
          <div>
            <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Send className="w-4 h-4 text-blue-600 dark:text-blue-400" /> Reply to {lead.name}
            </h3>
            <p className="text-xs text-slate-500">{lead.email} {lead.company ? `• ${lead.company}` : ""}</p>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {/* Preset templates bar */}
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5 flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-blue-500" /> Quick Reply Templates
            </label>
            <div className="flex flex-wrap gap-2">
              {templates.map((tpl, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setSubject(tpl.subject);
                    setMessage(tpl.text);
                  }}
                  className="px-2.5 py-1 text-xs bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/50 hover:text-blue-600 dark:hover:text-blue-400 text-slate-600 dark:text-slate-300 rounded-md border border-slate-200 dark:border-slate-700 transition-colors"
                >
                  {tpl.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Message</label>
            <textarea
              rows={7}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your email response here..."
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <span className="text-[11px] text-slate-400 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> Will update lead status to 'Contacted' automatically.
          </span>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleSend}
              disabled={isSending}
              className="px-4 py-2 text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-1.5 shadow-sm disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" /> {isSending ? "Sending..." : "Send Reply"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadQuickReplyModal;
