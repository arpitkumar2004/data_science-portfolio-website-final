import React, { useMemo } from "react";
import { Clock } from "lucide-react";
import type { Lead } from "../../services/adminAPI";

interface ResponseTimeCardProps {
  leads: Lead[];
  responseTimeData?: { avg_hours: number; median_hours: number };
}

const ResponseTimeCard: React.FC<ResponseTimeCardProps> = ({ leads, responseTimeData }) => {
  const { avgHours, respondedPercent } = useMemo(() => {
    if (responseTimeData) {
      return { avgHours: responseTimeData.avg_hours, respondedPercent: 100 };
    }

    // Derive from leads
    const responded = leads.filter((l) => l.last_contacted && l.created_at);
    if (responded.length === 0) return { avgHours: null, respondedPercent: 0 };

    const totalHours = responded.reduce((sum, l) => {
      const created = new Date(l.created_at).getTime();
      const contacted = new Date(l.last_contacted!).getTime();
      return sum + (contacted - created) / (1000 * 60 * 60);
    }, 0);

    return {
      avgHours: totalHours / responded.length,
      respondedPercent: (responded.length / leads.length) * 100,
    };
  }, [leads, responseTimeData]);

  const formatHours = (h: number | null) => {
    if (h === null) return "—";
    if (h < 1) return `${Math.round(h * 60)}m`;
    if (h < 24) return `${h.toFixed(1)}h`;
    return `${(h / 24).toFixed(1)}d`;
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <h3 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
        <Clock size={20} className="text-orange-500" />
        Response Time
      </h3>
      <p className="text-xs text-slate-500 mb-6">Average time to first contact</p>

      <div className="text-center">
        <div className="text-5xl font-black text-slate-900 mb-2">
          {formatHours(avgHours)}
        </div>
        <div className="text-sm text-slate-500">average response time</div>
        <div className="mt-4 flex items-center justify-center gap-2">
          <div className="h-2 flex-1 bg-slate-100 rounded-full overflow-hidden max-w-[200px]">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all"
              style={{ width: `${respondedPercent}%` }}
            />
          </div>
          <span className="text-xs font-bold text-slate-600">{respondedPercent.toFixed(0)}% responded</span>
        </div>
      </div>
    </div>
  );
};

export default ResponseTimeCard;
