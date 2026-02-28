import React from "react";
import { Clock } from "lucide-react";
import type { Lead } from "../../services/adminAPI";

interface LeadTimelineProps {
  lead: Lead;
}

const LeadTimeline: React.FC<LeadTimelineProps> = ({ lead }) => {
  const events: { label: string; date: string | null; color: string }[] = [
    { label: "Lead Created", date: lead.created_at, color: "bg-emerald-500" },
  ];

  // Add contact history events
  if (lead.contact_history && Array.isArray(lead.contact_history)) {
    lead.contact_history.forEach((event: any) => {
      events.push({
        label: event.type || "Activity",
        date: event.timestamp || event.date,
        color: "bg-blue-400",
      });
    });
  }

  if (lead.last_contacted) {
    events.push({ label: "Last Contacted", date: lead.last_contacted, color: "bg-blue-500" });
  }

  if (lead.follow_up_date) {
    const isOverdue = new Date(lead.follow_up_date) < new Date();
    events.push({
      label: isOverdue ? "Follow-up (OVERDUE)" : "Follow-up Scheduled",
      date: lead.follow_up_date,
      color: isOverdue ? "bg-red-500" : "bg-purple-500",
    });
  }

  if (lead.updated_at && lead.updated_at !== lead.created_at) {
    events.push({ label: "Last Updated", date: lead.updated_at, color: "bg-slate-400" });
  }

  // Sort by date
  events.sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  return (
    <div>
      <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
        <Clock size={16} className="text-slate-400" /> Timeline
      </h4>
      <div className="space-y-4 border-l-2 border-slate-200 pl-6 ml-2">
        {events.map((event, i) => (
          <div key={i} className="relative">
            <div className={`absolute -left-[29px] top-1 w-4 h-4 rounded-full ${event.color} border-4 border-white`} />
            <div className="text-xs font-bold text-slate-900">{event.label}</div>
            <div className="text-[11px] text-slate-500">
              {event.date ? new Date(event.date).toLocaleString() : "—"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeadTimeline;
