import React from "react";

const statusStyles: Record<string, string> = {
  unread: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  processing: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  contacted: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  archived: "bg-slate-400/10 text-slate-600 border-slate-400/20",
};

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = "" }) => {
  const style = statusStyles[status] || statusStyles.unread;
  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${style} ${className}`}>
      {status}
    </span>
  );
};

export const getStatusBadgeClass = (s: string = "unread") => {
  const style = statusStyles[s] || statusStyles.unread;
  return `px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${style}`;
};

export default StatusBadge;
